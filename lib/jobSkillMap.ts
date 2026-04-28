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

  // ── Compass Data ─────────────────────────────────────────────────────────────
  'compass-data': [
    // Project & Programme Management
    { laneId: 'project-management', skillId: 'writing-prioritising-a-product-backlog',   pct: 90 },
    { laneId: 'project-management', skillId: 'building-maintaining-a-project-roadmap',   pct: 85 },
    { laneId: 'project-management', skillId: 'facilitating-cross-team-delivery',          pct: 90 },
    { laneId: 'project-management', skillId: 'scoping-estimating-data-projects',          pct: 85 },
    { laneId: 'project-management', skillId: 'defining-success-criteria-acceptance-tests', pct: 80 },

    // Data Engineering
    { laneId: 'data-engineering',   skillId: 'building-elt-pipelines-dbt',                pct: 85 },
    { laneId: 'data-engineering',   skillId: 'schema-design-data-modelling',               pct: 80 },
    { laneId: 'data-engineering',   skillId: 'writing-scheduling-dags-airflow-prefect',    pct: 70 },
    { laneId: 'data-engineering',   skillId: 'setting-up-a-cloud-repo-github-gitlab',      pct: 75 },

    // Data Science
    { laneId: 'data-science',       skillId: 'time-series-panel-data',                    pct: 80 },
    { laneId: 'data-science',       skillId: 'causal-inference',                           pct: 75 },
    { laneId: 'data-science',       skillId: 'regularised-regression-lasso-ridge',         pct: 70 },

    // ML / AI Engineering
    { laneId: 'ml-ai-engineering',  skillId: 'monitoring-model-drift-in-production',       pct: 80 },
    { laneId: 'ml-ai-engineering',  skillId: 'setting-up-cicd-for-model-deployment',       pct: 70 },

    // Data Governance
    { laneId: 'data-governance',    skillId: 'setting-up-alerting-on-data-freshness',      pct: 80 },
    { laneId: 'data-governance',    skillId: 'documenting-data-lineage-end-to-end',        pct: 75 },
    { laneId: 'data-governance',    skillId: 'running-data-quality-reviews-with-teams',    pct: 70 },

    // Data Analytics
    { laneId: 'data-analytics',     skillId: 'defining-documenting-kpis',                  pct: 90 },
    { laneId: 'data-analytics',     skillId: 'ad-hoc-analysis-rapid-prototyping',          pct: 75 },

    // Business Intelligence
    { laneId: 'business-intelligence', skillId: 'building-self-serve-dashboards-looker-tableau', pct: 70 },
  ],

  // ── Coveo ─────────────────────────────────────────────────────────────────────
  'coveo': [
    // Data Analytics
    { laneId: 'data-analytics',     skillId: 'funnel-cohort-analysis',                    pct: 90 },
    { laneId: 'data-analytics',     skillId: 'ab-test-analysis-significance-testing',     pct: 90 },
    { laneId: 'data-analytics',     skillId: 'defining-documenting-kpis',                  pct: 85 },
    { laneId: 'data-analytics',     skillId: 'building-self-serve-dashboards-looker-tableau', pct: 85 },
    { laneId: 'data-analytics',     skillId: 'writing-complex-sql-ctes-window-functions',  pct: 85 },

    // Data Engineering
    { laneId: 'data-engineering',   skillId: 'building-elt-pipelines-dbt',                pct: 90 },
    { laneId: 'data-engineering',   skillId: 'setting-up-a-cloud-repo-github-gitlab',      pct: 70 },

    // Data Science
    { laneId: 'data-science',       skillId: 'causal-inference',                           pct: 80 },
    { laneId: 'data-science',       skillId: 'differences-in-differences',                 pct: 75 },
    { laneId: 'data-science',       skillId: 'regularised-regression-lasso-ridge',         pct: 70 },
    { laneId: 'data-science',       skillId: 'time-series-panel-data',                    pct: 70 },

    // Business Intelligence
    { laneId: 'business-intelligence', skillId: 'connecting-bi-tools-to-data-warehouses', pct: 85 },
    { laneId: 'business-intelligence', skillId: 'writing-optimised-sql-for-reporting',    pct: 80 },
    { laneId: 'business-intelligence', skillId: 'standardising-metrics-across-teams',     pct: 75 },
    { laneId: 'business-intelligence', skillId: 'building-semantic-metrics-layers',       pct: 70 },

    // ML / AI Engineering
    { laneId: 'ml-ai-engineering',  skillId: 'monitoring-model-drift-in-production',       pct: 75 },
    { laneId: 'ml-ai-engineering',  skillId: 'setting-up-cicd-for-model-deployment',       pct: 65 },

    // Data Governance
    { laneId: 'data-governance',    skillId: 'documenting-data-lineage-end-to-end',        pct: 60 },
  ],

  // ── McGill University ─────────────────────────────────────────────────────────
  'mcgill': [
    // Data Science
    { laneId: 'data-science',       skillId: 'cross-validation-hyperparameter-tuning',    pct: 75 },
    { laneId: 'data-science',       skillId: 'regularised-regression-lasso-ridge',        pct: 70 },
    { laneId: 'data-science',       skillId: 'tree-based-methods-xgboost-random-forest',  pct: 70 },

    // Data Analytics
    { laneId: 'data-analytics',     skillId: 'presenting-findings-to-non-technical-stakeholders', pct: 85 },
    { laneId: 'data-analytics',     skillId: 'ad-hoc-analysis-rapid-prototyping',         pct: 70 },

    // ML / AI Engineering
    { laneId: 'ml-ai-engineering',  skillId: 'monitoring-model-drift-in-production',      pct: 60 },

    // Project Management
    { laneId: 'project-management', skillId: 'scoping-estimating-data-projects',          pct: 65 },
    { laneId: 'project-management', skillId: 'building-maintaining-a-project-roadmap',    pct: 60 },
  ],

  // ── PwC ───────────────────────────────────────────────────────────────────────
  'pwc': [
    // Project & Programme Management
    { laneId: 'project-management', skillId: 'building-maintaining-a-project-roadmap',    pct: 90 },
    { laneId: 'project-management', skillId: 'facilitating-cross-team-delivery',           pct: 90 },
    { laneId: 'project-management', skillId: 'managing-stakeholder-sign-off',              pct: 85 },
    { laneId: 'project-management', skillId: 'writing-prioritising-a-product-backlog',    pct: 85 },
    { laneId: 'project-management', skillId: 'scoping-estimating-data-projects',           pct: 80 },

    // Data Analytics
    { laneId: 'data-analytics',     skillId: 'defining-documenting-kpis',                  pct: 90 },
    { laneId: 'data-analytics',     skillId: 'presenting-findings-to-non-technical-stakeholders', pct: 85 },
    { laneId: 'data-analytics',     skillId: 'root-cause-analysis',                        pct: 80 },
    { laneId: 'data-analytics',     skillId: 'funnel-cohort-analysis',                    pct: 75 },
    { laneId: 'data-analytics',     skillId: 'ad-hoc-analysis-rapid-prototyping',          pct: 80 },

    // Data Governance
    { laneId: 'data-governance',    skillId: 'running-data-quality-reviews-with-teams',   pct: 75 },
    { laneId: 'data-governance',    skillId: 'drafting-data-policy-ownership-rules',       pct: 70 },

    // Data Science
    { laneId: 'data-science',       skillId: 'time-series-panel-data',                    pct: 75 },
    { laneId: 'data-science',       skillId: 'regularised-regression-lasso-ridge',        pct: 70 },
    { laneId: 'data-science',       skillId: 'causal-inference',                           pct: 65 },

    // Business Intelligence
    { laneId: 'business-intelligence', skillId: 'standardising-metrics-across-teams',     pct: 80 },
    { laneId: 'business-intelligence', skillId: 'building-self-serve-dashboards-looker-tableau', pct: 70 },
    { laneId: 'business-intelligence', skillId: 'writing-optimised-sql-for-reporting',    pct: 70 },
  ],

  // ── RBC ───────────────────────────────────────────────────────────────────────
  'rbc': [
    // Data Analytics
    { laneId: 'data-analytics',     skillId: 'defining-documenting-kpis',                  pct: 85 },
    { laneId: 'data-analytics',     skillId: 'presenting-findings-to-non-technical-stakeholders', pct: 75 },
    { laneId: 'data-analytics',     skillId: 'root-cause-analysis',                        pct: 70 },
    { laneId: 'data-analytics',     skillId: 'ad-hoc-analysis-rapid-prototyping',          pct: 70 },

    // Business Intelligence
    { laneId: 'business-intelligence', skillId: 'writing-optimised-sql-for-reporting',    pct: 75 },
    { laneId: 'business-intelligence', skillId: 'standardising-metrics-across-teams',     pct: 70 },
    { laneId: 'business-intelligence', skillId: 'setting-up-automated-report-delivery',   pct: 65 },

    // Data Governance
    { laneId: 'data-governance',    skillId: 'documenting-data-lineage-end-to-end',        pct: 70 },
    { laneId: 'data-governance',    skillId: 'drafting-data-policy-ownership-rules',       pct: 65 },

    // Data Science
    { laneId: 'data-science',       skillId: 'time-series-panel-data',                    pct: 70 },
    { laneId: 'data-science',       skillId: 'causal-inference',                           pct: 60 },

    // Project Management
    { laneId: 'project-management', skillId: 'managing-stakeholder-sign-off',              pct: 65 },
    { laneId: 'project-management', skillId: 'building-maintaining-a-project-roadmap',    pct: 60 },
  ],
}
