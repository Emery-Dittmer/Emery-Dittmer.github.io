'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { ArrowRight, ChevronDown, Check, X } from 'lucide-react'
import { projectsConfig, ProjectType } from '@/lib/projectsConfig'
import { skillsConfig, LaneId } from '@/lib/skillsConfig'
import { Locale } from '@/lib/i18n'

const laneOptions = skillsConfig.lanes.map((l) => ({ id: l.id as LaneId, title: l.title }))
const allIndustries = Array.from(new Set(projectsConfig.map((p) => p.industry))).sort()
const allYears = Array.from(new Set(projectsConfig.map((p) => p.year))).sort((a, b) => b - a)

type SortKey = 'year-desc' | 'year-asc'
type DropdownKey = 'type' | 'domain' | 'industry' | 'year' | 'sort' | null

// ── Dropdown shell ─────────────────────────────────────────────────────────
function Dropdown({
  label, active, open, onToggle, children,
}: {
  label: string; active: boolean; open: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
          active
            ? 'bg-purple-600/20 border-purple-500/60 text-purple-300'
            : 'bg-gray-800/60 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
        }`}
      >
        {label}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1.5 z-50 min-w-[190px] rounded-xl border border-gray-700 bg-gray-900 shadow-2xl shadow-black/50 p-1.5">
          {children}
        </div>
      )}
    </div>
  )
}

// ── Multi-select checkbox option ───────────────────────────────────────────
function CheckOption({ checked, onClick, children }: { checked: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
        checked ? 'bg-purple-600/20 text-purple-300' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
      }`}
    >
      <span className={`flex-shrink-0 w-3.5 h-3.5 rounded border flex items-center justify-center ${
        checked ? 'bg-purple-600 border-purple-500' : 'border-gray-600'
      }`}>
        {checked && <Check size={9} className="text-white" />}
      </span>
      <span>{children}</span>
    </button>
  )
}

