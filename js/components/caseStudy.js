import { projects } from "../data/projects.js";
import { caseStudies } from "../data/caseStudies.js";

export class CaseStudy {
  constructor() {
    this.project = null;
    this.caseStudyContent = null;
  }

  init() {
    const projectId = this.getProjectIdFromUrl();
    if (!projectId) {
      console.error("No project ID found in URL");
      return;
    }

    this.project = this.findProjectById(projectId);
    if (!this.project) {
      console.error(`Project with ID "${projectId}" not found`);
      return;
    }

    this.caseStudyContent = caseStudies[projectId] || null;
    this.render();
  }

 
  getProjectIdFromUrl() {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    return lastSegment?.replace(".html", "") || null;
  }


  findProjectById(projectId) {
    return projects.find((p) => p.id === projectId) || null;
  }

  
  render() {
    const container = document.querySelector("[data-case-study]");
    if (!container) {
      console.error("Case study container not found");
      return;
    }

    container.innerHTML = this.buildCaseStudyHTML();
  }

 
  buildCaseStudyHTML() {
    const stackList = this.buildStackList();
    const links = this.buildLinks();
    const image = this.buildImage();
    const extendedContent = this.buildExtendedContent();

    return `
      <article class="case-study" role="article">
        <header class="case-study-header">
          ${image}
          <div class="case-study-title-section">
            <h1 class="case-study-title">${this.project.title}</h1>
            <p class="case-study-type">${this.project.type}</p>
            ${this.caseStudyContent?.overview ? `<p class="case-study-overview">${this.caseStudyContent.overview}</p>` : ""}
          </div>
        </header>

        <section class="case-study-content" aria-labelledby="case-study-description">
          <div class="case-study-main">
            ${extendedContent}
          </div>

          <aside class="case-study-details" aria-label="Project details">
            <div class="case-study-stack">
              <h3>Technologies & Tools</h3>
              <ul class="stack-list" role="list">
                ${stackList}
              </ul>
            </div>

            ${links}
          </aside>
        </section>
      </article>
    `;
  }

  buildExtendedContent() {
    if (!this.caseStudyContent || !this.caseStudyContent.sections) {
      return `
        <div class="case-study-description">
          <h2 id="case-study-description" class="visually-hidden">Project Description</h2>
          <p>${this.project.description}</p>
        </div>
      `;
    }

    const sections = this.caseStudyContent.sections
      .map((section, index) => {
        const sectionId = `section-${index + 1}`;
        return `
          <section class="case-study-section" aria-labelledby="${sectionId}">
            <h2 id="${sectionId}">${section.title}</h2>
            <div class="case-study-section-content">
              ${section.content}
            </div>
          </section>
        `;
      })
      .join("");

    const codeSnippet = this.buildCodeSnippet();
    
    return sections + codeSnippet;
  }

  buildCodeSnippet() {
    if (!this.caseStudyContent?.codeSnippet) {
      return "";
    }

    const { title, description, code } = this.caseStudyContent.codeSnippet;
    
    return `
      <section class="case-study-code-section" aria-labelledby="code-snippet">
        <h2 id="code-snippet">${title}</h2>
        ${description ? `<p class="code-snippet-description">${description}</p>` : ""}
        <pre class="case-study-code-block"><code>${this.escapeHtml(code)}</code></pre>
      </section>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  buildStackList() {
    return this.project.stack
      .map((item) => `<li role="listitem">${item}</li>`)
      .join("");
  }

  buildLinks() {
    const links = [];
    
    if (this.isValidLink(this.project.links?.live)) {
      links.push(
        this.createLink(
          this.project.links.live,
          "Live Demo",
          "View live demo (opens in new window)",
          "live"
        )
      );
    }
    
    if (this.isValidLink(this.project.links?.repo)) {
      links.push(
        this.createLink(
          this.project.links.repo,
          "GitHub Repo",
          "View source code on GitHub (opens in new window)",
          "repo"
        )
      );
    }

    if (links.length === 0) {
      return "";
    }

    return `
      <nav class="case-study-links" aria-label="Project links">
        ${links.join("")}
      </nav>
    `;
  }

  buildImage() {
    return `
      <figure class="case-study-image">
        <img
          src="${this.project.image}"
          alt="${this.project.alt}"
          loading="eager"
        />
      </figure>
    `;
  }

  isValidLink(url) {
    if (!url) return false;
    if (url.trim() === "") return false;
    if (url === "YOUR_LINK_HERE") return false;
    if (url === "YOUR_REPO_LINK_HERE") return false;
    return true;
  }

  createLink(url, label, ariaLabel, linkType) {
    return `
      <a 
        href="${url}" 
        class="btn ${linkType === 'live' ? 'primary' : 'secondary'}"
        aria-label="${ariaLabel}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${label}
      </a>
    `;
  }
}

