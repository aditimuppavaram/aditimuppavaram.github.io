/* ==========================================================================
   All of the site's words live in this one file.
   Edit here and every section, case study and the resume page update.
   ========================================================================== */

export const site = {
  name: 'Aditi Anand Muppavaram',
  shortName: 'Aditi Muppavaram',
  first: 'Aditi',
  monogram: 'AM',
  role: 'Business & Data Analyst',
  headline: ['Business &', 'Data Analyst'],
  /** Her intro under the hero title. It appears word by word, each word fading from faint to clear. */
  intro:
    "Hi, I'm Aditi, a business and data analyst. For the past three years, I've worked on CMS health IT programs, turning pain points into clear requirements and data into dashboards teams rely on.",
  location: 'Richmond, VA',
  email: 'aditimuppavaram@yahoo.com',
  linkedin: 'https://www.linkedin.com/in/aditi-muppavaram',
  linkedinLabel: 'linkedin.com/in/aditi-muppavaram',
  openTo: 'Open to BA · DA · Product roles',

  /**
   * Hero: her full-body cut-out (a picture with a see-through background, in /public)
   * and the chat bubble that pops up beside her head. Empty bubble = no bubble.
   */
  hero: {
    image: 'aditi-hero.webp',
    bubble: "Hi, I'm Aditi.",
  },

  /** Photo for the ID card (a portrait crop works best). Empty = initials. */
  photo: 'aditi-portrait.webp',

  /** The PDF in /public that every "Résumé" button downloads. Empty hides the buttons. */
  resumePdf: 'Aditi_Anand_Muppavaram_Resume.pdf',
}

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const

export const about = {
  hello: 'Aditi.',
  lead: 'Business and Data Analyst with 3+ years on CMS federal health IT programs. I turn operational pain points into clear requirements, then write the SQL behind the dashboards, reports and automated workflows teams rely on.',
  more: 'I work across requirements, backlogs, SQL, data models, dashboards and UAT.',
  facts: [
    { k: 'Based in', v: 'Richmond, VA' },
    { k: 'Role', v: 'Product Analyst · CMS MEARIS' },
    { k: 'Experience', v: '3+ years · federal health IT' },
    { k: 'Studied', v: 'M.S., George Mason University' },
    { k: 'Focus', v: 'SQL · Requirements · Dashboards' },
  ],
  quote: 'From the requirement to the report.',
  card: {
    title: 'Analyst ID',
    sub: 'Portfolio · 2026',
    idNo: 'AAM-0723',
    dept: 'Health IT',
    since: '2023',
  },
}

/* ---------------------------------------------------------------- skills -- */

export type FamilyId = 'lang' | 'db' | 'bi' | 'ml' | 'prod' | 'ops'

/** Ordered dark to light. */
export const families: { id: FamilyId; label: string }[] = [
  { id: 'lang', label: 'Languages' },
  { id: 'db', label: 'Databases' },
  { id: 'bi', label: 'Analytics & BI' },
  { id: 'ml', label: 'Data & ML' },
  { id: 'prod', label: 'Product & Analysis' },
  { id: 'ops', label: 'Delivery & Tools' },
]

export type Element = {
  sym: string
  name: string
  family: FamilyId
  note: string
  n: number
}

