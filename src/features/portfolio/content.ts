import { siteConfig } from "@/config/site";
import type { InstitutionLogoId } from "@/features/portfolio/institution-logos";

export interface TimelineItem {
  readonly year: string;
  readonly title: string;
  readonly body: string;
  /** Set where an entry belongs to an institution with an official mark. */
  readonly logo?: InstitutionLogoId;
}

export interface SemesterCourse {
  readonly name: string;
  readonly link?: string;
}

export interface SemesterNode {
  readonly semester: string;
  readonly emphasis: string;
  readonly courses: readonly SemesterCourse[];
  readonly outcome: string;
}

export interface TrainingCard {
  readonly title: string;
  readonly provider: string;
  readonly period: string;
  readonly connectsTo: string;
  readonly whyItMatters: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
  readonly kind: "tech" | "concept";
}

export interface ContactLink {
  readonly label: string;
  readonly href: string;
  readonly description: string;
}

export interface WorkflowPractice {
  readonly title: string;
  readonly body: string;
}

export interface ToolkitGroup {
  readonly title: string;
  readonly note: string;
  readonly tools: readonly string[];
}

export const heroHeadline = "I build the data infrastructure behind real decisions.";

export const heroSubheadline =
  "Data warehousing, ETL, and BI reporting for production systems, plus applied ML research, heading into a MS in Data Science or Computer Science.";

export const heroProofPoints = ["SQL Server", "Power BI", "Python", "SSIS"] as const;

export const backgroundLead =
  "Coursework and two analyst roles have run in parallel for most of my degree, and each one kept feeding the other - a database class turned into production SQL at work, and debugging a real ETL pipeline made the theory in class easier to place. This page is both tracks on one timeline.";

export const backgroundSpineLead =
  "A filled node means that stretch produced something that shipped or was submitted. An empty one means it didn't, and I'd rather show the gap than invent a link.";

export const stackLead =
  "No aspirational tools. Everything here appears in something I've shipped or am currently running - most of it in production dashboards and pipelines at UTA right now.";

export const aboutOpeningParagraph =
  "I moved from Nepal to study Computer Science at Weber State, and ended up splitting my time between two real data teams before I'd even finished the degree - one at a university analytics office, one at a transit agency running an active fleet. I wanted to find out whether the SQL and statistics I was learning held up against systems other people actually depend on.";

export const footerClosingStatement =
  "This isn't a finished portfolio. I'd rather ship one dashboard people actually use than describe ten hypothetical ones, and there's more coming as the internship and the research continue.";

export const coreStory = [
  "I started as a student analyst at Weber State's Office of Student Success Analytics, writing Oracle SQL against real institutional data - enrollment, cohort retention, course fill rates - for people who used the numbers to make decisions the same week.",
  "That led to a Data Analysis and Research internship at the Utah Transit Authority, where I moved into building an actual data warehouse: star schemas, SSIS pipelines, and Power BI dashboards tracking fleet availability for an agency that runs buses every day.",
  "Alongside both of those, I started working with a Weber State CS professor on applied ML research - fingerprinting the toolchains used to obfuscate malware. I don't do data work because SQL is interesting on its own. I do it because a warehouse that returns the wrong number, or a model that can't say how confident it is, costs someone a bad decision.",
] as const;

export const education = {
  bachelor: {
    degree: "B.S. Computer Science, Data Analytics minor",
    college: "Weber State University",
    detail: "Expected December 2026, GPA 3.88",
  },
} as const;

export const currentStatusSummary = `${education.bachelor.degree} - ${education.bachelor.college}. ${education.bachelor.detail}.`;

export const academicPerformanceSummary =
  "3.88 GPA. Recipient of the Bob and Karen Woodbury Scholarship (2026-2027), the Louis F. Moench Scholarship (2023-2027), the Barbara L. Tanner Community Engaged Learning Scholarship (2024-2025), and the EAST Dean's Scholarship (renewed every semester since Aug 2025).";

export interface ResumeRole {
  readonly title: string;
  readonly organization: string;
  readonly period: string;
  readonly location: string;
  readonly bullets: readonly string[];
}

export interface ResumeProject {
  readonly name: string;
  readonly slug: string;
  readonly period: string;
  readonly bullets: readonly string[];
}

