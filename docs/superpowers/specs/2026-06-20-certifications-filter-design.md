# Certifications Page — Filter & Group-by Design

**Date:** 2026-06-20  
**Status:** Approved

---

## Overview

Update the Certifications page to:
1. Add all 18 certifications from LinkedIn (4 new certs, corrected dates)
2. Restructure cert data from grouped sections to a flat array with metadata
3. Add filter bar (Year, Domain, Technology) and Group-by control above the cert grid
4. Keep the existing card design and default grouped-by-domain view unchanged

---

## Data Model

Each certification is a flat object:

```ts
type Certification = {
  name: string
  image: StaticImageData
  company: string        // "Issued by: Databricks"
  link: string
  linktxt: string
  h: number
  year: string           // "2025"
  domain: string         // "Data Engineering"
  technology: string     // "Databricks"
}
```

`certsByLocale` changes from `Array<{ section, certification[] }>` to `Certification[]` per locale. Grouping is computed at render time.

### Full cert list (EN)

| Name | Technology | Domain | Year |
|---|---|---|---|
| GDPR & Data Privacy Fundamentals | DataCamp | AI & Compliance | 2026 |
| EU AI Act Literacy | DataCamp | AI & Compliance | 2026 |
| Databricks Certified Data Engineer Associate | Databricks | Data Engineering | 2025 |
| Academy Accreditation - Databricks Lakehouse Fundamentals | Databricks | Data Engineering | 2025 |
| Dataiku Advanced Designer | Dataiku | Analytics & Machine Learning | 2024 |
| Dataiku ML Practitioner | Dataiku | Analytics & Machine Learning | 2024 |
| Professional Scrum Master I (PSM I) | Scrum.org | Agile & Project Management | 2024 |
| Microsoft Certified: Fabric Analytics Engineer Associate | Microsoft | Data Engineering | 2024 |
| Dataiku Core Designer | Dataiku | Analytics & Machine Learning | 2024 |
| Python | HackerRank | Analytics & Machine Learning | 2023 |
| SQL | HackerRank | Analytics & Machine Learning | 2023 |
| Microsoft Certified: Azure Fundamentals | Microsoft | Data Engineering | 2023 |
| Tableau Desktop Specialist | Tableau | Visualization | 2023 |
| Microsoft Certified: Power BI Data Analyst Associate | Microsoft | Visualization | 2022 |
| Inclusive Mindset | PwC | Agile & Project Management | 2022 |
| Alteryx Designer Advanced | Alteryx | Analytics & Machine Learning | 2021 |
| Designer Core Certified (Alteryx) | Alteryx | Analytics & Machine Learning | 2021 |
| Certified Associate in Project Management (CAPM) | PMI | Agile & Project Management | 2021 |

### New image assets needed
- DataCamp logo (for GDPR & EU AI Act certs) — add `datacamp_logo.png` to `assets/certifications/`
- HackerRank logo (for Python & SQL certs) — add `hackerrank_logo.png` to `assets/certifications/`

### Credential links for new certs
- GDPR: `https://www.datacamp.com/certificate/GDP0012869164274`
- EU AI Act: `https://www.datacamp.com/certificate/EU0027355940737`
- Python (HackerRank): link to HackerRank profile (no specific credential ID provided)
- SQL (HackerRank): link to HackerRank profile (no specific credential ID provided)

### Existing unused image assets now wired up
- `dataiku_advanced` (`advanced desiger.png`) → Dataiku Advanced Designer
- `dataiku_ml_practitioner` (`ml practitioner.png`) → Dataiku ML Practitioner

### Notes
- Expiry dates are ignored — no "Expired" badge shown
- Tableau year corrected from 2022 → 2023
- French locale mirrors EN data with translated `company` and `linktxt` fields

---

## Component State

```ts
const [filters, setFilters] = useState({
  year: [] as string[],
  domain: [] as string[],
  technology: [] as string[],
})
const [groupBy, setGroupBy] = useState<'domain' | 'year' | 'technology' | 'none'>('domain')
const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
```

- Default: `groupBy = 'domain'`, all filters empty → same visual output as current page
- Filter options are derived from the data, not hardcoded
- `expandedSections` resets when filters or groupBy change (to avoid phantom "Show more" state)

---

## Filter Logic

```
filteredCerts = allCerts
  .filter(c => filters.year.length === 0 || filters.year.includes(c.year))
  .filter(c => filters.domain.length === 0 || filters.domain.includes(c.domain))
  .filter(c => filters.technology.length === 0 || filters.technology.includes(c.technology))

groupedCerts = groupBy === 'none'
  ? { 'All': filteredCerts }
  : groupBy === 'domain'   ? groupByKey(filteredCerts, 'domain')
  : groupBy === 'year'     ? groupByKey(filteredCerts, 'year')
  : groupBy === 'technology' ? groupByKey(filteredCerts, 'technology')
```

When `groupBy = 'year'`, sections are sorted descending (newest first).  
When `groupBy = 'domain'`, sections follow the canonical domain order:  
Data Engineering → Analytics & Machine Learning → Visualization → AI & Compliance → Agile & Project Management

---

## UI Layout

```
[ Year ▾ ]  [ Domain ▾ ]  [ Technology ▾ ]          Group by: [ Domain ▾ ]
──────────────────────────────────────────────────────────────────────────
  Data Engineering          Analytics & ML        Visualization …
  [ card ][ card ]          [ card ][ card ]       [ card ][ card ]
  Show more ↓               Show more ↓
```

- Filter bar: single flex row, wraps on mobile
- Each filter is a `<details>`-based dropdown (no external library) with checkboxes, styled to match the existing purple/dark theme
- Active filter shows a count badge: `Year (2)`
- "Clear all filters" link appears when any filter is active
- Group-by is a `<select>` dropdown on the right side of the filter bar
- Cert grid and Show more/less per section: unchanged from current implementation
- When `groupBy = 'none'`: single flat grid, no section headers, no Show more

---

## CertificationCard

No changes to `CertificationCard.tsx`. The `year` and other fields it already accepts remain the same.

---

## Files Changed

| File | Change |
|---|---|
| `components/certifications.tsx` | Refactor data + add filter/group-by logic and UI |
| `components/CertificationCard.tsx` | No changes |
| `assets/certifications/` | Add DataCamp and HackerRank logo images |

---

## Out of Scope

- Persisting filter state to URL params
- Animations on filter change
- Server-side filtering
