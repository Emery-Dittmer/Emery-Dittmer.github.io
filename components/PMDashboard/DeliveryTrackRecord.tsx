import { dashboardData, getProjectViews, getEpicReferenceUrl } from '@/lib/linearDashboard'
import { Locale } from '@/lib/i18n'
import { fmtDate } from './projectStatus'

const copy = {
  en: {
    heading: 'Delivery Track Record',
    sub: 'Completed epics from my Linear workspace — each a multi-issue body of work shipped end to end.',
    shipped: 'Shipped',
    inFlight: 'In flight',
    issues: 'issues',
  },
  fr: {
    heading: 'Bilan de livraison',
    sub: 'Épics terminés dans mon espace Linear — chacun un ensemble de tâches livré de bout en bout.',
    shipped: 'Livré',
    inFlight: 'En cours',
    issues: 'tâches',
  },
}

export default function DeliveryTrackRecord({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const projectName = new Map(getProjectViews(locale).map((p) => [p.id, p.name]))

  const epics = [...dashboardData.epics]
    .sort((a, b) => (b.lastActivity ?? '').localeCompare(a.lastActivity ?? ''))

  return (
    <section id="track-record" className="relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="border-t border-gray-800 mb-8" />
        <h2 className="h2 text-center mb-2">{t.heading}</h2>
        <p className="text-center text-gray-400 text-sm mb-8">{t.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-aos="fade-up">
          {epics.map((epic) => {
            const pct =
              epic.childCount > 0 ? Math.round((epic.doneCount / epic.childCount) * 100) : 0
            const shipped = epic.statusType === 'completed'
            return (
              <a
                key={epic.id}
                href={getEpicReferenceUrl(epic)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 flex flex-col gap-3 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-100 leading-snug">{epic.title}</p>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      shipped
                        ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                        : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {shipped ? t.shipped : t.inFlight}
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  {epic.projectId ? projectName.get(epic.projectId) ?? '' : ''} ·{' '}
                  {fmtDate(epic.firstActivity, locale)} → {fmtDate(epic.lastActivity, locale)}
                </p>

                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>
                      {epic.doneCount}/{epic.childCount} {t.issues}
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${shipped ? 'bg-green-500' : 'bg-purple-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
