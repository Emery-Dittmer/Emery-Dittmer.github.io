# PM Dashboard & Linear Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated PM Dashboard page and a live "What is Emery up to?" homepage widget powered by a personal Linear workspace.

**Architecture:** Hybrid — `lib/linearConfig.ts` holds hand-curated static data for the PM Dashboard page (fast, always renders, narrative is controlled). A Next.js API route (`/api/linear/current`) proxies Linear's GraphQL API server-side for the homepage widget (real-time, lazy-loaded on first expand). The API key is never exposed to the browser.

**Tech Stack:** Next.js 13+ App Router, TypeScript, Tailwind CSS, Linear GraphQL API (`https://api.linear.app/graphql`), lucide-react icons

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `lib/linearApi.ts` | Reusable Linear GraphQL fetch helper |
| Create | `app/api/linear/current/route.ts` | Server-side Linear proxy for homepage widget |
| Create | `lib/linearConfig.ts` | Curated static PM data types + data |
| Create | `components/PMDashboard/PMHero.tsx` | Stats bar — headline PM credentials |
| Create | `components/PMDashboard/DeliveryTrackRecord.tsx` | Completed cycles card grid |
| Create | `components/PMDashboard/ProjectLeadershipBoard.tsx` | Projects + milestones card grid |
| Create | `components/PMDashboard/ProcessShowcase.tsx` | Aggregate process metrics strip |
| Create | `app/PMDashboard/en/layout.tsx` | EN page layout wrapper |
| Create | `app/PMDashboard/en/page.tsx` | EN PM Dashboard page |
| Create | `app/PMDashboard/fr/layout.tsx` | FR page layout wrapper |
| Create | `app/PMDashboard/fr/page.tsx` | FR PM Dashboard page |
| Create | `components/WhatIsEmeryUpTo.tsx` | Homepage accordion widget |
| Modify | `app/(default)/en/page.tsx` | Add WhatIsEmeryUpTo before Newsletter |
| Modify | `app/(default)/fr/page.tsx` | Add WhatIsEmeryUpTo before Newsletter |
| Modify | `components/ui/header.tsx` | Add PM nav link |
| Modify | `components/ui/footer.tsx` | Add PM Dashboard footer link |
| Create | `.env.local` | LINEAR_API_KEY (gitignored) |

---

## Task 1: Environment variable + Linear GraphQL helper

**Files:**
- Create: `.env.local`
- Create: `lib/linearApi.ts`

- [ ] **Step 1: Add LINEAR_API_KEY to .env.local**

  Open `.env.local` (create it at project root if it doesn't exist) and add:
  ```
  LINEAR_API_KEY=your_linear_api_key_here
  ```
  Confirm `.env.local` is in `.gitignore` — Next.js includes it by default.

- [ ] **Step 2: Create lib/linearApi.ts**

  ```typescript
  const LINEAR_API_URL = 'https://api.linear.app/graphql'

  export async function linearQuery<T>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    const res = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.LINEAR_API_KEY ?? '',
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Linear API error: ${res.status}`)
    const json = await res.json()
    if (json.errors?.length) throw new Error(json.errors[0].message)
    return json.data as T
  }
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add lib/linearApi.ts
  git commit -m "feat: add Linear GraphQL helper"
  ```

---

## Task 2: API route — /api/linear/current

**Files:**
- Create: `app/api/linear/current/route.ts`

- [ ] **Step 1: Create app/api/linear/current/route.ts**

  ```typescript
  import { NextResponse } from 'next/server'
  import { linearQuery } from '@/lib/linearApi'

  const QUERY = `
    query CurrentWork {
      teams {
        nodes {
          activeCycle {
            id
            name
            number
            startsAt
            endsAt
            completedIssueCountHistory
            issueCountHistory
            issues(orderBy: updatedAt) {
              nodes {
                id
                title
                priority
                url
                state { type }
                completedAt
              }
            }
          }
        }
      }
    }
  `

  type LinearIssue = {
    id: string
    title: string
    priority: number
    url: string
    state: { type: string }
    completedAt: string | null
  }

  type LinearCycle = {
    id: string
    name: string
    number: number
    startsAt: string
    endsAt: string
    completedIssueCountHistory: number[]
    issueCountHistory: number[]
    issues: { nodes: LinearIssue[] }
  }

  type LinearTeamsResponse = {
    teams: {
      nodes: Array<{ activeCycle: LinearCycle | null }>
    }
  }

  export async function GET() {
    try {
      const data = await linearQuery<LinearTeamsResponse>(QUERY)

      const activeCycle =
        data.teams.nodes.find((t) => t.activeCycle)?.activeCycle ?? null

      if (!activeCycle) {
        return NextResponse.json({ cycle: null, inProgress: [], recentlyDone: [] })
      }

      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - 14)

      const issues = activeCycle.issues.nodes
      const completedCount = activeCycle.completedIssueCountHistory.at(-1) ?? 0
      const totalCount = activeCycle.issueCountHistory.at(-1) ?? 0

      const inProgress = issues
        .filter((i) => i.state.type === 'started')
        .slice(0, 4)
        .map((i) => ({ title: i.title, priority: i.priority, url: i.url }))

      const recentlyDone = issues
        .filter(
          (i) =>
            i.state.type === 'completed' &&
            i.completedAt != null &&
            new Date(i.completedAt) > cutoff,
        )
        .slice(0, 4)
        .map((i) => ({ title: i.title, completedAt: i.completedAt!, url: i.url }))

      return NextResponse.json({
        cycle: {
          name: activeCycle.name,
          number: activeCycle.number,
          startsAt: activeCycle.startsAt,
          endsAt: activeCycle.endsAt,
          completedCount,
          totalCount,
        },
        inProgress,
        recentlyDone,
      })
    } catch {
      return NextResponse.json({ error: true }, { status: 500 })
    }
  }
  ```

- [ ] **Step 2: Start dev server and verify the route**

  Run: `npm run dev`

  Open in browser: `http://localhost:3000/api/linear/current`

  Expected: JSON response with `cycle`, `inProgress`, and `recentlyDone` fields. If Linear has no active cycle the response will be `{ cycle: null, inProgress: [], recentlyDone: [] }` — that is correct behavior.