export interface ResumeEducationEntry {
  readonly qualification: string;
  readonly institution: string;
  readonly period: string;
  readonly result: string;
}

export const resumeTitle = "Data Analyst - data warehousing, BI reporting, applied ML";

export const resumeSummary =
  "Final-year Computer Science student (Data Analytics minor) at Weber State University, splitting time between a Data Analysis and Research internship at the Utah Transit Authority and a student analyst role at Weber State's Office of Student Success Analytics. Work spans SQL Server data warehousing, SSIS ETL, Power BI/DAX reporting, Python automation, and applied ML research - heading into an MS in Data Science or Computer Science in Fall 2027.";

export const resumeRoles: readonly ResumeRole[] = [
  {
    title: "Data Analysis and Research Intern",
    organization: "Utah Transit Authority",
    period: "2026 - present",
    location: "Utah",
    bullets: [
      "Designed and built out a star-schema data warehouse for fleet availability reporting, with SSIS handling ETL and Power BI/DAX powering the operational dashboard.",
      "Wrote and debugged core staging stored procedures (fact and maintenance-duration staging) against production and staging databases, resolving fan-out bugs from dimension joins and building gaps-and-islands deduplication logic.",
      "Built a Python/Playwright automation pipeline that logs into vendor dashboards, pulls electric-bus charging and EV charger session data on a schedule, and loads it into the warehouse, extending coverage from the diesel fleet to the electric fleet.",
      "Migrated legacy JDE-to-EAM reporting (open work orders, transmission forecasting, asset location discrepancies) to SQL Server, writing the first SSRS report and an independent data dictionary for the new system.",
    ],
  },
  {
    title: "Student Data Analyst",
    organization: "Weber State University",
    period: "May 2026 - present",
    location: "Ogden, Utah",
    bullets: [
      "Convert ambiguous stakeholder reporting needs into structured SQL queries, Tableau dashboards, and Argos reports, both ad-hoc and recurring, to improve visibility into institutional metrics and cut manual reporting effort.",
      "Optimize existing SQL queries and dashboards to reduce run time and improve reporting performance.",
      "Support institutional analytics projects from requirements gathering and data modeling to dashboard development, analysis, and final presentation.",
    ],
  },
  {
    title: "EAST Dean's Office Student Admin",
    organization: "Weber State University",
    period: "Aug 2025 - present",
    location: "Ogden, Utah",
    bullets: [
      "Manage departmental website content via HTML/CSS, ensuring high usability and information accuracy for the College of Applied Science & Technology.",
      "Maintain complex budget records and financial data for multiple departments using Excel and digital systems to ensure fiscal accuracy.",
      "Coordinate departmental events and faculty operations, managing data-driven logistics for large-scale execution.",
    ],
  },
  {
    title: "Food Sustainability Coordinator",
    organization: "Weber State University",
    period: "Jun 2025 - Aug 2026",
    location: "Salt Lake City Metropolitan Area",
    bullets: [
      "Led food recovery initiatives, managing the logistics for 500+ pounds of monthly recovery and community distribution.",
      "Analyzed operational data to identify inefficiencies and track key sustainability metrics for stakeholder reporting and process optimization.",
      "Designed and implemented a campus-wide composting program to divert organic materials from landfills through data-backed waste reduction strategies.",
    ],
  },
  {
    title: "Computer Lab Assistant",
    organization: "Weber State University",
    period: "Jan 2023 - May 2025",
    location: "Ogden, Utah",
    bullets: [
      "Provided daily technical support to students and staff, including assistance with computer logins, software issues, printing, and basic hardware troubleshooting.",
      "Assisted users working on Windows and macOS systems, guiding individuals with varying levels of technical proficiency in a clear and patient manner.",
      "Monitored computer lab equipment, workstations, and printers, and promptly reported any technical issues to the IT team.",
      "Ensured smooth day-to-day lab operations by enforcing university IT policies and lab rules.",
    ],
  },
] as const;

