'use client'

import { useMemo, useState } from 'react'
import { ArrowUpDown, ExternalLink } from 'lucide-react'
import { dashboardData, getProjectViews } from '@/lib/linearDashboard'
import { Locale } from '@/lib/i18n'

const copy = {
  en: {
    heading: 'Issue Explorer',
    sub: 'Every issue in the workspace — search, filter, sort.',
    search: 'Search issues…',
    allProjects: 'All projects',
    allStatus: 'All statuses',
    allPriority: 'All priorities',
    noParent: '—',
    showing: (n: number, total: number) => `Showing ${n} of ${total}`,
    cols: {
      id: 'ID',
      title: 'Title',
      project: 'Project',
      epic: 'Epic',
      status: 'Status',
      priority: 'Priority',
      completed: 'Completed',
    },
  },
  fr: {
    heading: 'Explorateur de tâches',
    sub: 'Toutes les tâches de l’espace — recherche, filtre, tri.',
    search: 'Rechercher…',
    allProjects: 'Tous les projets',
    allStatus: 'Tous les statuts',
    allPriority: 'Toutes les priorités',
    noParent: '—',
    showing: (n: number, total: number) => `${n} sur ${total}`,
    cols: {
      id: 'ID',
      title: 'Titre',
      project: 'Projet',
      epic: 'Épic',
      status: 'Statut',
      priority: 'Priorité',
      completed: 'Terminé',
    },
  },
}

type SortKey = 'id' | 'status' | 'priority' | 'completed' | 'updated'

const STATUS_DOT: Record<string, string> = {
  completed: 'bg-green-500',
  started: 'bg-blue-500',
  unstarted: 'bg-yellow-500',
  backlog: 'bg-gray-600',
  canceled: 'bg-red-500',
}

export default function IssueExplorer({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const projectName = useMemo(
    () => new Map(getProjectViews(locale).map((p) => [p.id, p.name])),
    [locale],
  )
  const epicTitle = useMemo(
    () => new Map(dashboardData.epics.map((e) => [e.id, e.title])),
    [],
  )

  const [q, setQ] = useState('')
  const [project, setProject] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [sort, setSort] = useState<SortKey>('updated')
  const [asc, setAsc] = useState(false)

  const statuses = useMemo(
    () => [...new Set(dashboardData.issues.map((i) => i.status).filter(Boolean))] as string[],
    [],
  )

  const rows = useMemo(() => {
    let list = dashboardData.issues.slice()
    if (q.trim()) {
      const needle = q.toLowerCase()
      list = list.filter(
        (i) => i.title.toLowerCase().includes(needle) || i.id.toLowerCase().includes(needle),
      )
    }
    if (project) list = list.filter((i) => i.projectId === project)
    if (status) list = list.filter((i) => i.status === status)
    if (priority) list = list.filter((i) => String(i.priority) === priority)

    const dir = asc ? 1 : -1
    list.sort((a, b) => {
      switch (sort) {
        case 'id':
          return dir * a.id.localeCompare(b.id, undefined, { numeric: true })
        case 'status':
          return dir * (a.status ?? '').localeCompare(b.status ?? '')
        case 'priority':
          // Urgent (1) highest; None (0) lowest
          return dir * ((a.priority || 99) - (b.priority || 99))
        case 'completed':
          return dir * (a.completedAt ?? '').localeCompare(b.completedAt ?? '')
        default:
          return dir * (a.updatedAt ?? '').localeCompare(b.updatedAt ?? '')
      }
    })
    return list
  }, [q, project, status, priority, sort, asc])

  const toggleSort = (key: SortKey) => {
    if (sort === key) setAsc((v) => !v)
    else {
      setSort(key)
      setAsc(false)
    }
  }

  const th = (key: SortKey, label: string) => (
    <th className="px-3 py-2 font-medium">
      <button
        onClick={() => toggleSort(key)}
        className={`flex items-center gap-1 hover:text-gray-200 transition-colors ${
          sort === key ? 'text-gray-200' : ''
        }`}
      >
        {label}
        <ArrowUpDown size={11} className="opacity-50" />
      </button>
    </th>
  )

  const selectCls =
    'rounded-lg border border-gray-800 bg-gray-900/60 px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-purple-500'

  return (
    <section id="issues" className="relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-16">
        <div className="border-t border-gray-800 mb-8" />
        <h2 className="h2 text-center mb-2">{t.heading}</h2>
        <p className="text-center text-gray-400 text-sm mb-6">{t.sub}</p>

        <div className="flex flex-wrap gap-2 mb-4" data-aos="fade-up">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search}
            className={`${selectCls} flex-1 min-w-[180px]`}
          />
          <select value={project} onChange={(e) => setProject(e.target.value)} className={selectCls}>
            <option value="">{t.allProjects}</option>
            {getProjectViews(locale)
              .filter((p) => p.issueCount > 0)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
            <option value="">{t.allStatus}</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className={selectCls}>
            <option value="">{t.allPriority}</option>
            <option value="1">Urgent</option>
            <option value="2">High</option>
            <option value="3">Medium</option>
            <option value="4">Low</option>
            <option value="0">None</option>
          </select>
        </div>

        <p className="text-[11px] text-gray-500 mb-2">
          {t.showing(rows.length, dashboardData.issues.length)}
        </p>

        <div
          className="rounded-2xl border border-gray-800 bg-gray-900/40 overflow-x-auto"
          data-aos="fade-up"
        >
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead>
              <tr className="border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-500">
                {th('id', t.cols.id)}
                <th className="px-3 py-2 font-medium">{t.cols.title}</th>
                <th className="px-3 py-2 font-medium">{t.cols.project}</th>
                <th className="px-3 py-2 font-medium">{t.cols.epic}</th>
                {th('status', t.cols.status)}
                {th('priority', t.cols.priority)}
                {th('completed', t.cols.completed)}
              </tr>
            </thead>
            <tbody>
              {rows.map((issue) => (
                <tr
                  key={issue.id}
                  className="border-b border-gray-800/60 last:border-0 hover:bg-gray-900/40"
                >
                  <td className="px-3 py-2 text-gray-500 tabular-nums whitespace-nowrap">
                    {issue.id}
                  </td>
                  <td className="px-3 py-2 text-gray-300">
                    <a
                      href={issue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors inline-flex items-center gap-1"
                    >
                      {issue.title}
                      <ExternalLink size={10} className="opacity-40 shrink-0" />
                    </a>
                  </td>
                  <td className="px-3 py-2 text-gray-500 whitespace-nowrap">
                    {issue.projectId ? projectName.get(issue.projectId) ?? '' : t.noParent}
                  </td>
                  <td className="px-3 py-2 text-gray-500 whitespace-nowrap">
                    {issue.parentId ? epicTitle.get(issue.parentId) ?? issue.parentId : t.noParent}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-gray-400">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          STATUS_DOT[issue.statusType ?? ''] ?? 'bg-gray-600'
                        }`}
                      />
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{issue.priorityName}</td>
                  <td className="px-3 py-2 text-gray-500 tabular-nums whitespace-nowrap">
                    {issue.completedAt ? issue.completedAt.slice(0, 10) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
