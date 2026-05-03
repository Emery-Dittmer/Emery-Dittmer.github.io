import { StaticImageData } from 'next/image'
import { LaneId } from '@/lib/skillsConfig'

export type NodeType = 'input' | 'process' | 'storage' | 'output' | 'model' | 'service'

export type ArchitectureNode = {
  id: string
  label: string
  description?: string
  type: NodeType
  /** Key from lib/techLogos.ts – shows the technology logo in the diagram */
  technology?: string
}

export type ProjectType = 'academic' | 'professional' | 'personal'

export type Project = {
  id: string                          // URL slug
  title: { en: string; fr: string }
  company: { en: string; fr: string }
  mediaSrc: StaticImageData

  year: number                        // Year the project was completed
  projectType: ProjectType
  industry: string
  laneIds: LaneId[]

  description: { en: string; fr: string }
  purpose: { en: string; fr: string }
  howToUse: { en: string; fr: string }

  architecture: {
    overview: { en: string; fr: string }
    nodes: ArchitectureNode[]
    diagramSrc?: string
  }

  skills: string[]
  certifications: string[]

  linkUrl?: string
  linkText?: { en: string; fr: string }
}

// ─── Template ─────────────────────────────────────────────────────────────────
// {
//   id: 'my-project-slug',
//   title:       { en: 'English Title', fr: 'French Title' },
//   company:     { en: 'Company',       fr: 'Entreprise' },
//   mediaSrc: myImage,
//   year: 2024,
//   projectType: 'professional',
//   industry: 'Finance',
//   laneIds: ['data-science', 'data-analytics'],
//   description: { en: '...', fr: '...' },
//   purpose:     { en: '...', fr: '...' },
//   howToUse:    { en: '...', fr: '...' },
//   architecture: {
//     overview: { en: '...', fr: '...' },
//     nodes: [
//       { id: '1', label: 'Source',  type: 'input',   technology: 'python',  description: '...' },
//       { id: '2', label: 'Process', type: 'process', technology: 'excel',   description: '...' },
//       { id: '3', label: 'Output',  type: 'output',  technology: 'powerbi'                     },
//     ],
//   },
//   skills: ['skill-id'],
//   certifications: ['Cert Name'],
//   linkUrl: 'https://...',
//   linkText: { en: 'See here', fr: 'Voir ici' },
// },

import windturbine      from '@/assets/projects/windturbine.png'
import fraud_risk       from '@/assets/projects/fraudtool.png'
import accrual_forecast from '@/assets/projects/financialmodel.png'
import network          from '@/assets/projects/network.png'
import movie            from '@/assets/projects/movies.png'
import reversal_finder  from '@/assets/projects/journalentry.png'
import workshop         from '@/assets/projects/workshopicon.png'
import inventory_drain  from '@/assets/projects/supplyforecast.png'
import demand_supply    from '@/assets/projects/demandinvtory.png'

