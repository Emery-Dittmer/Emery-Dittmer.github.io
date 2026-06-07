'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPathname } from '@/lib/i18n'

export default function Footer() {
  const pathname = usePathname() ?? '/'
  const locale = getLocaleFromPathname(pathname)

  const copy = {
    en: {
      tagline: 'Data Scientist & Project Manager',
      bio: 'I build predictive models, lead data-driven teams, and turn complex data into decisions that move the needle.',
      nav: [
        {
          heading: 'Work',
          links: [
            { label: 'Projects',       href: `/Projects/${locale}` },
            { label: 'Skills',         href: `/Skills/${locale}` },
            { label: 'Certifications', href: `/Certifications/${locale}` },
          ],
        },
        {
          heading: 'Creative',
          links: [
            { label: 'Articles',        href: `/Articles/${locale}` },
            { label: 'Visualizations',  href: `/Visualizations/${locale}` },
            { label: 'SNCF Live Map',   href: `/SNCFMap/${locale}` },
          ],
        },
        {
          heading: 'More',
          links: [
            { label: 'Cool Stuff',        href: `/CoolStuff/${locale}` },
            { label: 'FX Rates',          href: `/FXRates/${locale}` },
            { label: 'Transit Catchment', href: `/TransitReach/${locale}` },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Emery Dittmer. All rights reserved.`,
      switchLang: 'Français',
      switchHref: '/fr',
    },
    fr: {
      tagline: 'Data Scientist & Chef de projet',
      bio: 'Je construis des modèles prédictifs, dirige des équipes data et transforme des données complexes en décisions à fort impact.',
      nav: [
        {
          heading: 'Travail',
          links: [
            { label: 'Projets',         href: `/Projects/${locale}` },
            { label: 'Compétences',     href: `/Skills/${locale}` },
            { label: 'Certifications',  href: `/Certifications/${locale}` },
          ],
        },
        {
          heading: 'Créatif',
          links: [
            { label: 'Articles',        href: `/Articles/${locale}` },
            { label: 'Visualisations',  href: `/Visualizations/${locale}` },
            { label: 'Carte SNCF',      href: `/SNCFMap/${locale}` },
          ],
        },
        {
          heading: 'Plus',
          links: [
            { label: 'Loisirs',          href: `/CoolStuff/${locale}` },
            { label: 'Taux de change',   href: `/FXRates/${locale}` },
            { label: 'Rayon transport',  href: `/TransitReach/${locale}` },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Emery Dittmer. Tous droits réservés.`,
      switchLang: 'English',
      switchHref: '/en',
    },
  }
  const t = copy[locale]

  return (
    <footer className="border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div>
              <p className="text-gray-100 font-semibold text-lg">Emery Dittmer</p>
              <p className="text-purple-400 text-sm mt-0.5">{t.tagline}</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t.bio}</p>

            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              <a
                href="https://github.com/Emery-Dittmer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/emery-dittmer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
                </svg>
              </a>
              <a
                href="https://calendly.com/emery-dittmer/30min"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Schedule a call"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors"
                title="Schedule a call"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5zm2 4h10v2H7zm0 4h7v2H7z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {t.nav.map((col) => (
            <div key={col.heading} className="text-sm">
              <h6 className="text-gray-200 font-semibold mb-3 uppercase tracking-wider text-xs">{col.heading}</h6>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-gray-400 hover:text-gray-100 transition-colors duration-150"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">{t.copyright}</p>
          <Link
            href={t.switchHref}
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors border border-gray-700 px-3 py-1 rounded-full"
          >
            {t.switchLang}
          </Link>
        </div>

      </div>
    </footer>
  )
}
