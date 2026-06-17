'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Locale } from '@/lib/i18n'

type LinearIssue = { title: string; priority: number; url: string }
type RecentIssue = { title: string; completedAt: string; url: string }
type CycleData = {
  name: string
  number: number
  startsAt: string
  endsAt: string
  completedCount: number
  totalCount: number
}
type WidgetData = {
  cycle: CycleData | null
  inProgress: LinearIssue[]
  recentlyDone: RecentIssue[]
}

const PRIORITY_LABEL: Record<number, string> = {
  0: '—', 1: 'Urgent', 2: 'High', 3: 'Medium', 4: 'Low',
}
const PRIORITY_COLOR: Record<number, string> = {
  0: 'text-gray-500', 1: 'text-red-400', 2: 'text-orange-400', 3: 'text-yellow-400', 4: 'text-gray-400',
}

const copy = {
  en: {
    label: 'What is Emery up to?',
    now: 'Now',
    inProgress: 'In Progress',
    recentlyDone: 'Recently Done',
    betweenSprints: 'Between sprints',
    noActivity: 'No recent activity',
    pct: (c: number, t: number) => `${t > 0 ? Math.round((c / t) * 100) : 0}% complete`,
  },
  fr: {
    label: "Qu'est-ce qu'Emery fait en ce moment ?",
    now: 'En cours',
    inProgress: 'En cours de traitement',
    recentlyDone: 'Récemment terminé',
    betweenSprints: 'Entre deux sprints',
    noActivity: 'Aucune activité récente',
    pct: (c: number, t: number) => `${t > 0 ? Math.round((c / t) * 100) : 0}% complété`,
  },
}

function Skeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-xl bg-gray-800 h-24" />
      ))}
    </div>
  )
}

export default function WhatIsEmeryUpTo({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const [open, setOpen] = useState(false)
  const [fetched, setFetched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<WidgetData | null>(null)

  const handleToggle = async () => {
    const next = !open
    setOpen(next)
    if (next && !fetched) {
      setLoading(true)
      try {
        const res = await fetch('/linear-current.json')
        const json: WidgetData = await res.json()
        setData(json)
      } finally {
        setFetched(true)
        setLoading(false)
      }
    }
  }

  const pct =
    data?.cycle
      ? Math.round(
          data.cycle.totalCount > 0
            ? (data.cycle.completedCount / data.cycle.totalCount) * 100
            : 0,
        )
      : 0

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="border-t border-gray-800 mb-4" />

        <button
          onClick={handleToggle}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/60 hover:border-gray-700 transition-colors"
        >
          <span className="text-sm font-semibold text-gray-200">{t.label}</span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="mt-2 rounded-xl border border-gray-800 bg-gray-900/40 overflow-hidden">
            {loading ? (
              <Skeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                {/* Now */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                    {t.now}
                  </p>
                  {data?.cycle ? (
                    <>
                      <p className="text-sm font-semibold text-gray-100 mb-2">
                        {data.cycle.name}
                      </p>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden mb-1">
                        <div
                          className="h-1.5 rounded-full bg-purple-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {t.pct(data.cycle.completedCount, data.cycle.totalCount)}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-500">{t.betweenSprints}</p>
                  )}
                </div>

                {/* In Progress */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                    {t.inProgress}
                  </p>
                  {data?.inProgress.length ? (
                    <ul className="space-y-2">
                      {data.inProgress.map((issue) => (
                        <li key={issue.url} className="flex items-start gap-2">
                          <span className={`text-[10px] font-semibold mt-0.5 shrink-0 ${PRIORITY_COLOR[issue.priority] ?? 'text-gray-400'}`}>
                            {PRIORITY_LABEL[issue.priority] ?? '—'}
                          </span>
                          <a
                            href={issue.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-300 hover:text-purple-300 transition-colors leading-snug"
                          >
                            {issue.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-500">{t.noActivity}</p>
                  )}
                </div>

                {/* Recently Done */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                    {t.recentlyDone}
                  </p>
                  {data?.recentlyDone.length ? (
                    <ul className="space-y-2">
                      {data.recentlyDone.map((issue) => (
                        <li key={issue.url} className="flex items-start gap-1.5">
                          <span className="text-green-400 mt-0.5 shrink-0 text-xs">✓</span>
                          <a
                            href={issue.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-300 hover:text-purple-300 transition-colors leading-snug"
                          >
                            {issue.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-500">{t.noActivity}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
