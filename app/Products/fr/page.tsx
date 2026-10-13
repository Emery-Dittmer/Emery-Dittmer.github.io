export const metadata = {
  title: 'Produits — Emery Dittmer',
  description: 'Des outils conçus et livrés de façon indépendante : applications de bureau, plugins et projets personnels avec de vrais utilisateurs.',
  keywords: ['Produits', 'Projets personnels', 'Emery Dittmer'],
  colorScheme: 'dark',
}

import ProductsGrid from '@/components/ProductsGrid'

export default function ProductsPage() {
  return <ProductsGrid locale="fr" />
}
