export const metadata = {
  title: 'PM Dashboard — Emery Dittmer',
  description: 'Project management track record, delivery metrics, and process maturity.',
  keywords: ['Project Management', 'CAPM', 'Scrum', 'Emery Dittmer'],
  colorScheme: 'dark',
}

import PMHero from '@/components/PMDashboard/PMHero'
import PMTimeline from '@/components/PMDashboard/PMTimeline'
import DeliveryTrackRecord from '@/components/PMDashboard/DeliveryTrackRecord'
import ProcessShowcase from '@/components/PMDashboard/ProcessShowcase'
import IssueExplorer from '@/components/PMDashboard/IssueExplorer'

export default function PMDashboardPage() {
  const locale = 'en'
  return (
    <>
      <PMHero locale={locale} />
      <PMTimeline locale={locale} />
      <DeliveryTrackRecord locale={locale} />
      <ProcessShowcase locale={locale} />
      <IssueExplorer locale={locale} />
    </>
  )
}
