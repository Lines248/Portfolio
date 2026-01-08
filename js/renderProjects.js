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
    
    // Remove duplicates by ID (keep first occurrence)
    const seenIds = new Set();
    list = list.filter(project => {
        if (seenIds.has(project.id)) {
            return false;
        }
        seenIds.add(project.id);
        return true;
    });
    
    // Clear existing content first to prevent duplicates
    container.innerHTML = '';
    
    const skeletons = container.querySelectorAll(".project-card-skeleton");
    const cardsHTML = list.map((project, index) => ProjectCard(project, index)).join("");
    
    if (skeletons.length > 0) {
        skeletons.forEach(skeleton => skeleton.remove());
    }
    
    container.insertAdjacentHTML("beforeend", cardsHTML);
    container.removeAttribute("aria-busy");
}