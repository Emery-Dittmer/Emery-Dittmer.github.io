'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPathname, getPathWithLocale } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const pathname = usePathname() ?? '/'
  const locale = getLocaleFromPathname(pathname)

  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
      <Link
        href={getPathWithLocale(pathname, 'en')}
        className={locale === 'en' ? 'text-purple-200' : 'text-gray-400 hover:text-purple-200'}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </Link>
      <span className="text-gray-600">/</span>
      <Link
        href={getPathWithLocale(pathname, 'fr')}
        className={locale === 'fr' ? 'text-purple-200' : 'text-gray-400 hover:text-purple-200'}
        aria-current={locale === 'fr' ? 'true' : undefined}
      >
        FR
      </Link>
    </div>
  )
}