const rawElements: Omit<Element, 'n'>[] = [
  // Languages
  { sym: 'Sq', name: 'SQL', family: 'lang', note: 'Writes, tunes and maintains queries on large Medicare Advantage and Part D datasets.' },
  { sym: 'Pl', name: 'PL/SQL', family: 'lang', note: 'Stored procedures and functions that run daily data operations as automated workflows.' },
  { sym: 'Py', name: 'Python', family: 'lang', note: 'pandas and NumPy for cleaning healthcare data and building predictive models.' },
  { sym: 'R', name: 'R', family: 'lang', note: 'Statistical analysis and visualization in graduate coursework.' },
  // Databases
  { sym: 'My', name: 'MySQL', family: 'db', note: 'Relational schemas and queries for analytics and reporting.' },
  { sym: 'Pg', name: 'PostgreSQL', family: 'db', note: 'Query writing and data modeling.' },
  { sym: 'Or', name: 'Oracle', family: 'db', note: 'PL/SQL procedures and functions behind backend logic.' },
  { sym: 'Mg', name: 'MongoDB', family: 'db', note: 'Document data for application datasets.' },
  { sym: 'Dy', name: 'DynamoDB', family: 'db', note: 'Managed data storage and retrieval on AWS for Job Ring.' },
  // Analytics & BI
  { sym: 'Tb', name: 'Tableau', family: 'bi', note: 'Production analytics that surfaced hiring patterns at Job Ring.' },
  { sym: 'Pb', name: 'Power BI', family: 'bi', note: 'KPI dashboards and operational reporting.' },
  { sym: 'Ex', name: 'Excel', family: 'bi', note: 'Quick analysis and stakeholder-ready reports.' },
  { sym: 'Kp', name: 'KPI Dashboards', family: 'bi', note: 'Financial Monitoring dashboard for CMS ARTS: 60% better data visualization.' },
  { sym: 'Pd', name: 'pandas', family: 'bi', note: 'Cleaning and preprocessing data from multiple upstream sources.' },
  { sym: 'Np', name: 'NumPy', family: 'bi', note: 'Numerical work for statistical and ML analysis.' },
  { sym: 'Ab', name: 'A/B Testing', family: 'bi', note: 'Measured the impact of API updates at MakeSense.' },
  // Data & ML
  { sym: 'Et', name: 'ETL', family: 'ml', note: 'ETL pipeline design for databases and warehouses.' },
  { sym: 'Dw', name: 'Warehousing', family: 'ml', note: 'Supported data warehouse design at MakeSense.' },
  { sym: 'Dm', name: 'Data Modeling', family: 'ml', note: 'Data-design requirements for extending models in a long-running legacy system.' },
  { sym: 'Dp', name: 'Pipelines', family: 'ml', note: 'Pipelines that feed dashboards, tracking tools and automated workflows.' },
  { sym: 'Dq', name: 'Data Quality', family: 'ml', note: 'Validation work that improved data quality and consistency 25%.' },
  { sym: 'Lr', name: 'Logistic Reg.', family: 'ml', note: 'Classification models for prediction problems.' },
  { sym: 'Dt', name: 'Decision Trees', family: 'ml', note: 'Interpretable models for classification.' },
  { sym: 'Rf', name: 'Random Forest', family: 'ml', note: 'Ensemble models for predictive analytics.' },
  // Product & Analysis
  { sym: 'Br', name: 'BRDs', family: 'prod', note: 'Business requirements documents for CMS ARTS, kept in Confluence as self-service reference.' },
  { sym: 'Fs', name: 'Functional Specs', family: 'prod', note: 'Specifications that turn agreed scope into buildable detail.' },
  { sym: 'Us', name: 'User Stories', family: 'prod', note: 'Stories for CMS MEARIS that cut sprint rework and clarification cycles.' },
  { sym: 'Ac', name: 'Acceptance Criteria', family: 'prod', note: 'Clear pass/fail criteria that UAT is planned against.' },
  { sym: 'Wf', name: 'Wireframes', family: 'prod', note: 'Turn operational pain points into product requirements people can see.' },
  { sym: 'Rm', name: 'Roadmaps', family: 'prod', note: 'Roadmap planning with technical and product stakeholders across CMS.' },
  { sym: 'Bl', name: 'Backlog', family: 'prod', note: 'A backlog where every feature traces to program goals and release commitments.' },
  { sym: 'Ga', name: 'Gap Analysis', family: 'prod', note: 'System gap assessments that shaped solution designs (+20% project success rate).' },
  { sym: 'Sm', name: 'Stakeholders', family: 'prod', note: 'Partnering with 5+ CMS business units to define and prioritize features.' },
  // Delivery & Tools
  { sym: 'Ji', name: 'Jira', family: 'ops', note: 'Ticketing, workflows and defect tracking to resolution.' },
  { sym: 'Cf', name: 'Confluence', family: 'ops', note: 'BRDs, specs and process maps as self-service documentation.' },
  { sym: 'Sc', name: 'Scrum', family: 'ops', note: 'Sprint planning and backlog refinement.' },
  { sym: 'Sf', name: 'SAFe', family: 'ops', note: 'PI planning across teams on CMS MEARIS.' },
  { sym: 'Ua', name: 'UAT', family: 'ops', note: 'Manual and regression UAT against acceptance criteria before release.' },
  { sym: 'Se', name: 'Selenium', family: 'ops', note: 'Test automation used with QA to set KPIs and benchmarks.' },
  { sym: 'Vs', name: 'Visio', family: 'ops', note: 'Process maps for workflow analysis and redesign.' },
]

