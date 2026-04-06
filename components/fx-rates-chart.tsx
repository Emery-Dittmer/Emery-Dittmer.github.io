'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1nRwUi7dj7CawaSAjiHQ4Rp3KkPecmds9wlvZz5hyenU/export?format=csv'

// Currencies that should appear first in the + dropdown (in this order)
const PRIORITY_CURRENCIES = ['USD', 'EUR', 'CHF', 'CAD', 'GBP']

// A regex to identify currency-like column headers (2–4 uppercase letters)
const CURRENCY_CODE_RE = /^[A-Z]{2,4}$/

// Fixed colours for well-known currencies; extras get colours from the palette below
const CURRENCY_COLORS: Record<string, string> = {
  USD: '#a855f7',
  EUR: '#22c55e',
  CHF: '#f97316',
  CAD: '#3b82f6',
  GBP: '#ec4899',
}

const EXTRA_COLORS = [
  '#06b6d4', '#f59e0b', '#84cc16', '#6366f1', '#14b8a6',
  '#f43f5e', '#8b5cf6', '#0ea5e9', '#d97706', '#10b981',
]

function getCurrencyColor(code: string, allCurrencies: string[]): string {
  if (CURRENCY_COLORS[code]) return CURRENCY_COLORS[code]
  const extraIndex = allCurrencies
    .filter((c) => !CURRENCY_COLORS[c])
    .indexOf(code)
  return EXTRA_COLORS[extraIndex % EXTRA_COLORS.length]
}

const CURRENCY_FLAGS: Record<string, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  CHF: '🇨🇭',
  CAD: '🇨🇦',
  GBP: '🇬🇧',
  JPY: '🇯🇵',
  AUD: '🇦🇺',
  NZD: '🇳🇿',
  SEK: '🇸🇪',
  NOK: '🇳🇴',
  DKK: '🇩🇰',
  CNY: '🇨🇳',
  HKD: '🇭🇰',
  SGD: '🇸🇬',
  MXN: '🇲🇽',
  BRL: '🇧🇷',
  INR: '🇮🇳',
  KRW: '🇰🇷',
  ZAR: '🇿🇦',
  TRY: '🇹🇷',
  RUB: '🇷🇺',
  PLN: '🇵🇱',
  CZK: '🇨🇿',
  HUF: '🇭🇺',
  ILS: '🇮🇱',
  AED: '🇦🇪',
  SAR: '🇸🇦',
  THB: '🇹🇭',
  MYR: '🇲🇾',
  IDR: '🇮🇩',
  PHP: '🇵🇭',
  VND: '🇻🇳',
  CLP: '🇨🇱',
  COP: '🇨🇴',
  ARS: '🇦🇷',
  PEN: '🇵🇪',
  RON: '🇷🇴',
  HRK: '🇭🇷',
  BGN: '🇧🇬',
  ISK: '🇮🇸',
}

const BASE_OPTIONS = ['CAD', 'USD', 'EUR', 'CHF', 'GBP']

type RawPoint = {
  x: string
  rates: Record<string, number>
}

type FxGranularity = 'daily' | 'weekly' | 'monthly'
type FxRange = 'all' | 'last12' | 'ytd' | 'last30' | 'custom'

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

function parseDate(value: string): Date | null {
  const direct = new Date(value)
  if (!Number.isNaN(direct.getTime())) return direct

  const parts = value.split(/[\/\-]/).map((p) => p.trim())
  if (parts.length === 3) {
    const [a, b, c] = parts.map(Number)
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

function aggregate(points: RawPoint[], granularity: FxGranularity): RawPoint[] {
  if (granularity === 'daily') return points

  const buckets = new Map<string, { count: number; sums: Record<string, number>; label: string }>()

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

    const entry = buckets.get(key) ?? { count: 0, sums: {}, label }
    entry.count += 1
    for (const [code, rate] of Object.entries(point.rates)) {
      entry.sums[code] = (entry.sums[code] ?? 0) + rate
    }
    buckets.set(key, entry)
  })

  return Array.from(buckets.values()).map((entry) => ({
    x: entry.label,
    rates: Object.fromEntries(
      Object.entries(entry.sums).map(([code, sum]) => [code, sum / entry.count])
    ),
  }))
}

