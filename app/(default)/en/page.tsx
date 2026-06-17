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
import CollapsibleSection from '@/components/collapsible-section'
import WhatIsEmeryUpTo from '@/components/WhatIsEmeryUpTo'

export default function Home() {
  const locale = 'en'
  return (
    <>
      <Hero locale={locale} />
      <Features locale={locale} />
      <CollapsibleSection title="What I Bring to the Table">
        <Abilities locale={locale} />
      </CollapsibleSection>
      <CollapsibleSection title="Recent Highlights">
        <ProjectCarousel locale={locale} />
      </CollapsibleSection>
      <CollapsibleSection title="The Human Side">
        <HumanSide locale={locale} />
      </CollapsibleSection>
      <Testimonials locale={locale} />
      <WhatIsEmeryUpTo locale={locale} />
      <Newsletter locale={locale} />
    </>
  )
}
