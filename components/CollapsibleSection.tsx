'use client'

import { useState, useEffect } from 'react'

interface Props {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  listenEvent?: string
}

export default function CollapsibleSection({ title, children, defaultOpen = false, listenEvent }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    if (!listenEvent) return
    const handler = () => setOpen(true)
    window.addEventListener(listenEvent, handler)
    return () => window.removeEventListener(listenEvent, handler)
  }, [listenEvent])

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-900/40 transition-colors duration-150"
      >
        <h3 className="h3 text-gray-300">{title}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-800 px-6 py-6 space-y-3">
          {children}
        </div>
      )}
    </div>
  )
}
