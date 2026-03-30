import { projects } from "../data/projects.js";
import { caseStudies } from "../data/caseStudies.js";
import { getTagClass } from "../utils/tagClass.js";
import { open as openDiagramLightbox, openImages as openDiagramLightboxImages, diagramLightbox } from "./diagramLightbox.js";

/* Must match the order of projects on the work page (projects with case studies, excluding hidden) */
const CASE_STUDY_ORDER = [
  { id: "inline-access", url: "/portfolio-site", title: "This Portfolio" },
  { id: "ia-studio", url: "/ia-studio", title: "Authenticated Digital Asset Platform" },
  { id: "accex", url: "/accex", title: "ACCEX" },
  { id: "deroche-projects", url: "/deroche", title: "DeRoche Projects" },
  { id: "trust-circle", url: "/trust-circle", title: "Trust Circle" },
  { id: "nomin-eat", url: "/nomin-eat", title: "NominEat" },
  { id: "vending-machine", url: "/vending-machine", title: "Vending Machine" },
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
    this.scrollToHashTarget();
    this.attachDiagramLightbox();
  }

  /**
   * After content is rendered, scroll to the URL hash target (e.g. #proof-section)
   * so green metric pill links from the work page land in the right place. Waits for
   * layout to settle, then scrolls with explicit offset so the section lands below the sticky header.
   */
  scrollToHashTarget() {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    const id = hash.slice(1).replace(/["'<>]/g, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    const scrollToTarget = () => {
      const headerOffset = 88;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
      el.setAttribute("tabindex", "-1");
      if (typeof el.focus === "function") {
        el.focus({ preventScroll: true });
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToTarget();
      });
    });
  }

  attachDiagramLightbox() {
    diagramLightbox.ensureDOM();
    const container = document.querySelector("[data-case-study]");
    if (!container) return;
    container.addEventListener("click", (e) => {
      const sectionImg = e.target.closest(".case-study-media--lightbox img.section-image, .featured-diagram img, .case-study-splash img");
      if (sectionImg) {
        e.preventDefault();
        const figures = container.querySelectorAll(".featured-diagram, .case-study-splash, .case-study-media--lightbox");
        const images = [];
        figures.forEach((fig) => {
          const img = fig.querySelector("img.section-image, .section-image, img");
          if (img && img.src) {
            images.push({
              src: img.currentSrc || img.getAttribute("src") || "",
              alt: img.getAttribute("alt") || "",
              title: img.getAttribute("data-caption") || "",
            });
          }
        });
        const clickedFigure = sectionImg.closest(".featured-diagram, .case-study-splash, .case-study-media--lightbox");
        const index = clickedFigure ? Array.from(figures).indexOf(clickedFigure) : 0;
        if (images.length) openDiagramLightboxImages(images, index);
      }
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
    const featuredDiagram = (this.project && this.project.id === "inline-access") ? "" : (this.isNewSchema() ? "" : this.buildFeaturedDiagram());
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
            ${this.buildHeaderMetrics()}
            ${!this.isNewSchema() && this.caseStudyContent && this.caseStudyContent.overview ? `<p class="case-study-overview">${this.caseStudyContent.overview}</p>` : ""}
          </div>
        </header>

        ${this.buildSplashImage()}

        ${featuredDiagram}

        <div class="case-study-main">
          ${mainContent}
        </div>

        <footer class="case-study-details" aria-label="Project details">
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

  buildHeaderMetrics() {
    if (!this.caseStudyContent || !this.caseStudyContent.metrics || !Array.isArray(this.caseStudyContent.metrics) || this.caseStudyContent.metrics.length === 0) {
      return "";
    }
    const pills = this.caseStudyContent.metrics
      .map((m) => {
        const label = typeof m === "string" ? m : (m.label || "");
        const anchor = typeof m === "object" && m && m.anchor ? m.anchor : "";
        if (!anchor) return `<span class="metric-pill"><span class="metric-pill__label">${this.escapeHtml(label)}</span></span>`;
        return `<a href="#${this.escapeAttr(anchor)}" class="metric-pill metric-pill--link"><span class="metric-pill__label">${this.escapeHtml(label)}</span></a>`;
      })
      .join("");
    return `<div class="case-study-header-metrics">${pills}</div>`;
  }

  buildFeaturedDiagram() {
    if (!this.caseStudyContent || !this.caseStudyContent.featuredDiagram) return "";
    const { src, alt } = this.caseStudyContent.featuredDiagram;
    if (!src || !alt) return "";
    return `
      <figure class="featured-diagram case-study-media--lightbox">
        <img src="${src}" alt="${this.escapeAttr(alt)}" loading="lazy" class="section-image" data-caption="${this.escapeAttr(alt)}" />
      </figure>
    `;
  }

  buildSplashImage() {
    if (!this.project || !this.project.image) return "";
    const src = this.escapeAttr(this.project.image);
    const alt = this.escapeAttr(this.project.alt || this.project.title);
    return `
      <figure class="case-study-splash case-study-media--lightbox" aria-hidden="true">
        <img src="${src}" alt="${alt}" loading="eager" decoding="async" class="case-study-splash__img section-image" data-caption="${alt}" />
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

    const allLink = '<a href="/work" class="nav-link nav-link-all">ALL WORK</a>';

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
        const captionAttr = section.image.caption ? ` data-caption="${this.escapeAttr(section.image.caption)}"` : "";
        mediaHTML = `
          <figure class="case-study-media case-study-media--image case-study-media--lightbox">
            <img src="${this.escapeAttr(section.image.src)}" alt="${this.escapeAttr(alt)}" loading="lazy" class="section-image"${captionAttr} />
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

      const sectionIdAttr = section.id ? ` id="${this.escapeAttr(section.id)}"` : "";
      const sectionTabindexAttr = section.id ? ' tabindex="-1"' : "";
      sectionsHTML += `
        <section class="case-study-section"${sectionIdAttr}${sectionTabindexAttr} aria-labelledby="${sectionId}">
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
    const extraClass = media.className ? ` ${media.className}` : "";

    if (type === "image") {
      if (isPlaceholder) {
        return `<figure class="case-study-media case-study-media--image${extraClass}"><div class="case-study-embed figma-embed-wrapper case-study-media-placeholder" aria-label="Image placeholder"><!-- Replace with img or set src in data --></div>${captionHtml}</figure>`;
      }
      const alt = media.alt || media.caption || "";
      const captionAttr = media.caption ? ` data-caption="${this.escapeAttr(media.caption)}"` : "";
      return `<figure class="case-study-media case-study-media--image case-study-media--lightbox${extraClass}">
            <img src="${this.escapeAttr(media.src)}" alt="${this.escapeAttr(alt)}" loading="lazy" class="section-image"${captionAttr} />
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