import Image from 'next/image'
import Link from 'next/link'
import { productsConfig, Product } from '@/lib/productsConfig'
import { Locale } from '@/lib/i18n'

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="h1 mb-4">{t.heading}</h1>
          <p className="text-xl text-gray-400">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
          {productsConfig.map((product) => (
            <Link
              key={product.id}
              href={`/Products/${locale}/${product.id}`}
              className="group rounded-xl border border-gray-800 bg-gray-900/60 overflow-hidden hover:border-purple-700/50 transition-colors flex flex-col"
            >
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src={product.mediaSrc}
                  alt={product.name[locale]}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_STYLE[product.status]}`}
                >
                  {STATUS_LABEL[product.status][locale]}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="text-base font-semibold text-gray-100 group-hover:text-purple-300 transition-colors">
                  {product.name[locale]}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{product.tagline[locale]}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
