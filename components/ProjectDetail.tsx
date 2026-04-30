'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Tag, Award } from 'lucide-react'
import { Project } from '@/lib/projectsConfig'
import { skillsConfig } from '@/lib/skillsConfig'
import ArchitectureDiagram from '@/components/ArchitectureDiagram'
import { Locale } from '@/lib/i18n'

// Flatten all skills from the skills config into a lookup map id → skill
const allSkills = skillsConfig.lanes.flatMap((lane) => lane.skills)
const skillById = Object.fromEntries(allSkills.map((s) => [s.id, s]))

const proficiencyLabel: Record<number, string> = {
  1: 'Novice',
  2: 'Developing',
  3: 'Competent',
  4: 'Proficient',
  5: 'Expert',
}

const proficiencyColor: Record<number, string> = {
  1: 'text-gray-400 border-gray-600',
  2: 'text-orange-400 border-orange-600',
  3: 'text-yellow-400 border-yellow-600',
  4: 'text-green-400 border-green-600',
  5: 'text-purple-400 border-purple-500',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-gray-800 py-8">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      {children}
    </section>
  )
}

export default function ProjectDetail({
  project,
  locale,
}: {
  project: Project
  locale: Locale
}) {
  const t = {
    backToProjects: locale === 'fr' ? '← Retour aux projets' : '← Back to Projects',
    description:    locale === 'fr' ? 'Description' : 'Description',
    purpose:        locale === 'fr' ? 'Objectif' : 'Purpose',
    howToUse:       locale === 'fr' ? 'Comment utiliser' : 'How to Use',
    architecture:   locale === 'fr' ? 'Architecture' : 'Architecture',
    skills:         locale === 'fr' ? 'Compétences utilisées' : 'Skills Used',
    certifications: locale === 'fr' ? 'Certifications' : 'Certifications',
    viewProject:    locale === 'fr' ? 'Voir le projet' : 'View Project',
    noSkills:       locale === 'fr' ? 'Aucune compétence spécifiée.' : 'No skills specified.',
    noCerts:        locale === 'fr' ? 'Aucune certification spécifiée.' : 'No certifications specified.',
  }

  const resolvedSkills = project.skills
    .map((id) => skillById[id])
    .filter(Boolean)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

      {/* Back link */}
      <Link
        href={`/Projects/${locale}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400 transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        {t.backToProjects}
      </Link>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-4">
        <div className="shrink-0 bg-gray-800/60 rounded-2xl p-4 flex items-center justify-center w-28 h-28">
          <Image
            src={project.mediaSrc}
            alt={project.title[locale]}
            width={80}
            height={80}
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-purple-400 mb-1">{project.company[locale]}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            {project.title[locale]}
          </h1>
        </div>
      </div>

      {/* Description */}
      <Section title={t.description}>
        <p className="text-gray-300 leading-relaxed">{project.description[locale]}</p>
      </Section>

      {/* Purpose */}
      <Section title={t.purpose}>
        <p className="text-gray-300 leading-relaxed">{project.purpose[locale]}</p>
      </Section>

      {/* How to Use */}
      <Section title={t.howToUse}>
        <p className="text-gray-300 leading-relaxed">{project.howToUse[locale]}</p>
      </Section>

      {/* Architecture */}
      <Section title={t.architecture}>
        <p className="text-gray-300 leading-relaxed mb-6">{project.architecture.overview[locale]}</p>
        {project.architecture.diagramSrc ? (
          <div className="rounded-xl overflow-hidden border border-gray-700">
            <Image
              src={project.architecture.diagramSrc}
              alt="Architecture diagram"
              width={900}
              height={400}
              className="w-full object-contain"
              unoptimized
            />
          </div>
        ) : (
          <ArchitectureDiagram nodes={project.architecture.nodes} />
        )}
      </Section>

      {/* Skills */}
      <Section title={t.skills}>
        {resolvedSkills.length === 0 ? (
          <p className="text-sm text-gray-500">{t.noSkills}</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {resolvedSkills.map((skill) => (
              <div
                key={skill.id}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${proficiencyColor[skill.proficiency]}`}
              >
                <Tag size={12} />
                <span className="text-xs font-medium">{skill.name}</span>
                <span className={`text-xs opacity-70`}>
                  · {proficiencyLabel[skill.proficiency]}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Certifications */}
      <Section title={t.certifications}>
        {project.certifications.length === 0 ? (
          <p className="text-sm text-gray-500">{t.noCerts}</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {project.certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 rounded-full border border-purple-600/50 bg-purple-900/20 px-3 py-1.5"
              >
                <Award size={12} className="text-purple-400" />
                <span className="text-xs font-medium text-purple-300">{cert}</span>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* External link */}
      {project.linkUrl && (
        <div className="border-t border-gray-800 pt-8">
          <a
            href={project.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors px-5 py-2.5 text-sm font-semibold text-white"
          >
            <ExternalLink size={14} />
            {project.linkText?.[locale] || t.viewProject}
          </a>
        </div>
      )}
    </div>
  )
}
