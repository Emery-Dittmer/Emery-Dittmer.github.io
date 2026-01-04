'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type FxPoint = {
  x: string
  c: number
  d: number
  af: number
}

type FxSeries = 'c' | 'd' | 'af'
type FxGranularity = 'daily' | 'weekly' | 'monthly'
type FxRange = 'all' | 'last12' | 'ytd' | 'last30'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1nRwUi7dj7CawaSAjiHQ4Rp3KkPecmds9wlvZz5hyenU/export?format=csv'

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      current += '"'
      i += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(current)
      current = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (current.length || row.length) {
        row.push(current)
        rows.push(row)
        row = []
        current = ''
      }
      continue
    }

    current += char
  }

  if (current.length || row.length) {
    row.push(current)
    rows.push(row)
  }

  return rows
}

function buildPath(points: FxPoint[], series: FxSeries, width: number, height: number, padding: number, minY: number, maxY: number) {
  const usableWidth = width - padding * 2
  const usableHeight = height - padding * 2
  const count = points.length

  return points
    .map((point, index) => {
      const x = padding + (index / Math.max(1, count - 1)) * usableWidth
      const value = point[series]
      const y = padding + (1 - (value - minY) / Math.max(1e-6, maxY - minY)) * usableHeight
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

function parseDate(value: string): Date | null {
  const direct = new Date(value)
  if (!Number.isNaN(direct.getTime())) return direct

  const parts = value.split(/[\/\-]/).map((part) => part.trim())
  if (parts.length === 3) {
    const [a, b, c] = parts.map((part) => Number(part))
    if (!Number.isNaN(a) && !Number.isNaN(b) && !Number.isNaN(c)) {
      const mmFirst = new Date(c, a - 1, b)
      if (!Number.isNaN(mmFirst.getTime())) return mmFirst
      const ddFirst = new Date(c, b - 1, a)
      if (!Number.isNaN(ddFirst.getTime())) return ddFirst
    }
  }

  return null
}

function getWeekKey(date: Date): string {
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = temp.getUTCDay() || 7
  temp.setUTCDate(temp.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1))
  const weekNumber = Math.ceil((((temp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${temp.getUTCFullYear()}-W${String(weekNumber).padStart(2, '0')}`
}

function aggregate(points: FxPoint[], granularity: FxGranularity): FxPoint[] {
  if (granularity === 'daily') return points

  const buckets = new Map<string, { count: number; sumC: number; sumD: number; sumAf: number; label: string }>()

  points.forEach((point) => {
    const parsed = parseDate(point.x)
    const date = parsed ?? new Date(point.x)
    if (Number.isNaN(date.getTime())) return

    let key = ''
    let label = ''
    if (granularity === 'weekly') {
      key = getWeekKey(date)
      label = key
    } else {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      key = `${date.getFullYear()}-${month}`
      label = key
    }

    const entry = buckets.get(key) ?? { count: 0, sumC: 0, sumD: 0, sumAf: 0, label }
    entry.count += 1
    entry.sumC += point.c
    entry.sumD += point.d
    entry.sumAf += point.af
    buckets.set(key, entry)
  })

  return Array.from(buckets.values()).map((entry) => ({
    x: entry.label,
    c: entry.sumC / entry.count,
    d: entry.sumD / entry.count,
    af: entry.sumAf / entry.count,
  }))
}

function filterByRange(points: FxPoint[], range: FxRange): FxPoint[] {
  if (range === 'all') return points

  const dated = points
    .map((point) => {
      const parsed = parseDate(point.x)
      return parsed ? { point, date: parsed } : null
    })
    .filter((entry): entry is { point: FxPoint; date: Date } => Boolean(entry))

  if (!dated.length) return points

  const maxDate = dated.reduce(
    (latest, entry) => (entry.date > latest ? entry.date : latest),
    dated[0].date
  )

  let startDate = new Date(maxDate)

  if (range === 'last30') {
    startDate.setDate(startDate.getDate() - 30)
  } else if (range === 'last12') {
    startDate = new Date(maxDate.getFullYear(), maxDate.getMonth() - 11, maxDate.getDate())
  } else if (range === 'ytd') {
    startDate = new Date(maxDate.getFullYear(), 0, 1)
  }

  return dated
    .filter((entry) => entry.date >= startDate && entry.date <= maxDate)
    .map((entry) => entry.point)
}

export default function FxRatesChart({
  locale = 'en',
}: {
  locale?: 'en' | 'fr'
}) {
  const [rawData, setRawData] = useState<FxPoint[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [granularity, setGranularity] = useState<FxGranularity>('daily')
  const [range, setRange] = useState<FxRange>('all')

  const copy = {
    en: {
      title: 'FX Rates',
      subtitle: 'Live data from Google Sheets',
      loading: 'Loading data...',
      error: 'Unable to load data.',
      granularity: {
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        average: 'Average',
      },
      range: {
        all: 'All data',
        last12: 'Last 12 months',
        ytd: 'YTD',
        last30: 'Last 30 days',
      },
      legend: {
        c: 'USD',
        d: 'EUR',
        af: 'CHF',
      },
    },
    fr: {
      title: 'Taux de change',
      subtitle: 'Donn\u00e9es en direct depuis Google Sheets',
      loading: 'Chargement des donn\u00e9es...',
      error: 'Impossible de charger les donn\u00e9es.',
      granularity: {
        daily: 'Quotidien',
        weekly: 'Hebdomadaire',
        monthly: 'Mensuel',
        average: 'Moyenne',
      },
      range: {
        all: 'Toutes les donnees',
        last12: '12 derniers mois',
        ytd: "Depuis le debut de l'annee",
        last30: '30 derniers jours',
      },
      legend: {
        c: 'Colonne C',
        d: 'Colonne D',
        af: 'Colonne AF',
      },
    },
  }
  const t = copy[locale]

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(SHEET_CSV_URL, { cache: 'no-store' })
        if (!response.ok) {
          throw new Error('fetch_failed')
        }
        const text = await response.text()
        const rows = parseCsv(text)

        const points: FxPoint[] = []

        for (let i = 1; i < rows.length; i += 1) {
          const row = rows[i]
          if (!row || row.length < 32) continue
          const x = (row[0]?.trim() ?? '')
          const c = Number(row[2])
          const d = Number(row[3])
          const af = Number(row[31])
          if (!x || Number.isNaN(c) || Number.isNaN(d) || Number.isNaN(af)) {
            continue
          }
          points.push({ x, c, d, af })
        }

        if (isMounted) {
          setRawData(points)
        }
      } catch (err) {
        if (isMounted) {
          setError('load_failed')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    setHoveredIndex(null)
  }, [granularity, range])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const filteredData = useMemo(() => filterByRange(rawData, range), [rawData, range])
  const data = useMemo(() => aggregate(filteredData, granularity), [filteredData, granularity])

  const chart = useMemo(() => {
    if (!data.length) return null

    const width = 900
    const height = 360
    const padding = 48
    const values = data.flatMap((point) => [point.c, point.d, point.af])
    const minY = Math.min(...values)
    const maxY = Math.max(...values)
    const ticks = 4
    const tickLabels = Array.from({ length: ticks }).map((_, index) => {
      const ratio = index / (ticks - 1)
      const dataIndex = Math.round(ratio * (data.length - 1))
      return data[dataIndex]?.x ?? ''
    })

    const yTicks = Array.from({ length: 5 }).map((_, index) => {
      const ratio = index / 4
      const value = maxY - ratio * (maxY - minY)
      return value
    })

    return {
      width,
      height,
      padding,
      minY,
      maxY,
      tickLabels,
      yTicks,
      names: {
        c: t.legend.c,
        d: t.legend.d,
        af: t.legend.af,
      },
      paths: {
        c: buildPath(data, 'c', width, height, padding, minY, maxY),
        d: buildPath(data, 'd', width, height, padding, minY, maxY),
        af: buildPath(data, 'af', width, height, padding, minY, maxY),
      },
    }
  }, [data, t.legend.af, t.legend.c, t.legend.d])

  const formatValue = (value: number) => value.toFixed(3)

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!chart || !chartRef.current || !svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const scaleX = rect.width / chart.width
    const scaleY = rect.height / chart.height
    const plotLeft = chart.padding * scaleX
    const plotRight = rect.width - chart.padding * scaleX
    const plotTop = chart.padding * scaleY
    const plotBottom = rect.height - chart.padding * scaleY

    const xPx = event.clientX - rect.left
    const yPx = event.clientY - rect.top

    if (xPx < plotLeft || xPx > plotRight || yPx < plotTop || yPx > plotBottom) {
      setHoveredIndex(null)
      return
    }

    const xRatio = Math.min(1, Math.max(0, (xPx - plotLeft) / (plotRight - plotLeft)))
    const index = Math.round(xRatio * (data.length - 1))
    setHoveredIndex(index)

    const x = xPx
    const y = yPx
    const maxLeft = rect.width - 180
    const left = Math.min(x, maxLeft)
    const top = Math.max(y, 12)

    if (tooltipRef.current) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(() => {
        if (!tooltipRef.current) return
        tooltipRef.current.style.transform = `translate3d(${left}px, ${top}px, 0)`
      })
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="py-12 md:py-20 border-t border-gray-800">
        <div className="text-center mb-10">
          <h1 className="h2 mb-2">{t.title}</h1>
          <p className="text-lg text-gray-400">{t.subtitle}</p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3">
            <div className="inline-flex rounded-full bg-gray-800 p-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
              {(['all', 'last12', 'ytd', 'last30'] as FxRange[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRange(option)}
                  className={`px-4 py-2 rounded-full transition ${
                    range === option ? 'bg-purple-600 text-white' : 'hover:text-white'
                  }`}
                >
                  {t.range[option]}
                </button>
              ))}
            </div>
            <div className="inline-flex rounded-full bg-gray-800 p-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
              {(['daily', 'weekly', 'monthly'] as FxGranularity[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setGranularity(option)}
                  className={`px-4 py-2 rounded-full transition ${
                    granularity === option ? 'bg-purple-600 text-white' : 'hover:text-white'
                  }`}
                >
                  {t.granularity[option]}
                </button>
              ))}
            </div>
          </div>
          {granularity !== 'daily' && (
            <div className="mt-2 text-xs text-gray-500">
              {t.granularity.average}
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center text-gray-400">{t.loading}</div>
        )}
        {!loading && error && (
          <div className="text-center text-red-300">{t.error}</div>
        )}

        {!loading && !error && chart && (
          <div className="relative w-full overflow-x-auto" ref={chartRef}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${chart.width} ${chart.height}`}
              className="w-full h-auto"
              role="img"
              aria-label="FX rates chart"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <rect
                x="0"
                y="0"
                width={chart.width}
                height={chart.height}
                rx="16"
                fill="#0f172a"
              />

              <g stroke="#1f2937" strokeWidth="1">
                {Array.from({ length: 5 }).map((_, index) => {
                  const y =
                    chart.padding +
                    (index / 4) * (chart.height - chart.padding * 2)
                  return (
                    <line
                      key={`grid-${index}`}
                      x1={chart.padding}
                      x2={chart.width - chart.padding}
                      y1={y}
                      y2={y}
                    />
                  )
                })}
              </g>

              <g fill="#94a3b8" fontSize="12">
                {chart.yTicks.map((value, index) => {
                  const y =
                    chart.padding +
                    (index / 4) * (chart.height - chart.padding * 2)
                  return (
                    <text
                      key={`y-tick-${index}`}
                      x={chart.padding - 8}
                      y={y + 4}
                      textAnchor="end"
                    >
                      {value.toFixed(3)}
                    </text>
                  )
                })}
              </g>

              <path
                d={chart.paths.c}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
              />
              <path
                d={chart.paths.d}
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
              />
              <path
                d={chart.paths.af}
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
              />

              {hoveredIndex !== null && (
                <line
                  x1={chart.padding + (hoveredIndex / Math.max(1, data.length - 1)) * (chart.width - chart.padding * 2)}
                  x2={chart.padding + (hoveredIndex / Math.max(1, data.length - 1)) * (chart.width - chart.padding * 2)}
                  y1={chart.padding}
                  y2={chart.height - chart.padding}
                  stroke="#64748b"
                  strokeDasharray="4 4"
                />
              )}

              {hoveredIndex !== null && data[hoveredIndex] && (
                <g>
                  {(['c', 'd', 'af'] as FxSeries[]).map((series) => {
                    const x =
                      chart.padding +
                      (hoveredIndex / Math.max(1, data.length - 1)) *
                        (chart.width - chart.padding * 2)
                    const value = data[hoveredIndex][series]
                    const y =
                      chart.padding +
                      (1 - (value - chart.minY) / Math.max(1e-6, chart.maxY - chart.minY)) *
                        (chart.height - chart.padding * 2)
                    return (
                      <circle
                        key={`dot-${series}`}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#ffffff"
                        stroke="#0f172a"
                        strokeWidth="1.5"
                      />
                    )
                  })}
                </g>
              )}

              <g fill="#94a3b8" fontSize="12">
                {chart.tickLabels.map((label, index) => {
                  const x =
                    chart.padding +
                    (index / (chart.tickLabels.length - 1)) *
                      (chart.width - chart.padding * 2)
                  return (
                    <text key={`tick-${index}`} x={x} y={chart.height - 16} textAnchor="middle">
                      {label}
                    </text>
                  )
                })}
              </g>
            </svg>

            {hoveredIndex !== null && data[hoveredIndex] && (
              <div
                ref={tooltipRef}
                className="pointer-events-none absolute left-0 top-0 z-10 rounded-md bg-slate-900/95 px-3 py-2 text-xs text-slate-100 shadow-lg"
              >
                <div className="font-semibold text-slate-200">
                  {data[hoveredIndex].x}
                </div>
                <div className="mt-1 flex flex-col gap-0.5">
                  <span className="text-purple-300">
                    {chart.names.c}: {formatValue(data[hoveredIndex].c)}
                  </span>
                  <span className="text-green-300">
                    {chart.names.d}: {formatValue(data[hoveredIndex].d)}
                  </span>
                  <span className="text-orange-300">
                    {chart.names.af}: {formatValue(data[hoveredIndex].af)}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-purple-500" />
                {t.legend.c}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
                {t.legend.d}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-orange-500" />
                {t.legend.af}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
