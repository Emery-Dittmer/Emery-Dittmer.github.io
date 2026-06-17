export const metadata = {
  title: 'Méthodes d\'estimation agile — Emery Dittmer',
  description: 'Le guide PM des story points, T-shirt sizing, planning poker, PERT — et un nouveau cadre d\'estimation par personnages développé par Emery Dittmer.',
  keywords: ['Gestion de Produit', 'Estimation', 'Story Points', 'Planning Poker', 'Agile'],
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
          <p className="font-semibold text-green-400 mb-1">Utiliser quand</p>
          <p className="text-gray-400">{when}</p>
        </div>
        <div className="rounded-lg bg-red-950/40 border border-red-900/40 p-3">
          <p className="font-semibold text-red-400 mb-1">Éviter quand</p>
          <p className="text-gray-400">{avoid}</p>
        </div>
        <div className="rounded-lg bg-purple-950/40 border border-purple-900/40 p-3">
          <p className="font-semibold text-purple-400 mb-1">En pratique</p>
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
    { method: 'PERT / Trois points', speed: '★★', accuracy: '★★★★★', team: '★★', new: '★★★', collab: '★★' },
    { method: 'Planning Poker', speed: '★★', accuracy: '★★★★', team: '★★', new: '★★★', collab: '★★★★★' },
    { method: 'Estimation par personnages ✦', speed: '★★', accuracy: '★★★★', team: '★★★★', new: '★★★★★', collab: '★★★★★' },
  ]
  const cols = ['Vitesse', 'Précision', 'Taille équipe', 'Nouvelles équipes', 'Collaboration']
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="min-w-full text-xs text-gray-300">
        <thead className="bg-gray-900/80 text-gray-500 uppercase tracking-wider">
          <tr>
            <th className="text-left px-4 py-3">Méthode</th>
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
      <p className="text-[10px] text-gray-600 px-4 py-2">✦ Estimation par personnages — cadre original d&apos;Emery Dittmer</p>
    </div>
  )
}

