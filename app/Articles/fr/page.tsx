export const metadata = {
  title: 'Articles — Emery Dittmer',
  description: 'Perspectives PM sur l\'estimation, la priorisation et le craft produit.',
  keywords: ['Gestion de Produit', 'Articles', 'Emery Dittmer', 'Estimation'],
  authors: [{ name: 'Emery Dittmer' }],
  colorScheme: 'dark',
}

import Link from 'next/link'

const ARTICLES = [
  {
    slug: '/Articles/fr/estimation-methods',
    label: 'Gestion de Produit',
    readTime: '8 min de lecture',
    date: 'Juin 2026',
    title: 'Comment estimer ? Le guide PM des méthodes d\'estimation agile',
    excerpt:
      'Story points, tailles de t-shirt, planning poker, PERT — chaque équipe a son opinion. Cet article décortique les quatre principales approches, leurs forces respectives, et vous permet de tester votre calibration dans un simulateur de sprint interactif.',
    interactive: true,
  },
]

export default function ArticlesIndex() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="border-t border-gray-800 mb-12" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Écrits</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Articles</h1>
        <p className="text-gray-400 mt-3 leading-relaxed">
          Perspectives PM sur l&apos;estimation, la priorisation et la création de produits livrés dans les délais.
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
                  <span className="text-xs font-semibold text-green-400">Interactif</span>
                </>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors mb-2 leading-snug">
              {a.title}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">{a.excerpt}</p>
            <p className="mt-4 text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
              Lire l&apos;article →
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