/** Numbered in reading order across an 8-column table. */
export const elements: Element[] = rawElements.map((el, i) => ({ ...el, n: i + 1 }))

/* -------------------------------------------------------------- projects -- */

export type VisualKind = 'pipeline' | 'dashboard' | 'reports' | 'model' | 'automation' | 'roc' | 'schema'

export type Project = {
  slug: string
  title: string
  accent: string
  eyebrow: string
  role: string
  org: string
  period: string
  summary: string
  context: string
  highlights: string[]
  did: string[]
  outcomes: string[]
  metrics: { value: string; label: string }[]
  tools: string[]
  visual: VisualKind
}

export const projects: Project[] = [
  {
    slug: 'cms-mearis',
    title: 'CMS MEARIS',
    accent: 'intake & review',
    eyebrow: 'Product Analyst · Tria Federal · 2024 – now',
    role: 'Product Analyst',
    org: 'Tria Federal for CMS',
    period: '10/2024 – Present',
    summary:
      "CMS's intake and review platform for Medicare payment and coding applications. I define the requirements, run the backlog and test every release.",
    context:
      'MEARIS is where CMS takes in and reviews applications for Medicare payment and coding changes, such as NTAP, MS-DRG and ICD-10-PCS requests. I work with technical and product stakeholders across 5+ CMS business units, so every feature has to trace back to program goals and release commitments.',
    highlights: [
      'Requirements across 5+ CMS business units',
      'User stories, acceptance criteria, wireframes',
      'PI planning, sprint planning, refinement',
      'UAT and regression before each release',
    ],
    did: [
      'Partner with technical and product stakeholders across 5+ CMS business units to define requirements, prioritize features and shape the product roadmap.',
      'Maintain a backlog in which every feature traces to program goals and release commitments.',
      'Write user stories, acceptance criteria and wireframes that turn operational pain points into product requirements.',
      'Run roadmap planning and SAFe/Scrum ceremonies: PI planning, sprint planning and backlog refinement.',
      'Simplify intake and review workflows with UX/UI changes based on user feedback.',
      'Plan and execute manual and regression UAT against acceptance criteria, and support go-live and cutover.',
    ],
    outcomes: [
      'Less sprint rework and fewer clarification cycles',
      'Better on-time delivery and sprint predictability',
      'Higher usability and task-completion rates in intake and review',
    ],
    metrics: [{ value: '5+', label: 'CMS business units partnered' }],
    tools: ['Jira', 'Confluence', 'SAFe', 'Scrum', 'Wireframes', 'UAT'],
    visual: 'pipeline',
  },
  {
    slug: 'financial-monitoring-dashboard',
    title: 'Financial Monitoring',
    accent: 'dashboard for ARTS',
    eyebrow: 'Business Analyst · CMS ARTS · 2023 – 24',
    role: 'Business Analyst',
    org: 'Tria Federal for CMS',
    period: '07/2023 – 09/2024',
    summary:
      'ARTS tracks contractor proposals, cost reports, deliverables and workload for CMS. I analyzed the financial data and designed one self-service view of contractor spend.',
    context:
      'ARTS is the Analysis, Reporting and Tracking System CMS uses for contractor proposals, cost reports, deliverables and workload. Program leads needed a single, self-service view of contractor spend to make decisions.',
    highlights: [
      'Requirements workshops with CMS stakeholders',
      'BRDs, specs and process maps in Confluence',
      'Gap analysis that shaped solution designs',
      'Test plans that cut the defect rate 18%',
    ],
    did: [
      'Ran requirements workshops with CMS stakeholders to align on scope and onboard new functions and features.',
      'Documented BRDs, functional specifications and process maps in Confluence as standardized, self-service reference material.',
      'Analyzed financial data to design and deliver the Financial Monitoring dashboard.',
      'Assessed system gaps and shaped solution designs against business goals.',
      'Executed test plans and supported project planning, tracking and status reporting.',
    ],
    outcomes: ['One self-service view of contractor spend for program leads'],
    metrics: [
      { value: '60%', label: 'better data visualization' },
      { value: '20%', label: 'higher project success rate' },
      { value: '18%', label: 'lower defect rate' },
    ],
    tools: ['Financial analysis', 'BRDs', 'Confluence', 'Visio', 'Test plans'],
    visual: 'dashboard',
  },
  {
    slug: 'hpms-kpi-reporting',
    title: 'HPMS Reporting',
    accent: 'for Medicare plans',
    eyebrow: 'Data Analyst · CMS HPMS · 2023 – 24',
    role: 'Associate Data Analyst',
    org: 'Tria Federal for CMS',
    period: '07/2023 – 09/2024',
    summary:
      'HPMS collects Medicare Advantage and Part D data for compliance and reporting. I wrote and tuned the SQL and Python behind 50+ standardized KPI reports.',
    context:
      'The Health Plan Management System is how CMS collects Medicare Advantage and Part D data for compliance and reporting. It is a long-running legacy system, so data models change carefully and queries have to move with them.',
    highlights: [
      '50+ standardized analytical reports',
      'SQL and Python on large datasets',
      'Stored procedures unit-tested before release',
      'Data-model extensions in a legacy system',
    ],
    did: [
      'Wrote, optimized and maintained SQL and Python queries across large Medicare Advantage and Part D datasets.',
      'Unit-tested stored procedures and functions before production to protect data continuity and accuracy.',
      'Delivered 50+ standardized analytical reports and visualizations tracking program KPIs for CMS stakeholders.',
      'Collected, cleaned and preprocessed healthcare data from multiple upstream sources.',
      'Defined data-design requirements for model extensions and supported query migration as models changed.',
    ],
    outcomes: ['Cross-team process improvements that cut data processing time 40%'],
    metrics: [
      { value: '50+', label: 'standardized KPI reports' },
      { value: '40%', label: 'less data processing time' },
    ],
    tools: ['SQL', 'Python', 'PL/SQL', 'Stored procedures', 'Data modeling'],
    visual: 'reports',
  },
  {
    slug: 'candidate-stability-model',
    title: 'Candidate Stability',
    accent: 'predictive model',
    eyebrow: 'Data Analyst · Job Ring · 2023 – 24',
    role: 'Associate Data Analyst',
    org: 'Job Ring (employment portal)',
    period: '07/2023 – 09/2024',
    summary:
      'Job Ring is an employment portal. I analyzed production data to find hiring patterns, then built predictive models for candidate stability.',
    context:
      'Job Ring is an employment portal with production analytics, predictive modeling and data operations. I used its production data to understand hiring patterns and predict which candidates were likely to stay.',
    highlights: [
      'Hiring patterns from production data',
      'Python, SQL and Tableau analysis',
      'KPIs and benchmarks defined with QA',
      'Data-backed product improvements',
    ],
    did: [
      'Analyzed production data in Python, SQL and Tableau to surface hiring patterns.',
      'Built AI/ML-based predictive models for candidate stability at 85% accuracy.',
      'Partnered with development and design teams to propose and prioritize product improvements backed by quantitative analysis.',
      'Defined KPIs and benchmarks with QA in Jira and Selenium.',
    ],
    outcomes: ['Hiring time down 30%', 'Data quality and consistency up 25%'],
    metrics: [
      { value: '85%', label: 'model accuracy' },
      { value: '30%', label: 'less hiring time' },
      { value: '25%', label: 'better data quality' },
    ],
    tools: ['Python', 'SQL', 'Tableau', 'Jira', 'Selenium'],
    visual: 'model',
  },
  {
    slug: 'data-ops-automation',
    title: 'Data Ops Automation',
    accent: 'PL/SQL workflows',
    eyebrow: 'Data Analyst · Job Ring · 2023 – 24',
    role: 'Associate Data Analyst',
    org: 'Job Ring (employment portal)',
    period: '07/2023 – 09/2024',
    summary:
      'I led the move from manual daily data operations to reusable PL/SQL procedures that run as automated workflows, on top of an AWS DynamoDB data layer.',
    context:
      "Job Ring's daily data operations involved repetitive manual tasks. Turning them into reusable procedures that run as automated workflows reduced that manual effort.",
    highlights: [
      'Reusable SQL procedures (PL/SQL)',
      'Automated daily workflows',
      'Storage and retrieval on DynamoDB',
      'Users, roles and security patches',
    ],
    did: [
      'Led process automation initiatives for daily data operations using reusable PL/SQL procedures that run as automated workflows.',
      'Managed data storage and retrieval on AWS DynamoDB.',
      'Administered database infrastructure: users, roles and security patches.',
    ],
    outcomes: ['Less manual effort on daily data operations', 'Standardized, repeatable runs'],
    metrics: [],
    tools: ['PL/SQL', 'SQL', 'AWS DynamoDB', 'DB administration'],
    visual: 'automation',
  },
  {
    slug: 'hospital-readmissions',
    title: 'Hospital Readmissions',
    accent: '30-day risk',
    eyebrow: 'Academic · George Mason · Machine learning',
    role: 'Graduate project',
    org: 'George Mason University',
    period: 'M.S. program',
    summary:
      'An ML model on EHR data, demographics, diagnosis codes and admission history that flags patients at high risk of readmission within 30 days.',
    context: 'A graduate project at George Mason University on predicting 30-day hospital readmission risk from electronic health records.',
    highlights: [
      'EHR, demographic and diagnosis features',
      'Admission history as a signal',
      'Accuracy, precision and F1-score',
      'ROC-AUC for model comparison',
    ],
    did: [
      'Built an ML model on EHR data, demographics, diagnosis codes and admission history.',
      'Flagged patients at high risk of readmission within 30 days.',
      'Evaluated the model on accuracy, precision, F1-score and ROC-AUC.',
    ],
    outcomes: ['A model that ranks patients by 30-day readmission risk'],
    metrics: [],
    tools: ['Python', 'pandas', 'Machine learning', 'EHR data'],
    visual: 'roc',
  },
  {
    slug: 'ehr-database',
    title: 'EHR Database',
    accent: 'schema & runbook',
    eyebrow: 'Academic · George Mason · Databases',
    role: 'Graduate project',
    org: 'George Mason University',
    period: 'M.S. program',
    summary:
      'A relational EHR schema with constraints and role-based access, an HL7 interoperability review and a backup and disaster-recovery runbook.',
    context: 'A graduate database project at George Mason University: model a hospital record system that is secure, interoperable and recoverable.',
    highlights: [
      'Demographics, history, treatments, labs',
      'Constraints and role-based access',
      'HL7 interoperability review',
      'Backup and disaster-recovery runbook',
    ],
    did: [
      'Designed a relational EHR schema for demographics, history, treatments and labs.',
      'Added constraints and role-based access control.',
      'Reviewed HL7 interoperability.',
      'Wrote a backup and disaster-recovery runbook.',
    ],
    outcomes: ['A secure, documented schema ready for recovery drills'],
    metrics: [],
    tools: ['SQL', 'Data modeling', 'RBAC', 'HL7'],
    visual: 'schema',
  },
]

