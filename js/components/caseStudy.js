import { projects } from "../data/projects.js";
import { caseStudies } from "../data/caseStudies.js";
import { getTagClass } from "../utils/tagClass.js";
import { open as openDiagramLightbox, diagramLightbox } from "./diagramLightbox.js";

const CASE_STUDY_ORDER = [
  { id: "ia-studio", url: "/ia-studio.html", title: "Authenticated Digital Asset Platform" },
  { id: "inline-access", url: "/portfolio-site.html", title: "This Portfolio" },
  { id: "nomin-eat", url: "/nomineat.html", title: "NominEat" },
  { id: "vending-machine", url: "/vending-machine.html", title: "Vending Machine" },
  { id: "accex", url: "/accex.html", title: "ACCEX" },
  { id: "deroche-projects", url: "/deroche.html", title: "DeRoche Projects" },
];

export class CaseStudy {
  constructor() {
    this.project = null;
    this.caseStudyContent = null;
  }

  init() {
    const projectId = this.getProjectIdFromUrl();
    if (!projectId) return;

    this.project = this.findProjectById(projectId);
    if (!this.project) return;

    if (caseStudies[projectId]) {
      this.caseStudyContent = caseStudies[projectId];
    } else {
      this.caseStudyContent = null;
    }

    this.render();
    this.attachDiagramLightbox();
  }

  attachDiagramLightbox() {
    diagramLightbox.ensureDOM();
    const container = document.querySelector("[data-case-study]");
    if (!container) return;
    container.addEventListener("click", (e) => {
      if (!e.target.closest(".featured-diagram")) return;
      e.preventDefault();
      const index = CASE_STUDY_ORDER.findIndex((p) => p.id === this.project.id);
      if (index === -1) return;
      const getImageInfo = (item) => {
        const diagram = caseStudies[item.id]?.featuredDiagram;
        return {
          src: diagram?.src ?? "",
          alt: diagram?.alt ?? "",
          title: item.title,
          caseStudyUrl: item.url,
        };
      };
      openDiagramLightbox(CASE_STUDY_ORDER, index, getImageInfo);
    });
  }

  getProjectIdFromUrl() {
    const path = window.location.pathname;
    const pathParts = path.split("/").filter(part => part !== "");
    if (pathParts.length === 0) return null;
    
    let projectId = pathParts[pathParts.length - 1].replace(".html", "");
    if (projectId === "portfolio-site") projectId = "inline-access";
    if (projectId === "nomineat") projectId = "nomin-eat";
    if (projectId === "deroche") projectId = "deroche-projects";
    return projectId;
  }

  findProjectById(projectId) {
    return projects.find(p => p.id === projectId) || null;
  }

  render() {
    const container = document.querySelector("[data-case-study]");
    if (container) container.innerHTML = this.buildCaseStudyHTML();
  }

  /** True when case study uses new schema: roles[], context, sections[].heading/body/media[] */
  isNewSchema() {
    return this.caseStudyContent && Array.isArray(this.caseStudyContent.roles) && typeof this.caseStudyContent.context === "string";
  }

  buildCaseStudyHTML() {
    const stackList = this.buildStackList();
    const links = this.buildLinks();
    const featuredDiagram = this.isNewSchema() ? "" : this.buildFeaturedDiagram();
    const mainContent = this.buildMainContent();
    const metaHTML = this.buildMetaContent();
    const title = this.isNewSchema() && this.caseStudyContent.title ? this.caseStudyContent.title : this.project.title;

    return `
      <article class="case-study" role="article">
        ${this.buildCaseStudyNav("top")}

        <header class="case-study-header">
          <div class="case-study-title-section">
            <h1 class="case-study-title">${this.escapeHtml(title)}</h1>
            ${this.caseStudyContent && this.caseStudyContent.subtitle ? `<p class="case-study-subtitle">${this.escapeHtml(this.caseStudyContent.subtitle)}</p>` : ""}
            ${metaHTML}
            ${!this.isNewSchema() && this.caseStudyContent && this.caseStudyContent.overview ? `<p class="case-study-overview">${this.caseStudyContent.overview}</p>` : ""}
          </div>
        </header>

        ${this.buildSplashImage()}

        ${featuredDiagram}

        <div class="case-study-main" style="margin-top: 3rem;">
          ${mainContent}
        </div>

        <footer class="case-study-details" aria-label="Project details" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);">
          <div class="case-study-stack">
            <h3>Technologies & Tools</h3>
            <ul class="stack-list tech-stack-grid" role="list">
              ${stackList}
            </ul>
          </div>
          ${links ? `<div class="case-study-links-wrap"><h3 class="case-study-links-heading">Links</h3>${links}</div>` : ""}
        </footer>

        ${this.buildCaseStudyNav("bottom")}
      </article>
    `;
  }