export const resumeProjects: readonly ResumeProject[] = [
  {
    name: "UTA Fleet Availability Data Warehouse",
    slug: "uta-fleet-availability-warehouse",
    period: "2026 - present",
    bullets: [
      "Star-schema warehouse (SQL Server) feeding a multi-page Power BI fleet availability dashboard, with SSIS handling extract-transform-load from source systems.",
      "DAX measures built with SUMX/VAR for row context, ADDCOLUMNS/SUMMARIZE for per-vehicle aggregation, and ALL() for slicer overrides - each validated against a raw SQL baseline before shipping.",
      "Resolved a live ETL gap where a scheduled job had never actually been wired to run the staging procedure feeding the dashboard, and fixed a metadata mismatch after widening a comments column.",
    ],
  },
  {
    name: "EV Fleet Automation (Viriciti + ABB)",
    slug: "ev-fleet-automation",
    period: "2026",
    bullets: [
      "Python/Playwright automation that logs into the Viriciti dashboard, downloads monthly electric-bus energy data, and unpivots it from wide vehicle-column format into long format for the warehouse.",
      "Extended the same pattern to ABB's EV charger platform (SSO login, session-history export, CSV parsing) to bring charger-side session data into the same pipeline.",
      "Scheduled via Windows Task Scheduler, with SendGrid handling report delivery after an organizational restriction ruled out SMTP.",
    ],
  },
  {
    name: "ML-Powered Trading Bot with Sentiment Analysis",
    slug: "ml-trading-bot",
    period: "2026",
    bullets: [
      "Co-built an algorithmic trading bot using FinBERT to score financial news sentiment, trading only on high-confidence (>99.9%) signals with automated bracket-order risk management.",
      "Backtested at a 15% return, 62% win rate, and 1.45 Sharpe ratio over a 2025-2026 period on historical data.",
    ],
  },
  {
    name: "Dillard's Illinois Retail Performance Analysis",
    slug: "dillards-illinois-analysis",
    period: "2024 - 2025",
    bullets: [
      "Group BI project analyzing Dillard's profitability across three Illinois stores (2014-2016) in Power BI, ending in a strategic recommendation rather than just a dashboard.",
      "Projected $1.65M-$1.7M in annual profitability improvement from a recommendation to close underperforming leased departments and evaluate one store for closure.",
    ],
  },
  {
    name: "Movie Recommendation Engine",
    slug: "movie-recommendation-engine",
    period: "2024",
    bullets: [
      "Recommendation engine over 9,000+ movie titles combining KNN with NLP-based content similarity.",
    ],
  },
  {
    name: "Airline Operations & Delay Analytics",
    slug: "airline-delay-analytics",
    period: "2024",
    bullets: [
      "Power BI analytics pipeline examining flight delay patterns across routes and carriers.",
    ],
  },
];

export const resumeResearch: readonly ResumeProject[] = [
  {
    name: "ObfuScope",
    slug: "obfuscope",
    period: "Jul 2026 - present",
    bullets: [
      "Research Assistant on a Weber State CS project fingerprinting the specific obfuscation toolchain used on a malware sample, rather than just detecting that obfuscation occurred.",
      "Reviewed and tested the project's code for completeness and reproducibility, then ran the experimental workflow on the Open Science Pool's HTCondor/DAGMan infrastructure.",
      "Revised the paper for writing quality, technical accuracy, and logical flow, and conducted a literature review to strengthen the related-work and comparison sections.",
      "Project results: best model (Extra-Trees) reached 0.993 macro-F1 across grouped cross-validation, with 0.988 AUROC on an open-set novelty protocol. Submitted to ACM Transactions on Privacy and Security.",
    ],
  },
];

export const resumeEducation: readonly ResumeEducationEntry[] = [
  {
    qualification: education.bachelor.degree,
    institution: education.bachelor.college,
    period: "2023 - 2026",
    result:
      "GPA 3.88 - Bob and Karen Woodbury Scholarship (2026-2027), Louis F. Moench Scholarship (2023-2027), Barbara L. Tanner Community Engaged Learning Scholarship (2024-2025), EAST Dean's Scholarship (every semester since Aug 2025)",
  },
];

export const resumeDownloadNote =
  "A real A4 PDF, generated from this page's own content when you ask for it - so it is always current, and never a stale export sitting in a folder.";

