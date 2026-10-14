import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { productsConfig, Product } from '@/lib/productsConfig'
import { Locale } from '@/lib/i18n'
import ProductIcon from '@/components/ProductIcon'

const STATUS_LABEL: Record<Product['status'], { en: string; fr: string }> = {
  shipped: { en: 'Shipped', fr: 'Livré' },
  active: { en: 'Active Development', fr: 'En développement' },
}

const STATUS_STYLE: Record<Product['status'], string> = {
  shipped: 'bg-green-500/15 text-green-400 border border-green-500/30',
  active: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
}

const copy = {
  en: {
    heading: 'Products',
    sub: 'Tools I\'ve built and shipped on my own — desktop apps, plugins, and side projects with real users.',
  },
  fr: {
    heading: 'Produits',
    sub: 'Des outils que j\'ai conçus et livrés moi-même — applications de bureau, plugins et projets personnels avec de vrais utilisateurs.',
  },
}

export default function ProductsGrid({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]

  return (
    <section className="relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="text-center mb-12">
          <h1 className="h1 mb-4">{t.heading}</h1>
          <p className="text-xl text-gray-400">{t.sub}</p>
        </div>

        <div
          className="rounded-2xl border border-gray-800 bg-gray-900/40 divide-y divide-gray-800 overflow-hidden"
          data-aos="fade-up"
        >
          {productsConfig.map((product) => (
            <Link
              key={product.id}
              href={`/Products/${locale}/${product.id}`}
              className="group flex items-center gap-4 px-4 sm:px-5 py-4 hover:bg-gray-900/70 transition-colors"
            >
              <ProductIcon product={product} size={56} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-gray-100 group-hover:text-purple-300 transition-colors">
                    {product.name[locale]}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${STATUS_STYLE[product.status]}`}
                  >
                    {STATUS_LABEL[product.status][locale]}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-snug mt-0.5 line-clamp-1">
                  {product.tagline[locale]}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {product.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full text-[10px] border border-gray-700 text-gray-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-gray-600 group-hover:text-purple-400 transition-colors shrink-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
