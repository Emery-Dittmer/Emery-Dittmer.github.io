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
