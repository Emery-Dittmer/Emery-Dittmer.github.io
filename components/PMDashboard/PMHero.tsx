import { pmStats } from '@/lib/linearConfig'
import { Locale } from '@/lib/i18n'

const copy = {
  en: {
    heading: 'Project Management',
    sub: 'A track record of leading data-driven teams, delivering on time, and creating measurable impact.',
    projectsLed: 'Projects Led',
    peakTeam: 'Peak Team Size',
    largestBudget: 'Largest Budget',
    combinedImpact: 'Combined Impact',
  },
  fr: {
    heading: 'Gestion de projet',
    sub: "Un bilan de direction d'équipes data, de livraisons dans les délais et d'impacts mesurables.",
    projectsLed: 'Projets dirigés',
    peakTeam: 'Équipe maximale',
    largestBudget: 'Budget le plus élevé',
    combinedImpact: 'Impact combiné',
  },
}

export default function PMHero({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]

  const stats = [
    { label: t.projectsLed,    value: String(pmStats.projectsLed) },
    { label: t.peakTeam,       value: `${pmStats.peakTeamSize} people` },
    { label: t.largestBudget,  value: pmStats.largestBudget },
    { label: t.combinedImpact, value: pmStats.combinedImpact },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-aos="fade-up" data-aos-delay="100">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 text-center"
            >
              <p className="text-3xl font-bold text-white mb-1">{value}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
