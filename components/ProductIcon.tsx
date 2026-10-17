import Image from 'next/image'
import { Plus } from 'lucide-react'
import ObsidianLogo from '@/assets/logos/obsidian-logo.svg'
import { Product } from '@/lib/productsConfig'

/**
 * The icon tile itself — shared between the real icon and the reflection
 * clone beneath it, so the two never drift out of sync.
 */
function IconTile({ product, size }: { product: Product; size: number }) {
  // Scale the corner radius with size so large tiles keep an app-icon look
  // (roughly iOS's ~22% radius) instead of looking under-rounded.
  const radius = Math.round(size * 0.22)

  if (product.icon) {
    return (
      <div
        className="relative overflow-hidden shadow-md"
        style={{ width: size, height: size, borderRadius: radius }}
      >
        <Image src={product.icon} alt="" fill unoptimized className="object-cover" />
      </div>
    )
  }

  if (product.isObsidianPlugin) {
    const badgeSize = Math.round(size * 0.4)
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="w-full h-full bg-[#1b1b1f] flex items-center justify-center shadow-md overflow-hidden"
          style={{ borderRadius: radius }}
        >
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
      className="relative overflow-hidden shadow-md"
      style={{ width: size, height: size, borderRadius: radius }}
    >
      <Image src={product.mediaSrc} alt="" fill unoptimized className="object-cover" />
    </div>
  )
}

/**
 * App-icon tile for a product, with a Mac-Dock-style reflection fading out
 * underneath. Products with a dedicated `icon` use it directly; Obsidian
 * plugins without one fall back to the Obsidian logo with a small "+"
 * badge to signal "this is an addon, not the app itself".
 */
export default function ProductIcon({
  product,
  size = 56,
  reflection = false,
}: {
  product: Product
  size?: number
  reflection?: boolean
}) {
  if (!reflection) {
    return (
      <div className="shrink-0">
        <IconTile product={product} size={size} />
      </div>
    )
  }

  const reflectionHeight = Math.round(size * 0.55)

  return (
    <div className="shrink-0 flex flex-col" style={{ width: size }}>
      <IconTile product={product} size={size} />
      <div
        className="-mt-1 overflow-hidden select-none pointer-events-none"
        style={{
          width: size,
          height: reflectionHeight,
          transform: 'scaleY(-1)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 75%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 75%)',
        }}
        aria-hidden="true"
      >
        <IconTile product={product} size={size} />
      </div>
    </div>
  )
}
