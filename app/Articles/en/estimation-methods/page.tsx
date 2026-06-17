export const metadata = {
  title: 'Agile Estimation Methods — Emery Dittmer',
  description: 'A PM\'s guide to story points, T-shirt sizing, planning poker, PERT, and a new character-based estimation framework — with an interactive sprint planning simulation.',
  keywords: ['Product Management', 'Estimation', 'Story Points', 'Planning Poker', 'Agile', 'Character Estimation'],
  authors: [{ name: 'Emery Dittmer' }],
  colorScheme: 'dark',
}

import Link from 'next/link'
import EstimationGame from '@/components/articles/EstimationGame'
import MethodAccordion from '@/components/articles/MethodAccordion'

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-300 leading-relaxed text-[15px]">{children}</p>
}

function Callout({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
      <span className="text-xl shrink-0">{icon}</span>
      <p className="text-sm text-gray-300 leading-relaxed">{children}</p>
    </div>
  )
}

function MethodCard({
  emoji, name, summary, when, avoid, example,
}: {
  emoji: string; name: string; summary: string; when: string; avoid: string; example: string
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-xl">{emoji}</span>
        <h4 className="text-base font-bold text-white">{name}</h4>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-green-950/40 border border-green-900/40 p-3">
          <p className="font-semibold text-green-400 mb-1">Use when</p>
          <p className="text-gray-400">{when}</p>
        </div>
        <div className="rounded-lg bg-red-950/40 border border-red-900/40 p-3">
          <p className="font-semibold text-red-400 mb-1">Avoid when</p>
          <p className="text-gray-400">{avoid}</p>
        </div>
        <div className="rounded-lg bg-purple-950/40 border border-purple-900/40 p-3">
          <p className="font-semibold text-purple-400 mb-1">In practice</p>
          <p className="text-gray-400">{example}</p>
        </div>
      </div>
    </div>
  )
}

