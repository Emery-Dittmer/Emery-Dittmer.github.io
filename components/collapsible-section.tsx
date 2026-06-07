'use client'

import { useState } from 'react'

interface Props {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function CollapsibleSection({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
            {title}
          </span>
          <svg
            className={`w-5 h-5 text-purple-400 transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {open && (
        <div>{children}</div>
      )}
    </div>
  )
}
