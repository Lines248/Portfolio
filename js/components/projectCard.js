function isValidLink(url) {
    if (!url) return false;
    if (url.trim() === "") return false;
    if (url === "YOUR_LINK_HERE") return false;
    if (url === "YOUR_REPO_LINK_HERE") return false;
    return true;
}

function createProjectLink(url, label, projectTitle, linkType) {
    const ariaLabel = linkType === "live" 
        ? `View ${projectTitle} live demo (opens in new window)`
        : `View ${projectTitle} source code on GitHub (opens in new window)`;
    
    return `<a href="${url}" aria-label="${ariaLabel}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

/**
 * Checks if a project has a case study page
 * @param {Object} project - The project object
 * @returns {boolean} True if case study exists
 */
function hasCaseStudy(project) {
    // List of project IDs that have case study pages
    const caseStudyProjects = ["vending-machine"];
    return caseStudyProjects.includes(project.id);
}

/**
 * Gets the case study URL for a project
 * @param {Object} project - The project object
 * @returns {string} Case study URL
 */
function getCaseStudyUrl(project) {
    return `/${project.id}`;
}

function buildProjectLinks(project) {
    const links = [];
    
    // Add case study link if available
    if (hasCaseStudy(project)) {
        links.push(
            `<a href="${getCaseStudyUrl(project)}" class="case-study-link" aria-label="View ${project.title} case study">View Case Study</a>`
        );
    }
    
    if (isValidLink(project.links.live)) {
        links.push(createProjectLink(project.links.live, "Live Demo", project.title, "live"));
    }
    
    if (isValidLink(project.links.repo)) {
        links.push(createProjectLink(project.links.repo, "GitHub Repo", project.title, "repo"));
    }
    
    if (links.length === 0) {
        return "";
    }
    
    return `<nav class="links" aria-label="Project links">${links.join("")}</nav>`;
}

export function ProjectCard(project) {
    const stackList = project.stack
        .map((item) => `<li>${item}</li>`)
        .join("");

    const projectLinks = buildProjectLinks(project);

    return `
        <article class="project-card" role="listitem">
            <img
                src="${project.image}"
                alt="${project.alt}"
                loading="lazy"
            />

            <h3>${project.title}</h3>

            <p class="project-desc">${project.description}</p>

            <ul class="project-points" aria-label="Technologies used">
                ${stackList}
            </ul>

            ${projectLinks}
        </article>
    `;
}
