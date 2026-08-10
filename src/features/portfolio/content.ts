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
  /**
   * `concept` groups render as plain pills. A monogram tile next to "REST APIs"
   * implies a vendor mark that does not exist, so only named products get one.
   */
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

export const heroHeadline = "I build software that has to be correct.";

export const heroSubheadline =
  "Accounting, compliance, and operations systems for businesses that can't afford to be wrong.";

/**
 * The line under the hero. Four things a reader can go and verify rather than
 * four adjectives — each one is evidenced in the VAT case study.
 */
export const heroProofPoints = [
  "Real books",
  "Multi-tenant PostgreSQL",
  "Offline-first",
  "Nepal",
] as const;

/**
 * The /now page.
 *
 * Dated on purpose: an undated "currently" paragraph is indistinguishable from
 * an abandoned one. Update `nowUpdated` every time this changes, and if a
 * month goes by without it changing, that is the signal — not a reason to
 * quietly leave the old date in place.
 */
export const nowUpdated = "10 August 2026";

export const nowLead =
  "A dated snapshot of what has my attention, rewritten monthly. It exists so a stranger can tell the difference between a portfolio that is being worked on and one that stopped.";

export interface NowEntry {
  readonly label: string;
  readonly items: readonly string[];
}

export const nowEntries: readonly NowEntry[] = [
  {
    label: "Building",
    items: [
      "A test suite and CI for the VAT ledger, so the correctness claims on this site point at something a stranger can run rather than at my word.",
      "Bikram Sambat date handling and IRD-format sales and purchase registers — the compliance gap between what the system does and what Nepal's tax year actually expects.",
    ],
  },
  {
    label: "Next",
    items: [
      "Rehearsing and documenting a restore from backup. I am holding a business's books and have never actually executed the restore, which makes it the most urgent item I have.",
      "Finishing the first written post: how I test a double-entry ledger for correctness under concurrent offline sync.",
    ],
  },
  {
    label: "Deliberately not doing",
    items: [
      "Claiming applied AI or cloud. One call to a hosted model is API consumption, and Supabase and Vercel are platforms that abstract cloud away. Both go back on the site when there is a measured accuracy number on a labelled set and infrastructure I provisioned myself.",
      "Adding frameworks. The stack is eight things I can defend, and it stays that way until something in it stops being enough.",
    ],
  },
];

export const backgroundLead =
  "The degree and the company ran at the same time, and kept handing things to each other. A database course became the agency's accounting schema; a VAT compliance seminar became the rules the ledger enforces. This page is both tracks on one timeline, because separating them was never honest.";

export const backgroundSpineLead =
  "A filled node means that semester produced something that shipped. An empty one means it did not, and I would rather show the gap than invent a link.";

export const stackLead =
  "No aspirational logos. Everything here appears in something I have shipped, and most of it in something running in production right now.";

export const aboutOpeningParagraph =
  "Most of my classmates spent university chasing an internship. I spent mine moving my family's travel agency off paper ledgers and Excel. I wanted to find out whether I could fix a real business that was already running, not just study one.";

export const footerClosingStatement =
  "This isn't a finished portfolio. I'd rather fix one real system than describe ten hypothetical ones, and there's more coming: transport records, hospitality, and whatever breaks next.";

export const coreStory = [
  "I joined my father's two-person travel agency straight out of high school in 2022. It ran on Excel sheets, paper ledgers and manual ticket tracking, and I could see what that was costing.",
  "So I used the company as a live testbed while carrying a full CSIT course load. Everything below came out of that.",
  "I don't build software because code is interesting on its own. I build it because manual work keeps eating hours that should go to people and better decisions.",
] as const;

/** Institution names are load-bearing on a portfolio — kept in one place. */
export const education = {
  bachelor: {
    degree: "BSc CSIT",
    college: "Madan Bhandari Memorial College",
    affiliation: "Tribhuvan University",
    detail: "8th semester, 2022 batch",
  },
  higherSecondary: {
    degree: "+2 in Computer Science and Physics",
    college: "Uniglobe College",
  },
} as const;

