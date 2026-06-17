'use client'

import { useState, useEffect } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Method = 'planning-poker' | 'story-points' | 'tshirt' | 'three-point' | 'character-role'
type TShirt = 'XS' | 'S' | 'M' | 'L' | 'XL'
type Estimate = { storyId: number; value: number | TShirt }
type Character = 'devil' | 'knight' | 'sorcerer' | 'hunter'

type Story = {
  id: number
  title: string
  description: string
  truePoints: number
  tshirtTrue: TShirt
  threePoint: { o: number; m: number; p: number }
  why: string
}

// ── Stories ───────────────────────────────────────────────────────────────────

const STORIES: Story[] = [
  {
    id: 1,
    title: 'Password reset via email',
    description: 'Users request a secure reset link. Link expires after 1 hour.',
    truePoints: 5,
    tshirtTrue: 'M',
    threePoint: { o: 3, m: 5, p: 8 },
    why: 'Email delivery + token management + expiry edge cases = more than it looks.',
  },
  {
    id: 2,
    title: 'Admin activity dashboard',
    description: 'Real-time logins and actions per user. Filterable, CSV export.',
    truePoints: 13,
    tshirtTrue: 'XL',
    threePoint: { o: 8, m: 13, p: 21 },
    why: 'Aggregations + filters + export + perf at 10k users = sprint-ender territory.',
  },
  {
    id: 3,
    title: 'Save search preferences',
    description: 'Save up to 5 filter sets per user, persisted across sessions.',
    truePoints: 2,
    tshirtTrue: 'XS',
    threePoint: { o: 1, m: 2, p: 4 },
    why: 'Simple persistence with a small cap. Smallest story in this backlog.',
  },
  {
    id: 4,
    title: 'Order status notifications',
    description: 'Email updates on confirmed, shipped, delivered. Triggers within 1 min.',
    truePoints: 8,
    tshirtTrue: 'L',
    threePoint: { o: 5, m: 8, p: 13 },
    why: 'Three states × email provider × unsubscribe logic = beefier than it reads.',
  },
  {
    id: 5,
    title: 'API rate limiting',
    description: 'Per-user limits on all public endpoints. 429 + Retry-After header.',
    truePoints: 5,
    tshirtTrue: 'M',
    threePoint: { o: 3, m: 5, p: 10 },
    why: 'Cross-cutting concern + zero latency tolerance = deceptively complex.',
  },
]

const FIBONACCI = [1, 2, 3, 5, 8, 13, 21]
const TSHIRTS: TShirt[] = ['XS', 'S', 'M', 'L', 'XL']
const TSHIRT_POINTS: Record<TShirt, number> = { XS: 1, S: 2, M: 5, L: 8, XL: 13 }

// ── Character config ──────────────────────────────────────────────────────────

const CHARACTER_ORDER: Character[] = ['devil', 'knight', 'sorcerer', 'hunter']

type CharMeta = {
  name: string; emoji: string; title: string; description: string; behaviorDesc: string
  color: string; bg: string
  biasIdx: (i: number) => number
  lines: [string, string, string]
}

const CHAR_META: Record<Character, CharMeta> = {
  devil: {
    name: 'The Devil', emoji: '😈', title: "Devil's Advocate",
    description: 'Challenges every estimate. Pushes the team to justify assumptions.',
    behaviorDesc: 'Challenges every assumption',
    color: '#ef4444', bg: '#1a0505',
    biasIdx: (i) => Math.min(6, i + 2),
    lines: [
      'Sure. But has anyone thought about the midnight failure case? I\'ll say {n}.',
      '{n}. That\'s what you said last sprint — right before scope doubled.',
      'I\'ll say {n}. Don\'t say I didn\'t warn you about the edge cases.',
    ],
  },
  knight: {
    name: 'The Knight', emoji: '⚔️', title: 'Token Modifier',
    description: 'Balanced estimator. Holds 3 tokens to adjust estimates around the table.',
    behaviorDesc: 'Adjusts estimates with 3 tokens',
    color: '#f59e0b', bg: '#1a1005',
    biasIdx: (i) => i,
    lines: [
      '{n} points. I\'ll hold my tokens and hear the rest of the table.',
      'My read is {n}. Tokens ready if we need to nudge the consensus.',
      '{n} — seems fair. I may adjust once everyone weighs in.',
    ],
  },
  sorcerer: {
    name: 'The Sorcerer', emoji: '🧙', title: 'Hidden Insight',
    description: 'Cryptic but usually close. Their hint holds a useful signal.',
    behaviorDesc: 'Reveals hidden complexity',
    color: '#8b5cf6', bg: '#0d0520',
    biasIdx: (i) => Math.max(0, i - 1),
    lines: [
      'The threads weave deeper than they appear. I see {n} in the pattern.',
      '{n}. The last time this shape appeared, something stirred beneath.',
      'Mmm. {n}. Ask yourself — what else awakens when this is touched?',
    ],
  },
  hunter: {
    name: 'The Hunter', emoji: '🏹', title: 'Risk Tracker',
    description: 'Tracks dependencies and risks. Estimates high to protect the sprint.',
    behaviorDesc: 'Tracks risks & dependencies',
    color: '#22c55e', bg: '#031008',
    biasIdx: (i) => Math.min(6, i + 2),
    lines: [
      'I\'ve mapped the dependencies. We\'re at {n}, minimum.',
      '{n} — and that assumes the auth service doesn\'t slip.',
      '{n}. There\'s an integration risk that\'ll cost a day if it fails.',
    ],
  },
}

function pert(o: number, m: number, p: number) {
  return Math.round(((o + 4 * m + p) / 6) * 10) / 10
}
function pct(estimate: number, truth: number) {
  return Math.max(0, Math.round(100 - (Math.abs(estimate - truth) / truth) * 100))
}

// ── Method config ─────────────────────────────────────────────────────────────

type MethodMeta = {
  label: string
  emoji: string
  tagline: string
  rule: string
  hoverVisual: React.ReactNode
  selectBg: string    // hover bg on select card
  selectBorder: string
  selectAccent: string
}