export const timeline: readonly TimelineItem[] = [
  {
    year: "2023",
    title: "Moved from Nepal to Weber State University",
    body: "Started a B.S. in Computer Science with a Data Analytics minor.",
  },
  {
    year: "2023-2027",
    title: "Louis F. Moench Scholarship",
    body: "Renewable scholarship held across all four years of the degree.",
  },
  {
    year: "Jan 2023",
    title: "Computer Lab Assistant, Weber State University",
    body: "Technical support for students and staff across Windows and macOS labs, hardware troubleshooting, and day-to-day lab operations.",
  },
  {
    year: "2024",
    title: "Personal data projects",
    body: "Built a movie recommendation engine (KNN + NLP over 9,000+ titles) and an airline operations analytics pipeline in Power BI, outside of coursework.",
  },
  {
    year: "Apr 2025",
    title: "Barbara L. Tanner Community Engaged Learning Scholarship",
    body: "Awarded for the 2024-2025 academic year.",
  },
  {
    year: "Jun 2025",
    title: "Food Sustainability Coordinator, Weber State University",
    body: "Led food recovery logistics for 500+ pounds of monthly recovery and community distribution, and designed a campus-wide composting program. Role ran through August 2026.",
  },
  {
    year: "Aug 2025",
    title: "EAST Dean's Office Student Admin, Weber State University",
    body: "Managing departmental website content, budget records, and event and faculty operations logistics for the College of Applied Science & Technology.",
  },
  {
    year: "Aug 2025",
    title: "EAST Dean's Scholarship",
    body: "Awarded for dedication and hard work in the College of Applied Science & Technology. Renewed every semester since.",
  },
  {
    year: "May 2026",
    title: "Student Data Analyst, Weber State University",
    body: "Turning stakeholder reporting needs into SQL queries, Tableau dashboards, and Argos reports, and optimizing existing queries and dashboards for performance.",
  },
  {
    year: "2026",
    title: "Data Analysis and Research Intern, Utah Transit Authority",
    body: "Moved into production data warehousing: SQL Server, SSIS ETL, and Power BI/DAX reporting on live fleet data, plus a Python automation pipeline pulling EV charging data into the warehouse.",
  },
  {
    year: "Jul 2026",
    title: "Started ObfuScope research with a Weber State CS professor",
    body: "Applied ML research fingerprinting the obfuscation toolchain behind a malware sample. Submitted to ACM Transactions on Privacy and Security.",
  },
  {
    year: "Jun 2026",
    title: "Bob and Karen Woodbury Scholarship",
    body: "Awarded for the 2026-2027 academic year.",
  },
  {
    year: "Dec 2026",
    title: "Graduating, Then a masters degree",
    body: "Finishing the degree with a 3.88 GPA while reaching out to professors for research-assistantship fit ahead of an MS in Data Science or Computer Science starting Fall 2027, and exploring staying on at UTA via OPT in the meantime.",
  },
] as const;

export const futureGoalsLead =
  "I became a data analyst before I set out to - OSSA needed someone who could write SQL, and that turned into UTA needing someone who could build a warehouse. Both roles taught me things research alone doesn't: what a query actually costs to run, how a pipeline breaks once it's in production, and what a stakeholder does with a number once it's correct. I don't think of that as a detour from data science and data engineering - it's the stepping stone into them. I already have the industry experience. What I want next is the research experience to go with it, on the way to data science, data engineering, and eventually the kind of research a PhD makes room for.";

export const futureGoals: readonly TimelineItem[] = [
  {
    year: "Fall 2027",
    title: "MS in Data Science",
    body: "Making impactful research progress in big data, artificial intelligence, and robotics, beyond what the coursework alone covers.",
  },
  {
    year: "During the MS",
    title: "Building toward a PhD",
    body: "Using the master's to establish the research track record a PhD program - and a research-scientist career - actually requires.",
  },
  {
    year: "Long-term",
    title: "PhD",
    body: "Continuing into a PhD to go deeper on the research direction the MS opens up, rather than stopping at a terminal master's.",
  },
  {
    year: "Career",
    title: "Data engineer, data scientist, analyst, governance, or research scientist",
    body: "Not narrowing to one title yet - the throughline is combining the industry experience already in hand with the research experience still being built.",
  },
] as const;