export const currentStatusSummary = `${education.bachelor.degree}, ${education.bachelor.detail}, ${education.bachelor.college}, affiliated with ${education.bachelor.affiliation}.`;

export const academicPerformanceSummary =
  "I've been a consistent A-range performer, with an aggregate of roughly 3.30-3.56 GPA across semesters.";

export const timeline: readonly TimelineItem[] = [
  {
    year: "2020",
    title: "SEE at Siddhartha Banasthali School",
    body: "I completed SEE (SLC) with a GPA of 3.95.",
    logo: "siddharthaVanasthali",
  },
  {
    year: "2020-2022",
    title: "+2 in Computer Science and Physics at Uniglobe College",
    body: "Class XI GPA 3.70, Class XII GPA 3.55. I served as IT Club Secretary, which gave me my first taste of leadership, coordination, and public speaking.",
    logo: "uniglobe",
  },
  {
    year: "Mar-Sep 2022",
    title: "Life Computer Institute training",
    body: "Structured IT training in MS Office, HTML/XHTML, CSS/CSS3, JavaScript, jQuery, PHP, Bootstrap, CorelDraw, FreeHand, Digital Marketing, basic hardware, and project work.",
  },
  {
    year: "2022-present",
    title: "Joined Nepal South Asia International Travels & Tours",
    body: `I started building the company's digital backbone while beginning ${education.bachelor.degree} at ${education.bachelor.college}. At this point the company was just my father and me.`,
    logo: "nsaTravels",
  },
  {
    year: "2022-present",
    title: "Digitized the travel business",
    body: "I built the accounting workflow, cloud storage and backup, customer and B2B records, and the company website. I also helped technically during the move toward IATA accreditation.",
  },
  {
    year: "Dec 2023",
    title: "Travelport Basic Ticketing (TMA4)",
    body: "I completed basic ticketing training aligned with the systems we use in day-to-day operations.",
  },
  {
    year: "Feb-Mar 2024",
    title: "Sabre Basic GDS",
    body: "Formal training in the core travel industry system stack.",
  },
  {
    year: "Apr-May 2024",
    title: "Sabre Red360 Advanced Ticketing",
    body: "I went deeper into the operational tooling behind the agency's workflow.",
  },
  {
    year: "May-Jun 2024",
    title: "Travelport Advanced Ticketing",
    body: "Further training for the ticketing and booking workflows we run every day.",
  },
  {
    year: "Jul 2024",
    title: "VAT and compliance training",
    body: "Training for travel industry professionals from NATTA and the Ministry of Finance, Government of Nepal, delivered in Kathmandu on 30 July 2024. It fed directly into the compliant accounting system work.",
  },
  {
    year: "2024",
    title: "Galileo GDS training",
    body: "I added Galileo to the GDS stack I can work in, alongside Sabre and Travelport.",
  },
  {
    year: "2023-2026",
    title: "University workshops and final-year work",
    body: "UI/UX, WordPress, and Quality Assurance workshops; Advanced Java, Data Warehousing and Data Mining, Software Project Management, Advanced Database, and final-year project work.",
    logo: "mbmc",
  },
] as const;

