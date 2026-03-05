import { projects } from "../data/projects.js";
import { caseStudies } from "../data/caseStudies.js";
import { getTagClass } from "../utils/tagClass.js";

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
  }

  getProjectIdFromUrl() {
    const path = window.location.pathname;
    const pathParts = path.split("/").filter(part => part !== "");
    if (pathParts.length === 0) return null;
    
    let projectId = pathParts[pathParts.length - 1].replace(".html", "");
    if (projectId === "portfolio-site") projectId = "inline-access";
    if (projectId === "nomineat") projectId = "nomin-eat";
    return projectId;
  }

  findProjectById(projectId) {
    return projects.find(p => p.id === projectId) || null;
  }

  render() {
    const container = document.querySelector("[data-case-study]");
    if (container) container.innerHTML = this.buildCaseStudyHTML();
  }

  buildCaseStudyHTML() {
    const stackList = this.buildStackList();
    const links = this.buildLinks();
    const featuredDiagram = this.buildFeaturedDiagram();
    const mainContent = this.buildMainContent();
    const metaHTML = this.buildMetaContent();

    return `
      <article class="case-study" role="article">
        <header class="case-study-header">
          <div class="case-study-title-section">
            <h1 class="case-study-title">${this.project.title}</h1>
            ${metaHTML}
            ${this.caseStudyContent && this.caseStudyContent.overview ? `<p class="case-study-overview">${this.caseStudyContent.overview}</p>` : ""}
          </div>
        </header>

        ${this.buildCaseStudyNav("top")}

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
          ${links}
        </footer>

        ${this.buildCaseStudyNav("bottom")}
      </article>
    `;
  }

  buildMetaContent() {
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
    const caseStudyOrder = [
      { id: "ia-studio", url: "/ia-studio.html", title: "Authenticated Digital Asset Platform" },
      { id: "inline-access", url: "/portfolio-site.html", title: "This Portfolio" },
      { id: "nomin-eat", url: "/nomineat.html", title: "NominEat" },
      { id: "vending-machine", url: "/vending-machine.html", title: "Vending Machine" },
      { id: "accex", url: "/accex.html", title: "ACCEX" }
    ];
    const currentIndex = caseStudyOrder.findIndex((p) => p.id === this.project.id);
    const prevProject = currentIndex > 0 ? caseStudyOrder[currentIndex - 1] : null;
    const nextProject = currentIndex >= 0 && currentIndex < caseStudyOrder.length - 1 ? caseStudyOrder[currentIndex + 1] : null;

    const prevLink = prevProject ? `<a href="${prevProject.url}" class="nav-link nav-link-prev">SEE PREVIOUS CASE STUDY</a>` : `<span class="nav-link nav-link-placeholder">SEE PREVIOUS CASE STUDY</span>`;
    const allLink = '<a href="/work.html" class="nav-link nav-link-all">ALL WORK</a>';
    const nextLink = nextProject ? `<a href="${nextProject.url}" class="nav-link nav-link-next">SEE NEXT CASE STUDY</a>` : `<span class="nav-link nav-link-placeholder">SEE NEXT CASE STUDY</span>`;

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
          <p>${this.project.description}</p>
        </div>
      `;
    }

    let sectionsHTML = "";
    const sectionsArray = this.caseStudyContent.sections;

    for (let i = 0; i < sectionsArray.length; i++) {
      const section = sectionsArray[i];
      const sectionId = "section-" + (i + 1);

      let imageHTML = "";
      if (section.image && section.image.src) {
        imageHTML = `
          <figure class="section-image" style="margin-bottom: 2rem;">
            <img src="${section.image.src}" alt="${this.escapeAttr(section.image.alt)}" loading="lazy" style="width: 100%; height: auto; border-radius: 4px;" />
          </figure>
        `;
      }

      sectionsHTML += `
        <section class="case-study-section" aria-labelledby="${sectionId}">
          ${imageHTML}
          <h2 id="${sectionId}">${section.title}</h2>
          <div class="case-study-section-content">
            ${section.content}
          </div>
        </section>
      `;
    }

    return sectionsHTML;
  }

  buildStackList() {
    return this.project.stack.map(item => `<li class="${getTagClass(item)}" role="listitem">${item}</li>`).join("");
  }

  buildLinks() {
    const linksArray = [];
    if (this.project.links && this.isValidLink(this.project.links.live)) {
      linksArray.push(this.createLink(this.project.links.live, "Live Demo", "live"));
    }
    if (this.project.links && this.isValidLink(this.project.links.repo)) {
      linksArray.push(this.createLink(this.project.links.repo, "GitHub Repo", "repo"));
    }
    if (linksArray.length === 0) return "";
    return `<nav class="case-study-links">${linksArray.join("")}</nav>`;
  }

  isValidLink(url) {
    return url && url.trim() !== "" && url !== "YOUR_LINK_HERE" && url !== "YOUR_REPO_LINK_HERE";
  }

  createLink(url, label, linkType) {
    return `<a href="${url}" class="btn ${linkType === 'live' ? 'primary' : 'secondary'}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }
}