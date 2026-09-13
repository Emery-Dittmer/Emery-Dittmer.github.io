// Hand-curated PM narrative data. Everything else the dashboard shows is
// derived from Linear — see lib/linearDashboard.ts.

export type PMStats = {
  projectsLed: number
  peakTeamSize: number
  largestBudget: string
  combinedImpact: string
  certifications: string[]
}

export const pmStats: PMStats = {
  projectsLed: 8,
  peakTeamSize: 5,
  largestBudget: '$150K',
  combinedImpact: '$2M+',
  certifications: ['CAPM', 'PSM I'],
}
