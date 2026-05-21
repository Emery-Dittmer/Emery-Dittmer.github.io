'use client'

export default function SNCFTrainMap({ locale }: { locale: string }) {
  const title = locale === 'fr' ? 'Carte ferroviaire SNCF en direct' : 'SNCF Live Train Map'
  const subtitle = locale === 'fr'
    ? 'Positions des trains en temps réel, retards et arrêts à travers la France'
    : 'Real-time train positions, delays, and stops across France'

  return (
    <section className="w-full pt-20">
      <div className="mx-auto px-4 sm:px-6">
        <div className="pb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-200">{title}</h1>
          <p className="text-lg text-gray-400">{subtitle}</p>
        </div>
        <div
          className="overflow-hidden rounded-xl border border-gray-800"
          style={{ height: '80vh' }}
        >
          <iframe
            src="/sncf-map/map.html"
            className="h-full w-full"
            title="SNCF Train Map"
            frameBorder="0"
          />
        </div>
      </div>
    </section>
  )
}
