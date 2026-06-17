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
  startDate: string
  endDate: string
  completedOnTime: boolean
  plannedIssues: number
  completedIssues: number
  portfolioProjectId?: string
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
  avgVelocity: number
  avgCompletionRate: number
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
