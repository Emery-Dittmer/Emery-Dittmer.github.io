'use client'

import { useMemo, useState } from 'react'
import { ChevronRight, Check, ExternalLink } from 'lucide-react'
import {
  getTimelineModel,
  Span,
  ProjectTimelineRow,
  EpicTimelineRow,
  LinearIssue,
} from '@/lib/linearDashboard'
import { Locale } from '@/lib/i18n'
import { STATUS_STYLE, statusLabel } from './projectStatus'
import ProjectOverviewCard from './ProjectOverviewCard'

const copy = {
  en: {
    heading: 'Delivery Timeline',
    sub: 'Every project on one time axis. Click a row to open its epics, then its issues.',
    issues: 'issues',
    epics: 'epics',
    ongoing: 'ongoing',
    noEpics: 'Issues tracked directly on the project — no epics.',
    today: 'today',
  },
  fr: {
    heading: 'Chronologie de livraison',
    sub: 'Tous les projets sur un même axe temporel. Cliquez une ligne pour ouvrir ses épics, puis ses tâches.',
    issues: 'tâches',
    epics: 'épics',
    ongoing: 'en cours',
    noEpics: 'Tâches suivies directement sur le projet — pas d’épics.',
    today: "aujourd'hui",
  },
}

const DAY = 86_400_000

// ── Geometry ─────────────────────────────────────────────────────────────

function useScale(rangeStart: string, rangeEnd: string) {
  return useMemo(() => {
    const start = new Date(rangeStart).getTime()
    const end = new Date(rangeEnd).getTime()
    // pad a few days each side
    const pad = 4 * DAY
    const lo = start - pad
    const hi = end + pad
    const total = Math.max(hi - lo, DAY)
    const pct = (iso: string) => ((new Date(iso).getTime() - lo) / total) * 100
    return { lo, hi, total, pct }
  }, [rangeStart, rangeEnd])
}

function monthTicks(lo: number, hi: number, locale: Locale) {
  const ticks: { label: string; pct: number }[] = []
  const cursor = new Date(lo)
  cursor.setDate(1)
  cursor.setHours(0, 0, 0, 0)
  const total = hi - lo
  while (cursor.getTime() <= hi) {
    const p = ((cursor.getTime() - lo) / total) * 100
    if (p >= 0 && p <= 100) {
      ticks.push({
        label: cursor.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
          month: 'short',
          year: cursor.getMonth() === 0 ? '2-digit' : undefined,
        }),
        pct: p,
      })
    }
    cursor.setMonth(cursor.getMonth() + 1)
  }
  return ticks
}

// ── Bar ──────────────────────────────────────────────────────────────────

