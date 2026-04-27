import { skillsConfig, SkillContribution } from '@/lib/skillsConfig'

const laneMap = Object.fromEntries(skillsConfig.lanes.map(l => [l.id, l]))

export default function ContributionGraph({
  contributions,
}: {
  contributions: SkillContribution[]
}) {
  const sorted = [...contributions].sort((a, b) => b.percentage - a.percentage)

  return (
    <div className="mt-4">
      <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
        Role Contribution
      </p>
      <div className="space-y-2">
        {sorted.map(({ laneId, percentage }) => {
          const lane = laneMap[laneId]
          if (!lane) return null
          return (
            <div key={laneId} className="flex items-center gap-3">
              <div className="w-44 shrink-0 text-xs text-gray-400 text-right leading-tight">
                {lane.title}
              </div>
              <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${percentage}%`, backgroundColor: lane.color }}
                />
              </div>
              <div className="w-8 text-xs text-gray-400 text-right tabular-nums">
                {percentage}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
