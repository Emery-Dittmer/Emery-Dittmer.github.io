'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

  const [index, setIndex] = useState(0)

  const t = {
    heading:     locale === 'fr' ? 'Projets récents' : 'Recent Highlights',
    subheading:  locale === 'fr' ? 'Quelques travaux récents mis en avant' : 'A few of the most recent projects',
    viewProject: locale === 'fr' ? 'Voir le projet →' : 'View project →',
    viewAll:     locale === 'fr' ? 'Voir tous les projets →' : 'View all projects →',
    prev:        locale === 'fr' ? 'Précédent' : 'Previous',
    next:        locale === 'fr' ? 'Suivant' : 'Next',
  }

  function goTo(i: number) {
    setIndex((i + featured.length) % featured.length)
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

          {/* One-at-a-time slider */}
          <div className="relative max-w-2xl mx-auto" data-aos="fade-up">
            <div className="relative h-72 rounded-xl overflow-hidden">
              {featured.map((project, i) => (
                <a
                  key={project.id}
                  href={`/Projects/${locale}/${project.id}`}
                  className={`group absolute inset-0 block transition-opacity duration-500 ${
                    i === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={i !== index}
                  tabIndex={i === index ? 0 : -1}
                >
                  {/* Background image */}
                  <Image
                    src={project.mediaSrc}
                    alt={project.title[locale]}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 672px) 100vw, 672px"
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

            {/* Prev / next controls */}
            <button
              onClick={() => goTo(index - 1)}
              aria-label={t.prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label={t.next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {featured.map((project, i) => (
                <button
                  key={project.id}
                  onClick={() => goTo(i)}
                  aria-label={project.title[locale]}
                  aria-current={i === index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index ? 'bg-purple-400' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
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
