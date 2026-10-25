// Typed access to the generated Linear data (lib/linear-dashboard.json, written
// by scripts/fetch-linear.mjs). Everything the PM Dashboard renders derives
// from here. A thin hand-curated overlay (curatedProjects, pmStats) adds the
// narrative fields Linear doesn't hold — budget, team size, portfolio links.

import raw from './linear-dashboard.json'
import { Locale } from './i18n'

// ── Raw generated shapes ───────────────────────────────────────────────────

export type LinearProject = {
  id: string
  name: string
  summary: string
  url: string
  status: string // backlog | planned | started | completed | canceled | paused
  lead: string | null
  startDate: string | null
  targetDate: string | null
  priority: number
  milestones: { id: string; name: string; targetDate: string | null }[]
  createdAt: string
  updatedAt: string
  completedAt: string | null
  canceledAt: string | null
}

export type LinearIssue = {
  id: string
  title: string
  url: string
  priority: number
  priorityName: string
  status: string | null
  statusType: string | null // backlog | unstarted | started | completed | canceled
  labels: string[]
  projectId: string | null
  parentId: string | null
  createdAt: string
  startedAt: string | null
  completedAt: string | null
  canceledAt: string | null
  updatedAt: string
}

export type LinearEpic = {
  id: string
  title: string
  url: string
  projectId: string | null
  status: string | null
  statusType: string | null
  childCount: number
  doneCount: number
  firstActivity: string
  lastActivity: string
}

export type LinearDashboardData = {
  generatedAt: string | null
  teamKey: string
  projects: LinearProject[]
  epics: LinearEpic[]
  issues: LinearIssue[]
  meta: Record<string, unknown>
}

export const dashboardData = raw as LinearDashboardData

// ── Curated overlay ────────────────────────────────────────────────────────
// Keyed by Linear project id. Only fields Linear can't tell us.

type CuratedProject = {
  displayName?: { en: string; fr: string }
  portfolioProjectId?: string // matches projectsConfig id -> /Projects/<locale>/<id>
  featured?: boolean // pin near the top regardless of status
}

const curated: Record<string, CuratedProject> = {
  // Personal Website
  'f47696ff-3a83-41ef-8917-39e807e545e7': {
    displayName: { en: 'Portfolio Website', fr: 'Site portfolio' },
    featured: true,
  },
  // SNCF Mapping Project
  '157b20f6-6bed-430e-a565-016b898af0d3': {
    displayName: { en: 'SNCF Live Train Map', fr: 'Carte ferroviaire SNCF en direct' },
    portfolioProjectId: 'sncf-gtfs-collector',
    featured: true,
  },
  // Wivoo Daily Rollover Plugin (Linear project name unchanged; displayed as
  // "Obsidian Daily Rollover" pending EME-155's community-plugin publish)
  '468f01cc-f493-4b4e-b4b1-730c88086f88': {
    displayName: { en: 'Obsidian Daily Rollover', fr: 'Obsidian Daily Rollover' },
  },
}

// Linear stamps completedAt as "now" the moment an issue/epic is marked Done —
// it can't be backdated through the API. These epics were filed after the
// fact for write-ups actually finished earlier; override their timeline dates
// here so the Gantt reflects when the work really happened. Keyed by the
// epic's identifier (e.g. "EME-157"), matching LinearEpic.id.
const epicDateOverrides: Record<string, { start: string; end: string }> = {
  'EME-157': { start: '2026-07-25', end: '2026-07-28' }, // Architecture report
  'EME-158': { start: '2026-08-10', end: '2026-08-13' }, // Cost report
}

// Some epics are write-ups with a real published page — clicking them should
// open that page instead of (or alongside) the Linear issue. Keyed the same
// way as epicDateOverrides.
const epicReferenceUrl: Record<string, string> = {
  'EME-157': '/Articles/en/sncf-architecture',
  'EME-158': '/Articles/en/sncf-cost',
  'EME-52': '/Articles/en/sncf-analytics', // Punctuality Analytics Findings
}

// ── Derived view models ────────────────────────────────────────────────────

export type ProjectStatus = 'backlog' | 'planned' | 'started' | 'paused' | 'completed' | 'canceled'

const STATUS_ORDER: Record<string, number> = {
  started: 0,
  planned: 1,
  paused: 2,
  backlog: 3,
  completed: 4,
  canceled: 5,
}

