import { NextRequest, NextResponse } from 'next/server'

const LOCALE_SEGMENTS = new Set(['en', 'fr'])
const PUBLIC_FILE = /\.(.*)$/

function resolveLocale(acceptLanguage: string | null): 'en' | 'fr' {
  if (!acceptLanguage) return 'en'
  const preferred = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean)

  return preferred.some((lang) => lang.startsWith('fr')) ? 'fr' : 'en'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]

  if (lastSegment && LOCALE_SEGMENTS.has(lastSegment)) {
    return NextResponse.next()
  }

  const locale = resolveLocale(request.headers.get('accept-language'))
  const redirectUrl = request.nextUrl.clone()

  if (segments.length === 0) {
    redirectUrl.pathname = `/${locale}`
  } else {
    redirectUrl.pathname = `${pathname.replace(/\/$/, '')}/${locale}`
  }

  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
}
