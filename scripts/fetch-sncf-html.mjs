// Pulls the latest generated map.html and train-performance.html from the
// private sncf_collector GitHub repo. Run via the `prebuild` npm script for
// local builds, and as an explicit workflow step in CI (since the deploy
// workflow invokes `next build` directly, bypassing npm's prebuild hook).
// Requires SNCF_COLLECTOR_TOKEN env var (a GitHub PAT with read access to
// Emery-Dittmer/sncf_collector); silently keeps the committed files if missing.

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = 'Emery-Dittmer/sncf_collector'
const REF = 'main'

const FILES = [
  { repoPath: 'map.html', outPath: join(__dirname, '..', 'public', 'sncf-map', 'map.html') },
  { repoPath: 'train-performance.html', outPath: join(__dirname, '..', 'public', 'train-performance.html') },
]

const token = process.env.SNCF_COLLECTOR_TOKEN
if (!token) {
  console.log('[sncf-html] No SNCF_COLLECTOR_TOKEN — keeping committed HTML as-is.')
  process.exit(0)
}

for (const { repoPath, outPath } of FILES) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${repoPath}?ref=${REF}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.raw+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    )
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    let html = await res.text()

    // sncf_collector's map.html carries its own hardcoded Mapbox key. Strip it
    // back to the placeholder so the workflow's "Inject Mapbox token" step
    // (sed replacing MAPBOX_TOKEN_PLACEHOLDER) keeps using this repo's own
    // MAPBOX_TOKEN secret instead of shipping the collector's key.
    if (repoPath === 'map.html') {
      html = html.replace(/MAPBOX_KEY = "[^"]*"/, 'MAPBOX_KEY = "MAPBOX_TOKEN_PLACEHOLDER"')
    }

    writeFileSync(outPath, html)
    console.log(`[sncf-html] Synced ${repoPath} -> ${outPath}`)
  } catch (err) {
    console.error(`[sncf-html] Failed to fetch ${repoPath}, keeping committed version:`, err.message)
  }
}
