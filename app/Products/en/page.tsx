export const metadata = {
  title: 'Products — Emery Dittmer',
  description: 'Tools built and shipped independently: desktop apps, plugins, and side projects with real users.',
  keywords: ['Products', 'Side Projects', 'Emery Dittmer'],
  colorScheme: 'dark',
}

import ProductsGrid from '@/components/ProductsGrid'

export default function ProductsPage() {
  return <ProductsGrid locale="en" />
}
