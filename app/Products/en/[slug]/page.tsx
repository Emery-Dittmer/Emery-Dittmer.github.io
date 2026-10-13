import { notFound } from 'next/navigation'
import { productsConfig } from '@/lib/productsConfig'
import ProductDetail from '@/components/ProductDetail'

export function generateStaticParams() {
  return productsConfig.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = productsConfig.find((p) => p.id === slug)
  if (!product) return {}
  return {
    title: `${product.name.en} — Emery Dittmer`,
    description: product.description.en,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = productsConfig.find((p) => p.id === slug)
  if (!product) notFound()

  return <ProductDetail product={product} locale="en" />
}
