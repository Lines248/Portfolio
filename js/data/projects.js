export const projects = [
  {
    id: "ai-governance",
    caption: "An AI policy and rollout plan for a nonprofit.",
    title: "AI Governance for a Nonprofit",
    type: "AI Governance & Enablement",
    image: "/assets/images/ai-governance-cover.svg",
    alt: "Cover for the AI governance framework, covering policy, training, equity, funding and rollout.",
    description:
        "I researched and wrote an AI governance framework for Dance/NYC, covering policy, training, equity, funding and rollout. Then I set up the tools and started bringing a small, mostly non-technical team along.",
    stack: ["AI Policy", "Training", "Change Management", "Claude Team"],
    links: {},
    featured: true,
    category: "governance",
  },
  {
    id: "ai-use-checker",
    caption: "Type what you want to use AI for and get a plain answer, with the policy rule behind it.",
    title: "Can I Use AI for This?",
    type: "AI Enablement Tool | Next.js, AI SDK, AI Gateway",
    image: "/assets/images/ai-use-checker.webp",
    alt: "The AI use checker answering 'Use it to rank grant applicants' with Not allowed, citing rule R5: people decide about people.",
    description:
        "A small tool that turns an AI policy into instant answers. Staff describe a task and get allowed, ask first or not allowed, with the rule behind it and a safer way to do it. Built with Next.js, TypeScript and the Vercel AI SDK, using structured output through AI Gateway. Accessible, and it fails safe when the model is down.",
    stack: ["Next.js", "TypeScript", "AI SDK", "AI Gateway"],
    links: {
      live: "https://ai-use-checker-plum.vercel.app",
      repo: "",
    },
    featured: true,
    category: "development",
  },
  {
    id: "n8n-automations",
    caption: "Three n8n workflows, including one that drafts security questionnaire answers for a person to review.",
    title: "n8n Automations",
    type: "AI Automation | n8n, AI Agents, Notion",
    image: "/assets/images/n8n-workflows-v2.webp",
    alt: "n8n canvas with three workflows: email triage with an AI agent, form submissions sent to Notion, and a security questionnaire helper that drafts answers from an approved library into a review queue.",
    description:
        "I built three workflows in n8n. The main one drafts answers to security questionnaires using only approved answers, and flags anything it can't answer for a person. The other two label my email and send form submissions to Notion. If anything breaks, I get an email.",
    stack: ["n8n", "AI Agents", "Notion", "Human Review", "Error Alerts"],
    links: {},
    featured: true,
    category: "development",
  },
  {
    id: "ia-studio",
    caption: "Private viewing rooms for gallery clients, plus AI curation from the gallery's own inventory.",
    title: "Secure Client Portal for Art Galleries",
    type: "Front-End Engineering | Next.js 15 / React 19 / TypeScript",
    image: "assets/images/ia-desktop.webp",
    alt: "Admin console of the gallery client portal, showing secure portals, inventory and clients.",
    description:
        "A secure, multi-tenant portal for art galleries built with Next.js, React and strict TypeScript. Each client signs in and sees only their own works. Galleries can also ask for AI-picked suggestions from their own inventory.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "AI Curation"],
    metrics: [
      { label: "6ms Auth Response", anchor: "performance-proof" },
      { label: "WebP Optimized", anchor: "performance-proof" }
    ],
    links: {
      live: "",
      repo: "",
    },
    featured: true,
    category: "design",
  },
  {
    id: "accex",
    caption: "Checks any two colors against WCAG contrast rules in one step.",
    title: "ACCEX",
    type: "Front-End Engineering | Accessibility Tool",
    image: "/assets/images/accex.avif",
    alt: "Screenshot of the ACCEX website",
    description:
        "ACCEX is an accessibility tool that checks color contrast for WCAG compliance. Fast, accessible front-end build created with Vite. Designed with clean structure, smooth interaction, and a minimal UI that scales easily as new sections and projects are added. Front-end only, no backend or database.",
    stack: ["HTML", "CSS", "JavaScript", "Vue", "Vite", "CSS Modules", "Vercel"],
    metrics: [
      { label: "100 Accessibility", anchor: "a11y-proof" },
      { label: "WCAG 2.2 AA", anchor: "a11y-proof" }
    ],
    links: {
      live: "https://accex.vercel.app/",
      repo: "https://github.com/Lines248/Accex",
    },
    featured: true,
    category: "design",
  },
  {
    id: "inline-access",
    archived: true, // shown in the collapsed "Earlier work" list
    caption: "A three-theme design system, built by hand in vanilla JS.",
    title: "This Portfolio",
    type: "Front-End Engineering | Vanilla JS & Design System",
    image: "/assets/images/portfolio-site-mobile.avif",
    alt: "Mobile view of this portfolio site showing its 3-theme design system.",
    description:
        "This site is the project. Instead of reaching for a template, I built a custom 3-theme design system from scratch using Vanilla JavaScript. Front-end only, no backend or database.",
    stack: ["VANILLA JS", "SYSTEM DESIGN", "WCAG 2.2", "UI ARCHITECTURE"],
    metrics: [{ label: "100 Lighthouse", anchor: "proof-section" }, { label: "Clarity Validated", anchor: "proof-section" }],
    links: {
      live: "https://sultzer.website/",
      repo: "https://github.com/Lines248/portfolio-site",
    },
    featured: true,
    category: "design",
  },
  {
    id: "deroche-projects",
    archived: true, // shown in the collapsed "Earlier work" list on /work
    caption: "An architect's drawing board, turned into a fast portfolio site.",
    title: "DeRoche Projects",
    type: "Digital Identity & UI/UX",
    image: "/assets/images/deroche.avif",
    alt: "DeRoche Projects architectural portfolio interface",
    description: "Translating an architectural 'drawing board' concept into a dense, high-performance digital portfolio.",
    stack: ["Figma", "Information Architecture", "UI/UX", "Design Systems"],
    links: {
      live: "https://derocheprojects.com/",
    },
    featured: true,
    category: "ui-ux",
    hidden: false
  },
  {
    id: "claim-your-signal",
    caption: "An interactive prototype about who owns what you make online.",
    title: "Claim Your Signal",
    type: "Front-End Engineering | Interaction Design",
    image: "/assets/own-your-data.avif",
    alt: "Screenshot of the Claim Your Signal prototype",
    description:
        "Interactive Next.js prototype exploring authorship and ownership through accessible motion, sound, and one-way claim semantics. Front-end only, no backend or database.",
    stack: ["Next.js", "Tailwind v4", "Framer Motion", "Typescript", "Vercel"],
    links: {
      live: "https://own-your-data.vercel.app/",
      repo: "https://github.com/Lines248/own-your-data",
    },
    featured: false,
    category: "design",
    hidden: true,
  },
  {
    id: "vending-machine",
    archived: true, // shown in the collapsed "Earlier work" list on /work
    caption: "A Java vending machine I rebuilt on my own in Python.",
    title: "Vending Machine Web App",
    type: "Full-Stack Development",
    image: "/assets/images/vending-machine.avif",
    alt: "Screenshot of the Vending Machine app.",
    description:
        "Built as part of a backend engineering module at Tech Elevator. The original Java version was developed using Agile workflows and pair programming, after which I independently translated the full application into Python, re-implementing the architecture, logic, and transaction flow on my own. This CLI-based simulation highlights clean backend design, multi-language fluency, and the ability to refactor systems across stacks.",
    stack: ["Python", "Java", "CLI", "REST APIs"],
    links: {
      live: "",
      repo: "https://github.com/Lines248/vending_machine_webapp",
    },
    featured: false,
    category: "development",
  },
  {
    id: "nomin-eat",
    archived: true, // shown in the collapsed "Earlier work" list on /work
    caption: "Groups vote in real time on where to eat, with live Yelp data.",
    title: "NominEat - Full-Stack Group Voting Web App",
    type: "Java Spring Boot / PostgreSQL / Vue.js / Yelp Fusion API",
    image: "/assets/images/nomineat-cover.avif",
    alt: "Screenshot of the NominEat group voting web application.",
    description:
        "Designed and developed a full-stack web app that helps groups vote on where to eat. Users can create rooms, submit restaurant options, and vote in real time. Built with a Java backend, Vue front-end, PostgreSQL database, and the Yelp API for live restaurant data. Developed as my final capstone project at Tech Elevator, demonstrating end-to-end architecture, API integration, and a collaborative Agile workflow.",
    stack: ["Java", "JavaScript", "Vue", "PostgreSQL", "REST APIs", "YELP API"],
    links: {
      live: "",
      repo: "https://github.com/Lines248/TE-Capstone_",
    },
    featured: true,
    category: "development",
  },
  {
    id: "trust-circle",
    archived: true, // shown in the collapsed "Earlier work" list on /work
    caption: "Brand and responsive site for a live startup, built in Framer.",
    title: "Trust Circle",
    type: "UI/UX | Framer & Visual Identity",
    image: "/assets/images/trust-circle.webp",
    alt: "Trust Circle startup website mockup and visual identity",
    description:
        "Architecting a fully responsive visual identity and web production for a live startup using Framer.",
    stack: ["Framer", "UI/UX", "Brand", "Responsive Web", "Visual Identity"],
    links: {
      live: "https://www.trustcircle.work/",
    },
    featured: true,
    category: "ui-ux",
  },
];
