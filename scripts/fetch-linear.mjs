// Runs before `next build` (via the `prebuild` npm script, and as an explicit
// CI step) to refresh two generated data files from the Linear API:
//
//   public/linear-current.json    — active-cycle snapshot for the homepage widget
//   lib/linear-dashboard.json     — projects / epics / issues for the PM Dashboard
//
// Requires LINEAR_API_KEY. When it's missing or the request fails, the existing
// committed files are left untouched (the site keeps rendering the last good
// data) — except linear-current.json, which has always degraded to an empty
// placeholder and still does.
//
// The EmeryPersonalProjects team does not use Linear cycles, so there is no
// sprint data to pull; "epics" are parent issues (Linear has no native epic).

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CURRENT_PATH = join(__dirname, '..', 'public', 'linear-current.json')
const DASHBOARD_PATH = join(__dirname, '..', 'lib', 'linear-dashboard.json')
const EMPTY_CURRENT = { cycle: null, inProgress: [], recentlyDone: [] }

const TEAM_KEY = 'EmeryPersonalProjects'

const key = process.env.LINEAR_API_KEY
if (!key || key === 'your_linear_api_key_here') {
  console.log('[linear] No API key — writing empty current placeholder, keeping committed dashboard data.')
  writeFileSync(CURRENT_PATH, JSON.stringify(EMPTY_CURRENT))
  if (!existsSync(DASHBOARD_PATH)) {
    writeFileSync(DASHBOARD_PATH, JSON.stringify(emptyDashboard(), null, 2))
  }
  process.exit(0)
}

function emptyDashboard() {
  return { generatedAt: null, teamKey: TEAM_KEY, projects: [], epics: [], issues: [], meta: { source: 'placeholder' } }
}

async function linear(query, variables) {
  const res = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: key },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)
  return json.data
}

// ── Homepage widget: active cycle snapshot ─────────────────────────────────

const CURRENT_QUERY = `
  query CurrentWork {
    teams {
      nodes {
        activeCycle {
          id name number startsAt endsAt
          completedIssueCountHistory
          issueCountHistory
          issues(orderBy: updatedAt) {
            nodes { id title priority url state { type } completedAt }
          }
        }
      }
    }
  }
`

async function writeCurrent() {
  try {
    const data = await linear(CURRENT_QUERY)
    const activeCycle = data?.teams?.nodes?.find((t) => t.activeCycle)?.activeCycle ?? null
    if (!activeCycle) {
      writeFileSync(CURRENT_PATH, JSON.stringify(EMPTY_CURRENT))
      console.log('[linear] No active cycle found.')
      return
    }
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 14)
    const issues = activeCycle.issues.nodes
    const result = {
      cycle: {
        name: activeCycle.name,
        number: activeCycle.number,
        startsAt: activeCycle.startsAt,
        endsAt: activeCycle.endsAt,
        completedCount: activeCycle.completedIssueCountHistory.at(-1) ?? 0,
        totalCount: activeCycle.issueCountHistory.at(-1) ?? 0,
      },
      inProgress: issues
        .filter((i) => i.state.type === 'started')
        .slice(0, 4)
        .map((i) => ({ title: i.title, priority: i.priority, url: i.url })),
      recentlyDone: issues
        .filter((i) => i.state.type === 'completed' && i.completedAt && new Date(i.completedAt) > cutoff)
        .slice(0, 4)
        .map((i) => ({ title: i.title, completedAt: i.completedAt, url: i.url })),
    }
    writeFileSync(CURRENT_PATH, JSON.stringify(result))
    console.log(`[linear] Wrote ${CURRENT_PATH} — cycle: ${result.cycle.name}`)
  } catch (err) {
    console.error('[linear] Current fetch failed, writing empty fallback:', err.message)
    writeFileSync(CURRENT_PATH, JSON.stringify(EMPTY_CURRENT))
  }
}

// ── PM Dashboard: projects / epics / issues ────────────────────────────────

