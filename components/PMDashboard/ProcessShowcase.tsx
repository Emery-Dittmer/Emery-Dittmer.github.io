import { getProcessMetrics } from '@/lib/linearDashboard'
import { Locale } from '@/lib/i18n'

const copy = {
  en: {
    heading: 'Process Maturity',
    sub: 'Aggregate patterns from my Linear workspace.',
    velocity: 'Avg Delivered / Month',
    velocitySub: (n: number) => `across ${n} active months`,
    completionRate: 'Completion Rate',
    cycleTime: 'Avg Cycle Time',
    cycleTimeSub: 'start → done',
    days: 'days',
    labels: 'Work Type Mix',
  },
  fr: {
    heading: 'Maturité des processus',
    sub: 'Tendances agrégées de mon espace de travail Linear.',
    velocity: 'Livré / mois (moy.)',
    velocitySub: (n: number) => `sur ${n} mois actifs`,
    completionRate: 'Taux de complétion',
    cycleTime: 'Temps de cycle moyen',
    cycleTimeSub: 'début → terminé',
    days: 'jours',
    labels: 'Répartition par type',
  },
}

const LABEL_COLORS: Record<string, string> = {
  Feature: 'bg-purple-500',
  Improvement: 'bg-blue-400',
  Bug: 'bg-red-500',
}

export default function ProcessShowcase({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const m = getProcessMetrics()
  const labelTotal = m.topLabels.reduce((s, l) => s + l.count, 0)

  return (
    <section id="process" className="relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-16">
        <div className="border-t border-gray-800 mb-8" />
        <h2 className="h2 text-center mb-2">{t.heading}</h2>
        <p className="text-center text-gray-400 text-sm mb-8">{t.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
          {/* Delivered per month */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-center">
            <p className="text-4xl font-bold text-white mb-1">{m.avgDeliveredPerMonth}</p>
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              {t.velocity}
            </p>
            <p className="text-xs text-gray-500 mt-1">{t.velocitySub(m.activeMonths)}</p>
          </div>

          {/* Cycle time */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-center">
            <p className="text-4xl font-bold text-white mb-1">
              {m.avgCycleDays}
              <span className="text-lg text-gray-500 ml-1">{t.days}</span>
            </p>
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              {t.cycleTime}
            </p>
            <p className="text-xs text-gray-500 mt-1">{t.cycleTimeSub}</p>
          </div>

          {/* Completion rate */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 flex flex-col justify-center">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span className="font-semibold text-purple-400 uppercase tracking-wider">
                {t.completionRate}
              </span>
              <span className="text-white font-bold">{m.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-purple-500"
                style={{ width: `${m.completionRate}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {m.completedIssues}/{m.totalIssues}
            </p>
          </div>

          {/* Work type mix */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
              {t.labels}
            </p>
            {labelTotal > 0 ? (
              <>
                <div className="flex rounded-full overflow-hidden h-2 w-full mb-3">
                  {m.topLabels.map((l) => (
                    <div
                      key={l.name}
                      className={LABEL_COLORS[l.name] ?? 'bg-gray-500'}
                      style={{ width: `${(l.count / labelTotal) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {m.topLabels.map((l) => (
                    <span key={l.name} className="flex items-center gap-1 text-[10px] text-gray-500">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${LABEL_COLORS[l.name] ?? 'bg-gray-500'}`}
                      />
                      {l.name} {l.count}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-xs text-gray-500">—</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
