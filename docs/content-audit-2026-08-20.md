# Site-wide content audit — 2026-08-20

Full crawl of every page on the live site, checking rendered content
(not just HTTP status) for empty/placeholder/broken pages. Prompted by
a report that `/Projects/en/sncf-gtfs-collector` looked like a 404.

## Method

1. Enumerated every route from the static export (`out/`): 68 content
   pages across `/en`, `/fr`, `/Projects`, `/Articles`, and the other
   top-level sections.
2. Fetched each live URL and stripped scripts/styles/tags to get a
   rough visible-text length, sorted thinnest-first to surface
   candidates for "empty or near-empty page."
3. For every page flagged as unusually thin, read the actual HTML
   (not just the length) to confirm whether it's really broken or just
   a legitimately light page (e.g. a tool/widget page with little
   prose).

## Findings

### 1. Critical: all 36 project detail pages were soft-404s — [EME-141](https://linear.app/emerypersonalprojects/issue/EME-141)

Every `/Projects/{en,fr}/<slug>` page (18 projects × 2 locales)
returned **HTTP 200** while actually rendering the site's 404
"Errorium" fallback markup — title `Page Not Found — Emery Dittmer`,
`id="__next_error__"` on `<html>`, `NEXT_HTTP_ERROR_FALLBACK;404` in
the hydration payload. Confirmed live on production before the fix.

**Root cause:** `app/Projects/{en,fr}/[slug]/page.tsx` read
`params.slug` synchronously. In the Next.js version pinned here
(16.3.0), route `params` in a Server Component is a `Promise` and
must be awaited — reading `.slug` off the unresolved Promise silently
returns `undefined`, so the project lookup always failed and
`notFound()` fired unconditionally, for every project, every time.
`generateMetadata` had the same bug, so page `<title>`s and
descriptions were wrong for every project too (this also would have
broken link/social-card previews).

**Since:** commit `34e80f8`, 2026-04-30 — roughly 4 months live.

**Why it wasn't caught earlier:** the page returns 200, so no
status-code-based check (uptime monitor, the earlier link-crawl done
in this same session) would flag it — only actually reading the
rendered content surfaces it. That's the reason this broader audit
was worth doing on top of the link-only crawl.

**Fix:** both `[slug]/page.tsx` files updated to the async-params
pattern (`params: Promise<{ slug: string }>`, `await params`) per
`node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`.
Verified by rebuilding and grepping every generated project page for
the 404-fallback signature — zero remaining.

### 2. Four English articles have no French translation — [EME-142](https://linear.app/emerypersonalprojects/issue/EME-142)

`ai-beyond-copilot`, `sncf-analytics`, `sncf-architecture`, and
`sncf-cost` exist only under `/Articles/en`. Not a broken link — the
`/Articles/fr` index correctly only lists what exists, and the
language switcher (fixed earlier the same day, see below) no longer
links to the missing pages. Open question for Emery: translate, or
leave EN-only by design.

### 3. Two related bugs fixed earlier the same session (context)

Found while investigating the original `sncf-gtfs-collector` report,
before the deeper content audit above:

- **Trailing-slash 404s, site-wide.** `next.config.js` had no
  `trailingSlash` setting, so the static export emitted flat
  `<slug>.html` files with no directory-index fallback — any URL with
  a trailing slash appended 404'd, on every route. Fixed via
  `trailingSlash: true`.
- **Language switcher linked to nonexistent FR articles.** The
  EN/FR toggle in the header blindly swapped the locale segment in the
  URL. On the four untranslated articles (finding #2), clicking "FR"
  sent visitors to a real 404. Fixed with `hasTranslation()` /
  `getLanguageSwitchHref()` in `lib/i18n.ts` — falls back to the
  section index when no translation exists.

### Everything else checked clean

The remaining thin pages (`FXRates`, `SNCFMap`, `Visualizations`,
`TransitReach`, `CoolStuff`, etc.) were manually inspected and are
legitimately light on static text — they're interactive tool/widget
pages where the real content renders client-side, not prose pages.
No soft-404 signature, real headings and metadata present.

## Follow-up

- [EME-141](https://linear.app/emerypersonalprojects/issue/EME-141) — critical fix, included in this session's push.
- [EME-142](https://linear.app/emerypersonalprojects/issue/EME-142) — translate-or-close decision, no code change needed either way.
- Worth considering later: a lightweight recurring check that fetches
  each route and asserts the response body doesn't contain
  `NEXT_HTTP_ERROR_FALLBACK`, since HTTP status alone missed this for
  four months. Not filed as a ticket yet — flagging here in case it's
  wanted.
