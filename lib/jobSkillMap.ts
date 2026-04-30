/**
 * Job → Role → Skill mapping
 *
 * For each company, list exactly which skills were practised there and in which
 * functional role context.  `pct` is a 0–100 intensity score — how heavily the
 * skill was used at that job (used to drive edge thickness in the network graph).
 *
 * Skill IDs must match the `id` fields in lib/skillsConfig.ts.
 * Lane IDs must match the LaneId union in lib/skillsConfig.ts:
 *   'data-science' | 'data-engineering' | 'data-analytics' |
 *   'business-intelligence' | 'data-governance' | 'ml-ai-engineering' |
 *   'project-management'
 */

export type JobRoleSkill = {
  laneId:  string   // functional role context
  skillId: string   // specific skill id from skillsConfig
  pct:     number   // usage intensity 0–100
}

export const jobSkillMap: Record<string, JobRoleSkill[]> = {

  // ── Compass Data (Sept 2023 – Present) ───────────────────────────────────────
  // Title: Data Science Analytics Manager
  // Core work: intake & prioritisation of ML/analytics initiatives, MLOps pipelines
  // (Dataiku + Snowflake), predictive forecasting, geospatial analysis (Esri),
  // KPI frameworks, cross-team coordination, backlog management.
  'compass-data': [
    // Project & Programme Management (primary function as Manager)
    { laneId: 'project-management', skillId: 'writing-prioritising-a-product-backlog',      pct: 95 },
    { laneId: 'project-management', skillId: 'facilitating-cross-team-delivery',             pct: 95 },
    { laneId: 'project-management', skillId: 'building-maintaining-a-project-roadmap',       pct: 90 },
    { laneId: 'project-management', skillId: 'scoping-estimating-data-projects',             pct: 90 },
    { laneId: 'project-management', skillId: 'defining-success-criteria-acceptance-tests',   pct: 85 },
    { laneId: 'project-management', skillId: 'managing-stakeholder-sign-off',                pct: 80 },

    // Data Analytics
    { laneId: 'data-analytics', skillId: 'defining-documenting-kpis',                        pct: 95 },
    { laneId: 'data-analytics', skillId: 'presenting-findings-to-non-technical-stakeholders', pct: 85 },
    { laneId: 'data-analytics', skillId: 'ad-hoc-analysis-rapid-prototyping',                pct: 75 },

    // Data Science (predictive forecasting systems, geospatial analysis)
    { laneId: 'data-science', skillId: 'time-series-panel-data',                             pct: 90 },
    { laneId: 'data-science', skillId: 'tree-based-methods-xgboost-random-forest',           pct: 75 },
    { laneId: 'data-science', skillId: 'natural-language-processing',                        pct: 65 },

    // Data Engineering (Dataiku + Snowflake pipelines)
    { laneId: 'data-engineering', skillId: 'building-elt-pipelines-dbt',                    pct: 85 },
    { laneId: 'data-engineering', skillId: 'data-architecture',                             pct: 85 },
    { laneId: 'data-engineering', skillId: 'schema-design-data-modelling',                  pct: 80 },
    { laneId: 'data-engineering', skillId: 'writing-scheduling-dags-airflow-prefect',       pct: 70 },
    { laneId: 'data-engineering', skillId: 'setting-up-a-cloud-repo-github-gitlab',         pct: 70 },

    // ML / AI Engineering (MLOps best practices, observability, traceability)
    { laneId: 'ml-ai-engineering', skillId: 'monitoring-model-drift-in-production',         pct: 90 },
    { laneId: 'ml-ai-engineering', skillId: 'setting-up-cicd-for-model-deployment',         pct: 80 },

    // Data Governance (data quality, lineage, observability)
    { laneId: 'data-governance', skillId: 'setting-up-alerting-on-data-freshness',          pct: 85 },
    { laneId: 'data-governance', skillId: 'documenting-data-lineage-end-to-end',            pct: 80 },
    { laneId: 'data-governance', skillId: 'running-data-quality-reviews-with-teams',        pct: 75 },

    // Business Intelligence
    { laneId: 'business-intelligence', skillId: 'standardising-metrics-across-teams',       pct: 80 },
    { laneId: 'business-intelligence', skillId: 'building-self-serve-dashboards-looker-tableau', pct: 70 },
  ],

  // ── McGill University (Sept 2023 – Present) ───────────────────────────────────
  // Title: Capstone Coach
  // Core work: mentoring data science teams, guiding project design & modelling,
  // technical coaching in Python/R/SQL, evaluating deliverables & presentations.
  'mcgill': [
    // Data Analytics (presenting/communicating is the primary role)
    { laneId: 'data-analytics', skillId: 'presenting-findings-to-non-technical-stakeholders', pct: 95 },
    { laneId: 'data-analytics', skillId: 'ad-hoc-analysis-rapid-prototyping',                pct: 75 },
    { laneId: 'data-analytics', skillId: 'writing-complex-sql-ctes-window-functions',        pct: 65 },

    // Data Science (coaching teams on end-to-end modelling)
    { laneId: 'data-science', skillId: 'cross-validation-hyperparameter-tuning',             pct: 80 },
    { laneId: 'data-science', skillId: 'tree-based-methods-xgboost-random-forest',           pct: 75 },
    { laneId: 'data-science', skillId: 'regularised-regression-lasso-ridge',                 pct: 70 },
    { laneId: 'data-science', skillId: 'natural-language-processing',                        pct: 65 },

    // Project Management (scoping, defining deliverables, evaluating)
    { laneId: 'project-management', skillId: 'defining-success-criteria-acceptance-tests',   pct: 80 },
    { laneId: 'project-management', skillId: 'scoping-estimating-data-projects',             pct: 70 },
    { laneId: 'project-management', skillId: 'building-maintaining-a-project-roadmap',       pct: 60 },
  ],

  // ── Coveo (Nov 2023 – Aug 2024) ───────────────────────────────────────────────
  // Title: Business Intelligence Analyst & Data Scientist
  // Core work: KPI dashboards (Tableau/Power BI/Streamlit), dbt/Snowflake/AWS ETL,
  // A/B testing & uplift modelling, churn prediction, user behaviour modelling.
  'coveo': [
    // Data Analytics (KPI dashboards, funnels, A/B testing — primary function)
    { laneId: 'data-analytics', skillId: 'funnel-cohort-analysis',                           pct: 95 },
    { laneId: 'data-analytics', skillId: 'ab-test-analysis-significance-testing',            pct: 95 },
    { laneId: 'data-analytics', skillId: 'defining-documenting-kpis',                        pct: 85 },
    { laneId: 'data-analytics', skillId: 'building-self-serve-dashboards-looker-tableau',    pct: 85 },
    { laneId: 'data-analytics', skillId: 'writing-complex-sql-ctes-window-functions',        pct: 85 },
    { laneId: 'data-analytics', skillId: 'presenting-findings-to-non-technical-stakeholders', pct: 75 },

    // Data Engineering (dbt + Snowflake + AWS pipelines)
    //{ laneId: 'data-engineering', skillId: 'building-elt-pipelines-dbt',                    pct: 90 },

    // Data Science (churn prediction, uplift modelling, user behaviour)
    { laneId: 'data-science', skillId: 'tree-based-methods-xgboost-random-forest',           pct: 80 },
    { laneId: 'data-science', skillId: 'cross-validation-hyperparameter-tuning',             pct: 75 },
    { laneId: 'data-science', skillId: 'regularised-regression-lasso-ridge',                 pct: 65 },
    { laneId: 'data-science', skillId: 'time-series-panel-data',                             pct: 65 },

    // Business Intelligence (BI stack, semantic layers, metrics standardisation)
    { laneId: 'business-intelligence', skillId: 'connecting-bi-tools-to-data-warehouses',   pct: 90 },
    { laneId: 'business-intelligence', skillId: 'writing-optimised-sql-for-reporting',       pct: 85 },
    { laneId: 'business-intelligence', skillId: 'standardising-metrics-across-teams',        pct: 80 },
    { laneId: 'business-intelligence', skillId: 'building-semantic-metrics-layers',          pct: 75 },

    // Data Governance
    { laneId: 'data-governance', skillId: 'documenting-data-lineage-end-to-end',            pct: 65 },
        
    // Project Management (scoping, defining deliverables, evaluating)
    { laneId: 'project-management', skillId: 'defining-success-criteria-acceptance-tests',   pct: 80 },
    { laneId: 'project-management', skillId: 'scoping-estimating-data-projects',             pct: 70 },
    { laneId: 'project-management', skillId: 'building-maintaining-a-project-roadmap',       pct: 60 },
    { laneId: 'project-management', skillId: 'facilitating-cross-team-delivery',       pct: 60 },

  ],

  // ── PwC (Feb 2021 – Jul 2023) ─────────────────────────────────────────────────
  // Title: Experienced Associate – Automation and Analytics
  // Core work: delivery lead on 30+ digital transformation projects, stakeholder
  // alignment, KPI definition, forecasting & behavioural models, cross-functional
  // coordination, reporting conventions for client platforms.
  'pwc': [
    // Project & Programme Management (delivery lead across 30+ projects)
    { laneId: 'project-management', skillId: 'facilitating-cross-team-delivery',             pct: 95 },
    { laneId: 'project-management', skillId: 'building-maintaining-a-project-roadmap',       pct: 90 },
    { laneId: 'project-management', skillId: 'managing-stakeholder-sign-off',                pct: 90 },
    { laneId: 'project-management', skillId: 'writing-prioritising-a-product-backlog',       pct: 85 },
    { laneId: 'project-management', skillId: 'scoping-estimating-data-projects',             pct: 85 },
    { laneId: 'project-management', skillId: 'producing-risk-dependency-logs',               pct: 75 },

    // Data Analytics
    { laneId: 'data-analytics', skillId: 'defining-documenting-kpis',                        pct: 90 },
    { laneId: 'data-analytics', skillId: 'presenting-findings-to-non-technical-stakeholders', pct: 90 },
    { laneId: 'data-analytics', skillId: 'root-cause-analysis',                              pct: 80 },
    { laneId: 'data-analytics', skillId: 'ad-hoc-analysis-rapid-prototyping',                pct: 80 },
    { laneId: 'data-analytics', skillId: 'funnel-cohort-analysis',                           pct: 70 },

    // Business Intelligence (reporting conventions, metrics standardisation)
    { laneId: 'business-intelligence', skillId: 'standardising-metrics-across-teams',        pct: 85 },
    { laneId: 'business-intelligence', skillId: 'building-self-serve-dashboards-looker-tableau', pct: 75 },
    { laneId: 'business-intelligence', skillId: 'writing-optimised-sql-for-reporting',       pct: 70 },
    { laneId: 'business-intelligence', skillId: 'setting-up-automated-report-delivery',      pct: 65 },

    // Data Governance
    { laneId: 'data-governance', skillId: 'running-data-quality-reviews-with-teams',         pct: 75 },
    { laneId: 'data-governance', skillId: 'drafting-data-policy-ownership-rules',            pct: 65 },
  ],

  // ── RBC (Mar 2020 – Feb 2021) ─────────────────────────────────────────────────
  // Title: Strategic Planning Analyst – System Modernization
  // Core work: KPI consolidation & executive reporting, IS modernisation,
  // donor behaviour analysis, geospatial & temporal data analysis, audit support.
  'rbc': [
    // Data Analytics (KPI consolidation, executive reporting, donor analysis)
    { laneId: 'data-analytics', skillId: 'defining-documenting-kpis',                        pct: 85 },
    { laneId: 'data-analytics', skillId: 'root-cause-analysis',                              pct: 75 },
    { laneId: 'data-analytics', skillId: 'presenting-findings-to-non-technical-stakeholders', pct: 75 },
    { laneId: 'data-analytics', skillId: 'ad-hoc-analysis-rapid-prototyping',                pct: 70 },

    // Business Intelligence (executive reporting, IS modernisation)
    { laneId: 'business-intelligence', skillId: 'writing-optimised-sql-for-reporting',       pct: 80 },
    { laneId: 'business-intelligence', skillId: 'setting-up-automated-report-delivery',      pct: 75 },
    { laneId: 'business-intelligence', skillId: 'standardising-metrics-across-teams',        pct: 70 },

    // Data Science (temporal & geospatial donor analysis, spatial clustering)
    { laneId: 'data-science', skillId: 'time-series-panel-data',                             pct: 65 },

    // Data Governance (documentation practices, compliance/audit support)
    { laneId: 'data-governance', skillId: 'documenting-data-lineage-end-to-end',            pct: 65 },
    { laneId: 'data-governance', skillId: 'drafting-data-policy-ownership-rules',            pct: 60 }
  ],
}
