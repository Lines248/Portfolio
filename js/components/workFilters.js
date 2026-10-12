import { projects } from "../data/projects.js";
import { caseStudies } from "../data/caseStudies.js";
import { open as openDiagramLightbox, diagramLightbox } from "./diagramLightbox.js";

const CASE_STUDY_PATHS = {
  "ai-governance": "/ai-governance",
  "n8n-automations": "/n8n-automations",
  "ia-studio": "/ia-studio",
  "inline-access": "/portfolio-site",
  "nomin-eat": "/nomin-eat",
  "vending-machine": "/vending-machine",
  "accex": "/accex",
  "deroche-projects": "/deroche",
  "trust-circle": "/trust-circle",
};

export class WorkFilters {
  constructor() {
    this.imageView = "image"; // work page always shows project images; diagrams live on case study pages
    this.isRendering = false;
  }

  init() {
    this.ensureLightbox();
    this.attachLightboxListeners();
    this.renderProjects();
    this.renderEarlierWork();
  }


  getCaseStudyUrl(project) {
    return CASE_STUDY_PATHS[project.id] || `/${project.id}`;
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




  getFilteredProjects() {
    return projects.filter(p => !p.hidden && !p.archived);
  }

  getEarlierProjects() {
    return projects.filter(p => !p.hidden && p.archived);
  }

  renderEarlierWork() {
    const container = document.querySelector('[data-earlier-work]');
    if (!container) return;
    const list = this.getEarlierProjects();
    if (list.length === 0) return;

    const linkOut = (url, label, title) =>
      url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label}: ${title} (opens in new window)">${label}</a>` : "";

    const items = list.map(p => {
      const caseUrl = CASE_STUDY_PATHS[p.id];
      const title = caseUrl ? `<a href="${caseUrl}">${p.title}</a>` : p.title;
      const links = [
        caseUrl ? `<a href="${caseUrl}" aria-label="Case study: ${p.title}">Case study</a>` : "",
        linkOut(p.links?.live, "Live", p.title),
        linkOut(p.links?.repo, "Code", p.title),
      ].filter(Boolean).join("");
      return `
        <li class="earlier-work__item">
          <h3 class="earlier-work__title">${title}</h3>
          ${p.caption ? `<p class="earlier-work__caption">${p.caption}</p>` : ""}
          ${links ? `<p class="earlier-work__links">${links}</p>` : ""}
        </li>`;
    }).join("");

    container.innerHTML = `
      <details class="earlier-work">
        <summary class="earlier-work__summary">Earlier work <span class="earlier-work__count">${list.length}</span></summary>
        <ul class="earlier-work__list">${items}</ul>
      </details>`;
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
