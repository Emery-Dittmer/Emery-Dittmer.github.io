'use client'

import { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

type Quadrant = 'shine' | 'niche' | 'growth'

type MarketSkill = {
  id: string
  shortName: string
  fullName: string
  laneTitle: string
  laneColor: string
  emery: number   // 0–100: proficiency × job-usage frequency
  market: number  // 0–100: 2025 job-market demand estimate
  note: string
}

// ── Static data ────────────────────────────────────────────────────────────────
// emery score  = proficiency weight (strong=100, weak=65, beginning=35)
//                adjusted for how heavily the skill appeared across all 5 jobs
// market score = estimated demand based on 2025 data-role job postings

const TOP_SKILLS: MarketSkill[] = [
  {
    id: 'writing-complex-sql-ctes-window-functions',
    shortName: 'Complex SQL',
    fullName: 'Writing complex SQL (CTEs, window functions)',
    laneTitle: 'Data Analytics', laneColor: '#185FA5',
    emery: 95, market: 94,
    note: 'Used at every role — the single most universal skill in data work.',
  },
  {
    id: 'defining-documenting-kpis',
    shortName: 'Defining KPIs',
    fullName: 'Defining & documenting KPIs',
    laneTitle: 'Data Analytics', laneColor: '#185FA5',
    emery: 93, market: 87,
    note: 'Led KPI standardisation across all 4 companies, from start-up to Big 4.',
  },
  {
    id: 'ab-test-analysis-significance-testing',
    shortName: 'A/B Testing',
    fullName: 'A/B test analysis & significance testing',
    laneTitle: 'Data Analytics', laneColor: '#185FA5',
    emery: 92, market: 81,
    note: 'Core to product analytics at Coveo — designed and evaluated experiments end-to-end.',
  },
  {
    id: 'facilitating-cross-team-delivery',
    shortName: 'Cross-team Delivery',
    fullName: 'Facilitating cross-team delivery',
    laneTitle: 'Project Management', laneColor: '#5F5E5A',
    emery: 90, market: 77,
    note: 'Programme ownership spanning multiple stakeholder groups at PwC and Compass.',
  },
  {
    id: 'presenting-findings-to-non-technical-stakeholders',
    shortName: 'Presenting Findings',
    fullName: 'Presenting findings to non-technical stakeholders',
    laneTitle: 'Data Analytics', laneColor: '#185FA5',
    emery: 88, market: 85,
    note: 'Consistently translating complex models into actionable business decisions.',
  },
  {
    id: 'building-self-serve-dashboards-looker-tableau',
    shortName: 'Self-serve Dashboards',
    fullName: 'Building self-serve dashboards (Looker, Tableau)',
    laneTitle: 'Data Analytics', laneColor: '#185FA5',
    emery: 85, market: 88,
    note: 'Looker & Tableau across Coveo, Compass, and PwC — fluent in the full BI stack.',
  },
  {
    id: 'funnel-cohort-analysis',
    shortName: 'Funnel & Cohort',
    fullName: 'Funnel & cohort analysis',
    laneTitle: 'Data Analytics', laneColor: '#185FA5',
    emery: 88, market: 75,
    note: 'Deep product analytics experience — highly valued in SaaS and tech companies.',
  },
  {
    id: 'causal-inference',
    shortName: 'Causal Inference',
    fullName: 'Causal inference',
    laneTitle: 'Data Science', laneColor: '#534AB7',
    emery: 85, market: 53,
    note: 'A rare differentiator — measuring true impact rather than spurious correlation.',
  },
  {
    id: 'differences-in-differences',
    shortName: 'DiD Analysis',
    fullName: 'Differences-in-differences',
    laneTitle: 'Data Science', laneColor: '#534AB7',
    emery: 82, market: 47,
    note: 'Econometric rigour that separates deep analysts from standard data generalists.',
  },
  {
    id: 'building-elt-pipelines-dbt',
    shortName: 'dbt / ELT',
    fullName: 'Building ELT pipelines (dbt)',
    laneTitle: 'Data Engineering', laneColor: '#0F6E56',
    emery: 68, market: 85,
    note: 'Practised at Compass & Coveo. dbt is one of the most in-demand skills in 2025.',
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────────

function wrapText(text: string, maxChars = 16): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (test.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

const Q_THRESHOLD = 70

function quadrant(s: MarketSkill): Quadrant {
  if (s.emery >= Q_THRESHOLD && s.market >= Q_THRESHOLD) return 'shine'
  if (s.emery >= Q_THRESHOLD) return 'niche'
  return 'growth'
}

const QUAD_META: Record<Quadrant, { label: string; color: string; subtleBg: string; desc: string }> = {
  shine: {
    label: '✦ Shine',
    color: '#4ade80',
    subtleBg: 'rgba(74,222,128,0.06)',
    desc: 'High personal strength & high market demand',
  },
  niche: {
    label: '◈ Niche Edge',
    color: '#a78bfa',
    subtleBg: 'rgba(167,139,250,0.06)',
    desc: 'Rare skill that sets Emery apart from the field',
  },
  growth: {
    label: '↗ Growth',
    color: '#fbbf24',
    subtleBg: 'rgba(251,191,36,0.06)',
    desc: 'High-demand area with room to deepen expertise',
  },
}

// ── Scatter plot constants ─────────────────────────────────────────────────────

const VW = 580
const VH = 400
const PL = 52   // left  (y-axis labels)
const PR = 16   // right
const PT = 18   // top
const PB = 42   // bottom (x-axis labels)
const plotW = VW - PL - PR
const plotH = VH - PT - PB

const px = (v: number) => PL + (v / 100) * plotW
const py = (v: number) => (VH - PB) - (v / 100) * plotH

const QX = px(Q_THRESHOLD)
const QY = py(Q_THRESHOLD)

// ── Chart layout constants ─────────────────────────────────────────────────────

const CW = 540, CH = 340
const CPL = 128  // label area
const CPR = 28   // score numbers
const CPT = 10   // top
const CPB = 28   // x-axis
const cPlotW = CW - CPL - CPR
const cPlotH = CH - CPT - CPB
const GROUP_H = cPlotH / 5   // height per skill row
const BAR_H   = 13
const BAR_GAP = 6
const BAR_PAD = (GROUP_H - BAR_H * 2 - BAR_GAP) / 2  // vertical centering

const cxPos = (v: number) => CPL + (v / 100) * cPlotW

// ── Component ──────────────────────────────────────────────────────────────────

export default function SkillsMarketComparison() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)

  const sorted =[...TOP_SKILLS].sort((a, b) =>
    Math.sqrt(b.emery * b.market) - Math.sqrt(a.emery * a.market)
  )

  const renderBarChart = (skills: MarketSkill[], startRank: number, showBarLabels = false) => (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full block">

      {/* Vertical grid lines + x-axis ticks */}
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line
            x1={cxPos(v)} y1={CPT}
            x2={cxPos(v)} y2={CH - CPB}
            stroke={v === 0 ? '#374151' : '#1f2937'}
            strokeWidth={v === 0 ? 1 : 0.6}
          />
          <text x={cxPos(v)} y={CH - CPB + 14}
            textAnchor="middle" fontSize={8} fill="#4b5563">{v}</text>
        </g>
      ))}

      {/* Plot border */}
      <rect x={CPL} y={CPT} width={cPlotW} height={cPlotH}
        fill="none" stroke="#1f2937" strokeWidth={0.8} />

      {/* Skill rows */}
      {skills.map((skill, i) => {
        const rank    = startRank + i
        const q       = quadrant(skill)
        const meta    = QUAD_META[q]
        const gy      = CPT + i * GROUP_H
        const youY    = gy + BAR_PAD
        const mktY    = youY + BAR_H + BAR_GAP
        const centerY = gy + GROUP_H / 2
        const isHov   = hovered === skill.id

        return (
          <g key={skill.id}
            onMouseEnter={() => setHovered(skill.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'default' }}>

            {/* Hover row background */}
            {isHov && (
              <rect x={0} y={gy} width={CW} height={GROUP_H}
                fill="white" fillOpacity={0.03} rx={0} />
            )}

            {/* Row separator */}
            {i > 0 && (
              <line x1={0} y1={gy} x2={CW} y2={gy}
                stroke="#111827" strokeWidth={0.8} />
            )}

            {/* Zone dot */}
            <circle cx={5} cy={centerY} r={3} fill={meta.color} opacity={0.85} />

            {/* Rank */}
            <text x={13} y={centerY + 4}
              fontSize={11} fontWeight={600} fill="#6b7280">{rank}</text>

            {/* Skill name — left-aligned, wraps at ~16 chars */}
            {(() => {
              const lines = wrapText(skill.shortName)
              const lineH = 13
              const baseY = centerY + 4 - ((lines.length - 1) * lineH) / 2
              return lines.map((line, li) => (
                <text key={li} x={27} y={baseY + li * lineH}
                  textAnchor="start" fontSize={11.5} fontWeight={600}
                  fill={isHov ? '#f9fafb' : '#d1d5db'}>{line}</text>
              ))
            })()}

            {/* "Emery's Skill" bar */}
            <rect
              x={CPL} y={youY}
              width={(skill.emery / 100) * cPlotW} height={BAR_H} rx={2}
              fill={skill.laneColor} opacity={isHov ? 1 : 0.85}
            />
            {showBarLabels && i === 0 && (
              <text x={CPL + 6} y={youY + BAR_H - 3} fontSize={7.5} fontWeight={700}
                fill="rgba(255,255,255,0.75)" style={{ pointerEvents: 'none' }}>Emery</text>
            )}

            {/* "Market" bar */}
            <rect
              x={CPL} y={mktY}
              width={(skill.market / 100) * cPlotW} height={BAR_H} rx={2}
              fill="#4b5563" opacity={isHov ? 0.9 : 0.65}
            />
            {showBarLabels && i === 0 && (
              <text x={CPL + 6} y={mktY + BAR_H - 3} fontSize={7.5} fontWeight={700}
                fill="rgba(255,255,255,0.65)" style={{ pointerEvents: 'none' }}>Market</text>
            )}

            {/* Score labels (right margin) */}
            <text x={CW - CPR + 3} y={youY + BAR_H - 1.5}
              fontSize={10} fontWeight={700} fill={skill.laneColor}>{skill.emery}</text>
            <text x={CW - CPR + 3} y={mktY + BAR_H - 1.5}
              fontSize={10} fontWeight={600} fill="#6b7280">{skill.market}</text>
          </g>
        )
      })}
    </svg>
  )

  return (
    <div className="space-y-5">

      {/* ── Header + legend ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-gray-400 text-sm">
          Proficiency × job-usage (Emery) vs. 2025 market demand. Hover to explore.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
          <span className="flex items-center gap-1.5 text-gray-300">
            <span className="w-5 h-2 rounded-sm inline-block" style={{ background: 'linear-gradient(90deg,#185FA5,#534AB7,#0F6E56)' }} />
            Emery's Skill
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="w-5 h-2 rounded-sm inline-block bg-gray-500" />
            Market Skill
          </span>
          {(Object.entries(QUAD_META) as [Quadrant, typeof QUAD_META[Quadrant]][]).map(([k, m]) => (
            <span key={k} className="flex items-center gap-1" style={{ color: m.color }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: m.color }} />
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── 2-column bar charts ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
          onMouseLeave={() => setMousePos(null)}
        >
          {renderBarChart(sorted.slice(0, 5), 1, true)}
        </div>
        <div
          onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
          onMouseLeave={() => setMousePos(null)}
        >
          {renderBarChart(sorted.slice(5, 10), 6)}
        </div>
      </div>

      {/* Floating tooltip */}
      {hovered && mousePos && (() => {
        const skill = sorted.find(s => s.id === hovered)
        if (!skill) return null
        const q = quadrant(skill)
        const meta = QUAD_META[q]
        return (
          <div
            className="fixed z-[9999] pointer-events-none bg-gray-900 border border-gray-700 rounded-xl shadow-2xl px-4 py-3 w-64"
            style={{ left: mousePos.x + 16, top: mousePos.y - 20 }}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <p className="text-sm font-bold text-white leading-snug">{skill.fullName}</p>
              <span
                className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border"
                style={{ color: meta.color, borderColor: meta.color }}
              >{meta.label}</span>
            </div>
            <p className="text-[10px] text-gray-500 mb-2">{skill.laneTitle}</p>
            <div className="flex gap-6 mb-2.5">
              <div>
                <p className="text-[10px] text-gray-500 mb-0.5">Emery</p>
                <p className="text-xl font-bold" style={{ color: skill.laneColor }}>{skill.emery}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 mb-0.5">Market</p>
                <p className="text-xl font-bold text-gray-400">{skill.market}</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 italic leading-relaxed">{skill.note}</p>
          </div>
        )
      })()}

      {/* ── Scatter plot ── */}
      <div>
        <p className="text-[10px] text-gray-600 italic mb-1">
          Positioning view — hover a bubble to see context
        </p>
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full block">

          <rect x={QX} y={PT} width={VW - PR - QX} height={QY - PT} fill={QUAD_META.shine.subtleBg} />
          <rect x={PL} y={PT} width={QX - PL}       height={QY - PT} fill={QUAD_META.niche.subtleBg} />
          <rect x={QX} y={QY} width={VW - PR - QX} height={VH - PB - QY} fill={QUAD_META.growth.subtleBg} />

          <text x={QX + 8} y={PT + 14} fontSize={9} fontWeight={700} fill={QUAD_META.shine.color} opacity={0.7}>✦ Shine Zone</text>
          <text x={PL + 6} y={PT + 14} fontSize={9} fontWeight={700} fill={QUAD_META.niche.color} opacity={0.7}>◈ Niche Edge</text>
          <text x={QX + 8} y={VH - PB - 8} fontSize={9} fontWeight={700} fill={QUAD_META.growth.color} opacity={0.7}>↗ Growth Area</text>

          <line x1={QX} y1={PT} x2={QX} y2={VH - PB} stroke="#374151" strokeWidth={1} strokeDasharray="4 4" />
          <line x1={PL} y1={QY} x2={VW - PR} y2={QY} stroke="#374151" strokeWidth={1} strokeDasharray="4 4" />
          <line x1={px(0)} y1={py(0)} x2={px(100)} y2={py(100)} stroke="#1f2937" strokeWidth={1} strokeDasharray="3 5" />

          {[25, 50, 75].map(v => (
            <g key={v}>
              <line x1={px(v)} y1={PT} x2={px(v)} y2={VH - PB} stroke="#1f2937" strokeWidth={0.8} />
              <line x1={PL} y1={py(v)} x2={VW - PR} y2={py(v)} stroke="#1f2937" strokeWidth={0.8} />
            </g>
          ))}

          {[0, 25, 50, 75, 100].map(v => (
            <g key={v}>
              <text x={px(v)} y={VH - PB + 14} textAnchor="middle" fontSize={8} fill="#4b5563">{v}</text>
              <text x={PL - 6} y={py(v) + 3} textAnchor="end" fontSize={8} fill="#4b5563">{v}</text>
            </g>
          ))}

          <text x={PL + plotW / 2} y={VH - 4} textAnchor="middle" fontSize={9} fontWeight={600} fill="#6b7280">Market Demand →</text>
          <text x={12} y={PT + plotH / 2} textAnchor="middle" fontSize={9} fontWeight={600} fill="#6b7280"
            transform={`rotate(-90, 12, ${PT + plotH / 2})`}>Emery's Strength ↑</text>

          <rect x={PL} y={PT} width={plotW} height={plotH} fill="none" stroke="#1f2937" strokeWidth={1} />

          {sorted.map((skill, i) => {
            const bx    = px(skill.market)
            const by    = py(skill.emery)
            const isHov = hovered === skill.id
            const q     = quadrant(skill)
            const r     = isHov ? 13 : 10
            return (
              <g key={skill.id}
                onMouseEnter={() => setHovered(skill.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}>
                {isHov && (
                  <circle cx={bx} cy={by} r={r + 5}
                    fill="none" stroke={skill.laneColor} strokeWidth={1} strokeOpacity={0.4} />
                )}
                <circle cx={bx} cy={by} r={r} fill={skill.laneColor} opacity={isHov ? 1 : 0.82} />
                {q === 'shine' && !isHov && (
                  <circle cx={bx + 7} cy={by - 7} r={3.5} fill={QUAD_META.shine.color} opacity={0.9} />
                )}
                <text x={bx} y={by + 4} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="white"
                  style={{ pointerEvents: 'none' }}>{i + 1}</text>
              </g>
            )
          })}
        </svg>
      </div>

    </div>
  )
}