/* ------------------------------------------------------- always learning -- */

export const learning = {
  sub: 'Eight courses from my M.S. and B.S. that shape how I analyze, plan and build.',
  items: [
    { title: 'Project Management', from: 'George Mason University · M.S.' },
    { title: 'Risk Management', from: 'George Mason University · M.S.' },
    { title: 'Software Architecture', from: 'George Mason University · M.S.' },
    { title: 'Finance', from: 'George Mason University · M.S.' },
    { title: 'Python, SQL, R & Tableau', from: 'George Mason University · M.S.' },
    { title: 'Biostatistics', from: 'Delaware State University · B.S.' },
    { title: 'Genetics & Molecular Biology', from: 'Delaware State University · B.S.' },
    { title: 'Senior Capstone Research', from: 'Delaware State University · B.S.' },
  ],
}

/* ------------------------------------------------- education & experience -- */

export type Milestone = {
  year: string
  kind: 'Education' | 'Experience'
  title: string
  org: string
  period: string
  badge: string
  current?: boolean
}

export const timeline: Milestone[] = [
  {
    year: '2021',
    kind: 'Education',
    title: 'B.S., Biological Sciences',
    org: 'Delaware State University · Dover, DE',
    period: 'Graduated 05/2021',
    badge: 'Senior capstone research',
  },
  {
    year: '2022',
    kind: 'Experience',
    title: 'Data Analyst Intern',
    org: 'MakeSense Inc. · Texas (remote)',
    period: '01/2022 – 05/2023',
    badge: 'A/B tests · dashboards · ML',
  },
  {
    year: '2023',
    kind: 'Education',
    title: 'M.S., Bioinformatics and Management',
    org: 'George Mason University · Fairfax, VA',
    period: 'Graduated 05/2023',
    badge: 'Python · SQL · R · Tableau',
  },
  {
    year: '2023',
    kind: 'Experience',
    title: 'Business Analyst / Associate Data Analyst',
    org: 'Tria Federal (formerly Softrams)',
    period: '07/2023 – 09/2024',
    badge: 'CMS ARTS · CMS HPMS · Job Ring',
  },
  {
    year: '2024',
    kind: 'Experience',
    title: 'Product Analyst, CMS MEARIS',
    org: 'Tria Federal (formerly Softrams)',
    period: '10/2024 – Present',
    badge: 'Current role',
    current: true,
  },
]

