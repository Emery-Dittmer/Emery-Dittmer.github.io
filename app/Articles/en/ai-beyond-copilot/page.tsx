export const metadata = {
  title: 'Beyond the Copilot — Emery Dittmer',
  description: 'The copilot framing for AI is already obsolete. As AI velocity outpaces our frameworks for understanding it, we need a better word — and a better relationship — than copilot.',
  keywords: ['AI', 'Artificial Intelligence', 'Future of Work', 'Technology', 'Product Management', 'Emery Dittmer'],
  authors: [{ name: 'Emery Dittmer' }],
  colorScheme: 'dark',
}

import Link from 'next/link'

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

function StatBlock({ stat, label, sub }: { stat: string; label: string; sub: string }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 text-center space-y-1">
      <p className="text-3xl font-bold text-purple-400">{stat}</p>
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="text-xs text-gray-500">{sub}</p>
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
            <P>
              That framing has aged badly. Not because the product failed, but because the trajectory of the technology
              made the metaphor obsolete faster than anyone expected. A copilot waits for direction. It doesn&apos;t
              anticipate. It doesn&apos;t architect. It certainly doesn&apos;t start refactoring your codebase at 3 a.m.
              while you sleep. But increasingly, the tools we build around AI do all of those things.
            </P>
            <P>
              The problem is we haven&apos;t replaced the metaphor. We&apos;re still using the language of copilots and
              assistants to describe something that is rapidly becoming something else entirely — and the gap between
              our vocabulary and our reality is where most of the anxiety about AI lives.
            </P>
            <Callout icon="✈️">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatBlock
                stat="76%"
                label="Use or plan to use AI tools"
                sub="A supermajority — but adoption is not the same as confidence"
              />
              <StatBlock
                stat="45%"
                label="Don't fully trust AI output"
                sub="Verification adds back much of the time saved"
              />
              <StatBlock
                stat="~1 in 3"
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
