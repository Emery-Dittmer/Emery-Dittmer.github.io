'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { DashboardFilter, EMPTY_DASHBOARD_FILTER } from '@/lib/linearDashboard'

export type { DashboardFilter }

type Ctx = {
  filter: DashboardFilter
  setFilter: (f: DashboardFilter) => void
  clear: () => void
  isActive: boolean
}

const DashboardFilterContext = createContext<Ctx | null>(null)

export function DashboardFilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<DashboardFilter>(EMPTY_DASHBOARD_FILTER)

  const value = useMemo<Ctx>(
    () => ({
      filter,
      setFilter,
      clear: () => setFilter(EMPTY_DASHBOARD_FILTER),
      isActive: Boolean(filter.projectId || filter.dateFrom || filter.dateTo),
    }),
    [filter],
  )

  return <DashboardFilterContext.Provider value={value}>{children}</DashboardFilterContext.Provider>
}

export function useDashboardFilter() {
  const ctx = useContext(DashboardFilterContext)
  if (!ctx) throw new Error('useDashboardFilter must be used within DashboardFilterProvider')
  return ctx
}
