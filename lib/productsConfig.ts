import { StaticImageData } from 'next/image'

export type ProductStatus = 'shipped' | 'active'

export type Product = {
  id: string // URL slug
  name: { en: string; fr: string }
  tagline: { en: string; fr: string }
  description: { en: string; fr: string }
  howToUse: { en: string; fr: string }
  stack: string[]
  status: ProductStatus
  year: number
  mediaSrc: StaticImageData
  repoUrl?: string
  linkUrl?: string
  linkText?: { en: string; fr: string }
  // Slugs into projectsConfig — the professional/portfolio write-up this
  // product relates to, when one exists.
  relatedProjectIds?: string[]
}

// ─── Template ─────────────────────────────────────────────────────────────────
// {
//   id: 'my-product-slug',
//   name:        { en: 'English Name', fr: 'Nom français' },
//   tagline:     { en: '...', fr: '...' },
//   description: { en: '...', fr: '...' },
//   howToUse:    { en: '...', fr: '...' },
//   stack: ['TypeScript', 'Electron'],
//   status: 'shipped',
//   year: 2026,
//   mediaSrc: myImage,
//   repoUrl: 'https://github.com/...',
//   linkUrl: 'https://...',
//   linkText: { en: 'Try it', fr: 'Essayer' },
//   relatedProjectIds: ['my-project-slug'],
// },

import stock_network_graph from '@/assets/projects/stock-network-graph.jpg'

