'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getLocaleFromPathname } from '@/lib/i18n'
import { findSuggestions, resolvePath, Suggestion } from '@/lib/notFoundSuggestions'

const COPY = {
  en: { heading: 'Looking for one of these?' },
  fr: { heading: 'Cherchiez-vous plutôt ceci ?' },
}

export default function NotFoundSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null)
  const [locale, setLocale] = useState<'en' | 'fr'>('en')

  useEffect(() => {
    const pathname = window.location.pathname
    const loc = getLocaleFromPathname(pathname)
    setLocale(loc)
    setSuggestions(findSuggestions(pathname, loc))
  }, [])

  if (!suggestions || suggestions.length === 0) return null

  const t = COPY[locale]

  return (
    <div className="mb-10 w-full max-w-md">
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">{t.heading}</p>
      <div className="flex flex-col gap-2">
        {suggestions.map((s) => (
          <Link
            key={s.path}
            href={resolvePath(s, locale)}
            className="rounded-lg border border-gray-800 bg-gray-900/60 px-4 py-2.5 text-sm text-gray-300 hover:text-purple-300 hover:border-purple-700/50 transition-colors text-left"
          >
            {s.label[locale]}
          </Link>
        ))}
      </div>
    </div>
  )
}
