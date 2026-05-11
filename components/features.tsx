import { Locale } from '@/lib/i18n'

export default function Features({ locale = 'en' }: { locale?: Locale }) {
  const copy = {
    en: {
      title: 'Delivering data projects end to end',
      intro:
        'Most data work stalls between insight and action. Emery bridges that gap — leading projects from problem definition to production, with the technical depth to build what gets decided.',
      items: [
        {
          title: 'Project Delivery',
          body:
            'Running data and engineering projects from brief to launch — scope, team, timeline, and stakeholders managed in one place. Agile ceremonies, structured risk tracking, and clear ownership at every stage.',
          emphasis:
            'CAPM & PSM I certified. 4+ years leading cross-functional teams up to 5, with $2M+ in documented cost savings delivered across concurrent programs.',
        },
        {
          title: 'Data Science & Analytics',
          body:
            'Building predictive models, forecasting pipelines, and self-serve BI platforms that teams keep using after handoff — not just polished demos. Python, Power BI, Databricks, and Alteryx in production.',
          emphasis:
            '5+ years across finance, pharma, retail, and manufacturing — including a $1M+ Qlik-to-Power BI migration and beverage demand forecasting at scale.',
        },
        {
          title: 'Business Impact',
          body:
            'Every technical output is tied to a decision: a cost to cut, a risk to reduce, an operation to speed up. The work is scoped around measurable outcomes, not deliverables for their own sake.',
          emphasis:
            'Projects span RBC, PwC, Coveo, Molson Coors, and Apotex — each anchored to a quantified business problem and a result that can be reported upward.',
        },
      ],
    },
    fr: {
      title: 'Livrer des projets data de bout en bout',
      intro:
        "La plupart des projets data échouent entre l'analyse et l'action. Emery comble cet écart — pilotant les projets de la définition du problème à la production, avec la profondeur technique pour construire ce qui a été décidé.",
      items: [
        {
          title: 'Livraison de projets',
          body:
            "Piloter des projets data et ingénierie de la définition à la mise en production — périmètre, équipe, calendrier et parties prenantes gérés en un seul endroit. Cérémonies agiles, suivi structuré des risques et responsabilités claires à chaque étape.",
          emphasis:
            "Certifié CAPM et PSM I. Plus de 4 ans à diriger des équipes pluridisciplinaires jusqu'à 5 personnes, avec plus de 2 M$ d'économies documentées sur des programmes simultanés.",
        },
        {
          title: 'Science des données & BI',
          body:
            "Conception de modèles prédictifs, de pipelines de prévision et de plateformes BI en libre-service que les équipes continuent d'utiliser après la livraison. Python, Power BI, Databricks et Alteryx en production.",
          emphasis:
            "Plus de 5 ans en finance, pharma, commerce de détail et fabrication — dont une migration Qlik vers Power BI de plus d'1 M$ et des prévisions de demande à grande échelle.",
        },
        {
          title: 'Impact business',
          body:
            "Chaque livrable technique est lié à une décision : un coût à réduire, un risque à diminuer, une opération à accélérer. Le travail est cadré autour de résultats mesurables, pas de livrables pour eux-mêmes.",
          emphasis:
            "Projets chez RBC, PwC, Coveo, Molson Coors et Apotex — chacun ancré dans un problème business quantifié et un résultat communicable à la direction.",
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
                </strong></em>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