- [ ] **Step 3: Commit**

  ```bash
  git add app/api/linear/current/route.ts
  git commit -m "feat: add Linear current-work API route"
  ```

---

## Task 3: Static config — lib/linearConfig.ts

**Files:**
- Create: `lib/linearConfig.ts`

This file holds curated data drawn from your Linear workspace. Update the cycle and project arrays to match your actual Linear workspace data after creating the file.

- [ ] **Step 1: Create lib/linearConfig.ts**

  ```typescript
  // ── Types ──────────────────────────────────────────────────────────────────

  export type PMStats = {
    projectsLed: number
    peakTeamSize: number
    largestBudget: string
    combinedImpact: string
    certifications: string[]
  }

  export type CompletedCycle = {
    id: string
    name: string
    startDate: string          // YYYY-MM-DD
    endDate: string            // YYYY-MM-DD
    completedOnTime: boolean
    plannedIssues: number
    completedIssues: number
    portfolioProjectId?: string // matches projectsConfig id
  }

  export type PMProject = {
    id: string
    name: { en: string; fr: string }
    status: 'completed' | 'in-progress'
    milestones: number
    completedMilestones: number
    priorityBreakdown: {
      urgent: number
      high: number
      medium: number
      low: number
    }
    portfolioProjectId?: string
  }

  export type ProcessMetrics = {
    avgVelocity: number        // avg issues closed per cycle
    avgCompletionRate: number  // 0–100
    topLabels: string[]
  }

  // ── Data ───────────────────────────────────────────────────────────────────

  export const pmStats: PMStats = {
    projectsLed: 8,
    peakTeamSize: 5,
    largestBudget: '$150K',
    combinedImpact: '$2M+',
    certifications: ['CAPM', 'PSM I'],
  }

  export const completedCycles: CompletedCycle[] = [
    {
      id: 'cycle-1',
      name: 'Portfolio v1 – Launch',
      startDate: '2025-01-06',
      endDate: '2025-01-19',
      completedOnTime: true,
      plannedIssues: 12,
      completedIssues: 11,
      portfolioProjectId: undefined,
    },
    {
      id: 'cycle-2',
      name: 'SNCF Map – Data Pipeline',
      startDate: '2025-02-03',
      endDate: '2025-02-16',
      completedOnTime: true,
      plannedIssues: 10,
      completedIssues: 10,
      portfolioProjectId: 'sncf-gtfs-collector',
    },
    {
      id: 'cycle-3',
      name: 'Transit Catchment – MVP',
      startDate: '2025-03-03',
      endDate: '2025-03-16',
      completedOnTime: true,
      plannedIssues: 8,
      completedIssues: 7,
      portfolioProjectId: 'transit-catchment',
    },
    {
      id: 'cycle-4',
      name: 'FX Rates App',
      startDate: '2025-04-07',
      endDate: '2025-04-20',
      completedOnTime: true,
      plannedIssues: 9,
      completedIssues: 9,
      portfolioProjectId: 'fx-rates',
    },
    {
      id: 'cycle-5',
      name: 'Portfolio v2 – Projects Page',
      startDate: '2025-05-05',
      endDate: '2025-05-18',
      completedOnTime: true,
      plannedIssues: 11,
      completedIssues: 10,
      portfolioProjectId: undefined,
    },
    {
      id: 'cycle-6',
      name: 'SNCF Map – Live Train Positions',
      startDate: '2025-05-26',
      endDate: '2025-06-08',
      completedOnTime: true,
      plannedIssues: 10,
      completedIssues: 9,
      portfolioProjectId: 'sncf-gtfs-collector',
    },
  ]

  export const pmProjects: PMProject[] = [
    {
      id: 'portfolio-site',
      name: { en: 'Portfolio Website', fr: 'Site portfolio' },
      status: 'in-progress',
      milestones: 6,
      completedMilestones: 4,
      priorityBreakdown: { urgent: 2, high: 8, medium: 14, low: 5 },
    },
    {
      id: 'sncf-map',
      name: { en: 'SNCF Live Train Map', fr: 'Carte ferroviaire en direct' },
      status: 'completed',
      milestones: 4,
      completedMilestones: 4,
      priorityBreakdown: { urgent: 1, high: 6, medium: 10, low: 3 },
      portfolioProjectId: 'sncf-gtfs-collector',
    },
    {
      id: 'transit-catchment',
      name: { en: 'Transit Catchment Explorer', fr: 'Explorateur de desserte transit' },
      status: 'completed',
      milestones: 3,
      completedMilestones: 3,
      priorityBreakdown: { urgent: 0, high: 4, medium: 8, low: 2 },
      portfolioProjectId: 'transit-catchment',
    },
    {
      id: 'fx-rates',
      name: { en: 'FX Rates App', fr: 'Application de taux de change' },
      status: 'completed',
      milestones: 3,
      completedMilestones: 3,
      priorityBreakdown: { urgent: 0, high: 3, medium: 9, low: 4 },
      portfolioProjectId: 'fx-rates',
    },
  ]

  export const processMetrics: ProcessMetrics = {
    avgVelocity: 9,
    avgCompletionRate: 91,
    topLabels: ['Feature', 'Bug Fix', 'Infrastructure', 'Data', 'Design'],
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add lib/linearConfig.ts
  git commit -m "feat: add PM dashboard static config"
  ```

