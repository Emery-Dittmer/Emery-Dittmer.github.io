export const LOCALES = ['en', 'fr'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const match = segments.find((segment) =>
    LOCALES.includes(segment as Locale)
  );
  return (match as Locale) ?? DEFAULT_LOCALE;
}

export function getPathWithLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const matchIndex = segments.findIndex((segment) =>
    LOCALES.includes(segment as Locale)
  );

  if (matchIndex === -1) {
    if (segments.length === 0) {
      return `/${locale}`;
    }

    return `/${[...segments, locale].join('/')}`;
  }

  segments[matchIndex] = locale;
  return `/${segments.join('/')}`;
}