const DASHBOARD_QUERY = `
  query Dashboard($teamKey: String!, $after: String) {
    projects(first: 100, filter: { accessibleTeams: { key: { eq: $teamKey } } }) {
      nodes {
        id name summary url startDate targetDate
        state
        lead { name }
        projectMilestones { nodes { id name targetDate } }
        priority
        createdAt updatedAt completedAt canceledAt
      }
    }
    team(id: $teamKey) {
      issues(first: 250, after: $after, orderBy: updatedAt) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id identifier title url priority
          state { name type }
          labels { nodes { name } }
          project { id }
          parent { id identifier }
          createdAt startedAt completedAt canceledAt updatedAt
        }
      }
    }
  }
`

const PRIORITY_NAME = { 0: 'None', 1: 'Urgent', 2: 'High', 3: 'Medium', 4: 'Low' }

async function buildDashboard() {
  const first = await linear(DASHBOARD_QUERY, { teamKey: TEAM_KEY, after: null })

  const projects = (first.projects?.nodes ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    summary: p.summary || '',
    url: p.url,
    status: p.state || 'backlog',
    lead: p.lead?.name ?? null,
    startDate: p.startDate ?? null,
    targetDate: p.targetDate ?? null,
    priority: p.priority ?? 0,
    milestones: (p.projectMilestones?.nodes ?? []).map((m) => ({
      id: m.id, name: m.name, targetDate: m.targetDate ?? null,
    })),
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    completedAt: p.completedAt ?? null,
    canceledAt: p.canceledAt ?? null,
  }))

  // Paginate issues.
  let issueNodes = first.team?.issues?.nodes ?? []
  let page = first.team?.issues?.pageInfo
  while (page?.hasNextPage) {
    const next = await linear(DASHBOARD_QUERY, { teamKey: TEAM_KEY, after: page.endCursor })
    issueNodes = issueNodes.concat(next.team?.issues?.nodes ?? [])
    page = next.team?.issues?.pageInfo
  }

  const issues = issueNodes.map((i) => ({
    id: i.identifier,
    title: i.title,
    url: i.url,
    priority: i.priority ?? 0,
    priorityName: PRIORITY_NAME[i.priority ?? 0],
    status: i.state?.name ?? null,
    statusType: i.state?.type ?? null,
    labels: (i.labels?.nodes ?? []).map((l) => l.name),
    projectId: i.project?.id ?? null,
    parentId: i.parent?.identifier ?? null,
    createdAt: i.createdAt,
    startedAt: i.startedAt ?? null,
    completedAt: i.completedAt ?? null,
    canceledAt: i.canceledAt ?? null,
    updatedAt: i.updatedAt,
  }))

  // Derive epics: any issue that is another issue's parent.
  const parentIds = new Set(issues.filter((i) => i.parentId).map((i) => i.parentId))
  const epics = issues
    .filter((i) => parentIds.has(i.id))
    .map((e) => {
      const children = issues.filter((c) => c.parentId === e.id)
      const done = children.filter((c) => c.statusType === 'completed').length
      const dates = children
        .map((c) => c.completedAt || c.startedAt)
        .filter(Boolean)
        .sort()
      return {
        id: e.id,
        title: e.title.replace(/^Epic:\s*/i, ''),
        url: e.url,
        projectId: e.projectId,
        status: e.status,
        statusType: e.statusType,
        childCount: children.length,
        doneCount: done,
        firstActivity: dates[0] ?? e.createdAt,
        lastActivity: dates.at(-1) ?? e.updatedAt,
      }
    })

  return {
    generatedAt: new Date().toISOString(),
    teamKey: TEAM_KEY,
    projects,
    epics,
    issues,
    meta: {
      source: 'linear-api',
      projectCount: projects.length,
      issueCount: issues.length,
      epicCount: epics.length,
    },
  }
}

async function writeDashboard() {
  try {
    const data = await buildDashboard()
    mkdirSync(dirname(DASHBOARD_PATH), { recursive: true })
    writeFileSync(DASHBOARD_PATH, JSON.stringify(data, null, 2))
    console.log(
      `[linear] Wrote ${DASHBOARD_PATH} — ${data.meta.projectCount} projects, ` +
        `${data.meta.epicCount} epics, ${data.meta.issueCount} issues.`,
    )
  } catch (err) {
    console.error('[linear] Dashboard fetch failed, keeping committed data:', err.message)
    if (!existsSync(DASHBOARD_PATH)) {
      writeFileSync(DASHBOARD_PATH, JSON.stringify(emptyDashboard(), null, 2))
    }
  }
}

await writeCurrent()
await writeDashboard()
