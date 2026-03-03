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

  getCategoryCounts() {
    const counts = {
      all: projects.length,
      development: projects.filter(p => p.category === 'development').length,
      design: projects.filter(p => p.category === 'design').length,
    };
    return counts;
  }

  renderFilters() {
    const container = document.querySelector('[data-work-filters]');
    if (!container) return;

    const counts = this.getCategoryCounts();

    container.innerHTML = `
      <div class="work-filters">
        <div class="category-filters" role="group" aria-label="Filter by category">
          <button 
            class="filter-btn ${this.selectedCategory === 'all' ? 'active' : ''}" 
            data-category="all"
            aria-pressed="${this.selectedCategory === 'all'}"
          >
            All<span class="filter-count">${counts.all}</span>
          </button>
          <button 
            class="filter-btn ${this.selectedCategory === 'development' ? 'active' : ''}" 
            data-category="development"
            aria-pressed="${this.selectedCategory === 'development'}"
          >
            Full-Stack<span class="filter-count">${counts.development}</span>
          </button>
          <button 
            class="filter-btn ${this.selectedCategory === 'design' ? 'active' : ''}" 
            data-category="design"
            aria-pressed="${this.selectedCategory === 'design'}"
          >
            Front-End<span class="filter-count">${counts.design}</span>
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

      this.initScrollProgressLine();
    } finally {
      this.isRendering = false;
    }
  }

  initScrollProgressLine() {
    const section = document.querySelector('.work-section');
    const progressLine = document.querySelector('.scroll-progress-line');
    const grid = document.getElementById('work-grid');
    if (!section || !progressLine || !grid) return;

    if (this._scrollProgressHandler) {
      window.removeEventListener('scroll', this._scrollProgressHandler);
      this._scrollProgressHandler = null;
    }

    const sectionTop = () => section.getBoundingClientRect().top + window.scrollY;

    const updateProgress = () => {
      const cards = grid.querySelectorAll('.project-card');
      if (cards.length === 0) {
        progressLine.style.height = '0';
        return;
      }
      const viewportMid = window.scrollY + window.innerHeight * 0.4;
      const st = sectionTop();
      let activeIndex = -1;
      cards.forEach((card, i) => {
        const cardTop = card.getBoundingClientRect().top + window.scrollY;
        if (cardTop <= viewportMid) activeIndex = i;
      });
      if (activeIndex < 0) {
        progressLine.style.height = '0';
        return;
      }
      const card = cards[activeIndex];
      const cardCenter = card.getBoundingClientRect().top + window.scrollY + card.offsetHeight / 2;
      const y = Math.max(0, cardCenter - st);
      progressLine.style.height = `${y}px`;
    };

    let ticking = false;
    this._scrollProgressHandler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    };

    window.addEventListener('scroll', this._scrollProgressHandler, { passive: true });
    updateProgress();
  }
}