  buildMetaContent() {
    if (this.isNewSchema()) {
      return this.buildMetaContentNew();
    }
    if (!this.caseStudyContent || !this.caseStudyContent.meta) {
      // Fallback to project type and standard stack list if no meta object exists
      return `
        <p class="case-study-type">${this.project.type}</p>
        <ul class="stack-list tech-stack-grid" role="list">
          ${this.buildStackList()}
        </ul>
      `;
    }

    const meta = this.caseStudyContent.meta;
    let stackItems = "";
    if (meta.stack && meta.stack.length > 0) {
      stackItems = meta.stack.map(item => `<li class="meta-tag ${getTagClass(item)}">${item}</li>`).join("");
    }

    return `
      <ul class="case-study-meta tech-stack-grid" role="list">
        ${meta.role ? `<li><strong>Role:</strong> ${meta.role}</li>` : ""}
        ${meta.year ? `<li><strong>Year:</strong> ${meta.year}</li>` : ""}
        ${stackItems}
      </ul>
    `;
  }

  buildMetaContentNew() {
    const roles = this.caseStudyContent.roles || [];
    const context = this.caseStudyContent.context || "";
    const roleTags = roles.map((r) => `<li class="meta-tag ${getTagClass(r)}" role="listitem">${this.escapeHtml(r)}</li>`).join("");
    return `
      <ul class="case-study-meta tech-stack-grid" role="list">
        ${context ? `<li class="case-study-context"><span class="case-study-context-label">Context</span><span class="case-study-context-value">${this.escapeHtml(context)}</span></li>` : ""}
        ${roleTags}
      </ul>
    `;
  }

  buildFeaturedDiagram() {
    if (!this.caseStudyContent || !this.caseStudyContent.featuredDiagram) return "";
    const { src, alt } = this.caseStudyContent.featuredDiagram;
    if (!src || !alt) return "";
    return `
      <figure class="featured-diagram">
        <img src="${src}" alt="${this.escapeAttr(alt)}" loading="lazy" />
      </figure>
    `;
  }

  buildSplashImage() {
    if (!this.project || !this.project.image) return "";
    const src = this.escapeAttr(this.project.image);
    const alt = this.escapeAttr(this.project.alt || this.project.title);
    return `
      <figure class="case-study-splash" aria-hidden="true">
        <img src="${src}" alt="${alt}" loading="eager" decoding="async" class="case-study-splash__img" />
      </figure>
    `;
  }

  escapeAttr(text) {
    const div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML.replace(/"/g, "&quot;");
  }

  escapeHtml(text) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    return tempDiv.innerHTML;
  }

