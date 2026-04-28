'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { skillsConfig, proficiencyMeta, Proficiency } from '@/lib/skillsConfig'
import { jobSkillMap } from '@/lib/jobSkillMap'
import rbcLogo      from '@/assets/companies/rbc_logo.png'
import pwcLogo      from '@/assets/companies/pwc_logo.png'
import mcgillLogo   from '@/assets/companies/McGill_University.png'
import compassLogo  from '@/assets/companies/compass-logo-2025-scaled.png'
import coveoLogo    from '@/assets/companies/Coveo logo.png'

// ── Constants ─────────────────────────────────────────────────────────────────
const W = 900
const H = 620
const CX = W / 2
const CY = H / 2
const ROLE_R    = 160
const SKILL_R   = 95
const COMPANY_R = 280
const FAN_HALF = 0.34
const MIN_SPEED = 4
const MAX_SPEED = 10
const DECAY     = 0.4   // speed multiplied by DECAY^(dt seconds) each frame

const PROF_NODE_R: Record<Proficiency, number> = {
  strong: 5, weak: 4, beginning: 3, 'no-skill': 2.5,
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function txAnchor(angle: number): string {
  const c = Math.cos(angle)
  return c > 0.2 ? 'start' : c < -0.2 ? 'end' : 'middle'
}

function wrapTitle(title: string): string[] {
  if (title.includes(' & ')) {
    const [a, b] = title.split(' & ')
    return [a, `& ${b}`]
  }
  const words = title.split(' ')
  if (words.length <= 2) return [title]
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

function randVel(): { vx: number; vy: number } {
  const a = Math.random() * Math.PI * 2
  const s = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED)
  return { vx: Math.cos(a) * s, vy: Math.sin(a) * s }
}

// ── Static layout ─────────────────────────────────────────────────────────────

const roleNodes = skillsConfig.lanes.map((lane, i) => {
  const angle = (2 * Math.PI * i) / skillsConfig.lanes.length - Math.PI / 2
  return {
    id: lane.id as string, title: lane.title, color: lane.color, angle,
    x: CX + ROLE_R * Math.cos(angle),
    y: CY + ROLE_R * Math.sin(angle),
    boundaryR: ROLE_R, isRole: true as const,
  }
})

interface SkillNode {
  id: string; name: string; proficiency: Proficiency; laneId: string
  x: number; y: number; boundaryR: number; isRole: false
  contributions: { laneId: string; percentage: number }[]
}

const skillNodes: SkillNode[] = skillsConfig.lanes.flatMap((lane, ri) => {
  const base = roleNodes[ri].angle
  return lane.skills.map((skill, si) => {
    const t = lane.skills.length > 1 ? si / (lane.skills.length - 1) : 0.5
    const angle = base + FAN_HALF * (t * 2 - 1)
    return {
      id: skill.id, name: skill.name, proficiency: skill.proficiency,
      laneId: lane.id as string, boundaryR: SKILL_R, isRole: false as const,
      x: CX + SKILL_R * Math.cos(angle),
      y: CY + SKILL_R * Math.sin(angle),
      contributions: skill.contributions.map(c => ({
        laneId: c.laneId as string, percentage: c.percentage,
      })),
    }
  })
})

const roleMap  = new Map<string, typeof roleNodes[0]>(roleNodes.map(r => [r.id, r]))
const skillMap = new Map<string, SkillNode>(skillNodes.map(s => [s.id, s]))

const edges = skillNodes.flatMap(skill =>
  skill.contributions
    .filter(c => c.percentage >= 20)
    .map(c => ({
      key:     `${skill.id}__${c.laneId}`,
      skillId: skill.id,
      laneId:  c.laneId,
      pct:     c.percentage,
      color:   roleMap.get(c.laneId)!.color,
    }))
)

// ── Company (3rd layer) ────────────────────────────────────────────────────────

interface CompanyNode {
  id: string; name: string; color: string
  x: number; y: number
  boundaryR: number; isRole: false; isCompany: true
}

interface CompanyEdge {
  key: string; companyId: string; laneId: string; pct: number
}

const N_COMPANIES = 5
const companyData: { id: string; name: string; color: string; angle: number; roleEdges: { laneId: string; pct: number }[] }[] = [
  {
    id: 'compass-data', name: 'Compass Data', color: '#059669',
    angle: -Math.PI / 2 + (2 * Math.PI * 0) / N_COMPANIES,
    roleEdges: [
      { laneId: 'project-management',    pct: 90 },
      { laneId: 'data-engineering',      pct: 80 },
      { laneId: 'data-science',          pct: 80 },
      { laneId: 'data-governance',       pct: 70 },
      { laneId: 'ml-ai-engineering',     pct: 75 },
      { laneId: 'data-analytics',        pct: 65 },
      { laneId: 'business-intelligence', pct: 50 },
    ],
  },
  {
    id: 'coveo', name: 'Coveo', color: '#ea580c',
    angle: -Math.PI / 2 + (2 * Math.PI * 1) / N_COMPANIES,
    roleEdges: [
      { laneId: 'business-intelligence', pct: 90 },
      { laneId: 'data-engineering',      pct: 85 },
      { laneId: 'data-science',          pct: 80 },
      { laneId: 'ml-ai-engineering',     pct: 75 },
      { laneId: 'data-analytics',        pct: 70 },
      { laneId: 'data-governance',       pct: 50 },
      { laneId: 'project-management',    pct: 30 },
    ],
  },
  {
    id: 'mcgill', name: 'McGill', color: '#9f1239',
    angle: -Math.PI / 2 + (2 * Math.PI * 2) / N_COMPANIES,
    roleEdges: [
      { laneId: 'data-science',          pct: 75 },
      { laneId: 'data-analytics',        pct: 60 },
      { laneId: 'ml-ai-engineering',     pct: 55 },
      { laneId: 'project-management',    pct: 50 },
      { laneId: 'data-engineering',      pct: 30 },
    ],
  },
  {
    id: 'pwc', name: 'PwC', color: '#dc2626',
    angle: -Math.PI / 2 + (2 * Math.PI * 3) / N_COMPANIES,
    roleEdges: [
      { laneId: 'project-management',    pct: 90 },
      { laneId: 'data-analytics',        pct: 85 },
      { laneId: 'data-governance',       pct: 70 },
      { laneId: 'data-science',          pct: 65 },
      { laneId: 'business-intelligence', pct: 60 },
      { laneId: 'ml-ai-engineering',     pct: 40 },
      { laneId: 'data-engineering',      pct: 35 },
    ],
  },
  {
    id: 'rbc', name: 'RBC', color: '#2563eb',
    angle: -Math.PI / 2 + (2 * Math.PI * 4) / N_COMPANIES,
    roleEdges: [
      { laneId: 'data-analytics',        pct: 80 },
      { laneId: 'business-intelligence', pct: 75 },
      { laneId: 'data-governance',       pct: 70 },
      { laneId: 'data-science',          pct: 55 },
      { laneId: 'project-management',    pct: 50 },
      { laneId: 'data-engineering',      pct: 30 },
    ],
  },
]

const companyNodes: CompanyNode[] = companyData.map(c => ({
  id: c.id, name: c.name, color: c.color,
  boundaryR: COMPANY_R, isRole: false, isCompany: true,
  x: CX + COMPANY_R * Math.cos(c.angle),
  y: CY + COMPANY_R * Math.sin(c.angle),
}))

const companyEdges: CompanyEdge[] = companyData.flatMap(c =>
  c.roleEdges.map(e => ({ key: `${c.id}__${e.laneId}`, companyId: c.id, laneId: e.laneId, pct: e.pct }))
)

const companyMap = new Map<string, CompanyNode>(companyNodes.map(c => [c.id, c]))

const allNodes = [...roleNodes, ...skillNodes, ...companyNodes]

const roleTitleLines = new Map(roleNodes.map(r => [r.id, wrapTitle(r.title)]))

const companyLogoSrc: Record<string, string | null> = {
  'compass-data': compassLogo.src,
  'coveo':        coveoLogo.src,
  'mcgill':       mcgillLogo.src,
  'pwc':          pwcLogo.src,
  'rbc':          rbcLogo.src,
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function NetworkDiagram() {
  const [hoveredId,        setHoveredId]        = useState<string | null>(null)
  const [lockedId,         setLockedId]         = useState<string | null>(null)
  const [hiddenRoles,      setHiddenRoles]      = useState<Set<string>>(new Set())
  const [hiddenCompanies,  setHiddenCompanies]  = useState<Set<string>>(new Set())
  const [hiddenSkills,     setHiddenSkills]     = useState<Set<string>>(new Set())
  const [filterOpen,       setFilterOpen]       = useState(false)
  const [filterSections,   setFilterSections]   = useState<Set<'jobs' | 'roles' | 'skills'>>(new Set(['jobs']))
  const [paused,           setPaused]           = useState(false)
  const pausedRef           = useRef(false)
  const hiddenCompaniesRef  = useRef<Set<string>>(new Set())
  const hiddenSkillsRef     = useRef<Set<string>>(new Set())

  const svgRef       = useRef<SVGSVGElement>(null)
  const nodeRefs        = useRef<Map<string, SVGGElement>>(new Map())
  const edgeRefs        = useRef<Map<string, SVGLineElement>>(new Map())
  const companyEdgeRefs = useRef<Map<string, SVGLineElement>>(new Map())
  const roleTextRefs    = useRef<Map<string, SVGTextElement[]>>(new Map())
  const companyTextRefs = useRef<Map<string, SVGTextElement[]>>(new Map())
  const rafRef       = useRef<number | null>(null)
  const dropdownRef  = useRef<HTMLDivElement>(null)

  const posRef  = useRef<Map<string, { x: number; y: number }>>(new Map())
  const velRef  = useRef<Map<string, { vx: number; vy: number }>>(new Map())
  const dragRef = useRef<{ id: string | null; offX: number; offY: number }>({ id: null, offX: 0, offY: 0 })
  const prevDragRef = useRef<{ x: number; y: number; t: number } | null>(null)
  const flingRef    = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 })

  const mouseSvgRef    = useRef<{ x: number; y: number } | null>(null)
  const lastHoveredRef = useRef<string | null>(null)
  const lockedIdRef    = useRef<string | null>(null)
  const hiddenRolesRef = useRef<Set<string>>(new Set())
  const clickStartRef  = useRef<{ id: string; x: number; y: number } | null>(null)
  const bgDownRef      = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => { lockedIdRef.current = lockedId }, [lockedId])
  useEffect(() => { hiddenRolesRef.current = hiddenRoles }, [hiddenRoles])
  useEffect(() => { hiddenCompaniesRef.current = hiddenCompanies }, [hiddenCompanies])
  useEffect(() => { hiddenSkillsRef.current = hiddenSkills }, [hiddenSkills])
  useEffect(() => { pausedRef.current = paused }, [paused])

  // Clear lock if the locked node gets hidden
  useEffect(() => {
    if (!lockedId) return
    if (roleMap.has(lockedId) && hiddenRoles.has(lockedId)) setLockedId(null)
    if (companyMap.has(lockedId) && hiddenCompanies.has(lockedId)) setLockedId(null)
    if (skillMap.has(lockedId) && hiddenSkills.has(lockedId)) setLockedId(null)
  }, [hiddenRoles, hiddenCompanies, hiddenSkills, lockedId])

  // Close filter dropdown on outside click
  useEffect(() => {
    if (!filterOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [filterOpen])

  const toggleRole = useCallback((id: string) => {
    setHiddenRoles(prev => {
      if (prev.size === 0) return new Set(roleNodes.map(r => r.id).filter(rid => rid !== id))
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const toggleCompany = useCallback((id: string) => {
    setHiddenCompanies(prev => {
      if (prev.size === 0) return new Set(companyNodes.map(c => c.id).filter(cid => cid !== id))
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const toggleSkill = useCallback((id: string) => {
    setHiddenSkills(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const toSvg = useCallback((cx: number, cy: number) => {
    if (!svgRef.current) return { x: 0, y: 0 }
    const r = svgRef.current.getBoundingClientRect()
    return { x: (cx - r.left) * (W / r.width), y: (cy - r.top) * (H / r.height) }
  }, [])

  // ── Physics loop ─────────────────────────────────────────────────────────────

  useEffect(() => {
    allNodes.forEach(node => {
      posRef.current.set(node.id, { x: node.x, y: node.y })
      velRef.current.set(node.id, randVel())
    })

    let last = performance.now()

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      allNodes.forEach(node => {
        const pos  = posRef.current.get(node.id)!
        const vel  = velRef.current.get(node.id)!
        const R    = node.boundaryR
        const drag = dragRef.current.id === node.id

        let x = pos.x
        let y = pos.y

        if (!drag && !pausedRef.current) {
          // Exponential speed decay toward MIN_SPEED floor
          const decay = Math.pow(DECAY, dt)
          vel.vx *= decay
          vel.vy *= decay
          const speed = Math.sqrt(vel.vx * vel.vx + vel.vy * vel.vy)
          if (speed > 0 && speed < MIN_SPEED) {
            const scale = MIN_SPEED / speed
            vel.vx *= scale
            vel.vy *= scale
          }

          x += vel.vx * dt
          y += vel.vy * dt

          const dx   = x - CX
          const dy   = y - CY
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist > 0) {
            const nx = dx / dist
            const ny = dy / dist

            if (dist > R) {
              const dot = vel.vx * nx + vel.vy * ny
              if (dot > 0) { vel.vx -= 2 * dot * nx; vel.vy -= 2 * dot * ny }
              x = CX + nx * R; y = CY + ny * R
            } else if (node.isRole && dist < SKILL_R) {
              const dot = vel.vx * nx + vel.vy * ny
              if (dot < 0) { vel.vx -= 2 * dot * nx; vel.vy -= 2 * dot * ny }
              x = CX + nx * SKILL_R; y = CY + ny * SKILL_R
            } else if ('isCompany' in node && dist < ROLE_R) {
              const dot = vel.vx * nx + vel.vy * ny
              if (dot < 0) { vel.vx -= 2 * dot * nx; vel.vy -= 2 * dot * ny }
              x = CX + nx * ROLE_R; y = CY + ny * ROLE_R
            }
          }

          posRef.current.set(node.id, { x, y })
        }

        const el = nodeRefs.current.get(node.id)
        if (!el) return
        el.setAttribute('transform', `translate(${x},${y})`)

        if (node.isRole) {
          const a      = Math.atan2(y - CY, x - CX)
          const lx     = 22 * Math.cos(a)
          const ly     = 22 * Math.sin(a)
          const anchor = txAnchor(a)
          const texts  = roleTextRefs.current.get(node.id) ?? []
          const n      = texts.length
          const LH     = 14
          texts.forEach((t, i) => {
            t.setAttribute('x', String(lx))
            t.setAttribute('y', String(ly + (i - (n - 1) / 2) * LH + 4))
            t.setAttribute('text-anchor', anchor)
          })
        } else if ('isCompany' in node) {
          const a      = Math.atan2(y - CY, x - CX)
          const lx     = 23 * Math.cos(a)
          const ly     = 23 * Math.sin(a)
          const anchor = txAnchor(a)
          const texts  = companyTextRefs.current.get(node.id) ?? []
          const n      = texts.length
          const LH     = 14
          texts.forEach((t, i) => {
            t.setAttribute('x', String(lx))
            t.setAttribute('y', String(ly + (i - (n - 1) / 2) * LH + 4))
            t.setAttribute('text-anchor', anchor)
          })
        }
      })

      edges.forEach(edge => {
        const el = edgeRefs.current.get(edge.key)
        const sp = posRef.current.get(edge.skillId)
        const rp = posRef.current.get(edge.laneId)
        if (el && sp && rp) {
          el.setAttribute('x1', String(sp.x)); el.setAttribute('y1', String(sp.y))
          el.setAttribute('x2', String(rp.x)); el.setAttribute('y2', String(rp.y))
        }
      })

      companyEdges.forEach(edge => {
        if (hiddenCompaniesRef.current.has(edge.companyId) || hiddenRolesRef.current.has(edge.laneId)) return
        const el = companyEdgeRefs.current.get(edge.key)
        const cp = posRef.current.get(edge.companyId)
        const rp = posRef.current.get(edge.laneId)
        if (el && cp && rp) {
          el.setAttribute('x1', String(cp.x)); el.setAttribute('y1', String(cp.y))
          el.setAttribute('x2', String(rp.x)); el.setAttribute('y2', String(rp.y))
        }
      })

      const mouse = mouseSvgRef.current
      if (mouse && !dragRef.current.id) {
        let bestId: string | null = null
        let bestDist = Infinity
        allNodes.forEach(node => {
          // Skip hidden/invisible nodes from hit-testing
          if (node.isRole && hiddenRolesRef.current.has(node.id)) return
          if (!node.isRole && !('isCompany' in node) && visibleSkillIdsRef.current && !visibleSkillIdsRef.current.has(node.id)) return
          if ('isCompany' in node && hiddenCompaniesRef.current.has(node.id)) return
          const pos  = posRef.current.get(node.id)
          if (!pos) return
          const hitR = node.isRole ? 16 : ('isCompany' in node ? 16 : 10)
          const dx   = mouse.x - pos.x
          const dy   = mouse.y - pos.y
          const d    = Math.sqrt(dx * dx + dy * dy)
          if (d < hitR && d < bestDist) { bestDist = d; bestId = node.id }
        })
        if (bestId !== lastHoveredRef.current) {
          lastHoveredRef.current = bestId
          setHoveredId(bestId)
        }
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [])

  // ── Drag / click handlers ────────────────────────────────────────────────────

  const handleNodePointerDown = useCallback((id: string, e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const p = posRef.current.get(id)
    if (!p) return
    svgRef.current?.setPointerCapture(e.pointerId)
    const sv = toSvg(e.clientX, e.clientY)
    dragRef.current       = { id, offX: sv.x - p.x, offY: sv.y - p.y }
    clickStartRef.current = { id, x: sv.x, y: sv.y }
    prevDragRef.current   = { x: sv.x, y: sv.y, t: performance.now() }
    flingRef.current      = { vx: 0, vy: 0 }
    if (svgRef.current) svgRef.current.style.cursor = 'grabbing'
  }, [toSvg])

  const handleSvgPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const sv = toSvg(e.clientX, e.clientY)
    mouseSvgRef.current = sv

    if (!dragRef.current.id) return
    const now = performance.now()

    if (prevDragRef.current) {
      const dt = (now - prevDragRef.current.t) / 1000
      if (dt > 0.001) {
        flingRef.current = {
          vx: (sv.x - prevDragRef.current.x) / dt,
          vy: (sv.y - prevDragRef.current.y) / dt,
        }
      }
    }
    prevDragRef.current = { x: sv.x, y: sv.y, t: now }

    posRef.current.set(dragRef.current.id, {
      x: sv.x - dragRef.current.offX,
      y: sv.y - dragRef.current.offY,
    })
  }, [toSvg])

  const handleSvgPointerUp = useCallback((e?: React.PointerEvent<SVGSVGElement>) => {
    if (e) {
      const sv = toSvg(e.clientX, e.clientY)

      const cs = clickStartRef.current
      if (cs && dragRef.current.id === cs.id) {
        const dx = sv.x - cs.x; const dy = sv.y - cs.y
        if (Math.sqrt(dx * dx + dy * dy) < 6) {
          setLockedId(prev => prev === cs.id ? null : cs.id)
        }
      }

      const bg = bgDownRef.current
      if (bg && !dragRef.current.id) {
        const dx = sv.x - bg.x; const dy = sv.y - bg.y
        if (Math.sqrt(dx * dx + dy * dy) < 6) setLockedId(null)
      }
    }

    clickStartRef.current = null
    bgDownRef.current     = null

    if (dragRef.current.id) {
      const f     = flingRef.current
      const speed = Math.sqrt(f.vx * f.vx + f.vy * f.vy)
      const s = speed > 5 ? Math.min(speed, 300) : MIN_SPEED + Math.random() * 20
      velRef.current.set(dragRef.current.id,
        speed > 5
          ? { vx: f.vx / speed * s, vy: f.vy / speed * s }
          : randVel()
      )
    }
    dragRef.current.id  = null
    prevDragRef.current = null
    if (svgRef.current) svgRef.current.style.cursor = ''
  }, [toSvg])

  // ── Derived state ─────────────────────────────────────────────────────────────

  const effectiveId      = lockedId ?? hoveredId
  const effectiveSkill   = skillMap.get(effectiveId ?? '')
  const effectiveRole    = roleMap.get(effectiveId ?? '')
  const effectiveCompany = companyMap.get(effectiveId ?? '')
  const roleSkills       = effectiveRole
    ? skillNodes.filter(s => s.laneId === effectiveRole.id)
    : []

  const highlightSkills = useMemo<Set<string> | null>(() => {
    if (!effectiveId) return null
    if (skillMap.has(effectiveId)) return new Set([effectiveId])
    if (roleMap.has(effectiveId))  return new Set(skillNodes.filter(s => s.laneId === effectiveId).map(s => s.id))
    if (companyMap.has(effectiveId)) {
      const mapped = jobSkillMap[effectiveId]
      if (mapped?.length) return new Set(mapped.map(e => e.skillId))
      // fallback: all skills in connected role lanes
      const laneIds = new Set(companyEdges.filter(e => e.companyId === effectiveId).map(e => e.laneId))
      return new Set(skillNodes.filter(s => laneIds.has(s.laneId)).map(s => s.id))
    }
    return null
  }, [effectiveId])

  const highlightRoles = useMemo<Set<string> | null>(() => {
    if (!effectiveId) return null
    const sk = skillMap.get(effectiveId)
    if (sk) return new Set(sk.contributions.filter(c => c.percentage >= 20).map(c => c.laneId))
    if (roleMap.has(effectiveId)) return new Set([effectiveId])
    if (companyMap.has(effectiveId)) return new Set(companyEdges.filter(e => e.companyId === effectiveId).map(e => e.laneId))
    return null
  }, [effectiveId])

  const highlightCompanies = useMemo<Set<string> | null>(() => {
    if (!effectiveId) return null
    if (companyMap.has(effectiveId)) return new Set([effectiveId])
    if (roleMap.has(effectiveId))
      return new Set(companyEdges.filter(e => e.laneId === effectiveId).map(e => e.companyId))
    const sk = skillMap.get(effectiveId)
    if (sk) {
      const laneIds = new Set(sk.contributions.filter(c => c.percentage >= 20).map(c => c.laneId))
      return new Set(companyEdges.filter(e => laneIds.has(e.laneId)).map(e => e.companyId))
    }
    return null
  }, [effectiveId])

  const visibleEdges = useMemo(
    () => edges.filter(e => !hiddenRoles.has(e.laneId)),
    [hiddenRoles]
  )

  // null = all skills visible; otherwise only skills connected to a visible role
  const visibleSkillIds = useMemo<Set<string> | null>(() => {
    const roleFiltered = hiddenRoles.size === 0 ? null : new Set(
      skillNodes.filter(s => s.contributions.some(c => c.percentage >= 20 && !hiddenRoles.has(c.laneId))).map(s => s.id)
    )
    if (hiddenSkills.size === 0) return roleFiltered
    const base = roleFiltered ?? new Set(skillNodes.map(s => s.id))
    return new Set(Array.from(base).filter(id => !hiddenSkills.has(id)))
  }, [hiddenRoles, hiddenSkills])

  const visibleSkillIdsRef = useRef<Set<string> | null>(null)
  useEffect(() => { visibleSkillIdsRef.current = visibleSkillIds }, [visibleSkillIds])

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="w-full select-none">

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 mb-3">

        {/* Unified filter dropdown */}
        <div className="relative" ref={dropdownRef}>
          {(() => {
            const totalHidden = hiddenRoles.size + hiddenCompanies.size + hiddenSkills.size
            return (
              <button
                onClick={() => setFilterOpen(v => !v)}
                className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors duration-150 ${
                  totalHidden > 0
                    ? 'border-blue-600 text-blue-400 bg-blue-900/20'
                    : 'border-gray-600 text-gray-300 hover:border-gray-400'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filter
                {totalHidden > 0 && (
                  <span className="text-[10px] font-bold bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0">
                    {totalHidden}
                  </span>
                )}
                <svg className={`w-3 h-3 transition-transform ${filterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )
          })()}

          {filterOpen && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-64 overflow-hidden">

              {/* ── Jobs accordion ── */}
              {(() => {
                const open = filterSections.has('jobs')
                const hiddenCount = hiddenCompanies.size
                return (
                  <div className="border-b border-gray-800 last:border-0">
                    <button
                      onClick={() => setFilterSections(prev => {
                        const next = new Set(prev)
                        open ? next.delete('jobs') : next.add('jobs')
                        return next
                      })}
                      className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-800/60 transition-colors duration-150 text-left"
                    >
                      <svg className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="flex-1 text-xs font-bold uppercase tracking-widest text-gray-300">Jobs</span>
                      {hiddenCount > 0 && (
                        <span className="text-[9px] font-bold bg-gray-700 text-gray-300 rounded px-1.5 py-0.5">
                          {companyNodes.length - hiddenCount}/{companyNodes.length}
                        </span>
                      )}
                      {hiddenCount > 0 && (
                        <button
                          onClick={e => { e.stopPropagation(); setHiddenCompanies(new Set()) }}
                          className="text-[9px] text-blue-400 hover:text-blue-300 transition-colors ml-1"
                        >
                          Clear
                        </button>
                      )}
                    </button>
                    {open && (
                      <div className="pb-1 bg-gray-950/40">
                        {companyNodes.map(company => {
                          const visible = !hiddenCompanies.has(company.id)
                          return (
                            <button key={company.id} onClick={() => toggleCompany(company.id)}
                              className="w-full flex items-center gap-2.5 px-4 py-1.5 hover:bg-gray-800/80 text-left transition-colors duration-100">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0 border transition-all duration-150"
                                style={{
                                  backgroundColor: visible ? company.color : 'transparent',
                                  borderColor: company.color,
                                  opacity: visible ? 1 : 0.45,
                                }}
                              />
                              <span className={`text-sm transition-colors duration-150 ${visible ? 'text-white' : 'text-gray-600'}`}>{company.name}</span>
                              {visible && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: company.color }} />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* ── Roles accordion ── */}
              {(() => {
                const open = filterSections.has('roles')
                const hiddenCount = hiddenRoles.size
                return (
                  <div className="border-b border-gray-800 last:border-0">
                    <button
                      onClick={() => setFilterSections(prev => {
                        const next = new Set(prev)
                        open ? next.delete('roles') : next.add('roles')
                        return next
                      })}
                      className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-800/60 transition-colors duration-150 text-left"
                    >
                      <svg className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="flex-1 text-xs font-bold uppercase tracking-widest text-gray-300">Roles</span>
                      {hiddenCount > 0 && (
                        <span className="text-[9px] font-bold bg-gray-700 text-gray-300 rounded px-1.5 py-0.5">
                          {roleNodes.length - hiddenCount}/{roleNodes.length}
                        </span>
                      )}
                      {hiddenCount > 0 && (
                        <button
                          onClick={e => { e.stopPropagation(); setHiddenRoles(new Set()) }}
                          className="text-[9px] text-blue-400 hover:text-blue-300 transition-colors ml-1"
                        >
                          Clear
                        </button>
                      )}
                    </button>
                    {open && (
                      <div className="pb-1 bg-gray-950/40">
                        {roleNodes.map(role => {
                          const visible = !hiddenRoles.has(role.id)
                          return (
                            <button key={role.id} onClick={() => toggleRole(role.id)}
                              className="w-full flex items-center gap-2.5 px-4 py-1.5 hover:bg-gray-800/80 text-left transition-colors duration-100">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0 border transition-all duration-150"
                                style={{
                                  backgroundColor: visible ? role.color : 'transparent',
                                  borderColor: role.color,
                                  opacity: visible ? 1 : 0.45,
                                }}
                              />
                              <span className={`text-sm transition-colors duration-150 ${visible ? 'text-white' : 'text-gray-600'}`}>{role.title}</span>
                              {visible && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: role.color }} />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* ── Skills accordion ── */}
              {(() => {
                const open = filterSections.has('skills')
                const hiddenCount = hiddenSkills.size
                const totalSkills = skillNodes.length
                return (
                  <div>
                    <button
                      onClick={() => setFilterSections(prev => {
                        const next = new Set(prev)
                        open ? next.delete('skills') : next.add('skills')
                        return next
                      })}
                      className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-800/60 transition-colors duration-150 text-left"
                    >
                      <svg className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="flex-1 text-xs font-bold uppercase tracking-widest text-gray-300">Skills</span>
                      {hiddenCount > 0 && (
                        <span className="text-[9px] font-bold bg-gray-700 text-gray-300 rounded px-1.5 py-0.5">
                          {totalSkills - hiddenCount}/{totalSkills}
                        </span>
                      )}
                      {hiddenCount > 0 && (
                        <button
                          onClick={e => { e.stopPropagation(); setHiddenSkills(new Set()) }}
                          className="text-[9px] text-blue-400 hover:text-blue-300 transition-colors ml-1"
                        >
                          Clear
                        </button>
                      )}
                    </button>
                    {open && (
                      <div className="max-h-64 overflow-y-auto bg-gray-950/40">
                        {roleNodes.map(role => {
                          const roleSkillList = skillNodes.filter(s => s.laneId === role.id)
                          const allVisible = roleSkillList.every(s => !hiddenSkills.has(s.id))
                          return (
                            <div key={role.id}>
                              {/* Role group header */}
                              <div className="flex items-center gap-2 px-4 pt-2 pb-0.5">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: role.color }} />
                                <span className="text-[10px] font-bold uppercase tracking-widest flex-1" style={{ color: role.color }}>
                                  {role.title}
                                </span>
                                {!allVisible && (
                                  <button
                                    onClick={() => {
                                      setHiddenSkills(prev => {
                                        const next = new Set(prev)
                                        roleSkillList.forEach(s => next.delete(s.id))
                                        return next
                                      })
                                    }}
                                    className="text-[9px] text-blue-400 hover:text-blue-300 transition-colors"
                                  >
                                    All
                                  </button>
                                )}
                              </div>
                              {roleSkillList.map(skill => {
                                const visible = !hiddenSkills.has(skill.id)
                                return (
                                  <button key={skill.id} onClick={() => toggleSkill(skill.id)}
                                    className="w-full flex items-center gap-2 px-5 py-1 hover:bg-gray-800/80 text-left transition-colors duration-100">
                                    <span
                                      className="w-1.5 h-1.5 rounded-full shrink-0 border transition-all duration-150"
                                      style={{
                                        backgroundColor: visible ? role.color : 'transparent',
                                        borderColor: role.color,
                                        opacity: visible ? 0.8 : 0.35,
                                      }}
                                    />
                                    <span className={`text-xs leading-snug transition-colors duration-150 ${visible ? 'text-gray-200' : 'text-gray-600'}`}>
                                      {skill.name}
                                    </span>
                                  </button>
                                )
                              })}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          )}
        </div>

        {/* Pause / Resume button */}
        <button
          onClick={() => setPaused(p => !p)}
          className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors duration-150 ${
            paused
              ? 'border-amber-500 text-amber-400 bg-amber-900/20'
              : 'border-gray-600 text-gray-300 hover:border-gray-400'
          }`}
        >
          {paused ? (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Resume
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              Pause
            </>
          )}
        </button>
      </div>

      {/* ── Diagram + side panel ── */}
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          onPointerDown={e => {
            const sv = toSvg(e.clientX, e.clientY)
            bgDownRef.current = { x: sv.x, y: sv.y }
          }}
          onPointerMove={handleSvgPointerMove}
          onPointerUp={handleSvgPointerUp}
          onPointerLeave={() => {
            handleSvgPointerUp()
            mouseSvgRef.current = null
            if (lastHoveredRef.current !== null) {
              lastHoveredRef.current = null
              setHoveredId(null)
            }
          }}
        >
          {/* Clip path for company logos — objectBoundingBox makes it position-independent */}
          <defs>
            <clipPath id="company-logo-clip" clipPathUnits="objectBoundingBox">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </clipPath>
          </defs>

          {/* Boundary rings */}
          <circle cx={CX} cy={CY} r={SKILL_R}   fill="none" stroke="#1e3a2f" strokeWidth={1} strokeDasharray="4 6" />
          <circle cx={CX} cy={CY} r={ROLE_R}    fill="none" stroke="#1e2a3a" strokeWidth={1} strokeDasharray="4 6" />
          {hiddenCompanies.size < companyNodes.length && <circle cx={CX} cy={CY} r={COMPANY_R} fill="none" stroke="#1a2e1a" strokeWidth={1} strokeDasharray="4 6" />}

          {/* Edges — only for visible roles */}
          {visibleEdges.map(edge => {
            const hi = !!effectiveId && (
              edge.skillId === effectiveId ||
              edge.laneId  === effectiveId ||
              (highlightSkills?.has(edge.skillId) && highlightRoles?.has(edge.laneId)) === true
            )
            return (
              <line
                key={edge.key}
                ref={el => {
                  if (!el) return
                  edgeRefs.current.set(edge.key, el)
                  const s = skillMap.get(edge.skillId)!
                  const r = roleMap.get(edge.laneId)!
                  el.setAttribute('x1', String(s.x)); el.setAttribute('y1', String(s.y))
                  el.setAttribute('x2', String(r.x)); el.setAttribute('y2', String(r.y))
                }}
                stroke={edge.color}
                strokeWidth={hi ? 1.8 : 0.7}
                strokeOpacity={effectiveId ? (hi ? 0.8 : 0.04) : Math.min(0.35, edge.pct / 160)}
              />
            )
          })}

          {/* Company–role edges */}
          {companyEdges.filter(e => !hiddenCompanies.has(e.companyId) && !hiddenRoles.has(e.laneId)).map(edge => {
            const company = companyMap.get(edge.companyId)!
            const hi = !!effectiveId && (highlightCompanies?.has(edge.companyId) ?? false) && (highlightRoles?.has(edge.laneId) ?? false)
            const sw = 0.5 + (edge.pct / 100) * 5.5
            return (
              <line
                key={edge.key}
                ref={el => {
                  if (!el) return
                  companyEdgeRefs.current.set(edge.key, el)
                  const c = companyMap.get(edge.companyId)!
                  const r = roleMap.get(edge.laneId)!
                  el.setAttribute('x1', String(c.x)); el.setAttribute('y1', String(c.y))
                  el.setAttribute('x2', String(r.x)); el.setAttribute('y2', String(r.y))
                }}
                stroke={company.color}
                strokeWidth={hi ? sw + 1 : sw}
                strokeOpacity={effectiveId ? (hi ? 0.75 : 0.05) : 0.25}
                strokeLinecap="round"
              />
            )
          })}

          {/* Skill nodes — only those connected to a visible role */}
          {skillNodes.filter(s => !visibleSkillIds || visibleSkillIds.has(s.id)).map(skill => {
            const nr        = PROF_NODE_R[skill.proficiency]
            const prof      = proficiencyMeta[skill.proficiency]
            const dim       = !!effectiveId && !highlightSkills?.has(skill.id)
            const isHov     = skill.id === effectiveId
            const showLabel = skill.id === hoveredId
            const isLocked  = skill.id === lockedId
            const above     = skill.y >= CY
            const label     = skill.name
            const tw        = Math.min(220, Math.max(72, label.length * 7 + 16))

            return (
              <g
                key={skill.id}
                ref={el => {
                  if (!el) return
                  nodeRefs.current.set(skill.id, el)
                  el.setAttribute('transform', `translate(${skill.x},${skill.y})`)
                }}
                style={{ cursor: 'grab' }}
                onPointerDown={e => handleNodePointerDown(skill.id, e)}
              >
                {isLocked && (
                  <circle cx={0} cy={0} r={nr + 4} fill="none"
                    stroke={prof.color} strokeWidth={1.5} strokeOpacity={0.75} />
                )}
                <circle cx={0} cy={0} r={isHov ? nr + 2 : nr} fill={prof.color} opacity={dim ? 0.1 : 0.88} />
                {showLabel && (
                  <>
                    <rect
                      x={-tw / 2} y={above ? -(nr + 25) : nr + 5}
                      width={tw} height={19} rx={3}
                      fill="#0f172a" stroke={prof.color} strokeWidth={0.8} strokeOpacity={0.75}
                      style={{ pointerEvents: 'none' }}
                    />
                    <text x={0} y={above ? -(nr + 11) : nr + 19}
                      textAnchor="middle" fontSize={11} fill="#f1f5f9"
                      style={{ pointerEvents: 'none' }}
                    >{label}</text>
                  </>
                )}
              </g>
            )
          })}

          {/* Role nodes — hidden roles are simply not rendered */}
          {roleNodes.filter(r => !hiddenRoles.has(r.id)).map(role => {
            const dim      = !!effectiveId && !highlightRoles?.has(role.id)
            const isLocked = role.id === lockedId
            const lines    = roleTitleLines.get(role.id)!
            const lx0      = 22 * Math.cos(role.angle)
            const ly0      = 22 * Math.sin(role.angle)
            const LH       = 14

            return (
              <g
                key={role.id}
                ref={el => {
                  if (!el) return
                  nodeRefs.current.set(role.id, el)
                  el.setAttribute('transform', `translate(${role.x},${role.y})`)
                }}
                style={{ cursor: 'grab' }}
                onPointerDown={e => handleNodePointerDown(role.id, e)}
              >
                {isLocked && (
                  <circle cx={0} cy={0} r={19} fill="none"
                    stroke={role.color} strokeWidth={1.5} strokeOpacity={0.65} />
                )}
                {effectiveId === role.id && !isLocked && (
                  <circle cx={0} cy={0} r={16} fill="none"
                    stroke={role.color} strokeWidth={1} strokeOpacity={0.35} />
                )}
                <circle cx={0} cy={0} r={11}
                  fill={`${role.color}22`} stroke={role.color}
                  strokeWidth={dim ? 1 : 2.2} opacity={dim ? 0.22 : 1}
                />
                {lines.map((line, li) => (
                  <text
                    key={li}
                    ref={el => {
                      if (!el) return
                      const arr = roleTextRefs.current.get(role.id) ?? []
                      arr[li] = el
                      roleTextRefs.current.set(role.id, arr)
                    }}
                    x={lx0}
                    y={ly0 + (li - (lines.length - 1) / 2) * LH + 4}
                    textAnchor={txAnchor(role.angle)}
                    fontSize={11} fontWeight={600}
                    fill={dim ? '#374151' : role.color}
                    style={{ pointerEvents: 'none' }}
                  >
                    {line}
                  </text>
                ))}
              </g>
            )
          })}

          {/* Company nodes (3rd layer) */}
          {companyNodes.filter(c => !hiddenCompanies.has(c.id)).map(company => {
            const dim      = !!effectiveId && !highlightCompanies?.has(company.id)
            const isHov    = company.id === effectiveId
            const isLocked = company.id === lockedId
            const lines    = wrapTitle(company.name)
            const LH       = 14

            return (
              <g
                key={company.id}
                ref={el => {
                  if (!el) return
                  nodeRefs.current.set(company.id, el)
                  el.setAttribute('transform', `translate(${company.x},${company.y})`)
                }}
                style={{ cursor: 'grab' }}
                onPointerDown={e => handleNodePointerDown(company.id, e)}
              >
                {isLocked && (
                  <circle cx={0} cy={0} r={20} fill="none"
                    stroke={company.color} strokeWidth={1.5} strokeOpacity={0.65} />
                )}
                {isHov && !isLocked && (
                  <circle cx={0} cy={0} r={18} fill="none"
                    stroke={company.color} strokeWidth={1} strokeOpacity={0.35} />
                )}
                {/* Node body */}
                <circle cx={0} cy={0} r={12}
                  fill={companyLogoSrc[company.id] ? '#ffffff' : `${company.color}28`}
                  stroke={company.color}
                  strokeWidth={dim ? 1 : 2} opacity={dim ? 0.2 : 1}
                />
                {companyLogoSrc[company.id] ? (
                  <image
                    href={companyLogoSrc[company.id]!}
                    x={-9} y={-9} width={18} height={18}
                    clipPath="url(#company-logo-clip)"
                    preserveAspectRatio="xMidYMid meet"
                    opacity={dim ? 0.15 : 1}
                    style={{ pointerEvents: 'none' }}
                  />
                ) : (
                  <text
                    x={0} y={4.5}
                    textAnchor="middle" fontSize={10} fontWeight={800}
                    fill={dim ? '#374151' : company.color}
                    style={{ pointerEvents: 'none' }}
                  >
                    {company.name[0]}
                  </text>
                )}
                {lines.map((line, li) => {
                  const a0  = Math.atan2(company.y - CY, company.x - CX)
                  const lx0 = 23 * Math.cos(a0)
                  const ly0 = 23 * Math.sin(a0)
                  return (
                    <text
                      key={li}
                      ref={el => {
                        if (!el) return
                        const arr = companyTextRefs.current.get(company.id) ?? []
                        arr[li] = el
                        companyTextRefs.current.set(company.id, arr)
                      }}
                      x={lx0} y={ly0 + (li - (lines.length - 1) / 2) * LH + 4}
                      textAnchor={txAnchor(a0)}
                      fontSize={11} fontWeight={700}
                      fill={dim ? '#374151' : company.color}
                      style={{ pointerEvents: 'none' }}
                    >
                      {line}
                    </text>
                  )
                })}
              </g>
            )
          })}
        </svg>

        {/* ── Side panel — skill detail or role skill list ── */}
        {lockedId && (effectiveSkill || effectiveRole || effectiveCompany) && (
          <div className="absolute top-4 right-2 w-52 bg-gray-950/90 border border-gray-700 rounded-xl backdrop-blur-sm pointer-events-auto shadow-xl overflow-hidden">

            {effectiveSkill ? (
              <div className="p-3">
                {/* Proficiency badge */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: proficiencyMeta[effectiveSkill.proficiency].color }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: proficiencyMeta[effectiveSkill.proficiency].color }}>
                    {proficiencyMeta[effectiveSkill.proficiency].label}
                  </span>
                </div>

                <p className="text-sm font-semibold text-white leading-snug mb-3">{effectiveSkill.name}</p>

                {/* Connected roles */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {effectiveSkill.contributions.filter(c => c.percentage >= 20).map(c => {
                    const role = roleMap.get(c.laneId)
                    if (!role) return null
                    return (
                      <span key={c.laneId}
                        className="text-[9px] font-medium px-1.5 py-0.5 rounded-full border"
                        style={{ borderColor: `${role.color}60`, color: role.color, backgroundColor: `${role.color}15` }}>
                        {role.title}
                      </span>
                    )
                  })}
                </div>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-skill', { detail: { id: effectiveSkill.id } }))}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-colors duration-150"
                >
                  See Skill
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

            ) : effectiveRole ? (
              <>
                {/* Role header */}
                <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-gray-800">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: effectiveRole.color }} />
                  <span className="text-xs font-bold text-white">{effectiveRole.title}</span>
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: effectiveRole.color }}>
                    Role
                  </span>
                </div>

                {/* One card per skill, same format as skill panel */}
                <div className="max-h-[420px] overflow-y-auto p-2 space-y-2">
                  {roleSkills.map(skill => {
                    const prof = proficiencyMeta[skill.proficiency]
                    return (
                      <div key={skill.id} className="rounded-lg border border-gray-700 bg-gray-900/60 p-3">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: prof.color }} />
                          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: prof.color }}>
                            {prof.label}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-white leading-snug mb-2">{skill.name}</p>

                        {/* Connected roles */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {skill.contributions.filter(c => c.percentage >= 20).map(c => {
                            const role = roleMap.get(c.laneId)
                            if (!role) return null
                            return (
                              <span key={c.laneId}
                                className="text-[9px] font-medium px-1.5 py-0.5 rounded-full border"
                                style={{ borderColor: `${role.color}60`, color: role.color, backgroundColor: `${role.color}15` }}>
                                {role.title}
                              </span>
                            )
                          })}
                        </div>

                        <button
                          onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-skill', { detail: { id: skill.id } }))}
                          className="w-full flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-colors duration-150"
                        >
                          See Skill
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : effectiveCompany ? (
              <>
                {/* Company header */}
                <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-gray-800">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: effectiveCompany.color }} />
                  <span className="text-xs font-bold text-white">{effectiveCompany.name}</span>
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: effectiveCompany.color }}>
                    Job
                  </span>
                </div>

                {/* Role connections with % bar */}
                <div className="p-3 space-y-2.5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Role coverage</p>
                  {companyEdges
                    .filter(e => e.companyId === effectiveCompany.id)
                    .sort((a, b) => b.pct - a.pct)
                    .map(edge => {
                      const role = roleMap.get(edge.laneId)
                      if (!role) return null
                      return (
                        <div key={edge.laneId}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] text-gray-300 font-medium">{role.title}</span>
                            <span className="text-[10px] font-bold" style={{ color: role.color }}>{edge.pct}%</span>
                          </div>
                          <div className="h-1 rounded-full bg-gray-800 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${edge.pct}%`, backgroundColor: role.color }} />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mt-2">
        {(Object.entries(proficiencyMeta) as [Proficiency, { label: string; color: string }][]).map(
          ([key, meta]) => (
            <span key={key} className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <circle cx="6" cy="6" r={PROF_NODE_R[key]} fill={meta.color} opacity={0.9} />
              </svg>
              {meta.label}
            </span>
          )
        )}
        <span className="text-[11px] text-gray-600">· drag · hover · click to lock</span>
      </div>
    </div>
  )
}
