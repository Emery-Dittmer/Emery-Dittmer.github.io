'use client'

import { useEffect, useRef, useState } from 'react'
import { Filter, X } from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { getProjectViews } from '@/lib/linearDashboard'
import { useDashboardFilter } from './DashboardFilterContext'

const copy = {
  en: {
    filter: 'Filter',
    project: 'Project',
    allProjects: 'All projects',
    from: 'From',
    to: 'To',
    clear: 'Clear',
    apply: 'Done',
  },
  fr: {
    filter: 'Filtrer',
    project: 'Projet',
    allProjects: 'Tous les projets',
    from: 'Du',
    to: 'Au',
    clear: 'Effacer',
    apply: 'OK',
  },
}

export default function DashboardFilterButton({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const { filter, setFilter, clear, isActive } = useDashboardFilter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const projects = getProjectViews(locale).filter((p) => p.issueCount > 0)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
          isActive
            ? 'border-purple-500/60 bg-purple-600/15 text-purple-300'
            : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:text-gray-200 hover:border-gray-700'
        }`}
      >
        <Filter size={13} />
        {t.filter}
        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-40 w-72 rounded-xl border border-gray-700 bg-gray-900 p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
              {t.filter}
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>

          <label className="block mb-3">
            <span className="block text-[11px] text-gray-500 mb-1">{t.project}</span>
            <select
              value={filter.projectId ?? ''}
              onChange={(e) =>
                setFilter({ ...filter, projectId: e.target.value || null })
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-purple-500"
            >
              <option value="">{t.allProjects}</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <label className="block">
              <span className="block text-[11px] text-gray-500 mb-1">{t.from}</span>
              <input
                type="date"
                value={filter.dateFrom ?? ''}
                onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value || null })}
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-purple-500"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] text-gray-500 mb-1">{t.to}</span>
              <input
                type="date"
                value={filter.dateTo ?? ''}
                onChange={(e) => setFilter({ ...filter, dateTo: e.target.value || null })}
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-purple-500"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={clear}
              disabled={!isActive}
              className="text-[11px] text-gray-500 hover:text-gray-300 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
            >
              {t.clear}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors px-3 py-1.5 text-xs font-semibold text-white"
            >
              {t.apply}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
