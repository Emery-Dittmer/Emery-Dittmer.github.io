'use client'

import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import rbcLogo    from '@/assets/companies/rbc_logo.png'
import pwcLogo    from '@/assets/companies/pwc_logo.png'
import mcgillLogo from '@/assets/companies/McGill_University.png'

type View     = 'timeline' | 'industry'
type Track    = 'above' | 'below' | 'below2'
type Industry = 'Technology' | 'Consulting' | 'Financial Services' | 'Education'

interface Role {
  company:  string
  role:     string
  start:    [number, number]
  end:      [number, number] | null
  industry: Industry
  color:    string
  track:    Track
  logo?:    StaticImageData
  bullets:  string[]
}

const NOW: [number, number] = [2026, 3] // April 2026

const roles: Role[] = [
  {
    company: 'RBC',
    role: 'Strategic Planning Analyst',
    start: [2020, 2], end: [2021, 1],
    industry: 'Financial Services', color: '#2563eb', track: 'above',
    logo: rbcLogo,
    bullets: [
      'Consolidated KPIs & executive reporting across modernized platforms',
      'Analyzed donor behavior with geospatial & temporal data analysis',
      'Contributed to target architecture for compliance & internal audit',
    ],
  },
  {
    company: 'PwC',
    role: 'Experienced Associate — Automation & Analytics',
    start: [2021, 1], end: [2023, 6],
    industry: 'Consulting', color: '#dc2626', track: 'below',
    logo: pwcLogo,
    bullets: [
      'Delivery lead across 30+ digital transformation projects',
      'Developed forecasting & behavioural models for conversion & retention',
      'Defined KPIs, reporting conventions & SLAs for client platforms',
    ],
  },
  {
    company: 'Compass Data',
    role: 'Data Science Analytics Manager',
    start: [2023, 8], end: null,
    industry: 'Technology', color: '#059669', track: 'above',
    bullets: [
      'Orchestrated intake & delivery of analytics and ML initiatives',
      'Built scalable data pipelines on Dataiku & Snowflake with MLOps',
      '300+ hours of weekly productivity unlocked via predictive systems',
    ],
  },
  {
    company: 'McGill University',
    role: 'Capstone Coach',
    start: [2023, 6], end: [2024, 4],  // Jul 2023 – May 2024
    industry: 'Education', color: '#9f1239', track: 'below',
    logo: mcgillLogo,
    bullets: [
      'Mentored data science teams on end-to-end capstone projects',
      'Technical coaching in Python, R, SQL & cloud analytics platforms',
    ],
  },
  {
    company: 'Coveo',
    role: 'BI Analyst & Data Scientist',
    start: [2023, 10], end: [2024, 7],
    industry: 'Technology', color: '#ea580c', track: 'below2',
    bullets: [
      'KPI dashboards supporting $2M ARR growth',
      'A/B testing & uplift modelling — 5× improved monetization efficiency',
      'Built MLOps & ETL pipelines on dbt, Snowflake & AWS',
    ],
  },
]

const industryMeta: Record<Industry, { color: string }> = {
  'Technology':         { color: '#3b82f6' },
  'Consulting':         { color: '#8b5cf6' },
  'Financial Services': { color: '#10b981' },
  'Education':          { color: '#f59e0b' },
}
const industryOrder: Industry[] = ['Technology', 'Consulting', 'Financial Services', 'Education']

// ── SVG layout ────────────────────────────────────────────────────────────────
const SVG_W   = 1000
const SVG_H   = 410
const PAD_L   = 80
const PAD_R   = 70
const USABLE  = SVG_W - PAD_L - PAD_R   // 850 px
const AXIS_Y  = 195
const T0_YEAR = 2020
const T_MONTHS = 78                      // Jan 2020 → Jun 2026
const PX      = USABLE / T_MONTHS        // px per month

const TRACK_Y: Record<Track, number> = { above: 118, below: 272, below2: 338 }

function toX([year, month]: [number, number]): number {
  return PAD_L + ((year - T0_YEAR) * 12 + month) * PX
}

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
function fmtDate([y, m]: [number, number]) { return `${MONTH_NAMES[m]} ${y}` }

function durMonths(r: Role): number {
  const [ey, em] = r.end ?? NOW
  return (ey - r.start[0]) * 12 + (em - r.start[1])
}

function fmtDur(m: number): string {
  const y = Math.floor(m / 12), mo = m % 12
  if (y === 0) return `${mo}mo`
  if (mo === 0) return `${y}yr`
  return `${y}yr ${mo}mo`
}

