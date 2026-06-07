'use client'

import { useState, useEffect, useRef } from 'react'
import { Locale } from '@/lib/i18n'
import WindCanvas from '@/components/wind-canvas'

// Triangle vertex positions for the pillars graphic [left%, top-px]
const PILLAR_VERTS = [
  { left: '50%', top: 10  },   // Lead & Deliver     — top center
  { left: '12%', top: 220 },   // Build & Architect  — bottom left
  { left: '88%', top: 220 },   // Measure & Optimise — bottom right
]

// SVG icon center coords in viewBox 0-100 with preserveAspectRatio="none"
// y = (top + 32) / 360 * 100
const PILLAR_PTS = [[50, 11.7], [12, 70], [88, 70]]

const ROLES = {
  en: ['Product Owner', 'Project Manager', 'Data Scientist', 'Technical Lead', 'Delivery Driver'],
  fr: ['Product Owner', 'Chef de projet', 'Data Scientist', 'Lead technique', 'Pilote de livraison'],
}

const STATS = {
  en: [
    { value: 4,    suffix: '+', label: 'Years leading\nPM / PO roles' },
    { value: 2,    suffix: 'M+', label: 'Dollars saved\nacross programs', prefix: '$' },
    { value: 5,    suffix: '+', label: 'Years of\ndata science' },
    { value: 8,    suffix: '+', label: 'Certifications\nearned' },
  ],
  fr: [
    { value: 4,    suffix: '+', label: 'Ans en rôles\nPM / PO' },
    { value: 2,    suffix: 'M+', label: 'Dollars économisés\nsur les programmes', prefix: '$' },
    { value: 5,    suffix: '+', label: 'Ans de\ndata science' },
    { value: 8,    suffix: '+', label: 'Certifications\nobtenues' },
  ],
}

const PILLARS = {
  en: [
    {
      icon: '🧭',
      title: 'Lead & Deliver',
      lines: [
        'Own the roadmap, run the ceremonies, hold the team accountable.',
        'Certified Scrum (PSM I) and project management (CAPM) with a track record of on-time, on-budget delivery across RBC, PwC, Coveo, and more.',
      ],
    },
    {
      icon: '⚙️',
      title: 'Build & Architect',
      lines: [
        'Write the code, design the pipeline, deploy the model.',
        'Python · Databricks · Azure · Power BI · Mapbox — enough depth to challenge estimates, unblock engineers, and know when something is technically impossible.',
      ],
    },
    {
      icon: '📈',
      title: 'Measure & Optimise',
      lines: [
        'Tie every delivery to a number that matters to the business.',
        '$2M+ in documented cost savings, demand forecasting at scale, and self-serve BI that teams still use long after handoff.',
      ],
    },
  ],
  fr: [
    {
      icon: '🧭',
      title: 'Piloter & livrer',
      lines: [
        'Posséder la roadmap, animer les cérémonies, responsabiliser l\'équipe.',
        'Certifié Scrum (PSM I) et gestion de projet (CAPM) avec un bilan de livraisons dans les délais chez RBC, PwC, Coveo et d\'autres.',
      ],
    },
    {
      icon: '⚙️',
      title: 'Construire & architecturer',
      lines: [
        'Écrire le code, concevoir le pipeline, déployer le modèle.',
        'Python · Databricks · Azure · Power BI · Mapbox — assez de profondeur pour challenger les estimations, débloquer les ingénieurs et savoir quand quelque chose est techniquement impossible.',
      ],
    },
    {
      icon: '📈',
      title: 'Mesurer & optimiser',
      lines: [
        'Relier chaque livraison à un chiffre qui compte pour le business.',
        'Plus de 2 M$ d\'économies documentées, prévisions de demande à grande échelle et BI en libre-service que les équipes utilisent encore longtemps après la livraison.',
      ],
    },
  ],
}

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(target * ease))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { count, ref }
}

function StatCard({ stat }: { stat: (typeof STATS.en)[0] }) {
  const { count, ref } = useCountUp(stat.value)
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-4 py-5 rounded-xl border border-gray-800 bg-gray-900/60">
      <span className="text-3xl font-bold text-white tabular-nums">
        {stat.prefix ?? ''}{count}{stat.suffix}
      </span>
      <span className="text-xs text-gray-400 text-center leading-snug whitespace-pre-line">{stat.label}</span>
    </div>
  )
}

