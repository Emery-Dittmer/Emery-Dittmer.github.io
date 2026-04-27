'use client'

import { useState } from 'react'
import { Skill, proficiencyMeta } from '@/lib/skillsConfig'

export default function SkillChip({ skill, color }: { skill: Skill; color: string }) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const tag = proficiencyMeta[skill.proficiency]

  const handleClick = () => {
    const el = document.getElementById(skill.id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative w-full">
      {/* Skill description tooltip — appears above chip when hovering ⓘ */}
      {tooltipVisible && (
        <div className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-2 shadow-xl pointer-events-none">
          <p className="text-[10px] font-semibold text-gray-200 mb-0.5">{skill.name}</p>
          <p className="text-[10px] text-gray-400 leading-snug">{skill.description}</p>
        </div>
      )}

      <button
        onClick={handleClick}
        className="relative w-full text-left text-xs font-medium px-2.5 pt-1.5 pb-5 rounded-md border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-black"
        style={{
          borderColor: `${tag.color}70`,
          backgroundColor: `${tag.color}18`,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.backgroundColor = `${tag.color}30`
          el.style.borderColor = `${tag.color}aa`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.backgroundColor = `${tag.color}18`
          el.style.borderColor = `${tag.color}70`
        }}
      >
        {/* Skill name */}
        <span className="text-gray-100 leading-snug pr-5">{skill.name}</span>

        {/* ⓘ icon — top-right, shows skill description on hover */}
        <span
          className="absolute top-1.5 right-1.5"
          onMouseEnter={e => { e.stopPropagation(); setTooltipVisible(true) }}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <svg
            className="w-3 h-3 cursor-help shrink-0"
            style={{ color: `${tag.color}bb` }}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 16v-4" />
            <circle cx="12" cy="8" r="0.5" fill="currentColor" strokeWidth={0} />
          </svg>
        </span>

        {/* Proficiency tag — bottom-right, no tooltip */}
        <span
          className="absolute bottom-1.5 right-1.5 text-[9px] font-semibold uppercase tracking-wide leading-none"
          style={{ color: tag.color }}
        >
          {tag.label}
        </span>
      </button>
    </div>
  )
}