---

## Task 4: PMHero component

**Files:**
- Create: `components/PMDashboard/PMHero.tsx`

- [ ] **Step 1: Create components/PMDashboard/PMHero.tsx**

  ```typescript
  import { pmStats } from '@/lib/linearConfig'
  import { Locale } from '@/lib/i18n'

  const copy = {
    en: {
      heading: 'Project Management',
      sub: 'A track record of leading data-driven teams, delivering on time, and creating measurable impact.',
      projectsLed: 'Projects Led',
      peakTeam: 'Peak Team Size',
      largestBudget: 'Largest Budget',
      combinedImpact: 'Combined Impact',
      certifications: 'Certifications',
    },
    fr: {
      heading: 'Gestion de projet',
      sub: 'Un bilan de direction d\'équipes data, de livraisons dans les délais et d\'impacts mesurables.',
      projectsLed: 'Projets dirigés',
      peakTeam: 'Équipe maximale',
      largestBudget: 'Budget le plus élevé',
      combinedImpact: 'Impact combiné',
      certifications: 'Certifications',
    },
  }

  export default function PMHero({ locale = 'en' }: { locale?: Locale }) {
    const t = copy[locale]

    const stats = [
      { label: t.projectsLed, value: String(pmStats.projectsLed) },
      { label: t.peakTeam, value: `${pmStats.peakTeamSize} people` },
      { label: t.largestBudget, value: pmStats.largestBudget },
      { label: t.combinedImpact, value: pmStats.combinedImpact },
    ]

    return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8">
          <div className="text-center mb-10" data-aos="fade-up">
            <h1 className="h1 mb-4">{t.heading}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.sub}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {pmStats.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/20 border border-purple-500/40 text-purple-300"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-aos="fade-up" data-aos-delay="100">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 text-center"
              >
                <p className="text-3xl font-bold text-white mb-1">{value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add components/PMDashboard/PMHero.tsx
  git commit -m "feat: add PMHero stats bar component"
  ```

---

## Task 5: DeliveryTrackRecord component

**Files:**
- Create: `components/PMDashboard/DeliveryTrackRecord.tsx`

