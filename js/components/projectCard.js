export function ProjectCard(project) {
    const stackList = project.stack
        .map((item) => `<li>${item}</li>`)
        .join("");

    const liveLinkLabel = project.links.live && project.links.live !== "YOUR_LINK_HERE" 
        ? `View ${project.title} live demo (opens in new window)`
        : `${project.title} live demo (coming soon)`;
    
    const repoLinkLabel = project.links.repo && project.links.repo !== "YOUR_REPO_LINK_HERE"
        ? `View ${project.title} source code on GitHub (opens in new window)`
        : `${project.title} source code (coming soon)`;

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

            <nav class="links" aria-label="Project links">
                ${project.links.live && project.links.live !== "YOUR_LINK_HERE" 
                    ? `<a href="${project.links.live}" aria-label="${liveLinkLabel}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
                    : `<span class="link-disabled" aria-label="${liveLinkLabel}">Live Demo</span>`
                }
                ${project.links.repo && project.links.repo !== "YOUR_REPO_LINK_HERE"
                    ? `<a href="${project.links.repo}" aria-label="${repoLinkLabel}" target="_blank" rel="noopener noreferrer">GitHub Repo</a>`
                    : `<span class="link-disabled" aria-label="${repoLinkLabel}">GitHub Repo</span>`
                }
            </nav>
        </article>
    `;
}
