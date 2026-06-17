export const metadata = {
  title: 'Tableau de bord PM — Emery Dittmer',
  description: 'Bilan de gestion de projet, métriques de livraison et maturité des processus.',
  keywords: ['Gestion de projet', 'CAPM', 'Scrum', 'Emery Dittmer'],
  colorScheme: 'dark',
}

import PMHero from '@/components/PMDashboard/PMHero'
import DeliveryTrackRecord from '@/components/PMDashboard/DeliveryTrackRecord'
import ProjectLeadershipBoard from '@/components/PMDashboard/ProjectLeadershipBoard'
import ProcessShowcase from '@/components/PMDashboard/ProcessShowcase'

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