const METHODS: Record<Method, MethodMeta> = {
  'planning-poker': {
    label: 'Planning Poker',
    emoji: '🃏',
    tagline: 'Simultaneous reveal eliminates anchoring bias.',
    rule: 'Pick a card secretly. Everyone flips at once — disagreement is the signal.',
    hoverVisual: (
      <div className="flex gap-1 justify-center">
        {['A', '3', '5', '8', 'K'].map((v, i) => (
          <div key={i} className="w-7 h-10 bg-white rounded border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-800 shadow">
            {v}
          </div>
        ))}
      </div>
    ),
    selectBg: 'hover:bg-emerald-950/70',
    selectBorder: 'border-emerald-700/40 hover:border-emerald-400',
    selectAccent: 'text-emerald-400',
  },
  'story-points': {
    label: 'Story Points',
    emoji: '📊',
    tagline: 'Relative complexity on a Fibonacci scale — not time.',
    rule: 'Your "1" is the simplest story. Everything else is sized relative to that.',
    hoverVisual: (
      <div className="flex gap-1.5 items-end justify-center">
        {[1, 2, 3, 5, 8, 13, 21].map((n, i) => (
          <div key={n} style={{ height: `${Math.min(40, 8 + i * 5)}px` }} className="w-4 bg-purple-500 rounded-t text-[8px] text-center text-white font-bold pt-0.5">
            {n}
          </div>
        ))}
      </div>
    ),
    selectBg: 'hover:bg-purple-950/70',
    selectBorder: 'border-purple-700/40 hover:border-purple-400',
    selectAccent: 'text-purple-400',
  },
  'tshirt': {
    label: 'T-Shirt Sizing',
    emoji: '👕',
    tagline: 'Gut-feel sizing for roadmaps and mixed audiences.',
    rule: 'Speed over precision. If you can size it in a breath, use a shirt size.',
    hoverVisual: (
      <div className="flex gap-2 justify-center items-end">
        {(['XS', 'S', 'M', 'L', 'XL'] as TShirt[]).map((s, i) => (
          <div key={s} style={{ fontSize: `${10 + i * 2}px` }} className="text-blue-400 font-bold">{s}</div>
        ))}
      </div>
    ),
    selectBg: 'hover:bg-blue-950/70',
    selectBorder: 'border-blue-700/40 hover:border-blue-400',
    selectAccent: 'text-blue-400',
  },
  'three-point': {
    label: 'PERT / Three-Point',
    emoji: '📐',
    tagline: 'Make uncertainty visible with three scenarios.',
    rule: 'Set best, likely, and worst case. The formula (O + 4M + P) ÷ 6 weights the middle.',
    hoverVisual: (
      <div className="flex items-center gap-1 justify-center text-xs font-mono">
        <span className="text-green-400 font-bold">O</span>
        <div className="flex-1 h-px bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 min-w-[40px]" />
        <span className="text-yellow-400 font-bold">M</span>
        <div className="flex-1 h-px bg-gradient-to-r from-yellow-400 to-red-500 min-w-[40px]" />
        <span className="text-red-400 font-bold">P</span>
      </div>
    ),
    selectBg: 'hover:bg-orange-950/70',
    selectBorder: 'border-orange-700/40 hover:border-orange-400',
    selectAccent: 'text-orange-400',
  },
  'character-role': {
    label: 'Character Estimation',
    emoji: '🎭',
    tagline: 'Role-play your way to consensus. Each character biases the group differently.',
    rule: 'Take turns estimating in character. The Knight holds 3 tokens to shift estimates around the table.',
    hoverVisual: (
      <div className="flex gap-2 justify-center text-xl">
        {(['😈', '⚔️', '🧙', '🏹'] as string[]).map((e, i) => (
          <span key={i}>{e}</span>
        ))}
      </div>
    ),
    selectBg: 'hover:bg-purple-950/70',
    selectBorder: 'border-purple-700/40 hover:border-purple-400',
    selectAccent: 'text-purple-400',
  },
}

// ── Tutorial steps ────────────────────────────────────────────────────────────

const TUTORIAL_STEPS: Record<Method, string[]> = {
  'planning-poker': [
    '👀 You\'re sitting at the sprint planning table',
    '🤫 Pick a card from your hand — keep it secret',
    '🃏 Everyone flips at once to avoid anchoring',
    '🗣 Disagree? That\'s the point — discuss it',
  ],
  'story-points': [
    '📊 Estimate complexity, not time',
    '🔢 Fibonacci gaps reflect growing uncertainty',
    '⚡ Your simplest story ever = 1. Rate everything else relative to that',
  ],
  'tshirt': [
    '👕 Pick a size — XS is trivial, XL is a week+',
    '⚡ Go fast — gut feel beats overthinking here',
    '🗺 Great for roadmaps before you break stories down',
  ],
  'three-point': [
    '📐 Three scenarios, one weighted estimate',
    '🟢 Optimistic: everything goes right',
    '🟡 Most Likely: normal friction applies',
    '🔴 Pessimistic: a dependency slips, a review adds a week',
  ],
  'character-role': [
    '🎭 Each player takes on a role that shapes their perspective',
    '😈 Devil challenges — ⚔️ Knight can nudge estimates with tokens',
    '🧙 Sorcerer hints at hidden complexity — 🏹 Hunter tracks risk',
    '⚔️ Knight: spend your 3 tokens to add or remove from any estimate',
  ],
}

// ── Tutorial bubble ───────────────────────────────────────────────────────────

function TutorialBubble({ method, accentColor }: { method: Method; accentColor: string }) {
  const steps = TUTORIAL_STEPS[method]
  const [stepIdx, setStepIdx] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Fade in immediately
    const fadeIn = setTimeout(() => setOpacity(1), 50)
    return () => clearTimeout(fadeIn)
  }, [])

  useEffect(() => {
    if (done) return

    let fadeOutTimer: ReturnType<typeof setTimeout>
    let nextTimer: ReturnType<typeof setTimeout>

    // Hold each step for 2.2 s, then fade out over 1 s, then advance
    fadeOutTimer = setTimeout(() => {
      setOpacity(0)
      nextTimer = setTimeout(() => {
        if (stepIdx < steps.length - 1) {
          setStepIdx(i => i + 1)
          setOpacity(1)
        } else {
          setDone(true)
        }
      }, 1000)
    }, 2200)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(nextTimer)
    }
  }, [stepIdx, done, steps.length])

  if (done) return null

  return (
    <div
      style={{
        opacity,
        transition: opacity === 1 ? 'opacity 0.35s ease-in' : 'opacity 1s ease-out',
        pointerEvents: 'none',
        borderLeft: `3px solid ${accentColor}`,
      }}
      className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4 bg-black/50 backdrop-blur-sm"
    >
      {/* Step dots */}
      <div className="flex gap-1 shrink-0">
        {steps.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === stepIdx ? accentColor : 'rgba(255,255,255,0.2)' }}
          />
        ))}
      </div>
      <p className="text-sm text-white/90 font-medium leading-snug">{steps[stepIdx]}</p>
    </div>
  )
}

// ── Select screen ─────────────────────────────────────────────────────────────

function SelectCard({ method, onSelect }: { method: Method; onSelect: () => void }) {
  const m = METHODS[method]
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`relative overflow-hidden rounded-2xl border text-left p-5 transition-all duration-200 group ${m.selectBorder} ${hov ? m.selectBg.replace('hover:', '') : 'bg-gray-900/50'}`}
    >
      {/* Visual preview — slides down on hover */}
      <div className={`overflow-hidden transition-all duration-200 ${hov ? 'max-h-12 mb-3 opacity-100' : 'max-h-0 opacity-0'}`}>
        {m.hoverVisual}
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-xl">{m.emoji}</span>
        <span className={`text-sm font-bold transition-colors ${hov ? m.selectAccent : 'text-gray-100'}`}>{m.label}</span>
        {method === 'character-role' && (
          <span className="ml-auto text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50">
            My idea
          </span>
        )}
        {hov && method !== 'character-role' && <span className={`text-xs ml-auto ${m.selectAccent}`}>Play →</span>}
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{m.tagline}</p>
      {method === 'character-role' && (
        <p className="text-[10px] text-purple-400/70 mt-1.5">Original estimation framework by Emery Dittmer</p>
      )}
    </button>
  )
}

// ── Playing card (poker) ──────────────────────────────────────────────────────

const SUITS = ['♠', '♥', '♦', '♣']
const RED_SUITS = new Set(['♥', '♦'])

