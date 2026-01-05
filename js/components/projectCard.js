function isValidLink(url) {
    if (!url) return false;
    if (typeof url !== 'string') return false;
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

function hasCaseStudy(project) {
    const caseStudyProjects = ["vending-machine", "accex"];
    return caseStudyProjects.includes(project.id);
}

function getCaseStudyUrl(project) {
    return `/${project.id}`;
}

function buildProjectLinks(project) {
    // Explicitly exclude trust-circle from showing any links
    // Check both id and title as fallback
    if (project.id === "trust-circle" || project.title === "Trust Circle") {
        return "";
    }
    
    const regularLinks = [];
    let caseStudyLink = "";
    
    if (hasCaseStudy(project)) {
        caseStudyLink = `<a href="${getCaseStudyUrl(project)}" class="case-study-link" aria-label="View ${project.title} case study">View Case Study</a>`;
    }
    
    if (project.links) {
        if (project.links.live && isValidLink(project.links.live)) {
            regularLinks.push(createProjectLink(project.links.live, "Live Demo", project.title, "live"));
        }
        
        if (project.links.repo && isValidLink(project.links.repo)) {
            regularLinks.push(createProjectLink(project.links.repo, "GitHub Repo", project.title, "repo"));
        }
    }
    
    if (regularLinks.length === 0 && !caseStudyLink) {
        return "";
    }
    
    let html = '<nav class="links" aria-label="Project links">';
    
    if (regularLinks.length > 0) {
        html += `<div class="links-row">${regularLinks.join("")}</div>`;
    }
    
    if (caseStudyLink) {
        html += `<div class="case-study-row">${caseStudyLink}</div>`;
    }
    
    html += '</nav>';
    
    return html;
}

export function ProjectCard(project, index = 0) {
    // Explicitly prevent trust-circle from showing any links
    const isTrustCircle = project.id === "trust-circle" || project.title === "Trust Circle";
    
    const stackList = project.stack
        .map((item) => `<li>${item}</li>`)
        .join("");

    const projectLinks = isTrustCircle ? "" : buildProjectLinks(project);

    const isFirstCard = project.featured && index === 0;
    const fetchPriority = isFirstCard ? "high" : "auto";
    const loadingAttr = isFirstCard ? "eager" : "lazy";
    
    return `
        <article class="project-card">
            <img
                src="${project.image}"
                alt="${project.alt}"
                loading="${loadingAttr}"
                fetchpriority="${fetchPriority}"
                width="800"
                height="450"
                decoding="async"
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
