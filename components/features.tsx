'use client'

import { useState } from 'react'
import { Locale } from '@/lib/i18n'

// Vertex positions: [left%, top-px]  — icons centered horizontally via translateX(-50%)
const VERTS = [
  { left: '50%',  top: 10  },  // Project Delivery  — top center
  { left: '12%',  top: 220 },  // Data Science       — bottom left
  { left: '88%',  top: 220 },  // Business Impact    — bottom right
]

// Icon center coords in SVG viewBox 0-100 (y = (top + 32) / 360 * 100)
const LINE_PTS = [
  [50,  11.7],
  [12,  70  ],
  [88,  70  ],
]

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

  const copy = {
    en: {
      title: 'Delivering data projects end to end',
      intro: 'Most data work stalls between insight and action. Emery bridges that gap — leading projects from problem definition to production, with the technical depth to build what gets decided.',
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
      title: 'Livrer des projets data de bout en bout',
      intro: "La plupart des projets data échouent entre l'analyse et l'action. Emery comble cet écart — pilotant les projets de la définition du problème à la production, avec la profondeur technique pour construire ce qui a été décidé.",
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
            <p className="text-xl text-gray-400">{t.intro}</p>
          </div>

          {/* Triangle graphic */}
          <div className="relative mx-auto w-full max-w-[480px] h-[360px]">

            {/* Connecting lines */}
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
                  left: VERTS[i].left,
                  top: VERTS[i].top,
                  transform: 'translateX(-50%)',
                }}
                onClick={() => setActive(active === i ? null : i)}
                className="flex flex-col items-center gap-2 group focus:outline-none"
                aria-expanded={active === i}
              >
                <div className={`transition-all duration-200 rounded-full
                  ${active === i
                    ? 'shadow-[0_0_24px_rgba(147,51,234,0.65)] scale-110'
                    : 'group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(147,51,234,0.35)]'
                  }`}
                >
                  {SVGS[i]}
                </div>
                <span className={`text-sm font-medium whitespace-nowrap transition-colors duration-150
                  ${active === i ? 'text-purple-300' : 'text-gray-400 group-hover:text-gray-200'}`}
                >
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* Modal popout */}
          {active !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setActive(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

              {/* Card */}
              <div
                className="relative z-10 w-full max-w-md rounded-2xl border border-purple-700/50 bg-gray-900 p-8 shadow-2xl shadow-purple-900/30"
                onClick={e => e.stopPropagation()}
              >
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
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
