// Known site destinations for the 404 page's "did you mean" suggestions.
// This is a static export (see next.config.js `output: 'export'`), so
// not-found.tsx has no server-side knowledge of the requested path — the
// match runs client-side against `window.location.pathname` instead.
import { Locale } from '@/lib/i18n'
import { projectsConfig } from '@/lib/projectsConfig'

export type Suggestion = {
  path: string
  label: { en: string; fr: string }
  // Extra words to match against besides the path segments and label —
  // catches renamed/aliased things people might still link to or type.
  keywords?: string[]
}

// Top-level site sections. Locale is substituted into `path` at match time.
const SECTIONS: Suggestion[] = [
  { path: '/{locale}', label: { en: 'Home', fr: 'Accueil' } },
  { path: '/Projects/{locale}', label: { en: 'Projects', fr: 'Projets' } },
  { path: '/Articles/{locale}', label: { en: 'Articles', fr: 'Articles' } },
  { path: '/Skills/{locale}', label: { en: 'Skills', fr: 'Compétences' } },
  { path: '/Journey/{locale}', label: { en: 'Journey', fr: 'Parcours' } },
  { path: '/Certifications/{locale}', label: { en: 'Certifications', fr: 'Certifications' } },
  { path: '/Visualizations/{locale}', label: { en: 'Visualizations', fr: 'Visualisations' } },
  { path: '/CoolStuff/{locale}', label: { en: 'Cool Stuff', fr: 'Trucs cool' } },
  { path: '/PMDashboard/{locale}', label: { en: 'PM Dashboard', fr: 'Tableau de bord PM' } },
  { path: '/FXRates/{locale}', label: { en: 'FX Rates', fr: 'Taux de change' } },
  { path: '/TransitReach/{locale}', label: { en: 'Transit Reach', fr: 'Transit Reach' } },
  {
    path: '/SNCFMap/{locale}',
    label: { en: 'SNCF Live Train Map', fr: 'Carte ferroviaire SNCF en direct' },
    keywords: ['sncf', 'train', 'map', 'carte', 'gtfs', 'live', 'rail'],
  },
]

const ARTICLES: Suggestion[] = [
  {
    path: '/Articles/{locale}/sncf-analytics',
    label: { en: 'Are French Trains Actually On Time?', fr: 'Are French Trains Actually On Time?' },
    keywords: ['sncf', 'train', 'delay', 'analytics', 'gtfs'],
  },
  {
    path: '/Articles/{locale}/sncf-architecture',
    label: { en: 'Building a Real-Time French Train Tracker on AWS', fr: 'Building a Real-Time French Train Tracker on AWS' },
    keywords: ['sncf', 'train', 'architecture', 'aws', 'gtfs', 'pipeline'],
  },
  {
    path: '/Articles/{locale}/sncf-cost',
    label: { en: 'How I Cut This AWS Pipeline from $56 to $16/Month', fr: 'How I Cut This AWS Pipeline from $56 to $16/Month' },
    keywords: ['sncf', 'aws', 'cost', 'pipeline'],
  },
  {
    path: '/Articles/{locale}/estimation-methods',
    label: { en: 'Agile Estimation Methods', fr: 'Agile Estimation Methods' },
    keywords: ['agile', 'estimation', 'scrum', 'sprint'],
  },
  {
    path: '/Articles/{locale}/ai-beyond-copilot',
    label: { en: 'Beyond the Copilot', fr: 'Beyond the Copilot' },
    keywords: ['ai', 'copilot', 'productivity'],
  },
]

// One entry per project, generated from projectsConfig so it can't drift
// out of sync with the actual project list/titles.
const PROJECTS: Suggestion[] = projectsConfig.map((p) => ({
  path: `/Projects/{locale}/${p.id}`,
  label: p.title,
}))

// Related-content links attached to specific projects — surfaced alongside
// the project match itself (e.g. sncf-gtfs-collector -> its live map).
const RELATED: Record<string, Suggestion[]> = {
  'sncf-gtfs-collector': [
    SECTIONS.find((s) => s.path === '/SNCFMap/{locale}')!,
    ...ARTICLES.filter((a) => a.path.includes('sncf-')),
  ],
}

const ALL_DESTINATIONS: Suggestion[] = [...SECTIONS, ...ARTICLES, ...PROJECTS]

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[_\-/]+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
}

function tokenize(s: string): string[] {
  return normalize(s).split(/\s+/).filter(Boolean)
}

function score(queryTokens: string[], dest: Suggestion, locale: Locale): number {
  const destTokens = new Set([
    ...tokenize(dest.path.replace('{locale}', '')),
    ...tokenize(dest.label[locale]),
    ...(dest.keywords ?? []).flatMap(tokenize),
  ])

  // Ignore short tokens on both sides — otherwise stopwords in titles (the
  // "a" in "Building a Real-Time...") substring-match into unrelated query
  // tokens (e.g. "unrelated" contains "a") and produce false positives.
  const MIN_LEN = 3
  let hits = 0
  for (const qt of queryTokens) {
    if (qt.length < MIN_LEN) continue
    for (const dt of destTokens) {
      if (dt.length < MIN_LEN) continue
      if (dt === qt || dt.includes(qt) || qt.includes(dt)) {
        hits += 1
        break
      }
    }
  }
  return hits
}

/**
 * Matches a broken pathname (e.g. from window.location.pathname) against
 * known destinations and returns the best guesses, best first. Includes
 * any `RELATED` links for a matched project (e.g. its live map/articles).
 */
export function findSuggestions(pathname: string, locale: Locale, max = 4): Suggestion[] {
  const queryTokens = tokenize(pathname)
  if (queryTokens.length === 0) return []

  const scored = ALL_DESTINATIONS
    .map((dest) => ({ dest, s: score(queryTokens, dest, locale) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)

  const results: Suggestion[] = []
  const seen = new Set<string>()

  for (const { dest } of scored) {
    if (results.length >= max) break
    if (seen.has(dest.path)) continue
    results.push(dest)
    seen.add(dest.path)

    // Pull in related links for a matched project.
    const projectId = dest.path.split('/').pop()
    const related = projectId ? RELATED[projectId] : undefined
    for (const r of related ?? []) {
      if (results.length >= max) break
      if (seen.has(r.path)) continue
      results.push(r)
      seen.add(r.path)
    }
  }

  return results
}

export function resolvePath(dest: Suggestion, locale: Locale): string {
  return dest.path.replace('{locale}', locale)
}
