'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getLocaleFromPathname } from '@/lib/i18n'

type Locale = 'en' | 'fr'

type Question = {
  id: number
  q: Record<Locale, string>
  a: Record<Locale, string>
  page?: {
    href: (locale: Locale) => string
    label: Record<Locale, string>
  }
}

const questions: Question[] = [
  {
    id: 1,
    q: {
      en: 'How can I contact Emery?',
      fr: 'Comment contacter Emery ?',
    },
    a: {
      en: 'You can reach Emery via email at emery.dittmer@gmail.com, or connect on LinkedIn at linkedin.com/in/emery-dittmer. Feel free to reach out anytime!',
      fr: 'Vous pouvez joindre Emery par courriel à emery.dittmer@gmail.com, ou sur LinkedIn à linkedin.com/in/emery-dittmer. N\'hésitez pas !',
    },
  },
  {
    id: 2,
    q: {
      en: 'What is Emery up to now?',
      fr: 'Que fait Emery en ce moment ?',
    },
    a: {
      en: 'Emery is currently working as a data and GIS analyst, building interactive visualizations, mapping tools, and web apps. Always exploring new technologies!',
      fr: 'Emery travaille actuellement comme analyste de données et SIG, en développant des visualisations interactives, des outils de cartographie et des applications web.',
    },
    page: {
      href: (locale) => `/Journey/${locale}`,
      label: { en: 'View my journey →', fr: 'Voir mon parcours →' },
    },
  },
  {
    id: 3,
    q: {
      en: 'What projects has Emery worked on?',
      fr: 'Sur quels projets Emery a-t-il travaillé ?',
    },
    a: {
      en: 'Emery has worked on transit catchment analysis, FX rate dashboards, geospatial visualization tools, and various data science projects.',
      fr: 'Emery a travaillé sur l\'analyse de zones de transit, des tableaux de bord de taux de change, des outils de visualisation géospatiale et divers projets de science des données.',
    },
    page: {
      href: (locale) => `/Projects/${locale}`,
      label: { en: 'See all projects →', fr: 'Voir tous les projets →' },
    },
  },
  {
    id: 4,
    q: {
      en: "What are Emery's skills?",
      fr: 'Quelles sont les compétences d\'Emery ?',
    },
    a: {
      en: 'Emery specializes in data analysis, GIS/mapping, Python, TypeScript, React, Next.js, and data visualization.',
      fr: 'Emery est spécialisé en analyse de données, SIG/cartographie, Python, TypeScript, React, Next.js et visualisation de données.',
    },
    page: {
      href: (locale) => `/Skills/${locale}`,
      label: { en: 'Explore skills →', fr: 'Explorer les compétences →' },
    },
  },
  {
    id: 5,
    q: {
      en: 'Is Emery available for work?',
      fr: 'Emery est-il disponible pour travailler ?',
    },
    a: {
      en: 'Emery is open to new opportunities and collaborations — full-time roles, freelance projects, or interesting partnerships. Don\'t hesitate to get in touch!',
      fr: 'Emery est ouvert à de nouvelles opportunités et collaborations — postes à temps plein, projets freelance ou partenariats intéressants. N\'hésitez pas à le contacter !',
    },
  },
  {
    id: 6,
    q: {
      en: 'Has Emery written any articles?',
      fr: 'Emery a-t-il écrit des articles ?',
    },
    a: {
      en: 'Yes! Emery has written articles on data, GIS, and technology topics. Check out the Articles section for the full collection.',
      fr: 'Oui ! Emery a rédigé des articles sur les données, le SIG et la technologie. Consultez la section Articles pour la collection complète.',
    },
    page: {
      href: (locale) => `/Articles/${locale}`,
      label: { en: 'Read articles →', fr: 'Lire les articles →' },
    },
  },
]

const ui = {
  en: {
    header: 'Ask about Emery',
    prompt: 'Pick a question to get started:',
    back: '← Back to questions',
  },
  fr: {
    header: 'Posez une question sur Emery',
    prompt: 'Choisissez une question :',
    back: '← Retour aux questions',
  },
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)

  const pathname = usePathname() ?? '/'
  const locale = getLocaleFromPathname(pathname)
  const router = useRouter()

  const t = ui[locale]
  const activeQ = questions.find((q) => q.id === activeId)

  return (
    <div className="fixed bottom-20 right-4 md:bottom-24 md:right-14 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-72 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-700 to-purple-500 px-4 py-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold text-sm">{t.header}</span>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col gap-3">
              {activeQ ? (
                <motion.div
                  key={activeQ.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  {/* User bubble */}
                  <div className="self-end bg-purple-600 text-white text-xs rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%]">
                    {activeQ.q[locale]}
                  </div>
                  {/* Bot bubble */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="self-start bg-gray-700 text-gray-200 text-xs rounded-2xl rounded-bl-sm px-3 py-2 max-w-[90%] leading-relaxed"
                  >
                    {activeQ.a[locale]}
                  </motion.div>

                  {/* Page link button */}
                  {activeQ.page && (
                    <motion.button
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => {
                        router.push(activeQ.page!.href(locale))
                        setOpen(false)
                        setActiveId(null)
                      }}
                      className="self-start text-xs bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-3 py-1.5 transition-colors font-medium"
                    >
                      {activeQ.page.label[locale]}
                    </motion.button>
                  )}

                  <button
                    onClick={() => setActiveId(null)}
                    className="text-xs text-purple-400 hover:text-purple-300 self-start transition-colors"
                  >
                    {t.back}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-2"
                >
                  <p className="text-gray-400 text-xs mb-1">{t.prompt}</p>
                  {questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setActiveId(q.id)}
                      className="text-left text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white rounded-xl px-3 py-2 transition-colors border border-gray-600 hover:border-purple-500"
                    >
                      {q.q[locale]}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spiral trigger button */}
      <div className="relative flex items-center justify-center w-14 h-14">
        {/* Spinning gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #7e22ce, #a855f7, #c084fc, #7e22ce)',
            padding: '2px',
          }}
        >
          <div className="w-full h-full rounded-full bg-gray-900" />
        </motion.div>

        {/* Pulsing outer glow */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-purple-500"
        />

        {/* Main button */}
        <button
          onClick={() => {
            setOpen((v) => !v)
            if (open) setActiveId(null)
          }}
          className="relative z-10 w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors"
          aria-label={open ? (locale === 'fr' ? 'Fermer le chat' : 'Close chat') : (locale === 'fr' ? 'Ouvrir le chat' : 'Open chat')}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-purple-300 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}