export default function SkillsHero({ locale = 'en' }: { locale?: Locale }) {
  const roles = ROLES[locale]
  const [roleIdx, setRoleIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % roles.length)
        setVisible(true)
      }, 350)
    }, 2600)
    return () => clearInterval(cycle)
  }, [roles.length])

  const copy = {
    en: {
      intro: "I'm a",
      headline: 'Data Scientist & PM —\nI build it, lead it, ship it.',
      sub: 'Most teams have great data scientists or great project managers. Rarely both in the same person. I bridge that gap — building the models and owning the delivery end-to-end.',
      pillarsTitle: 'Three things I do unusually well',
    },
    fr: {
      intro: 'Je suis',
      headline: 'Data Scientist & PM —\nle modèle, la roadmap, la livraison.',
      sub: 'La plupart des équipes ont d\'excellents data scientists ou d\'excellents chefs de projet. Rarement les deux dans la même personne. Je comble cet écart — en construisant les modèles et en pilotant la livraison de bout en bout.',
      pillarsTitle: 'Trois choses que je fais exceptionnellement bien',
    },
  }
  const [activePillar, setActivePillar] = useState<number | null>(null)

  const t = copy[locale]
  const stats = STATS[locale]
  const pillars = PILLARS[locale]

  return (
    <section className="relative overflow-hidden border-b border-gray-800">
      <WindCanvas particleCount={40} speed={0.9} maxOpacity={0.18} lifeSeconds={12} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">

        {/* Cycling role */}
        <div className="flex items-center justify-center gap-3 mb-6 text-base text-gray-400">
          <span>{t.intro}</span>
          <span
            className="inline-block min-w-[180px] text-center font-semibold text-purple-400 transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {roles[roleIdx]}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight mb-6 whitespace-pre-line"
          data-aos="fade-up"
        >
          <span className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            {t.headline}
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-14 leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t.sub}
        </p>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* Pillars label */}
        <p className="text-xs uppercase tracking-widest text-gray-500 text-center mb-8" data-aos="fade-up">
          {t.pillarsTitle}
        </p>

        {/* Triangle graphic */}
        <div className="relative mx-auto w-full max-w-[480px] h-[360px] md:h-[500px]" data-aos="fade-up" data-aos-delay="100">

          {/* SVG: arrows + animated travelling bubbles */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              {(['01','12','20'] as const).map(id => (
                <marker key={id} id={`sk-arr-${id}`} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                  <polygon points="0,0 5,2.5 0,5" fill="rgba(147,51,234,0.55)" />
                </marker>
              ))}
              <path id="sk-path-01" d={`M${PILLAR_PTS[0][0]},${PILLAR_PTS[0][1]} L${PILLAR_PTS[1][0]},${PILLAR_PTS[1][1]}`} />
              <path id="sk-path-12" d={`M${PILLAR_PTS[1][0]},${PILLAR_PTS[1][1]} L${PILLAR_PTS[2][0]},${PILLAR_PTS[2][1]}`} />
              <path id="sk-path-20" d={`M${PILLAR_PTS[2][0]},${PILLAR_PTS[2][1]} L${PILLAR_PTS[0][0]},${PILLAR_PTS[0][1]}`} />
            </defs>

            {/* Connecting lines with arrowheads */}
            {(['01','12','20'] as const).map((id, i) => {
              const [a, b] = [[0,1],[1,2],[2,0]][i]
              return (
                <line key={id}
                  x1={PILLAR_PTS[a][0]} y1={PILLAR_PTS[a][1]}
                  x2={PILLAR_PTS[b][0]} y2={PILLAR_PTS[b][1]}
                  stroke="rgba(147,51,234,0.28)" strokeWidth="0.5"
                  strokeDasharray="2 1.5"
                  markerEnd={`url(#sk-arr-${id})`}
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}

            {/* Travelling bubbles — one per edge, 2s stagger over a 6s cycle */}
            {[
              { path: '#sk-path-01', delay: '0s' },
              { path: '#sk-path-12', delay: '2s' },
              { path: '#sk-path-20', delay: '4s' },
            ].map(({ path, delay }) => (
              <circle key={path} r="1.8" fill="rgba(147,51,234,0.9)">
                <animateMotion dur="6s" begin={delay} repeatCount="indefinite">
                  <mpath xlinkHref={path} />
                </animateMotion>
              </circle>
            ))}
          </svg>

          {/* Icon buttons at each vertex */}
          {pillars.map((p, i) => (
            <button
              key={p.title}
              style={{ position: 'absolute', left: PILLAR_VERTS[i].left, top: PILLAR_VERTS[i].top, transform: 'translateX(-50%)' }}
              onClick={() => setActivePillar(activePillar === i ? null : i)}
              className="flex flex-col items-center gap-2 group focus:outline-none"
              aria-expanded={activePillar === i}
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 bg-gray-800 border border-gray-700 group-hover:bg-purple-900/50 group-hover:border-purple-600/50 group-hover:scale-105">
                  {p.icon}
                </div>
                {/* Mobile tap indicator — pulsing dot, hidden on desktop */}
                <span className="md:hidden absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-purple-500" />
                </span>
              </div>
              <span className="text-sm font-semibold whitespace-nowrap text-gray-300 group-hover:text-white transition-colors">
                {p.title}
              </span>
              {/* Desktop description — always visible, hidden on mobile */}
              <p className="hidden md:block text-xs text-gray-500 leading-snug text-center w-[160px] mt-0.5 group-hover:text-gray-400 transition-colors">
                {p.lines[0]}
              </p>
            </button>
          ))}
        </div>

        {/* Mobile modal — hidden on desktop */}
        {activePillar !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden" onClick={() => setActivePillar(null)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              className="relative z-10 w-full max-w-md rounded-2xl border border-purple-700/50 bg-gray-900 p-8 shadow-2xl shadow-purple-900/30"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setActivePillar(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-200 transition-colors" aria-label="Close">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl">
                  {pillars[activePillar].icon}
                </div>
                <h4 className="font-semibold text-gray-100 text-xl">{pillars[activePillar].title}</h4>
              </div>
              <p className="text-gray-300 leading-relaxed mb-5">{pillars[activePillar].lines[0]}</p>
              <p className="text-sm text-purple-300 font-medium border-t border-gray-800 pt-4">{pillars[activePillar].lines[1]}</p>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