function PlayingCard({
  value, suit = '♠', faceDown = false, selected = false, disabled = false, size = 'md', onClick,
}: {
  value: number | string; suit?: string; faceDown?: boolean; selected?: boolean; disabled?: boolean;
  size?: 'sm' | 'md' | 'lg'; onClick?: () => void
}) {
  const dims = size === 'sm' ? 'w-10 h-14' : size === 'lg' ? 'w-20 h-28' : 'w-14 h-20'
  const textSz = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-3xl' : 'text-xl'
  const pipSz = size === 'sm' ? 'text-[8px]' : 'text-[10px]'
  const isRed = RED_SUITS.has(suit)

  return (
    <button
      onClick={onClick}
      disabled={disabled || !onClick}
      className={`relative ${dims} rounded-lg border-2 transition-all duration-200 overflow-hidden shadow-md
        ${selected ? 'scale-110 -translate-y-2 shadow-xl border-yellow-400' : 'hover:scale-105 hover:-translate-y-1 border-gray-300'}
        ${disabled || !onClick ? 'cursor-default' : 'cursor-pointer'}
      `}
      style={{ background: faceDown ? undefined : 'white' }}
    >
      {faceDown ? (
        // Card back — classic blue crosshatch feel
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 25%, #1d4ed8 25%, #1d4ed8 50%, #1e3a8a 50%, #1e3a8a 75%, #1d4ed8 75%)', backgroundSize: '8px 8px' }}>
          <div className="border border-white/30 rounded-sm" style={{ width: '70%', height: '80%' }}>
            <div className="w-full h-full flex items-center justify-center border border-white/20 rounded-sm m-0.5">
              <span className="text-white/40 text-xs">★</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <span className={`absolute top-0.5 left-1 ${pipSz} font-bold leading-tight text-left`} style={{ color: isRed ? '#dc2626' : '#111827' }}>
            {value}<br /><span>{suit}</span>
          </span>
          <span className={`${textSz} font-bold`} style={{ color: isRed ? '#dc2626' : '#111827' }}>{value}</span>
          <span className={`absolute bottom-0.5 right-1 ${pipSz} font-bold leading-tight rotate-180`} style={{ color: isRed ? '#dc2626' : '#111827' }}>
            {value}<br /><span>{suit}</span>
          </span>
        </>
      )}
    </button>
  )
}

// ── Poker table game ──────────────────────────────────────────────────────────

const TEAM = [
  { name: 'Dev Lead', avatar: '👨‍💻', suit: '♥', bias: 1 },
  { name: 'Designer', avatar: '🎨', suit: '♦', bias: 0 },
  { name: 'QA',       avatar: '🔍', suit: '♣', bias: 1 },
]