// ── Root component ────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  const [view, setView] = useState<View>('timeline')

  return (
    <div>
      {/* View toggle */}
      <div className="flex gap-2 mb-6">
        {([['timeline', 'Timeline'], ['industry', 'By Industry']] as [View, string][]).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg border transition-colors duration-150 ${
              view === v
                ? 'border-blue-600 text-blue-400 bg-blue-900/20'
                : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {view === 'timeline' ? <TimelineView /> : <IndustryView />}
    </div>
  )
}

// ── Timeline view ─────────────────────────────────────────────────────────────
function TimelineView() {
  const nowX     = toX(NOW)
  const yearTicks = [2020, 2021, 2022, 2023, 2024, 2025, 2026]
  const ARROW    = 8

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full min-w-[680px]" style={{ height: SVG_H }}>

        {/* Axis */}
        <line x1={PAD_L} y1={AXIS_Y} x2={SVG_W - PAD_R} y2={AXIS_Y}
          stroke="#374151" strokeWidth={1.5} />

        {/* Year ticks */}
        {yearTicks.map(yr => {
          const x = toX([yr, 0])
          return (
            <g key={yr}>
              <line x1={x} y1={AXIS_Y - 5} x2={x} y2={AXIS_Y + 5} stroke="#4b5563" strokeWidth={1} />
              <text x={x} y={AXIS_Y + 19} textAnchor="middle" fontSize={10} fill="#6b7280">{yr}</text>
            </g>
          )
        })}

        {/* Present marker */}
        <line x1={nowX} y1={60} x2={nowX} y2={AXIS_Y + 5}
          stroke="#4b5563" strokeWidth={1} strokeDasharray="4 3" />
        <text x={nowX} y={AXIS_Y + 30} textAnchor="middle" fontSize={9} fill="#6b7280" fontStyle="italic">
          Present
        </text>

        {/* Roles */}
        {roles.map(role => {
          const x1    = toX(role.start)
          const x2    = role.end ? toX(role.end) : nowX
          const y     = TRACK_Y[role.track]
          const above = role.track === 'above'
          const mid   = (x1 + x2) / 2
          const dur   = durMonths(role)

          return (
            <g key={role.company}>
              {/* Connector from bar to axis */}
              <line
                x1={x1} y1={above ? y : AXIS_Y}
                x2={x1} y2={above ? AXIS_Y : y}
                stroke={role.color} strokeWidth={1} strokeOpacity={0.4} strokeDasharray="3 3"
              />

              {/* Axis dot */}
              <circle cx={x1} cy={AXIS_Y} r={4} fill={role.color} opacity={0.9} />

              {/* Duration bar */}
              <line
                x1={x1 + ARROW * 0.5} y1={y} x2={x2} y2={y}
                stroke={role.color} strokeWidth={10} strokeLinecap="round" opacity={0.82}
              />

              {/* Arrowhead */}
              <polygon
                points={`${x2 + ARROW},${y} ${x2},${y - ARROW * 0.55} ${x2},${y + ARROW * 0.55}`}
                fill={role.color} opacity={0.82}
              />

              {/* Dashed "ongoing" tail */}
              {!role.end && (
                <line x1={nowX} y1={y} x2={nowX + 20} y2={y}
                  stroke={role.color} strokeWidth={2} strokeDasharray="4 4" opacity={0.4} />
              )}

              {/* Company label */}
              <text x={mid} y={above ? y - 22 : y + 24}
                textAnchor="middle" fontSize={11} fontWeight={700} fill={role.color}>
                {role.company}
              </text>

              {/* Duration label */}
              <text x={mid} y={above ? y - 10 : y + 36}
                textAnchor="middle" fontSize={9} fill="#9ca3af">
                {fmtDur(dur)}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1 px-1">
        {roles.map(r => (
          <span key={r.company} className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
            {r.company}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Industry view ─────────────────────────────────────────────────────────────
function IndustryView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {industryOrder.map(industry => {
        const { color } = industryMeta[industry]
        const items = roles.filter(r => r.industry === industry)
        if (!items.length) return null
        return (
          <div key={industry} className="rounded-xl border overflow-hidden"
            style={{ borderColor: `${color}40` }}>

            {/* Industry header */}
            <div className="px-4 py-2.5 flex items-center gap-2"
              style={{ backgroundColor: `${color}18` }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
                {industry}
              </span>
            </div>

            {/* Role cards */}
            <div className="divide-y divide-gray-800/60">
              {items.map(role => (
                <div key={role.company} className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      {role.logo ? (
                        <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center shrink-0 overflow-hidden p-1">
                          <Image src={role.logo} alt={role.company} width={28} height={28} className="object-contain" />
                        </div>
                      ) : (
                        <div
                          className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 text-white text-sm font-bold"
                          style={{ backgroundColor: role.color }}
                        >
                          {role.company[0]}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-white">{role.company}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-snug">{role.role}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-gray-500 leading-snug">
                        {fmtDate(role.start)} – {role.end ? fmtDate(role.end) : 'Present'}
                      </p>
                      <p className="text-[10px] font-semibold mt-0.5" style={{ color: role.color }}>
                        {fmtDur(durMonths(role))}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {role.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: role.color }} />
                        <span className="text-[11px] text-gray-400 leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
