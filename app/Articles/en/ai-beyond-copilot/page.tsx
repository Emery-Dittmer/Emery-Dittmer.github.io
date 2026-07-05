export const metadata = {
  title: 'Beyond the Copilot — Emery Dittmer',
  description: 'The copilot framing for AI is already obsolete. As AI velocity outpaces our frameworks for understanding it, we need a better word — and a better relationship — than copilot.',
  keywords: ['AI', 'Artificial Intelligence', 'Future of Work', 'Technology', 'Product Management', 'Emery Dittmer'],
  authors: [{ name: 'Emery Dittmer' }],
  colorScheme: 'dark',
}

import Link from 'next/link'
import Image from 'next/image'

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-300 leading-relaxed text-[15px]">{children}</p>
}

function Callout({
  icon,
  children,
  tone = 'default',
}: {
  icon: string
  children: React.ReactNode
  tone?: 'default' | 'sky'
}) {
  const toneClasses =
    tone === 'sky'
      ? 'border-blue-800/40 bg-gradient-to-br from-blue-950/50 via-indigo-950/40 to-purple-950/40'
      : 'border-gray-800 bg-gray-900/60'
  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${toneClasses}`}>
      <span className="text-xl shrink-0">{icon}</span>
      <p className="text-sm text-gray-300 leading-relaxed">{children}</p>
    </div>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-2 py-8 border-y border-purple-800/40 text-center">
      <p className="text-2xl md:text-4xl font-bold text-white leading-snug tracking-tight">
        {children}
      </p>
    </blockquote>
  )
}

function BarRow({ pct, value, label, sub }: { pct: number; value: string; label: string; sub: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="text-sm font-bold text-purple-400 tabular-nums">{value}</span>
      </div>
      <div className="h-2.5 rounded-full bg-gray-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
  )
}

function CapabilityChart() {
  const rows = [
    { label: 'Human alone', speed: 3, judgment: 9 },
    { label: 'AI alone', speed: 9, judgment: 4 },
    { label: 'Human + AI', speed: 8, judgment: 8 },
  ]
  const max = 10
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 space-y-5">
      <div className="flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5 text-gray-300">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" /> Speed / throughput
        </span>
        <span className="flex items-center gap-1.5 text-gray-300">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block" /> Judgment / reliability
        </span>
      </div>
      <div className="space-y-4">
        {rows.map(r => (
          <div key={r.label} className={r.label === 'Human + AI' ? 'space-y-1.5 rounded-lg border border-purple-800/40 bg-purple-950/20 p-3 -m-3' : 'space-y-1.5'}>
            <p className="text-sm font-semibold text-white">{r.label}</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-2 rounded-full bg-gray-800 flex-1 overflow-hidden">
                  <div className="h-full rounded-full bg-purple-400" style={{ width: `${(r.speed / max) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-5 text-right tabular-nums">{r.speed}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 rounded-full bg-gray-800 flex-1 overflow-hidden">
                  <div className="h-full rounded-full bg-gray-400" style={{ width: `${(r.judgment / max) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-5 text-right tabular-nums">{r.judgment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 text-center pt-1 border-t border-gray-800">
        Illustrative comparison on a 0–10 conceptual scale, not measured data. The case for augmentation:
        combined use approaches AI&apos;s raw speed without giving up most of human judgment.
      </p>
    </div>
  )
}

function DeliverablesChart() {
  const rows = [
    {
      label: 'Controlled task, with Copilot',
      pct: 55.8,
      direction: 'faster' as const,
      source: 'Peng et al., 2023',
      url: 'https://arxiv.org/abs/2302.06590',
      detail: 'RCT · scripted HTTP-server task',
    },
    {
      label: 'Real repos, experienced devs, with AI',
      pct: 19,
      direction: 'slower' as const,
      source: 'METR, Jul 2025',
      url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
      detail: "RCT · developers' own production codebases",
    },
  ]
  const maxPct = 60
  const sources = [
    {
      title: 'The Impact of AI on Developer Productivity: Evidence from GitHub Copilot',
      authors: 'Peng, Kalliamvakou, Cihon & Demirer, 2023',
      note: 'Controlled experiment, 95 developers, scripted HTTP-server task. Funded by GitHub/Microsoft.',
      url: 'https://arxiv.org/abs/2302.06590',
    },
    {
      title: 'Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity',
      authors: 'METR, July 2025',
      note: "RCT, 16 experienced developers, 246 tasks in their own mature repos. Independent research org.",
      url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
    },
    {
      title: 'Measuring AI Ability to Complete Long Tasks',
      authors: 'METR, March 2025',
      note: 'Task-length-at-50%-reliability trend across frontier agents, 2019–2025.',
      url: 'https://arxiv.org/abs/2503.14499',
    },
  ]
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 space-y-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
        What the research actually shows
      </p>
      <div className="space-y-6">
        {rows.map(r => {
          const width = (r.pct / maxPct) * 100
          const labelInside = width > 62
          const isFaster = r.direction === 'faster'
          const labelText = `${r.pct}% ${r.direction}`
          return (
            <div key={r.label} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{r.label}</p>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-gray-500 underline underline-offset-2 hover:text-purple-300 shrink-0"
                >
                  {r.source} ↗
                </a>
              </div>
              <div className="relative h-20 rounded-lg bg-gray-800/40 overflow-hidden">
                <div className="absolute inset-y-0 left-1/2 w-px bg-gray-600 z-10" />
                {isFaster ? (
                  <div className="absolute inset-y-0 left-1/2 right-0 flex items-center">
                    <div
                      className="h-full rounded-r-lg bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.4)] flex items-center justify-end pr-4"
                      style={{ width: `${width}%` }}
                    >
                      {labelInside && (
                        <span className="text-xl font-extrabold text-white whitespace-nowrap">{labelText}</span>
                      )}
                    </div>
                    {!labelInside && (
                      <span className="ml-3 text-xl font-extrabold text-purple-300 whitespace-nowrap">{labelText}</span>
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-y-0 left-0 right-1/2 flex flex-row-reverse items-center">
                    <div
                      className="h-full rounded-l-lg bg-gradient-to-l from-rose-600 to-rose-400 shadow-[0_0_24px_rgba(251,113,133,0.4)] flex items-center justify-start pl-4"
                      style={{ width: `${width}%` }}
                    >
                      {labelInside && (
                        <span className="text-xl font-extrabold text-white whitespace-nowrap">{labelText}</span>
                      )}
                    </div>
                    {!labelInside && (
                      <span className="mr-3 text-xl font-extrabold text-rose-400 whitespace-nowrap">{labelText}</span>
                    )}
                  </div>
                )}
              </div>
              <p className="text-[11px] text-gray-600">{r.detail}</p>
            </div>
          )
        })}

        <div className="pt-4 border-t border-gray-800 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-gray-300">AI working alone, no human in the loop</p>
            <a
              href="https://arxiv.org/abs/2503.14499"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 underline underline-offset-2 hover:text-purple-300 text-[11px] shrink-0"
            >
              METR, Mar 2025 ↗
            </a>
          </div>
          <p className="text-sm font-semibold text-purple-300">
            Task length it can complete autonomously ~doubles every 7 months
          </p>
          <p className="text-[11px] text-gray-600">
            50% reliability threshold, frontier agents (e.g. Devin/Cursor-style autonomous mode), 2019–2025 trend
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center pt-3 border-t border-gray-800">
        Three real data points, three different framings — a scripted benchmark, developers&apos; own production
        codebases, and agents working with nobody watching. None of them agree on a single number, because
        &quot;does AI make you more productive&quot; isn&apos;t one question.
      </p>

      <details className="group pt-1">
        <summary className="cursor-pointer list-none text-xs font-semibold text-gray-400 hover:text-purple-300 flex items-center justify-center gap-1.5 select-none">
          <span>Sources &amp; further reading</span>
          <span className="transition-transform group-open:rotate-180">⌄</span>
        </summary>
        <div className="mt-4 space-y-4">
          {sources.map(s => (
            <div key={s.url} className="border-t border-gray-800 pt-3 first:border-t-0 first:pt-0">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gray-200 underline underline-offset-2 hover:text-purple-300"
              >
                {s.title} ↗
              </a>
              <p className="text-xs text-gray-500 mt-0.5">{s.authors}</p>
              <p className="text-[11px] text-gray-600 mt-1">{s.note}</p>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}

function VelocityChart() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
      <svg
        viewBox="0 0 500 220"
        className="w-full h-auto"
        role="img"
        aria-label="Conceptual chart showing AI capability rising steeply over time, a Copilot-style workflow stepping up in progress-then-review increments, and traditional tools staying roughly flat"
      >
        {/* gridlines */}
        <g stroke="#27272a" strokeWidth="1">
          <line x1="20" y1="45" x2="350" y2="45" />
          <line x1="20" y1="95" x2="350" y2="95" />
          <line x1="20" y1="145" x2="350" y2="145" />
        </g>
        {/* axes */}
        <line x1="20" y1="170" x2="350" y2="170" stroke="#3f3f46" strokeWidth="1.5" />
        <text x="185" y="200" textAnchor="middle" fill="#71717a" fontSize="11">Time</text>
        <text x="20" y="14" fill="#71717a" fontSize="11">↑ Capability</text>

        {/* traditional tools line */}
        <path d="M20,165 C140,163 260,160 350,150" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="350" cy="150" r="4" fill="#71717a" />
        <text x="360" y="147" fill="#a1a1aa" fontSize="12" fontWeight="600">Traditional tools</text>
        <text x="360" y="161" fill="#71717a" fontSize="10">(hammer, spreadsheet)</text>

        {/* copilot workflow: progress, review, progress, review... */}
        <path
          d="M20,160 L20,146 L75,146 L75,127 L130,127 L130,110 L185,110 L185,94 L240,94 L240,79 L295,79 L295,66 L350,66"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="350" cy="66" r="4.5" fill="#38bdf8" />
        <text x="360" y="63" fill="#7dd3fc" fontSize="12" fontWeight="600">Copilot workflow</text>
        <text x="360" y="77" fill="#71717a" fontSize="10">progress → review → progress…</text>

        {/* AI capability line */}
        <path d="M20,160 C140,155 260,105 350,30" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="350" cy="30" r="4.5" fill="#c084fc" />
        <text x="360" y="27" fill="#d8b4fe" fontSize="12" fontWeight="600">AI capability</text>
        <text x="360" y="41" fill="#71717a" fontSize="10">and rising</text>
      </svg>
      <p className="mt-3 text-xs text-gray-500 text-center">
        Illustrative, not measured data — the point is the shape of the gap, not the exact curve. The
        Copilot line steps up because each burst of AI progress still waits on a human review checkpoint
        before the next one starts.
      </p>
    </div>
  )
}

function ParametersChart() {
  const points = [
    { label: 'GPT-2', year: '2019', display: '1.5B', params: 1.5e9, url: 'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf' },
    { label: 'GPT-3', year: '2020', display: '175B', params: 175e9, url: 'https://arxiv.org/abs/2005.14165' },
    { label: 'PaLM', year: '2022', display: '540B', params: 540e9, url: 'https://arxiv.org/abs/2204.02311' },
  ]
  const logs = points.map(p => Math.log10(p.params))
  const minLog = Math.min(...logs)
  const maxLog = Math.max(...logs)
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 space-y-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
        Model parameters, officially disclosed
      </p>
      <div className="flex items-end justify-center gap-8 h-32">
        {points.map((p, i) => {
          const h = ((logs[i] - minLog) / (maxLog - minLog)) * 80 + 20
          return (
            <div key={p.label} className="flex h-full w-16 flex-col items-center justify-end">
              <span className="mb-1 text-xs font-bold text-white">{p.display}</span>
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-purple-700 to-purple-400"
                style={{ height: `${h}%` }}
              />
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-[11px] text-gray-400 underline underline-offset-2 hover:text-purple-300"
              >
                {p.label}
              </a>
              <span className="text-[10px] text-gray-600">{p.year}</span>
            </div>
          )
        })}
      </div>
      <p className="text-[11px] text-gray-600 text-center pt-2 border-t border-gray-800">
        Bar height is log-scaled — the raw jump is ~360× in three years. Newer frontier models (GPT-4 and
        beyond) no longer disclose parameter counts at all.
      </p>
    </div>
  )
}

function EfficiencyChart() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-3">
        Compute needed for the same performance
      </p>
      <svg
        viewBox="0 0 500 220"
        className="w-full h-auto"
        role="img"
        aria-label="Line chart showing the compute required to reach a fixed level of language model performance declining over time"
      >
        <g stroke="#27272a" strokeWidth="1">
          <line x1="20" y1="45" x2="350" y2="45" />
          <line x1="20" y1="95" x2="350" y2="95" />
          <line x1="20" y1="145" x2="350" y2="145" />
        </g>
        <line x1="20" y1="170" x2="350" y2="170" stroke="#3f3f46" strokeWidth="1.5" />
        <text x="185" y="200" textAnchor="middle" fill="#71717a" fontSize="11">Time</text>
        <text x="20" y="14" fill="#71717a" fontSize="11">↓ Compute needed</text>

        <path d="M20,30 C120,55 200,95 260,130 C300,152 330,162 350,166" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="30" r="4" fill="#c084fc" />
        <circle cx="350" cy="166" r="4.5" fill="#c084fc" />
        <text x="360" y="169" fill="#d8b4fe" fontSize="12" fontWeight="600">−50% every ~8mo</text>
      </svg>
      <p className="mt-3 text-xs text-gray-500 text-center">
        Curve illustrates the cited rate, not literal measured points. Source:{' '}
        <a
          href="https://epoch.ai/blog/algorithmic-progress-in-language-models"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 underline underline-offset-2 hover:text-purple-300"
        >
          Epoch AI, algorithmic progress in language models ↗
        </a>
      </p>
    </div>
  )
}

function MMLUChart() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-3">
        MMLU benchmark score by release date
      </p>
      <div className="relative w-full overflow-hidden rounded-lg border border-gray-800">
        <Image
          src="/images/articles/llm-mmlu-model-size.jpg"
          alt="Bubble chart of 100+ LLM releases from 2020-2025 by MMLU score and release date, bubble size showing parameter count and color showing developer, with a human-expert reference line at 89.8%"
          width={1200}
          height={630}
          className="w-full h-auto"
        />
      </div>
      <p className="mt-3 text-xs text-gray-500 text-center">
        Chart credit:{' '}
        <a
          href="https://informationisbeautiful.net/visualizations/the-rise-of-generative-ai-large-language-models-llms-like-chatgpt/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 underline underline-offset-2 hover:text-purple-300"
        >
          Information is Beautiful ↗
        </a>
        , via{' '}
        <a
          href="https://labelyourdata.com/articles/llm-fine-tuning/llm-model-size"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 underline underline-offset-2 hover:text-purple-300"
        >
          Label Your Data ↗
        </a>
        . Reused under CC BY-NC (non-commercial, attributed).
      </p>
    </div>
  )
}

export default function AIBeyondCopilotArticle() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/en" className="hover:text-gray-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/Articles/en" className="hover:text-gray-300 transition-colors">Articles</Link>
        <span>/</span>
        <span className="text-gray-300">Beyond the Copilot</span>
      </nav>

      {/* Header image */}
      <div className="relative mb-10 -mx-4 sm:-mx-6 md:mx-0 aspect-[16/9] md:aspect-[21/9] overflow-hidden md:rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1600&q=80"
          alt="Abstract render evoking AI and machine intelligence"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Technology &amp; AI</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">9 min read</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">June 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-5">
          Beyond the Copilot: AI Was Never Going to Stay in the Passenger Seat
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          The metaphor we reached for — copilot — was always a placeholder. AI is accelerating past it. And the
          honest question isn&apos;t whether AI will stay our assistant, but what kind of relationship we actually want
          before that choice is made for us.
        </p>
      </div>

      <article className="space-y-10">

        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The label that already doesn&apos;t fit
          </h2>
          <div className="space-y-4">
            <P>
              When GitHub launched Copilot in 2021, the name felt right. It implied partnership — a second set of hands
              on the controls, someone who handles the navigation while you fly the plane. The metaphor was reassuring
              because it preserved the most important thing: you were still the pilot. The machine was just along for the
              ride.
            </P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-center">
              <P>
                That framing has aged badly. Not because the product failed, but because the trajectory of the technology
                made the metaphor obsolete faster than anyone expected. A copilot waits for direction. It doesn&apos;t
                anticipate. It doesn&apos;t architect. It certainly doesn&apos;t start refactoring your codebase at 3 a.m.
                while you sleep. But increasingly, the tools we build around AI do all of those things.
              </P>
              <DeliverablesChart />
            </div>
            <P>
              The problem is we haven&apos;t replaced the metaphor. We&apos;re still using the language of copilots and
              assistants to describe something that is rapidly becoming something else entirely — and the gap between
              our vocabulary and our reality is where most of the anxiety about AI lives.
            </P>
            <Callout icon="✈️" tone="sky">
              The copilot metaphor implies a fixed division of labour. But the velocity of AI development doesn&apos;t
              respect fixed divisions. The passenger seat today is the driver&apos;s seat by next year — and the
              cockpit door may not be labeled the same way twice.
            </Callout>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The velocity problem
          </h2>
          <div className="space-y-4">
            <P>
              The thing that makes AI different from every previous productivity tool is the rate at which its capability
              ceiling rises. A hammer is a hammer in ten years. Spreadsheets got better slowly, over decades. AI systems
              are improving on timescales that make annual planning feel like archaeology.
            </P>
            <VelocityChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ParametersChart />
              <EfficiencyChart />
            </div>
            <MMLUChart />
            <PullQuote>AI is not a copilot. It is the pilot.</PullQuote>
            <P>
              This creates a specific kind of cognitive dissonance. The tool you onboarded three months ago is not the
              same tool you&apos;re using today. The workflows you built around it are already optimised for a version that
              no longer exists. And the people who are most confident about where AI is headed — including the people
              building it — are frequently and spectacularly wrong about the timeline.
            </P>
            <P>
              What does this mean practically? It means the decisions we&apos;re deferring to AI today — which autocomplete
              suggestion to accept, which test to write, which error to investigate — are a small slice of a much larger
              decision surface that will expand over time. If the trajectory continues, the logical end state is not
              a tool we direct. It is a system that handles entire domains while we supervise at a distance. And
              supervision of a system you don&apos;t fully understand is a different cognitive job than piloting one.
            </P>
            <Callout icon="📈">
              The question isn&apos;t whether AI will be capable of making decisions without us. It&apos;s whether we will
              have kept enough skin in the decision-making process to know when it&apos;s wrong — and care enough to say so.
            </Callout>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            Why the simple work matters more than we admit
          </h2>
          <div className="space-y-4">
            <P>
              There is a pattern in how humans learn complex skills that we are at risk of optimising away. You cannot
              become a senior engineer without writing a lot of code that a senior engineer wouldn&apos;t need to write.
              You cannot become a strong product manager without sitting through a lot of backlog grooming sessions
              that feel like a waste of time. The simple work is not the opposite of expertise. It is the foundation
              of it.
            </P>
            <P>
              This is worth sitting with, because it runs against the obvious efficiency argument for AI. If a junior
              developer can skip boilerplate because a model generates it, they ship faster. But they also miss the
              ten hours of writing boilerplate that taught them why certain patterns exist, what breaks when you
              skip them, and what the codebase was trying to do before they arrived. The fast path has a hidden cost
              that only appears later, when the abstraction breaks and there is no one in the room who understands
              what is underneath it.
            </P>
            <P>
              There is also a subtler benefit to simple work that gets overlooked in productivity conversations:
              it regulates pace. A hard problem is exhausting. The sequence of a hard problem, followed by
              a simple task that requires skill but not strain, is what allows sustained high-quality output over
              time. This is not inefficiency — it is how humans avoid burning out on the work that actually matters.
              When AI absorbs all of the simple tasks, it is possible that what remains is a series of hard
              problems with no natural recovery intervals between them.
            </P>
            <Callout icon="🧱">
              Expertise is not just knowing the complex answer — it is having walked through enough simple
              versions of the problem that the complex one feels familiar. Remove the simple work and you
              remove the path that leads to genuine depth.
            </Callout>
          </div>
        </section>

        {/* Section 4 — Survey data */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            What 81,000 developers are actually worried about
          </h2>
          <div className="space-y-5">
            <P>
              The developer sentiment surveys of the last few years paint a nuanced picture that the AI enthusiasm
              cycle tends to flatten. When you ask 81,000 developers what they think about AI in their workflow,
              you do not get a monolith. You get a distribution — and the distribution has edges that the headline
              numbers obscure.
            </P>

            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 space-y-5">
              <BarRow
                pct={76}
                value="76%"
                label="Use or plan to use AI tools"
                sub="A supermajority — but adoption is not the same as confidence"
              />
              <BarRow
                pct={45}
                value="45%"
                label="Don't fully trust AI output"
                sub="Verification adds back much of the time saved"
              />
              <BarRow
                pct={33}
                value="~1 in 3"
                label="Worried about job displacement"
                sub="The fear is real and concentrated in junior roles"
              />
            </div>

            <P>
              The top concerns that emerge from large developer surveys are not the sci-fi ones. They are not
              sentient machines or robot uprisings. They are: inaccurate outputs that look correct, erosion of
              junior career paths, the growing cost of not using AI (the competitiveness gap), and a vaguer but
              persistent unease about whose values are embedded in the systems making suggestions.
            </P>
            <P>
              The junior career path concern is particularly worth attention. If entry-level work is automated,
              the ladder that leads to senior expertise is removed. The developers who will maintain, audit, and
              extend AI systems in ten years are the junior developers of today — and if those developers never
              build the foundational understanding that simple work provides, there will be a capability gap
              precisely when AI systems become complex enough to require real human oversight.
            </P>
            <Callout icon="📊">
              The data does not show a workforce that is uniformly afraid or uniformly excited. It shows a
              workforce that is trying to figure out what the technology is for — and finding that the available
              framings (copilot, assistant, tool) do not quite capture what they are actually experiencing.
            </Callout>
          </div>
        </section>

        {/* Section 5 — Three framings */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            Three framings, none of them right
          </h2>
          <div className="space-y-4">
            <P>
              We tend to oscillate between three ways of thinking about AI&apos;s role, and all three have a fatal flaw.
            </P>

            <div className="space-y-3">
              {[
                {
                  label: 'The Copilot',
                  color: '#7c3aed',
                  bg: 'rgba(46,16,101,0.4)',
                  body: 'AI as co-equal partner in the work. Reassuring, collaborative, bounded. The flaw: it assumes a stable division of labour that the technology will not hold. A copilot that keeps getting better at its job is not a copilot forever.',
                },
                {
                  label: 'The Takeover',
                  color: '#ef4444',
                  bg: 'rgba(69,10,10,0.4)',
                  body: 'AI as replacement — for jobs, for decisions, eventually for judgment. Vivid and emotionally legible. The flaw: it treats the outcome as inevitable and human agency as irrelevant. It is a framing that forecloses negotiation.',
                },
                {
                  label: 'The Tool',
                  color: '#3b82f6',
                  bg: 'rgba(23,37,84,0.4)',
                  body: 'AI as sophisticated hammer. Useful, but ultimately inert. The flaw: it dramatically undersells what is happening. A tool doesn\'t rewrite its own outputs, model your preferences, or anticipate your next move. Pretending otherwise creates blind spots.',
                },
              ].map(f => (
                <div key={f.label} className="rounded-xl p-4 flex gap-4 items-start" style={{ background: f.bg, border: `1px solid ${f.color}35` }}>
                  <span className="text-xs font-bold uppercase tracking-widest shrink-0 mt-0.5 w-24" style={{ color: f.color }}>{f.label}</span>
                  <p className="text-sm text-gray-300 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>

            <P>
              None of these frames are useless — they each capture something real. But none of them are sufficient
              as a primary model, because none of them leave room for the relationship to evolve. And the one
              thing we know about AI with certainty is that the relationship is going to keep evolving.
            </P>
          </div>
        </section>

        {/* Section 6 — A different frame */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            What augmentation actually looks like
          </h2>
          <div className="space-y-4">
            <P>
              The frame I keep returning to is augmentation — not in the sense of enhancement for its own sake,
              but in the sense of elevation. What does AI make possible that was previously impossible or
              impractical? What does it free us from that was stealing time from the work that actually matters?
              And critically — what does it require us to stay close to, even when it would be easier to
              outsource entirely?
            </P>
            <P>
              Augmentation done well does not simply remove friction. It reshapes where your attention goes.
              If AI handles the boilerplate, the rote queries, the formatting, the scaffolding — and it
              does this well — then the human in the loop is freed up for the judgment calls. The ambiguous
              requirements. The stakeholder conversation that needs a human in the room. The ethical question
              the model cannot answer because it requires values, not probabilities.
            </P>
            <CapabilityChart />
            <P>
              But this only works if we are intentional about what we keep. The best version of an AI-augmented
              workflow is not one where you hand everything to the model and review the output. It is one where
              you and the model have a clear and maintained division — where the human stays sharp on the things
              that matter by continuing to do them, even when the model could technically do them faster.
            </P>
            <P>
              This is where the simple work comes back in. Not because efficiency demands it, but because
              the humans in this system need to remain humans — with skills, with judgment, with the capacity
              to catch the model when it confidently produces something wrong. That capacity does not survive
              if it is never exercised.
            </P>

            <div className="rounded-xl border border-purple-800/40 bg-purple-950/20 p-5 space-y-4">
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">A different aim</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                The worthwhile aim of AI is not to do more, faster. It is to free humans to do what is
                distinctly human — to build, to connect, to question, to create meaning — by handling
                what is mechanical, repetitive, or cognitively taxing but not actually valuable. That
                is a much more interesting aspiration than copilot. It is also much harder to get right.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Not a copilot — because the role keeps changing',
                  'Not a takeover — because human judgment still matters and always will',
                  'Not just a tool — because the relationship is too dynamic for that to hold',
                  'Something like a collaborator that needs managing, with explicit decisions about what stays human',
                ].map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-purple-500 shrink-0">→</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Takeaways */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">Key takeaways</h2>
          <ul className="space-y-3">
            {[
              ['Copilot is a placeholder, not a destination', 'The metaphor bought us time to think. Time is up. We need a more honest account of what AI is becoming.'],
              ['Velocity is the defining characteristic', "AI's improvement rate is unlike any previous technology. Frameworks built for stable tools will keep breaking."],
              ['Simple work is load-bearing', "Removing the easy tasks removes the path to expertise, the recovery intervals that prevent burnout, and the fluency that makes complex judgment possible."],
              ['The survey fears are rational', 'Junior career paths, output trust, and the competitiveness gap are real problems — not technophobia. They deserve structural answers.'],
              ['Augmentation requires active choices', 'The good version of this future does not arrive automatically. It requires deciding what stays human — and defending that decision as AI capability expands.'],
              ['The aim is elevation, not acceleration', 'A technology that helps you do more of the wrong things faster is not progress. The right question is always: free us for what?'],
            ].map(([heading, body]) => (
              <li key={heading as string} className="flex gap-3 text-sm">
                <span className="text-purple-400 shrink-0 mt-0.5">→</span>
                <span>
                  <strong className="text-white">{heading as string}.</strong>{' '}
                  <span className="text-gray-400">{body as string}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

      </article>

      <div className="mt-16 pt-6 border-t border-gray-800 flex items-center gap-3">
        <Link href="/Articles/en" className="text-xs text-gray-500 hover:text-purple-400 transition-colors">← All articles</Link>
      </div>
    </div>
  )
}
