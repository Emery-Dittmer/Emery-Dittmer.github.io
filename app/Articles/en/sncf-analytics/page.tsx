export const metadata = {
  title: 'Are French Trains Actually On Time? — Emery Dittmer',
  description: '25 days of real GTFS-RT data across 46,400 trips. The headline is 86% on time — but the variation by train type is where it gets interesting.',
  keywords: ['SNCF', 'French Trains', 'Train Punctuality', 'Data Analysis', 'GTFS-RT', 'TGV', 'Emery Dittmer'],
  authors: [{ name: 'Emery Dittmer' }],
  colorScheme: 'dark',
}

import Link from 'next/link'
import Image from 'next/image'

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

function DataTable() {
  const rows = [
    { type: 'TER (regional)', trips: '33,412', onTime: '86.9%', delay: '2.0 min', highlight: false },
    { type: 'Trenitalia',     trips: '390',    onTime: '86.3%', delay: '1.7 min', highlight: false },
    { type: 'Eurostar',       trips: '731',    onTime: '85.2%', delay: '4.3 min', highlight: false },
    { type: 'TGV INOUI',     trips: '2,762',  onTime: '76.9%', delay: '5.3 min', highlight: false },
    { type: 'OUIGO',          trips: '257',    onTime: '74.4%', delay: '9.6 min', highlight: false },
    { type: 'Night train',    trips: '56',     onTime: '73.7%', delay: '6.6 min', highlight: false },
    { type: 'Intercités',     trips: '345',    onTime: '71.7%', delay: '8.1 min', highlight: false },
    { type: 'ICE',            trips: '163',    onTime: '49.3%', delay: '14.0 min', highlight: true },
  ]

  function onTimeColor(pct: string) {
    const n = parseFloat(pct)
    if (n >= 80) return 'text-green-400'
    if (n >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/60">
            <th className="text-left px-4 py-3 text-gray-400 font-semibold">Train type</th>
            <th className="text-right px-4 py-3 text-gray-400 font-semibold">Total trips</th>
            <th className="text-right px-4 py-3 text-gray-400 font-semibold">On-time %</th>
            <th className="text-right px-4 py-3 text-gray-400 font-semibold">Avg delay</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.type} className={`border-b border-gray-800/50 ${r.highlight ? 'bg-red-950/20' : ''}`}>
              <td className="px-4 py-3 text-gray-200 font-medium">{r.type}</td>
              <td className="px-4 py-3 text-gray-400 text-right">{r.trips}</td>
              <td className={`px-4 py-3 text-right font-semibold ${onTimeColor(r.onTime)}`}>{r.onTime}</td>
              <td className="px-4 py-3 text-gray-400 text-right">{r.delay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SNCFAnalyticsArticle() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/en" className="hover:text-gray-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/Articles/en" className="hover:text-gray-300 transition-colors">Articles</Link>
        <span>/</span>
        <span className="text-gray-300">Are French Trains Actually On Time?</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Data & Analysis</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">8 min read</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">June 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-5">
          Are French Trains Actually On Time? I Collected 25 Days of Real Data to Find Out
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          France has a reputation. But reputations aren&apos;t data. Over 25 days I ran an automated system
          polling real-time SNCF feeds every ten minutes — 46,400 trips later, here&apos;s what the numbers actually say.
        </p>
      </div>

      <article className="space-y-10">

        {/* Section 1 — What I built */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            What I Built and What I Measured
          </h2>
          <div className="space-y-4">
            <P>
              Over 25 days — May 29 through June 22, 2026 — I ran an automated system that polls real-time
              train feeds every ten minutes throughout the operating day. These feeds are called GTFS-RT, a
              standardised format that rail operators publish so apps can show live departures. SNCF, Eurostar,
              and Trenitalia all make them publicly available. My system captures the departure delay in seconds
              for every stop on every trip, every time it checks.
            </P>
            <P>
              &ldquo;On-time&rdquo; in this analysis means departing within 60 seconds of the published schedule.
              That&apos;s a tight standard — tighter than most official statistics, which often use a five-minute window.
              By the end of the collection window, I had data on <strong className="text-white">46,400 distinct trips</strong> across
              eight train types. The infrastructure that collects all of this costs about $16 a month to run.
            </P>
            <Callout icon="🔧">
              The technical details — how the pipeline works and how the bill was cut from $56 to $16 — are covered
              in the two-part architecture series linked at the bottom of this article.
            </Callout>
          </div>
        </section>

        {/* Section 2 — Headline */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The Headline Number
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-purple-800/40 bg-purple-950/20 p-6 text-center space-y-2">
              <p className="text-5xl font-bold text-purple-400">86%</p>
              <p className="text-white font-semibold">of trains departed on time</p>
              <p className="text-sm text-gray-400">Average delay across all services: 2.1 minutes</p>
            </div>
            <P>
              That&apos;s probably better than most people expect, especially if their mental model of French trains
              comes from a particularly memorable missed connection. But the aggregate hides what&apos;s actually
              interesting. When you split the data by train type, the picture gets considerably more surprising.
            </P>
            <div className="rounded-xl overflow-hidden border border-gray-800">
              <Image
                src="/images/sncf/01_on_time_by_type.png"
                alt="On-time departure rate by train type"
                width={800}
                height={450}
                className="w-full"
              />
              <p className="text-xs text-gray-500 px-4 py-2 bg-gray-900/40">
                On-time departure rate by train type — last 30 days. Green ≥80%, amber 60–80%, red &lt;60%.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 — Full breakdown */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The Full Breakdown
          </h2>
          <DataTable />
        </section>

        {/* Section 4 — Regional trains */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The Surprising Winner: Regional Trains
          </h2>
          <div className="space-y-4">
            <P>
              The clear leader is the TER — <em>Transport Express Régional</em>, France&apos;s network of regional
              trains connecting smaller cities, market towns, and the edges of the country that the TGV doesn&apos;t
              reach. At 86.9% on-time across 33,412 trips, they account for the overwhelming majority of the
              dataset and outperform everything else.
            </P>
            <P>
              This is counterintuitive. Regional trains get fewer resources than the flagship services. They share
              track with freight. They serve rural areas where there&apos;s less redundancy. And yet, they are the
              most punctual service in this dataset.
            </P>
            <P>
              Part of the explanation is schedule conservatism. Regional timetables tend to build in more buffer,
              and the distances are shorter, so there&apos;s less opportunity for small delays to compound into large
              ones. But it&apos;s still a finding worth pausing on: the trains people are least likely to write travel
              essays about are the ones most likely to arrive when they said they would.
            </P>
          </div>
        </section>

        {/* Section 5 — TGV gap */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The TGV Gap
          </h2>
          <div className="space-y-4">
            <P>
              TGV INOUI — the premium high-speed service, the one with the sleek branding and the €80 seat
              reservations — comes in at 76.9% on-time, with an average delay of 5.3 minutes. That&apos;s meaningfully
              worse than the regionals, and the gap matters.
            </P>
            <P>
              TGV routes are long, sometimes covering 500 kilometres or more, which gives delays more time to grow.
              High-speed lines run at capacity, with multiple TGVs sharing the same track, meaning one disruption
              can cascade into the train behind it. And TGVs are configured as fixed trainsets — the same carriages
              run the full route, so if a train is late arriving somewhere, it&apos;s late leaving again.
            </P>
            <Callout icon="🚄">
              The data suggests the opposite of what the branding implies: France&apos;s premium product is not its
              most dependable one. Regional trains are.
            </Callout>
          </div>
        </section>

        {/* Section 6 — OUIGO */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The OUIGO Paradox
          </h2>
          <div className="space-y-4">
            <P>
              OUIGO is France&apos;s low-cost TGV subsidiary — same high-speed infrastructure, cheaper fares, less
              flexibility. It sits at 74.4% on-time with the highest average delay of any non-ICE service: 9.6 minutes.
            </P>
            <P>
              OUIGO runs at maximum density with no slack built into the schedule. These trains are turned around
              at stations quickly and priced on the assumption that everything goes to plan. When something
              doesn&apos;t, there&apos;s no buffer to absorb the disruption, and the delay cascades. So while the on-time
              rate is only slightly below TGV INOUI&apos;s, the &ldquo;when it&apos;s late&rdquo; story is meaningfully worse.
            </P>
            <Callout icon="📉">
              Systems optimised for efficiency under normal conditions are often the least resilient when
              conditions aren&apos;t normal. OUIGO is a clear example of this trade-off.
            </Callout>
          </div>
        </section>

        {/* Section 7 — ICE */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            ICE: The Real Outlier
          </h2>
          <div className="space-y-4">
            <P>
              Nothing else in the dataset comes close to the ICE numbers. At 49.3% on-time and a 14-minute
              average delay, the German high-speed trains running cross-border services into France are in a
              different category from everything else.
            </P>
            <P>
              These are international services that cross a national border and change rail operators. The French
              network hands off to Deutsche Bahn, and when either side has problems, the delay compounds across
              the handover point. There&apos;s no single operator accountable for the full journey, and coordination
              across two national rail systems is hard.
            </P>
            <P>
              It&apos;s a small sample — 163 trips — but the signal is consistent: if you&apos;re taking an ICE from Paris,
              build in some contingency.
            </P>
          </div>
        </section>

        {/* Section 8 — Delay shape */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            What &ldquo;Delayed&rdquo; Actually Looks Like
          </h2>
          <div className="space-y-4">
            <P>
              One thing the headline numbers don&apos;t capture is the shape of delays. When a train is late in this
              dataset, how late is it?
            </P>
            <div className="rounded-xl overflow-hidden border border-gray-800">
              <Image
                src="/images/sncf/02_delay_distribution.png"
                alt="Delay distribution across all 46,400 trips"
                width={800}
                height={450}
                className="w-full"
              />
              <p className="text-xs text-gray-500 px-4 py-2 bg-gray-900/40">
                Delay distribution across all 46,400 trips — the vast majority of delays are under 15 minutes.
              </p>
            </div>
            <P>
              Mostly not very. The distribution is heavily right-skewed — the vast majority of delayed departures
              are 1 to 15 minutes behind schedule. Severe delays of 30+ minutes exist, but they&apos;re the tail,
              not the norm.
            </P>
            <P>
              This matters for how we think about the French train reputation. People remember the bad ones.
              A train that&apos;s 45 minutes late is memorable; a train that departs on time is not. Across 46,400
              trips, the memorable events are a small fraction of the total.
            </P>
          </div>
        </section>

        {/* Section 9 — Conclusion */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            What the Data Actually Says
          </h2>
          <div className="space-y-4">
            <P>
              The reputation isn&apos;t entirely wrong. TGV INOUI and OUIGO are meaningfully less reliable than
              the regional network, and cross-border ICE services are a genuine weak point. If you&apos;re planning
              a tight itinerary around high-speed trains, those numbers are worth knowing.
            </P>
            <P>
              But 86% on-time is a respectable headline, and the more interesting story is in the variation.
              Regional trains quietly outperform the premium services. Cross-border coordination is the real
              vulnerability. And most delays, when they happen, are modest.
            </P>
            <P>
              The French train reputation, like most reputations, turns out to be real in some directions and
              overblown in others. The data helps you know which is which.
            </P>
          </div>
        </section>

        {/* Dashboard link */}
        <section>
          <div className="rounded-xl border border-blue-800/40 bg-blue-950/20 p-5 space-y-3">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Live Dashboard</p>
            <p className="text-sm text-gray-300">
              The data updates daily. Explore the full 30-day breakdown interactively — including the daily
              punctuality trend and how performance shifts week to week.
            </p>
            <a
              href="/train-performance.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Open French Train Performance Dashboard →
            </a>
          </div>
        </section>

        {/* Technical series links */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The Technical Series
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/Articles/en/sncf-architecture"
              className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 hover:border-purple-600/50 transition-colors group"
            >
              <p className="text-xs font-semibold text-purple-400 mb-2">Part 1</p>
              <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                Building a Real-Time French Train Tracker on AWS for Under $20/Month
              </p>
              <p className="text-xs text-gray-500 mt-2">Architecture, pipeline design, schema decisions →</p>
            </Link>
            <Link
              href="/Articles/en/sncf-cost"
              className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 hover:border-purple-600/50 transition-colors group"
            >
              <p className="text-xs font-semibold text-purple-400 mb-2">Part 2</p>
              <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                How I Cut This AWS Pipeline from $56 to $16/Month
              </p>
              <p className="text-xs text-gray-500 mt-2">NAT Gateway trap, VPC endpoint costs, the fix →</p>
            </Link>
          </div>
        </section>

      </article>

      <div className="mt-16 pt-6 border-t border-gray-800 flex items-center gap-3">
        <Link href="/Articles/en" className="text-xs text-gray-500 hover:text-purple-400 transition-colors">← All articles</Link>
      </div>
    </div>
  )
}