  buildCaseStudyNav(position = "bottom") {
    const currentIndex = CASE_STUDY_ORDER.findIndex((p) => p.id === this.project.id);
    const prevOrder = currentIndex > 0 ? CASE_STUDY_ORDER[currentIndex - 1] : null;
    const nextOrder = currentIndex >= 0 && currentIndex < CASE_STUDY_ORDER.length - 1 ? CASE_STUDY_ORDER[currentIndex + 1] : null;
    const prevProject = prevOrder ? this.findProjectById(prevOrder.id) : null;
    const nextProject = nextOrder ? this.findProjectById(nextOrder.id) : null;
    const isBottom = position === "bottom";

    const prevLink = prevOrder
      ? (isBottom && prevProject
        ? `<a href="${this.escapeAttr(prevOrder.url)}" class="nav-link nav-link-prev case-study-nav-item" aria-label="See previous case study: ${this.escapeAttr(prevProject.title)}">
            <span class="case-study-nav-item__label">SEE PREVIOUS CASE STUDY</span>
            <span class="case-study-nav-item__thumb">
              <img src="${this.escapeAttr(prevProject.image)}" alt="${this.escapeAttr(prevProject.alt || prevProject.title)}" loading="lazy" decoding="async" class="case-study-nav-item__img" width="200" height="113" />
            </span>
          </a>`
        : `<a href="${this.escapeAttr(prevOrder.url)}" class="nav-link nav-link-prev">SEE PREVIOUS CASE STUDY</a>`)
      : `<span class="nav-link nav-link-placeholder">SEE PREVIOUS CASE STUDY</span>`;

    const allLink = '<a href="/work.html" class="nav-link nav-link-all">ALL WORK</a>';

    const nextLink = nextOrder
      ? (isBottom && nextProject
        ? `<a href="${this.escapeAttr(nextOrder.url)}" class="nav-link nav-link-next case-study-nav-item" aria-label="See next case study: ${this.escapeAttr(nextProject.title)}">
            <span class="case-study-nav-item__label">SEE NEXT CASE STUDY</span>
            <span class="case-study-nav-item__thumb">
              <img src="${this.escapeAttr(nextProject.image)}" alt="${this.escapeAttr(nextProject.alt || nextProject.title)}" loading="lazy" decoding="async" class="case-study-nav-item__img" width="200" height="113" />
            </span>
          </a>`
        : `<a href="${this.escapeAttr(nextOrder.url)}" class="nav-link nav-link-next">SEE NEXT CASE STUDY</a>`)
      : `<span class="nav-link nav-link-placeholder">SEE NEXT CASE STUDY</span>`;

    const positionClass = position === "top" ? "case-study-nav-top" : "case-study-nav-bottom";
    return `
      <nav class="${positionClass} case-study-nav" aria-label="Case study navigation">
        <div class="case-study-nav-inner">
          <span class="nav-link-wrap nav-link-wrap-prev">${prevLink}</span>
          <span class="nav-link-wrap nav-link-wrap-all">${allLink}</span>
          <span class="nav-link-wrap nav-link-wrap-next">${nextLink}</span>
        </div>
      </nav>
    `;
  }

  buildMainContent() {
    if (!this.caseStudyContent || !this.caseStudyContent.sections || !this.caseStudyContent.sections.length) {
      return `
        <div class="case-study-description">
          <h2 class="visually-hidden">Project Description</h2>
          <p>${this.escapeHtml(this.project.description)}</p>
        </div>
      `;
    }

    const sectionsArray = this.caseStudyContent.sections;
    let sectionsHTML = "";

    for (let i = 0; i < sectionsArray.length; i++) {
      const section = sectionsArray[i];
      const sectionId = "section-" + (i + 1);

      // Support both New Schema (heading, body, media[]) and legacy (title, content, image)
      const sectionTitle = (section.heading !== undefined && section.heading !== null)
        ? section.heading
        : section.title;
      const sectionBodyRaw = (section.body !== undefined && section.body !== null)
        ? section.body
        : section.content;
      const sectionBody = sectionBodyRaw != null && String(sectionBodyRaw).trim() !== ""
        ? (/^<[\s\S]*>/.test(String(sectionBodyRaw).trim()) ? sectionBodyRaw : `<p>${this.escapeHtml(sectionBodyRaw)}</p>`)
        : (section.content != null ? section.content : "");

      // Media: New Schema uses section.media[] (loop); legacy uses single section.image
      let mediaHTML = "";
      if (section.media && Array.isArray(section.media) && section.media.length > 0) {
        mediaHTML = section.media.map((m) => this.buildSectionMedia(m)).join("");
      } else if (section.image && section.image.src) {
        const alt = section.image.alt || section.image.caption || sectionTitle;
        mediaHTML = `
          <figure class="case-study-media case-study-media--image" style="margin-bottom: 2rem;">
            <img src="${this.escapeAttr(section.image.src)}" alt="${this.escapeAttr(alt)}" loading="lazy" class="section-image" style="width: 100%; height: auto; border-radius: 4px;" />
            ${section.image.caption ? `<figcaption class="case-study-media-caption">${this.escapeHtml(section.image.caption)}</figcaption>` : ""}
          </figure>
        `;
      }

      let embedHTML = "";
      if (section.embed) {
        embedHTML = `
          <div class="case-study-embed figma-embed-wrapper" aria-label="Figma embed">
            <!-- Paste Figma iframe here -->
          </div>
        `;
      }

      sectionsHTML += `
        <section class="case-study-section" aria-labelledby="${sectionId}">
          <h2 id="${sectionId}">${this.escapeHtml(sectionTitle)}</h2>
          <div class="case-study-section-content">
            ${sectionBody}
          </div>
          ${mediaHTML}
          ${embedHTML}
        </section>
      `;
    }

    return sectionsHTML;
  }

