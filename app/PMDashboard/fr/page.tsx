export const metadata = {
  title: 'Tableau de bord PM — Emery Dittmer',
  description: 'Bilan de gestion de projet, métriques de livraison et maturité des processus.',
  keywords: ['Gestion de projet', 'CAPM', 'Scrum', 'Emery Dittmer'],
  colorScheme: 'dark',
}

import PMHero from '@/components/PMDashboard/PMHero'
import PMTimeline from '@/components/PMDashboard/PMTimeline'
import DeliveryTrackRecord from '@/components/PMDashboard/DeliveryTrackRecord'
import ProcessShowcase from '@/components/PMDashboard/ProcessShowcase'
import IssueExplorer from '@/components/PMDashboard/IssueExplorer'

export default function PMDashboardPage() {
  const locale = 'fr'
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