export type ProjectView = {
  id: string
  name: string // locale-resolved
  rawName: string
  summary: string
  url: string
  status: ProjectStatus
  lead: string | null
  startDate: string | null
  targetDate: string | null
  portfolioProjectId?: string
  featured: boolean
  issueCount: number
  doneCount: number
  epicCount: number
  milestones: { id: string; name: string; targetDate: string | null }[]
  firstActivity: string | null
  lastActivity: string | null
}

export function getProjectViews(locale: Locale): ProjectView[] {
  const byProject = new Map<string, LinearIssue[]>()
  for (const issue of dashboardData.issues) {
    if (!issue.projectId) continue
    const list = byProject.get(issue.projectId) ?? []
    list.push(issue)
    byProject.set(issue.projectId, list)
  }

  const views: ProjectView[] = dashboardData.projects.map((p) => {
    const c = curated[p.id] ?? {}
    const issues = byProject.get(p.id) ?? []
    const done = issues.filter((i) => i.statusType === 'completed')
    const epics = dashboardData.epics.filter((e) => e.projectId === p.id)
    const activityDates = issues
      .flatMap((i) => [i.completedAt, i.startedAt])
      .filter((d): d is string => Boolean(d))
      .sort()

    return {
      id: p.id,
      name: c.displayName ? c.displayName[locale] : p.name,
      rawName: p.name,
      summary: p.summary,
      url: p.url,
      status: (p.status as ProjectStatus) ?? 'backlog',
      lead: p.lead,
      startDate: p.startDate,
      targetDate: p.targetDate,
      portfolioProjectId: c.portfolioProjectId,
      featured: Boolean(c.featured),
      issueCount: issues.length,
      doneCount: done.length,
      epicCount: epics.length,
      milestones: p.milestones,
      firstActivity: activityDates[0] ?? null,
      lastActivity: activityDates.at(-1) ?? null,
    }
  })

  return views.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    const sa = STATUS_ORDER[a.status] ?? 9
    const sb = STATUS_ORDER[b.status] ?? 9
    if (sa !== sb) return sa - sb
    return (b.lastActivity ?? '').localeCompare(a.lastActivity ?? '')
  })
}

/** Published report/reference page for an epic when one exists, else its Linear URL. */
export function getEpicReferenceUrl(epic: LinearEpic): string {
  return epicReferenceUrl[epic.id] ?? epic.url
}

export type EpicView = LinearEpic & { children: LinearIssue[] }

export function getEpicsForProject(projectId: string): EpicView[] {
  return dashboardData.epics
    .filter((e) => e.projectId === projectId)
    .map((e) => ({
      ...e,
      children: dashboardData.issues
        .filter((i) => i.parentId === e.id)
        .sort((a, b) => (a.completedAt ?? a.updatedAt).localeCompare(b.completedAt ?? b.updatedAt)),
    }))
    .sort((a, b) => (b.lastActivity ?? '').localeCompare(a.lastActivity ?? ''))
}

export function getIssuesForProject(projectId: string): LinearIssue[] {
  return dashboardData.issues.filter((i) => i.projectId === projectId)
}

// ── Timeline / Gantt spans ─────────────────────────────────────────────────
// A span is a [start, end] date pair plus whether the work is still open.
// Issues that are still open extend to "now" so their bar reaches the edge.

export type Span = { start: string; end: string; open: boolean }

function issueSpan(i: LinearIssue, nowIso: string): Span | null {
  const start = i.startedAt ?? i.createdAt
  const end = i.completedAt ?? i.canceledAt ?? nowIso
  if (!start) return null
  const open = !i.completedAt && !i.canceledAt
  // Clamp: a same-instant span still needs width; caller handles min width.
  return { start, end: end < start ? start : end, open }
}

function mergeSpans(spans: Span[]): Span | null {
  const valid = spans.filter(Boolean)
  if (valid.length === 0) return null
  return {
    start: valid.reduce((m, s) => (s.start < m ? s.start : m), valid[0].start),
    end: valid.reduce((m, s) => (s.end > m ? s.end : m), valid[0].end),
    open: valid.some((s) => s.open),
  }
}

export type EpicTimelineRow = {
  epic: LinearEpic
  span: Span
  children: { issue: LinearIssue; span: Span }[]
  /** Published report/reference page for this epic, when one exists — else the Linear issue. */
  referenceUrl: string
}

export type ProjectTimelineRow = {
  project: ProjectView
  span: Span
  epics: EpicTimelineRow[]
  looseIssues: { issue: LinearIssue; span: Span }[] // issues with no epic parent
}

