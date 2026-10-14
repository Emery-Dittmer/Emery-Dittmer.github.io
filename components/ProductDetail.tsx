'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, FolderOpen } from 'lucide-react'
import { Product } from '@/lib/productsConfig'
import { projectsConfig } from '@/lib/projectsConfig'
import { Locale } from '@/lib/i18n'
import ProductIcon from '@/components/ProductIcon'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-gray-800 py-8">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      {children}
    </section>
  )
}

const STATUS_LABEL: Record<Product['status'], { en: string; fr: string }> = {
  shipped: { en: 'Shipped', fr: 'Livré' },
  active: { en: 'Active Development', fr: 'En développement' },
}

const STATUS_STYLE: Record<Product['status'], string> = {
  shipped: 'bg-green-500/15 text-green-400 border border-green-500/30',
  active: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
}

export default function ProductDetail({
  product,
  locale,
}: {
  product: Product
  locale: Locale
}) {
  const t = {
    backToProducts: locale === 'fr' ? '← Retour aux produits' : '← Back to Products',
    description: locale === 'fr' ? 'Description' : 'Description',
    howToUse: locale === 'fr' ? 'Comment utiliser' : 'How to Use',
    stack: locale === 'fr' ? 'Stack technique' : 'Stack',
    relatedProjects: locale === 'fr' ? 'Projet associé' : 'Related Project',
    viewRepo: locale === 'fr' ? 'Voir le code' : 'View Source',
    viewProduct: locale === 'fr' ? 'Essayer' : 'Try it',
  }

  const resolvedProjects = (product.relatedProjectIds ?? [])
    .map((id) => projectsConfig.find((p) => p.id === id))
    .filter(Boolean) as NonNullable<(typeof projectsConfig)[number]>[]

  return (
    <div>
      {/* Banner */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
        <Image
          src={product.mediaSrc}
          alt={product.name[locale]}
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-8">
            <Link
              href={`/Products/${locale}`}
              className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-purple-300 transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              {t.backToProducts}
            </Link>
            <div className="flex items-end gap-4 mb-3">
              <ProductIcon product={product} size={64} />
              <div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1.5 ${STATUS_STYLE[product.status]}`}
                >
                  {STATUS_LABEL[product.status][locale]}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {product.name[locale]}
                </h1>
              </div>
            </div>
            <p className="text-gray-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              {product.tagline[locale]}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Description */}
        <Section title={t.description}>
          <p className="text-gray-300 leading-relaxed">{product.description[locale]}</p>
        </Section>

        {/* How to Use */}
        <Section title={t.howToUse}>
          <p className="text-gray-300 leading-relaxed">{product.howToUse[locale]}</p>
        </Section>

        {/* Stack */}
        <Section title={t.stack}>
          <div className="flex flex-wrap gap-2">
            {product.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium border border-gray-700 bg-gray-900/60 text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* Related Projects */}
        {resolvedProjects.length > 0 && (
          <Section title={t.relatedProjects}>
            <div className="flex flex-col gap-2">
              {resolvedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/Projects/${locale}/${project.id}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/40 px-4 py-3 hover:border-purple-700/50 transition-colors group"
                >
                  <FolderOpen size={16} className="text-purple-400 shrink-0" />
                  <span className="text-sm text-gray-300 group-hover:text-purple-300 transition-colors">
                    {project.title[locale] ?? project.title.en}
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Links */}
        {(product.repoUrl || product.linkUrl) && (
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-3">
            {product.linkUrl && (
              <a
                href={product.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors px-5 py-2.5 text-sm font-semibold text-white"
              >
                <ExternalLink size={14} />
                {product.linkText?.[locale] || t.viewProduct}
              </a>
            )}
            {product.repoUrl && (
              <a
                href={product.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white"
              >
                <Github size={14} />
                {t.viewRepo}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