function Bar({
  span,
  pct,
  tone,
  label,
}: {
  span: Span
  pct: (iso: string) => number
  tone: 'project' | 'epic' | 'issue'
  label?: string
}) {
  const left = pct(span.start)
  const right = pct(span.end)
  const width = Math.max(right - left, 1.2)

  const toneCls =
    tone === 'project'
      ? 'bg-gradient-to-r from-purple-600 to-purple-400 h-3'
      : tone === 'epic'
        ? 'bg-gradient-to-r from-sky-600 to-sky-400 h-2'
        : span.open
          ? 'bg-gray-600 h-1.5'
          : 'bg-green-500/70 h-1.5'

  return (
    <div
      className={`absolute rounded-full ${toneCls} ${
        span.open ? 'opacity-90' : ''
      }`}
      style={{ left: `${left}%`, width: `${width}%`, top: '50%', transform: 'translateY(-50%)' }}
      title={label}
    >
      {span.open && (
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
    </div>
  )
}

// ── Rows ─────────────────────────────────────────────────────────────────

// Fixed so the gridline/today overlay can align to the same offset.
const LABEL_PX = '13rem'
const LABEL_W = 'w-[13rem]'

function IssueRow({
  row,
  pct,
  locale,
}: {
  row: { issue: LinearIssue; span: Span }
  pct: (iso: string) => number
  locale: Locale
}) {
  return (
    <div className="flex items-stretch gap-3 group">
      <div className={`${LABEL_W} shrink-0 pl-8 pr-2 py-1 flex items-center`}>
        <a
          href={row.issue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-gray-500 hover:text-purple-300 transition-colors truncate inline-flex items-center gap-1"
        >
          {row.issue.statusType === 'completed' && (
            <Check size={10} className="text-green-500 shrink-0" />
          )}
          <span className="truncate">{row.issue.title}</span>
        </a>
      </div>
      <div className="relative flex-1 h-6">
        <Bar span={row.span} pct={pct} tone="issue" label={row.issue.title} />
      </div>
    </div>
  )
}

function EpicRow({
  row,
  pct,
  locale,
}: {
  row: EpicTimelineRow
  pct: (iso: string) => number
  locale: Locale
}) {
  const t = copy[locale]
  const [open, setOpen] = useState(false)
  const donePct =
    row.epic.childCount > 0 ? Math.round((row.epic.doneCount / row.epic.childCount) * 100) : 0

  return (
    <div>
      <div className="flex items-stretch gap-3">
        <div
          className={`${LABEL_W} shrink-0 pl-4 pr-2 py-1.5 flex items-center gap-1.5 hover:bg-gray-900/40 rounded transition-colors group`}
        >
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Collapse' : 'Expand'}
            className="shrink-0"
          >
            <ChevronRight
              size={12}
              className={`text-gray-500 transition-transform ${open ? 'rotate-90' : ''}`}
            />
          </button>
          <a
            href={row.referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-gray-300 group-hover:text-purple-300 truncate transition-colors inline-flex items-center gap-1 min-w-0"
          >
            <span className="truncate">{row.epic.title}</span>
            <ExternalLink size={9} className="opacity-0 group-hover:opacity-60 shrink-0 transition-opacity" />
          </a>
          <span className="text-[10px] text-gray-600 tabular-nums shrink-0 ml-auto">
            {row.epic.doneCount}/{row.epic.childCount}
          </span>
        </div>
        <a
          href={row.referenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex-1 h-7 block"
        >
          <Bar
            span={row.span}
            pct={pct}
            tone="epic"
            label={`${row.epic.title} — ${donePct}%`}
          />
        </a>
      </div>
      {open &&
        row.children.map((c) => (
          <IssueRow key={c.issue.id} row={c} pct={pct} locale={locale} />
        ))}
    </div>
  )
}

/** Diamond marker on the project bar at a delivered epic's end date. */
function EpicDeliveryMark({
  epic,
  pct,
}: {
  epic: EpicTimelineRow
  pct: (iso: string) => number
}) {
  const [hover, setHover] = useState(false)
  const left = pct(epic.span.end)

  return (
    <div
      className="absolute top-1/2 z-10"
      style={{ left: `${left}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="w-2 h-2 rotate-45 bg-sky-300 border border-sky-100/60 shadow-sm" />
      {hover && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-20 w-max max-w-[220px] rounded-md border border-gray-700 bg-gray-900 px-2 py-1 shadow-xl">
          <p className="text-[10px] font-semibold text-gray-100 leading-snug">{epic.epic.title}</p>
          <p className="text-[9px] text-sky-300 tabular-nums">{epic.span.end.slice(0, 10)}</p>
        </div>
      )}
    </div>
  )
}

function ProjectRow({
  row,
  pct,
  locale,
}: {
  row: ProjectTimelineRow
  pct: (iso: string) => number
  locale: Locale
}) {
  const t = copy[locale]
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <div className="border-t border-gray-800 first:border-t-0 py-1.5">
      <div className="flex items-stretch gap-3">
        <div className={`${LABEL_W} shrink-0 pr-2 py-1`}>
          <button
            onClick={() => setOpen((o) => !o)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            className="w-full flex items-center gap-1.5 text-left group relative"
          >
            <ChevronRight
              size={13}
              className={`text-gray-500 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
            />
            <span className="text-xs font-semibold text-gray-100 group-hover:text-purple-300 transition-colors truncate">
              {row.project.name}
            </span>
            {hover && (
              <div className="absolute left-0 top-full mt-1.5 z-30 w-[300px] rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl cursor-default">
                <ProjectOverviewCard project={row.project} locale={locale} />
              </div>
            )}
          </button>
          <div className="pl-[18px] mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span
              className={`px-1.5 py-px rounded-full text-[9px] font-semibold ${STATUS_STYLE[row.project.status]}`}
            >
              {statusLabel(row.project.status, locale)}
            </span>
            <span className="text-[10px] text-gray-600 tabular-nums">
              {row.project.doneCount}/{row.project.issueCount} {t.issues}
            </span>
          </div>
        </div>
        <div className="relative flex-1 min-h-[2.25rem] flex items-center">
          <Bar span={row.span} pct={pct} tone="project" label={row.project.name} />
          {row.epics
            .filter((e) => e.epic.statusType === 'completed')
            .map((e) => (
              <EpicDeliveryMark key={e.epic.id} epic={e} pct={pct} />
            ))}
        </div>
      </div>

      {open && (
        <div className="mt-1 space-y-0.5">
          {row.epics.map((e) => (
            <EpicRow key={e.epic.id} row={e} pct={pct} locale={locale} />
          ))}
          {row.looseIssues.map((c) => (
            <IssueRow key={c.issue.id} row={c} pct={pct} locale={locale} />
          ))}
          {row.epics.length === 0 && row.looseIssues.length === 0 && (
            <p className="text-[10px] text-gray-600 italic pl-8 py-1">{t.noEpics}</p>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────

export default function PMTimeline({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const model = useMemo(() => getTimelineModel(locale), [locale])
  const scale = useScale(model.rangeStart, model.rangeEnd)
  const ticks = useMemo(
    () => monthTicks(scale.lo, scale.hi, locale),
    [scale.lo, scale.hi, locale],
  )
  const todayPct = scale.pct(new Date().toISOString())

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-10">
        <div className="mb-6" data-aos="fade-up">
          <h2 className="h2 mb-1">{t.heading}</h2>
          <p className="text-gray-400 text-sm">{t.sub}</p>
        </div>

        <div
          className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4 sm:p-5 overflow-x-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="min-w-[720px]">
            {/* Month axis — label spacer + tick track sharing the row layout */}
            <div className="flex items-end gap-3 h-5 mb-1">
              <div className={`${LABEL_W} shrink-0`} />
              <div className="relative flex-1 h-full border-b border-gray-800">
                {ticks.map((m) => (
                  <span
                    key={m.label + m.pct}
                    className="absolute bottom-1 text-[10px] text-gray-500 -translate-x-1/2 whitespace-nowrap"
                    style={{ left: `${m.pct}%` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Rows — each ProjectRow draws its own bar track; gridlines overlay */}
            <div className="relative">
              {/* gridline + today overlay, aligned to the bar track (after the label col) */}
              <div
                className="absolute inset-y-0 right-0 pointer-events-none"
                style={{ left: `calc(${LABEL_PX} + 0.75rem)` }}
              >
                {ticks.map((m) => (
                  <div
                    key={m.label + m.pct}
                    className="absolute inset-y-0 w-px bg-gray-800/60"
                    style={{ left: `${m.pct}%` }}
                  />
                ))}
                {todayPct >= 0 && todayPct <= 100 && (
                  <div
                    className="absolute inset-y-0 w-px bg-purple-500/50"
                    style={{ left: `${todayPct}%` }}
                  />
                )}
              </div>

              {model.rows.map((row) => (
                <ProjectRow key={row.project.id} row={row} pct={scale.pct} locale={locale} />
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-[10px] text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-400" />
            {locale === 'fr' ? 'Projet' : 'Project'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-1.5 rounded-full bg-gradient-to-r from-sky-600 to-sky-400" />
            {locale === 'fr' ? 'Épic' : 'Epic'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-1 rounded-full bg-green-500/70" />
            {locale === 'fr' ? 'Tâche livrée' : 'Delivered issue'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rotate-45 bg-sky-300 border border-sky-100/60" />
            {locale === 'fr' ? 'Épic livré (date)' : 'Epic delivered (date)'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-1 rounded-full bg-gray-600" />
            {t.ongoing}
          </span>
        </div>
      </div>
    </section>
  )
}
