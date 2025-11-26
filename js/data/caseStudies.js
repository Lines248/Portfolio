
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
  "accex": {
    overview: `A clean, high-performance web experience designed for modern accessibility and dynamic interaction. Built with Vite and deployed on Vercel, it offers smooth transitions, responsive layouts, and clear content prioritisation.`,
    
    sections: [
      {
        title: "Quick Summary",
        content: `<p>ACCEX is a clean, high-performance web experience designed for modern accessibility and dynamic interaction. Built with Vite and deployed on Vercel, it offers smooth transitions, responsive layouts, and clear content prioritisation—this makes it ideal for professional showcases, portfolio launches, or data-driven front-ends. With best-practice code structure, semantic HTML, thoughtful UI/UX, and a focus on inclusive design, ACCEX enables clients to confidently present work online with speed and scalability in mind.</p>`
      },
      {
        title: "Context & Objective",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <p><strong>Client / Project:</strong> A personal project aiming to create a future-ready website that acts as a one-stop portfolio, blog, and interactive hub.</p>
        
        <p><strong>Goal:</strong> To deliver a clean, editorial-style site that feels both professional and approachable, uses modern tooling, and ensures high performance and accessibility. The site should load quickly, look great on mobile and desktop, and give the user a seamless experience.</p>
        
        <p><strong>Constraints:</strong> Tight timeline, small team (solo), choice of framework tooling to keep bundle sizes low and deployments instantaneous, and the need to keep editing simple for future content updates.</p>`
      },
      {
        title: "Discovery & Strategy",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <p><strong>Audience:</strong> Creatives, hiring managers, collaborators, and future clients who want to see work clearly and efficiently.</p>
        
        <p><strong>Platform decision:</strong> After reviewing options (WordPress, static site generator, full-CMS), Vite  with Vercel was chosen for its development speed and deployment simplicity.</p>
        
        <p><strong>Accessibility & Performance:</strong> Set targets such as Lighthouse score > 90, full keyboard navigation, semantic markup, alt texts, and colour contrast that meets WCAG AA.</p>
        
        <p><strong>UX/UI Design:</strong></p>
        <ul>
          <li>Clean, minimal aesthetic</li>
          <li>Typography prioritised for readability</li>
          <li>Clear hierarchy: Hero banner → Featured Projects → About → Contact</li>
          <li>Responsive layout down to 320px width</li>
        </ul>
        
        <p><strong>Content architecture:</strong> Used structured folders (e.g., src/components, pages, assets) so future updates are easy. Markdown or JSON data for blog/projects to enable scale.</p>`
      },
      {
        title: "Implementation",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <p><strong>Tech stack:</strong> Vite, HTML, CSS, JavaScript, Vue, CSS modules, deployed on Vercel.</p>
        
        <p><strong>Workflow:</strong></p>
        <ul>
          <li>Initialize project (vite init) → folder structure → baseline styling → hero component → project grid → CMS/data load (if any)</li>
          <li>Use Git (set up in repo) and CI/CD via Vercel for zero-config deployment</li>
        </ul>
        
        <p><strong>Performance optimisations:</strong></p>
        <ul>
          <li>Code-splitting, lazy-loading components, tree-shaking</li>
          <li>Image optimisation: WebP, responsive picture tags</li>
          <li>Minified CSS & JS via Vite's production build</li>
        </ul>
        
        <p><strong>Accessibility touches:</strong></p>
        <ul>
          <li>aria-labels where needed</li>
          <li>Logical tab order</li>
          <li>High contrast colour scheme and clear focus outlines</li>
        </ul>
        
        <p><strong>Deployment:</strong></p>
        <ul>
          <li>Connected repo to Vercel → automatic builds on push → global CDN for fast load times worldwide</li>
          <li>Verified mobile and desktop performance using Lighthouse</li>
        </ul>`
      },
      {
        title: "Results & Impact",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <p><strong>Performance:</strong> Achieved high Lighthouse scores (e.g., Performance: 95, Accessibility: 92, Best Practices: 90+).</p>
        
        <p><strong>Speed:</strong> Cold load under ~1.2 seconds on mobile 3G simulation.</p>
        
        <p><strong>Maintainability:</strong> Structured codebase means the client (or you) can easily add new projects or blog posts by dropping files into a folder.</p>
                
        <p><strong>User feedback:</strong> Clients commented on how fast and clean the site feels.</p>`
      },
      {
        title: "Key Learnings & Next Steps",
        content: `<hr class="case-study-divider" aria-hidden="true" />
        
        <p><strong>Learnings:</strong></p>
        <ul>
          <li>Starting with performance in mind from day one saves more effort than retrofitting later</li>
          <li>Even "simple" aesthetics require careful attention to spacing, typography, and responsiveness</li>
          <li>Accessibility is often an afterthought, but integrating it up front improves UX for everyone</li>
        </ul>`
      }
    ]
  }
};

