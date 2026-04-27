export type LaneId =
  | 'data-science'
  | 'data-engineering'
  | 'data-analytics'
  | 'business-intelligence'
  | 'data-governance'
  | 'ml-ai-engineering'
  | 'project-management'

export type Proficiency = 'strong' | 'weak' | 'beginning' | 'no-skill'

export const proficiencyMeta: Record<
  Proficiency,
  { label: string; color: string; description: string }
> = {
  'strong':    { label: 'Strong',    color: '#4ade80', description: 'Applied independently in production environments.' },
  'weak':      { label: 'Weak',      color: '#fbbf24', description: 'Some hands-on experience; not yet fully production-ready.' },
  'beginning': { label: 'Beginning', color: '#fb923c', description: 'Awareness and limited hands-on experience.' },
  'no-skill':  { label: 'No Skill',  color: '#6b7280', description: 'No current knowledge or experience.' },
}

export type SkillContribution = {
  laneId: LaneId
  percentage: number
}

export type Skill = {
  name: string
  id: string
  proficiency: Proficiency
  description: string
  contributions: SkillContribution[]
}

export type Lane = {
  id: LaneId
  title: string
  color: string
  skills: Skill[]
}

export type CustomState = {
  laneOrder: LaneId[]
  hiddenLanes: LaneId[]
  hiddenSkills: Partial<Record<LaneId, string[]>>
}

export const CUSTOM_STATE_KEY = 'skills-customise-state'

export const defaultCustomState: CustomState = {
  laneOrder: [
    'data-science',
    'data-engineering',
    'data-analytics',
    'business-intelligence',
    'data-governance',
    'ml-ai-engineering',
    'project-management',
  ],
  hiddenLanes: [],
  hiddenSkills: {},
}

