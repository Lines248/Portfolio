export async function renderProjects({ containerId, filter = null, filteredList = null }) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID "${containerId}" not found. `);
        return;
    }
    
    container.setAttribute("aria-busy", "true");
    
    const [{ projects }, { ProjectCard }] = await Promise.all([
        import("./data/projects.js"),
        import("./components/projectCard.js")
    ]);
    
    let list = filteredList || projects;

    if (filter === "featured") {
        list = projects.filter((p) => p.featured);
    }
    
    const skeletons = container.querySelectorAll(".project-card-skeleton");
    const cardsHTML = list.map(ProjectCard).join("");
    
    if (skeletons.length > 0) {
        skeletons.forEach(skeleton => skeleton.remove());
    }
    
    container.insertAdjacentHTML("beforeend", cardsHTML);
    container.removeAttribute("aria-busy");
}