import { getTagClass } from "../utils/tagClass.js";
import { caseStudies } from "../data/caseStudies.js";

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
    const caseStudyProjects = ["ia-studio", "inline-access", "nomin-eat", "vending-machine", "accex"];
    return caseStudyProjects.includes(project.id);
}

function getCaseStudyUrl(project) {
    const caseStudyPaths = {
        "ia-studio": "/ia-studio.html",
        "inline-access": "/portfolio-site.html",
        "nomin-eat": "/nomineat.html",
        "vending-machine": "/vending-machine.html",
        "accex": "/accex.html"
    };
    return caseStudyPaths[project.id] || `/${project.id}`;
}

function buildProjectLinks(project) {
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

export function ProjectCard(project, index = 0, options = {}) {
    const { useDiagramImage = false, stackUnderImage = false } = options;
    const useDiagramForThis = useDiagramImage && project.id !== "deroche-projects";
    const diagram = useDiagramForThis && caseStudies[project.id]?.featuredDiagram;
    const imageSrc = diagram?.src ?? project.image;
    const imageAlt = diagram?.alt ?? project.alt;

    const stackList = project.stack
        .map((item) => `<li class="${getTagClass(item)}">${item}</li>`)
        .join("");

    const projectLinks = buildProjectLinks(project);

    const isFirstCard = project.featured && index === 0;
    const fetchPriority = isFirstCard ? "high" : "auto";
    const loadingAttr = isFirstCard ? "eager" : "lazy";
    const caseStudyClass = hasCaseStudy(project) ? " project-card--has-case-study" : "";
    const caseStudyUrl = hasCaseStudy(project) ? getCaseStudyUrl(project) : null;
    const lightboxAttrs = stackUnderImage && caseStudyUrl
        ? ` data-lightbox="true" data-lightbox-title="${String(project.title).replace(/"/g, "&quot;")}" data-lightbox-id="${String(project.id).replace(/"/g, "&quot;")}"`
        : "";
    const imageBlock = caseStudyUrl
        ? `<a href="${caseStudyUrl}" class="project-card__image-link"${lightboxAttrs} aria-label="View ${project.title} case study"><img
                src="${imageSrc}"
                alt="${imageAlt}"
                loading="${loadingAttr}"
                fetchpriority="${fetchPriority}"
                width="800"
                height="450"
                decoding="async"
            /></a>`
        : `<span class="project-card__image-wrap"><img
                src="${imageSrc}"
                alt="${imageAlt}"
                loading="${loadingAttr}"
                fetchpriority="${fetchPriority}"
                width="800"
                height="450"
                decoding="async"
            /></span>`;

    if (stackUnderImage) {
        return `
        <article class="project-card project-card--stack-under-image${caseStudyClass}">
            <div class="project-card__media-col">
                ${imageBlock}
                <ul class="project-points" aria-label="Technologies used">${stackList}</ul>
            </div>
            <div class="project-card__body">
                <h3>${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                ${projectLinks}
            </div>
        </article>
    `;
    }

    return `
        <article class="project-card${caseStudyClass}">
            ${imageBlock}
            <div class="project-card__body">
                <h3>${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <ul class="project-points" aria-label="Technologies used">
                    ${stackList}
                </ul>
                ${projectLinks}
            </div>
        </article>
    `;
}
