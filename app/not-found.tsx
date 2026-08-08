export const metadata = {
  title: 'Page Not Found — Emery Dittmer',
  description: 'This page does not exist — an unstable element, lost somewhere in a galaxy far, far away.',
  colorScheme: 'dark',
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-32 md:pt-36 md:pb-40 flex flex-col items-center text-center">

      {/* Star Wars-style crawl */}
      <div className="w-full mb-14" style={{ perspective: '400px' }}>
        <div
          className="mx-auto max-w-md"
          style={{ transform: 'rotateX(28deg)', transformOrigin: 'top center' }}
        >
          <p className="text-amber-300 font-bold tracking-wide text-sm sm:text-base leading-relaxed">
            Episode 404
            <br />
            THE PAGE THAT WASN&apos;T THERE
          </p>
          <p className="text-amber-300/80 text-xs sm:text-sm leading-relaxed mt-3">
            It is a period of routine browsing. A lone REQUEST, seeking a URL
            across the vast SERVER, has drifted off course. Rebel scientists,
            working in a secret lab, warn that the page may have been moved,
            renamed, or never synthesized at all.
          </p>
        </div>
      </div>

      {/* Periodic-table style element tile */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl border-2 border-purple-500/50 bg-gray-900/70 shadow-[0_0_40px_rgba(168,85,247,0.25)] flex flex-col items-center justify-center mb-8">
        <span className="absolute top-3 left-4 text-xs text-gray-500 font-mono">404</span>
        <span className="absolute top-3 right-4 text-xs text-gray-500 font-mono">??.0</span>
        <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-white to-purple-400 bg-clip-text text-transparent">
          Er
        </span>
        <span className="mt-2 text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase">
          Errorium
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
        This page is highly unstable
      </h1>
      <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
        Errorium has a half-life of about zero seconds — it decays instantly into a{' '}
        <span className="text-purple-400 font-mono">200 OK</span> the moment you head somewhere
        that actually exists.
      </p>

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
