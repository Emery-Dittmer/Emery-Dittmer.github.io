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

export default function Home() {
  const locale = 'fr'
  return (
    <>
      <Hero locale={locale} />
      <Features locale={locale} />
      <Abilities locale={locale} />
      <ProjectCarousel locale={locale} />
      <HumanSide locale={locale} />
      <Testimonials locale={locale} />
      <Newsletter locale={locale} />
    </>
  )
}