export const curriculum: readonly SemesterNode[] = [
  {
    semester: "Sem I",
    emphasis: "Getting the fundamentals in place",
    courses: [
      { name: "Intro to IT" },
      { name: "C Programming" },
      { name: "Digital Logic" },
      { name: "Math I" },
      { name: "Physics" },
    ],
    outcome: "The basic computational and mathematical base for everything that follows.",
  },
  {
    semester: "Sem II",
    emphasis: "Thinking in systems",
    courses: [
      { name: "Discrete Structure" },
      { name: "OOP" },
      { name: "Microprocessor" },
      { name: "Math II" },
      { name: "Statistics I" },
    ],
    outcome: "Introduced me to structure, abstraction, and the language of software design.",
  },
  {
    semester: "Sem III",
    emphasis: "Data and algorithms",
    courses: [
      { name: "Data Structures and Algorithms" },
      { name: "Numerical Method" },
      { name: "Computer Architecture" },
      { name: "Computer Graphics" },
      { name: "Statistics II" },
    ],
    outcome: "Shaped how I think about performance, data flow, and problem decomposition.",
  },
  {
    semester: "Sem IV",
    emphasis: "The point where software started to feel real",
    courses: [
      { name: "Theory of Computation" },
      { name: "Computer Networks" },
      { name: "Operating Systems" },
      { name: "Database Management System", link: "NSA Travels accounting and customer data" },
      { name: "Artificial Intelligence", link: "AI-assisted features and future product ideas" },
    ],
    outcome: "Database and AI concepts became direct inputs to my later projects.",
  },
  {
    semester: "Sem V",
    emphasis: "Building for the web",
    courses: [
      { name: "Design and Analysis of Algorithms" },
      { name: "System Analysis and Design" },
      { name: "Cryptography" },
      { name: "Simulation and Modeling" },
      { name: "Web Technology", link: "Company website build" },
    ],
    outcome:
      "Turned the company website and my later web projects into a natural extension of coursework.",
  },
  {
    semester: "Sem VI",
    emphasis: "Structure and delivery",
    courses: [
      { name: "Software Engineering", link: "How I plan later projects" },
      { name: "Compiler Design" },
      { name: "E-Governance" },
      { name: ".NET Centric Computing" },
      { name: "Technical Writing" },
    ],
    outcome: "Made planning, documentation, and disciplined delivery part of how I work.",
  },
  {
    semester: "Sem VII",
    emphasis: "Applied project work",
    courses: [
      { name: "Advanced Java Programming" },
      { name: "Data Warehousing and Data Mining", link: "AI-assisted and data-informed features" },
      { name: "Principles of Management" },
      { name: "Project Work" },
      { name: "Software Project Management", link: "Army Training Center PM case study" },
    ],
    outcome: "Fed the practical project and planning work I show later in this portfolio.",
  },
  {
    semester: "Sem VIII",
    emphasis: "Final semester work",
    courses: [{ name: "Advanced Database" }, { name: "Internship" }, { name: "Electives" }],
    outcome:
      "Brings the degree to a close while this portfolio and my US MS applications move forward.",
  },
] as const;

export const trainings: readonly TrainingCard[] = [
  {
    title: "Basic Ticketing (TMA4)",
    provider: "Travelport",
    period: "Dec 2023",
    connectsTo: "Daily ticketing systems used at NSA Travels",
    whyItMatters: "It connects classroom learning to the live workflow I use every day.",
  },
  {
    title: "Basic GDS",
    provider: "Sabre",
    period: "Feb-Mar 2024",
    connectsTo: "Core travel industry systems knowledge",
    whyItMatters: "I wanted fluency in the tools the business actually depends on.",
  },
  {
    title: "Sabre Red360 Advanced Ticketing",
    provider: "Sabre",
    period: "Apr-May 2024",
    connectsTo: "Advanced day-to-day operations tooling",
    whyItMatters: "This supports the more complex side of our ticketing work.",
  },
  {
    title: "Advanced Ticketing",
    provider: "Travelport",
    period: "May-Jun 2024",
    connectsTo: "Deeper GDS and ticketing fluency",
    whyItMatters: "It expanded the systems knowledge I need at the travel desk.",
  },
  {
    title: "Galileo GDS Training",
    provider: "Galileo",
    period: "2024",
    connectsTo: "The third GDS in the stack, alongside Sabre and Travelport",
    whyItMatters:
      "Knowing more than one GDS means I can reason about the workflow rather than one vendor's screens.",
  },
  {
    title: "VAT and Compliance Training",
    provider: "NATTA / Ministry of Finance, Government of Nepal",
    period: "Kathmandu, 30 July 2024",
    connectsTo: "The compliant, tax-aware accounting system",
    whyItMatters:
      "Training built for travel industry professionals — accounting software in a small business has to respect the real tax workflow.",
  },
] as const;

