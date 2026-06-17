import { completedCycles, CompletedCycle } from '@/lib/linearConfig'
import { Locale } from '@/lib/i18n'

const copy = {
  en: {
    heading: 'Delivery Track Record',
    sub: 'Completed sprints from my personal project workspace.',
    onTime: 'On time',
    overrun: 'Overrun',
  },
  fr: {
    heading: 'Bilan de livraison',
    sub: 'Sprints complétés dans mon espace de travail personnel.',
    onTime: 'Dans les délais',
    overrun: 'Dépassement',
  },
}

function CycleCard({ cycle, t }: { cycle: CompletedCycle; t: typeof copy['en'] }) {
  const pct = cycle.plannedIssues > 0
    ? Math.round((cycle.completedIssues / cycle.plannedIssues) * 100)
    : 0
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-gray-100 leading-snug">{cycle.name}</p>
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
            cycle.completedOnTime
              ? 'bg-green-500/15 text-green-400 border border-green-500/30'
              : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
          }`}
        >
          {cycle.completedOnTime ? t.onTime : t.overrun}
        </span>
      </div>

      <p className="text-xs text-gray-500">
        {fmt(cycle.startDate)} → {fmt(cycle.endDate)}
      </p>

      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{cycle.completedIssues}/{cycle.plannedIssues} issues</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-1.5 rounded-full bg-purple-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function DeliveryTrackRecord({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="border-t border-gray-800 mb-8" />
        <h2 className="h2 text-center mb-2">{t.heading}</h2>
        <p className="text-center text-gray-400 text-sm mb-8">{t.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-aos="fade-up">
          {completedCycles.map((cycle) => (
            <CycleCard key={cycle.id} cycle={cycle} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
