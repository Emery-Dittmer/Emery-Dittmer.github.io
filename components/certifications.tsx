'use client'

import React, { useState } from 'react';
import CertificationCard from './CertificationCard';
import { StaticImageData } from 'next/image';

import alteryx_advanced from "@/assets/certifications/Alteryx_Designer_Advanced.png";
import alteryx_core from "@/assets/certifications/Alteryx_Designer_Core.png";
import inclusive_mindset from "@/assets/certifications/Inclusive_Mindset.png";
import CAPM from "@/assets/certifications/CAPM.png";
import power_BI from "@/assets/certifications/Power_BI_Cert.png";
import azure_fundamentals from "@/assets/certifications/Azure_fundamentals.png";
import Tableau_specialist from "@/assets/certifications/Tableau-Specialist.png";
import Fabric_eng from "@/assets/certifications/fabric_eng1.png";
import data_iku from "@/assets/certifications/dataiku_logo.jpg";
import PSMI from "@/assets/certifications/PSMI.png";
import databricks_associate from "@/assets/certifications/associate-badge-de.png";
import databricks_fundamentals from "@/assets/certifications/fundamentals-badge-databricks-2x_1.png";
import dataiku_advanced from "@/assets/certifications/advanced desiger.png";
import dataiku_ml_practitioner from "@/assets/certifications/ml practitioner.png";
import { Locale } from '@/lib/i18n';

type Cert = {
  name: string
  image: StaticImageData
  company: string
  link: string
  linktxt: string
  h: number
  year: string
  domain: string
  technology: string
}

const DOMAIN_ORDER = [
  'Data Engineering',
  'Analytics & Machine Learning',
  'Visualization',
  'AI & Compliance',
  'Agile & Project Management',
]

function groupByKey(arr: Cert[], key: 'domain' | 'year' | 'technology'): Record<string, Cert[]> {
  return arr.reduce((acc, item) => {
    const k = item[key]
    acc[k] = acc[k] ?? []
    acc[k].push(item)
    return acc
  }, {} as Record<string, Cert[]>)
}

function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <details className="relative">
      <summary className="cursor-pointer list-none flex items-center gap-1 px-3 py-1.5 rounded border border-gray-700 text-sm text-gray-300 hover:border-purple-500 transition-colors select-none">
        {label}
        {selected.length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 text-xs bg-purple-600 text-white rounded-full">
            {selected.length}
          </span>
        )}
        <svg className="w-3 h-3 ml-1 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="absolute top-full left-0 mt-1 z-20 min-w-[180px] bg-gray-900 border border-gray-700 rounded-lg p-2 shadow-xl">
        {options.map(opt => (
          <label
            key={opt}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-800 cursor-pointer text-sm text-gray-300"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="accent-purple-500"
            />
            {opt}
          </label>
        ))}
      </div>
    </details>
  )
}

