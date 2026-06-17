export const metadata = {
  title: 'PM Dashboard — Emery Dittmer',
  description: 'Project management track record, delivery metrics, and process maturity.',
  keywords: ['Project Management', 'CAPM', 'Scrum', 'Emery Dittmer'],
  colorScheme: 'dark',
}

import PMHero from '@/components/PMDashboard/PMHero'
import DeliveryTrackRecord from '@/components/PMDashboard/DeliveryTrackRecord'
import ProjectLeadershipBoard from '@/components/PMDashboard/ProjectLeadershipBoard'
import ProcessShowcase from '@/components/PMDashboard/ProcessShowcase'

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
