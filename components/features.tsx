'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Locale } from '@/lib/i18n'
import Abilities, { getAbilityAreas, ABILITY_COLOR_MAP, SKILL_META } from '@/components/abilities'

// Maps each triangle vertex (by index, matching `items`/`VERTS`) to indices
// into the Abilities `areas` array, which is order-identical across locales:
// 0 Data Science & ML, 1 BI & Visualization, 2 Data Engineering,
// 3 Low-Code & Automation, 4 Project Delivery, 5 Geospatial & Niche.
const VERTEX_ABILITY_INDICES = [
  [4],        // Project Delivery
  [0, 1, 2],  // Data Science & Analytics
  [3, 5],     // Business Impact
]

// Popout-only split of the "Data Science & ML" area (index 0) into a leaner
// stats/forecasting card plus a dedicated AI/modeling card, so the Data
// Science & Analytics vertex renders 4 compact cards instead of 3 wider ones.
// Skills are the same ones already listed in abilities.tsx — none invented.
const AI_SPLIT = {
  en: {
    dataScience: { title: 'Data Science & ML', skills: ['Python', 'Time-series forecasting', 'Feature engineering', 'A/B testing', 'R'] },
    ai:          { title: 'AI & Modeling',      skills: ['Scikit-learn', 'XGBoost'], note: 'Applied ML modeling — from feature engineering through model selection and validation.' },
  },
  fr: {
    dataScience: { title: 'Science des données & ML', skills: ['Python', 'Prévision de séries temporelles', 'Feature engineering', 'Tests A/B', 'R'] },
    ai:          { title: 'IA & Modélisation',          skills: ['Scikit-learn', 'XGBoost'], note: "Modélisation ML appliquée — du feature engineering à la sélection et validation de modèles." },
  },
}

// Vertex positions as [left%, top%] of the square graphic area — fully
// percentage-based so the triangle scales cleanly at any container size
// instead of relying on a fixed pixel height. Icons are centered on their
// point via translate(-50%, -50%).
const VERTS = [
  { left: 50, top: 8  },   // Project Delivery  — top center
  { left: 8,  top: 88 },   // Data Science       — bottom left
  { left: 92, top: 88 },   // Business Impact    — bottom right
]

// Same points, used as the connecting-line endpoints — kept identical to
// VERTS (not a separate hand-tuned set) so the lines always meet the icon
// centers exactly regardless of viewport size.
const LINE_PTS = VERTS.map((v) => [v.left, v.top])

const SVGS = [
  <svg key="0" className="w-16 h-16" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
    <path className="stroke-current text-purple-100" d="M30 39.313l-4.18 2.197L27 34.628l-5-4.874 6.91-1.004L32 22.49l3.09 6.26L42 29.754l-3 2.924" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd" />
    <path className="stroke-current text-purple-300" d="M43 42h-9M43 37h-9" strokeLinecap="square" strokeWidth="2" />
  </svg>,
  <svg key="1" className="w-16 h-16" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle className="fill-current text-purple-600" cx="32" cy="32" r="32" />
    <path className="stroke-current text-purple-100" strokeWidth="2" strokeLinecap="square" d="M21 23h22v18H21z" fill="none" fillRule="evenodd" />
    <path className="stroke-current text-purple-300" d="M26 28h12M26 32h12M26 36h5" strokeWidth="2" strokeLinecap="square" />
  </svg>,
  <svg key="2" className="w-16 h-16" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
    <g transform="translate(21 21)" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
      <ellipse className="stroke-current text-purple-300" cx="11" cy="11" rx="5.5" ry="11" />
      <path className="stroke-current text-purple-100" d="M11 0v22M0 11h22" />
      <circle className="stroke-current text-purple-100" cx="11" cy="11" r="11" />
    </g>
  </svg>,
]