export default function EstimationMethodsArticle() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/fr" className="hover:text-gray-300 transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/Articles/fr" className="hover:text-gray-300 transition-colors">Articles</Link>
        <span>/</span>
        <span className="text-gray-300">Méthodes d&apos;estimation</span>
      </nav>

      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Gestion de Produit</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">10 min de lecture</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">Juin 2026</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs font-semibold text-green-400">Interactif</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-5">
          Comment estimer ? Le guide PM des méthodes d&apos;estimation agile
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Story points, T-shirt sizing, planning poker, PERT — chaque équipe a son opinion. Voici comment chaque méthode
          fonctionne réellement, quand l&apos;utiliser, et un nouveau cadre que j&apos;ai développé pour rendre explicite
          la psychologie cachée de l&apos;estimation.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-6">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-2">Interactif</p>
          <h2 className="text-xl font-bold text-white mb-2 border-l-2 border-purple-500 pl-4">
            Simulateur de sprint planning
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Choisissez une méthode et estimez 5 user stories réelles — puis comparez vos estimations au consensus expert.
            L&apos;analyse de chaque méthode est ci-dessous, incluant le cadre d&apos;Estimation par personnages que j&apos;ai créé.
          </p>
        </div>
        <EstimationGame />
      </section>

      <article className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">Pourquoi estimer est difficile (et pourquoi c&apos;est important)</h2>
          <div className="space-y-4">
            <P>
              L&apos;estimation est l&apos;un des sujets les plus débattus du développement produit. Demandez à cinq PMs comment ils
              estiment et vous obtiendrez cinq réponses différentes — toutes au moins partiellement fausses. Ce n&apos;est pas un
              échec ; c&apos;est la nature de la prévision de travaux complexes. L&apos;objectif n&apos;est jamais d&apos;avoir exactement raison.
              C&apos;est d&apos;être suffisamment calibré pour que les parties prenantes prennent de bonnes décisions.
            </P>
            <P>
              Les quatre méthodes traditionnelles ci-dessous ne sont pas des philosophies concurrentes — ce sont des outils
              avec des forces différentes. En dessous, je décris une cinquième méthode que j&apos;ai développée pour adresser
              ce qu&apos;aucune d&apos;elles ne prend pleinement en compte : la psychologie cachée de qui parle, qui challenge,
              et qui reste silencieux en séance de planning.
            </P>
            <Callout icon="💡">
              Une découverte clé de la recherche sur la calibration : les équipes qui font remonter les désaccords ouvertement
              produisent des estimations plus précises que les équipes dominées par la voix la plus forte — quelle que soit
              la méthode utilisée. Le processus importe plus que l&apos;unité de mesure.
            </Callout>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2 border-l-2 border-purple-500 pl-4">Les quatre méthodes traditionnelles</h2>
          <p className="text-sm text-gray-500 mb-5 pl-4">Chaque méthode est dépliable — ouvrez celles que vous souhaitez explorer.</p>
          <div className="space-y-3">

            <MethodAccordion emoji="📊" title="Story Points (Fibonacci)" accent="#7c3aed">
              <P>
                Les story points sont l&apos;unité d&apos;estimation la plus utilisée dans les équipes agiles modernes. L&apos;idée centrale :
                plutôt qu&apos;estimer le temps, on estime la <em>complexité relative par rapport à une story de référence</em>.
                Votre story à &quot;1&quot; est la chose la plus simple qu&apos;un membre de l&apos;équipe puisse accomplir seul.
              </P>
              <P>
                La suite de Fibonacci (1, 2, 3, 5, 8, 13, 21…) est délibérément non linéaire. Les écarts grandissent —
                et l&apos;incertitude aussi. Une story à 13 points n&apos;est pas 13× plus simple qu&apos;une à 1 point ; c&apos;est une story
                que l&apos;équipe ne peut pas affiner davantage sans la décomposer. C&apos;est une information utile.
              </P>
              <MethodCard
                emoji="📊" name="Story Points"
                summary="Unités de complexité relative sur une échelle de Fibonacci. Les écarts s'élargissent intentionnellement pour refléter l'incertitude croissante."
                when="Équipes matures avec une vélocité de référence ; planification de capacité ; comparaisons inter-sprints."
                avoid="Nouvelles équipes sans stories de référence ; projets avec des types de travaux trop hétérogènes."
                example="'Cette story est un 5 — similaire au flux de connexion du sprint dernier, mais avec deux cas limites supplémentaires.'"
              />
              <Callout icon="⚠️">
                La plus grande erreur des équipes : traiter les story points comme du temps. &quot;5 points = 5 heures&quot; détruit le
                système. Les points mesurent la complexité et le risque, pas la durée. Laissez la vélocité émerger
                naturellement sur plusieurs sprints avant de l&apos;utiliser pour prévoir.
              </Callout>
            </MethodAccordion>

            <MethodAccordion emoji="👕" title="T-Shirt Sizing" accent="#2563eb">
              <P>
                Le T-shirt sizing (XS / S / M / L / XL) est la méthode d&apos;estimation la plus rapide et intuitive. Idéal
                pour le grooming de roadmap, les conversations de capacité avec les parties prenantes, et les situations
                où vous avez besoin d&apos;un ordre de grandeur sans session complète.
              </P>
              <MethodCard
                emoji="👕" name="T-Shirt Sizing"
                summary="Cinq tailles catégorielles — XS à XL — qui permettent de trier rapidement le travail sans s'engager sur des chiffres précis."
                when="Priorisation de roadmap ; audiences mixtes (non techniques) ; triage rapide d'un long backlog."
                avoid="Planification de sprint où la précision est importante ; comparaisons entre domaines très différents."
                example="'Cette fonctionnalité est un L — elle touche l'authentification, la facturation et nécessite un nouveau flux d'onboarding.'"
              />
              <Callout icon="💡">
                Beaucoup d&apos;équipes utilisent le T-shirt sizing pour la découverte et les story points pour la livraison :
                taille des épics en session roadmap, puis pointage des stories en sprint planning.
              </Callout>
            </MethodAccordion>

            <MethodAccordion emoji="📐" title="Estimation à trois points (PERT)" accent="#ea580c">
              <P>
                L&apos;estimation à trois points (PERT) est particulièrement précieuse quand l&apos;incertitude est élevée ou quand
                vous devez communiquer le risque explicitement. Plutôt qu&apos;une estimation unique, vous capturez trois scénarios :
              </P>
              <ul className="list-none space-y-2">
                {[
                  { label: 'O — Optimiste', cls: 'text-green-400', desc: 'Tout se passe bien. Aucun blocage, aucune dérive du périmètre.' },
                  { label: 'M — Le plus probable', cls: 'text-yellow-400', desc: 'Développement normal avec des frictions habituelles.' },
                  { label: 'P — Pessimiste', cls: 'text-red-400', desc: 'Quelque chose tourne mal : une dépendance glisse, une revue de sécurité s\'ajoute.' },
                ].map(({ label, cls, desc }) => (
                  <li key={label} className="flex gap-3 rounded-lg bg-gray-900/60 border border-gray-800 p-3 text-sm">
                    <span className={`font-bold ${cls} shrink-0 w-32`}>{label}</span>
                    <span className="text-gray-400">{desc}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-gray-900 border border-gray-800 p-4 text-center">
                <p className="text-base font-mono text-purple-300">E = (O + 4M + P) / 6</p>
                <p className="text-xs text-gray-500 mt-2">Le scénario le plus probable reçoit un poids 4× supérieur.</p>
              </div>
              <MethodCard
                emoji="📐" name="Estimation à trois points (PERT)"
                summary="Capture les scénarios optimiste, le plus probable et pessimiste pour en dériver une moyenne pondérée. Rend le risque explicite plutôt qu'implicite."
                when="Travaux à forte incertitude ; dépendances externes ; prévisions pour dirigeants."
                avoid="Sprint planning de routine avec une bonne vélocité et une faible incertitude."
                example="'O: 3 jours si l'API du fournisseur est stable. M: 8 jours. P: 20 jours si on doit construire un fallback. PERT: ~9 jours.'"
              />
            </MethodAccordion>

            <MethodAccordion emoji="🃏" title="Planning Poker" accent="#16a34a">
              <P>
                Le planning poker est moins une unité de mesure qu&apos;un processus pour faire émerger les désaccords. Chaque
                membre de l&apos;équipe choisit une carte Fibonacci en privé, puis toutes les cartes sont révélées simultanément.
                Quand les estimations divergent, c&apos;est le signal — quelqu&apos;un sait quelque chose que les autres ignorent.
              </P>
              <P>
                La révélation simultanée est la mécanique clé. Elle empêche l&apos;ancrage — la tendance à ajuster son estimation
                vers le premier chiffre entendu. Quand les estimations sont visibles en même temps, vous obtenez des signaux
                indépendants avant que la pression sociale ne s&apos;installe.
              </P>
              <MethodCard
                emoji="🃏" name="Planning Poker"
                summary="Les membres de l'équipe choisissent des cartes Fibonacci en privé, les révèlent simultanément, puis discutent des divergences. Le désaccord est le point."
                when="Nouvelles user stories jamais construites ; approches techniques multiples ; équipes cross-fonctionnelles."
                avoid="Équipes de 1–2 personnes ; situations nécessitant une estimation rapide sans temps de discussion."
                example="'Le dev dit 13, la QA dit 5. Le dev explique le risque de migration API — consensus à 8.'"
              />
              <Callout icon="🎯">
                Les recherches sur l&apos;estimation de groupe montrent systématiquement que les équipes utilisant le planning poker
                ont des erreurs d&apos;estimation plus faibles que les individus estimant seuls — pas parce que la moyenne est
                meilleure, mais parce que la discussion fait remonter la complexité cachée avant qu&apos;elle ne devienne une surprise.
              </Callout>
            </MethodAccordion>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-white border-l-2 border-purple-500 pl-4">
              Méthode 5 — Estimation par personnages
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/40 shrink-0">
              Mon idée
            </span>
          </div>
          <div className="space-y-5">
            <P>Les quatre méthodes ci-dessus sont établies et largement documentées. Celle-ci est la mienne.</P>
            <P>
              Après avoir observé de nombreuses sessions de sprint planning, j&apos;ai remarqué quelque chose : les rôles
              psychologiques qui façonnent les résultats de l&apos;estimation sont presque toujours invisibles. Il y a toujours
              quelqu&apos;un qui joue l&apos;avocat du diable. Quelqu&apos;un qui suit les risques que les autres ont négligés. Quelqu&apos;un qui
              semble intuiter la bonne réponse avant que quiconque puisse l&apos;articuler. Et quelqu&apos;un au milieu, qui essaie de
              rapprocher les estimations divergentes vers un consensus praticable.
            </P>
            <P>
              Ces rôles sont réels — mais dans la plupart des équipes, ils sont accidentels. L&apos;Estimation par personnages
              rend les rôles explicites.
            </P>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { emoji: '😈', name: 'Le Diable', title: "Avocat du diable", color: '#ef4444', bg: 'rgba(69,10,10,0.5)', body: "Son rôle est de challenger. Quand le groupe converge vers une estimation confortable, le Diable pousse en sens inverse — pour forcer l'équipe à défendre ses hypothèses. Ce rôle est souvent absent en pratique, ce qui explique pourquoi l'optimisme passe sans être remis en question." },
                { emoji: '⚔️', name: 'Le Chevalier', title: 'Modificateur à jetons', color: '#f59e0b', bg: 'rgba(28,20,5,0.5)', body: "Le Chevalier détient trois jetons par story — chacun représentant une unité d'influence qu'il peut ajouter ou retirer de n'importe quelle estimation. La rareté est intentionnelle : elle force le Chevalier à choisir quand intervenir." },
                { emoji: '🧙', name: 'Le Sorcier', title: 'Connaissance cachée', color: '#8b5cf6', bg: 'rgba(46,16,101,0.5)', body: "Le Sorcier sait quelque chose que les autres ignorent — ou du moins, il le suggère. Dans les équipes réelles, c'est l'ingénieur qui connaît une dette technique cachée, ou le designer qui sait qu'un flux similaire a été rejeté en test utilisateur." },
                { emoji: '🏹', name: 'Le Chasseur', title: 'Traqueur de risques', color: '#22c55e', bg: 'rgba(5,46,22,0.5)', body: "Le Chasseur évalue chaque estimation à travers le prisme du risque et des dépendances. Ses estimations sont naturellement élevées par construction — et c'est un contrepoids utile à l'optimisme ambiant." },
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
            <h3 className="text-base font-bold text-white mt-2">Pourquoi ça fonctionne</h3>
            <P>
              Attribuer des rôles fait deux choses. D&apos;abord, cela légitime des perspectives qui sont souvent supprimées
              en groupe. Le commentaire d&apos;avocat du diable est plus facile à formuler quand c&apos;est votre rôle, pas un trait
              de personnalité. Ensuite, cela crée une diversité cognitive par construction — vous n&apos;avez pas à espérer que
              les bonnes voix s&apos;expriment ; la structure le garantit.
            </P>
            <P>
              La mécanique des jetons du Chevalier est l&apos;élément le plus novateur. Les jetons sont rares, ce qui force
              la priorisation : les dépensez-vous pour faire baisser un outlier élevé, ou pour faire monter un outlier bas ?
              Ce choix révèle la lecture du Chevalier sur la story.
            </P>
            <Callout icon="🎭">
              Le meilleur résultat d&apos;une session d&apos;Estimation par personnages n&apos;est pas l&apos;estimation. C&apos;est le moment après
              la session où quelqu&apos;un dit : &quot;Je n&apos;aurais pas pensé à ce risque sans le rôle du Chasseur qui m&apos;y obligeait.&quot;
              La méthode est un échafaudage pour une conversation plus riche — l&apos;objectif est que cet échafaudage devienne
              inutile à terme.
            </Callout>
            <div className="rounded-xl border border-purple-800/40 bg-purple-950/20 p-5 space-y-3">
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Estimation par personnages en bref</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg bg-green-950/40 border border-green-900/40 p-3">
                  <p className="font-semibold text-green-400 mb-1">Utiliser quand</p>
                  <p className="text-gray-400">Nouvelles équipes ; cultures sujettes au groupthink ; stories à surface de risque floue.</p>
                </div>
                <div className="rounded-lg bg-red-950/40 border border-red-900/40 p-3">
                  <p className="font-semibold text-red-400 mb-1">Éviter quand</p>
                  <p className="text-gray-400">Petites équipes de 1–2 ; sessions très contraintes en temps ; équipes déjà fortes sur l&apos;expression des désaccords.</p>
                </div>
                <div className="rounded-lg bg-purple-950/40 border border-purple-900/40 p-3">
                  <p className="font-semibold text-purple-400 mb-1">En pratique</p>
                  <p className="text-gray-400">&quot;Le Diable a challengé notre estimation à 3. Le Chasseur a trouvé une dépendance. Estimation finale : 8. Réel : 7.&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">Comment choisir</h2>
          <div className="space-y-4">
            <P>Il n&apos;y a pas de gagnant universel. Voici comment les cinq méthodes se comparent sur les dimensions clés :</P>
            <ComparisonTable />
            <P>
              Mon approche par défaut : <strong className="text-white">T-shirt sizing</strong> pour les conversations roadmap
              avec des audiences mixtes, <strong className="text-white">story points + planning poker</strong> pour le sprint
              planning avec les équipes engineering, <strong className="text-white">PERT</strong> quand un stakeholder demande
              une date de livraison avec le risque quantifié, et <strong className="text-white">l&apos;Estimation par personnages</strong>
              pour embarquer une nouvelle équipe ou casser un pattern de consensus non challengé.
            </P>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 border-l-2 border-purple-500 pl-4">Points clés</h2>
          <ul className="space-y-3">
            {[
              ['La précision s\'améliore avec la pratique', 'Suivez les estimations vs. les réels. Faites une rétrospective sur les outliers. La méthode importe moins que la boucle de feedback.'],
              ['Utilisez le bon outil selon le contexte', 'T-shirt pour les roadmaps, story points pour les sprints, PERT quand l\'incertitude doit être rendue explicite.'],
              ['La divergence est un signal, pas du bruit', "Un 13 à côté d'un 2 n'est pas un problème à résoudre vite — c'est une connaissance cachée qui attend d'émerger."],
              ['Ne jamais convertir les points en temps', 'Laissez la vélocité émerger des données observées. Les conversions forcées corrompent le système.'],
              ['La conversation est le produit', 'Une bonne session d\'estimation aligne l\'équipe sur le périmètre, le risque et l\'approche — le chiffre est un sous-produit.'],
              ['Rendez les rôles invisibles visibles', 'Chaque équipe a déjà un diable et un chasseur. L\'Estimation par personnages leur donne simplement la permission d\'apparaître.'],
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

      <div className="mt-16 pt-6 border-t border-gray-800">
        <Link href="/Articles/fr" className="text-xs text-gray-500 hover:text-purple-400 transition-colors">← Tous les articles</Link>
      </div>
    </div>
  )
}
