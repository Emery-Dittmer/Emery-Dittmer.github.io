'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { skillsConfig, CustomState, defaultCustomState, LaneId } from '@/lib/skillsConfig'

// ── Drag handle icon ──────────────────────────────────────────────────────────
function GripIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-500"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <circle cx="5" cy="4" r="1.2" />
      <circle cx="5" cy="8" r="1.2" />
      <circle cx="5" cy="12" r="1.2" />
      <circle cx="11" cy="4" r="1.2" />
      <circle cx="11" cy="8" r="1.2" />
      <circle cx="11" cy="12" r="1.2" />
    </svg>
  )
}

// ── Single sortable lane row ──────────────────────────────────────────────────
function SortableLaneRow({
  laneId,
  isHidden,
  isExpanded,
  hiddenSkills,
  onToggleLane,
  onToggleExpand,
  onToggleSkill,
}: {
  laneId: LaneId
  isHidden: boolean
  isExpanded: boolean
  hiddenSkills: string[]
  onToggleLane: () => void
  onToggleExpand: () => void
  onToggleSkill: (skillId: string) => void
}) {
  const lane = skillsConfig.lanes.find(l => l.id === laneId)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: laneId })

  if (!lane) return null

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg border border-gray-700 overflow-hidden"
    >
      {/* Lane header row */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="shrink-0 cursor-grab active:cursor-grabbing touch-none text-gray-500 hover:text-gray-300"
          aria-label="Drag to reorder"
          tabIndex={0}
        >
          <GripIcon />
        </button>

        {/* Colour dot */}
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: lane.color }}
        />

        {/* Title */}
        <span
          className={`flex-1 text-xs font-medium truncate ${
            isHidden ? 'text-gray-600 line-through' : 'text-gray-200'
          }`}
        >
          {lane.title}
        </span>

        {/* Expand skill filter */}
        <button
          onClick={onToggleExpand}
          className="text-gray-500 hover:text-gray-300 text-xs shrink-0"
          aria-label="Filter skills"
        >
          {isExpanded ? '▾' : '▸'}
        </button>

        {/* Show / Hide toggle */}
        <button
          onClick={onToggleLane}
          className={`text-xs px-2 py-0.5 rounded border shrink-0 transition-colors ${
            isHidden
              ? 'border-gray-600 text-gray-400 hover:text-gray-200 hover:border-gray-400'
              : 'border-green-800 text-green-400 hover:bg-green-900/30'
          }`}
        >
          {isHidden ? 'Show' : 'Hide'}
        </button>
      </div>

      {/* Skill filter list */}
      {isExpanded && (
        <div className="px-4 py-2 border-t border-gray-700 space-y-1.5 bg-gray-900/50">
          {lane.skills.map(skill => {
            const skillHidden = hiddenSkills.includes(skill.id)
            return (
              <label
                key={skill.id}
                className="flex items-start gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={!skillHidden}
                  onChange={() => onToggleSkill(skill.id)}
                  className="mt-0.5 shrink-0 accent-purple-500"
                />
                <span
                  className={`text-xs leading-snug ${
                    skillHidden
                      ? 'text-gray-600 line-through'
                      : 'text-gray-300 group-hover:text-gray-100'
                  }`}
                >
                  {skill.name}
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Main panel ────────────────────────────────────────────────────────────────
export default function CustomisePanel({
  customState,
  onChange,
  onClose,
}: {
  customState: CustomState
  onChange: (s: CustomState) => void
  onClose: () => void
}) {
  const [expandedLane, setExpandedLane] = useState<LaneId | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIdx = customState.laneOrder.indexOf(active.id as LaneId)
    const newIdx = customState.laneOrder.indexOf(over.id as LaneId)
    onChange({ ...customState, laneOrder: arrayMove(customState.laneOrder, oldIdx, newIdx) })
  }

  const toggleLane = (id: LaneId) => {
    const isHidden = customState.hiddenLanes.includes(id)
    onChange({
      ...customState,
      hiddenLanes: isHidden
        ? customState.hiddenLanes.filter(x => x !== id)
        : [...customState.hiddenLanes, id],
    })
  }

  const toggleSkill = (laneId: LaneId, skillId: string) => {
    const hidden = customState.hiddenSkills[laneId] ?? []
    onChange({
      ...customState,
      hiddenSkills: {
        ...customState.hiddenSkills,
        [laneId]: hidden.includes(skillId)
          ? hidden.filter(x => x !== skillId)
          : [...hidden, skillId],
      },
    })
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Slide-out panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-gray-700 z-50 flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 shrink-0">
          <h3 className="text-sm font-semibold text-white">Customise Swim Lanes</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChange(defaultCustomState)}
              className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded border border-gray-600 hover:border-gray-400 transition-colors"
            >
              Reset to default
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-gray-400 hover:text-white text-xl leading-none ml-1"
            >
              ×
            </button>
          </div>
        </div>

        {/* Sortable lane list */}
        <div className="flex-1 overflow-y-auto p-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={customState.laneOrder}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {customState.laneOrder.map(laneId => (
                  <SortableLaneRow
                    key={laneId}
                    laneId={laneId}
                    isHidden={customState.hiddenLanes.includes(laneId)}
                    isExpanded={expandedLane === laneId}
                    hiddenSkills={customState.hiddenSkills[laneId] ?? []}
                    onToggleLane={() => toggleLane(laneId)}
                    onToggleExpand={() =>
                      setExpandedLane(expandedLane === laneId ? null : laneId)
                    }
                    onToggleSkill={skillId => toggleSkill(laneId, skillId)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="px-4 py-3 border-t border-gray-700 shrink-0">
          <p className="text-xs text-gray-500">
            Drag ⠿ to reorder. Changes persist across page refreshes.
          </p>
        </div>
      </motion.div>
    </>
  )
}