export const curriculum: readonly SemesterNode[] = [
  {
    semester: "Foundations",
    emphasis: "Programming and systems fundamentals",
    courses: [{ name: "CS 2350 - Data Structures & Algorithms" }, { name: "Discrete Math" }],
    outcome: "The base everything later - from the warehouse work to ObfuScope - builds on.",
  },
  {
    semester: "Software engineering sequence",
    emphasis: "Building and shipping real software",
    courses: [
      { name: "Software Engineering I" },
      { name: "Software Engineering II" },
      { name: "Windows Application Development" },
    ],
    outcome: "Understanding how a real application - and a real webpage - actually gets built.",
  },
  {
    semester: "Theory",
    emphasis: "Formal languages and computation",
    courses: [
      {
        name: "CS 4110 - Formal Languages and Algorithms",
        link: "Regular languages, CFGs, PDAs, Turing machines, decidability",
      },
    ],
    outcome: "The theoretical grounding behind the ML and research work.",
  },
  {
    semester: "Data track",
    emphasis: "Data analytics minor coursework",
    courses: [
      { name: "Advanced SQL", link: "Direct input to the OSSA and UTA warehouse work" },
      { name: "Data Analytics minor coursework" },
    ],
    outcome: "Turned classroom SQL into the queries running at OSSA and UTA today.",
  },
  {
    semester: "Capstone",
    emphasis: "Senior project",
    courses: [{ name: "CS 4890 - Senior Project" }],
    outcome: "Progress reports on the Yard Management data warehouse and EV bus automation work.",
  },
] as const;

export const trainings: readonly TrainingCard[] = [
  {
    title: "Data Science Essentials with Python",
    provider: "Cisco Networking Academy",
    period: "May 2026",
    connectsTo: "Python, data analysis fundamentals",
    whyItMatters:
      "Reinforced the Python and data analysis fundamentals behind the personal projects and the UTA/OSSA work.",
  },
  {
    title: "GenAI Powered Data Analytics",
    provider: "Tata Group (Forage job simulation)",
    period: "Feb 2026",
    connectsTo: "Applied AI in a data analytics workflow",
    whyItMatters:
      "Hands-on exposure to using generative AI tools inside a data analytics workflow, rather than as a separate tool.",
  },
  {
    title: "Data Analytics",
    provider: "Deloitte (Forage job simulation)",
    period: "Feb 2026",
    connectsTo: "Power BI, data analytics workflow",
    whyItMatters:
      "Practical data analytics workflow using Power BI, aligned with the BI reporting work now done at UTA and Weber State.",
  },
  {
    title: "Quantitative Research",
    provider: "J.P. Morgan (Forage job simulation)",
    period: "Feb 2026",
    connectsTo: "Statistics, research methodology",
    whyItMatters:
      "Exposure to quantitative research methodology and statistics applied to real-world data, alongside the ObfuScope research.",
  },
];

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "What I build with",
    kind: "tech",
    items: [
      "SQL Server / T-SQL",
      "Oracle SQL",
      "SSIS (ETL)",
      "Power BI (DAX, Power Query)",
      "Python (pandas, NumPy, scikit-learn)",
      "SSRS",
      "Argos / Banner",
      "Git",
    ],
  },
  {
    title: "Also use",
    kind: "tech",
    items: ["Tableau", "KNIME", "PostgreSQL", "MySQL", "MongoDB", "Microsoft Fabric", "Azure"],
  },
  {
    title: "Concepts",
    kind: "concept",
    items: [
      "Star schema / dimensional modeling",
      "ETL pipeline design",
      "Applied machine learning",
      "Data validation and reconciliation",
      "BI reporting",
    ],
  },
] as const;

export const shippedStackTitle = "What I build with";

export const aiWorkflowLead =
  "I use AI tools as part of how I work now, the way a good editor and version control are - for a first pass, a second opinion, or the mechanical parts of a task. Whether a query is correct, a measure means what I claim, or a model's result is trustworthy stays my call, checked against the raw data every time.";

export const aiWorkflowStory = [
  "A useful habit from the UTA work: never trust a DAX result until it's been validated against a plain SQL baseline. The same instinct applies to AI-assisted output - a fast first draft is worth having, but it doesn't replace checking the number against the source.",
  "Most of the actual debugging - a fan-out bug from a bad join, a metadata mismatch after a schema change, a scheduled job that was never wired up - comes from sitting with the data and the stored procedure until the mismatch is obvious, not from a tool.",
] as const;