export default function Certifications({
  locale = 'en',
  data,
}: {
  locale?: Locale
  data?: Array<{
    section: string
    certification: Array<{
      name: string
      image: string
      company: string
      link: string
      linktxt: string
      h: number
    }>
  }>
}) {
  const [filters, setFilters] = useState({
    year: [] as string[],
    domain: [] as string[],
    technology: [] as string[],
  })
  const [groupBy, setGroupBy] = useState<'domain' | 'year' | 'technology' | 'none'>('domain')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const allCerts = certsByLocale[locale] ?? certsByLocale.en

  const availableYears = [...new Set(allCerts.map(c => c.year))].sort((a, b) => Number(b) - Number(a))
  const availableDomains = DOMAIN_ORDER.filter(d => allCerts.some(c => c.domain === d))
  const availableTechnologies = [...new Set(allCerts.map(c => c.technology))].sort()

  const toggleFilter = (key: 'year' | 'domain' | 'technology', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }))
  }

  const clearFilters = () => {
    setFilters({ year: [], domain: [], technology: [] })
    setExpandedSections({})
  }

  const hasActiveFilters =
    filters.year.length > 0 || filters.domain.length > 0 || filters.technology.length > 0

  const filteredCerts = allCerts
    .filter(c => filters.year.length === 0 || filters.year.includes(c.year))
    .filter(c => filters.domain.length === 0 || filters.domain.includes(c.domain))
    .filter(c => filters.technology.length === 0 || filters.technology.includes(c.technology))

  const grouped: Record<string, Cert[]> =
    groupBy === 'none'
      ? { All: filteredCerts }
      : groupByKey(filteredCerts, groupBy)

  const sectionKeys =
    groupBy === 'domain'
      ? DOMAIN_ORDER.filter(d => grouped[d])
      : groupBy === 'year'
        ? Object.keys(grouped).sort((a, b) => Number(b) - Number(a))
        : groupBy === 'none'
          ? ['All']
          : Object.keys(grouped).sort()

  const showLabel = locale === 'fr' ? 'Afficher plus' : 'Show more'
  const hideLabel = locale === 'fr' ? 'Afficher moins' : 'Show less'

  return (
    <>
      <div className="max-w-sm mx-auto grid mx-auto">
        <div className="py-1 md:py-2 border-t border-gray-800"></div>
      </div>
      <h3 className="h2 text-center"> Certifications </h3>
      <div className="flex items-center justify-center">
        <div className="text-center my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-auto md:grid-cols-1 xl:px-0">

          {/* Filter bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <FilterDropdown
              label={locale === 'fr' ? 'Année' : 'Year'}
              options={availableYears}
              selected={filters.year}
              onToggle={v => toggleFilter('year', v)}
            />
            <FilterDropdown
              label={locale === 'fr' ? 'Domaine' : 'Domain'}
              options={availableDomains}
              selected={filters.domain}
              onToggle={v => toggleFilter('domain', v)}
            />
            <FilterDropdown
              label={locale === 'fr' ? 'Technologie' : 'Technology'}
              options={availableTechnologies}
              selected={filters.technology}
              onToggle={v => toggleFilter('technology', v)}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {locale === 'fr' ? 'Grouper par :' : 'Group by:'}
              </span>
              <select
                value={groupBy}
                onChange={e => {
                  setGroupBy(e.target.value as typeof groupBy)
                  setExpandedSections({})
                }}
                className="px-2 py-1.5 rounded border border-gray-700 bg-gray-900 text-sm text-gray-300 hover:border-purple-500 transition-colors cursor-pointer"
              >
                <option value="domain">{locale === 'fr' ? 'Domaine' : 'Domain'}</option>
                <option value="year">{locale === 'fr' ? 'Année' : 'Year'}</option>
                <option value="technology">{locale === 'fr' ? 'Technologie' : 'Technology'}</option>
                <option value="none">{locale === 'fr' ? 'Aucun' : 'None'}</option>
              </select>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-purple-400 hover:text-purple-200 transition-colors"
              >
                {locale === 'fr' ? 'Effacer les filtres' : 'Clear filters'}
              </button>
            )}
          </div>

          <div className="certifications max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none">
            {sectionKeys.map(sectionKey => {
              const certs = grouped[sectionKey] ?? []
              const isExpanded = expandedSections[sectionKey] ?? false
              const visibleCerts = isExpanded ? certs : certs.slice(0, 2)
              return (
                <div className="certifications-section" key={sectionKey}>
                  {groupBy !== 'none' && (
                    <h2 className="section-title">{sectionKey}</h2>
                  )}
                  <div className="certifications-grid grid grid-cols-2 gap-auto max-w-sm">
                    {visibleCerts.map(cert => (
                      <CertificationCard key={cert.name} {...cert} />
                    ))}
                  </div>
                  {certs.length > 2 && (
                    <button
                      type="button"
                      className="mt-4 text-sm font-semibold text-purple-400 hover:text-purple-200 transition duration-150 ease-in-out"
                      onClick={() =>
                        setExpandedSections(prev => ({
                          ...prev,
                          [sectionKey]: !prev[sectionKey],
                        }))
                      }
                    >
                      {isExpanded ? hideLabel : showLabel}
                    </button>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}


const certsByLocale: Record<string, Cert[]> = {
  en: [
    {
      name: 'GDPR & Data Privacy Fundamentals',
      image: data_iku, // TODO: replace with DataCamp logo
      company: 'Issued by: DataCamp',
      link: 'https://www.datacamp.com/certificate/GDP0012869164274',
      linktxt: 'View Details',
      h: 100,
      year: '2026',
      domain: 'AI & Compliance',
      technology: 'DataCamp',
    },
    {
      name: 'EU AI Act Literacy',
      image: data_iku, // TODO: replace with DataCamp logo
      company: 'Issued by: DataCamp',
      link: 'https://www.datacamp.com/certificate/EU0027355940737',
      linktxt: 'View Details',
      h: 100,
      year: '2026',
      domain: 'AI & Compliance',
      technology: 'DataCamp',
    },
    {
      name: 'Databricks Certified Data Engineer Associate',
      image: databricks_associate,
      company: 'Issued by: Databricks',
      link: 'https://credentials.databricks.com/406240f4-b33b-4519-9130-99d952a6d621',
      linktxt: 'View Details',
      h: 100,
      year: '2025',
      domain: 'Data Engineering',
      technology: 'Databricks',
    },
    {
      name: 'Academy Accreditation - Databricks Lakehouse Fundamentals',
      image: databricks_fundamentals,
      company: 'Issued by: Databricks',
      link: 'https://credentials.databricks.com/96344229-e2a6-4b93-ae9f-5a466bbb3884',
      linktxt: 'View Details',
      h: 100,
      year: '2025',
      domain: 'Data Engineering',
      technology: 'Databricks',
    },
    {
      name: 'Dataiku Advanced Designer',
      image: dataiku_advanced,
      company: 'Issued by: Dataiku',
      link: 'https://verify.skilljar.com/c/47wahcderzwy',
      linktxt: 'View Details',
      h: 100,
      year: '2024',
      domain: 'Analytics & Machine Learning',
      technology: 'Dataiku',
    },
    {
      name: 'Dataiku ML Practitioner',
      image: dataiku_ml_practitioner,
      company: 'Issued by: Dataiku',
      link: 'https://verify.skilljar.com/c/esd6dm3c6dzi',
      linktxt: 'View Details',
      h: 100,
      year: '2024',
      domain: 'Analytics & Machine Learning',
      technology: 'Dataiku',
    },
    {
      name: 'Professional Scrum Master I (PSM I)',
      image: PSMI,
      company: 'Issued by: Scrum.org',
      link: 'https://www.credly.com/badges/efa29987-91ee-472a-867b-8b49bc431665/',
      linktxt: 'View Details',
      h: 100,
      year: '2024',
      domain: 'Agile & Project Management',
      technology: 'Scrum.org',
    },
    {
      name: 'Microsoft Certified: Fabric Analytics Engineer Associate',
      image: Fabric_eng,
      company: 'Issued by: Microsoft',
      link: 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/fabric-analytics-engineer-associate?tab=credentials-tab',
      linktxt: 'View Details',
      h: 100,
      year: '2024',
      domain: 'Data Engineering',
      technology: 'Microsoft',
    },
    {
      name: 'Dataiku Core Designer',
      image: data_iku,
      company: 'Issued by: Dataiku',
      link: 'https://verify.skilljar.com/c/r5n822wv4aha',
      linktxt: 'View Details',
      h: 100,
      year: '2024',
      domain: 'Analytics & Machine Learning',
      technology: 'Dataiku',
    },
    {
      name: 'Python',
      image: data_iku, // TODO: replace with HackerRank logo
      company: 'Issued by: HackerRank',
      link: 'https://www.hackerrank.com/',
      linktxt: 'View Details',
      h: 100,
      year: '2023',
      domain: 'Analytics & Machine Learning',
      technology: 'HackerRank',
    },
    {
      name: 'SQL',
      image: data_iku, // TODO: replace with HackerRank logo
      company: 'Issued by: HackerRank',
      link: 'https://www.hackerrank.com/',
      linktxt: 'View Details',
      h: 100,
      year: '2023',
      domain: 'Analytics & Machine Learning',
      technology: 'HackerRank',
    },
    {
      name: 'Microsoft Certified: Azure Fundamentals',
      image: azure_fundamentals,
      company: 'Issued by: Microsoft',
      link: 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/azure-fundamentals?tab=credentials-tab',
      linktxt: 'View Details',
      h: 100,
      year: '2023',
      domain: 'Data Engineering',
      technology: 'Microsoft',
    },
    {
      name: 'Tableau Desktop Specialist',
      image: Tableau_specialist,
      company: 'Issued by: Tableau',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'View Details',
      h: 100,
      year: '2023',
      domain: 'Visualization',
      technology: 'Tableau',
    },
    {
      name: 'Microsoft Certified: Power BI Data Analyst Associate',
      image: power_BI,
      company: 'Issued by: Microsoft',
      link: 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/data-analyst-associate?tab=credentials-tab',
      linktxt: 'View Details',
      h: 100,
      year: '2022',
      domain: 'Visualization',
      technology: 'Microsoft',
    },
    {
      name: 'Inclusive Mindset',
      image: inclusive_mindset,
      company: 'Issued by: PwC',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'View Details',
      h: 100,
      year: '2022',
      domain: 'Agile & Project Management',
      technology: 'PwC',
    },
    {
      name: 'Alteryx Designer Advanced',
      image: alteryx_advanced,
      company: 'Issued by: Alteryx',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'View Details',
      h: 100,
      year: '2021',
      domain: 'Analytics & Machine Learning',
      technology: 'Alteryx',
    },
    {
      name: 'Designer Core Certified',
      image: alteryx_core,
      company: 'Issued by: Alteryx',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'View Details',
      h: 100,
      year: '2021',
      domain: 'Analytics & Machine Learning',
      technology: 'Alteryx',
    },
    {
      name: 'Certified Associate in Project Management (CAPM)',
      image: CAPM,
      company: 'Issued by: Project Management Institute',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'View Details',
      h: 100,
      year: '2021',
      domain: 'Agile & Project Management',
      technology: 'PMI',
    },
  ],
  fr: [
    {
      name: 'GDPR & Data Privacy Fundamentals',
      image: data_iku, // TODO: replace with DataCamp logo
      company: 'Délivré par : DataCamp',
      link: 'https://www.datacamp.com/certificate/GDP0012869164274',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2026',
      domain: 'AI & Compliance',
      technology: 'DataCamp',
    },
    {
      name: 'EU AI Act Literacy',
      image: data_iku, // TODO: replace with DataCamp logo
      company: 'Délivré par : DataCamp',
      link: 'https://www.datacamp.com/certificate/EU0027355940737',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2026',
      domain: 'AI & Compliance',
      technology: 'DataCamp',
    },
    {
      name: 'Databricks Certified Data Engineer Associate',
      image: databricks_associate,
      company: 'Délivré par : Databricks',
      link: 'https://credentials.databricks.com/406240f4-b33b-4519-9130-99d952a6d621',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2025',
      domain: 'Data Engineering',
      technology: 'Databricks',
    },
    {
      name: 'Academy Accreditation - Databricks Lakehouse Fundamentals',
      image: databricks_fundamentals,
      company: 'Délivré par : Databricks',
      link: 'https://credentials.databricks.com/96344229-e2a6-4b93-ae9f-5a466bbb3884',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2025',
      domain: 'Data Engineering',
      technology: 'Databricks',
    },
    {
      name: 'Dataiku Advanced Designer',
      image: dataiku_advanced,
      company: 'Délivré par : Dataiku',
      link: 'https://verify.skilljar.com/c/47wahcderzwy',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2024',
      domain: 'Analytics & Machine Learning',
      technology: 'Dataiku',
    },
    {
      name: 'Dataiku ML Practitioner',
      image: dataiku_ml_practitioner,
      company: 'Délivré par : Dataiku',
      link: 'https://verify.skilljar.com/c/esd6dm3c6dzi',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2024',
      domain: 'Analytics & Machine Learning',
      technology: 'Dataiku',
    },
    {
      name: 'Professional Scrum Master I (PSM I)',
      image: PSMI,
      company: 'Délivré par : Scrum.org',
      link: 'https://www.credly.com/badges/efa29987-91ee-472a-867b-8b49bc431665/',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2024',
      domain: 'Agile & Project Management',
      technology: 'Scrum.org',
    },
    {
      name: 'Microsoft Certified: Fabric Analytics Engineer Associate',
      image: Fabric_eng,
      company: 'Délivré par : Microsoft',
      link: 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/fabric-analytics-engineer-associate?tab=credentials-tab',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2024',
      domain: 'Data Engineering',
      technology: 'Microsoft',
    },
    {
      name: 'Dataiku Core Designer',
      image: data_iku,
      company: 'Délivré par : Dataiku',
      link: 'https://verify.skilljar.com/c/r5n822wv4aha',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2024',
      domain: 'Analytics & Machine Learning',
      technology: 'Dataiku',
    },
    {
      name: 'Python',
      image: data_iku, // TODO: replace with HackerRank logo
      company: 'Délivré par : HackerRank',
      link: 'https://www.hackerrank.com/',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2023',
      domain: 'Analytics & Machine Learning',
      technology: 'HackerRank',
    },
    {
      name: 'SQL',
      image: data_iku, // TODO: replace with HackerRank logo
      company: 'Délivré par : HackerRank',
      link: 'https://www.hackerrank.com/',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2023',
      domain: 'Analytics & Machine Learning',
      technology: 'HackerRank',
    },
    {
      name: 'Microsoft Certified: Azure Fundamentals',
      image: azure_fundamentals,
      company: 'Délivré par : Microsoft',
      link: 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/azure-fundamentals?tab=credentials-tab',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2023',
      domain: 'Data Engineering',
      technology: 'Microsoft',
    },
    {
      name: 'Tableau Desktop Specialist',
      image: Tableau_specialist,
      company: 'Délivré par : Tableau',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2023',
      domain: 'Visualization',
      technology: 'Tableau',
    },
    {
      name: 'Microsoft Certified: Power BI Data Analyst Associate',
      image: power_BI,
      company: 'Délivré par : Microsoft',
      link: 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/data-analyst-associate?tab=credentials-tab',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2022',
      domain: 'Visualization',
      technology: 'Microsoft',
    },
    {
      name: 'Inclusive Mindset',
      image: inclusive_mindset,
      company: 'Délivré par : PwC',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2022',
      domain: 'Agile & Project Management',
      technology: 'PwC',
    },
    {
      name: 'Alteryx Designer Advanced',
      image: alteryx_advanced,
      company: 'Délivré par : Alteryx',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2021',
      domain: 'Analytics & Machine Learning',
      technology: 'Alteryx',
    },
    {
      name: 'Designer Core Certified',
      image: alteryx_core,
      company: 'Délivré par : Alteryx',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2021',
      domain: 'Analytics & Machine Learning',
      technology: 'Alteryx',
    },
    {
      name: 'Certified Associate in Project Management (CAPM)',
      image: CAPM,
      company: 'Délivré par : Project Management Institute',
      link: 'https://www.credly.com/users/emery-dittmer/badges',
      linktxt: 'Voir les détails',
      h: 100,
      year: '2021',
      domain: 'Agile & Project Management',
      technology: 'PMI',
    },
  ],
}
