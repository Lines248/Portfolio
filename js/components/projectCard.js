export function ProjectCard(project) {
    const stackList = project.stack
    .map((item) => `<li>${item}</li>`)
    .join("");

return `
    <article class="project-card">
    <img
        src="${project.image}"
         alt="${project.alt}"
        />

    <h2>${project.title}</h2>

    <p class="project-desc">${project.description}</p>

    <ul class="project-points">
        ${stackList}
    </ul>

    <div class="links">
       <a href="${project.links.live}">Live Demo</a>
       <a href="${project.links.repo}">GitHub Repo</a>
    </div>
    </article>
 `;
}
