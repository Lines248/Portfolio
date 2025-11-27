export async function renderProjects({ containerId, filter = null, filteredList = null }) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID "${containerId}" not found. `);
        return;
    }
    
    const [{ projects }, { ProjectCard }] = await Promise.all([
        import("./data/projects.js"),
        import("./components/projectCard.js")
    ]);
    
    let list = filteredList || projects;

    if (filter === "featured") {
        list = projects.filter((p) => p.featured);
    }
    
    container.innerHTML = list.map(ProjectCard).join("");
}