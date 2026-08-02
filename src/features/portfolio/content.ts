export interface TimelineItem {
  readonly year: string;
  readonly title: string;
  readonly body: string;
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
}

export interface Principle {
  readonly quote: string;
  readonly explanation: string;
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

export const heroHeadline =
  "I didn't wait for an internship. I found a business that needed fixing.";

export const heroSubheadline =
  "I'm a Nepali BSc CSIT student, and I used my family's business as a live testbed for software that replaces manual work with something steadier, searchable, and easier to trust.";

export const aboutOpeningParagraph =
  "Most of my classmates spent university chasing an internship offer. I spent mine turning my family's travel agency from paper ledgers and Excel sheets into something that actually runs on software — because I wanted to know if I could fix a real, messy, working business, not just study how one works.";

export const footerClosingStatement =
  "This isn't a finished portfolio. It's the first chapter of an engineer who'd rather fix one real system than talk about ten hypothetical ones. More is coming — transport records, hospitality, and whatever's broken next.";

export const coreStory = [
  "Right after finishing high school in 2022, I started working inside my father's two-person travel agency — not as a favour, but because I saw a business still running on Excel sheets, paper ledgers, and manual ticket tracking.",
  "What follows is what happened next: I used the family company as a live testbed for real software while carrying a full CSIT course load.",
  "The throughline is simple. I'm not building software because code is exciting on its own. I'm building it because manual work keeps eating time that should belong to people and better decisions.",
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
  },
  {
    year: "2020-2022",
    title: "+2 in Computer Science and Physics at Uniglobe College",
    body: "Class XI GPA 3.70, Class XII GPA 3.55. I served as IT Club Secretary, which gave me my first taste of leadership, coordination, and public speaking.",
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

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Languages",
    items: ["Java", "C", "C++", "JavaScript", "PHP", "SQL", "HTML", "CSS", "Python (basic)"],
  },
  {
    title: "Frameworks and libraries",
    items: ["Bootstrap", "React", "Next.js", "Node.js", "Express"],
  },
  {
    title: "Databases",
    items: ["MySQL", "PostgreSQL", "SQLite"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Figma", "Canva"],
  },
  {
    title: "Cloud and hosting",
    items: ["Supabase", "Firebase", "Vercel", "Netlify"],
  },
  {
    title: "Concepts",
    items: [
      "REST APIs",
      "Authentication",
      "MVC",
      "OOP design",
      "Database design",
      "UI/UX design",
      "Responsive design",
      "Workflow automation",
      "Applied AI integration",
      "Business process optimization",
    ],
  },
] as const;

export const philosophy: readonly Principle[] = [
  {
    quote: "I automate before I optimize.",
    explanation: "A manual bottleneck should be removed before anyone starts polishing it.",
  },
  {
    quote: "Understand the business before writing the code.",
    explanation: "The workflow matters more than the tool that eventually implements it.",
  },
  {
    quote: "The best internal tool is the one nobody has to think about using.",
    explanation: "A good system fades into the background and just makes the work happen.",
  },
  {
    quote: "Documentation and clear process are part of the engineering.",
    explanation: "The build is only as durable as the knowledge around it.",
  },
  {
    quote: "Start where you actually have access to the problem.",
    explanation:
      "The family business became my first real project because it was the place where my help could be real.",
  },
  {
    quote: "AI should remove grunt work, not replace judgment.",
    explanation: "I'm after better leverage, not blind automation.",
  },
] as const;

export const aiWorkflowLead =
  "AI is part of how I work now, in the same way version control and a good editor are. It shortens the distance between a question and a working answer. The decisions that determine whether software is correct, maintainable, and worth building at all stay with me.";

export const aiWorkflowStory = [
  "I treat AI the way I'd treat a fast, well-read colleague: useful for a first draft, valuable in conversation, and never the final authority. It compresses research, surfaces options I hadn't considered, and takes the mechanical work off my hands — but nothing reaches a system a business depends on without passing through my own review first.",
  "That distinction matters more than the tooling does. I view AI as a force multiplier for engineering—not a substitute for engineering judgment. A model can propose three architectures; deciding which one survives contact with a real budget, a real team, and real data is engineering work that does not transfer to a tool.",
  "The practical result is throughput. Work that used to cost a weekend of reading and trial and error now costs an evening, which means more of my time goes to the parts that genuinely need a person: understanding the problem, choosing what to build, and verifying that what I built behaves the way I claimed it would.",
] as const;

export const aiAcceleratesSummary =
  "Research, first drafts, boilerplate, exploratory code, and the mechanical half of refactoring, testing, and documentation.";

export const engineeringJudgmentSummary =
  "Problem definition, architecture decisions, trade-off analysis, correctness, and full responsibility for everything that ships.";

export const workflowPractices: readonly WorkflowPractice[] = [
  {
    title: "Technical research",
    body: "Mapping an unfamiliar problem space quickly — what approaches exist, how they differ, and which sources are worth reading in full. It narrows the search; I still read the primary material before committing to anything.",
  },
  {
    title: "Software architecture exploration",
    body: "Before settling on a structure I ask for several viable designs and then argue against each one. Seeing three defensible options side by side makes the trade-offs explicit instead of leaving them buried in a first instinct.",
  },
  {
    title: "Documentation",
    body: "Drafting READMEs, architecture notes, and setup guides for systems I've already built. The understanding is mine; the first draft of the prose does not need to be.",
  },
  {
    title: "Rapid prototyping",
    body: "Standing up a rough working version fast enough to learn something from it. A prototype that answers a question in an hour is worth more than a plan that argues about it for a week.",
  },
  {
    title: "Refactoring",
    body: "Restructuring working code without changing its behaviour — extracting a module, tightening types, removing duplication — with tests as the contract that proves nothing broke on the way through.",
  },
  {
    title: "Debugging",
    body: "Reading a stack trace or a failing case with a second perspective on it. AI is fastest at eliminating wrong hypotheses, and eliminating wrong hypotheses is most of what debugging actually is.",
  },
  {
    title: "Testing",
    body: "Generating cases around boundaries I've defined, especially the edge conditions that are easy to miss when you're the person who wrote the implementation.",
  },
  {
    title: "Code review",
    body: "A first pass before a human one: naming, error handling, unhandled cases, and drift from the conventions already in the codebase. It clears the ordinary mistakes so review conversations can be about design.",
  },
  {
    title: "Learning unfamiliar technologies",
    body: "Working through a new language or framework by building something small in it and asking why it is shaped the way it is. That's the difference between reading documentation and understanding intent.",
  },
  {
    title: "API exploration",
    body: "Learning what an unfamiliar API genuinely supports, and what its failure modes look like, before I design around it. In travel systems this matters — GDS and payment integrations are unforgiving about assumptions.",
  },
  {
    title: "UI generation",
    body: "Producing a first interface pass to react to. It is far easier to judge a layout that exists than to specify one that doesn't, so I use generated drafts as material for critique rather than as finished work.",
  },
  {
    title: "Technical writing",
    body: "Case studies, proposals, and specifications — getting the structure and clarity right so the reasoning behind a system outlives the person who built it.",
  },
  {
    title: "Brainstorming",
    body: "Thinking out loud against something that pushes back. Most ideas do not survive that conversation, which is exactly the point of having it early.",
  },
  {
    title: "Productivity",
    body: "The routine work around a build — scripts, migrations, boilerplate, formatting — handled quickly enough that attention stays on the parts that need it.",
  },
] as const;

export const toolkitLead =
  "This isn't a skills list or a technology stack. These are the tools I actually reach for at each stage of building something, from the first unfamiliar question through to the version that ships and has to keep working.";

export const toolkitGroups: readonly ToolkitGroup[] = [
  {
    title: "Research",
    note: "Mapping a problem before I commit to an approach. Asking the same question of more than one model is deliberate — where they disagree is usually where the real trade-off is hiding.",
    tools: ["ChatGPT", "Google Gemini", "Kimi", "Claude Code"],
  },
  {
    title: "Architecture",
    note: "Exploring candidate structures, arguing against each of them, then recording the decision and the reasoning behind it somewhere it can be revisited months later.",
    tools: ["Claude Code", "ChatGPT", "Notion"],
  },
  {
    title: "Development",
    note: "The editor is still where the work happens. AI sits inside it for implementation, refactoring, and debugging, with version control as the safety net that makes fast iteration reversible.",
    tools: ["VS Code", "Claude Code", "OpenAI Codex", "GitHub Copilot", "Git"],
  },
  {
    title: "Documentation",
    note: "READMEs, architecture notes, and internal guides written alongside the build rather than bolted on afterwards, so the reasoning survives past the person who wrote it.",
    tools: ["Notion", "Claude Code", "GitHub"],
  },
  {
    title: "Testing",
    note: "API behaviour verified against the real service, test cases drafted around boundaries I define, and checks that run automatically on every push instead of when someone remembers.",
    tools: ["Postman", "Claude Code", "GitHub"],
  },
  {
    title: "Design",
    note: "Interface work starts as layout and hierarchy, not as decoration. Generated first passes exist to be reacted to and corrected — they are raw material, not the shipped result.",
    tools: ["Figma", "Google Gemini", "Claude Code"],
  },
  {
    title: "Productivity",
    note: "Planning, tracking, and the administrative weight around a build — kept deliberately lightweight so the process supports the engineering instead of becoming a second project.",
    tools: ["Notion", "ChatGPT", "GitHub Copilot"],
  },
  {
    title: "Continuous learning",
    note: "What I'm actively picking up rather than what I've already got. Docker is listed honestly: I'm learning containerization and deployment workflows now, and I'd rather say that than imply fluency.",
    tools: ["Docker (Learning)", "Kimi", "OpenAI Codex", "Google Gemini"],
  },
] as const;

export const contactLinks: readonly ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/aalokbhandari",
    description: "Coursework, practicals, and personal projects",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alokbndry10/",
    description: "Professional profile and background",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/by.aalok/",
    description: "The less formal side of what I'm up to",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/9779813014395",
    description: "Fastest way to reach me directly",
  },
  {
    label: "Email",
    href: "mailto:aalokbhandari.dev@gmail.com",
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
    label: "About",
    href: "/about",
    blurb: "How a two-person family agency became my first real engineering project.",
  },
  {
    label: "Experience",
    href: "/experience",
    blurb: "What I actually did at NSA Travels, before and after.",
  },
  {
    label: "Projects",
    href: "/projects",
    blurb: "One shipped case study, active concepts, and the coursework behind them.",
  },
  {
    label: "Education",
    href: "/education",
    blurb: "BSc CSIT mapped course by course to the work it fed.",
  },
  {
    label: "Skills",
    href: "/skills",
    blurb: "Languages, frameworks, and concepts I can actually apply.",
  },
  {
    label: "Workflow",
    href: "/workflow",
    blurb: "How I use AI as an engineering assistant, and the tools behind each stage.",
  },
  {
    label: "Philosophy",
    href: "/philosophy",
    blurb: "The principles I keep coming back to.",
  },
  {
    label: "Contact",
    href: "/contact",
    blurb: "The fastest ways to reach me.",
  },
] as const;

export const currentFocus = [
  "Artificial intelligence and applied ML",
  "System design",
  "Cloud computing",
  "Software architecture",
  "Product and UX thinking",
  "Deepening theoretical CS for US MS CS applications",
] as const;