/**
 * Eight things, not forty.
 *
 * A list of forty communicates less than a list of eight, because the reader
 * assumes none of the forty are deep. Everything in the first group is
 * something I would be happy to be questioned on for an hour. The repos for
 * the rest still exist; they are just no longer presented as capability.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    title: "What I build with",
    kind: "tech",
    items: [
      "TypeScript",
      "PostgreSQL",
      "React / Next.js",
      "Node.js",
      "SQL",
      "Supabase (RLS)",
      "IndexedDB (offline sync)",
      "Git",
    ],
  },
  {
    title: "Learning properly, not claiming yet",
    kind: "tech",
    items: ["Go", "AWS", "OpenTelemetry", "Docker"],
  },
  {
    title: "Concepts",
    kind: "concept",
    items: [
      "Double-entry accounting",
      "Row-level security",
      "Offline-first sync",
      "Multi-tenant data modelling",
      "Database design",
      "REST APIs",
    ],
  },
] as const;

/** The group the homepage marquee draws from — shipped work only. */
export const shippedStackTitle = "What I build with";

export interface GameEntry {
  /** Matches a vendored brand glyph, so the card can show the game's mark. */
  readonly name: string;
  readonly figure: string;
  readonly figureLabel: string;
  readonly body: string;
}

export const gamingLead =
  "I've played competitively for about as long as I've been building software. Both reward reading a system quickly and being honest about why the last attempt failed.";

export const gamingProfile = {
  label: "Steam",
  href: "https://steamcommunity.com/id/alokbndry10/",
  note: "The hours are public. Nothing here is rounded up.",
} as const;

export const gamingStory = [
  "I didn't start playing to learn anything. I stayed because a match gives you an unambiguous answer about whether your read was right.",
  "Drafting is architecture under constraints. A losing lane is a bug you diagnose while the system is still running. Reviewing a loss without flinching is the same muscle as reading a code review that finds eight defects in your work.",
] as const;

export const games: readonly GameEntry[] = [
  {
    name: "Dota 2",
    figure: "7,000+",
    figureLabel: "hours, in this one game alone",
    body: "The most complicated system I've spent real time inside that I didn't build. Over a hundred heroes, each one changing what the other side can safely do. Seven thousand hours is why I'm comfortable being the least knowledgeable person in a complex system.",
  },
  {
    name: "Valorant",
    figure: "1st",
    figureLabel: "intercollege tournament, first year of college",
    body: "We won the intercollege tournament in my first year. Five people, each doing one job and calling what they saw immediately. A partial read shared early beats a complete one delivered after the round.",
  },
  {
    name: "PUBG",
    figure: "Risk",
    figureLabel: "management, mostly",
    body: "Position and patience over aim. Almost every loss traces back to a fight with nothing to win, or ground held past the point it was defensible.",
  },
] as const;

export const gamingCloser =
  "None of this belongs on a CV. It's here because leaving it out would make the picture tidier and less true.";

export const aiWorkflowLead =
  "AI is part of how I work now, the way version control and a good editor are. It shortens the distance between a question and a working answer. Whether the software is correct, maintainable and worth building stays my call.";

export const aiWorkflowStory = [
  "I treat it like a fast, well-read colleague: useful for a first draft, worth arguing with, never the final authority. Nothing reaches a system a business depends on without passing my own review.",
  "A model can propose three architectures. Deciding which one survives a real budget, a real team and real data is engineering work that doesn't transfer to a tool.",
  "The practical result is throughput. Work that cost a weekend of reading now costs an evening, so more of my time goes to understanding the problem, choosing what to build, and checking that it behaves the way I claimed.",
] as const;

export const aiAcceleratesSummary =
  "Research, first drafts, boilerplate, exploratory code, and the mechanical half of refactoring, testing and documentation.";

export const engineeringJudgmentSummary =
  "Problem definition, architecture, trade-offs, correctness, and full responsibility for everything that ships.";

