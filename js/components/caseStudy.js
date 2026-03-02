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
    if (!projectId) {
      console.error("No project ID found in URL");
      return;
    }

    this.project = this.findProjectById(projectId);
    if (!this.project) {
      console.error(`Project with ID "${projectId}" not found`);
      return;
    }

    if (caseStudies[projectId]) {
      this.caseStudyContent = caseStudies[projectId];
    } else {
      this.caseStudyContent = null;
    }
    
    this.render();
  }

  getProjectIdFromUrl() {
    const path = window.location.pathname;
    const pathParts = path.split("/");
    const filteredParts = pathParts.filter(function(part) {
      return part !== "";
    });
    
    if (filteredParts.length === 0) {
      return null;
    }
    
    const lastPart = filteredParts[filteredParts.length - 1];
    let projectId = lastPart.replace(".html", "");
    if (projectId === "portfolio-site") projectId = "inline-access";
    return projectId;
  }

  findProjectById(projectId) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === projectId) {
        return projects[i];
      }
    }
    return null;
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
            ${this.caseStudyContent && this.caseStudyContent.overview ? `<p class="case-study-overview">${this.caseStudyContent.overview}</p>` : ""}
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
        ${this.buildCaseStudyNavBottom()}
      </article>
    `;
  }

  buildCaseStudyNavBottom() {
    const caseStudyOrder = [
      { id: "inline-access", url: "/portfolio-site.html", title: "This Portfolio" },
      { id: "nomin-eat", url: "/nomineat.html", title: "NominEat" },
      { id: "vending-machine", url: "/vending-machine.html", title: "Vending Machine" },
      { id: "accex", url: "/accex.html", title: "ACCEX" }
    ];
    const currentIndex = caseStudyOrder.findIndex((p) => p.id === this.project.id);
    const prevProject = currentIndex > 0 ? caseStudyOrder[currentIndex - 1] : null;
    const nextProject = currentIndex >= 0 && currentIndex < caseStudyOrder.length - 1
      ? caseStudyOrder[currentIndex + 1]
      : null;

    const prevLink = prevProject
      ? `<a href="${prevProject.url}" class="nav-link nav-link-prev" aria-label="See previous case study: ${prevProject.title}">SEE PREVIOUS CASE STUDY</a>`
      : `<span class="nav-link nav-link-placeholder" aria-hidden="true">SEE PREVIOUS CASE STUDY</span>`;
    const allLink = '<a href="/work.html" class="nav-link nav-link-all">ALL WORK</a>';
    const nextLink = nextProject
      ? `<a href="${nextProject.url}" class="nav-link nav-link-next" aria-label="See next case study: ${nextProject.title}">SEE NEXT CASE STUDY</a>`
      : `<span class="nav-link nav-link-placeholder" aria-hidden="true">SEE NEXT CASE STUDY</span>`;

    return `
      <nav class="case-study-nav-bottom case-study-nav" aria-label="Case study navigation">
        <div class="case-study-nav-inner">
          <span class="nav-link-wrap nav-link-wrap-prev">${prevLink}</span>
          <span class="nav-link-wrap nav-link-wrap-all">${allLink}</span>
          <span class="nav-link-wrap nav-link-wrap-next">${nextLink}</span>
        </div>
      </nav>
    `;
  }

  buildExtendedContent() {
    if (!this.caseStudyContent) {
      return `
        <div class="case-study-description">
          <h2 id="case-study-description" class="visually-hidden">Project Description</h2>
          <p>${this.project.description}</p>
        </div>
      `;
    }

    if (!this.caseStudyContent.sections) {
      return `
        <div class="case-study-description">
          <h2 id="case-study-description" class="visually-hidden">Project Description</h2>
          <p>${this.project.description}</p>
        </div>
      `;
    }

    let sectionsHTML = "";
    const sectionsArray = this.caseStudyContent.sections;
    
    for (let i = 0; i < sectionsArray.length; i++) {
      const section = sectionsArray[i];
      const sectionNumber = i + 1;
      const sectionId = "section-" + sectionNumber;
      
      sectionsHTML += `
        <section class="case-study-section" aria-labelledby="${sectionId}">
          <h2 id="${sectionId}">${section.title}</h2>
          <div class="case-study-section-content">
            ${section.content}
          </div>
        </section>
      `;
    }

    const codeSnippet = this.buildCodeSnippet();
    return sectionsHTML + codeSnippet;
  }

  buildCodeSnippet() {
    if (!this.caseStudyContent) {
      return "";
    }

    if (!this.caseStudyContent.codeSnippet) {
      return "";
    }

    const codeSnippetData = this.caseStudyContent.codeSnippet;
    const title = codeSnippetData.title;
    const description = codeSnippetData.description;
    const code = codeSnippetData.code;
    const minimal = codeSnippetData.minimal;
    
    let descriptionHTML = "";
    if (description) {
      descriptionHTML = `<p class="code-snippet-description">${description}</p>`;
    }
    
    const sectionClass = minimal ? "case-study-code-section case-study-code-section--minimal" : "case-study-code-section";
    
    return `
      <section class="${sectionClass}" aria-labelledby="code-snippet">
        <h2 id="code-snippet">${title}</h2>
        ${descriptionHTML}
        <pre class="case-study-code-block"><code>${this.escapeHtml(code)}</code></pre>
      </section>
    `;
  }

  escapeHtml(text) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    const escapedText = tempDiv.innerHTML;
    return escapedText;
  }

  buildStackList() {
    let stackHTML = "";
    const stackArray = this.project.stack;

    for (let i = 0; i < stackArray.length; i++) {
      const item = stackArray[i];
      stackHTML += `<li class="${getTagClass(item)}" role="listitem">${item}</li>`;
    }

    return stackHTML;
  }

  buildLinks() {
    const linksArray = [];
    
    if (this.project.links && this.isValidLink(this.project.links.live)) {
      const liveLink = this.createLink(
        this.project.links.live,
        "Live Demo",
        "View live demo (opens in new window)",
        "live"
      );
      linksArray.push(liveLink);
    }
    
    if (this.project.links && this.isValidLink(this.project.links.repo)) {
      const repoLink = this.createLink(
        this.project.links.repo,
        "GitHub Repo",
        "View source code on GitHub (opens in new window)",
        "repo"
      );
      linksArray.push(repoLink);
    }

    if (linksArray.length === 0) {
      return "";
    }

    let linksHTML = "";
    for (let i = 0; i < linksArray.length; i++) {
      linksHTML += linksArray[i];
    }

    return `
      <nav class="case-study-links" aria-label="Project links">
        ${linksHTML}
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
          width="1200"
          height="675"
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

