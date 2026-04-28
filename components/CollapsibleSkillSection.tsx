'use client'

import { useState, useEffect, useRef } from 'react'
import ContributionGraph from './ContributionGraph'
import { SkillContribution } from '@/lib/skillsConfig'

interface Props {
  id: string
  skillName: string
  laneTitle: string
  laneColor: string
  contributions: SkillContribution[]
}

export default function CollapsibleSkillSection({
  id, skillName, laneTitle, laneColor, contributions,
}: Props) {
  const [open, setOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail
      if (detail?.id !== id) return
      setOpen(true)
      // Wait a frame for the section to render before scrolling
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
    window.addEventListener('navigate-to-skill', handler)
    return () => window.removeEventListener('navigate-to-skill', handler)
  }, [id])

  return (
    <section
      id={id}
      ref={sectionRef}
      className="border border-gray-800 rounded-xl overflow-hidden"
      style={{ scrollMarginTop: '100px' }}
    >
      {/* Header — always visible, click to toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-900/40 transition-colors duration-150"
      >
        <div className="flex flex-col gap-1.5">
          {/* Lane badge */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: laneColor }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: laneColor }}>
              {laneTitle}
            </span>
          </div>
          {/* Skill name */}
          <h4 className="text-lg font-bold text-white leading-snug">{skillName}</h4>
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible body */}
      {open && (
        <div className="px-6 pb-6 border-t border-gray-800">
          <div className="pt-5">
            <ContributionGraph contributions={contributions} />
          </div>
          <div className="mt-6 border border-dashed border-gray-700 rounded-lg px-5 py-4">
            <p className="text-gray-500 text-sm italic">Detailed content coming soon.</p>
          </div>
        </div>
      )}
    </section>
  )
}
