export const metadata = {
  title: 'Building a Real-Time French Train Tracker on AWS — Emery Dittmer',
  description: 'How I built a GTFS-RT pipeline on AWS that polls SNCF, Eurostar, and Trenitalia every 10 minutes and stores it in RDS for under $20/month.',
  keywords: ['AWS', 'Lambda', 'GTFS-RT', 'SNCF', 'PostgreSQL', 'SQS', 'Data Pipeline', 'Emery Dittmer'],
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

function CodeBlock({ children, lang = 'python' }: { children: string; lang?: string }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-x-auto">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800">
        <span className="text-xs text-gray-500 font-mono">{lang}</span>
      </div>
      <pre className="px-4 py-4 text-xs text-gray-300 font-mono leading-relaxed whitespace-pre overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  )
}

export default function SNCFArchitectureArticle() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/en" className="hover:text-gray-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/Articles/en" className="hover:text-gray-300 transition-colors">Articles</Link>
        <span>/</span>
        <span className="text-gray-300">SNCF Pipeline — Architecture</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Engineering</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs font-semibold text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">Part 1 of 2</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">10 min read</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">June 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-5">
          Building a Real-Time French Train Tracker on AWS for Under $20/Month
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          GTFS-RT is ephemeral by design — nobody stores historical snapshots for you. If you want a month of
          delay patterns, you have to build the pipeline yourself. Here&apos;s how the two-Lambda, SQS-decoupled
          architecture works.
        </p>
      </div>

      <article className="space-y-10">

        {/* Section 1 — GTFS-RT */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            What Is GTFS-RT and Why Should You Care
          </h2>
          <div className="space-y-4">
            <P>
              GTFS stands for General Transit Feed Specification. It&apos;s the open standard Google originally
              created for transit agencies to publish their schedules, now used by hundreds of agencies worldwide.
              The RT suffix stands for Realtime — a Protobuf-encoded binary feed that publishes live updates:
              where trains actually are, how late they are at each stop, and any service alerts.
            </P>
            <P>
              GTFS-RT is interesting raw material for a few reasons. First, it&apos;s genuinely real-time — most
              agencies publish updates every 30 to 60 seconds. Second, it&apos;s structured: the Protobuf schema
              is well-defined and machine-readable without any scraping. Third, France&apos;s national open data
              platform (<code className="text-purple-300 text-sm">transport.data.gouv.fr</code>) proxies feeds from multiple operators through a single
              authenticated endpoint, so you can pull SNCF, regional trains, and international operators with
              consistent access patterns.
            </P>
            <Callout icon="⚠️">
              The catch: GTFS-RT is ephemeral by design. It describes the current state of the network.
              Nobody stores historical snapshots for you. If you want a six-month view of delay patterns,
              you have to build the pipeline yourself.
            </Callout>
          </div>
        </section>

        {/* Section 2 — Feeds */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The Five Feeds
          </h2>
          <div className="space-y-4">
            <P>
              The system collects from four endpoint configurations covering five operators:
            </P>
            <CodeBlock lang="python">{`FEEDS = {
    "sncf":        ("trip_updates", "https://proxy.transport.data.gouv.fr/resource/sncf-gtfs-rt-trip-updates"),
    "sncf_alerts": ("alerts",       "https://proxy.transport.data.gouv.fr/resource/sncf-gtfs-rt-service-alerts"),
    "eurostar":    ("trip_updates", "https://integration-storage.dm.eurostar.com/gtfs-prod/gtfs_rt_v2.bin"),
    "trenitalia":  ("trip_updates", "https://proxy.transport.data.gouv.fr/resource/trenitalia-gtfs-rt"),
}`}</CodeBlock>
            <P>
              The <code className="text-purple-300 text-sm">sncf</code> feed covers the mainline intercity network — TGV INOUI, OUIGO, Intercités,
              Night trains, and ICE services through France. The <code className="text-purple-300 text-sm">sncf_alerts</code> feed is separate
              (alerts are a distinct message type in the GTFS-RT spec). Eurostar publishes its own feed directly,
              while Trenitalia&apos;s France-bound services run through the French government proxy.
            </P>
            <P>
              The processor identifies train type from the <code className="text-purple-300 text-sm">trip_id</code> string itself, which embeds
              operator codes:
            </P>
            <CodeBlock lang="python">{`def _extract_train_type(trip_id: str, source: str = "") -> str:
    for marker, label in [
        (":OUI:",   "TGV INOUI"),
        (":OUIGO:", "OUIGO"),
        (":TER:",   "TER"),
        (":ILIO:",  "Intercités"),
        (":NIT:",   "Night train"),
        (":ICE:",   "ICE"),
    ]:
        if marker in trip_id:
            return label
    if source == "eurostar":   return "Eurostar"
    if source == "trenitalia": return "Trenitalia"
    return "Other"`}</CodeBlock>
            <Callout icon="🔍">
              This is a bit brittle — it&apos;s parsing a string format that SNCF controls and could change — but
              it works reliably in practice and gives clean categorical breakdowns in analysis.
            </Callout>
          </div>
        </section>

        {/* Section 3 — Lambda A/B split */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            The Lambda A/B Split
          </h2>
          <div className="space-y-4">
            <P>
              The core architectural decision is a two-Lambda design with SQS in the middle.
            </P>
            <P>
              <strong className="text-white">Lambda A (the fetcher)</strong> runs on a schedule, hits all four endpoints, stores the raw
              Protobuf binary to S3, and drops a message on an SQS queue for each feed. It lives outside
              any VPC — the feeds are public internet endpoints, and putting Lambda inside a VPC adds
              complexity without any benefit here.
            </P>
            <CodeBlock lang="python">{`def lambda_handler(event, context):
    now = datetime.now(timezone.utc)
    paris_hour = (now + 2) % 24
    if not (6 <= paris_hour < 20) and not event.get("force"):
        logger.info(f"Outside collection window (Paris hour: {paris_hour}) — skipping.")
        return {"status": "skipped", "reason": "outside_hours"}

    for source, (feed_type, url) in FEEDS.items():
        resp = requests.get(url, timeout=30)
        raw  = resp.content
        s3_key = f"{source}_raw/date={date}/{stamp}.pb"
        s3.put_object(Bucket=BUCKET, Key=s3_key, Body=raw)
        sqs.send_message(QueueUrl=SQS_URL, MessageBody=json.dumps({
            "source": source, "feed_type": feed_type, "s3_key": s3_key,
            "timestamp": ts, "date": date, "stamp": stamp,
        }))`}</CodeBlock>
            <P>
              The collection window check at the top is intentional. SNCF doesn&apos;t run meaningful intercity
              service between 20:00 and 06:00 Paris time. Fetching during those hours would store nothing but
              empty or stale responses while still burning Lambda invocations and S3 PUT costs. The window
              restriction cuts invocations by roughly 40%.
            </P>
            <P>
              <strong className="text-white">Lambda B (the processor)</strong> is triggered by SQS. It reads the raw Protobuf from S3,
              parses it using the <code className="text-purple-300 text-sm">gtfs-realtime-pb2</code> generated client, flattens each
              StopTimeUpdate into a row, and writes into RDS PostgreSQL.
            </P>
            <CodeBlock lang="python">{`def lambda_handler(event, context):
    for record in event["Records"]:
        msg = json.loads(record["body"])
        n   = _process_record(msg)
        # raises on failure → SQS retries → DLQ after max_receive_count`}</CodeBlock>
            <Callout icon="🔗">
              SQS as the coupling layer is the key design insight. Without it, a slow or failing feed would
              block all the others. With SQS, each feed&apos;s Protobuf lands in the queue independently, and
              processing failures for one feed don&apos;t affect the others.
            </Callout>

            <div className="rounded-xl overflow-hidden border border-gray-800">
              <Image
                src="/images/sncf/architecture-diagram.png"
                alt="Full pipeline architecture diagram"
                width={800}
                height={450}
                className="w-full"
              />
              <p className="text-xs text-gray-500 px-4 py-2 bg-gray-900/40">
                EventBridge triggers the fetcher every 10 minutes. SQS decouples fetcher from processor.
                RDS stores both rolling and permanent data.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 — S3 layout */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            S3 Layout and Lifecycle
          </h2>
          <div className="space-y-4">
            <P>
              Every raw Protobuf binary gets stored under a Hive-style partition path:
            </P>
            <CodeBlock lang="bash">{`s3://my-bucket/sncf_raw/date=2025-06-15/20250615T140300Z.pb`}</CodeBlock>
            <P>
              The <code className="text-purple-300 text-sm">date=YYYY-MM-DD</code> prefix format is intentional — it makes the bucket directly
              queryable by Athena without any additional configuration. After processing, JSONL output lands
              in a parallel structure.
            </P>
            <P>
              S3 Lifecycle rules move raw Protobufs to Glacier after 90 days and to Deep Archive after 365.
              Processed JSONL stays in Standard for 30 days then transitions to Glacier. This layered approach
              keeps the bucket cheap over time while preserving the ability to reprocess historical raw data
              if the parsing logic changes.
            </P>
          </div>
        </section>

        {/* Section 5 — Schema */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            Schema Design and the Rolling Window Problem
          </h2>
          <div className="space-y-4">
            <P>
              The most interesting schema challenge is the rolling 24-hour window problem. GTFS-RT feeds
              publish a snapshot of the current network state. When you poll at 14:00 and again at 14:10,
              you get two snapshots with the same trips but different delays. Every poll produces partial,
              mutable information.
            </P>
            <P>
              The <code className="text-purple-300 text-sm">trip_updates</code> table holds raw polling output — one row per (trip_id, stop_id,
              poll_timestamp). It&apos;s fast to write and query, but grows continuously. The solution: keep it
              as a rolling 24-hour hot table, deleting rows older than 24 hours on a scheduled job.
            </P>
            <P>
              At 02:00 UTC each morning, the aggregator Lambda snapshots the previous day&apos;s data into
              <code className="text-purple-300 text-sm"> daily_train_performance</code>, a permanent record table:
            </P>
            <CodeBlock lang="sql">{`WITH yesterday AS (
    SELECT DISTINCT ON (trip_id, stop_id)
        DATE(collected_at AT TIME ZONE 'Europe/Paris') AS service_date,
        trip_id, stop_id, source, train_type,
        arrival_delay_s, departure_delay_s
    FROM trip_updates
    WHERE DATE(collected_at AT TIME ZONE 'Europe/Paris') = CURRENT_DATE - INTERVAL '1 day'
    ORDER BY trip_id, stop_id, collected_at DESC
)
INSERT INTO daily_train_performance (service_date, trip_id, stop_id, ...)
SELECT y.service_date, ...
FROM yesterday y
LEFT JOIN stop_times st ON y.trip_id = st.trip_id AND y.stop_sequence = st.stop_sequence
ON CONFLICT (service_date, trip_id, stop_id) DO UPDATE SET
    final_departure_delay_s = EXCLUDED.final_departure_delay_s;`}</CodeBlock>
            <P>
              The <code className="text-purple-300 text-sm">DISTINCT ON (trip_id, stop_id) ... ORDER BY collected_at DESC</code> picks the most
              recent poll for each (trip, stop) pair — the final delay snapshot before the train departed,
              which is the most informative single number for punctuality analysis.
            </P>
            <Callout icon="🕐">
              The 02:00 UTC timing is deliberate. The last Paris-time service day ends around 00:30–01:00 CET,
              so by 02:00 UTC all previous-day trips have posted their final updates. Running the aggregator
              during this quiet window avoids competing with active RT writes to the hot table.
            </Callout>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">
            What This Buys You
          </h2>
          <div className="space-y-4">
            <P>
              The architecture is deliberately simple. Two Lambdas, one SQS queue, one RDS instance, one S3
              bucket. No Kinesis, no EMR, no Glue. The whole thing runs for well under $20/month in AWS
              costs — the difference between a project you keep running indefinitely and one you shut down
              after two weeks because the bill shocked you.
            </P>
            <P>
              After a few months of collection, <code className="text-purple-300 text-sm">daily_train_performance</code> becomes a genuinely
              useful analytical dataset: which stations consistently add delay, how TGV INOUI compares to
              OUIGO on the same corridors, how a major disruption propagates through delay patterns the
              following week.
            </P>
          </div>
        </section>

        {/* Series nav */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/Articles/en/sncf-cost"
              className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 hover:border-purple-600/50 transition-colors group"
            >
              <p className="text-xs font-semibold text-purple-400 mb-2">Part 2 →</p>
              <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                How I Cut This AWS Pipeline from $56 to $16/Month
              </p>
              <p className="text-xs text-gray-500 mt-2">NAT Gateway trap, VPC endpoint costs, the fix</p>
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
