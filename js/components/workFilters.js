import { projects } from "../data/projects.js";
import { renderProjects } from "../renderProjects.js";

export class WorkFilters {
  constructor() {
    this.selectedCategory = "all";
    this.selectedStacks = [];
    this.allStacks = this.getAllStacks();
  }

  getAllStacks() {
    const stacks = new Set();
    projects.forEach(project => {
      project.stack.forEach(stack => stacks.add(stack));
    });
    return Array.from(stacks).sort();
  }

  init() {
    this.renderFilters();
    this.attachEventListeners();
    this.renderProjects();
  }

  renderFilters() {
    const container = document.querySelector('[data-work-filters]');
    if (!container) return;

    container.innerHTML = `
      <div class="work-filters">
        <div class="category-filters" role="group" aria-label="Filter by category">
          <h2 class="visually-hidden">Filter by Category</h2>
          <button 
            class="filter-btn ${this.selectedCategory === 'all' ? 'active' : ''}" 
            data-category="all"
            aria-pressed="${this.selectedCategory === 'all'}"
          >
            All
          </button>
          <button 
            class="filter-btn ${this.selectedCategory === 'development' ? 'active' : ''}" 
            data-category="development"
            aria-pressed="${this.selectedCategory === 'development'}"
          >
            Development
          </button>
          <button 
            class="filter-btn ${this.selectedCategory === 'design' ? 'active' : ''}" 
            data-category="design"
            aria-pressed="${this.selectedCategory === 'design'}"
          >
            Design
          </button>
        </div>

        <div class="stack-filters" role="group" aria-label="Filter by technology">
          <h2 class="visually-hidden">Filter by Technology</h2>
          <div class="stack-filters-grid">
            ${this.allStacks.map(stack => `
              <button 
                class="stack-filter-btn ${this.selectedStacks.includes(stack) ? 'active' : ''}" 
                data-stack="${stack}"
                aria-pressed="${this.selectedStacks.includes(stack)}"
              >
                ${stack}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const categoryButtons = document.querySelectorAll('[data-category]');
    const stackButtons = document.querySelectorAll('[data-stack]');

    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        this.setCategory(category);
      });
    });

    stackButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const stack = btn.getAttribute('data-stack');
        this.toggleStack(stack);
      });
    });
  }

  setCategory(category) {
    this.selectedCategory = category;
    this.updateCategoryButtons();
    this.renderProjects();
  }

  toggleStack(stack) {
    const index = this.selectedStacks.indexOf(stack);
    if (index > -1) {
      this.selectedStacks.splice(index, 1);
    } else {
      this.selectedStacks.push(stack);
    }
    this.updateStackButtons();
    this.renderProjects();
  }

  updateCategoryButtons() {
    const buttons = document.querySelectorAll('[data-category]');
    buttons.forEach(btn => {
      const category = btn.getAttribute('data-category');
      const isActive = category === this.selectedCategory;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  updateStackButtons() {
    const buttons = document.querySelectorAll('[data-stack]');
    buttons.forEach(btn => {
      const stack = btn.getAttribute('data-stack');
      const isActive = this.selectedStacks.includes(stack);
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  getFilteredProjects() {
    let filtered = projects;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    if (this.selectedStacks.length > 0) {
      filtered = filtered.filter(p => 
        this.selectedStacks.some(stack => p.stack.includes(stack))
      );
    }

    return filtered;
  }

  renderProjects() {
    const filteredProjects = this.getFilteredProjects();
    const container = document.getElementById('work-grid');
    
    if (!container) return;

    if (filteredProjects.length === 0) {
      container.innerHTML = `
        <p class="no-results" role="status" aria-live="polite">
          No projects match the selected filters. Try adjusting your selection.
        </p>
      `;
      return;
    }

    container.setAttribute('aria-label', `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} found`);
    
    renderProjects({ 
      containerId: 'work-grid', 
      filteredList: filteredProjects 
    });
  }
}

