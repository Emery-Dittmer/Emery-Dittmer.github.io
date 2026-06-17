import Link from 'next/link'
import { pmProjects, PMProject } from '@/lib/linearConfig'
import { Locale } from '@/lib/i18n'

const copy = {
  en: {
    heading: 'Project Leadership',
    sub: 'Personal projects structured and managed in Linear.',
    milestones: 'Milestones',
    status: { completed: 'Completed', 'in-progress': 'In Progress' } as Record<string, string>,
    viewProject: 'View project →',
    priority: { urgent: 'Urgent', high: 'High', medium: 'Medium', low: 'Low' },
  },
  fr: {
    heading: 'Direction de projets',
    sub: 'Projets personnels structurés et gérés dans Linear.',
    milestones: 'Jalons',
    status: { completed: 'Terminé', 'in-progress': 'En cours' } as Record<string, string>,
    viewProject: 'Voir le projet →',
    priority: { urgent: 'Urgent', high: 'Haute', medium: 'Moyenne', low: 'Basse' },
  },
}

const PRIORITY_COLORS = {
  urgent: 'bg-red-500',
  high: 'bg-orange-400',
  medium: 'bg-yellow-400',
  low: 'bg-gray-500',
}

function PriorityBar({ breakdown }: { breakdown: PMProject['priorityBreakdown'] }) {
  const total = breakdown.urgent + breakdown.high + breakdown.medium + breakdown.low
  if (total === 0) return null
  return (
    <div className="flex rounded-full overflow-hidden h-1.5 w-full">
      {(['urgent', 'high', 'medium', 'low'] as const).map((k) =>
        breakdown[k] > 0 ? (
          <div
            key={k}
            className={PRIORITY_COLORS[k]}
            style={{ width: `${(breakdown[k] / total) * 100}%` }}
          />
        ) : null
      )}
    </div>
  )
}

function ProjectCard({ project, locale, t }: { project: PMProject; locale: Locale; t: typeof copy['en'] }) {
  const milestonePct = project.milestones > 0
    ? Math.round((project.completedMilestones / project.milestones) * 100)
    : 0

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-gray-100 leading-snug">
          {project.name[locale]}
        </p>
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
            project.status === 'completed'
              ? 'bg-green-500/15 text-green-400 border border-green-500/30'
              : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
          }`}
        >
          {t.status[project.status]}
        </span>
      </div>

      <p className="text-xs text-gray-400">
        {t.milestones}: {project.completedMilestones}/{project.milestones} ({milestonePct}%)
      </p>

      <div>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Priority split</p>
        <PriorityBar breakdown={project.priorityBreakdown} />
        <div className="flex gap-3 mt-1.5 flex-wrap">
          {(['urgent', 'high', 'medium', 'low'] as const).map((k) =>
            project.priorityBreakdown[k] > 0 ? (
              <span key={k} className="flex items-center gap-1 text-[10px] text-gray-500">
                <span className={`inline-block w-2 h-2 rounded-full ${PRIORITY_COLORS[k]}`} />
                {t.priority[k]} {project.priorityBreakdown[k]}
              </span>
            ) : null
          )}
        </div>
      </div>

      {project.portfolioProjectId && (
        <Link
          href={`/Projects/${locale}/${project.portfolioProjectId}`}
          className="text-xs text-purple-400 hover:text-purple-300 transition-colors mt-auto"
        >
          {t.viewProject}
        </Link>
      )}
    </div>
  )
}

export default function ProjectLeadershipBoard({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="border-t border-gray-800 mb-8" />
        <h2 className="h2 text-center mb-2">{t.heading}</h2>
        <p className="text-center text-gray-400 text-sm mb-8">{t.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
          {pmProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
