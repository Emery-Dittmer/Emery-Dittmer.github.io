import { pmStats } from '@/lib/linearConfig'
import { getProcessMetrics } from '@/lib/linearDashboard'
import { Locale } from '@/lib/i18n'

const copy = {
  en: {
    heading: 'Project Management',
    sub: 'A track record of leading data-driven teams, delivering on time, and creating measurable impact.',
    projectsLed: 'Projects Led',
    largestBudget: 'Largest Budget',
    combinedImpact: 'Combined Impact',
    delivered: 'Issues Delivered',
    epicsShipped: 'Epics Shipped',
    live: 'Live from Linear',
  },
  fr: {
    heading: 'Gestion de projet',
    sub: "Un bilan de direction d'équipes data, de livraisons dans les délais et d'impacts mesurables.",
    projectsLed: 'Projets dirigés',
    largestBudget: 'Budget le plus élevé',
    combinedImpact: 'Impact combiné',
    delivered: 'Tâches livrées',
    epicsShipped: 'Épics livrés',
    live: 'En direct de Linear',
  },
}

export default function PMHero({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const m = getProcessMetrics()

  const stats = [
    { label: t.projectsLed, value: String(pmStats.projectsLed) },
    { label: t.largestBudget, value: pmStats.largestBudget },
    { label: t.combinedImpact, value: pmStats.combinedImpact },
    { label: t.delivered, value: String(m.completedIssues), live: true },
    { label: t.epicsShipped, value: `${m.epicsShipped}/${m.epicsTotal}`, live: true },
  ]

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="text-center mb-10" data-aos="fade-up">
          <h1 className="h1 mb-4">{t.heading}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.sub}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {pmStats.certifications.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/20 border border-purple-500/40 text-purple-300"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {stats.map(({ label, value, live }) => (
            <div
              key={label}
              className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 text-center"
            >
              <p className="text-3xl font-bold text-white mb-1">{value}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
              {live && (
                <p className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-purple-400/80">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  {t.live}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
