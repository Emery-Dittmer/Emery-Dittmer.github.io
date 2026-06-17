'use client'

import { useState } from 'react'

export default function MethodAccordion({
  emoji, title, accent = '#7c3aed', defaultOpen = false, children,
}: {
  emoji: string; title: string; accent?: string; defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl border border-gray-800 overflow-hidden transition-all">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-900/60 hover:bg-gray-900/90 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{emoji}</span>
          <span className="text-sm font-bold text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{open ? 'collapse' : 'expand'}</span>
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200"
            style={{ background: accent + '25', color: accent, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ↓
          </span>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '2000px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="px-5 py-5 bg-gray-950/50 space-y-4 border-t border-gray-800">
          {children}
        </div>
      </div>
    </div>
  )
}