  buildSectionMedia(media) {
    const captionHtml = media.caption
      ? `<figcaption class="case-study-media-caption">${this.escapeHtml(media.caption)}</figcaption>`
      : "";
    const isPlaceholder = !media.src || media.src === "PLACEHOLDER_URL";
    const type = media.type || (media.src ? "image" : "");

    if (type === "image") {
      if (isPlaceholder) {
        return `<figure class="case-study-media case-study-media--image" style="margin-bottom: 2rem;"><div class="case-study-embed figma-embed-wrapper case-study-media-placeholder" aria-label="Image placeholder"><!-- Replace with img or set src in data --></div>${captionHtml}</figure>`;
      }
      const alt = media.alt || media.caption || "";
      return `<figure class="case-study-media case-study-media--image" style="margin-bottom: 2rem;">
            <img src="${this.escapeAttr(media.src)}" alt="${this.escapeAttr(alt)}" loading="lazy" class="section-image" style="width: 100%; height: auto; border-radius: 4px;" />
            ${captionHtml}
          </figure>`;
    }

    if (media.type === "figma-embed") {
      const iframePart = isPlaceholder
        ? "<!-- Paste Figma iframe here -->"
        : `<iframe src="${this.escapeAttr(media.src)}" title="${this.escapeAttr(media.caption)}" class="figma-embed-iframe"></iframe>`;
      return `<figure class="case-study-media case-study-media--figma"><div class="case-study-embed figma-embed-wrapper" aria-label="Figma embed">${iframePart}</div>${captionHtml}</figure>`;
    }

    if (media.type === "video") {
      const videoPart = isPlaceholder
        ? "<!-- Paste video path in data -->"
        : `<video class="case-study-video" autoplay loop muted playsinline aria-label="${this.escapeAttr(media.caption)}"><source src="${this.escapeAttr(media.src)}" type="video/mp4" /></video>`;
      return `<figure class="case-study-media case-study-media--video"><div class="case-study-embed figma-embed-wrapper case-study-video-wrap">${videoPart}</div>${captionHtml}</figure>`;
    }

    return "";
  }

  buildStackList() {
    return this.project.stack.map(item => `<li class="${getTagClass(item)}" role="listitem">${item}</li>`).join("");
  }

  buildLinks() {
    const linksArray = [];
    const liveUrl = this.project.links?.live || (this.project.id === "deroche-projects" ? "https://derocheprojects.com/" : "");
    const repoUrl = this.project.links?.repo;
    if (this.isValidLink(liveUrl)) {
      linksArray.push(this.createLink(liveUrl, "Live Demo", "live"));
    }
    if (this.isValidLink(repoUrl)) {
      linksArray.push(this.createLink(repoUrl, "GitHub Repo", "repo"));
    }
    if (linksArray.length === 0) return "";
    return `<nav class="case-study-links">${linksArray.join("")}</nav>`;
  }

  isValidLink(url) {
    return url && url.trim() !== "" && url !== "YOUR_LINK_HERE" && url !== "YOUR_REPO_LINK_HERE";
  }

  createLink(url, label, linkType) {
    return `<a href="${this.escapeAttr(url)}" class="btn ${linkType === 'live' ? 'primary' : 'secondary'}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }
}