export default function Features({ locale = 'en' }: { locale?: Locale }) {
  const [active, setActive] = useState<number | null>(null)
  const [showSkills, setShowSkills] = useState(false)

  const copy = {
    en: {
      title: 'I specialize in laying product foundations',
      intro: 'Then building on those foundations technically to deliver business impact.',
      cta: 'Have a project to talk about?',
      ctaLink: 'Let’s chat →',
      skillsToggle: 'See the full skill breakdown',
      exploreHint: 'Click a node to explore',
      items: [
        {
          title: 'Project Delivery',
          body: 'Running data and engineering projects from brief to launch — scope, team, timeline, and stakeholders managed in one place. Agile ceremonies, structured risk tracking, and clear ownership at every stage.',
          emphasis: 'CAPM & PSM I certified. 4+ years leading cross-functional teams up to 5, with $2M+ in documented cost savings delivered across concurrent programs.',
        },
        {
          title: 'Data Science & Analytics',
          body: 'Building predictive models, forecasting pipelines, and self-serve BI platforms that teams keep using after handoff — not just polished demos. Python, Power BI, Databricks, and Alteryx in production.',
          emphasis: '5+ years across finance, pharma, retail, and manufacturing — including a $1M+ Qlik-to-Power BI migration and beverage demand forecasting at scale.',
        },
        {
          title: 'Business Impact',
          body: 'Every technical output is tied to a decision: a cost to cut, a risk to reduce, an operation to speed up. The work is scoped around measurable outcomes, not deliverables for their own sake.',
          emphasis: 'Projects span RBC, PwC, Coveo, Molson Coors, and Apotex — each anchored to a quantified business problem and a result that can be reported upward.',
        },
      ],
    },
    fr: {
      title: 'Je me spécialise dans la mise en place de fondations produit',
      intro: "Puis je construis sur ces fondations, techniquement, pour livrer un impact business.",
      cta: 'Un projet dont vous aimeriez discuter ?',
      ctaLink: 'Discutons-en →',
      skillsToggle: 'Voir le détail complet des compétences',
      exploreHint: 'Cliquez sur un nœud pour explorer',
      items: [
        {
          title: 'Livraison de projets',
          body: "Piloter des projets data et ingénierie de la définition à la mise en production — périmètre, équipe, calendrier et parties prenantes gérés en un seul endroit. Cérémonies agiles, suivi structuré des risques et responsabilités claires à chaque étape.",
          emphasis: "Certifié CAPM et PSM I. Plus de 4 ans à diriger des équipes pluridisciplinaires jusqu'à 5 personnes, avec plus de 2 M$ d'économies documentées sur des programmes simultanés.",
        },
        {
          title: 'Science des données & BI',
          body: "Conception de modèles prédictifs, de pipelines de prévision et de plateformes BI en libre-service que les équipes continuent d'utiliser après la livraison. Python, Power BI, Databricks et Alteryx en production.",
          emphasis: "Plus de 5 ans en finance, pharma, commerce de détail et fabrication — dont une migration Qlik vers Power BI de plus d'1 M$ et des prévisions de demande à grande échelle.",
        },
        {
          title: 'Impact business',
          body: "Chaque livrable technique est lié à une décision : un coût à réduire, un risque à diminuer, une opération à accélérer. Le travail est cadré autour de résultats mesurables, pas de livrables pour eux-mêmes.",
          emphasis: "Projets chez RBC, PwC, Coveo, Molson Coors et Apotex — chacun ancré dans un problème business quantifié et un résultat communicable à la direction.",
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
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">{t.title}</h2>
            <p className="text-xl text-gray-400 mb-4">{t.intro}</p>
            <p className="text-sm text-gray-500">
              {t.cta}{' '}
              <a
                href={`mailto:emery.dittmer@gmail.com?subject=${encodeURIComponent(t.cta)}`}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {t.ctaLink}
              </a>
            </p>
          </div>

          {/* Triangle graphic — square-ish, percentage-based so it scales
              cleanly at any width instead of pinning a fixed pixel height */}
          <div className="relative mx-auto w-full max-w-[420px] aspect-[6/5]">

            {/* Connecting lines — viewBox matches VERTS' own 0-100 percentage
                space 1:1, so "none" here just maps the box uniformly with no
                distortion, unlike stretching a 100x100 box onto a fixed
                480x360 rect. */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {LINE_PTS.map((pt, i) => {
                const next = LINE_PTS[(i + 1) % 3]
                return (
                  <line
                    key={i}
                    x1={pt[0]}   y1={pt[1]}
                    x2={next[0]} y2={next[1]}
                    stroke="rgba(147,51,234,0.25)"
                    strokeWidth="0.4"
                    strokeDasharray="2 1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>

            {/* Icon buttons */}
            {t.items.map((item, i) => (
              <button
                key={item.title}
                style={{
                  position: 'absolute',
                  left: `${VERTS[i].left}%`,
                  top: `${VERTS[i].top}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setActive(active === i ? null : i)}
                className="flex flex-col items-center gap-1.5 sm:gap-2 group focus:outline-none"
                aria-expanded={active === i}
                aria-label={item.title}
              >
                <div className={`relative transition-all duration-200 rounded-full
                  ${active === i
                    ? 'shadow-[0_0_24px_rgba(147,51,234,0.65)] scale-110'
                    : 'group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(147,51,234,0.35)]'
                  }`}
                >
                  {active !== i && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-purple-500/20 [animation-duration:2.5s]" />
                  )}
                  <div className="scale-75 sm:scale-100">
                    {SVGS[i]}
                  </div>
                </div>
                <span className={`text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150
                  ${active === i ? 'text-purple-300' : 'text-gray-400 group-hover:text-gray-200'}`}
                >
                  {item.title}
                </span>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-3">
            {t.exploreHint}
          </p>

          {/* Modal popout */}
          {active !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setActive(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

              <div
                className="relative z-10 flex flex-col lg:flex-row items-stretch gap-4 w-full max-w-md lg:max-w-4xl my-8"
                onClick={e => e.stopPropagation()}
              >
                {/* Card */}
                <div className="relative w-full lg:max-w-md rounded-2xl border border-purple-700/50 bg-gray-900 p-8 shadow-2xl shadow-purple-900/30 flex-shrink-0">
                  {/* Close button */}
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-200 transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Icon + title */}
                  <div className="flex flex-col items-center gap-3 mb-6">
                    {SVGS[active]}
                    <h4 className="font-semibold text-gray-100 text-xl">{t.items[active].title}</h4>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-5">{t.items[active].body}</p>
                  <p className="text-sm text-purple-300 font-medium border-t border-gray-800 pt-4">{t.items[active].emphasis}</p>
                </div>

                {/* Related skill cards */}
                <div className={`grid gap-3 sm:grid-cols-2 flex-shrink-0 ${active === 1 ? 'lg:w-96' : 'lg:grid-cols-1 lg:w-72'}`}>
                  {(() => {
                    const areas = getAbilityAreas(locale)
                    const split = AI_SPLIT[locale]
                    const cards = VERTEX_ABILITY_INDICES[active].flatMap((areaIdx) => {
                      const area = areas[areaIdx]
                      if (active === 1 && areaIdx === 0) {
                        return [
                          { ...split.dataScience, color: area.color, note: area.note },
                          { ...split.ai, color: 'violet' },
                        ]
                      }
                      return [area]
                    })
                    return cards.map((area) => {
                      const c = ABILITY_COLOR_MAP[area.color] ?? ABILITY_COLOR_MAP.purple
                      return (
                        <div
                          key={area.title}
                          className={`rounded-lg border ${c.ring} bg-gray-900 p-3.5 shadow-xl flex flex-col gap-2`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${c.dot}`} />
                            <h5 className="font-semibold text-gray-100 text-xs">{area.title}</h5>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {area.skills.map((s) => {
                              const meta = SKILL_META[s]
                              return (
                                <span
                                  key={s}
                                  className={`inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-full ${c.badge}`}
                                >
                                  {meta?.icon && (
                                    <meta.icon className="w-2.5 h-2.5 flex-shrink-0" style={{ color: meta.color }} />
                                  )}
                                  {s}
                                </span>
                              )
                            })}
                          </div>
                          <p className="text-[11px] text-gray-400 leading-snug">{area.note}</p>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Skill breakdown toggle */}
          <div className="mt-12 md:mt-16">
            <button
              onClick={() => setShowSkills((v) => !v)}
              aria-expanded={showSkills}
              className="mx-auto flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
            >
              {t.skillsToggle}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${showSkills ? 'rotate-180' : ''}`}
              />
            </button>

            {showSkills && (
              <div className="mt-10">
                <Abilities locale={locale} hideHeader />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
