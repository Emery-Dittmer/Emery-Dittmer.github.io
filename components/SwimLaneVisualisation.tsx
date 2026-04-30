'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  skillsConfig,
  Lane,
  CustomState,
  defaultCustomState,
  CUSTOM_STATE_KEY,
  proficiencyMeta,
  Proficiency,
} from '@/lib/skillsConfig'
import SkillChip from './SkillChip'
import CustomisePanel from './CustomisePanel'

const proficiencyOrder: Record<Proficiency, number> = {
  5: 0, 4: 1, 3: 2, 2: 3, 1: 4,
}

export default function SwimLaneVisualisation() {
  const [customState, setCustomState] = useState<CustomState>(defaultCustomState)
  const [panelOpen, setPanelOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [sortMode, setSortMode] = useState<'sequential' | 'strong-weak' | 'weak-strong'>('sequential')

  // Load persisted state after mount to avoid SSR/hydration mismatch
  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(CUSTOM_STATE_KEY)
      if (saved) setCustomState(JSON.parse(saved))
    } catch {
      // Ignore malformed storage entries
    }
  }, [])

  // Persist on every change
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(CUSTOM_STATE_KEY, JSON.stringify(customState))
  }, [customState, mounted])

  const handleChange = (next: CustomState) => setCustomState(next)

  // Build the visible, ordered, filtered lane list
  const visibleLanes: Lane[] = customState.laneOrder
    .filter(id => !customState.hiddenLanes.includes(id))
    .map(id => skillsConfig.lanes.find(l => l.id === id))
    .filter((l): l is Lane => l !== undefined)
    .map(lane => {
      const filtered = lane.skills.filter(
        s => !(customState.hiddenSkills[lane.id] ?? []).includes(s.id)
      )
      const sorted =
        sortMode === 'strong-weak' ? [...filtered].sort((a, b) => proficiencyOrder[a.proficiency] - proficiencyOrder[b.proficiency]) :
        sortMode === 'weak-strong' ? [...filtered].sort((a, b) => proficiencyOrder[b.proficiency] - proficiencyOrder[a.proficiency]) :
        filtered
      return { ...lane, skills: sorted }
    })

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className="flex justify-end gap-2 mb-4">
        {/* Sort dropdown */}
        <div className="relative inline-flex items-center">
          <svg className="pointer-events-none absolute left-3 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9M3 12h5m10 4l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          <select
            value={sortMode}
            onChange={e => setSortMode(e.target.value as typeof sortMode)}
            className={`appearance-none pl-8 pr-8 py-2 text-sm font-medium rounded-lg border bg-gray-900 cursor-pointer transition-colors duration-150 focus:outline-none ${
              sortMode !== 'sequential'
                ? 'border-green-700 text-green-400'
                : 'border-gray-600 text-gray-300 hover:border-gray-400'
            }`}
          >
            <option value="sequential">Sequential</option>
            <option value="strong-weak">Strong → Weak</option>
            <option value="weak-strong">Weak → Strong</option>
          </select>
          <svg className="pointer-events-none absolute right-2.5 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <button
          onClick={() => setPanelOpen(true)}
          className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400 transition-colors duration-150"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Customise
        </button>
      </div>  {/* end toolbar */}

      {/* Swim lanes — single CSS grid so every row aligns across all columns */}
      <div className="overflow-x-auto pb-4">
        {visibleLanes.length === 0 ? (
          <p className="text-sm text-gray-500 italic py-8 px-4">
            All lanes are hidden. Open Customise to restore them.
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${visibleLanes.length}, 200px)`,
              columnGap: '12px',
              minWidth: 'max-content',
            }}
          >
            {/* Skill rows — each row auto-heights to the tallest cell across all columns */}
            {Array.from({ length: Math.max(...visibleLanes.map(l => l.skills.length)) }).flatMap(
              (_, skillIdx) =>
                visibleLanes.map(lane => {
                  const skill = lane.skills[skillIdx]
                  return (
                    <div
                      key={`${lane.id}-${skillIdx}`}
                      className={`flex flex-col items-center px-3 border-l border-r border-gray-800 ${
                        skillIdx === 0 ? 'pt-4 rounded-t-xl border-t' : 'pt-0'
                      }`}
                      style={{ backgroundColor: '#0d0d0d' }}
                    >
                      {/* Connector from previous row */}
                      {skillIdx > 0 && (
                        <div
                          className="w-px h-3"
                          style={{ backgroundColor: `${lane.color}55` }}
                        />
                      )}
                      {skill ? (
                        <div className="w-full">
                          <SkillChip skill={skill} color={lane.color} />
                        </div>
                      ) : (
                        <div className="w-full h-8" />
                      )}
                    </div>
                  )
                })
            )}

            {/* Role name row */}
            {visibleLanes.map(lane => (
              <div
                key={`${lane.id}-role`}
                className="flex flex-col items-center px-3 pb-4 border-t border-l border-r border-gray-800 rounded-b-xl"
                style={{
                  backgroundColor: '#0d0d0d',
                  borderTopColor: `${lane.color}35`,
                  borderBottom: `3px solid ${lane.color}`,
                }}
              >
                {/* Stub line down to role name */}
                <div
                  className="w-px h-4 mt-2"
                  style={{ backgroundColor: `${lane.color}55` }}
                />
                <span className="text-base font-bold text-white text-center mt-1 leading-tight select-none">
                  {lane.title}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Proficiency legend */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 px-1">
        {([1, 2, 3, 4, 5] as Proficiency[]).map(level => {
          const meta = proficiencyMeta[level]
          return (
            <div key={level} className="flex items-start gap-1.5 group relative">
              <span
                className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: meta.color }}
              />
              <span
                className="text-[11px] font-semibold leading-none"
                style={{ color: meta.color }}
              >
                {meta.label}
              </span>
              <span className="text-[11px] text-gray-500 leading-none">
                — {meta.description}
              </span>
            </div>
          )
        })}
      </div>

      {/* Customise panel */}
      <AnimatePresence>
        {panelOpen && (
          <CustomisePanel
            customState={customState}
            onChange={handleChange}
            onClose={() => setPanelOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