function PokerGame({
  story, storyIdx, total, showTutorial, onLockIn,
}: {
  story: Story; storyIdx: number; total: number; showTutorial: boolean; onLockIn: (val: number) => void
}) {
  const [myCard, setMyCard] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [locked, setLocked] = useState(false)
  const [lockProgress, setLockProgress] = useState(0)
  const myCardRef = useRef<number | null>(null)
  useEffect(() => { myCardRef.current = myCard }, [myCard])

  const teamCards = TEAM.map(t => {
    const fi = myCard !== null ? FIBONACCI.indexOf(myCard) : 2
    return FIBONACCI[Math.min(FIBONACCI.length - 1, Math.max(0, fi + t.bias))]
  })
  const hasDisagreement = revealed && myCard !== null && teamCards.some(v => v !== myCard)

  // Auto-reveal + lock after picking a card
  useEffect(() => {
    if (myCard === null || locked) { setLockProgress(0); return }
    const DURATION = 2500
    const start = Date.now()
    const prog = setInterval(() => setLockProgress(Math.min(100, ((Date.now() - start) / DURATION) * 100)), 40)
    const t = setTimeout(() => {
      clearInterval(prog)
      setLockProgress(100)
      setRevealed(true)
      setLocked(true)
      if (myCardRef.current !== null) onLockIn(myCardRef.current)
    }, DURATION)
    return () => { clearInterval(prog); clearTimeout(t); setLockProgress(0) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCard, locked])

  return (
    // Poker table — green felt
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, #16a34a 0%, #15803d 30%, #166534 60%, #052e16 100%)', border: '2px solid #15803d', minHeight: '520px' }}
    >
      {/* Header rail */}
      <div className="flex items-center justify-between px-5 py-3" style={{ background: 'rgba(0,0,0,0.35)' }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">🃏</span>
          <span className="text-sm font-bold text-emerald-300">Planning Poker</span>
        </div>
        <div className="flex gap-1 items-center">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i < storyIdx ? 'bg-emerald-400 w-3' : i === storyIdx ? 'bg-yellow-400 w-5' : 'bg-white/20 w-3'}`} />
          ))}
        </div>
      </div>

      {/* Tutorial bubble — only on first story */}
      {showTutorial && (
        <div className="mx-5 mt-4">
          <TutorialBubble method="planning-poker" accentColor="#16a34a" />
        </div>
      )}

      {/* Opponents row */}
      <div className="flex justify-center gap-8 mt-5 px-5">
        {TEAM.map((t, i) => (
          <div key={t.name} className="flex flex-col items-center gap-2">
            <div className="text-2xl">{t.avatar}</div>
            <PlayingCard
              value={revealed && myCard !== null ? teamCards[i] : '?'}
              suit={t.suit}
              faceDown={!revealed}
              size="sm"
            />
            <span className="text-[10px] text-white/60">{t.name}</span>
          </div>
        ))}
      </div>

      {/* Story ticket — cream card in the center of the felt */}
      <div className="mx-6 mt-5 rounded-xl p-4 shadow-xl" style={{ background: 'rgba(255,251,235,0.95)', border: '1px solid rgba(0,0,0,0.15)' }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Story {storyIdx + 1} of {total}</span>
        </div>
        <p className="text-sm font-bold text-gray-900 mb-1">{story.title}</p>
        <p className="text-xs text-gray-600 leading-relaxed">{story.description}</p>
      </div>

      {/* Your hand */}
      <div className="mt-5 px-5">
        <p className="text-xs text-white/50 text-center mb-3 uppercase tracking-widest">
          {locked ? 'Locked in' : myCard !== null ? 'Locking in…' : 'Your hand — pick a card'}
        </p>
        {/* Extra vertical room for the selected card to float up into */}
        <div className="relative flex justify-center gap-2 flex-wrap" style={{ paddingTop: '20px' }}>
          {FIBONACCI.map((n, i) => {
            const isSelected = myCard === n
            const isOther = myCard !== null && myCard !== n
            return (
              <div
                key={n}
                style={{
                  opacity: isOther && locked ? 0.35 : 1,
                  transition: 'opacity 0.25s ease',
                  position: 'relative',
                }}
              >
                <PlayingCard
                  value={n}
                  suit={SUITS[i % 4]}
                  faceDown={false}
                  selected={isSelected}
                  disabled={locked && !isSelected}
                  onClick={locked ? undefined : () => setMyCard(n)}
                />
              </div>
            )
          })}
        </div>

        {/* Change card button — visible only after picking, before reveal */}
        {myCard !== null && !locked && (
          <div className="flex justify-center mt-3">
            <button
              onClick={() => setMyCard(null)}
              className="text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
            >
              ← change card
            </button>
          </div>
        )}
      </div>

      {/* Disagreement banner */}
      {hasDisagreement && (
        <div className="mx-5 mt-4 rounded-lg px-4 py-2 text-xs text-yellow-300 font-semibold text-center" style={{ background: 'rgba(0,0,0,0.40)' }}>
          🗣 Disagreement at the table
        </div>
      )}

      {/* Auto-lock progress bar */}
      <div className="px-5 pb-5 mt-4">
        {myCard !== null && !locked && (
          <div className="space-y-1.5">
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)' }}>
              <div
                className="h-full rounded-full transition-none"
                style={{ width: `${lockProgress}%`, background: '#ca8a04' }}
              />
            </div>
            <p className="text-[10px] text-white/30 text-center">locking in {myCard} pts automatically</p>
          </div>
        )}
        {locked && (
          <div className="w-full h-1.5 rounded-full" style={{ background: '#15803d' }} />
        )}
      </div>
    </div>
  )
}

// ── Non-poker input components ────────────────────────────────────────────────

const DEVIL_OPTIONS = [FIBONACCI[0], FIBONACCI[Math.floor(FIBONACCI.length / 2)], FIBONACCI[FIBONACCI.length - 1]]

function FibPicker({ value, onChange, accent, options = FIBONACCI }: { value: number | null; onChange: (v: number) => void; accent: string; options?: number[] }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {options.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`w-12 h-16 rounded-lg border-2 text-lg font-bold transition-all
            ${value === n ? `border-[${accent}] scale-110 shadow-lg text-white` : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:scale-105'}
          `}
          style={value === n ? { background: accent, borderColor: accent } : {}}
        >
          {n}
        </button>
      ))}
    </div>
  )
}

function TShirtPicker({ value, onChange }: { value: TShirt | null; onChange: (v: TShirt) => void }) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {TSHIRTS.map((s, i) => (
        <button key={s} onClick={() => onChange(s)}
          className={`flex flex-col items-center px-4 py-3 rounded-xl border-2 font-bold transition-all`}
          style={value === s ? { background: '#1d4ed8', borderColor: '#60a5fa', color: 'white', transform: 'scale(1.1)' } : { background: '#1f2937', borderColor: '#374151', color: '#d1d5db' }}
        >
          <span style={{ fontSize: `${12 + i * 2}px` }}>{s}</span>
          <span className="text-[9px] font-normal opacity-60 mt-0.5">~{TSHIRT_POINTS[s]}pt{TSHIRT_POINTS[s] > 1 ? 's' : ''}</span>
        </button>
      ))}
    </div>
  )
}

function PERTSliders({ value, onChange }: { value: { o: number; m: number; p: number }; onChange: (v: { o: number; m: number; p: number }) => void }) {
  const fields = [
    { key: 'o' as const, label: 'Optimistic', color: '#4ade80' },
    { key: 'm' as const, label: 'Most Likely', color: '#facc15' },
    { key: 'p' as const, label: 'Pessimistic', color: '#f87171' },
  ]
  return (
    <div className="space-y-3">
      {fields.map(({ key, label, color }) => (
        <div key={key}>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold" style={{ color }}>{label}</span>
            <span className="text-white font-bold">{value[key]} pts</span>
          </div>
          <input type="range" min={1} max={40} step={1} value={value[key]}
            onChange={e => onChange({ ...value, [key]: Number(e.target.value) })}
            className="w-full" style={{ accentColor: color }} />
        </div>
      ))}
      <div className="rounded-lg px-4 py-2 text-center mt-1" style={{ background: 'rgba(234,88,12,0.15)', border: '1px solid rgba(234,88,12,0.3)' }}>
        <span className="text-sm font-bold text-orange-300">{pert(value.o, value.m, value.p)} pts</span>
        <span className="text-xs text-gray-500 ml-2">(O + 4M + P) ÷ 6</span>
      </div>
    </div>
  )
}

// ── Generic play screen (non-poker) ──────────────────────────────────────────

const PLAY_BG: Record<Method, React.CSSProperties> = {
  'planning-poker':  {},
  'story-points':    { background: 'linear-gradient(135deg, #1e1b4b 0%, #0f0d2e 100%)', border: '2px solid #4c1d95' },
  'tshirt':          { background: 'linear-gradient(135deg, #0c1a2e 0%, #0d1f35 100%)', border: '2px solid #1e3a5f' },
  'three-point':     { background: 'linear-gradient(135deg, #1c0a00 0%, #431407 100%)', border: '2px solid #7c2d12' },
  'character-role':  { background: 'radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0d0818 100%)', border: '2px solid #4c1d95' },
}

const ACCENT_COLOR: Record<Method, string> = {
  'planning-poker':  '#16a34a',
  'story-points':    '#7c3aed',
  'tshirt':          '#2563eb',
  'three-point':     '#ea580c',
  'character-role':  '#a855f7',
}

function GenericPlayScreen({
  method, story, storyIdx, total, showTutorial, onLockIn,
}: {
  method: Method; story: Story; storyIdx: number; total: number; showTutorial: boolean; onLockIn: (val: number | TShirt) => void
}) {
  const m = METHODS[method]
  const accent = ACCENT_COLOR[method]
  const [fibVal, setFibVal] = useState<number | null>(null)
  const [tshirtVal, setTshirtVal] = useState<TShirt | null>(null)
  const [pertVal, setPertVal] = useState({ o: 5, m: 8, p: 13 })

  const hasVal = method === 'three-point' ? true : method === 'tshirt' ? tshirtVal !== null : fibVal !== null

  function lock() {
    if (method === 'tshirt' && tshirtVal) { onLockIn(tshirtVal); return }
    if (method === 'three-point') { onLockIn(pert(pertVal.o, pertVal.m, pertVal.p)); return }
    if (fibVal !== null) onLockIn(fibVal)
  }

  return (
    <div className="rounded-2xl overflow-hidden p-6 md:p-8 space-y-5" style={{ ...PLAY_BG[method], minHeight: '480px' }}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xl">{m.emoji}</span>
        <span className="text-sm font-bold" style={{ color: accent }}>{m.label}</span>
      </div>

      {/* Tutorial bubble — only on first story */}
      {showTutorial && <TutorialBubble method={method} accentColor={accent} />}

      {/* Progress */}
      <div className="flex gap-1 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="h-1 rounded-full transition-all" style={{
            width: i === storyIdx ? '20px' : '12px',
            background: i < storyIdx ? accent : i === storyIdx ? accent : '#374151',
            opacity: i < storyIdx ? 0.6 : 1,
          }} />
        ))}
        <span className="text-xs text-gray-500 ml-2">Story {storyIdx + 1} of {total}</span>
      </div>

      {/* Story card */}
      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-sm font-bold text-white mb-1">{story.title}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{story.description}</p>
      </div>

      {/* Input */}
      {method === 'story-points' && <FibPicker value={fibVal} onChange={setFibVal} accent={accent} />}
      {method === 'tshirt' && <TShirtPicker value={tshirtVal} onChange={setTshirtVal} />}
      {method === 'three-point' && <PERTSliders value={pertVal} onChange={setPertVal} />}

      <button
        onClick={lock}
        disabled={!hasVal}
        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: hasVal ? accent : '#374151' }}
      >
        Lock in estimate →
      </button>
    </div>
  )
}

// ── Feedback screen (after locking in) ───────────────────────────────────────

function FeedbackScreen({
  method, story, estimate, isLast, onNext,
}: {
  method: Method; story: Story; estimate: number; isLast: boolean; onNext: () => void
}) {
  const acc = pct(estimate, story.truePoints)
  const accent = ACCENT_COLOR[method]
  const bg = method === 'planning-poker'
    ? { background: 'radial-gradient(ellipse at 50% 0%, #15803d 0%, #052e16 100%)', border: '2px solid #15803d' }
    : PLAY_BG[method]

  return (
    <div className="rounded-2xl overflow-hidden p-6 md:p-8 space-y-5" style={bg}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: accent }}>Expert consensus</p>
          <p className="text-4xl font-bold text-white">{story.truePoints} pts</p>
          <p className="text-xs text-gray-400 mt-1">Your estimate: <strong className="text-white">{estimate}</strong></p>
        </div>
        <div className="text-right">
          <p className={`text-4xl font-bold ${acc >= 80 ? 'text-green-400' : acc >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
            {acc}%
          </p>
          <p className="text-xs text-gray-500">accuracy</p>
        </div>
      </div>

      {method === 'planning-poker' && (
        <div className="flex justify-center gap-3">
          {[{ name: 'You', val: estimate, suit: '♠' }, ...TEAM.map((t, i) => ({
            name: t.name,
            val: FIBONACCI[Math.min(FIBONACCI.length - 1, Math.max(0, FIBONACCI.indexOf(estimate) + t.bias))],
            suit: t.suit,
          }))].map(p => (
            <div key={p.name} className="flex flex-col items-center gap-1">
              <PlayingCard value={p.val} suit={p.suit} selected={p.name === 'You'} size="sm" />
              <span className="text-[9px] text-white/50">{p.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg p-3 text-xs text-gray-300 leading-relaxed" style={{ background: 'rgba(0,0,0,0.30)' }}>
        <span className="font-semibold text-white">Why: </span>{story.why}
      </div>

      <button onClick={onNext} className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
        {isLast ? 'See results →' : 'Next story →'}
      </button>
    </div>
  )
}

// ── Character role game ───────────────────────────────────────────────────────

function CharacterPortrait({ char, size = 56 }: { char: Character; size?: number }) {
  const w = size
  const h = Math.round(size * 1.3)
  if (char === 'devil') return (
    <svg width={w} height={h} viewBox="0 0 60 78" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="78" rx="8" fill="#1a0505"/>
      {/* Horns */}
      <path d="M20 42 Q13 24 18 8 Q23 26 27 40" fill="#991b1b"/>
      <path d="M40 42 Q47 24 42 8 Q37 26 33 40" fill="#991b1b"/>
      <path d="M18 8 Q20 4 23 8 Q23 20 27 38" fill="#7f1d1d"/>
      <path d="M42 8 Q40 4 37 8 Q37 20 33 38" fill="#7f1d1d"/>
      {/* Head */}
      <ellipse cx="30" cy="52" rx="20" ry="21" fill="#dc2626"/>
      <ellipse cx="30" cy="58" rx="14" ry="12" fill="#b91c1c" opacity="0.45"/>
      {/* Brow */}
      <path d="M16 46 Q21 42 26 46" stroke="#7f1d1d" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M44 46 Q39 42 34 46" stroke="#7f1d1d" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Eyes */}
      <ellipse cx="22" cy="50" rx="5" ry="6" fill="#0a0000"/>
      <ellipse cx="38" cy="50" rx="5" ry="6" fill="#0a0000"/>
      <ellipse cx="22" cy="50" rx="2.8" ry="3.8" fill="#fbbf24"/>
      <ellipse cx="38" cy="50" rx="2.8" ry="3.8" fill="#fbbf24"/>
      <ellipse cx="21" cy="49" rx="1" ry="1.5" fill="#fef3c7" opacity="0.6"/>
      <ellipse cx="37" cy="49" rx="1" ry="1.5" fill="#fef3c7" opacity="0.6"/>
      {/* Grin */}
      <path d="M20 63 Q30 73 40 63" stroke="#7f1d1d" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="25" y1="63" x2="23" y2="69" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="35" y1="63" x2="37" y2="69" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Collar */}
      <path d="M2 78 Q14 68 30 66 Q46 68 58 78" fill="#7f1d1d"/>
    </svg>
  )
  if (char === 'knight') return (
    <svg width={w} height={h} viewBox="0 0 60 78" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="78" rx="8" fill="#1c1917"/>
      {/* Helmet dome */}
      <path d="M10 46 Q9 18 30 13 Q51 18 50 46" fill="#78716c"/>
      {/* Brow ridge */}
      <rect x="10" y="42" width="40" height="8" rx="3" fill="#a8a29e"/>
      {/* Visor slots */}
      <rect x="13" y="50" width="34" height="5" rx="1.5" fill="#0c0a09"/>
      <rect x="13" y="57" width="34" height="5" rx="1.5" fill="#0c0a09"/>
      {/* Nasal bar */}
      <rect x="27" y="42" width="6" height="23" rx="3" fill="#0c0a09"/>
      {/* Cheek guards */}
      <path d="M10 46 L10 65 Q14 68 20 66 L20 50" fill="#6b7280" opacity="0.7"/>
      <path d="M50 46 L50 65 Q46 68 40 66 L40 50" fill="#6b7280" opacity="0.7"/>
      {/* Shine */}
      <path d="M17 24 Q19 15 25 12" stroke="#e7e5e4" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.25"/>
      {/* Pauldrons */}
      <ellipse cx="7" cy="63" rx="9" ry="5" fill="#57534e"/>
      <ellipse cx="53" cy="63" rx="9" ry="5" fill="#57534e"/>
      {/* Gorget */}
      <rect x="18" y="63" width="24" height="9" rx="4" fill="#6b7280"/>
      {/* Chest */}
      <path d="M4 78 L14 65 L30 61 L46 65 L56 78" fill="#57534e"/>
      <line x1="30" y1="61" x2="30" y2="78" stroke="#44403c" strokeWidth="1.5"/>
      <path d="M20 70 Q30 67 40 70" stroke="#44403c" strokeWidth="1" fill="none"/>
    </svg>
  )
  if (char === 'sorcerer') return (
    <svg width={w} height={h} viewBox="0 0 60 78" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="78" rx="8" fill="#0d0520"/>
      {/* Stars */}
      <circle cx="10" cy="10" r="1.2" fill="#c084fc" opacity="0.7"/>
      <circle cx="50" cy="7" r="1.5" fill="#c084fc" opacity="0.5"/>
      <circle cx="54" cy="22" r="1" fill="#e9d5ff" opacity="0.55"/>
      <circle cx="7" cy="32" r="1" fill="#c084fc" opacity="0.4"/>
      <circle cx="46" cy="17" r="0.9" fill="#e9d5ff" opacity="0.5"/>
      <circle cx="53" cy="38" r="0.7" fill="#c084fc" opacity="0.4"/>
      {/* Hat */}
      <path d="M30 2 L8 48 L52 48" fill="#3b0764"/>
      <path d="M30 2 L17 48 L43 48" fill="#4c1d95"/>
      {/* Hat highlight */}
      <path d="M30 2 L22 36" stroke="#7c3aed" strokeWidth="0.8" fill="none" opacity="0.5"/>
      {/* Hat brim */}
      <ellipse cx="30" cy="48" rx="23" ry="5.5" fill="#5b21b6"/>
      <ellipse cx="30" cy="48" rx="18" ry="4" fill="#6d28d9" opacity="0.6"/>
      {/* Head */}
      <ellipse cx="30" cy="61" rx="15" ry="14" fill="#ede9fe"/>
      <ellipse cx="30" cy="66" rx="11" ry="9" fill="#c4b5fd" opacity="0.3"/>
      {/* Eyes */}
      <ellipse cx="23" cy="59" rx="4" ry="5" fill="#4c1d95"/>
      <ellipse cx="37" cy="59" rx="4" ry="5" fill="#4c1d95"/>
      <ellipse cx="23" cy="58" rx="2.2" ry="3" fill="#a78bfa"/>
      <ellipse cx="37" cy="58" rx="2.2" ry="3" fill="#a78bfa"/>
      <ellipse cx="22.2" cy="57" rx="0.8" ry="1.2" fill="#ede9fe" opacity="0.7"/>
      <ellipse cx="36.2" cy="57" rx="0.8" ry="1.2" fill="#ede9fe" opacity="0.7"/>
      {/* Orb */}
      <circle cx="30" cy="75" r="6" fill="#7c3aed" opacity="0.45"/>
      <circle cx="30" cy="75" r="4" stroke="#a855f7" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <circle cx="28.5" cy="73.5" r="1.5" fill="#e9d5ff" opacity="0.75"/>
    </svg>
  )
  return (
    <svg width={w} height={h} viewBox="0 0 60 78" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="78" rx="8" fill="#020d07"/>
      {/* Cloak base */}
      <path d="M4 78 L10 50 Q18 40 30 38 Q42 40 50 50 L56 78" fill="#14532d"/>
      {/* Hood outer */}
      <path d="M11 46 Q12 18 30 13 Q48 18 49 46 Q41 52 30 53 Q19 52 11 46" fill="#166534"/>
      {/* Hood inner shadow */}
      <path d="M17 42 Q20 24 30 19 Q40 24 43 42 Q37 48 30 49 Q23 48 17 42" fill="#0f4b25"/>
      {/* Deep face shadow */}
      <ellipse cx="30" cy="37" rx="11" ry="13" fill="#020d07" opacity="0.88"/>
      {/* Green glowing eyes */}
      <ellipse cx="24" cy="35" rx="3" ry="3.5" fill="#4ade80" opacity="0.9"/>
      <ellipse cx="36" cy="35" rx="3" ry="3.5" fill="#4ade80" opacity="0.9"/>
      <ellipse cx="24" cy="34" rx="1.2" ry="1.8" fill="#bbf7d0" opacity="0.65"/>
      <ellipse cx="36" cy="34" rx="1.2" ry="1.8" fill="#bbf7d0" opacity="0.65"/>
      {/* Cloak collar highlights */}
      <path d="M17 46 Q19 44 22 46" stroke="#22c55e" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M43 46 Q41 44 38 46" stroke="#22c55e" strokeWidth="0.8" fill="none" opacity="0.4"/>
      {/* Arrow shaft */}
      <line x1="5" y1="62" x2="53" y2="53" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Arrowhead */}
      <polygon points="53,53 43,47 43,58" fill="#b45309"/>
      {/* Fletching */}
      <path d="M6 62 L2 57 L7 60 L2 66 Z" fill="#6b7280"/>
    </svg>
  )
}

function CharacterSeat({ char, estimate, isActive, isUser, tokenMod }: {
  char: Character; estimate: number | null; isActive: boolean; isUser: boolean; tokenMod: number
}) {
  const m = CHAR_META[char]
  const shown = estimate !== null
  return (
    <div
      className="rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all duration-300"
      style={{
        background: shown ? m.bg : 'rgba(0,0,0,0.35)',
        border: `1.5px solid ${isActive ? m.color : shown ? m.color + '55' : 'rgba(255,255,255,0.08)'}`,
        opacity: isActive || shown || isUser ? 1 : 0.45,
        transform: isActive ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {/* Portrait */}
      <div className="rounded-lg overflow-hidden" style={{ boxShadow: isActive ? `0 0 12px ${m.color}60` : 'none', transition: 'box-shadow 0.3s' }}>
        <CharacterPortrait char={char} size={52} />
      </div>
      {/* Name + role */}
      <div className="text-center">
        <p className="text-[11px] font-bold text-white leading-tight">{m.name}</p>
        <p className="text-[9px] font-semibold uppercase tracking-wider leading-tight mt-0.5" style={{ color: m.color }}>{m.title}</p>
        <p className="text-[8px] text-white/35 leading-tight mt-0.5">{m.behaviorDesc}</p>
      </div>
      {isUser && <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: m.color + '25', color: m.color }}>YOU</span>}
      {shown ? (
        <div className="flex items-end gap-1">
          <span className="text-xl font-bold" style={{ color: m.color }}>{estimate + tokenMod}</span>
          <span className="text-[10px] text-white/30 mb-0.5">pts</span>
          {tokenMod !== 0 && (
            <span className="text-[9px] font-bold mb-0.5" style={{ color: tokenMod > 0 ? '#4ade80' : '#f87171' }}>
              ({tokenMod > 0 ? '+' : ''}{tokenMod})
            </span>
          )}
        </div>
      ) : isActive ? (
        <span className="text-[10px] text-white/30 animate-pulse">thinking…</span>
      ) : (
        <span className="text-base text-white/10">—</span>
      )}
    </div>
  )
}

function CharacterRoleGame({ story, storyIdx, total, showTutorial, onLockIn }: {
  story: Story; storyIdx: number; total: number; showTutorial: boolean
  onLockIn: (val: number) => void
}) {
  const userChar = CHARACTER_ORDER[storyIdx % CHARACTER_ORDER.length]
  type GamePhase = 'intro-roster' | 'intro-reveal' | 'revealing' | 'user-turn' | 'knight-tokens' | 'knight-auto' | 'consensus'

  const aiChars = CHARACTER_ORDER.filter(c => c !== userChar)
  const knightIsUser = userChar === 'knight'
  const knightIsAI = aiChars.includes('knight')

  // Sorcerer goes last, hunter second-to-last
  const revealRank = (c: Character) => c === 'sorcerer' ? 2 : c === 'hunter' ? 1 : 0
  const aiRevealOrder = [...aiChars].sort((a, b) => revealRank(a) - revealRank(b))

  // Deterministic AI estimates
  const [aiEsts] = useState<Record<string, number>>(() => {
    const truthIdx = FIBONACCI.findIndex(f => f >= story.truePoints)
    const ti = truthIdx === -1 ? 3 : truthIdx
    return Object.fromEntries(aiChars.map(c => [c, FIBONACCI[CHAR_META[c].biasIdx(ti)]]))
  })

  const [phase, setPhase] = useState<GamePhase>('intro-roster')
  const [revealed, setRevealed] = useState(0)
  const [dialogue, setDialogue] = useState<Record<string, string>>({})
  const [userEst, setUserEst] = useState<number | null>(null)
  const [tokens, setTokens] = useState(3)
  const [tokenMods, setTokenMods] = useState<Record<string, number>>({})
  const [introProgress, setIntroProgress] = useState(0)

  // Sequential AI reveal (hunter then sorcerer last)
  useEffect(() => {
    if (phase !== 'revealing') return
    if (revealed >= aiRevealOrder.length) {
      const t = setTimeout(() => setPhase('user-turn'), 700)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      const char = aiRevealOrder[revealed]
      const est = aiEsts[char]
      const line = CHAR_META[char as Character].lines[storyIdx % 3].replace('{n}', String(est))
      setDialogue(prev => ({ ...prev, [char]: line }))
      setRevealed(r => r + 1)
    }, 1400)
    return () => clearTimeout(t)
  }, [phase, revealed])

  // Auto-advance intro-roster → intro-reveal (with progress tracking)
  useEffect(() => {
    if (phase !== 'intro-roster') { setIntroProgress(0); return }
    const DURATION = 2800
    const start = Date.now()
    const prog = setInterval(() => setIntroProgress(Math.min(100, ((Date.now() - start) / DURATION) * 100)), 40)
    const t = setTimeout(() => { clearInterval(prog); setIntroProgress(100); setPhase('intro-reveal') }, DURATION)
    return () => { clearInterval(prog); clearTimeout(t) }
  }, [phase])

  // Auto-lock consensus after a pause
  useEffect(() => {
    if (phase !== 'consensus' || consensus === null) return
    const t = setTimeout(() => onLockIn(consensus), 3000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, consensus])

  // Knight AI auto-adjust
  useEffect(() => {
    if (phase !== 'knight-auto') return
    const t = setTimeout(() => {
      if (knightIsAI && userEst !== null) {
        const others = aiChars.filter(c => c !== 'knight').map(c => [c, aiEsts[c]] as [string, number])
        const withUser: [string, number][] = [...others, [userChar, userEst]]
        const sorted = [...withUser].sort((a, b) => a[1] - b[1])
        const mods: Record<string, number> = {}
        if (sorted.length >= 2) {
          mods[sorted[sorted.length - 1][0]] = -1
          if (sorted[0][1] < sorted[sorted.length - 1][1]) mods[sorted[0][0]] = 1
        }
        setTokenMods(mods)
      }
      setPhase('consensus')
    }, 1800)
    return () => clearTimeout(t)
  }, [phase])

  function handleUserEst(val: number) {
    setUserEst(val)
    if (knightIsUser) setPhase('knight-tokens')
    else if (knightIsAI) setPhase('knight-auto')
    else setPhase('consensus')
  }

  function spendToken(char: string, delta: number) {
    if (tokens <= 0) return
    setTokenMods(prev => ({ ...prev, [char]: (prev[char] ?? 0) + delta }))
    setTokens(t => t - 1)
  }

  // Consensus = nearest Fibonacci to mean of all (modified) estimates
  const allVals = CHARACTER_ORDER.map(c => {
    const base = c === userChar ? userEst : (aiEsts[c] ?? null)
    if (base === null) return null
    return base + (tokenMods[c] ?? 0)
  }).filter((v): v is number => v !== null)

  const consensus = allVals.length === 4
    ? FIBONACCI.reduce((best, f) => {
        const avg = allVals.reduce((s, v) => s + v, 0) / allVals.length
        return Math.abs(f - avg) < Math.abs(best - avg) ? f : best
      })
    : null

  const knightAutoChar = knightIsAI && phase === 'knight-auto'
    ? aiChars.find(c => c === 'knight') : null

  // ── Intro: character roster ──────────────────────────────────────────────────
  if (phase === 'intro-roster') {
    return (
      <div className="rounded-2xl overflow-hidden p-6 space-y-5"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0d0818 100%)', border: '2px solid #4c1d95' }}>
        <div className="text-center space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-widest text-purple-400/60">Character Estimation · by Emery Dittmer</p>
          <h3 className="text-base font-bold text-white">Meet the characters</h3>
          <p className="text-xs text-gray-500">Each role shapes how that player reads the work</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CHARACTER_ORDER.map(c => {
            const m = CHAR_META[c]
            return (
              <div key={c} className="rounded-xl p-3 flex flex-col items-center gap-2"
                style={{ background: m.bg, border: `1.5px solid ${m.color}40` }}>
                <CharacterPortrait char={c} size={64} />
                <div className="text-center">
                  <p className="text-xs font-bold text-white">{m.name}</p>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: m.color }}>{m.title}</p>
                  <p className="text-[9px] text-white/40 mt-0.5 leading-tight">{m.behaviorDesc}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-none" style={{ width: `${introProgress}%`, background: '#7c3aed' }} />
          </div>
          <p className="text-[10px] text-purple-400/40 text-center">Revealing your role…</p>
        </div>
      </div>
    )
  }

  // ── Intro: role reveal ───────────────────────────────────────────────────────
  if (phase === 'intro-reveal') {
    const m = CHAR_META[userChar]
    return (
      <div className="rounded-2xl overflow-hidden p-6 space-y-5 flex flex-col items-center"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0d0818 100%)', border: `2px solid ${m.color}60` }}>
        <div className="text-center space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-widest text-purple-400/60">Story {storyIdx + 1} of {total}</p>
          <p className="text-sm text-white/60">Your role this story</p>
        </div>
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="rounded-xl overflow-hidden" style={{ boxShadow: `0 0 32px ${m.color}55` }}>
            <CharacterPortrait char={userChar} size={96} />
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-white">{m.name}</p>
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: m.color }}>{m.title}</p>
            <p className="text-xs text-white/50 max-w-xs leading-relaxed mt-2">{m.description}</p>
          </div>
        </div>
        <div className="w-full rounded-xl p-3 text-center text-xs text-white/40 leading-relaxed"
          style={{ background: `${m.color}10`, border: `1px solid ${m.color}25` }}>
          {m.behaviorDesc} — let this shape how you read the story
        </div>
        <button
          onClick={() => setPhase('revealing')}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${m.color}cc, ${m.color})` }}
        >
          Play as {m.name} →
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden p-5 space-y-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0d0818 100%)', border: '2px solid #4c1d95', minHeight: '540px' }}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg overflow-hidden shrink-0" style={{ boxShadow: `0 0 8px ${CHAR_META[userChar].color}50` }}>
            <CharacterPortrait char={userChar} size={32} />
          </div>
          <div>
            <p className="text-[9px] font-semibold text-purple-400/70 uppercase tracking-widest leading-none">Character Estimation · Emery Dittmer — Your role</p>
            <p className="text-sm font-bold leading-tight" style={{ color: CHAR_META[userChar].color }}>{CHAR_META[userChar].name}</p>
            <p className="text-[9px] text-white/40 leading-none">{CHAR_META[userChar].behaviorDesc}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="h-1.5 rounded-full transition-all"
              style={{ width: i === storyIdx ? '20px' : '10px', background: i < storyIdx ? '#a855f7' : i === storyIdx ? '#c084fc' : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>

      {showTutorial && <TutorialBubble method="character-role" accentColor="#a855f7" />}

      {/* Story */}
      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-[10px] font-semibold text-purple-400/60 uppercase tracking-widest mb-1">Story {storyIdx + 1} of {total}</p>
        <p className="text-sm font-bold text-white mb-1">{story.title}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{story.description}</p>
      </div>

      {/* Character seats */}
      <div className="grid grid-cols-2 gap-2">
        {CHARACTER_ORDER.map(char => {
          const isAI = char !== userChar
          const revealedForChar = isAI ? aiRevealOrder.indexOf(char) < revealed : userEst !== null
          const est = char === userChar ? userEst : (aiEsts[char] ?? null)
          const isActive = phase === 'revealing' && isAI && aiRevealOrder[revealed] === char
          return (
            <CharacterSeat
              key={char} char={char}
              estimate={revealedForChar ? est : null}
              isActive={isActive} isUser={char === userChar}
              tokenMod={tokenMods[char] ?? 0}
            />
          )
        })}
      </div>

      {/* Most recent dialogue */}
      {phase === 'revealing' && revealed > 0 && (() => {
        const lastChar = aiRevealOrder[revealed - 1]
        return lastChar && dialogue[lastChar] ? (
          <div className="rounded-lg px-3 py-2 text-xs text-white/65 italic" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <span className="font-semibold not-italic" style={{ color: CHAR_META[lastChar as Character].color }}>
              {CHAR_META[lastChar as Character].name}:{' '}
            </span>
            "{dialogue[lastChar]}"
          </div>
        ) : null
      })()}

      {/* User turn */}
      {phase === 'user-turn' && (
        <div className="space-y-3">
          <p className="text-xs text-white/40 text-center uppercase tracking-widest">
            Your turn, {CHAR_META[userChar].name} — pick your estimate
          </p>
          <FibPicker
            value={userEst} onChange={handleUserEst} accent={CHAR_META[userChar].color}
            options={userChar === 'devil' ? DEVIL_OPTIONS : FIBONACCI}
          />
        </div>
      )}

      {/* Knight token spending (user is knight) */}
      {phase === 'knight-tokens' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">⚔️ Spend your tokens</p>
            <div className="flex gap-1.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full border-2 transition-all"
                  style={{ background: i < tokens ? '#f59e0b' : 'transparent', borderColor: '#f59e0b' }} />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {CHARACTER_ORDER.filter(c => c !== 'knight').map(c => {
              const base = c === userChar ? userEst! : aiEsts[c]
              const mod = tokenMods[c] ?? 0
              return (
                <div key={c} className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                  style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${CHAR_META[c].color}35` }}>
                  <span className="text-lg">{CHAR_META[c].emoji}</span>
                  <span className="text-xs text-white/60 flex-1">{CHAR_META[c].name}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => spendToken(c, -1)} disabled={tokens <= 0}
                      className="w-7 h-7 rounded-lg text-sm font-bold transition-all disabled:opacity-25"
                      style={{ background: '#450a0a', color: '#f87171' }}>−</button>
                    <span className="text-base font-bold text-white w-8 text-center">{base + mod}</span>
                    <button onClick={() => spendToken(c, 1)} disabled={tokens <= 0}
                      className="w-7 h-7 rounded-lg text-sm font-bold transition-all disabled:opacity-25"
                      style={{ background: '#052e16', color: '#4ade80' }}>+</button>
                  </div>
                </div>
              )
            })}
          </div>
          <button onClick={() => setPhase('consensus')}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: '#f59e0b' }}>
            See consensus →
          </button>
        </div>
      )}

      {/* Knight AI adjusting */}
      {phase === 'knight-auto' && (
        <div className="rounded-lg px-4 py-3 text-sm text-yellow-300 text-center animate-pulse"
          style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.25)' }}>
          ⚔️ The Knight is spending tokens to balance the table…
        </div>
      )}

      {/* Consensus */}
      {phase === 'consensus' && consensus !== null && (
        <div className="space-y-3">
          <div className="rounded-xl p-4 text-center"
            style={{ background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.30)' }}>
            <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1">Table consensus</p>
            <p className="text-4xl font-bold text-white mb-0.5">{consensus} pts</p>
            <p className="text-xs text-gray-500">nearest Fibonacci to the group average</p>
          </div>
          <button onClick={() => onLockIn(consensus)}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: '#7c3aed' }}>
            Lock in {consensus} pts →
          </button>
        </div>
      )}
    </div>
  )
}

