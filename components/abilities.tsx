import { Locale } from '@/lib/i18n'

export default function Abilities({ locale = 'en' }: { locale?: Locale }) {
  const copy = {
    en: {
      title: 'What I Bring to the Table',
      intro: 'A hybrid skill set spanning the full data lifecycle — from pipeline to presentation, strategy to execution.',
      areas: [
        {
          title: 'Data Science & ML',
          color: 'purple',
          skills: ['Python', 'Scikit-learn', 'XGBoost', 'Time-series forecasting', 'Feature engineering', 'A/B testing', 'R'],
          note: '5+ years building predictive models in production across pharma, retail, and finance.',
        },
        {
          title: 'BI & Visualization',
          color: 'blue',
          skills: ['Power BI', 'Tableau', 'Looker Studio', 'DAX', 'SQL', 'Figma', 'D3 / React charts'],
          note: 'Led a $1M+ Qlik → Power BI migration. Self-serve dashboards that teams still use post-handoff.',
        },
        {
          title: 'Data Engineering',
          color: 'cyan',
          skills: ['Databricks', 'Azure', 'Microsoft Fabric', 'PySpark', 'Delta Lake', 'Medallion architecture', 'dbt'],
          note: 'Databricks Certified Data Engineer Associate. Azure & Fabric certified.',
        },
        {
          title: 'Low-Code & Automation',
          color: 'orange',
          skills: ['Alteryx', 'VBA', 'Power Automate', 'Excel (advanced)', 'Orange', 'Dataiku'],
          note: 'Alteryx Advanced certified. Automation pipelines cutting hours of manual work per week.',
        },
        {
          title: 'Project Delivery',
          color: 'green',
          skills: ['Agile / Scrum', 'Stakeholder mgmt', 'Risk tracking', 'Program management', 'Cross-functional teams', 'JIRA'],
          note: 'CAPM & PSM I certified. $2M+ in documented savings across concurrent programs.',
        },
        {
          title: 'Geospatial & Niche',
          color: 'pink',
          skills: ['ESRI / ArcGIS', 'Mapbox GL', 'GTFS / transit data', 'Web scraping', 'API integration', 'Next.js'],
          note: 'Side projects from live train maps to transit catchment tools.',
        },
      ],
      cta: 'See full skills breakdown →',
    },
    fr: {
      title: 'Ce que j\'apporte',
      intro: 'Un profil hybride couvrant tout le cycle de vie des données — du pipeline à la présentation, de la stratégie à l\'exécution.',
      areas: [
        {
          title: 'Science des données & ML',
          color: 'purple',
          skills: ['Python', 'Scikit-learn', 'XGBoost', 'Prévision de séries temporelles', 'Feature engineering', 'Tests A/B', 'R'],
          note: '5+ ans à construire des modèles prédictifs en production (pharma, retail, finance).',
        },
        {
          title: 'BI & Visualisation',
          color: 'blue',
          skills: ['Power BI', 'Tableau', 'Looker Studio', 'DAX', 'SQL', 'Figma', 'D3 / React charts'],
          note: 'Migration Qlik → Power BI de plus d\'1 M$. Tableaux de bord en libre-service utilisés après livraison.',
        },
        {
          title: 'Ingénierie des données',
          color: 'cyan',
          skills: ['Databricks', 'Azure', 'Microsoft Fabric', 'PySpark', 'Delta Lake', 'Architecture médaillon', 'dbt'],
          note: 'Certifié Databricks Data Engineer Associate. Certifié Azure & Fabric.',
        },
        {
          title: 'Low-Code & Automatisation',
          color: 'orange',
          skills: ['Alteryx', 'VBA', 'Power Automate', 'Excel (avancé)', 'Orange', 'Dataiku'],
          note: 'Certifié Alteryx Advanced. Pipelines automatisés économisant des heures de travail manuel.',
        },
        {
          title: 'Gestion de projets',
          color: 'green',
          skills: ['Agile / Scrum', 'Gestion des parties prenantes', 'Suivi des risques', 'Pilotage de programme', 'Équipes pluridisciplinaires', 'JIRA'],
          note: 'Certifié CAPM & PSM I. Plus de 2 M$ d\'économies documentées sur des programmes simultanés.',
        },
        {
          title: 'Géospatial & Niche',
          color: 'pink',
          skills: ['ESRI / ArcGIS', 'Mapbox GL', 'GTFS / données transport', 'Web scraping', 'Intégration API', 'Next.js'],
          note: 'Projets personnels : carte de trains en direct, outils de desserte transport.',
        },
      ],
      cta: 'Voir le détail des compétences →',
    },
  }
  const t = copy[locale]

  const colorMap: Record<string, { ring: string; badge: string; dot: string }> = {
    purple: { ring: 'border-purple-700/40', badge: 'bg-purple-900/30 text-purple-300', dot: 'bg-purple-500' },
    blue:   { ring: 'border-blue-700/40',   badge: 'bg-blue-900/30 text-blue-300',     dot: 'bg-blue-500'   },
    cyan:   { ring: 'border-cyan-700/40',    badge: 'bg-cyan-900/30 text-cyan-300',     dot: 'bg-cyan-500'   },
    orange: { ring: 'border-orange-700/40',  badge: 'bg-orange-900/30 text-orange-300', dot: 'bg-orange-500' },
    green:  { ring: 'border-green-700/40',   badge: 'bg-green-900/30 text-green-300',   dot: 'bg-green-500'  },
    pink:   { ring: 'border-pink-700/40',    badge: 'bg-pink-900/30 text-pink-300',     dot: 'bg-pink-500'   },
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">{t.title}</h2>
            <p className="text-xl text-gray-400">{t.intro}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
            {t.areas.map((area) => {
              const c = colorMap[area.color] ?? colorMap.purple
              return (
                <div
                  key={area.title}
                  className={`rounded-xl border ${c.ring} bg-gray-900/50 p-6 flex flex-col gap-4`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${c.dot}`} />
                    <h4 className="font-semibold text-gray-100 text-base">{area.title}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((s) => (
                      <span key={s} className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-400 mt-auto leading-relaxed">{area.note}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <a
              href={`/Skills/${locale}`}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
            >
              {t.cta}
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
