import { Locale } from '@/lib/i18n'

export default function Features({ locale = 'en' }: { locale?: Locale }) {
  const copy = {
    en: {
      title: ‘What does Emery bring to the table?’,
      intro:
        ‘From statistical modelling to stakeholder delivery — Emery combines deep data science expertise with structured project leadership to ship results that matter.’,
      items: [
        {
          title: ‘Data Science’,
          body:
            ‘Building predictive models, forecasting pipelines, and machine learning systems that translate messy real-world data into reliable, actionable outputs for business teams.’,
          emphasis:
            ‘5+ years of modelling, forecasting, and ML implementation across finance, manufacturing, retail, and pharmaceuticals.’,
        },
        {
          title: ‘Data Analytics & BI’,
          body:
            ‘Turning raw data into clear, self-serve intelligence through dashboards, KPI frameworks, and analytics platforms that business users can operate independently.’,
          emphasis:
            ‘6+ years of Power BI, Tableau, and Alteryx delivery — including a $1M+ Qlik-to-Power BI migration.’,
        },
        {
          title: ‘Project Management’,
          body:
            ‘Leading cross-functional data and engineering teams from requirements through launch — with structured agile delivery, stakeholder alignment, and budget ownership.’,
          emphasis:
            ‘CAPM and Scrum Master (PSM I) certified. 4+ years managing teams of up to 5 and budgets up to $150K.’,
        },
      ],
    },
    fr: {
      title: ‘Ce qu’Emery apporte’,
      intro:
        ‘De la modélisation statistique à la livraison aux parties prenantes — Emery allie une expertise approfondie en science des données à un leadership de projet structuré pour livrer des résultats concrets.’,
      items: [
        {
          title: ‘Science des données’,
          body:
            ‘Conception de modèles prédictifs, de pipelines de prévision et de systèmes d’apprentissage automatique qui transforment des données réelles complexes en sorties fiables et exploitables.’,
          emphasis:
            ‘Plus de 5 ans de modélisation, prévision et mise en œuvre de ML en finance, fabrication, commerce de détail et pharmaceutique.’,
        },
        {
          title: ‘Analytique & BI’,
          body:
            ‘Transformer les données brutes en intelligence claire et en libre-service grâce à des tableaux de bord, des cadres de KPI et des plateformes analytiques accessibles aux utilisateurs métier.’,
          emphasis:
            ‘Plus de 6 ans de livraison Power BI, Tableau et Alteryx — dont une migration Qlik vers Power BI de plus d’un million de dollars.’,
        },
        {
          title: ‘Gestion de projet’,
          body:
            ‘Piloter des équipes data et ingénierie pluridisciplinaires de la définition des besoins au lancement — avec une livraison agile structurée, l’alignement des parties prenantes et la gestion budgétaire.’,
          emphasis:
            ‘Certifié CAPM et Scrum Master (PSM I). Plus de 4 ans à diriger des équipes de jusqu’à 5 personnes et des budgets allant jusqu’à 150 000 $.’,
        },
      ],
    },
  }
  const t = copy[locale]

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
      
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">{t.title}</h2>
            <p className="text-xl text-gray-400">{t.intro}</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <path className="stroke-current text-purple-100" d="M30 39.313l-4.18 2.197L27 34.628l-5-4.874 6.91-1.004L32 22.49l3.09 6.26L42 29.754l-3 2.924" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd" />
                <path className="stroke-current text-purple-300" d="M43 42h-9M43 37h-9" strokeLinecap="square" strokeWidth="2" />
              </svg>
              <h4 className="h4 mb-2">{t.items[0].title}</h4>
              <p className="text-lg text-gray-400 text-center">
                {t.items[0].body}
                &nbsp;
                <em><strong className="white-text"> 
                {t.items[0].emphasis}
                </strong></em>
                </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle className="fill-current text-purple-600" cx="32" cy="32" r="32" />
                <path className="stroke-current text-purple-100" strokeWidth="2" strokeLinecap="square" d="M21 23h22v18H21z" fill="none" fillRule="evenodd" />
                <path className="stroke-current text-purple-300" d="M26 28h12M26 32h12M26 36h5" strokeWidth="2" strokeLinecap="square" />
              </svg>
              <h4 className="h4 mb-2">{t.items[1].title}</h4>
              <p className="text-lg text-gray-400 text-center">
                {t.items[1].body}
                &nbsp;
                <em><strong className="white-text">
                {t.items[1].emphasis}
                
{/*                 <a href="/Visualizations" className="text-purple underline">
                Click here for details.
                </a> */}
                </strong></em>
              </p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <g transform="translate(21 21)" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                  <ellipse className="stroke-current text-purple-300" cx="11" cy="11" rx="5.5" ry="11" />
                  <path className="stroke-current text-purple-100" d="M11 0v22M0 11h22" />
                  <circle className="stroke-current text-purple-100" cx="11" cy="11" r="11" />
                </g>
              </svg>
              <h4 className="h4 mb-2">{t.items[2].title}</h4>
              <p className="text-lg text-gray-400 text-center">
                {t.items[2].body}
                &nbsp;
                <em><strong className="white-text">
                {t.items[2].emphasis}
              
{/*                 <a href="/Visualizations" className="text-purple underline">
                Click here for details.
                </a> */}
                </strong></em>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