export const workflowPractices: readonly WorkflowPractice[] = [
  {
    title: "Technical research",
    body: "Mapping an unfamiliar problem space fast: what approaches exist and which sources are worth reading in full. I still read the primary material before committing.",
  },
  {
    title: "Architecture exploration",
    body: "I ask for several viable structures, then argue against each. Three defensible options side by side make the trade-offs explicit instead of leaving them buried in a first instinct.",
  },
  {
    title: "Documentation",
    body: "READMEs, architecture notes and setup guides for systems I've already built. The understanding is mine. The first draft of the prose doesn't have to be.",
  },
  {
    title: "Rapid prototyping",
    body: "A rough version, fast enough to learn from. A prototype that answers a question in an hour beats a plan that argues about it for a week.",
  },
  {
    title: "Refactoring",
    body: "Restructuring working code without changing behaviour: extracting a module, tightening types, removing duplication. Tests are the contract that proves nothing broke.",
  },
  {
    title: "Debugging",
    body: "A second perspective on a stack trace. AI is fastest at eliminating wrong hypotheses, and that's most of what debugging is.",
  },
  {
    title: "Testing",
    body: "Cases around boundaries I've defined, especially the edge conditions that are easy to miss when you wrote the implementation yourself.",
  },
  {
    title: "Code review",
    body: "A first pass before a human one: naming, error handling, unhandled cases, drift from the conventions already there. It clears the ordinary mistakes so review can be about design.",
  },
  {
    title: "Learning new technology",
    body: "Building something small in an unfamiliar language and asking why it's shaped the way it is. That's the gap between reading docs and understanding intent.",
  },
  {
    title: "API exploration",
    body: "What an API genuinely supports, and how it fails, before I design around it. GDS and payment integrations are unforgiving about assumptions.",
  },
  {
    title: "UI generation",
    body: "A first interface pass to react to. Judging a layout that exists is far easier than specifying one that doesn't, so drafts are material for critique.",
  },
  {
    title: "Technical writing",
    body: "Case studies, proposals and specifications, structured so the reasoning behind a system outlives the person who built it.",
  },
  {
    title: "Brainstorming",
    body: "Thinking out loud against something that pushes back. Most ideas don't survive that conversation, which is why it's worth having early.",
  },
  {
    title: "Productivity",
    body: "Scripts, migrations, boilerplate and formatting, handled fast enough that attention stays on the parts that need it.",
  },
] as const;

export interface WorkflowStage {
  readonly name: string;
  /** The half a model can take a first pass at. */
  readonly drafted: string;
  /** The half that does not transfer to a tool. */
  readonly decided: string;
}

export const workflowModelLead =
  "Six stages run on every build, and each splits the same way. Everything left of the line is a draft I asked for. Everything right of it is a decision I'm answerable for.";

export const workflowStages: readonly WorkflowStage[] = [
  {
    name: "Understand",
    drafted: "Domain research, prior art, and the vocabulary of an unfamiliar field.",
    decided: "What the problem is, and whether software should solve it at all.",
  },
  {
    name: "Design",
    drafted: "Several viable structures, each argued against, trade-offs made explicit.",
    decided: "Which one survives a real budget, a real team and real data.",
  },
  {
    name: "Build",
    drafted: "Boilerplate, scaffolding, and a first implementation to react to.",
    decided: "The interfaces and the data model — the parts that are expensive to change.",
  },
  {
    name: "Verify",
    drafted: "Cases around the boundaries I defined, and the edge conditions easy to miss.",
    decided: "What correct means here, and where each invariant gets enforced.",
  },
  {
    name: "Document",
    drafted: "First-pass prose for READMEs, architecture notes and setup guides.",
    decided: "What's true, and what the system doesn't do. A known limit belongs in the docs.",
  },
  {
    name: "Ship",
    drafted: "Migrations, release notes, and the mechanical half of getting it out.",
    decided: "Whether it's ready, and responsibility for it once it is.",
  },
] as const;

export const workflowModelCloser =
  "Then it loops. Shipping produces the next round of things I didn't understand, which is where stage one gets its material.";

export const toolkitLead =
  "Not a skills list. These are the tools I reach for at each stage, from the first unfamiliar question through to the version that ships and has to keep working.";

