export const metadata = {
    title: 'Emery Dittmer - Porfolio',
    description: 'Summary of Emery Porfolio',
    keywords: ['Emery Dittmer', 'UIUX', 'Data Scientist'],
    authors: [{ name: 'Emery' }],
    colorScheme: 'dark'
  }
  
  import Companies from '@/components/companies'
  import Skills from '@/components/skills'
  import Feature_Full from '@/components/features_full'
  import Newsletter from '@/components/newsletter'
  import SkillsHero from '@/components/skills-hero'


  export default function Home() {
    const locale = 'en'
    return (
      <>
        <SkillsHero locale={locale} />
        <Skills locale={locale} />
        <Companies locale={locale} />
        <Feature_Full locale={locale} />
        <Newsletter locale={locale} />
      </>
    )
  }
  
