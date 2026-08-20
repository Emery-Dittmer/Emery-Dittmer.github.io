export const metadata = {
  title: 'Emery Dittmer - Porfolio',
  description: 'Summary of Emery Porfolio',
  keywords: ['Emery Dittmer', 'UIUX', 'Data Scientist'],
  authors: [{ name: 'Emery' }],
  colorScheme: 'dark'
}

import { Suspense } from 'react'
import Cards from '@/components/cards'
import Newsletter from '@/components/newsletter'
import ProjectCarousel from '@/components/project-carousel'
import ProjectsByTheme from '@/components/projects-by-theme'

export default function Home() {
  const locale = 'fr'
  return (
    <>
      <ProjectCarousel locale={locale} />
      <ProjectsByTheme locale={locale} />
      <Suspense fallback={null}>
        <Cards locale={locale} />
      </Suspense>
      <Newsletter locale={locale} />
    </>
  )
}
