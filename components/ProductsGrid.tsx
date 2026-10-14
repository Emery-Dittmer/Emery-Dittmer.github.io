import Link from 'next/link'
import { productsConfig } from '@/lib/productsConfig'
import { Locale } from '@/lib/i18n'
import ProductIcon from '@/components/ProductIcon'

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="text-center mb-14">
          <h1 className="h1 mb-4">{t.heading}</h1>
          <p className="text-xl text-gray-400">{t.sub}</p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10"
          data-aos="fade-up"
        >
          {productsConfig.map((product) => (
            <Link
              key={product.id}
              href={`/Products/${locale}/${product.id}`}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <div className="transition-transform duration-150 group-hover:scale-105 group-active:scale-95">
                <ProductIcon product={product} size={176} />
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-300 group-hover:text-purple-300 transition-colors leading-tight line-clamp-2">
                {product.name[locale]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
