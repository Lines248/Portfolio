import { projects } from "../data/projects.js";
import { caseStudies } from "../data/caseStudies.js";
import { open as openDiagramLightbox, diagramLightbox } from "./diagramLightbox.js";

const CASE_STUDY_PATHS = {
  "ia-studio": "/ia-studio.html",
  "inline-access": "/portfolio-site.html",
  "nomin-eat": "/nomineat.html",
  "vending-machine": "/vending-machine.html",
  "accex": "/accex.html",
};

export class WorkFilters {
  constructor() {
    this.selectedCategory = "all";
    this.imageView = "diagram"; // "diagram" | "image" for work page project thumbnails
    this.isRendering = false;
  }

  init() {
    this.renderFilters();
    this.attachEventListeners();
    this.ensureLightbox();
    this.attachLightboxListeners();
    this.renderProjects();
  }

  getCategoryCounts() {
    const visible = projects.filter(p => !p.hidden);
    const counts = {
      all: visible.length,
      development: visible.filter(p => p.category === 'development').length,
      design: visible.filter(p => p.category === 'design').length,
      "ui-ux": visible.filter(p => p.category === 'ui-ux').length,
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
          <button 
            class="filter-btn ${this.selectedCategory === 'ui-ux' ? 'active' : ''}" 
            data-category="ui-ux"
            aria-pressed="${this.selectedCategory === 'ui-ux'}"
          >
            UI UX<span class="filter-count">${counts["ui-ux"]}</span>
          </button>
        </div>
        <div class="work-view-toggle" role="group" aria-label="Project image view">
          <button type="button" class="filter-btn filter-btn--view ${this.imageView === 'diagram' ? 'active' : ''}" data-image-view="diagram" aria-pressed="${this.imageView === 'diagram'}">Diagrams</button>
          <button type="button" class="filter-btn filter-btn--view ${this.imageView === 'image' ? 'active' : ''}" data-image-view="image" aria-pressed="${this.imageView === 'image'}">Images</button>
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
    const viewButtons = document.querySelectorAll('[data-image-view]');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-image-view');
        this.setImageView(view);
      });
    });
  }

  getCaseStudyUrl(project) {
    return CASE_STUDY_PATHS[project.id] || `/${project.id}.html`;
  }

  getProjectImageInfo(project) {
    const useDiagram = this.imageView !== "image" && project.id !== "deroche-projects";
    const diagram = useDiagram && caseStudies[project.id]?.featuredDiagram;
    return {
      src: diagram?.src ?? project.image,
      alt: diagram?.alt ?? project.alt,
      title: project.title,
      caseStudyUrl: this.getCaseStudyUrl(project),
    };
  }

  ensureLightbox() {
    diagramLightbox.ensureDOM();
  }

  attachLightboxListeners() {
    const grid = document.getElementById('work-grid');
    if (!grid) return;
    grid.addEventListener('click', (e) => {
      const link = e.target.closest('.project-card__image-link[data-lightbox="true"]');
      if (!link) return;
      e.preventDefault();
      const img = link.querySelector('img');
      if (!img) return;
      const projectId = link.getAttribute('data-lightbox-id') || '';
      const list = this.getFilteredProjects();
      const projectIndex = list.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return;
      openDiagramLightbox(list, projectIndex, (p) => this.getProjectImageInfo(p));
    });
  }

  setCategory(category) {
    if (category === this.selectedCategory) return;
    this.selectedCategory = category;
    this.updateCategoryButtons();
    this.renderProjects();
  }

  setImageView(view) {
    if (view === this.imageView) return;
    this.imageView = view;
    this.updateImageViewButtons();
    this.renderProjects();
  }

  updateImageViewButtons() {
    const buttons = document.querySelectorAll('[data-image-view]');
    buttons.forEach(btn => {
      const view = btn.getAttribute('data-image-view');
      const isActive = view === this.imageView;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
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
    const visible = projects.filter(p => !p.hidden);
    if (this.selectedCategory === 'all') {
      return [...visible];
    }
    return visible.filter(p => p.category === this.selectedCategory);
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
        filteredList: filteredProjects,
        imageView: this.imageView
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
