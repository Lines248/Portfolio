export const caseStudies = {
  "ia-studio": {
    id: "ia-studio",
    title: "Secure Client Portal for Art Galleries",
    subtitle: "A secure portal where each gallery client sees only their own works, with AI curation from the gallery's own inventory. Built with Next.js, React and TypeScript.",
    roles: ["Design", "Full-Stack Development"],
    context: "Founder",
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Stripe"],
    featuredDiagram: {
      src: "/assets/images/ia-studio-user-flow.svg",
      alt: "IA Studio user flow diagram mapping the secure authentication sequence and data tracking points."
    },
    metrics: [
      { label: "6ms Auth Response", anchor: "performance-proof" },
      { label: "WebP Optimized", anchor: "performance-proof" }
    ],
    sections: [
      {
        heading: "The Problem & The Solution",
        body: "<p><strong>The Problem:</strong> Galleries need to show private work to specific clients, and keep everyone else out.</p><p><strong>The Solution:</strong> A Next.js app where each client signs in with an email and password and sees only the works the gallery chose for them. Sign-in and data changes run on the server, and the database only returns each client's own records.</p>",
        media: [{ type: "image", src: "/assets/images/ia-ui-portal.webp", caption: "The sign-in screen gallery clients see first.", className: "case-study-media--large" }]
      },
      {
        heading: "Checking the Data",
        body: "<p>Every form is checked twice with Zod. First in the browser as the person types, so they see mistakes right away. Then again on the server in a Next.js Server Action, before anything is saved to the PostgreSQL database.</p>",
        media: [{ type: "image", src: "/assets/images/ia-studio-architecture.svg", caption: "How data moves from a form to the database." }]
      },
      {
        heading: "Sign-In Flow",
        body: "<p>I mapped the sign-in flow before building it, from the first screen to a client's private viewing room.</p>",
        media: [
          { type: "image", src: "/assets/images/ia-studio-user-flow.svg", caption: "The sign-in flow." }
        ]
      },
      {
        id: "performance-proof",
        heading: "Performance",
        body: "<p>Sign-in responds in about 6ms in production. Next.js serves gallery images as WebP, so each one comes in at around 40kB.</p>",
        media: [
          {
            type: "stats",
            items: [
              { value: "6 ms", label: "Secure sign-in response (Next.js Server Action)" },
              { value: "~40 kB", label: "Gallery image delivered as optimized WebP" }
            ],
            caption: "Measured in production network logs."
          }
        ]
      }
    ]
  },

  "nomin-eat": {
    meta: {
      role: "Front-End Lead",
      year: "2024",
      stack: ["Vue 3", "Java Spring Boot", "PostgreSQL", "Yelp API"]
    },
    overview: "A group voting app for picking a restaurant. The organizer starts a room, everyone else joins from a link, and the app counts the votes as they come in.",
    featuredDiagram: {
      src: "/assets/images/Nomineat.svg",
      alt: "System architecture diagram for NominEat."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Group decisions are slow and require too much back and forth. Existing tools often require everyone to download an app or make an account just to cast a vote.</p><p><strong>The Solution:</strong> A voting system where only the organizer needs an account. Attendees join via a simple web link. The application handles the real-time voting and tallies the results.</p>"
      },
      {
        title: "Local Data Caching",
        content: "<p>When an organizer enters a ZIP code, the Java Spring Boot backend requests data from the Yelp API. Instead of making constant calls to Yelp, it saves this data to a local PostgreSQL database. That way the vote runs from our own database and does not wait on Yelp.</p>"
      }
    ]
  },

  "accex": {
    meta: {
      role: "Front-End Engineer",
      year: "2025",
      stack: ["Vue 3", "Vite", "Pinia", "CSS"]
    },
    overview: "A color contrast checker. Pick a text color and a background color, and it tells you right away if they pass WCAG 2.2.",
    featuredDiagram: {
      src: "/assets/images/accex-architecture.svg",
      alt: "Data Flow architecture for ACCEX."
    },
    metrics: [
      { label: "100 Accessibility", anchor: "a11y-proof" },
      { label: "WCAG 2.2 AA", anchor: "a11y-proof" }
    ],
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Checking color contrast usually requires designers and developers to leave their work environment and use an external website or sandbox.</p><p><strong>The Solution:</strong> A Vue 3 app that checks the contrast as you type, with the color math kept in one Pinia store.</p>"
      },
      {
        title: "Live CSS Updates",
        content: "<p>Instead of a small preview box, the colors you pick are applied to the whole page right away. It works by updating CSS custom properties on the page root, so the tool shows you its own result.</p>"
      },
      {
        id: "a11y-proof",
        heading: "Accessibility & Validation",
        body: "<ul><li><strong>Lighthouse:</strong> 100 for accessibility.</li><li><strong>Keyboard:</strong> I tested every control without a mouse. Focus stays inside a dialog while it is open and never gets stuck anywhere else.</li><li><strong>Contrast:</strong> All text in the app meets WCAG 2.2 AA (4.5:1).</li></ul>",
        media: [
          { type: "scores", items: [{ label: "Accessibility", value: 100 }], caption: "Lighthouse accessibility audit." }
        ]
      }
    ]
  },

  "vending-machine": {
    meta: {
      role: "Backend Engineer",
      year: "2024",
      stack: ["Python", "Java", "CLI", "File I/O"]
    },
    overview: "A command-line vending machine. It tracks inventory, takes money, makes change and logs every transaction. I wrote it in Java with a team, then rebuilt it in Python on my own.",
    featuredDiagram: {
      src: "/assets/images/vending-machine-architecture.svg",
      alt: "System architecture diagram for the Vending Machine."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> When the menu and the money math live in the same code, it is hard to test either one.</p><p><strong>The Solution:</strong> When I rebuilt it in Python, I split the command-line menu from the money and inventory logic, so the core logic can be tested on its own.</p>"
      },
      {
        image: {
          src: "/assets/images/vending-machine.avif",
          alt: "CLI output of the Vending Machine audit log."
        },
        title: "Money Math and Logging",
        content: "<p>Money is stored in cents as whole numbers, so there are no rounding errors. Every purchase and change to the machine is written to a log file.</p>"
      }
    ]
  },

  "inline-access": {
    meta: {
      role: "Front-End Engineer",
      year: "2026",
      stack: ["Vanilla JS", "CSS3", "HTML5"]
    },
    overview: "I built this site from scratch in plain JavaScript, HTML and CSS, without a framework, so it loads fast and follows your device settings.",
    featuredDiagram: {
      src: "/assets/images/portfolio-architecture.svg",
      alt: "System architecture diagram for the Portfolio Site."
    },
    metrics: [
      { label: "100 Lighthouse", anchor: "proof-section" },
      { label: "Clarity Validated", anchor: "proof-section" }
    ],
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> A portfolio is a simple site, and it does not need a big framework to run.</p><p><strong>The Solution:</strong> Plain JavaScript that loads the content, handles page routing and switches themes, with no build tools or backend.</p>",
        media: [{ type: "image", src: "/assets/images/portfolio-architecture.svg", caption: "System architecture diagram for the Portfolio Site." }]
      },
      {
        heading: "Themes and Layout",
        body: "<p>The site has three themes (light, dark and nature), all on an 8pt grid. Theme colors are CSS variables, and your choice is saved in the browser. The saved theme loads before the page draws, so it never flashes white first.</p>",
        media: []
      },
      {
        id: "proof-section",
        heading: "Testing",
        body: "<p>The site scores 100 in all four Lighthouse categories. I also use Microsoft Clarity to see where people click, and I adjust the layout from that.</p>",
        media: [
          {
            type: "scores",
            items: [
              { label: "Performance", value: 100 },
              { label: "Accessibility", value: 100 },
              { label: "Best Practices", value: 100 },
              { label: "SEO", value: 100 }
            ],
            caption: "Lighthouse audit of this site."
          }
        ]
      }
    ]
  },
  /* New schema: id, title, subtitle, roles, context, sections (heading, body, media[]). See js/types/caseStudy.d.ts */
  "deroche-projects": {
    id: "deroche-projects",
    title: "DeRoche Projects",
    subtitle: "A portfolio site design for an architecture firm, built around the idea of a drawing board.",
    roles: ["Information Architect", "UI/UX Designer", "Creative Technologist"],
    context: "Contracted via Digital Counsel",
    sections: [
      {
        heading: "The Problem & The Solution",
        body: "<p><strong>The Problem:</strong> The firm had a large archive of work to show, and it still needed to feel easy to look through.</p><p><strong>The Solution:</strong> I designed a responsive grid in Figma with three sizes. Every component and space sits on an 8pt grid, so the layout lines up on any screen.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/deroche-grid-system.avif",
            caption: "The grid goes from 4 columns on mobile to 12 on desktop, and people can switch between small, medium and large views."
          },
          {
            type: "image",
            src: "/assets/images/deroche-tablet.avif",
            caption: "The grid and archive on a tablet."
          }
        ]
      },
      {
        heading: "Filtering and Sorting",
        body: "<p>I mapped out how the site responds when someone filters or sorts, and worked with the developers to turn the archive into data the site could sort. People can filter by location, type and completion, sort by random, scale or date, and jump to any project from an index.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/deroche-interaction.avif",
            caption: "Hover and selected states, built to match the Figma components."
          }
        ]
      },
      {
        heading: "Lightbox",
        body: "<p>Clicking a project opens it in a lightbox. The project fills the screen, and the archive stays faintly visible behind it so people do not lose their place.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/deroche-lightroom.avif",
            caption: "A project open in the lightbox."
          }
        ]
      }
    ]
  },

  "n8n-automations": {
    id: "n8n-automations",
    title: "n8n Automations",
    subtitle: "Three workflows I built in n8n to cut down on busywork.",
    roles: ["Workflow design", "Automation", "AI agents"],
    context: "Personal project",
    sections: [
      {
        heading: "Security questionnaire helper",
        body: "<p>Security questionnaires come up in a lot of sales deals, and most of the answers have already been written somewhere. This workflow drafts them.</p><p>Someone pastes in the questions. The workflow pulls the approved answers from Notion, and the AI drafts each answer from those, with a note on which one it used. If none of them fit, it doesn't make one up. It marks the question \"Needs a human.\" Every question goes into a review queue in Notion, and nothing goes to the customer until a person checks it.</p>",
        media: []
      },
      {
        heading: "Email and forms",
        body: "<p>The email workflow reads each new email and gives it a label: needs a reply, to read later or newsletter. It only labels. It doesn't reply, forward or delete anything, and if it isn't sure, it picks to read later.</p><p>The form workflow takes a submission, cleans up the name and email, and makes a new page in Notion.</p>",
        media: []
      },
      {
        heading: "Error alerts",
        body: "<p>If any of the three workflows fails, I get an email telling me which one, which step broke and why.</p>",
        media: []
      },
      {
        heading: "How I approach it",
        body: "<p>I do a task by hand a few times before I automate it, so I know every step. Then I build it piece by piece and check the results. I keep the AI's part small, and a person still makes the real decisions.</p>",
        media: []
      }
    ]
  },
  "trust-circle": {
    id: "trust-circle",
    title: "Trust Circle",
    subtitle: "Architecting a fully responsive visual identity and web production for a live startup using Framer.",
    roles: ["UI/UX Designer", "Brand & Visual Designer", "Web Producer"],
    context: "Live startup",
    sections: [
      {
        heading: "Scope & outcomes",
        body: "<ul><li>Led the end-to-end web production and branding for a live startup, designing the visual identity and translating it into a fully responsive site using Framer.</li><li>Managed all digital assets, typography, and graphic elements to ensure strict visual consistency and a highly polished user experience.</li></ul>",
        media: []
      }
    ]
  },
};