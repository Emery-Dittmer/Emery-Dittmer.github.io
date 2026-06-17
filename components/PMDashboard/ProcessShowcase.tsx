import { processMetrics } from '@/lib/linearConfig'
import { Locale } from '@/lib/i18n'

const copy = {
  en: {
    heading: 'Process Maturity',
    sub: 'Aggregate patterns from my Linear workspace.',
    velocity: 'Avg Velocity',
    velocitySub: 'issues closed per sprint',
    completionRate: 'Avg Completion Rate',
    topLabels: 'Most-Used Labels',
  },
  fr: {
    heading: 'Maturité des processus',
    sub: "Tendances agrégées de mon espace de travail Linear.",
    velocity: 'Vélocité moyenne',
    velocitySub: 'tickets fermés par sprint',
    completionRate: 'Taux de complétion moyen',
    topLabels: 'Labels les plus utilisés',
  },
}

export default function ProcessShowcase({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-16">
        <div className="border-t border-gray-800 mb-8" />
        <h2 className="h2 text-center mb-2">{t.heading}</h2>
        <p className="text-center text-gray-400 text-sm mb-8">{t.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-aos="fade-up">
          {/* Velocity */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-center">
            <p className="text-4xl font-bold text-white mb-1">
              {processMetrics.avgVelocity}
            </p>
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              {t.velocity}
            </p>
            <p className="text-xs text-gray-500 mt-1">{t.velocitySub}</p>
          </div>

          {/* Completion rate */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 flex flex-col justify-center">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span className="font-semibold text-purple-400 uppercase tracking-wider">
                {t.completionRate}
              </span>
              <span className="text-white font-bold">
                {processMetrics.avgCompletionRate}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-purple-500"
                style={{ width: `${processMetrics.avgCompletionRate}%` }}
              />
            </div>
          </div>

          {/* Top labels */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
              {t.topLabels}
            </p>
            <div className="flex flex-wrap gap-2">
              {processMetrics.topLabels.map((label) => (
                <span
                  key={label}
                  className="px-2.5 py-1 rounded-full text-xs bg-gray-800 border border-gray-700 text-gray-300"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