// ── Results screen ────────────────────────────────────────────────────────────

function ResultsScreen({
  method, estimates, onRetry, onRestart,
}: {
  method: Method; estimates: Estimate[]; onRetry: () => void; onRestart: () => void
}) {
  const accent = ACCENT_COLOR[method]
  const numericEstimates = estimates.map((e, i) => {
    if (method === 'tshirt') return TSHIRT_POINTS[e.value as TShirt]
    return e.value as number
  })
  const totalScore = Math.round(numericEstimates.reduce((s, v, i) => s + pct(v, STORIES[i].truePoints), 0) / estimates.length)
  const totalEstimated = numericEstimates.reduce((s, v) => s + v, 0)
  const totalTrue = STORIES.reduce((s, st) => s + st.truePoints, 0)
  const CAPACITY = 30

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 md:p-8 space-y-6">
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{METHODS[method].label} · Sprint complete</p>
        <p className={`text-6xl font-bold mb-2 ${totalScore >= 80 ? 'text-green-400' : totalScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
          {totalScore}%
        </p>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          {totalScore >= 80 ? 'Well calibrated — your team would ship confident sprints with these.' :
           totalScore >= 60 ? 'Good range — a couple of stories caught you off guard.' :
           'High variance. The best fix: retrospect on estimates every sprint, not just delivery.'}
        </p>
      </div>

      <div className="space-y-2">
        {STORIES.map((st, i) => {
          const est = numericEstimates[i]
          const acc = pct(est, st.truePoints)
          return (
            <div key={st.id} className="flex items-center gap-3 rounded-lg bg-gray-900/60 px-3 py-2.5">
              <div className={`w-1 h-8 rounded-full shrink-0 ${acc >= 80 ? 'bg-green-500' : acc >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
              <p className="text-xs text-gray-300 flex-1 min-w-0 truncate">{st.title}</p>
              <span className="text-xs text-gray-500 shrink-0">You: <strong className="text-white">{est}</strong></span>
              <span className="text-xs text-gray-500 shrink-0">·</span>
              <span className="text-xs text-gray-500 shrink-0">Expert: <strong style={{ color: accent }}>{st.truePoints}</strong></span>
              <span className={`text-xs font-bold w-9 text-right shrink-0 ${acc >= 80 ? 'text-green-400' : acc >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{acc}%</span>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sprint capacity ({CAPACITY} pts)</p>
        <div className="relative w-full bg-gray-800 rounded-full h-2 mb-2">
          <div className="h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (totalTrue / CAPACITY) * 100)}%`, background: accent }} />
          <div className="absolute top-0 h-2 w-0.5 bg-white/60 rounded-full" style={{ left: `${Math.min(99, (totalEstimated / CAPACITY) * 100)}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Expert total: <strong className="text-white">{totalTrue} pts</strong></span>
          <span>Your total: <strong className="text-white">{totalEstimated} pts</strong></span>
          {totalTrue > CAPACITY && <span className="text-red-400">⚠ Over by {totalTrue - CAPACITY} pts</span>}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onRestart} className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all" style={{ background: '#7c3aed' }}>
          Try another method
        </button>
        <button onClick={onRetry} className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gray-800 hover:bg-gray-700 text-white transition-all">
          Retry
        </button>
      </div>
    </div>
  )
}

// ── Root component ────────────────────────────────────────────────────────────

export default function EstimationGame() {
  const [phase, setPhase] = useState<'select' | 'play' | 'feedback' | 'results'>('select')
  const [method, setMethod] = useState<Method | null>(null)
  const [idx, setIdx] = useState(0)
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const [lastEstimate, setLastEstimate] = useState<number>(0)

  const story = STORIES[idx]
  const isLast = idx === STORIES.length - 1

  function start(m: Method) {
    setMethod(m); setIdx(0); setEstimates([]); setLastEstimate(0); setPhase('play')
  }
  function handleLockIn(val: number | TShirt) {
    const numeric = typeof val === 'string' ? TSHIRT_POINTS[val] : val
    setLastEstimate(numeric)
    setEstimates(prev => [...prev, { storyId: story.id, value: val }])
    setPhase('feedback')
  }
  function handleNext() {
    if (isLast) { setPhase('results'); return }
    setIdx(i => i + 1); setPhase('play')
  }
  function reset() { setPhase('select'); setMethod(null) }
  function retry() { setIdx(0); setEstimates([]); setLastEstimate(0); setPhase('play') }

  if (phase === 'select') {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 md:p-8">
        <div className="text-center mb-6">
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1">Sprint Planning Simulator</p>
          <p className="text-sm text-gray-400">Choose a method — hover to preview</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.keys(METHODS) as Method[]).map(m => (
            <SelectCard key={m} method={m} onSelect={() => start(m)} />
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'feedback' && method) {
    return (
      <FeedbackScreen
        method={method} story={story} estimate={lastEstimate}
        isLast={isLast} onNext={handleNext}
      />
    )
  }

  if (phase === 'results' && method) {
    return <ResultsScreen method={method} estimates={estimates} onRetry={retry} onRestart={reset} />
  }

  if (phase === 'play' && method) {
    if (method === 'planning-poker') {
      return (
        <PokerGame
          key={idx}
          story={story} storyIdx={idx} total={STORIES.length}
          showTutorial={idx === 0}
          onLockIn={handleLockIn}
        />
      )
    }
    if (method === 'character-role') {
      return (
        <CharacterRoleGame
          key={idx}
          story={story} storyIdx={idx} total={STORIES.length}
          showTutorial={idx === 0}
          onLockIn={handleLockIn}
        />
      )
    }
    return (
      <GenericPlayScreen
        key={idx}
        method={method} story={story} storyIdx={idx}
        total={STORIES.length} showTutorial={idx === 0}
        onLockIn={handleLockIn}
      />
    )
  }

  return null
}
