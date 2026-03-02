import { projects } from "../data/projects.js";

export class WorkFilters {
  constructor() {
    this.selectedCategory = "all";
    this.isRendering = false;
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
            Full-Stack
          </button>
          <button 
            class="filter-btn ${this.selectedCategory === 'design' ? 'active' : ''}" 
            data-category="design"
            aria-pressed="${this.selectedCategory === 'design'}"
          >
            Front-End
          </button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const categoryButtons = document.querySelectorAll('[data-category]');
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        this.setCategory(category);
      });
    });
  }

  setCategory(category) {
    if (category === this.selectedCategory) return;
    this.selectedCategory = category;
    this.updateCategoryButtons();
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

  getFilteredProjects() {
    if (this.selectedCategory === 'all') {
      return [...projects];
    }
    return projects.filter(p => p.category === this.selectedCategory);
  }

  async renderProjects() {
    if (this.isRendering) return;
    this.isRendering = true;

    const filteredProjects = this.getFilteredProjects();
    const container = document.getElementById('work-grid');

    try {
      if (!container) return;

      container.innerHTML = '';

      if (filteredProjects.length === 0) {
        container.innerHTML = `
          <p class="no-results" role="status" aria-live="polite">
            No projects match the selected filters. Try adjusting your selection.
          </p>
        `;
        return;
      }

      container.setAttribute('aria-label', `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} found`);

      const { renderProjects } = await import("../renderProjects.js");
      await renderProjects({
        containerId: 'work-grid',
        filteredList: filteredProjects
      });
    } finally {
      this.isRendering = false;
    }
  }
}