export const projectsConfig: Project[] = [

  // ── Workshop Effectiveness Analytics · 2020 ────────────────────────────────
  {
    id: 'workshop-effectiveness-analytics',
    title: {
      en: 'Advising Workshop Effectiveness Analytics',
      fr: 'Analyses de l\'efficacité d\'ateliers de conseil',
    },
    company: { en: 'Professional Project · RBC', fr: 'Projet professionnel · RBC' },
    mediaSrc: workshop,
    year: 2020,
    projectType: 'professional',
    industry: 'Finance & Banking',
    laneIds: ['business-intelligence', 'data-analytics'],
    description: {
      en: 'Prepared a BI dashboard and report using advisor workshop attendance data. Segmented workshop participation by location, subject, and marketing factors. Insights allowed RBC to shift to a geographic and demographic approach to workshop scheduling, increasing value and effectiveness.*',
      fr: 'Préparation d\'un tableau de bord BI et d\'un rapport à partir des données d\'ateliers. Segmentation des participants par lieu, sujet et facteurs marketing pour permettre à RBC d\'adopter une approche ciblée.*',
    },
    purpose: {
      en: 'Give RBC advisors and management data-driven insight into which workshop topics, times, and geographic markets drove the highest attendance and client value — enabling a shift from a uniform to a targeted, demographic-led workshop strategy.',
      fr: 'Fournir à RBC des informations basées sur les données pour identifier les sujets, horaires et marchés qui génèrent la plus forte valeur client, et permettre une stratégie d\'atelier ciblée.',
    },
    howToUse: {
      en: 'Open the BI dashboard and use the filter panel to slice attendance data by region, subject, date range, or advisor. The report summary highlights the highest-performing segments and recommended scheduling changes.',
      fr: 'Ouvrez le tableau de bord BI et utilisez le panneau de filtres pour segmenter les données de participation par région, sujet, période ou conseiller.',
    },
    architecture: {
      overview: {
        en: 'Workshop attendance records are cleaned and loaded into a BI tool. Segmentation analysis breaks attendance by location, subject, and demographics. A dashboard surfaces findings for management.',
        fr: 'Les données de participation sont nettoyées et chargées dans un outil BI. L\'analyse de segmentation répartit la participation par lieu, sujet et données démographiques.',
      },
      nodes: [
        { id: '1', label: 'Attendance Data',    type: 'input',   technology: 'excel',   description: 'Workshop participation records' },
        { id: '2', label: 'ETL Pipeline',       type: 'process', technology: 'alteryx', description: 'Data cleansing & standardization' },
        { id: '3', label: 'Segmentation Model', type: 'model',   technology: 'python',  description: 'Location, subject & demographic splits' },
        { id: '4', label: 'BI Dashboard',       type: 'output',  technology: 'powerbi', description: 'Effectiveness metrics & recommendations' },
      ],
    },
    skills: ['time-series-panel-data', 'causal-inference'],
    certifications: ['Power BI'],
  },

  // ── Journal Entry Reversal Finder · 2021 ──────────────────────────────────
  {
    id: 'journal-entry-reversal-finder',
    title: {
      en: 'Journal Entry Reversal Finder',
      fr: 'Détecteur d\'écritures d\'extourne',
    },
    company: { en: 'Professional Project · PwC', fr: 'Projet professionnel · PwC' },
    mediaSrc: reversal_finder,
    year: 2021,
    projectType: 'professional',
    industry: 'Finance & Audit',
    laneIds: ['data-engineering', 'data-analytics'],
    description: {
      en: 'Developed an Alteryx workflow that automatically detected and matched journal entry reversals within ERP data, replacing a time-consuming manual audit procedure. The tool produced a structured report of matched pairs, freeing audit teams to focus on higher-risk transactions.*',
      fr: 'Développement d\'un workflow Alteryx détectant automatiquement les extournes d\'écritures comptables dans les données ERP, remplaçant une procédure d\'audit manuelle longue.*',
    },
    purpose: {
      en: 'Automate the identification and matching of reversed journal entries within large ERP datasets — a time-consuming manual audit step — so that audit teams can focus effort on higher-risk transactions and reduce engagement costs.',
      fr: 'Automatiser l\'identification et le rapprochement des écritures d\'extourne dans les grands ensembles de données ERP, libérant les équipes d\'audit pour les transactions à haut risque.',
    },
    howToUse: {
      en: 'Export journal entry data from the ERP and load it into the Alteryx workflow. Run the workflow to execute the matching algorithm and output a reversal report identifying paired entries, amounts, and posting dates.',
      fr: 'Exportez les données d\'écritures du système ERP et chargez-les dans le workflow Alteryx pour produire un rapport de rapprochement des paires d\'extournes.',
    },
    architecture: {
      overview: {
        en: 'Journal entries are extracted from the ERP and piped into an Alteryx ETL workflow. A matching algorithm identifies reversal pairs and outputs a structured audit report.',
        fr: 'Les écritures comptables sont extraites du système ERP et acheminées dans un workflow Alteryx ETL. Un algorithme de correspondance identifie les paires d\'extournes.',
      },
      nodes: [
        { id: '1', label: 'ERP Journal Data',  type: 'input',   technology: 'excel',   description: 'Raw journal entries from the ERP system' },
        { id: '2', label: 'Alteryx ETL',        type: 'process', technology: 'alteryx', description: 'Data cleansing & transformation pipeline' },
        { id: '3', label: 'Matching Algorithm', type: 'model',   technology: 'alteryx', description: 'Reversal pair detection logic' },
        { id: '4', label: 'Audit Report',       type: 'output',  technology: 'excel',   description: 'Matched reversal pairs with metadata' },
      ],
    },
    skills: [],
    certifications: ['Alteryx Designer Core', 'Alteryx Designer Advanced'],
  },

  // ── Wind Turbine Blade Recycling · 2022 ───────────────────────────────────
  {
    id: 'wind-turbine-recycling',
    title: {
      en: 'Wind Turbine Blade Recycling – Facility Location & Route Optimization',
      fr: 'Recyclage de pales d\'éoliennes – Localisation & optimisation des routes',
    },
    company: { en: 'Academic Project · McGill University', fr: 'Projet académique · Université McGill' },
    mediaSrc: windturbine,
    year: 2022,
    projectType: 'academic',
    industry: 'Energy & Environment',
    laneIds: ['data-science', 'data-analytics', 'project-management'],
    description: {
      en: 'Led a 4-person academic research team over a 3-month engagement to model and optimize wind turbine blade recycling logistics across Ontario. Applied Capacitated Multi-Facility Weber Problem (CMFWP) and Travelling Salesman Problem (TSP) formulations across 108 Ontario wind farms. Produced policy-relevant recommendations for Canada\'s emerging wind turbine recycling industry.',
      fr: 'Direction d\'une équipe académique de 4 personnes sur 3 mois pour modéliser et optimiser la logistique de recyclage des pales d\'éoliennes en Ontario. Application des formulations CMFWP et TSP sur 108 parcs éoliens.',
    },
    purpose: {
      en: 'Identify optimal locations for wind turbine blade recycling facilities and specialized truck routes across Ontario — minimizing total cost (fixed construction + variable transport) while producing a replicable model for Canada\'s green economy infrastructure planning.',
      fr: 'Identifier les emplacements optimaux pour les installations de recyclage et les routes de camions spécialisés en Ontario, minimisant le coût total tout en produisant un modèle réplicable pour la planification de l\'infrastructure.',
    },
    howToUse: {
      en: 'Review the published report for recommended facility locations, vehicle routing plans, and sensitivity analyses. The CMFWP and TSP models can be re-run with updated wind farm data, facility costs, or transportation rates to produce revised recommendations for different provincial or national scenarios.',
      fr: 'Consultez le rapport publié pour les emplacements recommandés, les plans de routage et les analyses de sensibilité. Les modèles peuvent être réexécutés avec des données mises à jour.',
    },
    architecture: {
      overview: {
        en: 'Geospatial wind farm data and cost parameters are fed into two sequential optimization stages — facility location (CMFWP) followed by vehicle routing (TSP). Results are integrated and reported as actionable policy recommendations.',
        fr: 'Les données géospatiales et les paramètres de coût alimentent deux étapes d\'optimisation séquentielles : localisation des installations (CMFWP) puis routage des véhicules (TSP).',
      },
      nodes: [
        { id: '1', label: 'Geospatial Data',    type: 'input',   technology: 'esri',   description: '108 Ontario wind farm locations & road networks' },
        { id: '2', label: 'Cost Parameters',    type: 'input',   technology: 'excel',  description: 'Fixed construction & variable transport costs' },
        { id: '3', label: 'Facility Location',  type: 'model',   technology: 'gurobi', description: 'CMFWP – minimize total facility & transport cost' },
        { id: '4', label: 'Route Optimization', type: 'model',   technology: 'gurobi', description: 'TSP – specialized truck routing between sites' },
        { id: '5', label: 'Policy Report',      type: 'output',  technology: 'excel',  description: 'Optimal locations, routes & sensitivity analysis' },
      ],
    },
    skills: ['time-series-panel-data', 'causal-inference'],
    certifications: [],
    linkUrl: 'https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/turbine_recycling.pdf',
    linkText: { en: 'See the report here', fr: 'Voir le rapport' },
  },

  // ── Government Financial Investigation · 2022 ─────────────────────────────
  {
    id: 'government-financial-investigation',
    title: {
      en: 'Government Financial Investigation & Reporting',
      fr: 'Investigation et rapport financier gouvernemental',
    },
    company: { en: 'Professional Project · PwC / Canada Government', fr: 'Projet professionnel · PwC / Gouvernement du Canada' },
    mediaSrc: accrual_forecast,
    year: 2022,
    projectType: 'professional',
    industry: 'Government & Public Sector',
    laneIds: ['data-analytics', 'business-intelligence', 'project-management'],
    description: {
      en: 'Led a financial impact assessment for the Government of Canada, managing a team of 1 over a sub-3-month mandate. Consolidated fragmented departmental spending data, identified significant overspending patterns, and surfaced the absence of a centralized expenditure management platform. Delivered a credible, evidence-based report with actionable recommendations to senior public sector stakeholders.',
      fr: 'Direction d\'une évaluation d\'impact financier pour le gouvernement du Canada sur moins de 3 mois. Consolidation de données de dépenses fragmentées, identification de schémas de surcoûts et livraison de recommandations basées sur des données probantes.',
    },
    purpose: {
      en: 'Evaluate the financial performance of an active government initiative, quantify the impact of fragmented spending data, and deliver a structured framework of findings — navigating stakeholder sensitivity within a government context and producing actionable recommendations within a tight mandate window.',
      fr: 'Évaluer la performance financière d\'une initiative gouvernementale active, quantifier l\'impact des données de dépenses fragmentées et livrer un cadre structuré de recommandations dans un contexte gouvernemental sensible.',
    },
    howToUse: {
      en: 'Engage with fragmented departmental spending data and consolidate into a unified analytical model. Run the expenditure analysis to surface overspending patterns and missing controls, then structure findings using the stakeholder reporting framework for clear, objective communication to senior government contacts.',
      fr: 'Consolider les données de dépenses départementales fragmentées dans un modèle analytique unifié. Exécuter l\'analyse pour identifier les schémas de surcoûts, puis structurer les résultats pour une communication claire aux parties prenantes gouvernementales.',
    },
    architecture: {
      overview: {
        en: 'Fragmented spending data from multiple government sources is consolidated and cleansed. An expenditure analysis model identifies overspending patterns and control gaps. Findings are structured into a stakeholder-ready report with actionable recommendations.',
        fr: 'Les données de dépenses fragmentées provenant de plusieurs sources gouvernementales sont consolidées et nettoyées. Un modèle d\'analyse identifie les schémas de surcoûts et les lacunes de contrôle.',
      },
      nodes: [
        { id: '1', label: 'Fragmented Data',      type: 'input',   technology: 'excel',   description: 'Departmental spending records across initiatives' },
        { id: '2', label: 'Data Consolidation',   type: 'process', technology: 'alteryx', description: 'Cleansing & unification of spending sources' },
        { id: '3', label: 'Expenditure Analysis', type: 'model',   technology: 'python',  description: 'Overspending pattern detection & control gap analysis' },
        { id: '4', label: 'Impact Assessment',    type: 'process', technology: 'excel',   description: 'Financial impact quantification & scenario modelling' },
        { id: '5', label: 'Stakeholder Report',   type: 'output',  technology: 'excel',   description: 'Evidence-based findings with actionable recommendations' },
      ],
    },
    skills: ['causal-inference', 'time-series-panel-data'],
    certifications: ['CAPM'],
  },

  // ── Fraud Risk Detection Tool · 2022 ──────────────────────────────────────
  {
    id: 'fraud-risk-detection',
    title: {
      en: 'Fraud Risk Detection Tool',
      fr: 'Outil de détection du risque de fraude',
    },
    company: { en: 'Professional Project · PwC', fr: 'Projet professionnel · PwC' },
    mediaSrc: fraud_risk,
    year: 2022,
    projectType: 'professional',
    industry: 'Finance & Audit',
    laneIds: ['data-analytics', 'business-intelligence'],
    description: {
      en: 'Built a financial risk and fraud assessment tool using a custom Excel VBA workbook. The tool allowed organizations to self-evaluate or externally evaluate their processes, generating a standardized risk score and colour-coded highlight report — making complex fraud risk assessment accessible without bespoke software.*',
      fr: 'Développement d\'un outil d\'évaluation du risque de fraude via un classeur Excel VBA personnalisé, permettant aux organisations d\'évaluer leurs processus et de générer un score de risque standardisé.*',
    },
    purpose: {
      en: 'Provide organizations with a fast, repeatable way to assess their exposure to financial fraud risk — producing a standardized risk score and actionable highlight report without requiring bespoke software or technical expertise from the client.',
      fr: 'Fournir aux organisations un moyen rapide d\'évaluer leur exposition au risque de fraude financière, produisant un score de risque standardisé sans nécessiter de logiciel dédié.',
    },
    howToUse: {
      en: 'Open the Excel VBA workbook and input the organization\'s financial process data into the structured template. Run the macro to trigger the scoring engine, which evaluates each control area and outputs a colour-coded risk report with an overall risk score.',
      fr: 'Ouvrez le classeur Excel VBA, saisissez les données de processus financiers dans le modèle structuré, puis exécutez la macro pour produire un rapport de risque codé par couleur.',
    },
    architecture: {
      overview: {
        en: 'Financial process data is entered into a structured Excel input sheet. VBA macros process the entries through a weighted risk-scoring framework and generate a formatted output report with dynamic highlights.',
        fr: 'Les données de processus financiers sont saisies dans une feuille Excel structurée. Des macros VBA les traitent via un cadre de score de risque pondéré.',
      },
      nodes: [
        { id: '1', label: 'Financial Data',   type: 'input',   technology: 'excel', description: 'Client financial process records & controls' },
        { id: '2', label: 'Input Template',   type: 'storage', technology: 'excel', description: 'Structured data entry workbook' },
        { id: '3', label: 'VBA Macro Engine', type: 'process', technology: 'vba',   description: 'Automated scoring and transformation logic' },
        { id: '4', label: 'Risk Scoring',     type: 'model',   technology: 'vba',   description: 'Weighted multi-factor risk calculation' },
        { id: '5', label: 'Risk Report',      type: 'output',  technology: 'excel', description: 'Colour-coded scorecard with dynamic highlights' },
      ],
    },
    skills: ['regularised-regression-lasso-ridge'],
    certifications: ['Alteryx Designer Advanced', 'CAPM'],
  },

  // ── Movie Theatre Revenue Forecasting · 2022 ──────────────────────────────
  {
    id: 'movie-theatre-revenue',
    title: {
      en: 'Movie Theatre Revenue Forecasting',
      fr: 'Prévision des revenus de salles de cinéma',
    },
    company: { en: 'Academic Project', fr: 'Projet académique' },
    mediaSrc: movie,
    year: 2022,
    projectType: 'academic',
    industry: 'Entertainment & Retail',
    laneIds: ['data-science', 'data-analytics'],
    description: {
      en: 'Investigated optimal post-pandemic pricing models for movie theatres using demand modelling and revenue scenario analysis. Quantified the marginal revenue impact of multiple ticket and concession pricing strategies, delivering a comparative framework for operators to evaluate recovery options.',
      fr: 'Investigation des modèles de tarification optimaux post-pandémie pour les salles de cinéma via la modélisation de la demande et l\'analyse de scénarios de revenus.',
    },
    purpose: {
      en: 'Help movie theatre operators recover post-pandemic revenue by identifying optimal pricing strategies across tickets and concessions, and quantifying the marginal revenue impact of each strategy scenario.',
      fr: 'Aider les exploitants de salles de cinéma à retrouver leurs revenus post-pandémie en identifiant les stratégies de tarification optimales.',
    },
    howToUse: {
      en: 'Review the published report to explore the pricing scenarios and their projected revenue outcomes. Operators can adapt model parameters (elasticity assumptions, concession margins) to their specific context to evaluate which strategy fits their market.',
      fr: 'Consultez le rapport publié pour explorer les scénarios de tarification. Les opérateurs peuvent adapter les paramètres du modèle à leur contexte spécifique.',
    },
    architecture: {
      overview: {
        en: 'Historical ticket and concession sales data calibrates a demand model. Multiple pricing scenarios are simulated and compared to identify optimal strategies.',
        fr: 'Les données historiques de vente calibrent un modèle de demande. Plusieurs scénarios de tarification sont simulés et comparés.',
      },
      nodes: [
        { id: '1', label: 'Sales Data',       type: 'input',   technology: 'excel',  description: 'Historical ticket & concession sales' },
        { id: '2', label: 'Demand Model',     type: 'model',   technology: 'r',      description: 'Price-elasticity & demand estimation' },
        { id: '3', label: 'Scenario Engine',  type: 'process', technology: 'python', description: 'Multiple pricing strategy simulations' },
        { id: '4', label: 'Revenue Forecast', type: 'output',  technology: 'excel',  description: 'Projected revenue by strategy' },
      ],
    },
    skills: ['time-series-panel-data', 'regularised-regression-lasso-ridge'],
    certifications: [],
    linkUrl: 'https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/Revenue%20managment.pdf',
    linkText: { en: 'See the report here', fr: 'Voir le rapport' },
  },

  // ── Government Financial Model · 2023 ─────────────────────────────────────
  {
    id: 'government-financial-model',
    title: {
      en: 'Large Government Department Financial Model',
      fr: 'Modèle financier pour un grand ministère',
    },
    company: { en: 'Professional Project · PwC', fr: 'Projet professionnel · PwC' },
    mediaSrc: accrual_forecast,
    year: 2023,
    projectType: 'professional',
    industry: 'Government & Public Sector',
    laneIds: ['business-intelligence', 'data-analytics', 'project-management'],
    description: {
      en: 'Developed a 50-year capital asset replacement financial model for a large federal government department. A Power BI dashboard visualized accrual ceilings and budget requirements, enabling planners to identify ~$500M in redundant assets and optimize replacement scheduling over the next five decades.*',
      fr: 'Développement d\'un modèle financier de remplacement d\'actifs sur 50 ans pour un grand ministère fédéral. Un tableau de bord Power BI a permis d\'identifier ~500M$ d\'actifs redondants.*',
    },
    purpose: {
      en: 'Enable a large federal government department to model 50 years of capital asset replacement cycles, optimize budget allocation, identify redundant assets, and visualize accrual and budget constraints — ultimately saving ~$500M in avoidable expenditure.',
      fr: 'Permettre à un grand ministère fédéral de modéliser 50 ans de cycles de remplacement d\'actifs, d\'optimiser l\'allocation budgétaire et d\'identifier les actifs redondants, économisant environ 500 millions de dollars.',
    },
    howToUse: {
      en: 'Asset managers update the asset registry with current inventory and condition data. The financial model recalculates replacement schedules and accrual requirements, feeding the Power BI dashboard where planners can filter by asset class, department, and time horizon.',
      fr: 'Les gestionnaires d\'actifs mettent à jour le registre avec les données d\'inventaire actuelles. Le modèle recalcule les calendriers et alimente le tableau de bord Power BI.',
    },
    architecture: {
      overview: {
        en: 'An asset registry feeds a 50-year capital planning model that calculates replacement timelines and accrual ceilings. Results are stored in a data warehouse and surfaced through a Power BI dashboard.',
        fr: 'Un registre d\'actifs alimente un modèle de planification sur 50 ans. Les résultats sont stockés dans un entrepôt et affichés via un tableau de bord Power BI.',
      },
      nodes: [
        { id: '1', label: 'Asset Registry',  type: 'input',   technology: 'excel',   description: 'Capital asset inventory, age & condition data' },
        { id: '2', label: 'Financial Model', type: 'model',   technology: 'excel',   description: '50-year capital replacement & accrual model' },
        { id: '3', label: 'Data Warehouse',  type: 'storage', technology: 'mysql',   description: 'Budget, accrual & projection data store' },
        { id: '4', label: 'BI Dashboard',    type: 'output',  technology: 'powerbi', description: 'Accrual ceiling, budget & redundancy views' },
      ],
    },
    skills: ['time-series-panel-data'],
    certifications: ['Power BI', 'CAPM'],
  },

  // ── USPTO Network Analysis / Patent Processing · 2023 ─────────────────────
  {
    id: 'network-analysis',
    title: {
      en: 'Organizational Network Analysis – USPTO Patent Processing',
      fr: 'Analyse de réseau organisationnel – Traitement des brevets USPTO',
    },
    company: { en: 'Academic Project · McGill University', fr: 'Projet académique · Université McGill' },
    mediaSrc: network,
    year: 2023,
    projectType: 'academic',
    industry: 'Technology & Academia',
    laneIds: ['data-science', 'data-analytics'],
    description: {
      en: 'Led a 4-person academic research team over a 6-week engagement to investigate the effect of examiner advice networks on patent processing speed at the USPTO. Applied linear regression, survival analysis, decision tree modelling, and cluster analysis across large-scale patent datasets. Produced nuanced insights into how network centrality and examiner tenure shape institutional decision-making speed.',
      fr: 'Direction d\'une équipe de 4 personnes sur 6 semaines pour étudier l\'effet des réseaux de conseil des examinateurs sur la vitesse de traitement des brevets à l\'USPTO. Application de régressions, analyses de survie et arbres de décision.',
    },
    purpose: {
      en: 'Investigate whether examiner advice networks at the USPTO influence patent processing speed — determining which network characteristics (centrality, reciprocity, tenure) are predictive of faster or slower patent decisions, with implications for institutional efficiency and examiner policy.',
      fr: 'Étudier si les réseaux de conseil des examinateurs à l\'USPTO influencent la vitesse de traitement des brevets, et identifier les caractéristiques de réseau prédictives d\'une prise de décision plus rapide.',
    },
    howToUse: {
      en: 'The analysis report and network visualizations are available in the linked PDF. The methodology — combining survival analysis with network centrality measures — can be applied to other patent offices or institutional review bodies to evaluate how informal advice structures affect processing efficiency.',
      fr: 'Le rapport d\'analyse et les visualisations sont disponibles dans le PDF lié. La méthodologie combinant analyse de survie et mesures de centralité de réseau peut être appliquée à d\'autres organismes de révision institutionnels.',
    },
    architecture: {
      overview: {
        en: 'Raw USPTO patent application datasets are loaded and graph structures built from examiner advice relationships. Multiple statistical models assess the relationship between network position and patent processing speed.',
        fr: 'Les données brutes de brevets USPTO sont chargées et des structures de graphe construites à partir des relations de conseil des examinateurs. Plusieurs modèles statistiques évaluent la relation entre position réseau et vitesse de traitement.',
      },
      nodes: [
        { id: '1', label: 'USPTO Dataset',      type: 'input',   technology: 'python', description: 'Patent applications & examiner advice network data' },
        { id: '2', label: 'Graph Construction', type: 'process', technology: 'python', description: 'Node & directed-edge modeling (NetworkX)' },
        { id: '3', label: 'Statistical Models', type: 'model',   technology: 'r',      description: 'Regression, survival analysis, decision trees & clustering' },
        { id: '4', label: 'Network Diagrams',   type: 'output',  technology: 'plotly', description: 'Centrality & processing-speed visualizations' },
      ],
    },
    skills: ['causal-inference', 'differences-in-differences', 'tree-based-methods-xgboost-random-forest'],
    certifications: [],
    linkUrl: 'https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/Networkanalysis.pdf',
    linkText: { en: 'See the report here', fr: 'Voir le rapport' },
  },

  // ── Reserva Conchal Waste Optimization · 2023 ─────────────────────────────
  {
    id: 'reserva-conchal-waste-optimization',
    title: {
      en: 'Reserva Conchal Waste Optimization & Data Collection',
      fr: 'Optimisation des déchets & collecte de données – Reserva Conchal',
    },
    company: { en: 'Professional Project · Reserva Conchal', fr: 'Projet professionnel · Reserva Conchal' },
    mediaSrc: inventory_drain,
    year: 2023,
    projectType: 'professional',
    industry: 'Hospitality & Sustainability',
    laneIds: ['data-analytics', 'data-engineering', 'project-management'],
    description: {
      en: 'Led a team of 3–5 over a sub-3-month engagement to analyze and optimize waste management operations for Reserva Conchal, a luxury resort in Costa Rica. Designed and implemented an automated analytical framework to consolidate waste and resource data across the property, making primary waste generation sites visible to operations management for the first time.',
      fr: 'Direction d\'une équipe de 3 à 5 personnes pour analyser et optimiser la gestion des déchets du resort de luxe Reserva Conchal au Costa Rica. Conception d\'un cadre analytique automatisé pour consolider les données de déchets à travers la propriété.',
    },
    purpose: {
      en: 'Systematically identify primary waste generation sites and resource inefficiencies across the Reserva Conchal property — data that was previously invisible to operations management — and equip the client with a repeatable, data-driven approach to ongoing waste monitoring and reduction.',
      fr: 'Identifier systématiquement les principaux sites de génération de déchets et les inefficacités de ressources à travers la propriété, et équiper le client d\'une approche de surveillance des déchets basée sur les données.',
    },
    howToUse: {
      en: 'Feed property-wide waste and resource data into the automated analytical framework. The tool generates waste generation site rankings and identifies resource inefficiencies, enabling operations management to prioritize reduction efforts. The framework is designed to run on a repeating basis for ongoing monitoring.',
      fr: 'Alimentez le cadre analytique automatisé avec les données de déchets et de ressources de la propriété. L\'outil génère des classements des sites de génération de déchets et identifie les inefficacités de ressources pour une surveillance continue.',
    },
    architecture: {
      overview: {
        en: 'Waste and resource data from across the resort property is consolidated into an automated analytical pipeline. The framework identifies primary generation sites and inefficiencies, equipping the operations team with a repeatable monitoring tool.',
        fr: 'Les données de déchets et de ressources de l\'ensemble du resort sont consolidées dans un pipeline analytique automatisé qui identifie les principaux sites de génération et les inefficacités.',
      },
      nodes: [
        { id: '1', label: 'Property Data',          type: 'input',   technology: 'excel',   description: 'Waste & resource data from across the resort' },
        { id: '2', label: 'Automated ETL',           type: 'process', technology: 'python',  description: 'Consolidation & standardization pipeline' },
        { id: '3', label: 'Waste Site Analysis',     type: 'model',   technology: 'python',  description: 'Primary generation site & inefficiency detection' },
        { id: '4', label: 'Operations Dashboard',    type: 'output',  technology: 'powerbi', description: 'Waste rankings & reduction recommendations' },
      ],
    },
    skills: ['causal-inference', 'time-series-panel-data'],
    certifications: ['CAPM'],
  },

  // ── Supply Forecasting Tool · 2024 ────────────────────────────────────────
  {
    id: 'supply-forecasting-tool',
    title: {
      en: 'Supply Forecasting Tool',
      fr: 'Outil de prévision des approvisionnements',
    },
    company: { en: 'Professional Project', fr: 'Projet professionnel' },
    mediaSrc: inventory_drain,
    year: 2024,
    projectType: 'professional',
    industry: 'Manufacturing & Supply Chain',
    laneIds: ['data-engineering', 'data-science', 'business-intelligence'],
    description: {
      en: 'Developed a forecasting tool to track critical substrate and rare earth coating material inventory across multiple SQL databases. The tool projected future supply levels, sent automated alerts before thresholds were breached, and visualized forecasted needs — preventing costly production stoppages from supply shortages.*',
      fr: 'Développement d\'un outil de prévision pour suivre les stocks critiques sur plusieurs bases SQL. L\'outil projetait les niveaux d\'approvisionnement futurs et envoyait des alertes automatiques avant les ruptures de stock.*',
    },
    purpose: {
      en: 'Prevent costly production stoppages caused by critical material shortages by automating supply forecasting across inventory, manufacturing, and sales databases — with proactive alerts when projected stock will fall below thresholds.',
      fr: 'Prévenir les arrêts de production coûteux en automatisant la prévision des approvisionnements avec des alertes proactives lorsque les stocks projetés passent sous les seuils.',
    },
    howToUse: {
      en: 'The tool runs on a scheduled basis, querying SQL databases automatically. Analysts can open the forecast dashboard to view projected inventory levels by material over the planning horizon. Alerts are delivered via email when thresholds are breached.',
      fr: 'L\'outil s\'exécute de manière planifiée en interrogeant automatiquement les bases de données SQL. Les analystes peuvent visualiser les niveaux de stock projetés et recevoir des alertes par email.',
    },
    architecture: {
      overview: {
        en: 'Multiple SQL databases covering inventory, manufacturing consumption, purchase orders, and sales forecasts are queried and joined. A forecasting model projects future supply, an alert engine flags shortages, and a dashboard visualizes the outlook.',
        fr: 'Plusieurs bases de données SQL couvrant les stocks, la consommation de fabrication, les commandes et les prévisions de ventes sont interrogées et jointes.',
      },
      nodes: [
        { id: '1', label: 'SQL Databases',      type: 'storage', technology: 'mysql',   description: 'Inventory, manufacturing, orders & sales data' },
        { id: '2', label: 'Data Integration',   type: 'process', technology: 'python',  description: 'Cross-database join & cleansing layer' },
        { id: '3', label: 'Forecasting Model',  type: 'model',   technology: 'python',  description: 'Demand & supply level projection' },
        { id: '4', label: 'Alert Engine',       type: 'service', technology: 'python',  description: 'Automated email alerts on threshold breaches' },
        { id: '5', label: 'Forecast Dashboard', type: 'output',  technology: 'powerbi', description: 'Visual inventory outlook by material' },
      ],
    },
    skills: ['time-series-panel-data', 'regularised-regression-lasso-ridge'],
    certifications: [],
  },

  // ── Demand & Inventory Balancing · 2024 ───────────────────────────────────
  {
    id: 'demand-inventory-balancing',
    title: {
      en: 'Demand and Inventory Balancing Model',
      fr: 'Modèle d\'équilibrage demande et stocks',
    },
    company: { en: 'Professional Project', fr: 'Projet professionnel' },
    mediaSrc: demand_supply,
    year: 2024,
    projectType: 'professional',
    industry: 'Retail & Consumer Goods',
    laneIds: ['data-science', 'data-analytics', 'data-engineering'],
    description: {
      en: 'Built an inventory minimization model using POS sales data and live inventory levels to reduce holding costs for predictable consumer goods (razors, toothbrushes, coffee machines). Reallocated freed inventory space to higher-volatility, higher-margin items — increasing annual revenue.*',
      fr: 'Développement d\'un modèle de minimisation des stocks à partir des données de vente POS pour réduire les coûts de détention et réallouer la capacité vers des articles à forte marge.*',
    },
    purpose: {
      en: 'Reduce excess inventory holding costs for predictable consumer goods while freeing warehouse capacity for higher-volatility, higher-margin products — increasing annual revenue through smarter inventory allocation.',
      fr: 'Réduire les coûts de détention des stocks pour les produits prévisibles tout en libérant de la capacité pour les produits à plus forte marge, augmentant ainsi les revenus annuels.',
    },
    howToUse: {
      en: 'Feed current POS sales data and inventory levels into the model. The optimizer outputs a recommended inventory allocation by SKU and warehouse location, along with the projected savings from reallocation.',
      fr: 'Saisissez les données de vente POS actuelles et les niveaux de stock dans le modèle. L\'optimiseur produit une allocation recommandée par SKU et emplacement d\'entrepôt.',
    },
    architecture: {
      overview: {
        en: 'POS sales data and live inventory levels are ingested and joined. A demand forecasting model projects future sales, and an inventory optimization model determines the minimum stock levels needed.',
        fr: 'Les données de vente POS et les niveaux de stock actuels sont ingérés et joints. Un modèle de prévision projette les ventes futures et un modèle d\'optimisation détermine les niveaux de stock minimaux.',
      },
      nodes: [
        { id: '1', label: 'POS Sales Data',      type: 'input',  technology: 'mysql',  description: 'Point-of-sale transaction records by SKU' },
        { id: '2', label: 'Inventory Levels',    type: 'input',  technology: 'mysql',  description: 'Current stock on hand by location' },
        { id: '3', label: 'Demand Forecast',     type: 'model',  technology: 'python', description: 'SKU-level sales projection model' },
        { id: '4', label: 'Inventory Optimizer', type: 'model',  technology: 'gurobi', description: 'Minimum-stock optimization algorithm' },
        { id: '5', label: 'Allocation Plan',     type: 'output', technology: 'excel',  description: 'Recommended stock levels & reallocation map' },
      ],
    },
    skills: ['regularised-regression-lasso-ridge', 'time-series-panel-data'],
    certifications: [],
  },

  // ── Self BI Finance Enablement · Coveo · 2024 ─────────────────────────────
  {
    id: 'self-bi-finance-enablement',
    title: {
      en: 'Self-Serve BI Finance Enablement',
      fr: 'Déploiement BI libre-service – Finance',
    },
    company: { en: 'Professional Project · Coveo', fr: 'Projet professionnel · Coveo' },
    mediaSrc: workshop,
    year: 2024,
    projectType: 'professional',
    industry: 'Technology',
    laneIds: ['business-intelligence', 'data-engineering', 'project-management'],
    description: {
      en: 'Led a 6-month engagement as Scrum Master and Project Lead to pilot a Power BI transition and establish a self-serve BI strategy for Coveo\'s marketing organization. Designed and implemented intuitive, scalable dashboards fit for non-technical marketing users, and collaborated with data engineering to build the underlying BI architecture. Delivered a validated pilot and a repeatable self-serve framework.',
      fr: 'Direction d\'un engagement de 6 mois en tant que Scrum Master et Chef de projet pour piloter une transition Power BI et établir une stratégie BI libre-service pour l\'organisation marketing de Coveo.',
    },
    purpose: {
      en: 'Establish a self-serve business intelligence capability for Coveo\'s marketing organization — reducing dependency on engineering for data access, enabling real-time reporting, and providing a scalable BI architecture that positions the team to operate independently.',
      fr: 'Établir une capacité BI libre-service pour l\'organisation marketing de Coveo, réduisant la dépendance envers l\'ingénierie pour l\'accès aux données et permettant des rapports en temps réel.',
    },
    howToUse: {
      en: 'Marketing team members access pre-built Power BI dashboards within the self-serve environment using defined data design standards. Non-technical users can slice and filter real-time marketing data independently, without requiring engineering support for routine reporting needs.',
      fr: 'Les membres de l\'équipe marketing accèdent aux tableaux de bord Power BI pré-construits dans l\'environnement libre-service. Les utilisateurs non techniques peuvent filtrer les données marketing en temps réel sans support ingénierie.',
    },
    architecture: {
      overview: {
        en: 'Marketing data sources are modelled into a standardized data layer. Power BI dashboards are built on top, following defined design standards. The self-serve environment enables non-technical users to explore data independently.',
        fr: 'Les sources de données marketing sont modélisées dans une couche de données standardisée. Les tableaux de bord Power BI sont construits par-dessus, suivant des normes de conception définies.',
      },
      nodes: [
        { id: '1', label: 'Marketing Data',     type: 'input',   technology: 'mysql',   description: 'CRM, campaign & web analytics data sources' },
        { id: '2', label: 'Data Architecture',  type: 'process', technology: 'python',  description: 'Data modelling & design standards layer' },
        { id: '3', label: 'Power BI Pilot',     type: 'service', technology: 'powerbi', description: 'Dashboard development & validation' },
        { id: '4', label: 'Self-Serve Dashboards', type: 'output', technology: 'powerbi', description: 'Real-time reporting for non-technical users' },
      ],
    },
    skills: ['time-series-panel-data'],
    certifications: ['Power BI', 'PSMI'],
  },

  // ── Beverage Change Point & Outlier Detection · 2024 ──────────────────────
  {
    id: 'beverage-change-point-detection',
    title: {
      en: 'Beverage Change Point & Outlier Detection',
      fr: 'Détection de points de changement et valeurs aberrantes – Boissons',
    },
    company: { en: 'Professional Project · Molson Coors', fr: 'Projet professionnel · Molson Coors' },
    mediaSrc: demand_supply,
    year: 2024,
    projectType: 'professional',
    industry: 'Food & Beverage',
    laneIds: ['data-science', 'data-analytics', 'project-management'],
    description: {
      en: 'Led the scoping and delivery of a statistical detection system for identifying outliers and periods of instability within Molson Coors\' operational data, managing a team of 2 over a sub-3-month engagement. Translated complex analytical requirements into a production-ready detection model, enabling more accurate identification of change points and outliers — saving the team time and resource in ongoing data quality monitoring.',
      fr: 'Direction de la conception et livraison d\'un système de détection statistique pour identifier les valeurs aberrantes et les périodes d\'instabilité dans les données opérationnelles de Molson Coors sur moins de 3 mois.',
    },
    purpose: {
      en: 'Give Molson Coors\' data team a robust, production-ready tool to automatically detect anomalous data points and structural shifts in operational data — reducing manual review time and enabling faster identification of process disruptions or data quality issues.',
      fr: 'Fournir à l\'équipe de données de Molson Coors un outil robuste pour détecter automatiquement les anomalies et les ruptures structurelles dans les données opérationnelles, réduisant le temps de révision manuelle.',
    },
    howToUse: {
      en: 'Load operational time-series data into the detection model. The system automatically identifies periods of instability, flags outliers against configurable thresholds, and marks structural change points — producing a report highlighting anomalous periods and recommended review zones.',
      fr: 'Chargez les données de séries temporelles opérationnelles dans le modèle de détection. Le système identifie automatiquement les périodes d\'instabilité, signale les valeurs aberrantes et marque les points de changement structurels.',
    },
    architecture: {
      overview: {
        en: 'Operational time-series data is loaded and pre-processed. A statistical detection model identifies change points and outliers, and outputs a structured report for the data quality team.',
        fr: 'Les données de séries temporelles opérationnelles sont chargées et prétraitées. Un modèle de détection statistique identifie les points de changement et les valeurs aberrantes.',
      },
      nodes: [
        { id: '1', label: 'Operational Data',      type: 'input',   technology: 'mysql',  description: 'Time-series operational data from Molson Coors systems' },
        { id: '2', label: 'Pre-processing',         type: 'process', technology: 'python', description: 'Data cleansing & normalization' },
        { id: '3', label: 'Detection Model',        type: 'model',   technology: 'python', description: 'Statistical change point & outlier detection' },
        { id: '4', label: 'Anomaly Report',         type: 'output',  technology: 'powerbi', description: 'Flagged periods, outliers & recommended review zones' },
      ],
    },
    skills: ['time-series-panel-data', 'causal-inference', 'cross-validation-hyperparameter-tuning'],
    certifications: ['CAPM'],
  },

  // ── Stadium Visualization Product · 2025 ──────────────────────────────────
  {
    id: 'stadium-visualization-product',
    title: {
      en: 'Stadium Visualization Product',
      fr: 'Produit de visualisation de stade',
    },
    company: { en: 'Professional Project · Optimal Ticketing', fr: 'Projet professionnel · Optimal Ticketing' },
    mediaSrc: movie,
    year: 2025,
    projectType: 'professional',
    industry: 'Technology & Entertainment',
    laneIds: ['business-intelligence', 'data-analytics', 'project-management'],
    description: {
      en: 'Led the scoping, development, and launch of an interactive stadium visualization product for a ticket resale company, managing a team of 2 within a $150K budget over 3–6 months. Defined product requirements in close collaboration with the client, managed stakeholder alignment across product, engineering, and client teams, and successfully launched on time and within financial targets.',
      fr: 'Direction de la conception, du développement et du lancement d\'un produit de visualisation de stade interactif pour une entreprise de revente de billets, avec un budget de 150K$ sur 3 à 6 mois.',
    },
    purpose: {
      en: 'Provide ticket resale operators with an interactive stadium visualization interface — enabling buyers to explore seat locations, pricing tiers, and availability across venue sections — improving purchase confidence and supporting the full resale workflow.',
      fr: 'Fournir aux opérateurs de revente de billets une interface de visualisation de stade interactive permettant aux acheteurs d\'explorer les sièges, les niveaux de prix et la disponibilité à travers les sections du lieu.',
    },
    howToUse: {
      en: 'Users interact with the stadium visualization interface to explore seat availability, pricing tiers, and historical sales data across different venue sections. The product integrates with the ticketing platform to support the end-to-end resale workflow from seat selection to checkout.',
      fr: 'Les utilisateurs interagissent avec l\'interface de visualisation pour explorer la disponibilité des sièges, les niveaux de prix et les données de ventes historiques à travers les différentes sections du lieu.',
    },
    architecture: {
      overview: {
        en: 'Seat inventory, pricing, and sales data are queried from the ticketing database and processed into a visualization layer. The front-end product renders an interactive stadium map that supports the full resale workflow.',
        fr: 'Les données d\'inventaire de sièges, de prix et de ventes sont interrogées depuis la base de données de billetterie et traitées dans une couche de visualisation.',
      },
      nodes: [
        { id: '1', label: 'Ticketing Database', type: 'storage', technology: 'mysql',  description: 'Seat inventory, pricing & sales data' },
        { id: '2', label: 'Data Layer',         type: 'process', technology: 'python', description: 'Seat availability & pricing aggregation' },
        { id: '3', label: 'Visualization Engine', type: 'model', technology: 'react',  description: 'Interactive stadium map & section rendering' },
        { id: '4', label: 'Stadium UI Product', type: 'output',  technology: 'react',  description: 'End-user ticket resale interface' },
      ],
    },
    skills: ['time-series-panel-data'],
    certifications: ['PSMI', 'CAPM'],
  },

  // ── FX Rates · 2026 ──────────────────────────────────────────────────────────
  {
    id: 'fx-rates',
    title: {
      en: 'FX Rates – Currency Converter & Strength Index',
      fr: 'Taux de change – Convertisseur et indice de force des devises',
    },
    company: { en: 'Personal Project', fr: 'Projet personnel' },
    mediaSrc: accrual_forecast,
    year: 2026,
    projectType: 'personal',
    industry: 'Finance & Technology',
    laneIds: ['data-analytics', 'business-intelligence'],
    description: {
      en: 'An interactive currency conversion tool that lets you convert most major currencies and measure how strong a currency is relative to others. Built to replace existing tools that are slow, cluttered, and lacking context — delivering a fast and informative experience.',
      fr: 'Un outil interactif de conversion de devises permettant de convertir la plupart des grandes devises et de mesurer leur force relative. Conçu pour remplacer les outils existants lents et peu informatifs.',
    },
    purpose: {
      en: 'Provide a fast, clean alternative to the cluttered and slow FX tools available online — enabling users to not only convert currencies but understand currency strength and context at a glance.',
      fr: 'Offrir une alternative rapide et claire aux outils de change en ligne encombrés, permettant aux utilisateurs de convertir des devises et de comprendre leur force relative en un coup d\'œil.',
    },
    howToUse: {
      en: 'Select a base currency and target currency to see the live exchange rate and conversion. Use the strength index view to compare how a currency is performing relative to a basket of others.',
      fr: 'Sélectionnez une devise de base et une devise cible pour voir le taux de change en direct. Utilisez la vue de l\'indice de force pour comparer les performances d\'une devise par rapport à un panier d\'autres.',
    },
    architecture: {
      overview: {
        en: 'Live exchange rate data is fetched and stored in Google Sheets via Apps Script. The data powers a React-based web app hosted on GitHub Pages, providing clean conversion and currency strength views.',
        fr: 'Les données de taux de change en direct sont récupérées et stockées dans Google Sheets via Apps Script. Ces données alimentent une application web React hébergée sur GitHub Pages.',
      },
      nodes: [
        { id: '1', label: 'Exchange Rate Feed', type: 'input',   technology: 'github', description: 'Live FX rate data source' },
        { id: '2', label: 'Google Sheets',      type: 'storage', technology: 'excel',  description: 'Data storage & Apps Script processing' },
        { id: '3', label: 'GitHub Pages',        type: 'service', technology: 'github', description: 'Hosting and deployment pipeline' },
        { id: '4', label: 'Web App',             type: 'output',  technology: 'react',  description: 'Interactive currency converter & strength index' },
      ],
    },
    skills: [],
    certifications: [],
    linkUrl: 'https://emery-dittmer.github.io/FXRates/en',
    linkText: { en: 'Try it here', fr: 'Essayez-le ici' },
  },

  // ── Transit Catchment · 2026 ──────────────────────────────────────────────
  {
    id: 'transit-catchment',
    title: {
      en: 'Transit Catchment – Area Explorer for House Hunting',
      fr: 'Zone de desserte transit – Explorateur de quartier pour la recherche immobilière',
    },
    company: { en: 'Personal Project', fr: 'Projet personnel' },
    mediaSrc: network,
    year: 2026,
    projectType: 'personal',
    industry: 'Technology & Urban Planning',
    laneIds: ['data-analytics', 'data-science'],
    description: {
      en: 'An interactive tool that maps what is accessible around any address via public transit (buses and metros), designed to help with house hunting. Enter an address and explore nearby transit routes, stops, and catchment areas. More features including noise levels, flood zones, year of construction, walkability scores, and other neighbourhood calculations coming soon.',
      fr: 'Un outil interactif cartographiant ce qui est accessible depuis une adresse via les transports en commun (bus et métros), conçu pour la recherche immobilière. Prochainement : niveaux de bruit, zones inondables, score de marchabilité et plus.',
    },
    purpose: {
      en: 'Help prospective home buyers quickly assess transit accessibility and neighbourhood context for any address — filling a gap where existing tools are too complex, fragmented, or fail to present catchment data in a useful way.',
      fr: 'Aider les acheteurs potentiels à évaluer rapidement l\'accessibilité aux transports en commun et le contexte de quartier pour n\'importe quelle adresse, là où les outils existants sont trop complexes ou fragmentés.',
    },
    howToUse: {
      en: 'Enter a home address to generate a transit catchment map. The tool renders nearby bus and metro routes, stop locations, and accessibility zones using interactive Mapbox layers. Upcoming features will overlay noise zones, flood risk, walkability, and building age data.',
      fr: 'Saisissez une adresse pour générer une carte de desserte transit. L\'outil affiche les lignes et arrêts de bus et de métro sur des couches Mapbox interactives. Les fonctionnalités à venir incluront les zones de bruit, risques d\'inondation et scores de marchabilité.',
    },
    architecture: {
      overview: {
        en: 'A user-provided address is geocoded and used to query transit stop and route data. Mapbox renders an interactive catchment map, with additional neighbourhood data layers planned for future releases.',
        fr: 'L\'adresse fournie est géocodée pour interroger les données d\'arrêts et de lignes de transport en commun. Mapbox affiche une carte de desserte interactive.',
      },
      nodes: [
        { id: '1', label: 'Address Input',    type: 'input',   technology: 'react', description: 'User-entered home address' },
        { id: '2', label: 'Geocoding API',    type: 'service', technology: 'esri',  description: 'Address-to-coordinate resolution' },
        { id: '3', label: 'Transit Data',     type: 'storage', technology: 'mysql', description: 'GTFS bus & metro route and stop data' },
        { id: '4', label: 'Mapbox Renderer',  type: 'service', technology: 'react', description: 'Interactive catchment map layers' },
        { id: '5', label: 'Catchment Map',    type: 'output',  technology: 'react', description: 'Visual transit accessibility explorer' },
      ],
    },
    skills: [],
    certifications: [],
    linkUrl: 'https://emery-dittmer.github.io/TransitReach/en',
    linkText: { en: 'Try it here', fr: 'Essayez-le ici' },
  },

  // ── Qlik → Power BI & Databricks Migration · 2025 ─────────────────────────
  {
    id: 'qlik-powerbi-databricks-migration',
    title: {
      en: 'Qlik to Power BI & Databricks Infrastructure Migration',
      fr: 'Migration Qlik vers Power BI & infrastructure Databricks',
    },
    company: { en: 'Professional Project · Apotex Pharmaceuticals', fr: 'Projet professionnel · Apotex Pharmaceuticals' },
    mediaSrc: reversal_finder,
    year: 2025,
    projectType: 'professional',
    industry: 'Pharmaceuticals',
    laneIds: ['data-engineering', 'business-intelligence', 'project-management'],
    description: {
      en: 'Led two concurrent data infrastructure modernization programs at Apotex Pharmaceuticals. Project 1: End-to-end migration of 80 Qlik BI dashboards to Microsoft Power BI, directing a cross-functional team of 5 over 12+ months — achieving $1M in annual cost savings. Project 2: Full migration of the organization\'s data infrastructure to Databricks, delivering $1M in additional annual operational savings and a modernized, scalable data platform.',
      fr: 'Direction de deux programmes de modernisation d\'infrastructure de données chez Apotex Pharmaceuticals : migration de 80 tableaux de bord Qlik vers Power BI (1M$ d\'économies annuelles) et migration complète de l\'infrastructure vers Databricks (1M$ d\'économies supplémentaires).',
    },
    purpose: {
      en: 'Modernize Apotex\'s entire BI and data infrastructure — eliminating Qlik licensing costs, migrating 80 dashboards to a scalable Power BI environment, and transitioning the full data platform to Databricks — delivering $2M in combined annual savings and positioning the organization for long-term data scalability.',
      fr: 'Moderniser l\'ensemble de l\'infrastructure BI et de données d\'Apotex, en éliminant les coûts de licence Qlik, en migrant 80 tableaux de bord vers Power BI et en transitionnant la plateforme de données vers Databricks, pour 2M$ d\'économies annuelles combinées.',
    },
    howToUse: {
      en: 'Business users access migrated Power BI dashboards through the standard reporting portal, with validated parity to the original Qlik reports. The Databricks platform serves as the underlying data layer, enabling faster query performance and simplified management for BI and analytics consumers downstream.',
      fr: 'Les utilisateurs accèdent aux tableaux de bord Power BI migrés via le portail de rapports standard. La plateforme Databricks sert de couche de données sous-jacente, permettant des performances de requêtes améliorées.',
    },
    architecture: {
      overview: {
        en: 'Legacy Qlik dashboards and data sources are inventoried and migrated in phases to Power BI, with data integrity validation at each stage. In parallel, the full data infrastructure is transitioned to Databricks, with phased rollout to minimize disruption to downstream consumers.',
        fr: 'Les tableaux de bord Qlik existants et les sources de données sont inventoriés et migrés par phases vers Power BI, avec validation de l\'intégrité des données à chaque étape. En parallèle, l\'infrastructure de données est transférée vers Databricks.',
      },
      nodes: [
        { id: '1', label: 'Legacy Systems',       type: 'input',   technology: 'mysql',   description: 'Qlik dashboards & legacy data infrastructure' },
        { id: '2', label: 'Migration & Validation', type: 'process', technology: 'python', description: 'Data integrity checks & phased dashboard migration' },
        { id: '3', label: 'Databricks Platform',  type: 'service', technology: 'python',  description: 'Modernized scalable data infrastructure' },
        { id: '4', label: 'Power BI Environment', type: 'output',  technology: 'powerbi', description: '80 migrated dashboards — $1M annual savings' },
      ],
    },
    skills: ['time-series-panel-data'],
    certifications: ['Power BI', 'Databricks Associate', 'PSMI', 'CAPM'],
  },
]
