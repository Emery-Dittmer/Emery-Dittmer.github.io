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
  import Companies from '@/components/companies'
  import Skills from '@/components/skills'
  import Feature_Full from '@/components/features_full'

  
  export default function Home() {
    return (
      <>
        <p>test</p>
        <Skills />
        <Companies />
        <Feature_Full />
        <Newsletter />
      </>
    )
  }
  