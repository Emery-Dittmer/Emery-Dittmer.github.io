'use client'

import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { completedCycles, pmProjects, CompletedCycle, PMProject } from '@/lib/linearConfig'
import { Locale } from '@/lib/i18n'

const copy = {
  en: {
    heading: 'Delivery Timeline',
    sub: 'Every project, broken down by sprint — real dates, pulled from Linear.',
    sprint: 'Sprint',
    onTime: 'Delivered on time',
    issues: 'issues',
    table: 'View as table',
    chart: 'View as timeline',
    project: 'Project',
    dates: 'Dates',
    completed: 'Completed',
  },
  fr: {
    heading: 'Chronologie de livraison',
    sub: 'Chaque projet, décomposé par sprint — dates réelles, tirées de Linear.',
    sprint: 'Sprint',
    onTime: 'Livré à temps',
    issues: 'tâches',
    table: 'Voir en tableau',
    chart: 'Voir en chronologie',
    project: 'Projet',
    dates: 'Dates',
    completed: 'Terminées',
  },
}

// Cycles without a portfolioProjectId are this site's own dev sprints — the
// only pmProjects entry that also has no portfolioProjectId is "Portfolio
// Website", so that's the fallback bucket for them.
function projectForCycle(cycle: CompletedCycle, projects: PMProject[]): PMProject {
  if (cycle.portfolioProjectId) {
    const match = projects.find((p) => p.portfolioProjectId === cycle.portfolioProjectId)
    if (match) return match
  }
  return projects.find((p) => !p.portfolioProjectId) ?? projects[0]
}

function monthLabel(date: Date, locale: Locale) {
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { month: 'short' })
}

