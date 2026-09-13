import { Locale } from '@/lib/i18n'
import { ProjectStatus } from '@/lib/linearDashboard'

export const STATUS_LABEL: Record<ProjectStatus, { en: string; fr: string }> = {
  started: { en: 'In Progress', fr: 'En cours' },
  planned: { en: 'Planned', fr: 'Planifié' },
  paused: { en: 'Paused', fr: 'En pause' },
  backlog: { en: 'Backlog', fr: 'Backlog' },
  completed: { en: 'Completed', fr: 'Terminé' },
  canceled: { en: 'Canceled', fr: 'Annulé' },
}

export const STATUS_STYLE: Record<ProjectStatus, string> = {
  started: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  planned: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30',
  paused: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  backlog: 'bg-gray-500/15 text-gray-400 border border-gray-500/30',
  completed: 'bg-green-500/15 text-green-400 border border-green-500/30',
  canceled: 'bg-red-500/15 text-red-400 border border-red-500/30',
}

export function statusLabel(status: ProjectStatus, locale: Locale) {
  return (STATUS_LABEL[status] ?? STATUS_LABEL.backlog)[locale]
}

export function fmtDate(iso: string | null, locale: Locale) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-CA', {
    month: 'short',
    year: 'numeric',
  })
}
