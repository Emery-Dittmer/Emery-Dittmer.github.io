'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { projectsConfig, Project } from '@/lib/projectsConfig'
import { skillsConfig } from '@/lib/skillsConfig'
import { Locale } from '@/lib/i18n'

const laneById = Object.fromEntries(skillsConfig.lanes.map((l) => [l.id, l]))

// Group projects by their primary (first-listed) lane — the existing
// skill-domain tags every project already has, used as a stand-in for
// "theme" (SNCF, network analysis, etc. don't share a topic across enough
// projects to form their own groups, but the skill domains do).
function groupByTheme(): { laneId: string; title: string; color: string; projects: Project[] }[] {
  const groups = new Map<string, Project[]>()
  for (const project of projectsConfig) {
    const primaryLane = project.laneIds[0]
    if (!primaryLane) continue
    if (!groups.has(primaryLane)) groups.set(primaryLane, [])
    groups.get(primaryLane)!.push(project)
  }

  // Preserve skillsConfig's own lane order rather than Map insertion order.
  return skillsConfig.lanes
    .filter((lane) => groups.has(lane.id))
    .map((lane) => ({
      laneId: lane.id,
      title: lane.title,
      color: lane.color,
      projects: groups.get(lane.id)!,
    }))
}

function ThemeRow({
  title,
  color,
  projects,
  locale,
}: {
  title: string
  color: string
  projects: Project[]
  locale: Locale
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollBy(dx: number) {
    scrollerRef.current?.scrollBy({ left: dx, behavior: 'smooth' })
  }

  return (
    <div className="mb-10 last:mb-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">{title}</h3>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => scrollBy(-320)}
            aria-label="Scroll left"
            className="p-1.5 rounded-full border border-gray-700 text-gray-400 hover:text-purple-300 hover:border-purple-700/50 transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scrollBy(320)}
            aria-label="Scroll right"
            className="p-1.5 rounded-full border border-gray-700 text-gray-400 hover:text-purple-300 hover:border-purple-700/50 transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/Projects/${locale}/${project.id}`}
            className="group relative shrink-0 w-56 sm:w-64 h-40 sm:h-44 rounded-xl overflow-hidden snap-start"
          >
            <Image
              src={project.mediaSrc}
              alt={project.title[locale]}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 224px, 256px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-3 flex items-end">
              <h4 className="text-white text-sm font-semibold leading-snug">
                {project.title[locale]}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function ProjectsByTheme({ locale = 'en' }: { locale?: Locale }) {
  const t = {
    heading: locale === 'fr' ? 'Projets par thème' : 'Projects by Theme',
  }

  const themes = groupByTheme()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
      <h2 className="h2 text-center mb-8">{t.heading}</h2>
      {themes.map((theme) => (
        <ThemeRow
          key={theme.laneId}
          title={theme.title}
          color={theme.color}
          projects={theme.projects}
          locale={locale}
        />
      ))}
    </div>
  )
}