export const productsConfig: Product[] = [
  // ── Task Tracker · 2026 ────────────────────────────────────────────────────
  {
    id: 'task-tracker',
    name: {
      en: 'Task Tracker',
      fr: 'Task Tracker',
    },
    tagline: {
      en: 'Gantt, Kanban, calendar and sprint board on one data model.',
      fr: 'Gantt, Kanban, calendrier et tableau de sprint sur un seul modèle de données.',
    },
    description: {
      en: 'A standalone desktop task tracker built on a flexible, Airtable-style data model: typed collections, linked records, rollups, and formulas, rendered through multiple interchangeable views that all write back to the same records. Includes a fully editable, dependency-aware Gantt chart (drag to move or resize, cascading date updates), a Kanban board, a calendar view, sprint planning with baselines and sprint closure, an undo/redo command stack, CSV export, and a built-in AI chat panel for querying and editing data in natural language.',
      fr: 'Un gestionnaire de tâches de bureau autonome construit sur un modèle de données flexible façon Airtable : collections typées, enregistrements liés, rollups et formules, affichés via plusieurs vues interchangeables qui écrivent toutes dans les mêmes enregistrements. Inclut un diagramme de Gantt entièrement éditable avec dépendances, un tableau Kanban, une vue calendrier, la planification de sprints avec baselines et clôture, une pile annuler/rétablir, l\'export CSV, et un panneau de chat IA intégré.',
    },
    howToUse: {
      en: 'Define collections (Tasks, Epics, Products, or any custom hierarchy) with typed fields and links between them. Work the same records through whichever view fits the moment: drag Gantt bars to reschedule with dependencies cascading automatically, move cards across a Kanban board, plan and close sprints, or ask the built-in chat panel to summarize or update records for you.',
      fr: 'Définissez des collections (tâches, épics, produits, ou toute hiérarchie personnalisée) avec des champs typés et des liens entre elles. Travaillez les mêmes enregistrements via la vue qui convient.',
    },
    stack: ['Tauri', 'React', 'TypeScript'],
    status: 'active',
    year: 2026,
    mediaSrc: stock_network_graph,
    repoUrl: 'https://github.com/wivoo-edittmer/task-tracker',
    relatedProjectIds: ['task-tracker'],
  },

  // ── Process Flow Builder · 2026 ────────────────────────────────────────────
  {
    id: 'process-flow-builder',
    name: {
      en: 'Process Flow Builder',
      fr: 'Process Flow Builder',
    },
    tagline: {
      en: 'Layered, expandable process maps — a Mac app and a web version from one codebase.',
      fr: 'Cartes de processus en couches et extensibles — une app Mac et une version web depuis une seule base de code.',
    },
    description: {
      en: 'A diagramming tool purpose-built for process maps that need to go deep without becoming unreadable: every branch expands and collapses independently, steps can cross-link to other branches with dashed or solid arrows, and whole outlines can be pasted in to build many steps at once. Ships two ways from one codebase — a Mac desktop app (offline, saves to a local file) and a web version. Currently at v1.4.0.',
      fr: 'Un outil de diagrammes conçu pour les cartes de processus qui doivent aller en profondeur sans devenir illisibles : chaque branche se déplie et se replie indépendamment, les étapes peuvent être reliées entre branches par des flèches pointillées ou pleines. Disponible en app Mac de bureau et en version web depuis la même base de code. Actuellement en v1.4.0.',
    },
    howToUse: {
      en: 'Select a step and press Tab to add a sub-step one layer deeper, or Enter for a step at the same level. Click a step\'s pill (or press Space) to expand or collapse its branch, and use the toolbar\'s Show 1/2/3/All to reveal the map to a given depth. Paste an indented outline to build many steps at once, link a step to another branch for shared sub-flows.',
      fr: 'Sélectionnez une étape et appuyez sur Tab pour ajouter une sous-étape, ou Entrée pour une étape au même niveau. Cliquez sur la pastille d\'une étape (ou Espace) pour déplier ou replier sa branche.',
    },
    stack: ['Electron', 'JavaScript', 'HTML/CSS'],
    status: 'shipped',
    year: 2026,
    mediaSrc: stock_network_graph,
    repoUrl: 'https://github.com/wivoo-edittmer/process-flow-builder',
    linkUrl: 'https://claude.ai/artifact/3ERPZfeDYCZgLqvT63su9C',
    linkText: { en: 'Try the web version', fr: 'Essayer la version web' },
    relatedProjectIds: ['process-flow-builder'],
  },

  // ── Obsidian Daily Rollover · 2026 ──────────────────────────────────────────
  {
    id: 'obsidian-daily-rollover',
    name: {
      en: 'Obsidian Daily Rollover',
      fr: 'Obsidian Daily Rollover',
    },
    tagline: {
      en: 'An Obsidian plugin that rolls over unfinished todos and AI-summarizes yesterday\'s notes.',
      fr: 'Un plugin Obsidian qui reporte les tâches non terminées et résume les notes de la veille par IA.',
    },
    description: {
      en: 'An Obsidian plugin that rolls over unchecked todos from the most recent daily note into today\'s note, and generates an AI summary of the previous day\'s free-form content using the local Claude CLI. The summary is split into action items (as checkboxes) and key context, driven by a fully customizable prompt.',
      fr: 'Un plugin Obsidian qui reporte les tâches non cochées de la note du jour précédent vers la note du jour, et génère un résumé IA du contenu libre de la veille via la CLI Claude locale. Le résumé est divisé en actions (sous forme de cases à cocher) et contexte clé, piloté par un prompt entièrement personnalisable.',
    },
    howToUse: {
      en: 'Click the ribbon icon or run "Roll over daily note" from the command palette. The plugin finds your most recent daily note, carries forward any unchecked todos into today\'s note, and — if the Claude CLI is available — summarizes the rest of yesterday\'s content into action items and key context. Configure the Claude binary path, summary prompt, and whether a divider is added, from the plugin\'s settings tab.',
      fr: 'Cliquez sur l\'icône du ruban ou lancez "Roll over daily note" depuis la palette de commandes. Le plugin retrouve votre note du jour précédent, reporte les tâches non cochées vers la note du jour, et résume le reste du contenu via la CLI Claude si disponible.',
    },
    stack: ['TypeScript', 'Obsidian Plugin API', 'Claude CLI'],
    status: 'shipped',
    year: 2026,
    mediaSrc: stock_network_graph,
    repoUrl: 'https://github.com/wivoo-edittmer/wivoo-daily-rollover',
  },
]