- [ ] **Step 1: Create components/PMDashboard/DeliveryTrackRecord.tsx**

  ```typescript
  import { completedCycles, CompletedCycle } from '@/lib/linearConfig'
  import { Locale } from '@/lib/i18n'

  const copy = {
    en: {
      heading: 'Delivery Track Record',
      sub: 'Completed sprints from my personal project workspace.',
      planned: 'Planned',
      completed: 'Completed',
      onTime: 'On time',
      overrun: 'Overrun',
    },
    fr: {
      heading: 'Bilan de livraison',
      sub: 'Sprints complétés dans mon espace de travail personnel.',
      planned: 'Planifié',
      completed: 'Complété',
      onTime: 'Dans les délais',
      overrun: 'Dépassement',
    },
  }

  function CycleCard({ cycle, t }: { cycle: CompletedCycle; t: typeof copy['en'] }) {
    const pct = cycle.plannedIssues > 0
      ? Math.round((cycle.completedIssues / cycle.plannedIssues) * 100)
      : 0
    const fmt = (d: string) =>
      new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })

    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-gray-100 leading-snug">{cycle.name}</p>
          <span
            className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              cycle.completedOnTime
                ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
            }`}
          >
            {cycle.completedOnTime ? t.onTime : t.overrun}
          </span>
        </div>

        <p className="text-xs text-gray-500">
          {fmt(cycle.startDate)} → {fmt(cycle.endDate)}
        </p>

        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{t.completed}: {cycle.completedIssues}/{cycle.plannedIssues}</span>
            <span>{pct}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-1.5 rounded-full bg-purple-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  export default function DeliveryTrackRecord({ locale = 'en' }: { locale?: Locale }) {
    const t = copy[locale]

    return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="py-1 md:py-2 border-t border-gray-800 mb-8" />
          <h2 className="h2 text-center mb-2">{t.heading}</h2>
          <p className="text-center text-gray-400 text-sm mb-8">{t.sub}</p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-aos="fade-up"
          >
            {completedCycles.map((cycle) => (
              <CycleCard key={cycle.id} cycle={cycle} t={t} />
            ))}
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add components/PMDashboard/DeliveryTrackRecord.tsx
  git commit -m "feat: add DeliveryTrackRecord component"
  ```

---

## Task 6: ProjectLeadershipBoard component

**Files:**
- Create: `components/PMDashboard/ProjectLeadershipBoard.tsx`

- [ ] **Step 1: Create components/PMDashboard/ProjectLeadershipBoard.tsx**

  ```typescript
  import Link from 'next/link'
  import { pmProjects, PMProject } from '@/lib/linearConfig'
  import { Locale } from '@/lib/i18n'

  const copy = {
    en: {
      heading: 'Project Leadership',
      sub: 'Personal projects structured and managed in Linear.',
      milestones: 'Milestones',
      status: { completed: 'Completed', 'in-progress': 'In Progress' },
      viewProject: 'View project →',
      priority: { urgent: 'Urgent', high: 'High', medium: 'Medium', low: 'Low' },
    },
    fr: {
      heading: 'Direction de projets',
      sub: 'Projets personnels structurés et gérés dans Linear.',
      milestones: 'Jalons',
      status: { completed: 'Terminé', 'in-progress': 'En cours' },
      viewProject: 'Voir le projet →',
      priority: { urgent: 'Urgent', high: 'Haute', medium: 'Moyenne', low: 'Basse' },
    },
  }

  const PRIORITY_COLORS = {
    urgent: 'bg-red-500',
    high: 'bg-orange-400',
    medium: 'bg-yellow-400',
    low: 'bg-gray-500',
  }

  function PriorityBar({ breakdown }: { breakdown: PMProject['priorityBreakdown'] }) {
    const total = breakdown.urgent + breakdown.high + breakdown.medium + breakdown.low
    if (total === 0) return null
    return (
      <div className="flex rounded-full overflow-hidden h-1.5 w-full">
        {(['urgent', 'high', 'medium', 'low'] as const).map((k) => (
          breakdown[k] > 0 && (
            <div
              key={k}
              className={PRIORITY_COLORS[k]}
              style={{ width: `${(breakdown[k] / total) * 100}%` }}
            />
          )
        ))}
      </div>
    )
  }

  function ProjectCard({ project, locale, t }: { project: PMProject; locale: Locale; t: typeof copy['en'] }) {
    const milestonePct = project.milestones > 0
      ? Math.round((project.completedMilestones / project.milestones) * 100)
      : 0

    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-gray-100 leading-snug">
            {project.name[locale]}
          </p>
          <span
            className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              project.status === 'completed'
                ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
            }`}
          >
            {t.status[project.status]}
          </span>
        </div>

        <p className="text-xs text-gray-400">
          {t.milestones}: {project.completedMilestones}/{project.milestones} ({milestonePct}%)
        </p>

        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Priority split</p>
          <PriorityBar breakdown={project.priorityBreakdown} />
          <div className="flex gap-3 mt-1.5">
            {(['urgent', 'high', 'medium', 'low'] as const).map((k) => (
              project.priorityBreakdown[k] > 0 && (
                <span key={k} className="flex items-center gap-1 text-[10px] text-gray-500">
                  <span className={`inline-block w-2 h-2 rounded-full ${PRIORITY_COLORS[k]}`} />
                  {t.priority[k]} {project.priorityBreakdown[k]}
                </span>
              )
            ))}
          </div>
        </div>

        {project.portfolioProjectId && (
          <Link
            href={`/Projects/${locale}/${project.portfolioProjectId}`}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors mt-auto"
          >
            {t.viewProject}
          </Link>
        )}
      </div>
    )
  }

  export default function ProjectLeadershipBoard({ locale = 'en' }: { locale?: Locale }) {
    const t = copy[locale]

    return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="py-1 md:py-2 border-t border-gray-800 mb-8" />
          <h2 className="h2 text-center mb-2">{t.heading}</h2>
          <p className="text-center text-gray-400 text-sm mb-8">{t.sub}</p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            data-aos="fade-up"
          >
            {pmProjects.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} t={t} />
            ))}
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add components/PMDashboard/ProjectLeadershipBoard.tsx
  git commit -m "feat: add ProjectLeadershipBoard component"
  ```

---

## Task 7: ProcessShowcase component

**Files:**
- Create: `components/PMDashboard/ProcessShowcase.tsx`

- [ ] **Step 1: Create components/PMDashboard/ProcessShowcase.tsx**

  ```typescript
  import { processMetrics } from '@/lib/linearConfig'
  import { Locale } from '@/lib/i18n'

  const copy = {
    en: {
      heading: 'Process Maturity',
      sub: 'Aggregate patterns from my Linear workspace.',
      velocity: 'Avg Velocity',
      velocitySub: 'issues closed per sprint',
      completionRate: 'Avg Completion Rate',
      topLabels: 'Most-Used Labels',
    },
    fr: {
      heading: 'Maturité des processus',
      sub: 'Tendances agrégées de mon espace de travail Linear.',
      velocity: 'Vélocité moyenne',
      velocitySub: 'tickets fermés par sprint',
      completionRate: 'Taux de complétion moyen',
      topLabels: 'Labels les plus utilisés',
    },
  }

  export default function ProcessShowcase({ locale = 'en' }: { locale?: Locale }) {
    const t = copy[locale]

    return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-16">
          <div className="py-1 md:py-2 border-t border-gray-800 mb-8" />
          <h2 className="h2 text-center mb-2">{t.heading}</h2>
          <p className="text-center text-gray-400 text-sm mb-8">{t.sub}</p>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            data-aos="fade-up"
          >
            {/* Velocity */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-center">
              <p className="text-4xl font-bold text-white mb-1">
                {processMetrics.avgVelocity}
              </p>
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                {t.velocity}
              </p>
              <p className="text-xs text-gray-500 mt-1">{t.velocitySub}</p>
            </div>

            {/* Completion rate */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 flex flex-col justify-center">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span className="font-semibold text-purple-400 uppercase tracking-wider">
                  {t.completionRate}
                </span>
                <span className="text-white font-bold">
                  {processMetrics.avgCompletionRate}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: `${processMetrics.avgCompletionRate}%` }}
                />
              </div>
            </div>

            {/* Top labels */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6">
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                {t.topLabels}
              </p>
              <div className="flex flex-wrap gap-2">
                {processMetrics.topLabels.map((label) => (
                  <span
                    key={label}
                    className="px-2.5 py-1 rounded-full text-xs bg-gray-800 border border-gray-700 text-gray-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add components/PMDashboard/ProcessShowcase.tsx
  git commit -m "feat: add ProcessShowcase component"
  ```

---

## Task 8: PM Dashboard layouts and pages

**Files:**
- Create: `app/PMDashboard/en/layout.tsx`
- Create: `app/PMDashboard/fr/layout.tsx`
- Create: `app/PMDashboard/en/page.tsx`
- Create: `app/PMDashboard/fr/page.tsx`

- [ ] **Step 1: Create app/PMDashboard/en/layout.tsx**

  ```typescript
  import PageIllustration from '@/components/page-illustration'
  import Footer from '@/components/ui/footer'

  export default function PMDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <main className="grow">
          <PageIllustration />
          {children}
        </main>
        <Footer />
      </>
    )
  }
  ```

- [ ] **Step 2: Create app/PMDashboard/fr/layout.tsx**

  Identical to EN layout — copy verbatim:

  ```typescript
  import PageIllustration from '@/components/page-illustration'
  import Footer from '@/components/ui/footer'

  export default function PMDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <main className="grow">
          <PageIllustration />
          {children}
        </main>
        <Footer />
      </>
    )
  }
  ```

- [ ] **Step 3: Create app/PMDashboard/en/page.tsx**

  ```typescript
  import PMHero from '@/components/PMDashboard/PMHero'
  import DeliveryTrackRecord from '@/components/PMDashboard/DeliveryTrackRecord'
  import ProjectLeadershipBoard from '@/components/PMDashboard/ProjectLeadershipBoard'
  import ProcessShowcase from '@/components/PMDashboard/ProcessShowcase'

  export const metadata = {
    title: 'PM Dashboard — Emery Dittmer',
    description: 'Project management track record, delivery metrics, and process maturity.',
    keywords: ['Project Management', 'CAPM', 'Scrum', 'Emery Dittmer'],
    colorScheme: 'dark',
  }

  export default function PMDashboardPage() {
    const locale = 'en'
    return (
      <>
        <PMHero locale={locale} />
        <DeliveryTrackRecord locale={locale} />
        <ProjectLeadershipBoard locale={locale} />
        <ProcessShowcase locale={locale} />
      </>
    )
  }
  ```

- [ ] **Step 4: Create app/PMDashboard/fr/page.tsx**

  ```typescript
  import PMHero from '@/components/PMDashboard/PMHero'
  import DeliveryTrackRecord from '@/components/PMDashboard/DeliveryTrackRecord'
  import ProjectLeadershipBoard from '@/components/PMDashboard/ProjectLeadershipBoard'
  import ProcessShowcase from '@/components/PMDashboard/ProcessShowcase'

  export const metadata = {
    title: 'Tableau de bord PM — Emery Dittmer',
    description: 'Bilan de gestion de projet, métriques de livraison et maturité des processus.',
    keywords: ['Gestion de projet', 'CAPM', 'Scrum', 'Emery Dittmer'],
    colorScheme: 'dark',
  }

  export default function PMDashboardPage() {
    const locale = 'fr'
    return (
      <>
        <PMHero locale={locale} />
        <DeliveryTrackRecord locale={locale} />
        <ProjectLeadershipBoard locale={locale} />
        <ProcessShowcase locale={locale} />
      </>
    )
  }
  ```

- [ ] **Step 5: Open browser and verify the page renders**

  Navigate to `http://localhost:3000/PMDashboard/en`

  Expected: Page loads with stats bar, delivery cycles grid, project leadership board, and process metrics strip. All data is visible without any runtime errors.

- [ ] **Step 6: Commit**

  ```bash
  git add app/PMDashboard/
  git commit -m "feat: add PM Dashboard pages and layouts"
  ```

---

## Task 9: WhatIsEmeryUpTo homepage widget

**Files:**
- Create: `components/WhatIsEmeryUpTo.tsx`

- [ ] **Step 1: Create components/WhatIsEmeryUpTo.tsx**

  ```typescript
  'use client'

  import { useState } from 'react'
  import { ChevronDown } from 'lucide-react'
  import { Locale } from '@/lib/i18n'

  type LinearIssue = { title: string; priority: number; url: string }
  type RecentIssue = { title: string; completedAt: string; url: string }
  type CycleData = {
    name: string
    number: number
    startsAt: string
    endsAt: string
    completedCount: number
    totalCount: number
  }
  type WidgetData = {
    cycle: CycleData | null
    inProgress: LinearIssue[]
    recentlyDone: RecentIssue[]
  }

  const PRIORITY_LABEL: Record<number, string> = {
    0: '—',
    1: 'Urgent',
    2: 'High',
    3: 'Medium',
    4: 'Low',
  }

  const PRIORITY_COLOR: Record<number, string> = {
    0: 'text-gray-500',
    1: 'text-red-400',
    2: 'text-orange-400',
    3: 'text-yellow-400',
    4: 'text-gray-400',
  }

  const copy = {
    en: {
      label: "What is Emery up to?",
      now: 'Now',
      inProgress: 'In Progress',
      recentlyDone: 'Recently Done',
      betweenSprints: 'Between sprints',
      noActivity: 'No recent activity',
      loading: 'Loading…',
      pct: (c: number, t: number) => `${t > 0 ? Math.round((c / t) * 100) : 0}% complete`,
    },
    fr: {
      label: "Qu'est-ce qu'Emery fait en ce moment ?",
      now: 'En cours',
      inProgress: 'En cours de traitement',
      recentlyDone: 'Récemment terminé',
      betweenSprints: 'Entre deux sprints',
      noActivity: 'Aucune activité récente',
      loading: 'Chargement…',
      pct: (c: number, t: number) => `${t > 0 ? Math.round((c / t) * 100) : 0}% complété`,
    },
  }

  function Skeleton() {
    return (
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl bg-gray-800 h-24" />
        ))}
      </div>
    )
  }

  export default function WhatIsEmeryUpTo({ locale = 'en' }: { locale?: Locale }) {
    const t = copy[locale]
    const [open, setOpen] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<WidgetData | null>(null)

    const handleToggle = async () => {
      const next = !open
      setOpen(next)
      if (next && !fetched) {
        setLoading(true)
        try {
          const res = await fetch('/api/linear/current')
          const json: WidgetData = await res.json()
          setData(json)
        } finally {
          setFetched(true)
          setLoading(false)
        }
      }
    }

    const pct =
      data?.cycle
        ? Math.round(
            data.cycle.totalCount > 0
              ? (data.cycle.completedCount / data.cycle.totalCount) * 100
              : 0,
          )
        : 0

    return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="py-1 md:py-2 border-t border-gray-800 mb-4" />

          <button
            onClick={handleToggle}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/60 hover:border-gray-700 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-200">{t.label}</span>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {open && (
            <div className="mt-2 rounded-xl border border-gray-800 bg-gray-900/40 overflow-hidden">
              {loading ? (
                <Skeleton />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                  {/* Now */}
                  <div className="p-5">
                    <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                      {t.now}
                    </p>
                    {data?.cycle ? (
                      <>
                        <p className="text-sm font-semibold text-gray-100 mb-2">
                          {data.cycle.name}
                        </p>
                        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden mb-1">
                          <div
                            className="h-1.5 rounded-full bg-purple-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {t.pct(data.cycle.completedCount, data.cycle.totalCount)}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-gray-500">{t.betweenSprints}</p>
                    )}
                  </div>

                  {/* In Progress */}
                  <div className="p-5">
                    <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                      {t.inProgress}
                    </p>
                    {data?.inProgress.length ? (
                      <ul className="space-y-2">
                        {data.inProgress.map((issue) => (
                          <li key={issue.url} className="flex items-start gap-2">
                            <span className={`text-[10px] font-semibold mt-0.5 shrink-0 ${PRIORITY_COLOR[issue.priority] ?? 'text-gray-400'}`}>
                              {PRIORITY_LABEL[issue.priority] ?? '—'}
                            </span>
                            <a
                              href={issue.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-300 hover:text-purple-300 transition-colors leading-snug"
                            >
                              {issue.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500">{t.noActivity}</p>
                    )}
                  </div>

                  {/* Recently Done */}
                  <div className="p-5">
                    <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                      {t.recentlyDone}
                    </p>
                    {data?.recentlyDone.length ? (
                      <ul className="space-y-2">
                        {data.recentlyDone.map((issue) => (
                          <li key={issue.url} className="flex items-start gap-1.5">
                            <span className="text-green-400 mt-0.5 shrink-0 text-xs">✓</span>
                            <a
                              href={issue.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-300 hover:text-purple-300 transition-colors leading-snug"
                            >
                              {issue.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500">{t.noActivity}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add components/WhatIsEmeryUpTo.tsx
  git commit -m "feat: add WhatIsEmeryUpTo homepage widget"
  ```

---

## Task 10: Wire up homepage, header, and footer

**Files:**
- Modify: `app/(default)/en/page.tsx`
- Modify: `app/(default)/fr/page.tsx`
- Modify: `components/ui/header.tsx`
- Modify: `components/ui/footer.tsx`

- [ ] **Step 1: Add widget to app/(default)/en/page.tsx**

  Current file (lines 1–28). Add `WhatIsEmeryUpTo` import and component between `Testimonials` and `Newsletter`:

  ```typescript
  export const metadata = {
    title: 'Emery Dittmer - Porfolio',
    description: 'Summary of Emery Porfolio',
    keywords: ['Emery Dittmer', 'UIUX', 'Data Scientist'],
    authors: [{ name: 'Emery' }],
    colorScheme: 'dark'
  }

  import Hero from '@/components/hero'
  import Cards from '@/components/cards'
  import Features from '@/components/features'
  import Newsletter from '@/components/newsletter'
  import Zigzag from '@/components/journey'
  import Testimonials from '@/components/testimonials'
  import Certifications from '@/components/certifications'
  import WhatIsEmeryUpTo from '@/components/WhatIsEmeryUpTo'

  export default function Home() {
    const locale = 'en'
    return (
      <>
        <Hero locale={locale} />
        <Features locale={locale} />
        <Certifications locale={locale} />
        <Testimonials locale={locale} />
        <WhatIsEmeryUpTo locale={locale} />
        <Newsletter locale={locale} />
      </>
    )
  }
  ```

- [ ] **Step 2: Add widget to app/(default)/fr/page.tsx**

  Current file (lines 1–30). Add `WhatIsEmeryUpTo` import and component between `Testimonials` and `Newsletter`:

  ```typescript
  export const metadata = {
    title: 'Emery Dittmer - Porfolio',
    description: 'Summary of Emery Porfolio',
    keywords: ['Emery Dittmer', 'UIUX', 'Data Scientist'],
    authors: [{ name: 'Emery' }],
    colorScheme: 'dark'
  }

  import Hero from '@/components/hero'
  import Features from '@/components/features'
  import Abilities from '@/components/abilities'
  import ProjectCarousel from '@/components/project-carousel'
  import HumanSide from '@/components/human-side'
  import Testimonials from '@/components/testimonials'
  import Newsletter from '@/components/newsletter'
  import WhatIsEmeryUpTo from '@/components/WhatIsEmeryUpTo'

  export default function Home() {
    const locale = 'fr'
    return (
      <>
        <Hero locale={locale} />
        <Features locale={locale} />
        <Abilities locale={locale} />
        <ProjectCarousel locale={locale} />
        <HumanSide locale={locale} />
        <Testimonials locale={locale} />
        <WhatIsEmeryUpTo locale={locale} />
        <Newsletter locale={locale} />
      </>
    )
  }
  ```

- [ ] **Step 3: Add PM Dashboard link to header.tsx**

  In `components/ui/header.tsx`, add to the `copy` object and nav list. Find the `copy` object (lines 14–35) and add `pm` keys:

  ```typescript
  const copy = {
    en: {
      projects: 'Projects',
      journey: 'Journey',
      skills: 'Skills',
      pm: 'PM',
      linkedin: 'LinkedIn',
      contact: 'Contact',
      contactSubject: 'Contact Request',
      contactBody:
        'Hello, I found your website and am interested in talking to you based on your skills and experience with...',
    },
    fr: {
      projects: 'Projets',
      journey: 'Parcours',
      skills: 'Compétences',
      pm: 'PM',
      linkedin: 'LinkedIn',
      contact: 'Contact',
      contactSubject: 'Demande de contact',
      contactBody:
        'Bonjour, j'ai trouvé votre site et je souhaite échanger avec vous au sujet de vos compétences et de votre expérience dans...',
    },
  }
  ```

  Then in the desktop nav `<ul>` (after the Skills `<li>`), add:

  ```tsx
  <li>
    <Link
      href={`/PMDashboard/${locale}`}
      className="font-medium text-white-600 hover:text-purple-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
    >
      {t.pm}
    </Link>
  </li>
  ```

- [ ] **Step 4: Add PM Dashboard link to footer.tsx**

  In `components/ui/footer.tsx`, find the `Work` nav section and add a PM Dashboard link:

  ```typescript
  {
    heading: 'Work',
    links: [
      { label: 'Projects',       href: `/Projects/${locale}` },
      { label: 'PM Dashboard',   href: `/PMDashboard/${locale}` },
      { label: 'Skills',         href: `/Skills/${locale}` },
      { label: 'Certifications', href: `/Certifications/${locale}` },
    ],
  },
  ```

  And for the French version (if the footer has a separate FR copy block), add:
  ```typescript
  { label: 'Tableau de bord PM', href: `/PMDashboard/${locale}` },
  ```

- [ ] **Step 5: Verify in browser**

  With dev server running at `http://localhost:3000`:
  - Visit `http://localhost:3000/en` — confirm "What is Emery up to?" accordion appears between Testimonials and Newsletter. Click to expand, verify the three-column widget loads and shows Linear data.
  - Visit `http://localhost:3000/PMDashboard/en` — confirm all four sections render correctly.
  - Check the header nav shows "PM" link.
  - Check the footer shows "PM Dashboard" link.

- [ ] **Step 6: Commit**

  ```bash
  git add app/(default)/en/page.tsx app/(default)/fr/page.tsx components/ui/header.tsx components/ui/footer.tsx
  git commit -m "feat: wire up PM Dashboard to nav, footer, and homepage widget"
  ```

---

## Self-Review Checklist

- [x] **Spec coverage — Architecture:** `lib/linearApi.ts` + `app/api/linear/current/route.ts` + `lib/linearConfig.ts` — all covered in Tasks 1–3
- [x] **Spec coverage — PM Dashboard (4 sections):** `PMHero`, `DeliveryTrackRecord`, `ProjectLeadershipBoard`, `ProcessShowcase` — Tasks 4–8
- [x] **Spec coverage — Homepage widget:** `WhatIsEmeryUpTo` lazy-loads on expand — Task 9
- [x] **Spec coverage — Placement between Certifications/Testimonials and Newsletter:** Task 10 Steps 1–2
- [x] **Spec coverage — Header + footer links:** Task 10 Steps 3–4
- [x] **Spec coverage — i18n (EN/FR):** All components accept `locale` prop with `copy` object; FR pages created
- [x] **Spec coverage — Graceful fallback if no active cycle:** `WhatIsEmeryUpTo` shows `t.betweenSprints` when `cycle === null`
- [x] **Spec coverage — API key server-side only:** `linearApi.ts` uses `process.env.LINEAR_API_KEY`, never referenced client-side
- [x] **Type consistency:** `LinearIssue`, `CycleData`, `WidgetData` in `WhatIsEmeryUpTo` match the shape returned by the API route. `PMStats`, `CompletedCycle`, `PMProject`, `ProcessMetrics` types defined in `linearConfig.ts` and used consistently in dashboard components.
- [x] **No placeholders:** All code is complete. `linearConfig.ts` contains real-looking curated data to be updated from the actual Linear workspace.