export const skillsConfig: { lanes: Lane[] } = {
  lanes: [
    {
      id: 'data-science',
      title: 'Data Science',
      color: '#534AB7',
      skills: [
        {
          name: 'Regularised regression (Lasso, Ridge)',
          id: 'regularised-regression-lasso-ridge',
          proficiency: 'strong',
          description: 'Linear models with L1/L2 penalties to prevent overfitting and enable automatic feature selection.',
          contributions: [
            { laneId: 'data-science', percentage: 90 },
            { laneId: 'ml-ai-engineering', percentage: 30 },
            { laneId: 'data-analytics', percentage: 10 },
          ],
        },
        {
          name: 'Tree-based methods (XGBoost, Random Forest)',
          id: 'tree-based-methods-xgboost-random-forest',
          proficiency: 'strong',
          description: 'Ensemble methods that combine many decision trees for robust classification and regression tasks.',
          contributions: [
            { laneId: 'data-science', percentage: 90 },
            { laneId: 'ml-ai-engineering', percentage: 40 },
            { laneId: 'data-analytics', percentage: 10 },
          ],
        },
        {
          name: 'Cross-validation & hyperparameter tuning',
          id: 'cross-validation-hyperparameter-tuning',
          proficiency: 'strong',
          description: 'Techniques for evaluating model generalisation and systematically optimising model configuration.',
          contributions: [
            { laneId: 'data-science', percentage: 85 },
            { laneId: 'ml-ai-engineering', percentage: 50 },
            { laneId: 'data-analytics', percentage: 10 },
          ],
        },
        {
          name: 'Natural language processing',
          id: 'natural-language-processing',
          proficiency: 'weak',
          description: 'Computational techniques for analysing, understanding, and generating human language from text data.',
          contributions: [
            { laneId: 'data-science', percentage: 70 },
            { laneId: 'ml-ai-engineering', percentage: 80 },
          ],
        },
        {
          name: 'Time series & panel data',
          id: 'time-series-panel-data',
          proficiency: 'strong',
          description: 'Statistical methods for data indexed over time or across multiple entities and time periods simultaneously.',
          contributions: [
            { laneId: 'data-science', percentage: 85 },
            { laneId: 'data-analytics', percentage: 40 },
            { laneId: 'business-intelligence', percentage: 20 },
          ],
        },
        {
          name: 'Differences-in-differences',
          id: 'differences-in-differences',
          proficiency: 'strong',
          description: 'Quasi-experimental method comparing outcome changes between treatment and control groups over time.',
          contributions: [
            { laneId: 'data-science', percentage: 90 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
        {
          name: 'Instrumental variables',
          id: 'instrumental-variables',
          proficiency: 'beginning',
          description: 'Causal estimation technique using external instruments to address endogeneity in observational data.',
          contributions: [
            { laneId: 'data-science', percentage: 95 },
            { laneId: 'data-analytics', percentage: 10 },
          ],
        },
        {
          name: 'Causal inference',
          id: 'causal-inference',
          proficiency: 'strong',
          description: 'Frameworks and methods for establishing cause-and-effect relationships from observational or experimental data.',
          contributions: [
            { laneId: 'data-science', percentage: 90 },
            { laneId: 'data-analytics', percentage: 30 },
            { laneId: 'project-management', percentage: 10 },
          ],
        },
      ],
    },
    {
      id: 'data-engineering',
      title: 'Data Engineering',
      color: '#0F6E56',
      skills: [
        {
          name: 'Setting up a cloud repo (GitHub/GitLab)',
          id: 'setting-up-a-cloud-repo-github-gitlab',
          proficiency: 'strong',
          description: 'Creating and configuring version-controlled repositories in the cloud for collaborative code management.',
          contributions: [
            { laneId: 'data-engineering', percentage: 90 },
            { laneId: 'ml-ai-engineering', percentage: 30 },
            { laneId: 'project-management', percentage: 20 },
          ],
        },
        {
          name: 'Writing & scheduling DAGs (Airflow/Prefect)',
          id: 'writing-scheduling-dags-airflow-prefect',
          proficiency: 'weak',
          description: 'Defining directed acyclic graphs that specify task dependencies and orchestrating their execution on a schedule.',
          contributions: [
            { laneId: 'data-engineering', percentage: 95 },
            { laneId: 'ml-ai-engineering', percentage: 20 },
          ],
        },
        {
          name: 'Building ELT pipelines (dbt)',
          id: 'building-elt-pipelines-dbt',
          proficiency: 'weak',
          description: 'Extract-Load-Transform workflows that ingest raw data into a warehouse and apply transformations in SQL.',
          contributions: [
            { laneId: 'data-engineering', percentage: 90 },
            { laneId: 'data-analytics', percentage: 20 },
            { laneId: 'business-intelligence', percentage: 30 },
          ],
        },
        {
          name: 'Provisioning cloud storage (S3, GCS, ADLS)',
          id: 'provisioning-cloud-storage-s3-gcs-adls',
          proficiency: 'beginning',
          description: 'Setting up scalable object and blob storage services on major cloud platforms for data pipelines.',
          contributions: [
            { laneId: 'data-engineering', percentage: 90 },
            { laneId: 'ml-ai-engineering', percentage: 20 },
          ],
        },
        {
          name: 'Containerising workloads (Docker)',
          id: 'containerising-workloads-docker',
          proficiency: 'beginning',
          description: 'Packaging applications and their dependencies into portable, isolated containers for consistent deployment.',
          contributions: [
            { laneId: 'data-engineering', percentage: 85 },
            { laneId: 'ml-ai-engineering', percentage: 50 },
          ],
        },
        {
          name: 'Schema design & data modelling',
          id: 'schema-design-data-modelling',
          proficiency: 'strong',
          description: 'Defining the structure, relationships, and constraints of data stored in relational or analytical databases.',
          contributions: [
            { laneId: 'data-engineering', percentage: 80 },
            { laneId: 'data-analytics', percentage: 30 },
            { laneId: 'business-intelligence', percentage: 70 },
          ],
        },
        {
          name: 'Stream processing (Kafka, Kinesis)',
          id: 'stream-processing-kafka-kinesis',
          proficiency: 'no-skill',
          description: 'Processing continuous event streams in real time as data arrives, rather than in scheduled batches.',
          contributions: [
            { laneId: 'data-engineering', percentage: 90 },
            { laneId: 'ml-ai-engineering', percentage: 20 },
          ],
        },
        {
          name: 'Infra-as-code (Terraform)',
          id: 'infra-as-code-terraform',
          proficiency: 'no-skill',
          description: 'Defining and provisioning cloud infrastructure through version-controlled declarative configuration files.',
          contributions: [
            { laneId: 'data-engineering', percentage: 90 },
            { laneId: 'ml-ai-engineering', percentage: 20 },
          ],
        },
      ],
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      color: '#185FA5',
      skills: [
        {
          name: 'Writing complex SQL (CTEs, window functions)',
          id: 'writing-complex-sql-ctes-window-functions',
          proficiency: 'strong',
          description: 'Advanced SQL constructs for multi-step transformations and row-level calculations across ordered partitions.',
          contributions: [
            { laneId: 'data-analytics', percentage: 90 },
            { laneId: 'data-engineering', percentage: 40 },
            { laneId: 'business-intelligence', percentage: 80 },
          ],
        },
        {
          name: 'Funnel & cohort analysis',
          id: 'funnel-cohort-analysis',
          proficiency: 'strong',
          description: 'Tracking user progression through defined conversion steps and comparing behaviour across user groups over time.',
          contributions: [
            { laneId: 'data-analytics', percentage: 90 },
            { laneId: 'data-science', percentage: 30 },
          ],
        },
        {
          name: 'A/B test analysis & significance testing',
          id: 'ab-test-analysis-significance-testing',
          proficiency: 'strong',
          description: 'Statistical evaluation of controlled experiments to determine which variant produces a reliably better outcome.',
          contributions: [
            { laneId: 'data-analytics', percentage: 80 },
            { laneId: 'data-science', percentage: 50 },
          ],
        },
        {
          name: 'Building self-serve dashboards (Looker, Tableau)',
          id: 'building-self-serve-dashboards-looker-tableau',
          proficiency: 'strong',
          description: 'Interactive visualisations that allow stakeholders to explore data without requiring analyst involvement.',
          contributions: [
            { laneId: 'data-analytics', percentage: 80 },
            { laneId: 'business-intelligence', percentage: 70 },
          ],
        },
        {
          name: 'Defining & documenting KPIs',
          id: 'defining-documenting-kpis',
          proficiency: 'strong',
          description: 'Establishing, agreeing, and formally documenting the metrics used to measure business performance.',
          contributions: [
            { laneId: 'data-analytics', percentage: 70 },
            { laneId: 'business-intelligence', percentage: 80 },
            { laneId: 'project-management', percentage: 40 },
          ],
        },
        {
          name: 'Root cause analysis',
          id: 'root-cause-analysis',
          proficiency: 'strong',
          description: 'Systematic investigation to identify the underlying cause of a metric change or operational incident.',
          contributions: [
            { laneId: 'data-analytics', percentage: 80 },
            { laneId: 'project-management', percentage: 30 },
          ],
        },
        {
          name: 'Ad hoc analysis & rapid prototyping',
          id: 'ad-hoc-analysis-rapid-prototyping',
          proficiency: 'strong',
          description: 'Quick, exploratory data work to answer immediate business questions without a pre-specified methodology.',
          contributions: [
            { laneId: 'data-analytics', percentage: 90 },
            { laneId: 'data-science', percentage: 30 },
          ],
        },
        {
          name: 'Presenting findings to non-technical stakeholders',
          id: 'presenting-findings-to-non-technical-stakeholders',
          proficiency: 'strong',
          description: 'Communicating data insights and recommendations clearly to audiences without a quantitative background.',
          contributions: [
            { laneId: 'data-analytics', percentage: 70 },
            { laneId: 'project-management', percentage: 60 },
          ],
        },
      ],
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence',
      color: '#3B6D11',
      skills: [
        {
          name: 'Star & snowflake schema design',
          id: 'star-snowflake-schema-design',
          proficiency: 'weak',
          description: 'Dimensional modelling patterns that organise data into fact and dimension tables for fast analytical queries.',
          contributions: [
            { laneId: 'business-intelligence', percentage: 90 },
            { laneId: 'data-engineering', percentage: 40 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
        {
          name: 'Building semantic / metrics layers',
          id: 'building-semantic-metrics-layers',
          proficiency: 'weak',
          description: 'An abstraction layer that translates raw tables into business-friendly, consistently defined metrics and dimensions.',
          contributions: [
            { laneId: 'business-intelligence', percentage: 90 },
            { laneId: 'data-engineering', percentage: 30 },
            { laneId: 'data-analytics', percentage: 30 },
          ],
        },
        {
          name: 'Writing optimised SQL for reporting',
          id: 'writing-optimised-sql-for-reporting',
          proficiency: 'strong',
          description: 'SQL tuned for large-scale analytical workloads — minimising scan cost, leveraging partitioning, and reducing latency.',
          contributions: [
            { laneId: 'business-intelligence', percentage: 85 },
            { laneId: 'data-analytics', percentage: 60 },
          ],
        },
        {
          name: 'Setting up automated report delivery',
          id: 'setting-up-automated-report-delivery',
          proficiency: 'weak',
          description: 'Scheduling and distributing reports or snapshots to stakeholders automatically on a defined cadence.',
          contributions: [
            { laneId: 'business-intelligence', percentage: 80 },
            { laneId: 'project-management', percentage: 20 },
          ],
        },
        {
          name: 'Connecting BI tools to data warehouses',
          id: 'connecting-bi-tools-to-data-warehouses',
          proficiency: 'strong',
          description: 'Configuring live or cached connections between BI platforms and cloud data warehouses like BigQuery or Snowflake.',
          contributions: [
            { laneId: 'business-intelligence', percentage: 90 },
            { laneId: 'data-engineering', percentage: 30 },
          ],
        },
        {
          name: 'Row-level security & access control',
          id: 'row-level-security-access-control',
          proficiency: 'beginning',
          description: 'Restricting which data rows a user can see based on their role or attributes within a BI tool.',
          contributions: [
            { laneId: 'business-intelligence', percentage: 80 },
            { laneId: 'data-governance', percentage: 40 },
          ],
        },
        {
          name: 'Standardising metrics across teams',
          id: 'standardising-metrics-across-teams',
          proficiency: 'strong',
          description: 'Aligning definitions and calculation logic of shared metrics so all teams report from a single source of truth.',
          contributions: [
            { laneId: 'business-intelligence', percentage: 80 },
            { laneId: 'project-management', percentage: 40 },
            { laneId: 'data-analytics', percentage: 30 },
          ],
        },
        {
          name: 'Version-controlling BI assets',
          id: 'version-controlling-bi-assets',
          proficiency: 'weak',
          description: 'Applying git-based workflows to BI code, dashboard definitions, and metric logic for traceability and collaboration.',
          contributions: [
            { laneId: 'business-intelligence', percentage: 70 },
            { laneId: 'data-engineering', percentage: 40 },
          ],
        },
      ],
    },
    {
      id: 'data-governance',
      title: 'Data Governance & Quality',
      color: '#BA7517',
      skills: [
        {
          name: 'Writing data quality checks (Great Expectations)',
          id: 'writing-data-quality-checks-great-expectations',
          proficiency: 'beginning',
          description: 'Automated tests that validate data against expected patterns, value ranges, and formats before it is consumed.',
          contributions: [
            { laneId: 'data-governance', percentage: 90 },
            { laneId: 'data-engineering', percentage: 40 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
        {
          name: 'Building & maintaining a data catalogue',
          id: 'building-maintaining-a-data-catalogue',
          proficiency: 'beginning',
          description: 'A centralised inventory of data assets enriched with metadata, ownership, and lineage for discoverability.',
          contributions: [
            { laneId: 'data-governance', percentage: 90 },
            { laneId: 'data-engineering', percentage: 20 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
        {
          name: 'Documenting data lineage end-to-end',
          id: 'documenting-data-lineage-end-to-end',
          proficiency: 'weak',
          description: 'Tracing exactly how data flows from source systems through all transformations to its final reporting destination.',
          contributions: [
            { laneId: 'data-governance', percentage: 90 },
            { laneId: 'data-engineering', percentage: 30 },
          ],
        },
        {
          name: 'Drafting data policy & ownership rules',
          id: 'drafting-data-policy-ownership-rules',
          proficiency: 'weak',
          description: 'Formal documentation of data responsibilities, acceptable usage policies, and accountability structures.',
          contributions: [
            { laneId: 'data-governance', percentage: 90 },
            { laneId: 'project-management', percentage: 40 },
          ],
        },
        {
          name: 'Implementing GDPR / data retention policies',
          id: 'implementing-gdpr-data-retention-policies',
          proficiency: 'weak',
          description: 'Applying regulatory requirements governing how personal data is stored, accessed, and eventually deleted.',
          contributions: [
            { laneId: 'data-governance', percentage: 90 },
            { laneId: 'project-management', percentage: 30 },
          ],
        },
        {
          name: 'Classifying & tagging sensitive data',
          id: 'classifying-tagging-sensitive-data',
          proficiency: 'beginning',
          description: 'Identifying and labelling data assets by sensitivity level so appropriate access controls can be applied.',
          contributions: [
            { laneId: 'data-governance', percentage: 85 },
            { laneId: 'project-management', percentage: 20 },
          ],
        },
        {
          name: 'Setting up alerting on data freshness',
          id: 'setting-up-alerting-on-data-freshness',
          proficiency: 'weak',
          description: 'Monitoring pipeline outputs to detect and alert when data stops updating within its expected time window.',
          contributions: [
            { laneId: 'data-governance', percentage: 80 },
            { laneId: 'data-engineering', percentage: 50 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
        {
          name: 'Running data quality reviews with teams',
          id: 'running-data-quality-reviews-with-teams',
          proficiency: 'weak',
          description: 'Collaborative sessions to surface, prioritise, and resolve data quality issues across the organisation.',
          contributions: [
            { laneId: 'data-governance', percentage: 85 },
            { laneId: 'project-management', percentage: 30 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
      ],
    },
    {
      id: 'ml-ai-engineering',
      title: 'ML / AI Engineering',
      color: '#993C1D',
      skills: [
        {
          name: 'Packaging models as REST APIs (FastAPI, Flask)',
          id: 'packaging-models-as-rest-apis-fastapi-flask',
          proficiency: 'weak',
          description: 'Wrapping trained models in HTTP endpoints so applications can query predictions in real time.',
          contributions: [
            { laneId: 'ml-ai-engineering', percentage: 90 },
            { laneId: 'data-engineering', percentage: 40 },
          ],
        },
        {
          name: 'Setting up CI/CD for model deployment',
          id: 'setting-up-cicd-for-model-deployment',
          proficiency: 'beginning',
          description: 'Automated pipelines that test, validate, and deploy new model versions to production with minimal manual steps.',
          contributions: [
            { laneId: 'ml-ai-engineering', percentage: 80 },
            { laneId: 'data-engineering', percentage: 60 },
          ],
        },
        {
          name: 'Monitoring model drift in production',
          id: 'monitoring-model-drift-in-production',
          proficiency: 'beginning',
          description: 'Detecting when the distribution of model inputs or outputs shifts in ways that degrade prediction quality.',
          contributions: [
            { laneId: 'ml-ai-engineering', percentage: 90 },
            { laneId: 'data-governance', percentage: 30 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
        {
          name: 'Fine-tuning LLMs (LoRA, RLHF)',
          id: 'fine-tuning-llms-lora-rlhf',
          proficiency: 'beginning',
          description: 'Adapting pre-trained large language models to specific tasks or human preferences using parameter-efficient methods.',
          contributions: [
            { laneId: 'ml-ai-engineering', percentage: 90 },
            { laneId: 'data-science', percentage: 30 },
          ],
        },
        {
          name: 'Building RAG pipelines',
          id: 'building-rag-pipelines',
          proficiency: 'weak',
          description: 'Retrieval-augmented generation systems that combine document search with LLM generation for grounded responses.',
          contributions: [
            { laneId: 'ml-ai-engineering', percentage: 85 },
            { laneId: 'data-science', percentage: 30 },
            { laneId: 'data-engineering', percentage: 20 },
          ],
        },
        {
          name: 'Managing feature stores (Feast, Tecton)',
          id: 'managing-feature-stores-feast-tecton',
          proficiency: 'no-skill',
          description: 'Centralised repositories for storing, serving, and sharing ML features consistently across training and inference.',
          contributions: [
            { laneId: 'ml-ai-engineering', percentage: 80 },
            { laneId: 'data-engineering', percentage: 50 },
            { laneId: 'data-science', percentage: 30 },
          ],
        },
        {
          name: 'Writing model cards & evaluation suites',
          id: 'writing-model-cards-evaluation-suites',
          proficiency: 'beginning',
          description: 'Documenting model capabilities, limitations, and benchmark results to support transparency and responsible use.',
          contributions: [
            { laneId: 'ml-ai-engineering', percentage: 80 },
            { laneId: 'data-governance', percentage: 40 },
            { laneId: 'data-science', percentage: 30 },
          ],
        },
        {
          name: 'Orchestrating training jobs (Kubeflow, SageMaker)',
          id: 'orchestrating-training-jobs-kubeflow-sagemaker',
          proficiency: 'no-skill',
          description: 'Automating large-scale model training workflows on distributed compute infrastructure in the cloud.',
          contributions: [
            { laneId: 'ml-ai-engineering', percentage: 85 },
            { laneId: 'data-engineering', percentage: 50 },
          ],
        },
      ],
    },
    {
      id: 'project-management',
      title: 'Project & Programme Management',
      color: '#5F5E5A',
      skills: [
        {
          name: 'Writing & prioritising a product backlog',
          id: 'writing-prioritising-a-product-backlog',
          proficiency: 'strong',
          description: 'Maintaining an ordered list of work items, each with clear scope and business value, ready for sprint planning.',
          contributions: [
            { laneId: 'project-management', percentage: 90 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
        {
          name: 'Running sprint planning & retrospectives',
          id: 'running-sprint-planning-retrospectives',
          proficiency: 'strong',
          description: 'Agile ceremonies for committing to upcoming work and reflecting on process improvements after each iteration.',
          contributions: [
            { laneId: 'project-management', percentage: 90 },
          ],
        },
        {
          name: 'Building & maintaining a project roadmap',
          id: 'building-maintaining-a-project-roadmap',
          proficiency: 'strong',
          description: 'A high-level plan showing milestones, inter-team dependencies, and the expected delivery timeline.',
          contributions: [
            { laneId: 'project-management', percentage: 90 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
        {
          name: 'Defining success criteria & acceptance tests',
          id: 'defining-success-criteria-acceptance-tests',
          proficiency: 'strong',
          description: 'Setting clear, measurable conditions agreed with stakeholders that determine when a deliverable is complete.',
          contributions: [
            { laneId: 'project-management', percentage: 85 },
            { laneId: 'data-analytics', percentage: 20 },
            { laneId: 'data-governance', percentage: 20 },
          ],
        },
        {
          name: 'Managing stakeholder sign-off',
          id: 'managing-stakeholder-sign-off',
          proficiency: 'strong',
          description: 'Obtaining formal approval from key stakeholders at project milestones to maintain alignment and accountability.',
          contributions: [
            { laneId: 'project-management', percentage: 90 },
            { laneId: 'data-analytics', percentage: 30 },
          ],
        },
        {
          name: 'Producing risk & dependency logs',
          id: 'producing-risk-dependency-logs',
          proficiency: 'weak',
          description: 'Documenting potential blockers and inter-team dependencies that could affect delivery timelines.',
          contributions: [
            { laneId: 'project-management', percentage: 90 },
            { laneId: 'data-governance', percentage: 20 },
          ],
        },
        {
          name: 'Scoping & estimating data projects',
          id: 'scoping-estimating-data-projects',
          proficiency: 'strong',
          description: 'Defining the boundaries, deliverables, and effort required for a data initiative before work begins.',
          contributions: [
            { laneId: 'project-management', percentage: 85 },
            { laneId: 'data-engineering', percentage: 20 },
            { laneId: 'data-science', percentage: 20 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
        {
          name: 'Facilitating cross-team delivery',
          id: 'facilitating-cross-team-delivery',
          proficiency: 'strong',
          description: 'Coordinating work across multiple teams with different priorities to achieve a shared programme objective.',
          contributions: [
            { laneId: 'project-management', percentage: 90 },
            { laneId: 'data-analytics', percentage: 20 },
          ],
        },
      ],
    },
  ],
}