export type TimelineModel = {
  rangeStart: string
  rangeEnd: string
  rows: ProjectTimelineRow[]
}

// ── Dashboard-wide filter (single project + custom date range) ─────────────

export type DashboardFilter = {
  projectId: string | null // null = all projects
  dateFrom: string | null // YYYY-MM-DD, inclusive
  dateTo: string | null // YYYY-MM-DD, inclusive
}

export const EMPTY_DASHBOARD_FILTER: DashboardFilter = {
  projectId: null,
  dateFrom: null,
  dateTo: null,
}

/** The date an issue is judged by for filtering: when it happened, in order of preference. */
function issueEffectiveDate(i: LinearIssue): string | null {
  return i.completedAt ?? i.startedAt ?? i.createdAt ?? null
}

function matchesDateRange(iso: string | null, filter: DashboardFilter): boolean {
  if (!iso) return true
  const day = iso.slice(0, 10)
  if (filter.dateFrom && day < filter.dateFrom) return false
  if (filter.dateTo && day > filter.dateTo) return false
  return true
}

function matchesFilter(i: LinearIssue, filter: DashboardFilter): boolean {
  if (filter.projectId && i.projectId !== filter.projectId) return false
  return matchesDateRange(issueEffectiveDate(i), filter)
}

export function getTimelineModel(
  locale: Locale,
  filter: DashboardFilter = EMPTY_DASHBOARD_FILTER,
): TimelineModel {
  const now = new Date().toISOString()
  const projectViews = getProjectViews(locale).filter(
    (p) => !filter.projectId || p.id === filter.projectId,
  )
  const rows: ProjectTimelineRow[] = []

  for (const project of projectViews) {
    const projectIssues = dashboardData.issues.filter(
      (i) => i.projectId === project.id && matchesFilter(i, filter),
    )
    if (projectIssues.length === 0) continue

    const epicIds = new Set(dashboardData.epics.filter((e) => e.projectId === project.id).map((e) => e.id))

    const hasDateFilter = Boolean(filter.dateFrom || filter.dateTo)

    const epics: EpicTimelineRow[] = dashboardData.epics
      .filter((e) => e.projectId === project.id)
      .map((e) => {
        const kids = projectIssues
          .filter((i) => i.parentId === e.id)
          .map((issue) => ({ issue, span: issueSpan(issue, now) }))
          .filter((x): x is { issue: LinearIssue; span: Span } => x.span !== null)
          .sort((a, b) => a.span.start.localeCompare(b.span.start))
        // With a date filter active, an epic whose own children all fall
        // outside the range (and whose own activity window — for a
        // childless, single-issue epic — doesn't overlap it either) has
        // nothing to show — drop it.
        if (
          hasDateFilter &&
          kids.length === 0 &&
          !matchesDateRange(e.firstActivity, filter) &&
          !matchesDateRange(e.lastActivity, filter)
        ) {
          return null
        }
        const override = epicDateOverrides[e.id]
        const span: Span = override
          ? { start: override.start, end: override.end, open: false }
          : mergeSpans(kids.map((k) => k.span)) ??
            issueSpan(e as unknown as LinearIssue, now) ?? {
              start: e.firstActivity,
              end: e.lastActivity,
              open: e.statusType !== 'completed',
            }
        return { epic: e, span, children: kids, referenceUrl: getEpicReferenceUrl(e) }
      })
      .filter((x): x is EpicTimelineRow => x !== null)
      .sort((a, b) => a.span.start.localeCompare(b.span.start))

    const looseIssues = projectIssues
      .filter((i) => !i.parentId || !epicIds.has(i.parentId))
      .filter((i) => !epicIds.has(i.id)) // the epic issue itself isn't a "loose" row
      .map((issue) => ({ issue, span: issueSpan(issue, now) }))
      .filter((x): x is { issue: LinearIssue; span: Span } => x.span !== null)
      .sort((a, b) => a.span.start.localeCompare(b.span.start))

    const projectSpan = mergeSpans([
      ...epics.map((e) => e.span),
      ...looseIssues.map((l) => l.span),
    ])
    if (!projectSpan) continue

    rows.push({ project, span: projectSpan, epics, looseIssues })
  }

  // Order rows by start date so the eye reads earliest → latest top to bottom.
  rows.sort((a, b) => {
    if (a.project.featured !== b.project.featured) return a.project.featured ? -1 : 1
    return a.span.start.localeCompare(b.span.start)
  })

  const allStarts = rows.map((r) => r.span.start)
  const allEnds = rows.map((r) => r.span.end)
  const rangeStart = allStarts.length ? allStarts.reduce((m, s) => (s < m ? s : m)) : now
  const rangeEnd = allEnds.length ? allEnds.reduce((m, s) => (s > m ? s : m)) : now

  return { rangeStart, rangeEnd, rows }
}

