'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { projectsConfig } from '@/lib/projectsConfig'
import { Locale } from '@/lib/i18n'

const FEATURED_IDS = [
  'transit-catchment',
  'stadium-visualization-product',
  'fx-rates',
]
const AUTO_ADVANCE_MS = 5500

export default function ProjectCarousel({ locale = 'en' }: { locale?: Locale }) {
  const featured = FEATURED_IDS
    .map((id) => projectsConfig.find((p) => p.id === id))
    .filter(Boolean) as typeof projectsConfig

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((i) => (i + 1) % featured.length), [featured.length])
  const prev = useCallback(() => setCurrent((i) => (i - 1 + featured.length) % featured.length), [featured.length])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [paused, next])

  const t = {
    heading:      locale === 'fr' ? 'Projets récents' : 'Recent Highlights',
    subheading:   locale === 'fr' ? 'Quelques travaux récents mis en avant' : 'A few of the most recent projects',
    viewAll:      locale === 'fr' ? 'Voir tous les projets →' : 'View all projects →',
    viewDetails:  locale === 'fr' ? 'Voir les détails' : 'View details',
    tryIt:        locale === 'fr' ? 'Essayer' : 'Try it live',
    academic:     locale === 'fr' ? 'Académique' : 'Academic',
    professional: locale === 'fr' ? 'Professionnel' : 'Professional',
    personal:     locale === 'fr' ? 'Personnel' : 'Personal',
  }

  const typeBadge = (type: string) => {
    if (type === 'academic') return 'border-blue-700/60 text-blue-400 bg-blue-900/20'
    if (type === 'personal') return 'border-purple-700/60 text-purple-400 bg-purple-900/20'
    return 'border-green-700/60 text-green-400 bg-green-900/20'
  }
  const typeLabel = (type: string) =>
    type === 'academic' ? t.academic : type === 'personal' ? t.personal : t.professional

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="h2 mb-4">{t.heading}</h2>
            <p className="text-lg text-gray-400">{t.subheading}</p>
          </div>

          {/* Carousel wrapper — extra horizontal padding reserves space for nav buttons */}
          <div
            className="relative px-8 sm:px-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Slide track */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {featured.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/40 border border-slate-800 rounded-2xl p-8">

                      {/* Image */}
                      <div className="relative flex items-center justify-center min-h-[220px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60 p-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
                        <Image
                          src={project.mediaSrc}
                          alt={project.title[locale]}
                          width={320}
                          height={200}
                          unoptimized
                          className="relative z-10 max-h-48 w-auto object-contain"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-4">
                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-purple-400">{project.year}</span>
                          <span className="text-gray-700">·</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${typeBadge(project.projectType)}`}>
                            {typeLabel(project.projectType)}
                          </span>
                          <span className="text-gray-700">·</span>
                          <span className="text-xs text-gray-500">{project.industry}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-white to-stone-500 bg-clip-text text-transparent leading-tight">
                          {project.title[locale]}
                        </h3>

                        {/* Company */}
                        <p className="text-xs text-gray-500">{project.company[locale]}</p>

                        {/* Description */}
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-4">
                          {project.description[locale]}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 pt-1">
                          <Link
                            href={`/Projects/${locale}/${project.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
                          >
                            {t.viewDetails}
                            <ArrowRight size={14} />
                          </Link>
                          {project.linkUrl && (
                            <a
                              href={project.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-purple-500 text-gray-300 hover:text-white text-sm font-medium transition-colors"
                            >
                              {t.tryIt}
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev button */}
            <button
              onClick={prev}
              aria-label="Previous project"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-slate-800 border border-slate-700 hover:border-purple-500 hover:bg-slate-700 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-lg"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Next button */}
            <button
              onClick={next}
              aria-label="Next project"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-slate-800 border border-slate-700 hover:border-purple-500 hover:bg-slate-700 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow-lg"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots + View All */}
          <div className="mt-8 flex items-center justify-between px-8 sm:px-12">
            <div className="flex items-center gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-purple-500' : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
            <Link
              href={`/Projects/${locale}`}
              className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              {t.viewAll}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