export const toolkitGroups: readonly ToolkitGroup[] = [
  {
    title: "Research",
    note: "Mapping a problem before I commit. Asking more than one model is deliberate — where they disagree is usually where the real trade-off hides.",
    tools: ["ChatGPT", "Google Gemini", "Kimi", "Claude Code"],
  },
  {
    title: "Architecture",
    note: "Exploring candidate structures, arguing against each, then recording the decision somewhere it can be revisited months later.",
    tools: ["Claude Code", "ChatGPT", "Notion"],
  },
  {
    title: "Development",
    note: "The editor is still where the work happens. AI sits inside it, with version control as the safety net that makes fast iteration reversible.",
    tools: ["VS Code", "Claude Code", "OpenAI Codex", "GitHub Copilot", "Git"],
  },
  {
    title: "Documentation",
    note: "READMEs, architecture notes and internal guides written alongside the build rather than bolted on after, so the reasoning outlives whoever wrote it.",
    tools: ["Notion", "Claude Code", "GitHub"],
  },
  {
    title: "Testing",
    note: "API behaviour checked against the real service, cases drafted around boundaries I define, and checks that run on every push instead of when someone remembers.",
    tools: ["Postman", "Claude Code", "GitHub"],
  },
  {
    title: "Design",
    note: "Interface work starts as layout and hierarchy, not decoration. Generated first passes are raw material to correct, never the shipped result.",
    tools: ["Figma", "Google Gemini", "Claude Code"],
  },
  {
    title: "Productivity",
    note: "Planning and tracking, kept light enough that the process supports the engineering instead of becoming a second project.",
    tools: ["Notion", "ChatGPT", "GitHub Copilot"],
  },
  {
    title: "Continuous learning",
    note: "What I'm picking up, not what I already have. Docker is listed as learning because that's what it is — I'd rather say so than imply fluency.",
    tools: ["Docker (Learning)", "Kimi", "OpenAI Codex", "Google Gemini"],
  },
] as const;

/**
 * Addresses are read from `siteConfig`, never retyped. The site used to carry
 * a second copy of every URL here, which is exactly how a page ends up
 * pointing at a LinkedIn profile that no longer exists.
 */
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
    label: "Instagram",
    href: siteConfig.socials.instagram,
    description: "The less formal side of what I'm up to",
  },
  {
    label: "WhatsApp",
    href: siteConfig.whatsapp.href,
    description: "Fastest way to reach me directly",
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

/** The homepage is a hub, so each route gets one line explaining why to open it. */
export const hubEntries: readonly HubEntry[] = [
  {
    label: "Now",
    href: "/now",
    blurb: `What I'm building this month, and what I'm deliberately not. Dated ${nowUpdated}.`,
  },
  {
    label: "About",
    href: "/about",
    blurb: "How a two-person family agency became my first real engineering project.",
  },
  {
    label: "Background",
    href: "/background",
    blurb: "The degree and the agency, on one timeline — each semester and what it fed.",
  },
  {
    label: "Projects",
    href: "/projects",
    blurb: "The flagship ledger, the supporting project work, and the coursework behind both.",
  },
  {
    label: "Writing",
    href: "/writing",
    blurb: "Things that broke, decisions with trade-offs, and measurements I produced.",
  },
  {
    label: "Skills",
    href: "/skills",
    blurb: "Eight things I would be happy to be questioned on, and what I am still learning.",
  },
  {
    label: "Workflow",
    href: "/workflow",
    blurb: "How I use AI as an engineering assistant, and the tools behind each stage.",
  },
  {
    label: "Contact",
    href: "/contact",
    blurb: "The fastest ways to reach me.",
  },
] as const;

/**
 * Only what there is evidence for. AI and cloud came off this list on purpose:
 * calling a hosted model is API consumption, and Supabase and Vercel are
 * platforms that abstract cloud away. Both go back on once there is a measured
 * accuracy number on a labelled set and infrastructure I provisioned myself.
 */
export const currentFocus = [
  "Correctness under concurrent offline sync",
  "PostgreSQL and multi-tenant data modelling",
  "System design and software architecture",
  "Test harnesses and CI for the VAT system",
  "Deepening theoretical CS for US MS CS applications",
] as const;