/* Used by the web resume page. */
export type Role = {
  period: string
  current?: boolean
  role: string
  org: string
  where: string
  points: string[]
}

export const experience: Role[] = [
  {
    period: '10/2024 – Present',
    current: true,
    role: 'Product Analyst',
    org: 'Tria Federal (formerly Softrams)',
    where: 'CMS MEARIS · Windsor Mill, MD',
    points: [
      'Define requirements and prioritize features with 5+ CMS business units.',
      'Write user stories, acceptance criteria and wireframes that cut sprint rework.',
      'Run PI planning, sprint planning and refinement; plan and run UAT before every release.',
    ],
  },
  {
    period: '07/2023 – 09/2024',
    role: 'Business Analyst / Associate Data Analyst',
    org: 'Tria Federal (formerly Softrams)',
    where: 'CMS ARTS · CMS HPMS · Job Ring',
    points: [
      'Designed the Financial Monitoring dashboard for CMS ARTS: 60% better data visualization.',
      'Delivered 50+ standardized KPI reports for CMS HPMS and cut data processing time 40%.',
      'Built predictive models at 85% accuracy for Job Ring that reduced hiring time 30%.',
    ],
  },
  {
    period: '01/2022 – 05/2023',
    role: 'Data Analyst Intern',
    org: 'MakeSense Inc.',
    where: 'Texas · Remote',
    points: [
      'Analyzed API performance data and built dashboards for operational metrics.',
      'Designed A/B tests to measure the impact of API updates.',
      'Built predictive models and supported data pipeline design.',
    ],
  },
]