export const aiAcceleratesSummary =
  "First-draft queries, boilerplate ETL scaffolding, documentation, and exploratory analysis.";

export const engineeringJudgmentSummary =
  "Which number is actually correct, how a pipeline should be structured, and whether a report is ready to hand to someone who will act on it.";

export const workflowPractices: readonly WorkflowPractice[] = [
  {
    title: "Understand the question",
    body: "Before writing a query, figuring out exactly what decision the number needs to support - a fill-rate report and a retention report get built differently even off the same tables.",
  },
  {
    title: "Query and validate",
    body: "Writing the SQL, then checking it against a second method - a raw COUNT(DISTINCT) against a DAX DISTINCTCOUNT, or a manual spot-check against source records.",
  },
  {
    title: "Model and report",
    body: "Building the star schema or DAX measures the dashboard actually needs, even when that takes more work than the easiest option the source tables would allow.",
  },
  {
    title: "Debug at the source",
    body: "When a number looks wrong, tracing it back through the ETL to the actual join or grain problem - most bugs are a fan-out, a missing schedule, or a silent type mismatch.",
  },
  {
    title: "Document the pipeline",
    body: "Writing down what a staging procedure actually does and why, so the next person debugging it doesn't start from zero.",
  },
  {
    title: "Ship and monitor",
    body: "Getting the dashboard or report in front of the people using it, and checking back once real usage exposes edge cases the test data didn't.",
  },
] as const;

export const toolkitLead =
  "The tools I actually reach for, grouped by what I'm doing - not a skills list.";

export const toolkitGroups: readonly ToolkitGroup[] = [
  {
    title: "Data warehousing & ETL",
    note: "Where most of the UTA work lives - designing the schema, then getting data into it reliably.",
    tools: ["SQL Server", "SSIS", "Lucidchart", "Visual Studio"],
  },
  {
    title: "Reporting & BI",
    note: "Turning a validated dataset into something a stakeholder can actually use.",
    tools: ["Power BI", "SSRS", "Tableau", "Argos"],
  },
  {
    title: "Analysis & ML",
    note: "Exploratory work and the applied ML side of ObfuScope and personal projects.",
    tools: ["Python", "pandas", "scikit-learn", "KNIME"],
  },
  {
    title: "Research & AI tools",
    note: "Used for first drafts and mapping unfamiliar problems - never for the validation step.",
    tools: ["ChatGPT", "Claude"],
  },
] as const;

export const contactLinks: readonly ContactLink[] = [
  {
    label: "GitHub",
    href: siteConfig.socials.github,
    description: "Coursework, practicals, and personal projects",
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    description: "Professional profile and background",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.socials.email}`,
    description: "Best channel for anything longer than a message",
  },
];

export interface HubEntry {
  readonly label: string;
  readonly href: string;
  readonly blurb: string;
}

export const hubEntries: readonly HubEntry[] = [
  {
    label: "About",
    href: "/about",
    blurb: "Nepal to Weber State, and how two analyst roles ran alongside the degree.",
  },
  {
    label: "Background",
    href: "/background",
    blurb: "The degree and the two analyst roles, on one timeline.",
  },
  {
    label: "Projects",
    href: "/projects",
    blurb:
      "The UTA data warehouse, EV fleet automation, ObfuScope research, and personal projects.",
  },
  {
    label: "Skills",
    href: "/skills",
    blurb: "The stack I'd be happy to be questioned on, grouped by what it's for.",
  },
  {
    label: "Workflow",
    href: "/workflow",
    blurb: "How I move from a question to a validated number.",
  },
  {
    label: "Resume",
    href: "/resume",
    blurb: "The one-page version - experience, projects, education. Downloadable as a PDF.",
  },
  {
    label: "Contact",
    href: "/contact",
    blurb: "The fastest ways to reach me.",
  },
] as const;

export const currentFocus = [
  "SSIS ETL design and star-schema modeling",
  "DAX and Power BI reporting for live operational dashboards",
  "Applied ML - feature engineering and evaluation protocol design",
  "SQL practice - window functions, CTEs, aggregation patterns",
  "Grad school outreach for an MS in Data Science or Computer Science",
] as const;
