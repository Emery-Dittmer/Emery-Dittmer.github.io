# PM Dashboard & Linear Integration — Design Spec
**Date:** 2026-06-07  
**Status:** Approved

---

## Overview

Add a dedicated Project Management showcase page to the portfolio and a live "What is Emery up to?" homepage widget, both powered by a personal Linear workspace. The goal is to demonstrate delivery track record, project leadership, and process maturity — primarily to recruiters and hiring managers.

---

## Architecture

### Approach
Hybrid: curated static data for the PM Dashboard page (fast, always renders, narrative is controlled) + a live server-side Linear API proxy for the homepage widget (real-time, lazy-loaded).

### New Files / Routes

| Path | Purpose |
|------|---------|
| `app/PMDashboard/en/page.tsx` | English PM Dashboard page |
| `app/PMDashboard/fr/page.tsx` | French PM Dashboard page |
| `app/PMDashboard/en/layout.tsx` | English layout wrapper |
| `app/PMDashboard/fr/layout.tsx` | French layout wrapper |
| `app/api/linear/current/route.ts` | Server-side Linear GraphQL proxy |
| `lib/linearConfig.ts` | Curated static config for dashboard (mirrors projectsConfig.ts pattern) |
| `components/PMDashboard/PMHero.tsx` | Stats bar section |
| `components/PMDashboard/DeliveryTrackRecord.tsx` | Completed cycles/sprints section |
| `components/PMDashboard/ProjectLeadershipBoard.tsx` | Projects + milestones section |
| `components/PMDashboard/ProcessShowcase.tsx` | Velocity & activity metrics section |
| `components/WhatIsEmeryUpTo.tsx` | Homepage accordion widget |

### Data Flow

**PM Dashboard page (build-time):**
- `lib/linearConfig.ts` holds hand-curated data drawn from the Linear workspace: completed cycles with planned/completed counts, project list with milestone status, aggregate metrics.
- No runtime API call. Page is static and fast.

**Homepage widget (runtime):**
- Component renders collapsed. On first user-triggered expand, client fetches `/api/linear/current`.
- API route calls Linear GraphQL server-side using `process.env.LINEAR_API_KEY`. Returns JSON: current cycle progress, up to 4 in-progress issues, up to 4 issues completed in the last 14 days.
- API key never exposed to the browser.

### Environment Variable
```
LINEAR_API_KEY=lin_api_...   # stored in .env.local only, never committed
```

---

## Linear GraphQL Data

The API route (`/api/linear/current`) queries:
- **Active cycle**: name, start date, end date, issue counts (completed vs total)
- **In-progress issues**: title, priority, URL (up to 4)
- **Recently completed issues**: title, completedAt, URL (issues completed in last 14 days, up to 4)

Graceful fallback: if no active cycle exists, widget shows "Between sprints — last completed: [cycle name]".

---

## PM Dashboard Page — Sections

### 1. PM Hero / Stats Bar
Static data from `linearConfig.ts`. Displays at-a-glance PM credentials:
- Total projects led
- Total team members managed (peak / cumulative)
- Largest budget managed
- Combined savings / impact delivered
- Certifications: CAPM, PSM I

### 2. Delivery Track Record
Card grid of completed Linear cycles. Each card shows:
- Cycle name + date range
- Issues planned vs. completed (mini progress bar)
- On-time badge: green if closed on/before end date, amber if overrun

### 3. Project Leadership Board
Card grid or table of Linear projects. Each entry shows:
- Project name + current status (In Progress / Completed)
- Milestone count + completed milestones
- Priority distribution (small stacked bar: Urgent / High / Medium / Low)
- Link to matching `projectsConfig` portfolio page where one exists

### 4. Process Showcase
Metrics strip showing aggregate patterns:
- Average cycle velocity (issues closed per sprint)
- Average completion rate across all cycles
- Most-used labels / issue types
- Activity heatmap (issues closed per week) — reuses existing `ContributionGraph` component

---

## Homepage Widget — "What is Emery up to?"

### Placement
Between `Certifications` and `Newsletter` on `app/(default)/en/page.tsx` (and fr equivalent).

### Behavior
- Renders as a single collapsed row with a chevron and the label "What is Emery up to?"
- Expanding triggers the first (and only) fetch to `/api/linear/current`
- Shows a loading skeleton while the API call resolves
- Smooth height-transition animation on expand/collapse

### Expanded Layout (three columns)
| Column | Content |
|--------|---------|
| **Now** | Active cycle name + progress bar (e.g. "Sprint 12 · 68% complete") |
| **In Progress** | Up to 4 active issues with title + priority icon |
| **Recently Done** | Up to 4 issues completed in last 14 days with checkmark |

---

## Internationalisation
Both the PM Dashboard page and the homepage widget follow the existing EN/FR pattern. UI labels (section headings, column titles, badge text) are passed via the `locale` prop or a local translation map in each component. Linear data (issue titles, cycle names) is displayed as-is since it comes from the user's own workspace.

---

## Error Handling
- API route returns `{ error: true }` on Linear API failure. Widget shows a neutral "Check back soon" state — never an error message visible to visitors.
- Dashboard page has no runtime dependency so it cannot fail at render time.

---

## Out of Scope
- Writeback to Linear from the portfolio (read-only integration)
- Webhooks or real-time push updates
- French translation of Linear issue content
- Auth / per-visitor personalisation