export const education: Role[] = [
  {
    period: '05/2023',
    role: 'M.S., Bioinformatics and Management',
    org: 'George Mason University',
    where: 'Fairfax, VA',
    points: ['Project management, risk management, software architecture and finance; Python, SQL, R and Tableau.'],
  },
  {
    period: '05/2021',
    role: 'B.S., Biological Sciences',
    org: 'Delaware State University',
    where: 'Dover, DE',
    points: ['Biostatistics, genetics, molecular biology, biochemistry and a senior capstone research project.'],
  },
]

/* ---------------------------------------------------------- achievements -- */

export type IconName =
  | 'chart'
  | 'report'
  | 'clock'
  | 'target'
  | 'hourglass'
  | 'shield'
  | 'trophy'
  | 'bug'
  | 'people'

export type Achievement = {
  value: number
  suffix: string
  title: string
  source: string
  detail: string
  icon: IconName
}

export const achievements: Achievement[] = [
  { value: 60, suffix: '%', title: 'Better data visualization', source: 'CMS ARTS', detail: 'Financial Monitoring dashboard for program leads', icon: 'chart' },
  { value: 50, suffix: '+', title: 'Standardized KPI reports', source: 'CMS HPMS', detail: 'Medicare Advantage and Part D reporting', icon: 'report' },
  { value: 40, suffix: '%', title: 'Less data processing time', source: 'CMS HPMS', detail: 'Cross-team process improvements', icon: 'clock' },
  { value: 85, suffix: '%', title: 'Predictive model accuracy', source: 'Job Ring', detail: 'Candidate stability model', icon: 'target' },
  { value: 30, suffix: '%', title: 'Less time to hire', source: 'Job Ring', detail: 'Driven by the stability model', icon: 'hourglass' },
  { value: 25, suffix: '%', title: 'Better data quality', source: 'Job Ring', detail: 'KPIs and benchmarks set with QA', icon: 'shield' },
  { value: 20, suffix: '%', title: 'Higher project success rate', source: 'CMS ARTS', detail: 'Gap analysis shaping solution designs', icon: 'trophy' },
  { value: 18, suffix: '%', title: 'Lower defect rate', source: 'CMS ARTS', detail: 'Test plans executed before release', icon: 'bug' },
  { value: 5, suffix: '+', title: 'CMS business units partnered', source: 'CMS MEARIS', detail: 'Requirements, priorities and roadmap', icon: 'people' },
]
