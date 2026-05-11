export const metadata = {
    title: 'Emery Dittmer - Porfolio',
    description: 'Summary of Emery Porfolio',
    keywords: ['Emery Dittmer', 'UIUX', 'Data Scientist'],
    authors: [{ name: 'Emery' }],
    colorScheme: 'dark'
  }
  
  import Cards from '@/components/cards'
  import Newsletter from '@/components/newsletter'
  import ProjectCarousel from '@/components/project-carousel'

  export default function Home() {
    const locale = 'en'
    return (
      <>
        <ProjectCarousel locale={locale} />
        <Cards locale={locale} />
        <Newsletter locale={locale} />
      </>
    )
  }
  
