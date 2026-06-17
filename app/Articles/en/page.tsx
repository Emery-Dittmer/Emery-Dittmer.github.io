export const metadata = {
  title: 'Articles — Emery Dittmer',
  description: 'PM perspectives on estimation, prioritization, and product craft.',
  keywords: ['Product Management', 'Articles', 'Emery Dittmer', 'Estimation'],
  authors: [{ name: 'Emery Dittmer' }],
  colorScheme: 'dark',
}

import Link from 'next/link'

const ARTICLES = [
  {
    slug: '/Articles/en/estimation-methods',
    label: 'Product Management',
    readTime: '8 min read',
    date: 'June 2026',
    title: 'How Should You Estimate? A PM\'s Guide to Agile Estimation Methods',
    excerpt:
      'Story points, T-shirt sizing, planning poker, PERT — every team has an opinion. This article breaks down the four main approaches, when each shines, and lets you test your calibration in an interactive sprint planning simulation.',
    interactive: true,
  },
]

export default function ArticlesIndex() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="border-t border-gray-800 mb-12" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Writing</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Articles</h1>
        <p className="text-gray-400 mt-3 leading-relaxed">
          PM perspectives on estimation, prioritization, and building products that ship on time.
        </p>
      </div>

      <div className="space-y-6">
        {ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={a.slug}
            className="group block rounded-2xl border border-gray-800 bg-gray-900/40 hover:border-purple-600/50 hover:bg-gray-900/70 transition-all p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">{a.label}</span>
              <span className="text-gray-700">·</span>
              <span className="text-xs text-gray-500">{a.readTime}</span>
              <span className="text-gray-700">·</span>
              <span className="text-xs text-gray-500">{a.date}</span>
              {a.interactive && (
                <>
                  <span className="text-gray-700">·</span>
                  <span className="text-xs font-semibold text-green-400">Interactive</span>
                </>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors mb-2 leading-snug">
              {a.title}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">{a.excerpt}</p>
            <p className="mt-4 text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
              Read article →
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
