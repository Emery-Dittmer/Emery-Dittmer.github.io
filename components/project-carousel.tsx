import Image from 'next/image'
import { projectsConfig } from '@/lib/projectsConfig'
import { Locale } from '@/lib/i18n'

const FEATURED_IDS = [
  'transit-catchment',
  'stadium-visualization-product',
  'sncf-gtfs-collector',
]

export default function ProjectCarousel({ locale = 'en' }: { locale?: Locale }) {
  const featured = FEATURED_IDS
    .map((id) => projectsConfig.find((p) => p.id === id))
    .filter(Boolean) as typeof projectsConfig

  const t = {
    heading:     locale === 'fr' ? 'Projets récents' : 'Recent Highlights',
    subheading:  locale === 'fr' ? 'Quelques travaux récents mis en avant' : 'A few of the most recent projects',
    viewProject: locale === 'fr' ? 'Voir le projet →' : 'View project →',
    viewAll:     locale === 'fr' ? 'Voir tous les projets →' : 'View all projects →',
  }

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">{t.heading}</h2>
            <p className="text-lg text-gray-400">{t.subheading}</p>
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
            {featured.map((project) => (
              <div
                key={project.id}
                className="group relative h-72 rounded-xl overflow-hidden"
              >
                {/* Background image */}
                <Image
                  src={project.mediaSrc}
                  alt={project.title[locale]}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient overlay — darker at bottom where text lives */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="mt-auto">
                    <h4 className="font-semibold text-white text-base mb-1 leading-snug">
                      {project.title[locale]}
                    </h4>
                    <p className="text-sm text-gray-200 leading-relaxed line-clamp-3">
                      {project.description[locale]}
                    </p>
                    <a
                      href={`/Projects/${locale}/${project.id}`}
                      className="inline-block mt-2 text-xs text-purple-300 hover:text-purple-200 font-medium transition-colors"
                    >
                      {t.viewProject}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={`/Projects/${locale}`}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
            >
              {t.viewAll}
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
