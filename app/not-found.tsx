export const metadata = {
  title: 'Page Not Found — Emery Dittmer',
  description: 'This page does not exist — an unstable element that decayed before you got here.',
  colorScheme: 'dark',
}

import Link from 'next/link'
import NotFoundSuggestions from '@/components/not-found-suggestions'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-32 md:pt-36 md:pb-40 flex flex-col items-center text-center">

      {/* Big 404 with the element bursting out of it */}
      <div className="relative inline-block mb-10 mt-4" style={{ isolation: 'isolate' }}>
        <span
          aria-hidden="true"
          className="block font-black leading-none tracking-tighter select-none bg-gradient-to-br from-white via-gray-300 to-purple-500 bg-clip-text text-transparent"
          style={{ fontSize: 'clamp(6.5rem, 24vw, 15rem)' }}
        >
          404
        </span>

        {/* burst rays, radiating from behind the tile */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 w-0 h-0 pointer-events-none -z-10"
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <span
              key={angle}
              className="absolute left-0 top-0 w-14 sm:w-24 h-[2px] bg-gradient-to-r from-purple-400/80 to-transparent origin-left"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          ))}
        </div>

        {/* Periodic-table style element tile, breaking out of the "0" */}
        <div
          className="absolute left-1/2 top-1/2 w-32 h-32 sm:w-44 sm:h-44 -ml-16 -mt-16 sm:-ml-[5.5rem] sm:-mt-[5.5rem] rotate-[-9deg] rounded-2xl border-2 border-purple-400 bg-gray-900 shadow-[0_0_70px_rgba(168,85,247,0.6)] flex flex-col items-center justify-center"
        >
          <span className="absolute top-2 left-3 text-[10px] text-gray-500 font-mono">404</span>
          <span className="absolute top-2 right-3 text-[10px] text-gray-500 font-mono">??.0</span>
          <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-white to-purple-400 bg-clip-text text-transparent">
            Er
          </span>
          <span className="mt-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-400 uppercase">
            Errorium
          </span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
        This page is highly unstable
      </h1>
      <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
        Errorium has a half-life of about zero seconds — it decays instantly into a{' '}
        <span className="text-purple-400 font-mono">200 OK</span> the moment you head somewhere
        that actually exists.
      </p>

      <NotFoundSuggestions />

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/en"
          className="btn text-white bg-purple-600 hover:bg-purple-700 px-5 py-2.5"
        >
          Return to base
        </Link>
        <Link
          href="/Projects/en"
          className="btn text-gray-300 bg-gray-800 hover:bg-gray-700 px-5 py-2.5"
        >
          Browse the archives
        </Link>
        <Link
          href="/Articles/en"
          className="btn text-gray-300 bg-gray-800 hover:bg-gray-700 px-5 py-2.5"
        >
          Read the transmissions
        </Link>
      </div>
    </div>
  )
}
