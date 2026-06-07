import { Locale } from '@/lib/i18n'
import WindCanvas from '@/components/wind-canvas'

export default function HumanSide({ locale = 'en' }: { locale?: Locale }) {
  const copy = {
    en: {
      title: 'The Human Side',
      intro: 'Work is what I do — not all of who I am. A few things that keep me going outside of spreadsheets and model training.',
      items: [
        {
          emoji: '🚂',
          title: 'Train Obsessive',
          body: 'I built a live SNCF train tracking map from scratch — real-time positions, delays, and route shapes across France. It started as a weekend project and became something I actually use.',
          link: `/SNCFMap/${locale}`,
          linkText: 'See the live map',
        },
        {
          emoji: '🏃',
          title: 'Runner',
          body: 'Running is how I decompress. Nothing clears a problem faster than a long run where you have no choice but to think.',
          link: null,
          linkText: null,
        },
        {
          emoji: '🎸',
          title: 'Guitar Player',
          body: 'Started playing guitar in high school and never stopped. Mostly fingerstyle and blues — terrible at singing along.',
          link: null,
          linkText: null,
        },
        {
          emoji: '🌍',
          title: 'California → Montreal → Ottawa → Paris',
          body: 'Grew up in California, studied at McGill, built a career in Ottawa, and spent time in Paris. Each place left something behind in how I work and how I think.',
          link: null,
          linkText: null,
        },
        {
          emoji: '📚',
          title: 'Reader',
          body: 'Business, history, science — anything that explains why things are the way they are. Currently working through a stack of data strategy and behavioural economics books.',
          link: `/CoolStuff/${locale}`,
          linkText: 'See my reading list',
        },
        {
          emoji: '🚲',
          title: 'Cyclist',
          body: 'City cycling is the best way to understand a place. Whether it\'s bike paths along the canal in Ottawa or navigating Paris by vélo, it\'s my default mode.',
          link: null,
          linkText: null,
        },
      ],
      cta: 'See more →',
    },
    fr: {
      title: 'Le côté humain',
      intro: 'Le travail, c\'est ce que je fais — pas tout ce que je suis. Quelques choses qui me font avancer en dehors des tableaux et de l\'entraînement de modèles.',
      items: [
        {
          emoji: '🚂',
          title: 'Passionné de trains',
          body: 'J\'ai construit de zéro une carte de suivi des trains SNCF en direct — positions en temps réel, retards et tracés des trajets à travers la France. Commencé le week-end, devenu un outil que j\'utilise vraiment.',
          link: `/SNCFMap/${locale}`,
          linkText: 'Voir la carte en direct',
        },
        {
          emoji: '🏃',
          title: 'Coureur',
          body: 'La course à pied, c\'est ma façon de décompresser. Rien ne clarifie un problème plus vite qu\'une longue course où on n\'a pas d\'autre choix que de réfléchir.',
          link: null,
          linkText: null,
        },
        {
          emoji: '🎸',
          title: 'Guitariste',
          body: 'J\'ai commencé la guitare au lycée et je n\'ai jamais arrêté. Surtout fingerstyle et blues — catastrophique pour chanter en même temps.',
          link: null,
          linkText: null,
        },
        {
          emoji: '🌍',
          title: 'Californie → Montréal → Ottawa → Paris',
          body: 'Grandi en Californie, études à McGill, carrière à Ottawa, temps passé à Paris. Chaque endroit a laissé une empreinte dans ma façon de travailler et de penser.',
          link: null,
          linkText: null,
        },
        {
          emoji: '📚',
          title: 'Lecteur',
          body: 'Business, histoire, sciences — tout ce qui explique pourquoi les choses sont ce qu\'elles sont. En train de lire une pile de livres sur la stratégie data et l\'économie comportementale.',
          link: `/CoolStuff/${locale}`,
          linkText: 'Voir ma liste de lecture',
        },
        {
          emoji: '🚲',
          title: 'Cycliste',
          body: 'Le vélo en ville est la meilleure façon de comprendre un endroit. Que ce soit les pistes cyclables le long du canal à Ottawa ou naviguer Paris à vélo, c\'est mon mode par défaut.',
          link: null,
          linkText: null,
        },
      ],
      cta: 'En savoir plus →',
    },
  }
  const t = copy[locale]

  return (
    <section className="relative overflow-hidden">
      <WindCanvas particleCount={180} speed={0.9} maxOpacity={0.3} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="py-12 md:py-20 border-t border-gray-800">

          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">{t.title}</h2>
            <p className="text-xl text-gray-400">{t.intro}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
            {t.items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-800 bg-gray-900/40 p-6 flex flex-col gap-3 hover:border-gray-700 transition-colors"
              >
                <div className="text-3xl">{item.emoji}</div>
                <h4 className="font-semibold text-gray-100 text-base">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{item.body}</p>
                {item.link && (
                  <a
                    href={item.link}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors mt-1"
                  >
                    {item.linkText}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={`/CoolStuff/${locale}`}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
            >
              {t.cta}
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
