
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
  }
};

