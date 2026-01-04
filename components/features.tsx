import { Locale } from '@/lib/i18n'

export default function Features({ locale = 'en' }: { locale?: Locale }) {
  const copy = {
    en: {
      title: 'What does Emery bring to the table?',
      intro:
        'Accelerating data to insights is easy with the right mindset and skills. Emery Brings these skills and mindsets to every role',
      items: [
        {
          title: 'Data Strategy',
          body:
            'Data strategy, with a focus on delivering value for business users, involves defining the processes, technology, and rules necessary for managing information assets effectively.',
          emphasis:
            'More than 4 years of successful ETL, and process automoation implementation.',
        },
        {
          title: 'Data Visualizations',
          body:
            'Data visualization, geared toward business users, is the art of representing data graphically, aiding in understanding complex information at a glance.',
          emphasis:
            '6+ years of dashboarding, KPI development, custum visulais and geographic data visualizations.',
        },
        {
          title: 'Project Management',
          body:
            "Project management, with a business user's perspective in mind, is the systematic planning and organization of resources to achieve project goals efficiently.",
          emphasis:
            'Emery brings over 3 years of successful project management including a CAPM certification.',
        },
      ],
    },
    fr: {
      title: 'Ce qu’Emery apporte',
      intro:
        'Accélérer le passage des données aux insights est plus simple avec le bon état d’esprit et les bonnes compétences. Emery apporte ces compétences et cette mentalité à chaque rôle.',
      items: [
        {
          title: 'Stratégie data',
          body:
            'La stratégie data, axée sur la valeur pour les utilisateurs métier, consiste à définir les processus, technologies et règles nécessaires pour gérer efficacement les actifs informationnels.',
          emphasis:
            'Plus de 4 ans d’implémentation réussie d’ETL et d’automatisation de processus.',
        },
        {
          title: 'Visualisation de données',
          body:
            'La visualisation de données, orientée utilisateurs métier, est l’art de représenter les données graphiquement afin de comprendre rapidement des informations complexes.',
          emphasis:
            'Plus de 6 ans de tableaux de bord, développement de KPI, visualisations sur mesure et visualisations géographiques.',
        },
        {
          title: 'Gestion de projet',
          body:
            'La gestion de projet, pensée pour les utilisateurs métier, est la planification et l’organisation systématiques des ressources pour atteindre efficacement les objectifs.',
          emphasis:
            'Emery apporte plus de 3 ans de gestion de projet réussie, dont une certification CAPM.',
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
