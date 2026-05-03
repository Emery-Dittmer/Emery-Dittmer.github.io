'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { booksConfig, Book } from '@/lib/booksConfig'
import { Locale } from '@/lib/i18n'

export default function BookSection({ locale = 'en' }: { locale?: Locale }) {
  const [activeBook, setActiveBook] = useState<Book | null>(null)

  const t = {
    title:     locale === 'fr' ? 'Livres' : 'Books',
    summary:   locale === 'fr' ? 'Résumé' : 'Summary',
    keyPoints: locale === 'fr' ? 'Points clés' : 'Key Points',
    read:      locale === 'fr' ? 'Lu en' : 'Read in',
    close:     locale === 'fr' ? 'Fermer' : 'Close',
  }

  const close = useCallback(() => setActiveBook(null), [])

  useEffect(() => {
    if (!activeBook) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeBook, close])

  return (
    <>
      <section className="py-8 w-full">
        <h2 className="section-title text-center mb-8">{t.title}</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto px-4">
          {booksConfig.map((book) => (
            <button
              key={book.id}
              onClick={() => setActiveBook(book)}
              className="group flex flex-col items-center gap-2 w-28 focus:outline-none"
            >
              <div className="relative w-28 h-40 overflow-hidden rounded shadow-md transition-all duration-200 group-hover:shadow-purple-500/30 group-hover:shadow-xl group-hover:scale-105">
                <Image
                  src={book.coverSrc}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs text-center text-gray-300 leading-tight line-clamp-2 w-full">{book.title}</span>
              <span className="text-xs text-gray-500 text-center">{book.author}</span>
            </button>
          ))}
        </div>
      </section>

      {activeBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 flex flex-col sm:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label={t.close}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-sm"
            >
              ✕
            </button>

            {/* Book cover */}
            <div className="flex-shrink-0 flex justify-center sm:justify-start">
              <div className="relative w-32 h-48 rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={activeBook.coverSrc}
                  alt={activeBook.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 min-w-0 pr-4">
              <div>
                <h3 className="text-lg font-semibold text-white leading-tight">{activeBook.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{activeBook.author}</p>
                {activeBook.yearRead && (
                  <p className="text-xs text-gray-500 mt-0.5">{t.read} {activeBook.yearRead}</p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-200 mb-1">{t.summary}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{activeBook.summary[locale]}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-200 mb-2">{t.keyPoints}</h4>
                <ul className="space-y-2">
                  {activeBook.keyPoints[locale].map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
