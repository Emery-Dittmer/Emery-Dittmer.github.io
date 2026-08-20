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

// Article slugs that exist under app/Articles/fr — kept in sync by hand
// since translation coverage is intentionally partial. Used so the header's
// language switcher doesn't link to a French article page that 404s.
const FR_ARTICLE_SLUGS = new Set(['estimation-methods']);

/**
 * Whether `pathname` (as currently viewed, in whatever locale) has a real
 * page at the same route in `targetLocale`. Everything outside
 * /Articles/<locale>/<slug> is assumed fully translated (true for the rest
 * of the site today); article translations are partial, so those are
 * checked against FR_ARTICLE_SLUGS.
 */
export function hasTranslation(pathname: string, targetLocale: Locale): boolean {
  const segments = pathname.split('/').filter(Boolean);
  const localeIndex = segments.findIndex((s) => LOCALES.includes(s as Locale));
  const isArticle = segments[0] === 'Articles' && localeIndex !== -1;
  const slug = isArticle ? segments[localeIndex + 1] : undefined;

  if (!isArticle || !slug) return true; // non-article pages are all translated
  if (targetLocale === 'en') return true; // every article has an EN version
  return FR_ARTICLE_SLUGS.has(slug);
}

/**
 * Language-switcher target: the same page in `targetLocale` if it exists,
 * otherwise that section's index — so switching language on an untranslated
 * article lands on /Articles/<locale> instead of a 404.
 */
export function getLanguageSwitchHref(pathname: string, targetLocale: Locale): string {
  if (hasTranslation(pathname, targetLocale)) {
    return getPathWithLocale(pathname, targetLocale);
  }
  const section = pathname.split('/').filter(Boolean)[0];
  return `/${section}/${targetLocale}`;
}
