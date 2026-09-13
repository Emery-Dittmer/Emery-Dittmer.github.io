import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { ProjectView } from '@/lib/linearDashboard'
import { STATUS_STYLE, statusLabel, fmtDate } from './projectStatus'

const copy = {
  en: {
    lead: 'Lead',
    timeline: 'Timeline',
    milestones: 'Milestones',
    delivered: 'Delivered',
    epics: 'epics',
    issues: 'issues',
    viewProject: 'View project →',
    viewLinear: 'Open in Linear →',
    noSummary: 'Description pending.',
  },
  fr: {
    lead: 'Responsable',
    timeline: 'Échéancier',
    milestones: 'Jalons',
    delivered: 'Livré',
    epics: 'épics',
    issues: 'tâches',
    viewProject: 'Voir le projet →',
    viewLinear: 'Ouvrir dans Linear →',
    noSummary: 'Description à venir.',
  },
}

/** Compact project summary — used inside hover popovers and as a standalone card. */
export default function ProjectOverviewCard({
  project,
  locale,
}: {
  project: ProjectView
  locale: Locale
}) {
  const t = copy[locale]
  const donePct =
    project.issueCount > 0 ? Math.round((project.doneCount / project.issueCount) * 100) : 0

  return (
    <div className="text-left">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <p className="text-sm font-semibold text-gray-100 leading-snug">{project.name}</p>
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_STYLE[project.status]}`}
        >
          {statusLabel(project.status, locale)}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-2">
        {project.summary || <span className="italic text-gray-600">{t.noSummary}</span>}
      </p>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-gray-500 mb-2">
        {project.lead && (
          <>
            <dt>{t.lead}</dt>
            <dd className="text-gray-300 text-right">{project.lead}</dd>
          </>
        )}
        <dt>{t.timeline}</dt>
        <dd className="text-gray-300 text-right tabular-nums">
          {fmtDate(project.startDate ?? project.firstActivity, locale)} →{' '}
          {fmtDate(project.targetDate ?? project.lastActivity, locale)}
        </dd>
        {project.milestones.length > 0 && (
          <>
            <dt>{t.milestones}</dt>
            <dd className="text-gray-300 text-right">{project.milestones.length}</dd>
          </>
        )}
        <dt>{t.delivered}</dt>
        <dd className="text-gray-300 text-right tabular-nums">
          {project.doneCount}/{project.issueCount} {t.issues}
          {project.epicCount > 0 && ` · ${project.epicCount} ${t.epics}`}
        </dd>
      </dl>

      <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden mb-2">
        <div className="h-1 rounded-full bg-purple-500" style={{ width: `${donePct}%` }} />
      </div>

      <div className="flex items-center gap-3">
        {project.portfolioProjectId && (
          <Link
            href={`/Projects/${locale}/${project.portfolioProjectId}`}
            className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
          >
            {t.viewProject}
          </Link>
        )}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
        >
          {t.viewLinear}
        </a>
      </div>
    </div>
  )
}
