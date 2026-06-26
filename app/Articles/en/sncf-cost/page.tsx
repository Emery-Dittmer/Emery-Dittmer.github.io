export const metadata = {
  title: 'How I Cut This AWS Pipeline from $56 to $16/Month — Emery Dittmer',
  description: 'The first month\'s AWS bill was $56. After removing a NAT Gateway and two VPC endpoints I didn\'t actually need, it dropped to $16. Here\'s what happened.',
  keywords: ['AWS', 'Cost Optimisation', 'NAT Gateway', 'Lambda', 'VPC', 'RDS', 'SNCF', 'Emery Dittmer'],
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

function CostTable() {
  const rows = [
    { service: 'NAT Gateway',                   before: '$32.00', after: '$0',     reduced: true },
    { service: 'RDS db.t3.micro',               before: '$15.44', after: '$15.44', reduced: false },
    { service: 'Secrets Manager VPC endpoint',  before: '$7.30',  after: '$0',     reduced: true },
    { service: 'Secrets Manager secret',        before: '$0.40',  after: '$0.40',  reduced: false },
    { service: 'Lambda (all functions)',         before: '~$0',    after: '~$0',    reduced: false },
    { service: 'S3 + lifecycle',                before: '$0.50',  after: '$0.50',  reduced: false },
    { service: 'CloudWatch Logs',               before: '$0.40',  after: '$0.40',  reduced: false },
    { service: 'API Gateway',                   before: '$0.01',  after: '$0.01',  reduced: false },
  ]

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/60">
            <th className="text-left px-4 py-3 text-gray-400 font-semibold">Service</th>
            <th className="text-right px-4 py-3 text-gray-400 font-semibold">Before</th>
            <th className="text-right px-4 py-3 text-gray-400 font-semibold">After</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.service} className={`border-b border-gray-800/50 ${r.reduced ? 'bg-green-950/10' : ''}`}>
              <td className="px-4 py-3 text-gray-200">{r.service}</td>
              <td className={`px-4 py-3 text-right font-mono ${r.reduced ? 'text-red-400' : 'text-gray-400'}`}>{r.before}</td>
              <td className={`px-4 py-3 text-right font-mono ${r.reduced ? 'text-green-400 font-semibold' : 'text-gray-400'}`}>{r.after}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-gray-700 bg-gray-900/40">
            <td className="px-4 py-3 text-white font-bold">Total</td>
            <td className="px-4 py-3 text-right font-mono text-red-400 font-bold">~$56/month</td>
            <td className="px-4 py-3 text-right font-mono text-green-400 font-bold">~$16/month</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default function SNCFCostArticle() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/en" className="hover:text-gray-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/Articles/en" className="hover:text-gray-300 transition-colors">Articles</Link>
        <span>/</span>
        <span className="text-gray-300">SNCF Pipeline — Cost</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Engineering</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs font-semibold text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">Part 2 of 2</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">7 min read</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">June 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-5">
          How I Cut This AWS Pipeline from $56 to $16/Month
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          The first month&apos;s invoice came in at $56. For a side project collecting public transport data, that
          felt wrong. After drilling into Cost Explorer, the culprit was a NAT Gateway I&apos;d added out of
          habit — and a VPC endpoint I&apos;d added to fix the problem the NAT caused.
        </p>
      </div>

      <article className="space-y-10">

        {/* Section 1 — The bill */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            Before and After
          </h2>
          <div className="space-y-4">
            <P>
              The first month&apos;s AWS invoice came in at $56. For a side project collecting public transport
              data, that felt wrong. Nothing about this pipeline is especially large — five GTFS-RT feeds,
              a few Lambda functions, one tiny Postgres instance. Here&apos;s what the breakdown looked like
              before and after I fixed it:
            </P>
            <CostTable />
            <div className="rounded-xl overflow-hidden border border-gray-800">
              <Image
                src="/images/sncf/cost-comparison.png"
                alt="Monthly AWS cost before and after optimisation"
                width={800}
                height={400}
                className="w-full"
              />
              <p className="text-xs text-gray-500 px-4 py-2 bg-gray-900/40">
                NAT Gateway and VPC endpoint eliminated. RDS remains the irreducible floor at $15.44/month.
              </p>
            </div>
            <P>
              The Lambda costs are essentially zero — the free tier covers it easily. S3, CloudWatch, and
              API Gateway are negligible. The story is entirely about the top two rows.
            </P>
          </div>
        </section>

        {/* Section 2 — NAT trap */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The NAT Trap
          </h2>
          <div className="space-y-4">
            <P>
              The original architecture had Lambda inside a VPC. That&apos;s the default recommendation when your
              Lambda needs to talk to RDS — put them both in private subnets, they communicate over the private
              network, nothing touches the public internet. Makes sense.
            </P>
            <P>
              The problem is that the fetcher Lambda also needs to reach the internet. It&apos;s hitting public
              SNCF URLs every 10 minutes to download GTFS-RT protobufs. A Lambda inside a VPC with no internet
              access can&apos;t do that, so you add a NAT Gateway in a public subnet and route outbound traffic
              through it.
            </P>
            <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5 space-y-2">
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">The cost</p>
              <p className="text-2xl font-bold text-red-400">$0.045/hour</p>
              <p className="text-sm text-gray-400">just to exist — before transferring a single byte. That&apos;s $32.40/month.</p>
            </div>
            <Callout icon="💡">
              NAT Gateway charges show up under EC2 — specifically under &ldquo;EC2-Other&rdquo; — not under &ldquo;VPC&rdquo;
              or anything obviously labeled. Easy to miss until you drill into the line item.
            </Callout>
          </div>
        </section>

        {/* Section 3 — Fix 1 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            Fix 1: Take the Fetcher Out of the VPC
          </h2>
          <div className="space-y-4">
            <P>
              The fetcher Lambda never needed to be in the VPC. Lambda A just fetches URLs and writes results
              to S3 and SQS. It doesn&apos;t touch RDS at all. I&apos;d put it in the VPC out of habit — &ldquo;the other
              Lambdas are in there, might as well keep everything together&rdquo; — and that decision cost $32/month.
            </P>
            <P>
              Moving the fetcher outside the VPC gave it native internet access at no extra cost. AWS Lambdas
              outside a VPC can reach the public internet by default. No NAT, no routing tables, no extra
              configuration. The fetcher got simpler and the bill dropped $32.
            </P>
            <P>
              Lambda B (the processor) still needed RDS access, so it stayed in the VPC for now. But that
              surfaced the next problem.
            </P>
          </div>
        </section>

        {/* Section 4 — VPC endpoint mistake */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The VPC Endpoint Mistake
          </h2>
          <div className="space-y-4">
            <P>
              Lambda B needs database credentials. The credentials live in Secrets Manager. A Lambda inside
              a VPC, by default, can&apos;t reach Secrets Manager because that&apos;s an AWS service endpoint on
              the public internet.
            </P>
            <P>
              The &ldquo;proper&rdquo; solution is a Secrets Manager Interface VPC Endpoint — a private connection from
              your VPC to the Secrets Manager service. I set one up. It worked. Then I saw the cost: $7.30/month.
              That&apos;s $0.01/hour per availability zone for two AZs.
            </P>
            <Callout icon="🔄">
              I&apos;d removed a $32 problem and partially replaced it with a $7.30 problem. Better, but still
              frustrating. The fundamental issue was that Lambda B was still in the VPC, which meant every
              AWS service it needed to reach required either NAT or a dedicated VPC endpoint.
            </Callout>
          </div>
        </section>

        {/* Section 5 — Fix 2 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            Fix 2: Move Everything Out of the VPC
          </h2>
          <div className="space-y-4">
            <P>
              The real fix was to reconsider whether Lambda B needed to be in the VPC at all. The only reason
              it was there was to connect to RDS. But &ldquo;private RDS in a VPC&rdquo; isn&apos;t the only way to run a
              secure database.
            </P>
            <P>
              RDS has a <code className="text-purple-300 text-sm">publicly_accessible</code> flag. Set it to <code className="text-purple-300 text-sm">true</code>, add an ingress rule on the
              security group that restricts connections to known sources, enforce SSL on all connections, and
              you get essentially the same security posture with a completely different network topology.
            </P>
            <P>
              With Lambda B outside the VPC, it connects to RDS over the public endpoint — directly, no NAT,
              no routing. It fetches credentials from Secrets Manager over the public endpoint, which is free.
              The VPC endpoint for Secrets Manager is gone. The NAT Gateway is already gone.
            </P>
            <div className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-5 space-y-2">
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Counterintuitive</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                &ldquo;Publicly accessible&rdquo; sounds less secure than &ldquo;private VPC.&rdquo; But what actually provides
                security isn&apos;t the network label — it&apos;s the combination of SSL enforcement and security group
                ingress rules. Those controls work just as well on a public endpoint as on a private one.
                The VPC was providing the appearance of isolation without adding meaningful security.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 — What's left */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            What&apos;s Left
          </h2>
          <div className="space-y-4">
            <P>
              After removing NAT and both VPC endpoints, the floor is RDS at $15.44/month. The db.t3.micro
              instance is always on because the pipeline maintains a rolling 24-hour table of trip updates
              and needs to accept writes every 10 minutes around the clock.
            </P>
            <P>
              There are paths to reduce this further. A one-year reserved instance on db.t3.micro brings
              the monthly cost down to around $9. Aurora Serverless v2 is theoretically elastic, but the
              minimum ACU floor means it would cost more than the t3.micro for a consistently-active workload.
            </P>
            <P>
              For now, $16/month is fine. The pipeline runs, the data accumulates, and the cost is low enough
              that I&apos;m not thinking about it every month.
            </P>
          </div>
        </section>

        {/* Section 7 — The lesson */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The Actual Lesson
          </h2>
          <div className="space-y-4">
            <P>
              VPC is a network topology choice, not a security requirement. The reflex to put everything in
              a VPC comes from reasonable instincts — keep the database off the public internet, make lateral
              movement harder, reduce attack surface. Those instincts aren&apos;t wrong. But for a Lambda-to-RDS
              setup where you control the security group and enforce SSL, the VPC adds cost without adding
              meaningful protection.
            </P>
            <ul className="space-y-3">
              {[
                'Before adding a Lambda to a VPC, ask what it actually gains you.',
                'If the answer is "RDS access" and you\'re willing to configure the security group correctly, you might not need the VPC at all.',
                'If the answer is "it connects to something that genuinely requires private network access," then budget for NAT or VPC endpoints accordingly.',
                'The $32 NAT Gateway charge isn\'t a scam. It\'s a real service that solves a real problem. It just wasn\'t the right solution for this problem.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-purple-400 shrink-0 mt-0.5">→</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Series nav */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/Articles/en/sncf-architecture"
              className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 hover:border-purple-600/50 transition-colors group"
            >
              <p className="text-xs font-semibold text-purple-400 mb-2">← Part 1</p>
              <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                Building a Real-Time French Train Tracker on AWS
              </p>
              <p className="text-xs text-gray-500 mt-2">Architecture, pipeline design, schema decisions</p>
            </Link>
            <Link
              href="/Articles/en/sncf-analytics"
              className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 hover:border-purple-600/50 transition-colors group"
            >
              <p className="text-xs font-semibold text-blue-400 mb-2">Data Analysis →</p>
              <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                Are French Trains Actually On Time?
              </p>
              <p className="text-xs text-gray-500 mt-2">25 days, 46,400 trips — the results</p>
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