// Issues delivered (completed) in a given calendar month, for the timeline's
// month rollup. `monthKey` is "YYYY-MM".
export function getDeliveredByMonth(
  projectId?: string,
  filter: DashboardFilter = EMPTY_DASHBOARD_FILTER,
): { month: string; issues: LinearIssue[] }[] {
  const pool = dashboardData.issues.filter(
    (i) => i.completedAt && (!projectId || i.projectId === projectId) && matchesFilter(i, filter),
  )
  const byMonth = new Map<string, LinearIssue[]>()
  for (const issue of pool) {
    const month = issue.completedAt!.slice(0, 7)
    const list = byMonth.get(month) ?? []
    list.push(issue)
    byMonth.set(month, list)
  }
  return [...byMonth.entries()]
    .map(([month, issues]) => ({ month, issues }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

/** All issues matching the dashboard filter — the shared source for the
 * Issue Explorer table and any other per-issue view. */
export function getFilteredIssues(filter: DashboardFilter = EMPTY_DASHBOARD_FILTER): LinearIssue[] {
  return dashboardData.issues.filter((i) => matchesFilter(i, filter))
}

/** Epics matching the dashboard filter — by project, and (when a date range
 * is set) only those with at least one matching child issue, or whose own
 * activity window (for childless epics) overlaps the range. */
export function getFilteredEpics(filter: DashboardFilter = EMPTY_DASHBOARD_FILTER): LinearEpic[] {
  const hasDateFilter = Boolean(filter.dateFrom || filter.dateTo)
  return dashboardData.epics.filter((e) => {
    if (filter.projectId && e.projectId !== filter.projectId) return false
    if (!hasDateFilter) return true
    const hasMatchingChild = dashboardData.issues.some(
      (i) => i.parentId === e.id && matchesFilter(i, filter),
    )
    if (hasMatchingChild) return true
    // Childless epic (e.g. a single-issue report): judge it by its own
    // first/last activity window overlapping the filter's date range.
    return (
      matchesDateRange(e.firstActivity, filter) || matchesDateRange(e.lastActivity, filter)
    )
  })
}

// ── Aggregate metrics ──────────────────────────────────────────────────────

export function getProcessMetrics(filter: DashboardFilter = EMPTY_DASHBOARD_FILTER) {
  const issues = getFilteredIssues(filter)
  const completed = issues.filter((i) => i.statusType === 'completed')
  const withCycleTime = completed.filter((i) => i.startedAt && i.completedAt)
  const avgCycleDays =
    withCycleTime.length > 0
      ? withCycleTime.reduce((sum, i) => {
          const ms = new Date(i.completedAt!).getTime() - new Date(i.startedAt!).getTime()
          return sum + ms / 86_400_000
        }, 0) / withCycleTime.length
      : 0

  const months = getDeliveredByMonth(filter.projectId ?? undefined, filter)
  const activeMonths = months.filter((m) => m.issues.length > 0)
  const avgPerMonth =
    activeMonths.length > 0
      ? activeMonths.reduce((s, m) => s + m.issues.length, 0) / activeMonths.length
      : 0

  const labelCounts = new Map<string, number>()
  for (const issue of issues) {
    for (const label of issue.labels) {
      labelCounts.set(label, (labelCounts.get(label) ?? 0) + 1)
    }
  }
  const topLabels = [...labelCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))

  const epics = getFilteredEpics(filter)

  return {
    totalIssues: issues.length,
    completedIssues: completed.length,
    completionRate: issues.length > 0 ? Math.round((completed.length / issues.length) * 100) : 0,
    avgCycleDays: Math.round(avgCycleDays * 10) / 10,
    avgDeliveredPerMonth: Math.round(avgPerMonth * 10) / 10,
    activeMonths: activeMonths.length,
    topLabels,
    epicsShipped: epics.filter((e) => e.statusType === 'completed').length,
    epicsTotal: epics.length,
    deliveryStart: months[0]?.month ?? null,
    generatedAt: dashboardData.generatedAt,
  }
}
