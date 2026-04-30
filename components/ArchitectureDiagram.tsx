'use client'

import Image from 'next/image'
import { Database, Settings, Server, BarChart2, Cloud, Cpu, ChevronRight } from 'lucide-react'
import { ArchitectureNode, NodeType } from '@/lib/projectsConfig'
import { techLogos } from '@/lib/techLogos'

const nodeConfig: Record<NodeType, { bg: string; border: string; text: string; Icon: React.ElementType }> = {
  input:   { bg: 'bg-blue-900/40',   border: 'border-blue-500/60',   text: 'text-blue-300',   Icon: Database },
  process: { bg: 'bg-purple-900/40', border: 'border-purple-500/60', text: 'text-purple-300', Icon: Settings },
  storage: { bg: 'bg-yellow-900/40', border: 'border-yellow-500/60', text: 'text-yellow-300', Icon: Server },
  output:  { bg: 'bg-green-900/40',  border: 'border-green-500/60',  text: 'text-green-300',  Icon: BarChart2 },
  model:   { bg: 'bg-indigo-900/40', border: 'border-indigo-500/60', text: 'text-indigo-300', Icon: Cpu },
  service: { bg: 'bg-gray-800/60',   border: 'border-gray-500/60',   text: 'text-gray-300',   Icon: Cloud },
}

function DiagramNode({ node }: { node: ArchitectureNode }) {
  const { bg, border, text, Icon } = nodeConfig[node.type]
  const logo = node.technology ? techLogos[node.technology] : undefined

  return (
    <div className={`flex flex-col items-center gap-1.5 rounded-xl border ${bg} ${border} px-3 py-3 w-36 shrink-0 text-center`}>
      {/* Logo or fallback icon */}
      <div className="h-8 flex items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt={node.technology ?? ''}
            width={32}
            height={32}
            className="object-contain max-h-8"
            unoptimized
          />
        ) : (
          <Icon size={20} className={text} />
        )}
      </div>

      {/* Node label */}
      <span className={`text-xs font-semibold leading-tight ${text}`}>{node.label}</span>

      {/* Description */}
      {node.description && (
        <span className="text-xs text-gray-500 leading-tight">{node.description}</span>
      )}
    </div>
  )
}

export default function ArchitectureDiagram({ nodes }: { nodes: ArchitectureNode[] }) {
  if (!nodes || nodes.length === 0) return null

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-start justify-start gap-2 min-w-max py-4 px-2">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-2">
            <DiagramNode node={node} />
            {i < nodes.length - 1 && (
              <ChevronRight size={18} className="text-gray-600 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Node-type legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 px-2">
        {(Object.entries(nodeConfig) as [NodeType, typeof nodeConfig[NodeType]][]).map(([type, cfg]) => {
          const Icon = cfg.Icon
          return (
            <div key={type} className="flex items-center gap-1">
              <Icon size={11} className={cfg.text} />
              <span className="text-xs text-gray-500 capitalize">{type}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
