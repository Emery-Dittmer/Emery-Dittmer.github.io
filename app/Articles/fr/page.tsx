export const metadata = {
  title: 'Articles — Emery Dittmer',
  description: 'Perspectives PM sur l\'estimation, la priorisation et le craft produit.',
  keywords: ['Gestion de Produit', 'Articles', 'Emery Dittmer', 'Estimation'],
  authors: [{ name: 'Emery Dittmer' }],
  colorScheme: 'dark',
}

import Link from 'next/link'
import Image from 'next/image'

const ARTICLES = [
  {
    slug: '/Articles/fr/estimation-methods',
    label: 'Gestion de Produit',
    readTime: '8 min de lecture',
    date: 'Juin 2026',
    title: "Comment estimer ? Le guide PM des méthodes d'estimation agile",
    excerpt:
      'Story points, tailles de t-shirt, planning poker, PERT — chaque équipe a son opinion. Cet article décortique les quatre principales approches, leurs forces respectives, et vous permet de tester votre calibration dans un simulateur de sprint interactif.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    interactive: true,
  },
]

export default function ArticlesIndex() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="border-t border-gray-800 dark:border-gray-800 mb-12" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Écrits</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Articles</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
          Perspectives PM sur l&apos;estimation, la priorisation et la création de produits livrés dans les délais.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={a.slug}
            className="group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:border-purple-400 dark:hover:border-purple-600/50 hover:shadow-lg dark:hover:shadow-purple-900/20 transition-all duration-300 overflow-hidden"
          >
            {/* Card image */}
            <div className="relative h-48 w-full flex-shrink-0 overflow-hidden">
              <Image
                src={a.image}
                alt={a.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {a.label}
                </span>
                {a.interactive && (
                  <span className="text-[11px] font-semibold text-green-300 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    Interactif
                  </span>
                )}
              </div>
            </div>

            {/* Card content */}
            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 dark:text-gray-500">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                </svg>
                <span>{a.readTime}</span>
                <span className="text-gray-400 dark:text-gray-700">·</span>
                <span>{a.date}</span>
              </div>

              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-white transition-colors leading-snug mb-2">
                {a.title}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 line-clamp-3">
                {a.excerpt}
              </p>

              <p className="mt-4 text-xs font-semibold text-purple-500 dark:text-purple-400 group-hover:text-purple-400 dark:group-hover:text-purple-300 transition-colors">
                Lire l&apos;article →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
