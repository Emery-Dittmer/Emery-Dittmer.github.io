// Runs before `next build` to write public/linear-current.json from Linear API.
// Called automatically via the `prebuild` npm script.
// Requires LINEAR_API_KEY env var; silently writes empty data if missing.

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH = join(__dirname, '..', 'public', 'linear-current.json')
const EMPTY = { cycle: null, inProgress: [], recentlyDone: [] }

const key = process.env.LINEAR_API_KEY
if (!key || key === 'your_linear_api_key_here') {
  console.log('[linear] No API key — writing empty placeholder.')
  writeFileSync(OUT_PATH, JSON.stringify(EMPTY))
  process.exit(0)
}

const QUERY = `
  query CurrentWork {
    teams {
      nodes {
        activeCycle {
          id name number startsAt endsAt
          completedIssueCountHistory
          issueCountHistory
          issues(orderBy: updatedAt) {
            nodes {
              id title priority url
              state { type }
              completedAt
            }
          }
        }
      }
    }
  }
`

try {
  const res = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: key },
    body: JSON.stringify({ query: QUERY }),
  })
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)

  const activeCycle =
    json.data?.teams?.nodes?.find((t) => t.activeCycle)?.activeCycle ?? null

  if (!activeCycle) {
    writeFileSync(OUT_PATH, JSON.stringify(EMPTY))
    console.log('[linear] No active cycle found.')
    process.exit(0)
  }

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 14)

  const issues = activeCycle.issues.nodes
  const completedCount = activeCycle.completedIssueCountHistory.at(-1) ?? 0
  const totalCount = activeCycle.issueCountHistory.at(-1) ?? 0

  const result = {
    cycle: {
      name: activeCycle.name,
      number: activeCycle.number,
      startsAt: activeCycle.startsAt,
      endsAt: activeCycle.endsAt,
      completedCount,
      totalCount,
    },
    inProgress: issues
      .filter((i) => i.state.type === 'started')
      .slice(0, 4)
      .map((i) => ({ title: i.title, priority: i.priority, url: i.url })),
    recentlyDone: issues
      .filter(
        (i) =>
          i.state.type === 'completed' &&
          i.completedAt != null &&
          new Date(i.completedAt) > cutoff,
      )
      .slice(0, 4)
      .map((i) => ({ title: i.title, completedAt: i.completedAt, url: i.url })),
  }

  mkdirSync(join(__dirname, '..', 'public'), { recursive: true })
  writeFileSync(OUT_PATH, JSON.stringify(result))
  console.log(`[linear] Wrote ${OUT_PATH} — cycle: ${result.cycle.name}`)
} catch (err) {
  console.error('[linear] Fetch failed, writing empty fallback:', err.message)
  writeFileSync(OUT_PATH, JSON.stringify(EMPTY))
}
