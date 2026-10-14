import Image from 'next/image'
import { Plus } from 'lucide-react'
import ObsidianLogo from '@/assets/logos/obsidian-logo.svg'
import { Product } from '@/lib/productsConfig'

/**
 * App-icon tile for a product. Products with a dedicated `icon` use it
 * directly; Obsidian plugins without one fall back to the Obsidian logo
 * with a small "+" badge to signal "this is an addon, not the app itself".
 */
export default function ProductIcon({
  product,
  size = 56,
}: {
  product: Product
  size?: number
}) {
  if (product.icon) {
    return (
      <div
        className="relative shrink-0 rounded-2xl overflow-hidden shadow-md"
        style={{ width: size, height: size }}
      >
        <Image src={product.icon} alt="" fill unoptimized className="object-cover" />
      </div>
    )
  }

  if (product.isObsidianPlugin) {
    const badgeSize = Math.round(size * 0.4)
    return (
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <div className="w-full h-full rounded-2xl bg-[#1b1b1f] flex items-center justify-center shadow-md overflow-hidden">
          <Image
            src={ObsidianLogo}
            alt=""
            width={Math.round(size * 0.7)}
            height={Math.round(size * 0.7)}
            unoptimized
          />
        </div>
        <div
          className="absolute -bottom-1 -right-1 rounded-full bg-purple-600 border-2 border-gray-950 flex items-center justify-center shadow"
          style={{ width: badgeSize, height: badgeSize }}
          aria-label="Obsidian plugin"
          title="Obsidian plugin"
        >
          <Plus size={Math.round(badgeSize * 0.65)} className="text-white" strokeWidth={3} />
        </div>
      </div>
    )
  }

  // Fallback: no icon, not an Obsidian plugin — show the banner image cropped square.
  return (
    <div
      className="relative shrink-0 rounded-2xl overflow-hidden shadow-md"
      style={{ width: size, height: size }}
    >
      <Image src={product.mediaSrc} alt="" fill unoptimized className="object-cover" />
    </div>
  )
}
