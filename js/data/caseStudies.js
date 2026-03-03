
export const caseStudies = {
  "vending-machine": {
    overview: `A logic-heavy CLI application rebuilt with modern Python architecture, improved readability, and a cleaner state machine.`,
    
    sections: [
      {
        title: "Overview",
        content: `<p>This project began as a Java command-line vending machine app built during a full-stack program. The goal was to implement the "Vendo-Matic 800," a machine that reads from an inventory file, tracks user balance, dispenses products, calculates change, and logs all transactions with timestamps.</p>
        
        <p>I later rebuilt the entire project in Python to modernize the architecture, improve readability, simplify testing, and produce a codebase that's easier to extend or wrap in a web interface.</p>
        
        <p>This refactor demonstrates my ability to:</p>
        <ul>
          <li>Reason about state-driven applications</li>
          <li>Translate logic between languages (Java → Python)</li>
          <li>Implement modular OOP patterns</li>
          <li>Handle money + precise arithmetic</li>
          <li>Isolate logic for testability</li>
          <li>Organize a project into clean, single-responsibility modules</li>
        </ul>`
      },
      {
        title: "The Original Java App",
        content: `<hr class="case-study-divider" aria-hidden="true" />

        <p>The original application:</p>
        <ul>
          <li>loaded inventory from a CSV file</li>
          <li>displayed all products (slot, name, price, quantity)</li>
          <li>allowed feeding whole-dollar amounts</li>
          <li>validated product codes + SOLD OUT conditions</li>
          <li>dispensed different categories with custom messages</li>
          <li>calculated change using the smallest number of coins</li>
          <li>logged every action to Log.txt with timestamps and before/after balances</li>
          <li>returned users to the main menu after every purchase</li>
          <li>optionally generated a detailed Sales Report</li>
        </ul>
        
        <p><strong>Pain points in the Java version:</strong></p>
        <ul>
          <li>verbose class structure</li>
          <li>nested conditionals for menu state</li>
          <li>business logic tightly coupled with console I/O</li>
          <li>difficult to test individual components</li>
          <li>more boilerplate than needed for simple actions</li>
        </ul>
        
        <p>These limitations made it an ideal project to rebuild the "Pythonic" way.</p>`
      },
      {
        title: "Goals for the Python Rewrite",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <p>When rebuilding the app in Python, I focused on:</p>
        <ul>
          <li>cleaner architecture with clear modules</li>
          <li>readable, expressive functions</li>
          <li>separating logic from UI for testability</li>
          <li>creating a predictable menu-driven state machine</li>
          <li>improving error handling + input validation</li>
          <li>maintaining all required vending machine behaviors from the Java version</li>
        </ul>
        
        <p><strong>Final file structure:</strong></p>
        <pre class="case-study-code"><code>vending_machine/
  ├── product.py
  ├── inventory.py
  ├── vending_machine.py
  ├── menu.py
  ├── utils.py
  └── tests/</code></pre>`
      },
      {
        title: "Key Improvements (Java → Python)",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <ul>
          <li>Replaced getters/setters with simple Python classes</li>
          <li>Swapped inheritance for composition to keep objects easier to reason about</li>
          <li>Rewrote switch/case logic using readable if/elif flows</li>
          <li>Centralized all money + change logic in utils.py</li>
          <li>Created a dedicated transaction loop to manage all states predictably</li>
          <li>Improved error handling for:
            <ul>
              <li>invalid money input</li>
              <li>invalid slot codes</li>
              <li>SOLD OUT items</li>
            </ul>
          </li>
          <li>Reduced console I/O to a thin layer → most code is now fully testable</li>
          <li>Increased clarity and reduced code volume by ~40–60%</li>
        </ul>`
      },
      {
        title: "Technical Challenges & How I Solved Them",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <h3>1. Translating inheritance-heavy Java logic</h3>
        <p>The Java version used deep class structures. I replaced this with small, composable classes (Product, Inventory) that keep behavior simple, predictable, and easy to extend.</p>
        
        <h3>2. Money handling without Java's BigDecimal</h3>
        <p>Floating-point money can be risky.</p>
        <p>I used integer cents / explicit rounding to ensure:</p>
        <ul>
          <li>feeding money updates balances consistently</li>
          <li>purchases subtract correctly</li>
          <li>change returns clean values</li>
          <li>logs show precise monetary amounts</li>
        </ul>
        
        <h3>3. Managing inventory + stock state</h3>
        <p>The machine must track product depletion slot-by-slot.</p>
        <p>Python's dictionaries and a clean Inventory class made this easier:</p>
        <ul>
          <li>load from CSV</li>
          <li>store as objects</li>
          <li>decrement only when purchase is valid</li>
          <li>expose a simple lookup function for slot codes</li>
        </ul>
        
        <h3>4. Preserving logging behavior</h3>
        <p>Every action must mirror the Java spec:</p>
        <pre class="case-study-code"><code>DATE TIME ACTION $AMOUNT $REMAINING_BALANCE</code></pre>
        <p>I created a small logger that:</p>
        <ul>
          <li>formats timestamps</li>
          <li>writes lines consistently</li>
          <li>captures before/after balances</li>
          <li>mirrors the original grading requirements</li>
        </ul>`
      },
      {
        title: "What I'm Most Proud Of",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <ul>
          <li>The transaction loop, which now reads cleanly and is easy to debug</li>
          <li>The Product / Inventory abstraction, which organizes stock logic clearly</li>
          <li>The change-calculation utility, which always returns the fewest coins</li>
          <li>The logging pipeline, which matches the strict bootcamp specification</li>
          <li>The overall readability + architecture, which is now interview-friendly code I can walk through confidently</li>
        </ul>`
      },
      {
        title: "Results",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <ul>
          <li>A significantly cleaner, more maintainable codebase</li>
          <li>Far easier to extend with new product types or behaviors</li>
          <li>Logic that is now ready to be wrapped in a web UI or API</li>
          <li>A strong example of:
            <ul>
              <li>state management</li>
              <li>refactoring</li>
              <li>OOP in two languages</li>
              <li>CLI design</li>
              <li>technical communication</li>
            </ul>
          </li>
        </ul>`
      }
    ],
    
    codeSnippet: {
      title: "Code Example: Change Calculation",
      description: "Helper function that calculates change using the fewest coins possible",
      code: `def calculate_change(balance_cents):
    coins = {}
    for coin_value, coin_name in [(25, 'quarters'), (10, 'dimes'), (5, 'nickels')]:
        count, balance_cents = divmod(balance_cents, coin_value)
        coins[coin_name] = count
    return coins`
    }
  },
  "nomin-eat": {
    overview: ``,

    sections: [
      {
        title: "The Challenge",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <p>Groups often struggle to reach a consensus on dining options. As my capstone project at Tech Elevator, I built NominEat to centralize restaurant discovery and real-time group voting into a seamless full-stack application.</p>`
      },
      {
        title: "The Engineering Solution (Java Backend)",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <p>I engineered a robust <strong>REST API</strong> using <strong>Java</strong> and <strong>Spring Boot</strong> to handle complex business logic and data persistence.</p>
        <ul>
          <li><strong>External API:</strong> Implemented a service layer to interface with the Yelp Fusion API for live restaurant data.</li>
          <li><strong>Data Persistence:</strong> Designed a PostgreSQL schema to manage users, restaurant selections, and transactional voting data.</li>
        </ul>`
      },
      {
        title: "Java Controller (Code)",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <figure class="case-study-screenshot">
          <div class="case-study-screenshot-placeholder" aria-hidden="true">
            <span>Java RestaurantController search method</span>
          </div>
          <figcaption>RestaurantController: bridge between Yelp API and custom schema.</figcaption>
        </figure>`
      },
      {
        title: "The UI Solution (Vue Frontend)",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <p>Built a reactive, state-driven frontend using <strong>Vue.js</strong> to provide users with real-time feedback during the voting lifecycle.</p>
        <ul>
          <li><strong>State Management:</strong> Utilized Vuex (or local state) to maintain consistency between the API results and the user interface.</li>
        </ul>`
      },
      {
        title: "Technical Flex",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <ul class="tech-stack-grid" role="list">
          <li class="tag-backend">RESTful API Design</li>
          <li class="tag-backend">Relational Database Mapping (DAO)</li>
          <li class="tag-backend">External API Integration</li>
        </ul>`
      },
      {
        title: "PostgreSQL Schema (Results)",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <figure class="case-study-screenshot">
          <div class="case-study-screenshot-placeholder" aria-hidden="true">
            <span>PostgreSQL schema / query results</span>
          </div>
          <figcaption>Database schema for users, restaurant selections, and voting data.</figcaption>
        </figure>`
      },
      {
        title: "The Transition Narrative",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <p>My background in physical fabrication taught me to troubleshoot complex systems step-by-step. I bring that same <strong>systems-thinking</strong> approach to my code, ensuring that every backend endpoint and frontend component serves a clear, accessible purpose.</p>`
      }
    ]
  },
  "accex": {
    overview: ``,

    sections: [
      {
        title: "Context & Objective",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <p>ACCEX isn't just a <strong>color checker</strong>; it's a sandbox for understanding <strong>digital inclusion</strong>. I built this to bridge the gap between high-level <strong>color theory</strong> and the strict requirements of <strong>WCAG 2.2 accessibility standards</strong>. The goal was to create a <strong>reactive tool</strong> where users learn accessibility through exploration.</p>`
      },
      {
        title: "Implementation / Technical Flexes",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <ul>
          <li><strong>State persistence:</strong> Integrated <strong>local storage</strong> and <strong>reactive state</strong> so selections remain consistent across sessions, encouraging long-term experimentation.</li>
          <li><strong>Color theory logic:</strong> Leveraged my background in fine arts to implement <strong>contrast algorithms</strong> that go beyond simple Pass/Fail metrics.</li>
          <li><strong>Clean architecture:</strong> Built with a <strong>modular component structure</strong> (Vite + JavaScript) for maximum performance and a <strong>sub-100ms load time</strong>.</li>
        </ul>`
      },
      {
        title: "Fine Art Tidbit",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <p>In the studio, I learned that <strong>color is never static</strong>, it's always relative to what's next to it. ACCEX is the <strong>digital extension</strong> of that lesson. It's my way of ensuring that <strong>aesthetic choices</strong> never come at the cost of a user's ability to actually see and use the web.</p>`
      }
    ]
  },
  "ia-studio": {
    overview: "A multi-user SaaS platform engineered to securely host and present premium digital assets. Built with Next.js 15, React 19, and strict TypeScript, it features role-based access controls and a fully type-safe data mutation pipeline.",
    sections: [
      {
        title: "Context & Architecture",
        content: `<figure class="case-study-screenshot" style="margin-bottom: 2.5rem;">
  <img src="assets/images/ia-desktop.jpg" alt="Desktop browser view of the secure Admin Console dashboard" loading="lazy" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
</figure>
        <p><strong>Goal:</strong> To architect a highly secure, data-driven web application capable of serving gated digital assets to unauthenticated clients, while providing a robust administrative dashboard for tenant operators.</p>
        <p>The application relies on the Next.js App Router to enforce strict boundaries between Server Components (for optimized database querying) and Client Components (for complex, interactive UI). The entire codebase is written in strict TypeScript to ensure predictability and scalability.</p>
        <ul class="tech-stack-grid" role="list">
          <li class="tag-frontend">React 19</li>
          <li class="tag-frontend">Next.js 15</li>
          <li class="tag-backend">TypeScript</li>
          <li class="tag-backend">PostgreSQL</li>
          <li class="tag-backend">Zod</li>
        </ul>`
      },
      {
        title: "Secure Authentication & User Journeys",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <p>Managing access to premium digital assets requires rigorous security flows. I bypassed out-of-the-box auth libraries to engineer a custom authentication and gating system using <code>bcryptjs</code> and secure <code>httpOnly</code> cookies.</p>
        <ul>
          <li><strong>Role-Based Access:</strong> Constructed an administrative shell for operators to manage their asset inventory, alongside a cleanly separated, secure presentation layer for end-users.</li>
          <li><strong>Cryptographic Gating:</strong> Implemented a hashed access-code system allowing clients to securely view specific digital presentations without requiring full user accounts.</li>
        </ul>
        <figure class="case-study-screenshot" style="margin: 2.5rem 0; text-align: center;">
  <img src="assets/images/ia-architecture.png" alt="System architecture flowchart showing Next.js Edge Middleware intercepting unauthenticated requests and routing them through a Bcrypt hash check before securely fetching data from PostgreSQL." loading="lazy" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; background: transparent;" />
  <figcaption>Secure middleware intercepts and validates sessions before exposing the presentation layer.</figcaption>
</figure>`
      },
      {
        title: "Type-Safe Data & Complex State",
        content: `<p>To guarantee data integrity across the platform, I implemented an end-to-end type-safe mutation pipeline. By pairing Next.js Server Actions with Zod schemas, the application seamlessly validates form data via <code>react-hook-form</code> on the client side, while simultaneously securing the backend before any writes hit the PostgreSQL database.</p>
        <p>For the administrative interface, I managed complex client-side state using TanStack Table. This architecture allows for lightning-fast sorting, filtering, and pagination of extensive digital asset inventories without triggering redundant network requests.</p>`
      }
    ],
    codeSnippet: {
      title: "Type-Safe Server Action Pipeline",
      description: "Utilizing Zod to validate client inputs and infer strict TypeScript interfaces before interacting with the database.",
      code: `'use server'
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
const assetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive(),
  status: z.enum(['available', 'reserved', 'sold'])
});

export async function createDigitalAsset(data: z.infer<typeof assetSchema>) {
  const parsed = assetSchema.safeParse(data);

  if (!parsed.success) return { error: 'Invalid asset data.' };

  const supabase = await createClient();
  const { error } = await supabase.from('inventory').insert(parsed.data);

  return error ? { error: error.message } : { success: true };
}`,
      minimal: false
    }
  },
  "inline-access": {
    overview: `This site is a functional demonstration of first-principles UI engineering and state management. I built it to explore how a custom, zero-dependency engine can handle complex theme logic and architectural layouts without the overhead of a modern framework.`,

    sections: [
      {
        title: "The Challenge",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <p>Standard portfolio templates often prioritize visual flair over structural integrity and performance. I needed a platform that could maintain a strict mathematical rhythm while managing three distinct visual environments and high-level accessibility requirements.</p>`
      },
      {
        title: "The Solution",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <figure class="case-study-screenshot" style="margin-bottom: 2.5rem;">
          <img src="assets/images/portfolio-site-mobile.avif" alt="Mobile responsive view of the portfolio website" loading="lazy" style="max-width: 100%; width: 420px; height: auto; display: block;" />
        </figure>
        <p>I engineered a lightweight system using Vanilla JavaScript to drive a tri-state theme ecosystem. By centering the entire build around an 8pt grid and the Intersection Observer API, the site remains stable, inclusive, and fast across all viewports.</p>`
      },
      {
        title: "Real Inclusion",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        <p>Accessibility isn't an afterthought here. I engineered the color pairings to meet high-contrast standards across all three themes and added support for reduced-motion preferences. It is about making sure the digital space is usable for everyone.</p>`
      }
    ],

    codeSnippet: {
      title: "Theme cycler",
      description: null,
      minimal: true,
      code: `// Vanilla JS Theme Cycler
const themes = ['light', 'nature', 'dark'];
const cycleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = themes[(themes.indexOf(current) + 1) % themes.length];
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
};`
    }
  }
};

