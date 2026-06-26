export const metadata = {
  title: 'Articles — Emery Dittmer',
  description: 'PM perspectives on estimation, prioritization, and product craft.',
  keywords: ['Product Management', 'Articles', 'Emery Dittmer', 'Estimation'],
  authors: [{ name: 'Emery Dittmer' }],
  colorScheme: 'dark',
}

import Link from 'next/link'
import Image from 'next/image'

const ARTICLES = [
  {
    slug: '/Articles/en/ai-beyond-copilot',
    label: 'Technology & AI',
    readTime: '9 min read',
    date: 'June 2026',
    title: 'Beyond the Copilot: AI Was Never Going to Stay in the Passenger Seat',
    excerpt:
      'The copilot metaphor for AI is already obsolete. As AI velocity outpaces our frameworks for understanding it, the honest question isn\'t whether AI will stay our assistant — it\'s what kind of relationship we actually want before that choice is made for us.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
    interactive: false,
  },
  {
    slug: '/Articles/en/estimation-methods',
    label: 'Product Management',
    readTime: '8 min read',
    date: 'June 2026',
    title: "How Should You Estimate? A PM's Guide to Agile Estimation Methods",
    excerpt:
      'Story points, T-shirt sizing, planning poker, PERT — every team has an opinion. This article breaks down the four main approaches, when each shines, and lets you test your calibration in an interactive sprint planning simulation.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    interactive: true,
  },
  {
    slug: '/Articles/en/sncf-analytics',
    label: 'Data & Analysis',
    readTime: '8 min read',
    date: 'June 2026',
    title: 'Are French Trains Actually On Time? I Collected 25 Days of Real Data to Find Out',
    excerpt:
      '86% on time across 46,400 trips — but the aggregate hides what\'s interesting. Regional trains outperform TGV. OUIGO averages a 9.6-minute delay when late. And the ICE cross-border numbers are in a different category entirely.',
    image: '/images/sncf/01_on_time_by_type.png',
    interactive: false,
  },
  {
    slug: '/Articles/en/sncf-architecture',
    label: 'Engineering',
    readTime: '10 min read',
    date: 'June 2026',
    title: 'Building a Real-Time French Train Tracker on AWS for Under $20/Month',
    excerpt:
      'GTFS-RT is ephemeral by design — nobody stores historical snapshots for you. This is how a two-Lambda, SQS-decoupled pipeline collects SNCF, Eurostar, and Trenitalia data every 10 minutes and keeps it queryable in RDS PostgreSQL.',
    image: '/images/sncf/architecture-diagram.png',
    interactive: false,
  },
  {
    slug: '/Articles/en/sncf-cost',
    label: 'Engineering',
    readTime: '7 min read',
    date: 'June 2026',
    title: 'How I Cut This AWS Pipeline from $56 to $16/Month',
    excerpt:
      'The first month\'s bill was $56. A NAT Gateway I\'d added out of habit was costing $32/month before transferring a single byte. Here\'s the full breakdown — and why the fix meant moving everything out of the VPC entirely.',
    image: '/images/sncf/cost-comparison.png',
    interactive: false,
  },
]

export default function ArticlesIndex() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="border-t border-gray-800 dark:border-gray-800 mb-12" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Writing</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Articles</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
          PM perspectives on estimation, prioritization, and building products that ship on time.
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
                    Interactive
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
                Read article →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
