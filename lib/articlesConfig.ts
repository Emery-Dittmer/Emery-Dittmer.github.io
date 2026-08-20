// Canonical registry of article pages, so slugs/titles/paths aren't
// duplicated across the places that need to reference articles (project
// detail pages, 404 "did you mean" suggestions, etc).

export type ArticleEntry = {
  slug: string
  title: { en: string; fr: string }
  // Locales this article actually has a page for.
  locales: ('en' | 'fr')[]
}

export const articlesConfig: ArticleEntry[] = [
  {
    slug: 'sncf-analytics',
    title: { en: 'Are French Trains Actually On Time?', fr: 'Are French Trains Actually On Time?' },
    locales: ['en'],
  },
  {
    slug: 'sncf-architecture',
    title: { en: 'Building a Real-Time French Train Tracker on AWS', fr: 'Building a Real-Time French Train Tracker on AWS' },
    locales: ['en'],
  },
  {
    slug: 'sncf-cost',
    title: { en: 'How I Cut This AWS Pipeline from $56 to $16/Month', fr: 'How I Cut This AWS Pipeline from $56 to $16/Month' },
    locales: ['en'],
  },
  {
    slug: 'estimation-methods',
    title: { en: 'Agile Estimation Methods', fr: 'Méthodes d’estimation agile' },
    locales: ['en', 'fr'],
  },
  {
    slug: 'ai-beyond-copilot',
    title: { en: 'Beyond the Copilot', fr: 'Beyond the Copilot' },
    locales: ['en'],
  },
]

const articleBySlug = Object.fromEntries(articlesConfig.map((a) => [a.slug, a]))

export function getArticlePath(slug: string, locale: 'en' | 'fr'): string {
  const article = articleBySlug[slug]
  const availableLocale = article?.locales.includes(locale) ? locale : 'en'
  return `/Articles/${availableLocale}/${slug}`
}

export function getArticle(slug: string): ArticleEntry | undefined {
  return articleBySlug[slug]
}
