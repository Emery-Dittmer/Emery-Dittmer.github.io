export const metadata = {
  title: 'Emery Dittmer - Porfolio',
  description: 'Summary of Emery Porfolio',
  keywords: ['Emery Dittmer', 'UIUX', 'Data Scientist'],
  authors: [{ name: 'Emery' }],
  colorScheme: 'dark'
}

import Hero from '@/components/hero'
import Cards from '@/components/cards'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/journey'
import Testimonials from '@/components/testimonials'
import Certifications from '@/components/certifications'
import ProjectCarousel from '@/components/project-carousel'

export default function Home() {
  const locale = 'en'
  return (
    <>
      <Hero locale={locale} />
      <ProjectCarousel locale={locale} />
      <Features locale={locale} />
      <Certifications locale={locale} />
      <Testimonials locale={locale} />
      <Newsletter locale={locale} />
    </>
  )
}
