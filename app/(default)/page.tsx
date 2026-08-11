export const metadata = {
  title: 'Emery Dittmer - Porfolio',
  description: 'Summary of Emery Porfolio',
  keywords: ['Emery Dittmer', 'UIUX', 'Data Scientist'],
  authors: [{ name: 'Emery' }],
  colorScheme: 'dark'
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import ProjectCarousel from '@/components/project-carousel'
import HumanSide from '@/components/human-side'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import CollapsibleSection from '@/components/collapsible-section'

export default function Home() {
  const locale = 'en'
  return (
    <>
      <Hero locale={locale} />
      <Features locale={locale} />
      <CollapsibleSection title="Recent Highlights">
        <ProjectCarousel locale={locale} />
      </CollapsibleSection>
      <CollapsibleSection title="The Human Side">
        <HumanSide locale={locale} />
      </CollapsibleSection>
      <Testimonials locale={locale} />
      <Newsletter locale={locale} />
    </>
  )
}
