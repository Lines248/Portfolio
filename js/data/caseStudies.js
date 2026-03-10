export const caseStudies = {
  "ia-studio": {
    id: "ia-studio",
    title: "InLine Access Studio",
    subtitle: "A secure, high-performance digital viewing platform for protected assets.",
    roles: ["Product Designer", "Full-Stack Engineer", "Project Manager"],
    context: "Founder / Lead Developer",
    sections: [
      {
        heading: "The Problem & The Solution",
        body: "<p><strong>The Problem:</strong> Sharing secure digital files usually forces clients to create accounts and remember passwords, adding significant friction to the user experience.</p><p><strong>The Solution:</strong> A custom Next.js application that separates secure server operations from the user interface. Instead of full account logins, it uses secure hashed access codes to grant entry to specific gated viewing environments.</p>",
        media: []
      },
      {
        heading: "Data Verification Pipeline",
        body: "<p>To ensure data integrity without sacrificing usability, I built a dual-layer verification pipeline using Next.js Server Actions and Zod. The application validates form data on the front-end as the user types, providing instant, zero-latency feedback that eliminates frustrating form-submission errors. A secondary validation layer then secures the data on the back-end before it reaches the PostgreSQL database, protecting business logic without compromising the seamless user experience.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/ia-studio-architecture.svg",
            caption: "System architecture mapping the data lifecycle from client-side input to secure PostgreSQL mutation."
          }
        ]
      },
      {
        heading: "Evaluative Research & Iteration",
        body: "<p>Balancing complex business objectives with a frictionless end-user experience required a rigorous, data-driven approach. During the initial prototyping phase, I conducted targeted focus groups and A/B tests to gather qualitative feedback on the gated viewing flow.</p><p>To track quantitative performance without compromising security, I integrated Clarity analytics directly into the application architecture. Analyzing live user sessions and heatmaps allowed me to rapidly identify UX friction points and iterate on the interface.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/ia-studio-user-flow.svg",
            caption: "Abstracted user flow mapping the secure authentication sequence and quantitative data tracking points."
          }
        ]
      },
      {
        heading: "Outcome & Impact",
        body: "<ul><li><strong>Friction Reduction:</strong> Successfully reduced end-user access friction by eliminating traditional account registration, resulting in a 100% successful authentication rate during the initial pilot phase.</li><li><strong>Operational Efficiency:</strong> Streamlined the asset-sharing workflow for platform administrators, significantly reducing the time required to manage and distribute secure digital assets.</li><li><strong>Data-Driven Iteration:</strong> Leveraged quantitative session data to identify and resolve a key navigation bottleneck, ensuring the platform remains intuitive for both administrators and invited end-users.</li></ul>",
        media: []
      }
    ]
  },

  "nomin-eat": {
    meta: {
      role: "Front-End Lead",
      year: "2026",
      stack: ["Vue 3", "Java Spring Boot", "PostgreSQL", "Yelp API"]
    },
    overview: "An interactive web application designed to eliminate the friction of group decision-making. By providing a shared, real-time voting room, it turns the often stressful process of picking a restaurant into a quick and fair consensus.",
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
        content: "<p>When an organizer enters a ZIP code, the Java Spring Boot backend requests data from the Yelp API. Instead of making constant calls to Yelp, it saves this data to a local PostgreSQL database. This allows the voting session to run quickly and reliably from local storage.</p>"
      }
    ]
  },

  "accex": {
    meta: {
      role: "Front-End Engineer",
      year: "2026",
      stack: ["Vue 3", "Vite", "Pinia", "Vanilla CSS"]
    },
    overview: "A digital inclusion tool that helps teams build websites everyone can easily read and navigate. It removes the guesswork from visual design by instantly testing color choices against global accessibility standards.",
    featuredDiagram: {
      src: "/assets/images/accex-architecture.svg",
      alt: "Data Flow architecture for ACCEX."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Checking color contrast usually requires designers and developers to leave their work environment and use an external website or sandbox.</p><p><strong>The Solution:</strong> A Vue 3 application that calculates WCAG compliance instantly as users type. It uses a clean data flow to run accessibility math without slowing down the browser.</p>"
      },
      {
        image: {
          src: "/assets/images/accex.avif",
          alt: "User Interface of ACCEX showing the live CSS injection."
        },
        title: "Live CSS Updates",
        content: "<p>Instead of showing a small preview window, the application applies the selected colors to the entire website interface in real time. It does this by updating CSS custom properties directly on the document root, turning the tool itself into a live accessibility demonstration.</p>"
      }
    ]
  },

  "vending-machine": {
    meta: {
      role: "Backend Engineer",
      year: "2026",
      stack: ["Python", "Java", "CLI", "File I/O"]
    },
    overview: "A reliable backend engine built to handle precise financial transactions and track inventory over time. It demonstrates how to safely process money, prevent calculation errors, and keep strictly accurate audit records.",
    featuredDiagram: {
      src: "/assets/images/vending-machine-architecture.svg",
      alt: "System architecture diagram for the Vending Machine."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Older monolithic applications often mix the user menu with the core math logic. This makes the code difficult to test and update over time.</p><p><strong>The Solution:</strong> I refactored a legacy Java application into a modern Python structure. I separated the command-line interface from the transaction math and inventory management so the core logic can be tested in isolation.</p>"
      },
      {
        image: {
          src: "/assets/images/vending-machine.avif",
          alt: "CLI output of the Vending Machine audit log."
        },
        title: "Precision Math & Auditing",
        content: "<p>Handling financial transactions in code requires careful math to prevent rounding errors. The application converts all currency to integers (cents) during calculations. Additionally, every machine state change writes to an external text file to meet standard auditing requirements.</p>"
      }
    ]
  },

  "inline-access": {
    meta: {
      role: "Front-End Engineer",
      year: "2026",
      stack: ["Vanilla JS", "CSS3", "HTML5"]
    },
    overview: "A custom-built website engineered from the ground up to prioritize speed and energy efficiency. By stripping away heavy third-party code, it delivers information instantly while adapting perfectly to the user's device preferences.",
    featuredDiagram: {
      src: "/assets/images/portfolio-architecture.svg",
      alt: "System architecture diagram for the Portfolio Site."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Modern web frameworks like React are powerful, but they can be heavy and slow down simple websites.</p><p><strong>The Solution:</strong> A custom Vanilla JavaScript engine that loads content dynamically. It manages page routing and themes without relying on a backend server or complex build tools.</p>"
      },
      {
        title: "Performance & Themes",
        content: "<p>The site uses CSS variables and local browser storage to manage light and dark modes. The JavaScript prioritizes rendering the user's preferred theme before the screen even paints. This prevents the website from flashing bright white before loading the dark theme.</p>"
      },
      {
        title: "Portfolio in Practice",
        image: {
          src: "/assets/images/portfolio-site.avif",
          alt: "This portfolio site showcasing the 3-theme design system and responsive layout."
        },
        content: "<p>This portfolio is the project—a first-principles UI engine with a custom 3-theme design system, 8pt grid, and zero-dependency architecture.</p>"
      }
    ]
  },
  /* New schema: id, title, subtitle, roles, context, sections (heading, body, media[]). See js/types/caseStudy.d.ts */
  "deroche-projects": {
    id: "deroche-projects",
    title: "DeRoche Projects",
    subtitle: "Translating an architectural 'drawing board' concept into a dense, high-performance digital portfolio.",
    roles: ["Information Architect", "UI/UX Designer", "Creative Technologist"],
    context: "Contracted via Digital Counsel",
    sections: [
      {
        heading: "The Problem & The Solution",
        body: "<p><strong>The Problem:</strong> The client needed to display a massive, dense archive of architectural work without the interface feeling cluttered or overwhelming to the user.</p><p><strong>The Solution:</strong> I engineered a deterministic, three-tier responsive grid system in Figma. By strictly pinning every component and spacing value to an 8pt grid, the design handles a high density of visual data with perfect alignment across all viewports.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/deroche-grid-system.avif",
            caption: "Managing complex column logic with a 12/4 mobile-to-desktop transition, allowing users to switch between [SM], [MD], and [LG] scales."
          }
        ]
      },
      {
        heading: "State Logic & Interactive Filtering",
        body: "<p>The goal was to make the portfolio function like an interactive architectural workspace rather than a static webpage. I mapped out the logic for how the UI responds to user intent, collaborating closely with the development team to translate complex archival needs into a robust data-sorting system. The interface allows users to filter the archive by Location, Type, and Completion, or sort the view by Random, Scale, and Chronological order, while a global project index provides instant access to isolate specific collections.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/deroche-interaction.avif",
            caption: "Multi-level hover and selection states provide immediate feedback, ensuring a 1:1 translation from the modular Figma library to production code."
          }
        ]
      },
      {
        heading: "Contextual Lightbox Viewing",
        body: "<p>To balance the dense, data-heavy index with focused viewing, I designed a high-opacity lightbox experience. This isolates specific project details and media while keeping the broader 'drawing board' context visible in the background, bridging the gap between macro and micro navigation.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/deroche-lightroom.avif",
            caption: "Active visual translation—ensuring the front-end layout perfectly mirrors the backend data structure of the archive."
          }
        ]
      }
    ]
  },
};