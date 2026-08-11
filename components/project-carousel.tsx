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
              <a
                key={project.id}
                href={`/Projects/${locale}/${project.id}`}
                className="group relative block h-72 rounded-xl overflow-hidden"
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

                {/* Subtle scrim by default, darkens further on hover so text stays legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/85 group-hover:via-black/50 group-hover:to-black/20" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="mt-auto">
                    <h4 className="font-semibold text-white text-base mb-1 leading-snug">
                      {project.title[locale]}
                    </h4>
                    <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                      <p className="text-sm text-gray-200 leading-relaxed line-clamp-3">
                        {project.description[locale]}
                      </p>
                      <span className="inline-block mt-2 text-xs text-purple-300 group-hover:text-purple-200 font-medium transition-colors">
                        {t.viewProject}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
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
