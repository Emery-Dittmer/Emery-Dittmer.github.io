import { Locale } from '@/lib/i18n'
import WindCanvas from '@/components/wind-canvas'
import Image from 'next/image'

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
          image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '🏃',
          title: 'Runner',
          body: 'Running is how I decompress. Nothing clears a problem faster than a long run where you have no choice but to think.',
          link: null,
          linkText: null,
          image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '🎸',
          title: 'Guitar Player',
          body: 'Started playing guitar in high school and never stopped. Mostly fingerstyle and blues — terrible at singing along.',
          link: null,
          linkText: null,
          image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '🌍',
          title: 'California → Montreal → Ottawa → Paris',
          body: 'Grew up in California, studied at McGill, built a career in Ottawa, and spent time in Paris. Each place left something behind in how I work and how I think.',
          link: null,
          linkText: null,
          image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '📚',
          title: 'Reader',
          body: 'Business, history, science — anything that explains why things are the way they are. Currently working through a stack of data strategy and behavioural economics books.',
          link: `/CoolStuff/${locale}`,
          linkText: 'See my reading list',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '🚲',
          title: 'Cyclist',
          body: 'City cycling is the best way to understand a place. Whether it\'s bike paths along the canal in Ottawa or navigating Paris by vélo, it\'s my default mode.',
          link: null,
          linkText: null,
          image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80',
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
          image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '🏃',
          title: 'Coureur',
          body: 'La course à pied, c\'est ma façon de décompresser. Rien ne clarifie un problème plus vite qu\'une longue course où on n\'a pas d\'autre choix que de réfléchir.',
          link: null,
          linkText: null,
          image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '🎸',
          title: 'Guitariste',
          body: 'J\'ai commencé la guitare au lycée et je n\'ai jamais arrêté. Surtout fingerstyle et blues — catastrophique pour chanter en même temps.',
          link: null,
          linkText: null,
          image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '🌍',
          title: 'Californie → Montréal → Ottawa → Paris',
          body: 'Grandi en Californie, études à McGill, carrière à Ottawa, temps passé à Paris. Chaque endroit a laissé une empreinte dans ma façon de travailler et de penser.',
          link: null,
          linkText: null,
          image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '📚',
          title: 'Lecteur',
          body: 'Business, histoire, sciences — tout ce qui explique pourquoi les choses sont ce qu\'elles sont. En train de lire une pile de livres sur la stratégie data et l\'économie comportementale.',
          link: `/CoolStuff/${locale}`,
          linkText: 'Voir ma liste de lecture',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
        },
        {
          emoji: '🚲',
          title: 'Cycliste',
          body: 'Le vélo en ville est la meilleure façon de comprendre un endroit. Que ce soit les pistes cyclables le long du canal à Ottawa ou naviguer Paris à vélo, c\'est mon mode par défaut.',
          link: null,
          linkText: null,
          image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80',
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
                className="group relative h-72 rounded-xl overflow-hidden"
              >
                {/* Background image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient overlay — darker at bottom where text lives */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="mt-auto">
                    <h4 className="font-semibold text-white text-base mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-200 leading-relaxed line-clamp-3">
                      {item.body}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        className="inline-block mt-2 text-xs text-purple-300 hover:text-purple-200 font-medium transition-colors"
                      >
                        {item.linkText}
                      </a>
                    )}
                  </div>
                </div>
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