function filterByRange(
  points: RawPoint[],
  range: FxRange,
  customStart?: Date | null,
  customEnd?: Date | null
): RawPoint[] {
  if (range === 'all') return points

  const dated = points
    .map((point) => {
      const parsed = parseDate(point.x)
      return parsed ? { point, date: parsed } : null
    })
    .filter((entry): entry is { point: RawPoint; date: Date } => Boolean(entry))

  if (!dated.length) return points

  if (range === 'custom') {
    if (!customStart || !customEnd) return points
    const s = customStart < customEnd ? customStart : customEnd
    const e = customStart < customEnd ? customEnd : customStart
    return dated.filter((entry) => entry.date >= s && entry.date <= e).map((entry) => entry.point)
  }

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

// Remove per-currency values that are more than 3× the previous valid value (200% above).
// The bad value is deleted from the rates record so the chart skips it cleanly.
function cleanSpikes(points: RawPoint[]): RawPoint[] {
  const lastValid: Record<string, number> = {}
  return points.map((point) => {
    const rates = { ...point.rates }
    for (const code of Object.keys(rates)) {
      const val = rates[code]
      const prev = lastValid[code]
      if (prev !== undefined && val > prev * 3) {
        delete rates[code]
      } else {
        lastValid[code] = val
      }
    }
    return { ...point, rates }
  })
}

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatDateLabel(x: string): string {
  const d = parseDate(x)
  if (!d) return x
  const dd = String(d.getDate()).padStart(2, '0')
  const mmm = MONTHS_SHORT[d.getMonth()]
  const yy = String(d.getFullYear()).slice(2)
  return `${dd}-${mmm}-${yy}`
}

function buildPath(
  points: RawPoint[],
  currency: string,
  width: number,
  height: number,
  padding: number,
  minY: number,
  maxY: number
): string {
  const usableWidth = width - padding * 2
  const usableHeight = height - padding * 2
  const count = points.length

  return points
    .map((point, index) => {
      const x = padding + (index / Math.max(1, count - 1)) * usableWidth
      const value = point.rates[currency] ?? 0
      const y = padding + (1 - (value - minY) / Math.max(1e-6, maxY - minY)) * usableHeight
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

export default function FxRatesChart({
  locale = 'en',
}: {
  locale?: 'en' | 'fr'
}) {
  const [containerWidth, setContainerWidth] = useState(900)
  const [clipWidth, setClipWidth] = useState(0)
  const [rawData, setRawData] = useState<RawPoint[]>([])
  const [allCurrencies, setAllCurrencies] = useState<string[]>(['USD', 'EUR', 'CHF'])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const animRafRef = useRef<number | null>(null)
  const animStartRef = useRef<number | null>(null)
  const addMenuRef = useRef<HTMLDivElement>(null)
  const [granularity, setGranularity] = useState<FxGranularity>('daily')
  const [range, setRange] = useState<FxRange>('all')
  const [baseCurrency, setBaseCurrency] = useState('CAD')
  const [activeCurrencies, setActiveCurrencies] = useState(['USD', 'EUR', 'CHF'])
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [addSearch, setAddSearch] = useState('')
  const [customStart, setCustomStart] = useState<Date | null>(null)
  const [customEnd, setCustomEnd] = useState<Date | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarStep, setCalendarStep] = useState<'start' | 'end'>('start')
  const [calendarHover, setCalendarHover] = useState<Date | null>(null)
  const [calViewYear, setCalViewYear] = useState(new Date().getFullYear())
  const [calViewMonth, setCalViewMonth] = useState(new Date().getMonth())
  const calendarRef = useRef<HTMLDivElement>(null)
  const baseDropdownRef = useRef<HTMLDivElement>(null)
  const [showBaseDropdown, setShowBaseDropdown] = useState(false)
  const [baseSearch, setBaseSearch] = useState('')
  const [analyzerCurrencies, setAnalyzerCurrencies] = useState(['USD', 'EUR', 'CHF', 'GBP', 'CAD', 'JPY', 'BRL'])
  const [analyzerEditSlot, setAnalyzerEditSlot] = useState<string | null>(null)
  const [analyzerSearch, setAnalyzerSearch] = useState('')
  const analyzerEditRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [analyzerOpen, setAnalyzerOpen] = useState(true)
  const [calculatorOpen, setCalculatorOpen] = useState(true)
  const [calcSource, setCalcSource] = useState<string | null>(null)
  const [calcInput, setCalcInput] = useState('1')

  const copy = {
    en: {
      title: 'FX Rates',
      subtitle: 'Live data from Google Sheets',
      loading: 'Loading data...',
      error: 'Unable to load data.',
      baseCurrency: 'Base currency',
      addCurrency: 'Add currency',
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
        custom: 'Custom',
      },
    },
    fr: {
      title: 'Taux de change',
      subtitle: 'Données en direct depuis Google Sheets',
      loading: 'Chargement des données...',
      error: 'Impossible de charger les données.',
      baseCurrency: 'Devise de base',
      addCurrency: 'Ajouter une devise',
      granularity: {
        daily: 'Quotidien',
        weekly: 'Hebdomadaire',
        monthly: 'Mensuel',
        average: 'Moyenne',
      },
      range: {
        all: 'Toutes les données',
        last12: '12 derniers mois',
        ytd: "Depuis le début de l'année",
        last30: '30 derniers jours',
        custom: 'Personnalisé',
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
        if (!response.ok) throw new Error('fetch_failed')
        const text = await response.text()
        const rows = parseCsv(text)
        if (!rows.length) return

        // Detect currency columns from the header row (col 0 = date, skip CAD = base anchor)
        const header = rows[0]
        const currencyCols: { code: string; colIndex: number }[] = []
        header.forEach((cell, i) => {
          if (i === 0) return
          const code = cell.trim().toUpperCase()
          if (CURRENCY_CODE_RE.test(code) && code !== 'CAD') {
            currencyCols.push({ code, colIndex: i })
          }
        })

        // Sort: priority currencies first (in order), then remaining alphabetically
        const detected = currencyCols.map((c) => c.code)
        const sorted = [
          ...PRIORITY_CURRENCIES.filter((c) => detected.includes(c) && c !== 'CAD'),
          ...detected.filter((c) => !PRIORITY_CURRENCIES.includes(c)).sort(),
        ]
        // CAD is always available to chart (it equals 1 when base=CAD, or derived otherwise)
        const allCodes = ['CAD', ...sorted]

        const points: RawPoint[] = []
        for (let i = 1; i < rows.length; i += 1) {
          const row = rows[i]
          if (!row || row.length < 2) continue
          const x = row[0]?.trim() ?? ''
          if (!x) continue

          // CAD rate vs itself is always 1 — used as anchor for cross-currency conversion
          const rates: Record<string, number> = { CAD: 1 }
          for (const { code, colIndex } of currencyCols) {
            if (colIndex >= row.length) continue
            const val = Number(row[colIndex])
            if (!Number.isNaN(val) && val > 0) rates[code] = val
          }

          points.push({ x, rates })
        }

        if (isMounted) {
          setAllCurrencies(allCodes)
          setRawData(cleanSpikes(points))
        }
      } catch {
        if (isMounted) setError('load_failed')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => { isMounted = false }
  }, [])

  // When base currency changes, adjust active currencies:
  // - keep the new base if it was already active (it will render as a flat 1.0 line)
  // - special case: when CAD is the base, ensure CAD is active so it shows as a flat 1.0 line
  // - add CAD if switching away from CAD and it's not already shown
  useEffect(() => {
    setActiveCurrencies((prev) => {
      if (baseCurrency === 'CAD') {
        if (!prev.includes('CAD')) return ['CAD', ...prev]
        return prev
      }
      if (!prev.includes('CAD')) {
        return ['CAD', ...prev]
      }
      return prev
    })
  }, [baseCurrency])

  useEffect(() => {
    setHoveredIndex(null)
  }, [granularity, range])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Track container width to drive responsive chart height
  useEffect(() => {
    if (!chartRef.current) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setContainerWidth(w)
    })
    ro.observe(chartRef.current)
    return () => ro.disconnect()
  }, [])

  // Close add menu when clicking outside
  useEffect(() => {
    if (!showAddMenu) return
    const handler = (e: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target as Node)) {
        setShowAddMenu(false)
        setAddSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showAddMenu])

  // Close base dropdown when clicking outside
  useEffect(() => {
    if (!showBaseDropdown) return
    const handler = (e: MouseEvent) => {
      if (baseDropdownRef.current && !baseDropdownRef.current.contains(e.target as Node)) {
        setShowBaseDropdown(false)
        setBaseSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showBaseDropdown])

  // Close analyzer slot dropdown when clicking outside
  useEffect(() => {
    if (!analyzerEditSlot) return
    const handler = (e: MouseEvent) => {
      const ref = analyzerEditRefs.current[analyzerEditSlot]
      if (ref && !ref.contains(e.target as Node)) {
        setAnalyzerEditSlot(null)
        setAnalyzerSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [analyzerEditSlot])

  // Close calendar when clicking outside
  useEffect(() => {
    if (!showCalendar) return
    const handler = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showCalendar])

  const filteredData = useMemo(
    () => filterByRange(rawData, range, customStart, customEnd),
    [rawData, range, customStart, customEnd]
  )
  const aggregatedData = useMemo(() => aggregate(filteredData, granularity), [filteredData, granularity])

  // Convert all rates relative to the selected base currency.
  // Raw data is CAD-based: rates[X] = units of X per 1 CAD.
  // For a new base B: newRate[X] = rawRate[X] / rawRate[B]
  // This works for CAD too since rawRate[CAD] = 1.
  const displayData = useMemo(() => {
    if (baseCurrency === 'CAD') return aggregatedData
    return aggregatedData.map((point) => {
      const baseRate = point.rates[baseCurrency] ?? 1
      const newRates: Record<string, number> = {}
      for (const [code, rate] of Object.entries(point.rates)) {
        newRates[code] = rate / baseRate
      }
      return { x: point.x, rates: newRates }
    })
  }, [aggregatedData, baseCurrency])

  useEffect(() => {
    const totalWidth = 900
    const duration = 700
    if (animRafRef.current !== null) cancelAnimationFrame(animRafRef.current)
    animStartRef.current = null
    setClipWidth(0)
    const step = (timestamp: number) => {
      if (animStartRef.current === null) animStartRef.current = timestamp
      const elapsed = timestamp - animStartRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setClipWidth(eased * totalWidth)
      if (progress < 1) animRafRef.current = requestAnimationFrame(step)
    }
    animRafRef.current = requestAnimationFrame(step)
    return () => {
      if (animRafRef.current !== null) cancelAnimationFrame(animRafRef.current)
    }
  }, [displayData, baseCurrency])

  const availableToAdd = allCurrencies.filter(
    (c) => !activeCurrencies.includes(c) && (c !== baseCurrency || baseCurrency === 'CAD')
  )

  const chart = useMemo(() => {
    if (!displayData.length || !activeCurrencies.length) return null

    const width = 900
    const isMobile = containerWidth < 640
    // Taller viewBox on mobile so the chart fills more vertical space
    const height = isMobile ? 560 : 360
    // Larger font + padding on mobile so axis labels are readable
    const fontSize = isMobile ? 22 : 12
    const padding = isMobile ? 72 : 52

    const values = displayData
      .flatMap((point) => activeCurrencies.map((code) => point.rates[code] ?? 0))
      .filter((v) => v > 0)

    if (!values.length) return null

    const minY = Math.min(...values)
    const maxY = Math.max(...values)

    const ticks = 4
    const tickLabels = Array.from({ length: ticks }).map((_, index) => {
      const ratio = index / (ticks - 1)
      const dataIndex = Math.round(ratio * (displayData.length - 1))
      return formatDateLabel(displayData[dataIndex]?.x ?? '')
    })

    const yTicks = Array.from({ length: 5 }).map((_, index) => {
      const ratio = index / 4
      return maxY - ratio * (maxY - minY)
    })

    return {
      width,
      height,
      padding,
      fontSize,
      minY,
      maxY,
      tickLabels,
      yTicks,
      paths: Object.fromEntries(
        activeCurrencies.map((code) => [
          code,
          buildPath(displayData, code, width, height, padding, minY, maxY),
        ])
      ),
    }
  }, [displayData, activeCurrencies])

  const trendAnalysis = useMemo(() => {
    if (displayData.length < 2) return null

    const rows = analyzerCurrencies
      .filter((code) => code !== baseCurrency)
      .map((code) => {
        const vals = displayData
          .map((p, i) => ({ i, v: p.rates[code] }))
          .filter((d): d is { i: number; v: number } => d.v != null && d.v > 0)

        if (vals.length < 2) return null

        const n = vals.length
        const first = vals[0].v
        const last = vals[n - 1].v
        const pctChange = ((last - first) / first) * 100

        // Linear regression slope
        const sumX = vals.reduce((s, d) => s + d.i, 0)
        const sumY = vals.reduce((s, d) => s + d.v, 0)
        const sumXY = vals.reduce((s, d) => s + d.i * d.v, 0)
        const sumX2 = vals.reduce((s, d) => s + d.i * d.i, 0)
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)

        // Daily log returns
        const returns: number[] = []
        for (let k = 1; k < vals.length; k++) {
          returns.push(Math.log(vals[k].v / vals[k - 1].v))
        }
        const meanR = returns.reduce((s, r) => s + r, 0) / returns.length
        const variance = returns.reduce((s, r) => s + (r - meanR) ** 2, 0) / returns.length
        const volatility = Math.sqrt(variance) * 100  // as %

        // Max drawdown (peak-to-trough on raw values)
        let peak = vals[0].v
        let maxDD = 0
        for (const d of vals) {
          if (d.v > peak) peak = d.v
          const dd = (peak - d.v) / peak
          if (dd > maxDD) maxDD = dd
        }

        // Trend consistency: % of periods moving in the same direction as the net change
        const netUp = pctChange > 0
        const consistent = returns.filter((r) => netUp ? r > 0 : r < 0).length
        const consistency = (consistent / returns.length) * 100

        const abs = Math.abs(pctChange)
        const magnitude: 'strong' | 'moderate' | 'weak' =
          abs >= 5 ? 'strong' : abs >= 1.5 ? 'moderate' : 'weak'

        // Directional score: +1 = base strengthened vs this pair, -1 = weakened
        // Weighted by consistency so noisy signals count less
        const dirScore = (pctChange > 0 ? 1 : pctChange < 0 ? -1 : 0) * (consistency / 100)

        return { code, pctChange, slope, volatility, maxDrawdown: maxDD * 100, consistency, magnitude, dirScore }
      })
      .filter(Boolean) as {
        code: string; pctChange: number; slope: number
        volatility: number; maxDrawdown: number; consistency: number
        magnitude: 'strong' | 'moderate' | 'weak'; dirScore: number
      }[]

    if (!rows.length) return null

    // Overall strength score: average directional score across all pairs, scaled to -100…+100
    const overallScore = (rows.reduce((s, r) => s + r.dirScore, 0) / rows.length) * 100
    const bullish = rows.filter((r) => r.pctChange > 0).length
    const bearish = rows.filter((r) => r.pctChange < 0).length

    return { rows, overallScore, bullish, bearish }
  }, [displayData, baseCurrency, analyzerCurrencies])

  // Latest rates for the calculator: baseCurrency is always 1, others from last displayData point
  const calcRates = useMemo(() => {
    if (!displayData.length) return {} as Record<string, number>
    const last = displayData[displayData.length - 1]
    return { [baseCurrency]: 1, ...last.rates } as Record<string, number>
  }, [displayData, baseCurrency])

  // Currencies shown in the calculator: base + active currencies (deduped)
  const calcCurrencies = useMemo(
    () => [baseCurrency, ...activeCurrencies.filter((c) => c !== baseCurrency)],
    [baseCurrency, activeCurrencies]
  )

  const formatValue = (value: number) => value.toFixed(4)

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
    const index = Math.round(xRatio * (displayData.length - 1))
    setHoveredIndex(index)

    const maxLeft = rect.width - 180
    const left = Math.min(xPx, maxLeft)
    const top = Math.max(yPx, 12)

    if (tooltipRef.current) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
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

          {/* Base currency selector */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <span className="text-sm sm:text-xs uppercase tracking-widest text-gray-500">{t.baseCurrency}</span>
            <div className="flex items-center gap-2 flex-wrap justify-center w-full">
              {/* Quick-pick pills — scrollable on mobile */}
              <div className="max-w-full overflow-x-auto pb-1">
                <div className="inline-flex rounded-full bg-gray-800 p-1 text-sm sm:text-xs font-semibold uppercase tracking-wide text-gray-300">
                  {BASE_OPTIONS.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => { setBaseCurrency(code); setShowBaseDropdown(false); setBaseSearch('') }}
                      className={`px-4 py-2 rounded-full transition ${
                        baseCurrency === code ? 'bg-purple-600 text-white' : 'hover:text-white'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom base dropdown */}
              <div className="relative" ref={baseDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowBaseDropdown((v) => !v)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition ${
                    !BASE_OPTIONS.includes(baseCurrency)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:text-white'
                  }`}
                >
                  {!BASE_OPTIONS.includes(baseCurrency) ? (
                    <>
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full overflow-hidden" style={{ fontSize: '1rem', lineHeight: 1 }}>
                        {CURRENCY_FLAGS[baseCurrency] ?? '🏳️'}
                      </span>
                      {baseCurrency}
                    </>
                  ) : (
                    <>Custom ▾</>
                  )}
                </button>

                {showBaseDropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-30 w-52 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
                    <div className="p-2 border-b border-slate-700">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search currency…"
                        value={baseSearch}
                        onChange={(e) => setBaseSearch(e.target.value.toUpperCase())}
                        className="w-full bg-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2 outline-none placeholder-slate-500 border border-slate-600 focus:border-purple-500 transition"
                      />
                    </div>
                    <div className="max-h-52 overflow-y-auto py-1">
                      {allCurrencies
                        .filter((c) => c !== baseCurrency && c.includes(baseSearch))
                        .map((code) => {
                          const color = getCurrencyColor(code, allCurrencies)
                          return (
                            <button
                              key={code}
                              type="button"
                              onClick={() => {
                                setBaseCurrency(code)
                                setShowBaseDropdown(false)
                                setBaseSearch('')
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-slate-700 transition"
                            >
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full overflow-hidden flex-shrink-0" style={{ fontSize: '1.1rem', lineHeight: 1 }}>
                                {CURRENCY_FLAGS[code] ?? '🏳️'}
                              </span>
                              <span style={{ color }} className="font-semibold">{code}</span>
                            </button>
                          )
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-3">
            {/* Range pills — scrollable on mobile */}
            <div className="max-w-full overflow-x-auto pb-1">
              <div className="inline-flex rounded-full bg-gray-800 p-1 text-sm sm:text-xs font-semibold uppercase tracking-wide text-gray-300 whitespace-nowrap">
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
            </div>

            {/* Custom date range — separate from preset pills */}
            <div className="relative" ref={calendarRef}>
              <button
                type="button"
                onClick={() => {
                  setRange('custom')
                  setShowCalendar((v) => !v)
                }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm sm:text-xs font-semibold uppercase tracking-wide transition border ${
                  range === 'custom'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white hover:border-gray-500'
                }`}
              >
                <span>📅</span>
                {range === 'custom' && customStart && customEnd
                  ? `${customStart.toLocaleDateString('en', { month: 'short', day: 'numeric' })} – ${customEnd.toLocaleDateString('en', { month: 'short', day: 'numeric' })}`
                  : t.range.custom}
              </button>

              {showCalendar && (() => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
                const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa']
                const firstDay = new Date(calViewYear, calViewMonth, 1).getDay()
                const daysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate()

                const prevMonth = () => {
                  if (calViewMonth === 0) { setCalViewMonth(11); setCalViewYear(y => y - 1) }
                  else setCalViewMonth(m => m - 1)
                }
                const nextMonth = () => {
                  if (calViewMonth === 11) { setCalViewMonth(0); setCalViewYear(y => y + 1) }
                  else setCalViewMonth(m => m + 1)
                }

                const handleDay = (day: number) => {
                  const d = new Date(calViewYear, calViewMonth, day)
                  if (d > today) return
                  if (calendarStep === 'start') {
                    setCustomStart(d)
                    setCustomEnd(null)
                    setCalendarStep('end')
                  } else {
                    setCustomEnd(d)
                    setCalendarStep('start')
                    setShowCalendar(false)
                  }
                }

                const inRange = (day: number) => {
                  const d = new Date(calViewYear, calViewMonth, day)
                  const end = calendarStep === 'end' ? (calendarHover ?? customEnd) : customEnd
                  if (!customStart || !end) return false
                  const s = customStart < end ? customStart : end
                  const e = customStart < end ? end : customStart
                  return d > s && d < e
                }

                const isSelected = (day: number) => {
                  const d = new Date(calViewYear, calViewMonth, day)
                  return (customStart && d.toDateString() === customStart.toDateString()) ||
                         (customEnd && d.toDateString() === customEnd.toDateString()) || false
                }

                return (
                  <div className="fixed sm:absolute left-1/2 -translate-x-1/2 top-1/2 sm:top-full -translate-y-1/2 sm:translate-y-0 sm:mt-2 z-50 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-4 w-[min(18rem,90vw)] select-none">
                    <div className="text-xs text-slate-400 text-center mb-3 font-medium">
                      {calendarStep === 'start' ? 'Select start date' : 'Select end date'}
                    </div>

                    {/* Month navigation */}
                    <div className="flex items-center justify-between mb-3">
                      <button type="button" onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-700 text-slate-300 transition">‹</button>
                      <span className="text-sm font-semibold text-white">{MONTHS[calViewMonth]} {calViewYear}</span>
                      <button type="button" onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-700 text-slate-300 transition">›</button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAYS.map(d => (
                        <div key={d} className="text-center text-xs text-slate-500 font-medium py-1">{d}</div>
                      ))}
                    </div>

                    {/* Day grid */}
                    <div className="grid grid-cols-7">
                      {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        const d = new Date(calViewYear, calViewMonth, day)
                        const future = d > today
                        const sel = isSelected(day)
                        const inR = inRange(day)
                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={future}
                            onClick={() => handleDay(day)}
                            onMouseEnter={() => !future && calendarStep === 'end' && setCalendarHover(new Date(calViewYear, calViewMonth, day))}
                            onMouseLeave={() => setCalendarHover(null)}
                            className={`h-8 w-full text-xs rounded-full transition font-medium
                              ${future ? 'text-slate-700 cursor-not-allowed' : ''}
                              ${!future && sel ? 'bg-purple-600 text-white' : ''}
                              ${!future && inR && !sel ? 'bg-purple-900/50 text-purple-200' : ''}
                              ${!future && !sel && !inR ? 'text-slate-300 hover:bg-slate-700' : ''}
                            `}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>

                    {/* Footer */}
                    <div className="mt-3 flex justify-between items-center border-t border-slate-700 pt-3">
                      <button
                        type="button"
                        onClick={() => { setCustomStart(null); setCustomEnd(null); setCalendarStep('start'); setRange('all'); setShowCalendar(false) }}
                        className="text-xs text-slate-400 hover:text-white transition"
                      >
                        Clear
                      </button>
                      {customStart && customEnd && (
                        <span className="text-xs text-slate-400">
                          {customStart.toLocaleDateString()} – {customEnd.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Granularity pills — scrollable on mobile */}
            <div className="max-w-full overflow-x-auto pb-1">
              <div className="inline-flex rounded-full bg-gray-800 p-1 text-sm sm:text-xs font-semibold uppercase tracking-wide text-gray-300 whitespace-nowrap">
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
          </div>
          {granularity !== 'daily' && (
            <div className="mt-2 text-xs text-gray-500">{t.granularity.average}</div>
          )}
        </div>

        {loading && <div className="text-center text-gray-400">{t.loading}</div>}
        {!loading && error && <div className="text-center text-red-300">{t.error}</div>}

        {!loading && !error && chart && (
          <div className="relative w-full overflow-x-auto" ref={chartRef}>
            {/* Currency bubbles + add button */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {activeCurrencies.map((code) => {
                const color = getCurrencyColor(code, allCurrencies)
                return (
                  <span
                    key={code}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm sm:text-xs font-semibold"
                    style={{
                      backgroundColor: `${color}22`,
                      color,
                      border: `1px solid ${color}55`,
                    }}
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ fontSize: '1.35rem', lineHeight: 1 }}>{CURRENCY_FLAGS[code] ?? '🏳️'}</span>
                    {code}
                    {activeCurrencies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveCurrencies((prev) => prev.filter((c) => c !== code))}
                        className="ml-0.5 leading-none opacity-50 hover:opacity-100 transition"
                        aria-label={`Remove ${code}`}
                      >
                        ×
                      </button>
                    )}
                  </span>
                )
              })}

              {availableToAdd.length > 0 && (
                <div className="relative" ref={addMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowAddMenu((prev) => !prev)}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-500 hover:text-white transition text-base font-bold leading-none"
                    aria-label={t.addCurrency}
                  >
                    +
                  </button>
                  {showAddMenu && (
                    <div className="absolute left-0 top-full mt-2 z-20 rounded-lg bg-slate-800 border border-slate-700 shadow-xl w-36 overflow-hidden">
                      <div className="p-2 border-b border-slate-700">
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search…"
                          value={addSearch}
                          onChange={(e) => setAddSearch(e.target.value.toUpperCase())}
                          className="w-full bg-slate-700 text-slate-100 text-xs rounded-md px-2 py-1.5 outline-none placeholder-slate-500 border border-slate-600 focus:border-purple-500 transition"
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto py-1">
                        {availableToAdd
                          .filter((code) => code.includes(addSearch))
                          .map((code) => {
                            const color = getCurrencyColor(code, allCurrencies)
                            return (
                              <button
                                key={code}
                                type="button"
                                onClick={() => {
                                  setActiveCurrencies((prev) => [...prev, code])
                                  setShowAddMenu(false)
                                  setAddSearch('')
                                }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-slate-700 transition"
                              >
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full overflow-hidden flex-shrink-0" style={{ fontSize: '1.1rem', lineHeight: 1 }}>{CURRENCY_FLAGS[code] ?? '🏳️'}</span>
                                <span style={{ color }} className="font-semibold">{code}</span>
                              </button>
                            )
                          })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <svg
              ref={svgRef}
              viewBox={`0 0 ${chart.width} ${chart.height}`}
              className="w-full h-auto"
              role="img"
              aria-label={`FX rates chart Basis:${baseCurrency}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <rect x="0" y="0" width={chart.width} height={chart.height} rx="16" fill="#0f172a" />

              <defs>
                <clipPath id="chart-reveal">
                  <rect x="0" y="0" height={chart.height} width={clipWidth} />
                </clipPath>
              </defs>

              <g stroke="#1f2937" strokeWidth="1">
                {Array.from({ length: 5 }).map((_, index) => {
                  const y = chart.padding + (index / 4) * (chart.height - chart.padding * 2)
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

              <g fill="#94a3b8" fontSize={chart.fontSize}>
                {chart.yTicks.map((value, index) => {
                  const y = chart.padding + (index / 4) * (chart.height - chart.padding * 2)
                  return (
                    <text key={`y-tick-${index}`} x={chart.padding - 8} y={y + 4} textAnchor="end">
                      {value.toFixed(3)}
                    </text>
                  )
                })}
              </g>

              <g clipPath="url(#chart-reveal)">
                {activeCurrencies.map((code) => (
                  <path
                    key={`path-${code}`}
                    d={chart.paths[code]}
                    fill="none"
                    stroke={getCurrencyColor(code, allCurrencies)}
                    strokeWidth="2.5"
                  />
                ))}
              </g>

              {hoveredIndex !== null && (
                <line
                  x1={chart.padding + (hoveredIndex / Math.max(1, displayData.length - 1)) * (chart.width - chart.padding * 2)}
                  x2={chart.padding + (hoveredIndex / Math.max(1, displayData.length - 1)) * (chart.width - chart.padding * 2)}
                  y1={chart.padding}
                  y2={chart.height - chart.padding}
                  stroke="#64748b"
                  strokeDasharray="4 4"
                />
              )}

              {hoveredIndex !== null && displayData[hoveredIndex] && (
                <g>
                  {activeCurrencies.map((code) => {
                    const x =
                      chart.padding +
                      (hoveredIndex / Math.max(1, displayData.length - 1)) *
                        (chart.width - chart.padding * 2)
                    const value = displayData[hoveredIndex].rates[code] ?? 0
                    const y =
                      chart.padding +
                      (1 - (value - chart.minY) / Math.max(1e-6, chart.maxY - chart.minY)) *
                        (chart.height - chart.padding * 2)
                    return (
                      <circle
                        key={`dot-${code}`}
                        cx={x}
                        cy={y}
                        r="4"
                        fill={getCurrencyColor(code, allCurrencies)}
                        stroke="#0f172a"
                        strokeWidth="1.5"
                      />
                    )
                  })}
                </g>
              )}

              <g fill="#94a3b8" fontSize={chart.fontSize}>
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

            {hoveredIndex !== null && displayData[hoveredIndex] && (
              <div
                ref={tooltipRef}
                className="pointer-events-none absolute left-0 top-0 z-10 rounded-md bg-slate-900/95 px-3 py-2 text-xs text-slate-100 shadow-lg"
              >
                <div className="font-semibold text-slate-200 mb-1">
                  {formatDateLabel(displayData[hoveredIndex].x)}
                </div>
                {activeCurrencies.map((code) => (
                  <div key={code} style={{ color: getCurrencyColor(code, allCurrencies) }}>
                    {code}/{baseCurrency}: {formatValue(displayData[hoveredIndex].rates[code] ?? 0)}
                  </div>
                ))}
              </div>
            )}

            {/* Trend analyzer */}
            {trendAnalysis && (
              <div className="mt-6 rounded-xl bg-slate-900 border border-slate-700">

                {/* Collapsible header */}
                <button
                  type="button"
                  onClick={() => setAnalyzerOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div>
                    <div className="text-sm sm:text-xs uppercase tracking-widest text-slate-500 font-semibold">
                      {baseCurrency} Currency Strength Analyzer
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {formatDateLabel(displayData[0]?.x ?? '')} — {formatDateLabel(displayData[displayData.length - 1]?.x ?? '')}
                    </div>
                  </div>
                  <span className="text-slate-500 text-sm ml-4">{analyzerOpen ? '▲' : '▼'}</span>
                </button>

                {analyzerOpen && (
                <div className="px-5 pb-5">
                {/* Header + overall score */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div />

                  {/* Overall score gauge */}
                  {(() => {
                    const s = trendAnalysis.overallScore
                    const neutral = Math.abs(s) < 5
                    const strong = Math.abs(s) >= 60
                    const color = neutral ? '#64748b' : s > 0 ? '#22c55e' : '#ef4444'
                    const label = neutral ? 'Neutral' : strong
                      ? (s > 0 ? 'Strongly Bullish' : 'Strongly Bearish')
                      : (s > 0 ? 'Mildly Bullish' : 'Mildly Bearish')
                    const barW = Math.abs(s)
                    return (
                      <div className="flex flex-col items-end gap-1 min-w-[180px]">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold" style={{ color }}>
                            {s > 0 ? '+' : ''}{s.toFixed(1)}
                          </span>
                          <span className="text-xs font-semibold" style={{ color }}>{label}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden flex">
                          {s <= 0 && (
                            <div className="ml-auto h-full rounded-full transition-all" style={{ width: `${barW}%`, backgroundColor: color }} />
                          )}
                          {s > 0 && (
                            <div className="h-full rounded-full transition-all" style={{ width: `${barW}%`, backgroundColor: color }} />
                          )}
                        </div>
                        <div className="flex justify-between w-full text-xs text-slate-600">
                          <span>Bearish</span><span>{trendAnalysis.bullish}↑ {trendAnalysis.bearish}↓</span><span>Bullish</span>
                        </div>
                      </div>
                    )
                  })()}
                </div>

                {/* Per-currency cards */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {trendAnalysis.rows.map(({ code, pctChange, volatility, maxDrawdown, consistency, magnitude }) => {
                    const up = pctChange > 0
                    const neutral = Math.abs(pctChange) < 0.05
                    const color = neutral ? '#64748b' : up ? '#22c55e' : '#ef4444'
                    const bgColor = neutral ? '#1e293b' : up ? '#052e16' : '#1f0a0a'
                    const magnitudeLabel = { strong: 'Strong', moderate: 'Moderate', weak: 'Slight' }[magnitude]
                    const label = neutral ? 'Stable' : `${magnitudeLabel} ${up ? 'rise' : 'fall'}`
                    const isEditing = analyzerEditSlot === code
                    const replacements = allCurrencies
                      .filter((c) => c !== baseCurrency && !analyzerCurrencies.includes(c) && c.includes(analyzerSearch))

                    return (
                      <div
                        key={code}
                        className="flex flex-col gap-2 rounded-lg px-3 py-3"
                        style={{ backgroundColor: bgColor, border: `1px solid ${color}33` }}
                      >
                        {/* Currency label — click to swap */}
                        <div
                          className="relative"
                          ref={(el) => { analyzerEditRefs.current[code] = el }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setAnalyzerEditSlot(isEditing ? null : code)
                              setAnalyzerSearch('')
                            }}
                            className="flex items-center gap-1.5 w-full group"
                            title="Click to replace this currency"
                          >
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full overflow-hidden flex-shrink-0" style={{ fontSize: '1.1rem', lineHeight: 1 }}>
                              {CURRENCY_FLAGS[code] ?? '🏳️'}
                            </span>
                            <span className="text-xs font-bold text-slate-200">{code}</span>
                            <span className="ml-auto text-slate-500 group-hover:text-slate-300 text-xs transition">▾</span>
                          </button>

                          {isEditing && (
                            <div className="absolute left-0 top-full mt-1 z-30 w-36 rounded-lg bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden">
                              <div className="p-2 border-b border-slate-700">
                                <input
                                  autoFocus
                                  type="text"
                                  placeholder="Search…"
                                  value={analyzerSearch}
                                  onChange={(e) => setAnalyzerSearch(e.target.value.toUpperCase())}
                                  className="w-full bg-slate-700 text-slate-100 text-xs rounded-md px-2 py-1.5 outline-none placeholder-slate-500 border border-slate-600 focus:border-purple-500 transition"
                                />
                              </div>
                              <div className="max-h-40 overflow-y-auto py-1">
                                {replacements.length === 0 ? (
                                  <div className="px-3 py-2 text-xs text-slate-500">No currencies available</div>
                                ) : replacements.map((c) => {
                                  const cColor = getCurrencyColor(c, allCurrencies)
                                  return (
                                    <button
                                      key={c}
                                      type="button"
                                      onClick={() => {
                                        setAnalyzerCurrencies((prev) => prev.map((x) => x === code ? c : x))
                                        setAnalyzerEditSlot(null)
                                        setAnalyzerSearch('')
                                      }}
                                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-slate-700 transition"
                                    >
                                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full overflow-hidden flex-shrink-0" style={{ fontSize: '1rem', lineHeight: 1 }}>
                                        {CURRENCY_FLAGS[c] ?? '🏳️'}
                                      </span>
                                      <span style={{ color: cColor }} className="font-semibold">{c}</span>
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* % change */}
                        <div className="flex items-baseline gap-1">
                          <span style={{ color }} className="text-xs font-semibold">
                            {pctChange > 0 ? '+' : ''}{pctChange.toFixed(2)}%
                          </span>
                        </div>

                        <div className="text-xs text-slate-400 leading-tight">{label}</div>

                        {/* Stats */}
                        <div className="mt-1 flex flex-col gap-0.5 border-t border-slate-700 pt-2">
                          <div className="flex justify-between text-sm sm:text-xs">
                            <span className="text-slate-500">Volatility</span>
                            <span className="text-slate-300">{volatility.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between text-sm sm:text-xs">
                            <span className="text-slate-500">Max DD</span>
                            <span className="text-red-400">-{maxDrawdown.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between text-sm sm:text-xs">
                            <span className="text-slate-500">Consistency</span>
                            <span className="text-slate-300">{consistency.toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 border-t border-slate-800 pt-3">
                  <span>+/− = {baseCurrency} gained/lost vs that currency over the period</span>
                  <span>Volatility = std dev of daily log returns</span>
                  <span>Max DD = largest peak-to-trough drop · Consistency = % of days moving with the trend</span>
                </div>
                </div>
                )}
              </div>
            )}

            {/* Currency Calculator */}
            {calcCurrencies.length > 0 && Object.keys(calcRates).length > 0 && (
              <div className="mt-6 rounded-xl bg-slate-900 border border-slate-700">
                <button
                  type="button"
                  onClick={() => setCalculatorOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="text-sm sm:text-xs uppercase tracking-widest text-slate-500 font-semibold">
                    Currency Calculator
                  </div>
                  <span className="text-slate-500 text-sm ml-4">{calculatorOpen ? '▲' : '▼'}</span>
                </button>

                {calculatorOpen && (
                <div className="px-5 pb-5">
                <div className="flex flex-col gap-2">
                  {calcCurrencies.map((code) => {
                    const color = code === baseCurrency ? '#94a3b8' : getCurrencyColor(code, allCurrencies)
                    const sourceRate = calcRates[calcSource ?? baseCurrency] ?? 1
                    const targetRate = calcRates[code] ?? 1
                    const parsed = parseFloat(calcInput)
                    const computed = !isNaN(parsed) && sourceRate > 0
                      ? (parsed * (targetRate / sourceRate)).toFixed(4)
                      : ''
                    const isSource = calcSource === code

                    return (
                      <div
                        key={code}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 transition"
                        style={{
                          backgroundColor: isSource ? '#1e1b4b' : '#0f172a',
                          border: `1px solid ${isSource ? '#6d28d9' : '#1e293b'}`,
                        }}
                      >
                        {/* Flag + code */}
                        <div className="flex items-center gap-2 w-20 flex-shrink-0">
                          <span
                            className="inline-flex items-center justify-center w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                            style={{ fontSize: '1.3rem', lineHeight: 1 }}
                          >
                            {CURRENCY_FLAGS[code] ?? '🏳️'}
                          </span>
                          <span className="text-xs font-bold" style={{ color }}>
                            {code}
                          </span>
                          {code === baseCurrency && (
                            <span className="text-xs text-slate-600">(base)</span>
                          )}
                        </div>

                        {/* Input */}
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={isSource ? calcInput : computed}
                          placeholder="0"
                          onChange={(e) => {
                            setCalcSource(code)
                            setCalcInput(e.target.value)
                          }}
                          onFocus={() => {
                            if (!isSource) {
                              setCalcSource(code)
                              setCalcInput(computed)
                            }
                          }}
                          className="flex-1 bg-slate-800 text-slate-100 text-sm font-mono rounded-lg px-3 py-2 outline-none border border-slate-700 focus:border-purple-500 transition text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />

                        {/* Rate hint — hidden on mobile */}
                        <div className="hidden sm:block w-32 text-right flex-shrink-0">
                          <span className="text-xs text-slate-600 font-mono">
                            1 {baseCurrency} = {(calcRates[code] ?? 0).toFixed(4)} {code}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => { setCalcSource(null); setCalcInput('1') }}
                    className="text-xs text-slate-600 hover:text-slate-400 transition"
                  >
                    Reset
                  </button>
                </div>
                </div>
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  )
}