function ComparisonTable() {
  const rows = [
    { method: 'Story Points', speed: '★★★', accuracy: '★★★', team: '★★★', new: '★★', collab: '★★★' },
    { method: 'T-Shirt Sizing', speed: '★★★★★', accuracy: '★★', team: '★★★★', new: '★★★★★', collab: '★★★' },
    { method: 'Three-Point (PERT)', speed: '★★', accuracy: '★★★★★', team: '★★', new: '★★★', collab: '★★' },
    { method: 'Planning Poker', speed: '★★', accuracy: '★★★★', team: '★★', new: '★★★', collab: '★★★★★' },
    { method: 'Character Estimation ✦', speed: '★★', accuracy: '★★★★', team: '★★★★', new: '★★★★★', collab: '★★★★★' },
  ]
  const cols = ['Speed', 'Accuracy', 'Team size', 'New teams', 'Collaboration']
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="min-w-full text-xs text-gray-300">
        <thead className="bg-gray-900/80 text-gray-500 uppercase tracking-wider">
          <tr>
            <th className="text-left px-4 py-3">Method</th>
            {cols.map((c) => <th key={c} className="text-center px-3 py-3">{c}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {rows.map((r, i) => (
            <tr key={r.method} className={`transition-colors ${i === rows.length - 1 ? 'bg-purple-950/20 hover:bg-purple-950/30' : 'hover:bg-gray-900/40'}`}>
              <td className={`px-4 py-3 font-semibold ${i === rows.length - 1 ? 'text-purple-300' : 'text-white'}`}>{r.method}</td>
              <td className="text-center px-3 py-3 text-yellow-400">{r.speed}</td>
              <td className="text-center px-3 py-3 text-yellow-400">{r.accuracy}</td>
              <td className="text-center px-3 py-3 text-yellow-400">{r.team}</td>
              <td className="text-center px-3 py-3 text-yellow-400">{r.new}</td>
              <td className="text-center px-3 py-3 text-yellow-400">{r.collab}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-gray-600 px-4 py-2">✦ Character Estimation — original framework by Emery Dittmer</p>
    </div>
  )
}

export default function EstimationMethodsArticle() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/en" className="hover:text-gray-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/Articles/en" className="hover:text-gray-300 transition-colors">Articles</Link>
        <span>/</span>
        <span className="text-gray-300">Estimation Methods</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Product Management</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">10 min read</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">June 2026</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs font-semibold text-green-400">Interactive</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-5">
          How Should You Estimate? A PM&apos;s Guide to Agile Estimation Methods
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Story points, T-shirt sizing, planning poker, PERT — every team has an opinion. Here&apos;s how each actually works,
          when to use it, and a new framework I developed that makes the hidden psychology of estimation explicit.
        </p>
      </div>

      {/* Game */}
      <section className="mb-14">
        <div className="mb-6">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-2">Interactive</p>
          <h2 className="text-xl font-bold text-white mb-2 border-l-2 border-purple-500 pl-4">
            Sprint Planning Simulator
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Pick a method and estimate 5 real-world user stories — then see how your estimates compare to expert consensus.
            The deep-dive on each method is below, including the Character Estimation framework I built.
          </p>
        </div>
        <EstimationGame />
      </section>

      <article className="space-y-10">

        {/* Intro */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">Why estimation is hard (and why it matters)</h2>
          <div className="space-y-4">
            <P>
              Estimation is one of the most debated topics in product development. Ask five PMs how they estimate and you&apos;ll
              get five different answers — and all of them will be at least partially wrong. That&apos;s not a failure; it&apos;s the
              nature of forecasting complex work. The goal of estimation is never to be exactly right. It&apos;s to be
              consistently calibrated enough that stakeholders can make good decisions and teams can plan realistic sprints.
            </P>
            <P>
              The four established methods below — story points, T-shirt sizing, three-point estimation, and planning poker —
              are not competing philosophies. They&apos;re tools with different strengths. Below those, I describe a fifth method
              I developed that addresses something none of them fully account for: the hidden psychology of who speaks, who
              challenges, and who stays quiet in a planning session.
            </P>
            <Callout icon="💡">
              A key insight from calibration research: teams that surface disagreement openly produce more accurate estimates
              than teams where the loudest voice dominates — regardless of which method they use. Process matters more than
              the unit of measure.
            </Callout>
          </div>
        </section>

        {/* Traditional methods — accordions */}
        <section>
          <h2 className="text-xl font-bold text-white mb-2 border-l-2 border-purple-500 pl-4">The four traditional methods</h2>
          <p className="text-sm text-gray-500 mb-5 pl-4">Each method is expandable — open the ones you want to explore.</p>
          <div className="space-y-3">

            <MethodAccordion emoji="📊" title="Story Points (Fibonacci)" accent="#7c3aed">
              <P>
                Story points are the most widely used estimation unit in modern agile teams. The core idea: instead of
                estimating time, you estimate <em>complexity relative to a reference story</em>. Your &quot;1&quot; story is the
                simplest thing a team member could complete independently. Everything else is scored relative to that.
              </P>
              <P>
                The Fibonacci sequence (1, 2, 3, 5, 8, 13, 21…) is deliberately non-linear. The gaps between numbers grow
                as you go higher — and so does the uncertainty. A 13-point story isn&apos;t 13× a 1-point story; it&apos;s a story
                where the team genuinely cannot be more precise without breaking it down further. That&apos;s useful information.
              </P>
              <MethodCard
                emoji="📊"
                name="Story Points"
                summary="Relative complexity units on a Fibonacci scale. A 5 is roughly 2.5× more complex than a 2, but the gaps intentionally widen to reflect growing uncertainty."
                when="Mature teams with a shared velocity baseline; roadmap capacity planning; cross-sprint comparisons."
                avoid="Brand-new teams with no reference stories; projects with wildly different story types that can't be compared."
                example="'This story is a 5 — similar to the login flow we built last sprint, but with two extra edge cases.'"
              />
              <Callout icon="⚠️">
                The biggest mistake teams make: treating story points as time. &quot;5 points = 5 hours&quot; destroys the system.
                Points measure complexity and risk, not duration. Let velocity emerge naturally over several sprints before
                using it to forecast.
              </Callout>
            </MethodAccordion>

            <MethodAccordion emoji="👕" title="T-Shirt Sizing" accent="#2563eb">
              <P>
                T-shirt sizing (XS / S / M / L / XL) is the fastest and most intuitive estimation method. It&apos;s ideal for
                early-stage roadmap grooming, stakeholder-facing capacity conversations, and situations where you need a
                rough order of magnitude without a full planning session.
              </P>
              <P>
                The power of T-shirt sizing is that almost anyone can participate — including non-engineers. When sizing a
                feature with sales, design, and engineering in the room, asking &quot;is this a small or large bet?&quot; unlocks
                faster alignment than debating whether something is an 8 or a 13.
              </P>
              <MethodCard
                emoji="👕"
                name="T-Shirt Sizing"
                summary="Five categorical sizes — XS through XL — that let teams quickly sort work without precise numerical commitments."
                when="Early roadmap prioritization; mixed (non-technical) audiences; rapid triage of a long backlog."
                avoid="Sprint-level capacity planning where precision matters; comparing work across very different domains."
                example="'This feature is an L — it touches authentication, the billing system, and needs a new onboarding flow.'"
              />
              <Callout icon="💡">
                Many teams use T-shirt sizing for discovery and story points for delivery: size epics in the roadmap session,
                then point individual stories in sprint planning. This two-tier approach keeps the right level of detail at
                each stage.
              </Callout>
            </MethodAccordion>

            <MethodAccordion emoji="📐" title="Three-Point Estimation (PERT)" accent="#ea580c">
              <P>
                Three-point estimation comes from project management (PERT — Program Evaluation and Review Technique) and is
                particularly valuable when uncertainty is high or when you need to communicate risk explicitly to stakeholders.
                Instead of a single estimate, you capture three scenarios:
              </P>
              <ul className="list-none space-y-2">
                {[
                  { label: 'O — Optimistic', cls: 'text-green-400', desc: 'Everything goes right. No blockers, no scope creep, third-party APIs work first try.' },
                  { label: 'M — Most Likely', cls: 'text-yellow-400', desc: "Normal development with typical friction. The estimate you'd give in a planning session." },
                  { label: 'P — Pessimistic', cls: 'text-red-400', desc: 'Something goes wrong. A dependency slips, a security review adds a week, a design change comes in late.' },
                ].map(({ label, cls, desc }) => (
                  <li key={label} className="flex gap-3 rounded-lg bg-gray-900/60 border border-gray-800 p-3 text-sm">
                    <span className={`font-bold ${cls} shrink-0 w-28`}>{label}</span>
                    <span className="text-gray-400">{desc}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-gray-900 border border-gray-800 p-4 text-center">
                <p className="text-base font-mono text-purple-300">E = (O + 4M + P) / 6</p>
                <p className="text-xs text-gray-500 mt-2">The most likely estimate gets 4× weight, reflecting that typical cases dominate outcomes.</p>
              </div>
              <MethodCard
                emoji="📐"
                name="Three-Point Estimation (PERT)"
                summary="Captures optimistic, most likely, and pessimistic scenarios and derives a weighted average. Makes risk explicit rather than implicit."
                when="High-uncertainty work; external dependencies; executive forecasting; projects where you need confidence intervals."
                avoid="Routine sprint planning where the team has good velocity data and low uncertainty."
                example="'O: 3 days if the vendor API is stable. M: 8 days. P: 20 days if we need to build a fallback. PERT: ~9 days.'"
              />
            </MethodAccordion>

            <MethodAccordion emoji="🃏" title="Planning Poker" accent="#16a34a">
              <P>
                Planning poker is less a unit of measure and more a process for surfacing disagreement. Each team member
                picks a Fibonacci card privately, then all cards are revealed simultaneously. When estimates diverge — say,
                one developer says 2 and another says 13 — that gap is the signal. It means someone knows something others
                don&apos;t, and the discussion that follows is where the real value is created.
              </P>
              <P>
                Simultaneous reveal is the critical mechanic. It prevents anchoring — the tendency to adjust your estimate
                toward whatever number is said first. When estimates are visible immediately, you get independent signals
                before social pressure kicks in.
              </P>
              <MethodCard
                emoji="🃏"
                name="Planning Poker"
                summary="Team members privately pick Fibonacci cards, reveal simultaneously, then discuss divergences. The disagreement is the point."
                when="New user stories the team hasn't built before; stories with multiple technical approaches; cross-functional teams with different risk perspectives."
                avoid="Teams of 1–2; situations where you need to estimate quickly without discussion time."
                example="'Dev says 13, QA says 5. Dev explains the API migration risk QA didn't know about — consensus lands at 8.'"
              />
              <Callout icon="🎯">
                Research on group estimation (Cohn, 2005; Moløkken-Østvold et al., 2010) consistently shows that teams
                using planning poker have smaller estimation errors than individuals estimating alone — not because the
                average is better, but because the discussion surfaces hidden complexity before it becomes a surprise.
              </Callout>
            </MethodAccordion>

          </div>
        </section>

        {/* Character Estimation — original section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-white border-l-2 border-purple-500 pl-4">
              Method 5 — Character Estimation
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/40 shrink-0">
              My idea
            </span>
          </div>

          <div className="space-y-5">
            <P>
              The four methods above are well-established and widely documented. This one is mine.
            </P>
            <P>
              After observing many sprint planning sessions, I noticed something: the psychological roles that shape
              estimation outcomes are almost always invisible. There&apos;s reliably someone who acts as devil&apos;s advocate.
              Someone who tracks risks others have overlooked. Someone who seems to intuit the right answer before anyone
              can articulate why. And someone in the middle, quietly nudging diverging estimates toward a workable
              consensus.
            </P>
            <P>
              These roles are real — but in most teams they&apos;re accidental. No one decides to be the devil&apos;s advocate. They
              just happen to be the person who challenges assumptions that sprint. The result is inconsistent: sometimes
              the group gets lucky and these counterweights appear naturally. Often, they don&apos;t — and unchallenged
              optimism ships as a deadline missed.
            </P>
            <P>
              <strong className="text-white">Character Estimation makes the roles explicit.</strong> Each player is assigned
              one of four characters before the session begins. The roles don&apos;t change what you know about the work — they
              change the <em>frame</em> through which you evaluate it.
            </P>

            {/* Character breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  emoji: '😈', name: 'The Devil', title: "Devil's Advocate", color: '#ef4444', bg: 'rgba(69,10,10,0.5)',
                  body: 'Their job is to challenge. When the group converges on a comfortable estimate, the Devil pushes back — not to be obstinate, but to force the team to defend assumptions. In real sessions, this role often goes unfilled, which is exactly why optimism goes unchallenged.',
                },
                {
                  emoji: '⚔️', name: 'The Knight', title: 'Token Modifier', color: '#f59e0b', bg: 'rgba(28,20,5,0.5)',
                  body: 'The Knight holds three tokens per story — each one a unit of influence they can add to or remove from any estimate as the group goes around the table. The scarcity is intentional: it forces the Knight to choose when to intervene, rather than adjusting everything freely.',
                },
                {
                  emoji: '🧙', name: 'The Sorcerer', title: 'Hidden Insight', color: '#8b5cf6', bg: 'rgba(46,16,101,0.5)',
                  body: 'The Sorcerer knows something the others don\'t — or at least, hints at it. In real teams, this is the engineer who\'s seen a technical debt landmine, or the designer who knows a similar flow was rejected in user testing. Their estimates come with cryptic context worth decoding.',
                },
                {
                  emoji: '🏹', name: 'The Hunter', title: 'Risk Tracker', color: '#22c55e', bg: 'rgba(5,46,22,0.5)',
                  body: "The Hunter's frame of reference is risk and dependency. Every estimate is filtered through: what external system does this touch? What's the testing burden? What breaks if this slips? Their estimates run high by design — and that's a useful counterweight to optimism.",
                },
              ].map(c => (
                <div key={c.name} className="rounded-xl p-4 space-y-2" style={{ background: c.bg, border: `1px solid ${c.color}35` }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-white leading-none">{c.name}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: c.color }}>{c.title}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>

            <h3 className="text-base font-bold text-white mt-2">Why it works</h3>
            <P>
              Assigning roles does two things. First, it legitimises perspectives that often get suppressed in group settings.
              The devil&apos;s advocate comment is easier to make when it&apos;s your role, not a personality trait — you&apos;re not
              being difficult, you&apos;re doing your job. Second, it creates cognitive diversity by design. You don&apos;t need to
              hope the right voices speak up; the structure guarantees they will.
            </P>
            <P>
              The Knight&apos;s token mechanic is the most novel element. Tokens are scarce, which forces prioritisation: do you
              spend them to pull a high outlier down, or raise a low one up? The choice reveals something about the Knight&apos;s
              read on the story — whether they&apos;re protecting a relationship, triangulating toward truth, or deliberately
              introducing pressure to prompt discussion.
            </P>
            <P>
              In practice I find Character Estimation most valuable for teams that are new to planning poker or consistently
              fall into groupthink. The roles create a safe container for dissent. After a few sessions the behaviours tend
              to generalise — people carry their character&apos;s perspective even when they&apos;re no longer formally assigned it.
            </P>

            <Callout icon="🎭">
              The best result from a Character Estimation session isn&apos;t the estimate. It&apos;s the moment after the session
              when someone says &quot;I wouldn&apos;t have thought of that risk without the Hunter role forcing me to look for it.&quot;
              The method is scaffolding for a richer conversation — the goal is for the scaffolding to eventually become
              unnecessary.
            </Callout>

            <div className="rounded-xl border border-purple-800/40 bg-purple-950/20 p-5 space-y-3">
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Character Estimation at a glance</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg bg-green-950/40 border border-green-900/40 p-3">
                  <p className="font-semibold text-green-400 mb-1">Use when</p>
                  <p className="text-gray-400">New teams; groupthink-prone cultures; stories with unclear risk surfaces; anyone learning to run better planning sessions.</p>
                </div>
                <div className="rounded-lg bg-red-950/40 border border-red-900/40 p-3">
                  <p className="font-semibold text-red-400 mb-1">Avoid when</p>
                  <p className="text-gray-400">Small teams of 1–2; very time-constrained sessions; teams already strong at surfacing disagreement independently.</p>
                </div>
                <div className="rounded-lg bg-purple-950/40 border border-purple-900/40 p-3">
                  <p className="font-semibold text-purple-400 mb-1">In practice</p>
                  <p className="text-gray-400">&quot;Dev Lead as Devil challenged our 3-point estimate. Hunter found a dependency we missed. Final estimate: 8. Actual: 7.&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to choose */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">How to choose</h2>
          <div className="space-y-4">
            <P>
              There&apos;s no universal winner. Here&apos;s how the five methods compare across the dimensions that matter most:
            </P>
            <ComparisonTable />
            <P>
              My default approach: use <strong className="text-white">T-shirt sizing</strong> for roadmap-level conversations
              with mixed audiences, <strong className="text-white">story points + planning poker</strong> for sprint planning
              with engineering teams, <strong className="text-white">three-point PERT</strong> when a stakeholder asks for a
              delivery date with risk quantified, and <strong className="text-white">Character Estimation</strong> when
              onboarding a new team or breaking a pattern of unchallenged consensus.
            </P>
            <Callout icon="📌">
              The worst estimation failure I see in teams isn&apos;t using the wrong method — it&apos;s not retrospecting on estimation
              accuracy at all. Track your estimates vs. actuals every sprint, even informally. Calibration improves
              dramatically once teams can see their own patterns.
            </Callout>
          </div>
        </section>

        {/* Takeaways */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">Key takeaways</h2>
          <ul className="space-y-3">
            {[
              ['Estimation accuracy improves with practice', 'Track estimates vs. actuals. Retrospect on outliers. The method matters less than the feedback loop.'],
              ['Use the right tool for the context', 'T-shirt for roadmaps, story points for sprints, PERT when uncertainty needs to be made explicit.'],
              ['Divergence is signal, not noise', "A 13 next to a 2 isn't a problem to resolve quickly — it's hidden knowledge waiting to surface."],
              ['Never convert points to time', 'Let velocity emerge from observed data. Forced conversions corrupt the system and erode trust.'],
              ['The conversation is the product', 'A good estimation session aligns the team on scope, risk, and approach — the number is a byproduct.'],
              ['Make the invisible roles explicit', 'Every team already has a devil and a hunter. Character Estimation just gives them permission to show up.'],
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