export default function PMTimeline({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const [view, setView] = useState<'chart' | 'table'>('chart')
  const [hovered, setHovered] = useState<string | null>(null)

  const { lanes, monthTicks, rangeStart, rangeEnd } = useMemo(() => {
    const parsed = completedCycles.map((c) => ({
      ...c,
      start: new Date(c.startDate),
      end: new Date(c.endDate),
    }))
    const rangeStart = new Date(Math.min(...parsed.map((c) => c.start.getTime())))
    const rangeEnd = new Date(Math.max(...parsed.map((c) => c.end.getTime())))
    // pad the range by a few days on each side so bars don't touch the edges
    rangeStart.setDate(rangeStart.getDate() - 4)
    rangeEnd.setDate(rangeEnd.getDate() + 4)
    const totalMs = rangeEnd.getTime() - rangeStart.getTime()

    const lanesMap = new Map<string, { project: PMProject; cycles: typeof parsed }>()
    for (const project of pmProjects) lanesMap.set(project.id, { project, cycles: [] })
    for (const cycle of parsed) {
      const project = projectForCycle(cycle, pmProjects)
      lanesMap.get(project.id)?.cycles.push(cycle)
    }

    const monthTicks: { label: string; pct: number }[] = []
    const cursor = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1)
    while (cursor <= rangeEnd) {
      const pct = ((cursor.getTime() - rangeStart.getTime()) / totalMs) * 100
      if (pct >= 0 && pct <= 100) monthTicks.push({ label: monthLabel(cursor, locale), pct })
      cursor.setMonth(cursor.getMonth() + 1)
    }

    return {
      lanes: Array.from(lanesMap.values()).filter((l) => l.cycles.length > 0),
      monthTicks,
      rangeStart,
      rangeEnd,
    }
  }, [locale])

  const totalMs = rangeEnd.getTime() - rangeStart.getTime()
  const pctFor = (d: Date) => ((d.getTime() - rangeStart.getTime()) / totalMs) * 100

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6" data-aos="fade-up">
          <div>
            <h2 className="h2 mb-1">{t.heading}</h2>
            <p className="text-gray-400 text-sm">{t.sub}</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-gray-800 bg-gray-900/60 p-1 text-xs">
            <button
              onClick={() => setView('chart')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                view === 'chart' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {t.chart}
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                view === 'table' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {t.table}
            </button>
          </div>
        </div>

        {view === 'chart' ? (
          <div
            className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5 sm:p-6 overflow-x-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="min-w-[640px]">
              {/* Month axis */}
              <div className="relative h-6 ml-[168px] mb-2 border-b border-gray-800">
                {monthTicks.map((m) => (
                  <span
                    key={m.label + m.pct}
                    className="absolute top-0 text-[11px] text-gray-500 -translate-x-1/2"
                    style={{ left: `${m.pct}%` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Swimlanes */}
              <div className="space-y-3">
                {lanes.map(({ project, cycles }) => (
                  <div key={project.id} className="flex items-center gap-4">
                    <div className="w-40 shrink-0 text-right">
                      <p className="text-xs font-semibold text-gray-200 leading-snug">
                        {project.name[locale]}
                      </p>
                    </div>
                    <div className="relative flex-1 h-10 rounded-lg bg-gray-950/50">
                      {/* month gridlines */}
                      {monthTicks.map((m) => (
                        <div
                          key={m.label + m.pct}
                          className="absolute inset-y-0 w-px bg-gray-800/70"
                          style={{ left: `${m.pct}%` }}
                        />
                      ))}
                      {cycles.map((cycle) => {
                        const left = pctFor(cycle.start)
                        const width = Math.max(pctFor(cycle.end) - left, 3)
                        const isHovered = hovered === cycle.id
                        return (
                          <div
                            key={cycle.id}
                            className="absolute inset-y-1 rounded-md bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_16px_rgba(167,139,250,0.35)] flex items-center px-2 cursor-default transition-transform"
                            style={{
                              left: `${left}%`,
                              width: `${width}%`,
                              transform: isHovered ? 'scaleY(1.08)' : undefined,
                              zIndex: isHovered ? 10 : 1,
                            }}
                            onMouseEnter={() => setHovered(cycle.id)}
                            onMouseLeave={() => setHovered(null)}
                          >
                            <span className="truncate text-[11px] font-medium text-white/95">
                              {cycle.name}
                            </span>

                            {isHovered && (
                              <div className="absolute bottom-full left-0 mb-2 z-20 w-max max-w-[240px] rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 shadow-xl">
                                <p className="text-xs font-semibold text-gray-100 mb-1">{cycle.name}</p>
                                <p className="text-[11px] text-gray-400">
                                  {cycle.startDate} → {cycle.endDate}
                                </p>
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                  {cycle.completedIssues}/{cycle.plannedIssues} {t.issues}
                                </p>
                                {cycle.completedOnTime && (
                                  <p className="flex items-center gap-1 text-[11px] text-green-400 mt-1">
                                    <Check size={11} /> {t.onTime}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-800 text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-2.5 rounded-sm bg-gradient-to-r from-purple-600 to-purple-400" />
                {t.sprint}
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-green-400" />
                {t.onTime}
              </span>
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl border border-gray-800 bg-gray-900/40 overflow-x-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <table className="w-full text-left text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3 font-medium">{t.project}</th>
                  <th className="px-4 py-3 font-medium">{t.sprint}</th>
                  <th className="px-4 py-3 font-medium">{t.dates}</th>
                  <th className="px-4 py-3 font-medium">{t.completed}</th>
                </tr>
              </thead>
              <tbody>
                {lanes.flatMap(({ project, cycles }) =>
                  cycles.map((cycle, i) => (
                    <tr key={cycle.id} className="border-b border-gray-800/60 last:border-0">
                      <td className="px-4 py-3 text-gray-300">
                        {i === 0 ? project.name[locale] : ''}
                      </td>
                      <td className="px-4 py-3 text-gray-200 font-medium">{cycle.name}</td>
                      <td className="px-4 py-3 text-gray-400 tabular-nums">
                        {cycle.startDate} → {cycle.endDate}
                      </td>
                      <td className="px-4 py-3 text-gray-400 tabular-nums">
                        {cycle.completedIssues}/{cycle.plannedIssues}
                        {cycle.completedOnTime && (
                          <Check size={12} className="inline-block text-green-400 ml-1.5 -mt-0.5" />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