// ── Single-select option (sort only) ──────────────────────────────────────
function RadioOption({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
        selected ? 'bg-purple-600/20 text-purple-300' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
      }`}
    >
      <span>{children}</span>
      {selected && <Check size={11} className="text-purple-400 shrink-0" />}
    </button>
  )
}

// ── Label helpers ──────────────────────────────────────────────────────────
function multiLabel(prefix: string, items: (string | number)[], allLabel: string, maxShow = 1): string {
  if (items.length === 0) return `${prefix}: ${allLabel}`
  if (items.length <= maxShow) return `${prefix}: ${items.join(', ')}`
  return `${prefix}: ${items.length} selected`
}

// ── Clear link inside a dropdown ───────────────────────────────────────────
function ClearLink({ onClear, label }: { onClear: () => void; label: string }) {
  return (
    <>
      <div className="my-1 border-t border-gray-800" />
      <button onClick={onClear} className="w-full text-left px-3 py-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors">
        {label}
      </button>
    </>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Cards({ locale = 'en' }: { locale?: Locale }) {
  const t = {
    title:        locale === 'fr' ? 'Quelques exemples passés' : 'Some Past Examples',
    viewDetails:  locale === 'fr' ? 'Voir les détails' : 'View Details',
    sortBy:       locale === 'fr' ? 'Trier' : 'Sort',
    all:          locale === 'fr' ? 'Tous' : 'All',
    academic:     locale === 'fr' ? 'Académique' : 'Academic',
    professional: locale === 'fr' ? 'Professionnel' : 'Professional',
    personal:     locale === 'fr' ? 'Personnel' : 'Personal',
    type:         locale === 'fr' ? 'Type' : 'Type',
    domain:       locale === 'fr' ? 'Domaine' : 'Domain',
    industry:     locale === 'fr' ? 'Industrie' : 'Industry',
    year:         locale === 'fr' ? 'Année' : 'Year',
    newestFirst:  locale === 'fr' ? 'Plus récent' : 'Newest first',
    oldestFirst:  locale === 'fr' ? 'Plus ancien' : 'Oldest first',
    noResults:    locale === 'fr' ? 'Aucun projet ne correspond.' : 'No projects match the current filters.',
    clearFilters: locale === 'fr' ? 'Réinitialiser' : 'Clear filters',
    showing:      locale === 'fr' ? 'Résultats' : 'Showing',
    of:           locale === 'fr' ? 'sur' : 'of',
    projects:     locale === 'fr' ? 'projets' : 'projects',
  }

  // ── Filter state (all multi-select arrays) ─────────────────────────────
  const [selectedTypes,      setSelectedTypes]      = useState<ProjectType[]>([])
  const [selectedLanes,      setSelectedLanes]      = useState<LaneId[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedYears,      setSelectedYears]      = useState<number[]>([])
  const [sort,               setSort]               = useState<SortKey>('year-desc')
  const [openDropdown,       setOpenDropdown]       = useState<DropdownKey>(null)

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedLanes.length > 0 ||
    selectedIndustries.length > 0 ||
    selectedYears.length > 0

  function clearFilters() {
    setSelectedTypes([])
    setSelectedLanes([])
    setSelectedIndustries([])
    setSelectedYears([])
    setOpenDropdown(null)
  }

  function toggle<T>(val: T, set: React.Dispatch<React.SetStateAction<T[]>>) {
    set((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val])
  }

  function toggleDropdown(key: DropdownKey) {
    setOpenDropdown((prev) => (prev === key ? null : key))
  }

  // ── Dropdown trigger labels ─────────────────────────────────────────────
  const typeLabel = multiLabel(
    t.type,
    selectedTypes.map((v) => v === 'academic' ? t.academic : v === 'personal' ? t.personal : t.professional),
    t.all,
  )
  const domainLabel = multiLabel(
    t.domain,
    selectedLanes.map((id) => laneOptions.find((l) => l.id === id)?.title ?? id),
    t.all,
  )
  const industryLabel = multiLabel(t.industry, selectedIndustries, t.all)
  const yearLabel     = multiLabel(t.year,     selectedYears,      t.all)
  const sortLabel     = `${t.sortBy}: ${sort === 'year-desc' ? t.newestFirst : t.oldestFirst}`

  // ── Filtered + sorted list ──────────────────────────────────────────────
  const visible = useMemo(() => {
    let list = projectsConfig.filter((p) => {
      if (selectedTypes.length      > 0 && !selectedTypes.includes(p.projectType))            return false
      if (selectedIndustries.length > 0 && !selectedIndustries.includes(p.industry))          return false
      if (selectedYears.length      > 0 && !selectedYears.includes(p.year))                   return false
      if (selectedLanes.length      > 0 && !selectedLanes.some((l) => p.laneIds.includes(l))) return false
      return true
    })
    return [...list].sort((a, b) => sort === 'year-desc' ? b.year - a.year : a.year - b.year)
  }, [selectedTypes, selectedLanes, selectedIndustries, selectedYears, sort])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="py-12 md:py-20 border-t border-gray-800">
        <h3 className="h2 text-center">{t.title}</h3>

        {/* Backdrop to close dropdowns */}
        {openDropdown !== null && (
          <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
        )}

        {/* ── Filter bar ──────────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-wrap items-center gap-2 relative z-50">

          {/* Type */}
          <Dropdown label={typeLabel} active={selectedTypes.length > 0} open={openDropdown === 'type'} onToggle={() => toggleDropdown('type')}>
            <CheckOption checked={selectedTypes.includes('professional')} onClick={() => toggle<ProjectType>('professional', setSelectedTypes)}>{t.professional}</CheckOption>
            <CheckOption checked={selectedTypes.includes('academic')}     onClick={() => toggle<ProjectType>('academic',     setSelectedTypes)}>{t.academic}</CheckOption>
            <CheckOption checked={selectedTypes.includes('personal')}     onClick={() => toggle<ProjectType>('personal',     setSelectedTypes)}>{t.personal}</CheckOption>
            {selectedTypes.length > 0 && <ClearLink onClear={() => setSelectedTypes([])} label={t.clearFilters} />}
          </Dropdown>

          {/* Domain */}
          <Dropdown label={domainLabel} active={selectedLanes.length > 0} open={openDropdown === 'domain'} onToggle={() => toggleDropdown('domain')}>
            {laneOptions.map((lane) => (
              <CheckOption key={lane.id} checked={selectedLanes.includes(lane.id)} onClick={() => toggle<LaneId>(lane.id, setSelectedLanes)}>
                {lane.title}
              </CheckOption>
            ))}
            {selectedLanes.length > 0 && <ClearLink onClear={() => setSelectedLanes([])} label={t.clearFilters} />}
          </Dropdown>

          {/* Industry */}
          <Dropdown label={industryLabel} active={selectedIndustries.length > 0} open={openDropdown === 'industry'} onToggle={() => toggleDropdown('industry')}>
            {allIndustries.map((ind) => (
              <CheckOption key={ind} checked={selectedIndustries.includes(ind)} onClick={() => toggle<string>(ind, setSelectedIndustries)}>
                {ind}
              </CheckOption>
            ))}
            {selectedIndustries.length > 0 && <ClearLink onClear={() => setSelectedIndustries([])} label={t.clearFilters} />}
          </Dropdown>

          {/* Year */}
          <Dropdown label={yearLabel} active={selectedYears.length > 0} open={openDropdown === 'year'} onToggle={() => toggleDropdown('year')}>
            {allYears.map((yr) => (
              <CheckOption key={yr} checked={selectedYears.includes(yr)} onClick={() => toggle<number>(yr, setSelectedYears)}>
                {yr}
              </CheckOption>
            ))}
            {selectedYears.length > 0 && <ClearLink onClear={() => setSelectedYears([])} label={t.clearFilters} />}
          </Dropdown>

          {/* Divider */}
          <div className="h-5 w-px bg-gray-700 mx-1 hidden sm:block" />

          {/* Sort (single-select) */}
          <Dropdown label={sortLabel} active={false} open={openDropdown === 'sort'} onToggle={() => toggleDropdown('sort')}>
            <RadioOption selected={sort === 'year-desc'} onClick={() => { setSort('year-desc'); setOpenDropdown(null) }}>{t.newestFirst}</RadioOption>
            <RadioOption selected={sort === 'year-asc'}  onClick={() => { setSort('year-asc');  setOpenDropdown(null) }}>{t.oldestFirst}</RadioOption>
          </Dropdown>

          {/* Count + clear all */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-gray-500">
              {t.showing} {visible.length} {t.of} {projectsConfig.length} {t.projects}
            </span>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                <X size={11} />
                {t.clearFilters}
              </button>
            )}
          </div>
        </div>

        {/* ── Project grid ──────────────────────────────────────────────────── */}
        {visible.length === 0 ? (
          <div className="mt-16 text-center text-gray-500">
            <p className="mb-3">{t.noResults}</p>
            <button onClick={clearFilters} className="text-sm text-purple-400 hover:text-purple-300 underline">{t.clearFilters}</button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-2 gap-5 px-5 md:grid-cols-3 xl:px-0">
              {visible.map((project) => (
                <div key={project.id} className="relative col-span-1 h-auto overflow-hidden shadow-md flex flex-col">
                  <div className="max-h-60 overflow-hidden flex justify-center items-center mt-4">
                    <Image src={project.mediaSrc} alt={project.title[locale]} width={100} height={40} unoptimized />
                  </div>
                  <div className="mx-auto max-w-md text-center p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-purple-400">{project.year}</span>
                      <span className="text-xs text-gray-600">·</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                        project.projectType === 'academic'
                          ? 'border-blue-700/60 text-blue-400 bg-blue-900/20'
                          : project.projectType === 'personal'
                          ? 'border-purple-700/60 text-purple-400 bg-purple-900/20'
                          : 'border-green-700/60 text-green-400 bg-green-900/20'
                      }`}>
                        {project.projectType === 'academic' ? t.academic : project.projectType === 'personal' ? t.personal : t.professional}
                      </span>
                      <span className="text-xs text-gray-600">·</span>
                      <span className="text-xs text-gray-500">{project.industry}</span>
                    </div>
                    <h2 className="bg-gradient-to-br from-white to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal single-line-spacing">
                      <Balancer>{project.title[locale]}</Balancer>
                    </h2>
                    <div className="prose-sm leading-normal text-gray-500 md:prose mt-3">
                      <Balancer><p>{project.description[locale]}</p></Balancer>
                    </div>
                    <div className="mt-auto pt-4 flex flex-col items-center gap-2">
                      {project.linkUrl && (
                        <a href={project.linkUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-300 hover:text-blue-400 transition-colors">
                          {project.linkText?.[locale]}
                        </a>
                      )}
                      <Link href={`/Projects/${locale}/${project.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                        {t.viewDetails}
                        <ArrowRight size={14} />
                      </Link>
                      <div className="text-xs text-gray-400">{project.company[locale]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
