'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { Expand } from 'lucide-react'

export default function ProjectGallery({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  if (images.length === 0) return null

  const slides = images.map((src) => ({ src }))

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((url, i) => (
          <button
            key={url}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-purple-500 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
              <Expand
                size={28}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        plugins={[Zoom]}
        slides={slides}
      />
    </>
  )
}
