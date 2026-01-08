export async function renderProjects({ containerId, filter = null, filteredList = null }) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    
    container.setAttribute("aria-busy", "true");
    
    const [{ projects }, { ProjectCard }] = await Promise.all([
        import("./data/projects.js"),
        import("./components/projectCard.js")
    ]);
    
    // Determine which list to use
    let list;
    if (filteredList) {
        // Use provided filtered list (already filtered by workFilters)
        list = filteredList;
    } else if (filter === "featured") {
        // Filter for featured projects only
        list = projects.filter((p) => p.featured);
    } else {
        // Use all projects
        list = projects;
    }
    
    // Remove duplicates by ID (keep first occurrence)
    const seenIds = new Set();
    const uniqueList = list.filter(project => {
        if (seenIds.has(project.id)) {
            return false;
        }
        seenIds.add(project.id);
        return true;
    });
    
    // Generate HTML and replace container content in one operation
    const cardsHTML = uniqueList.map((project, index) => ProjectCard(project, index)).join("");
    container.innerHTML = cardsHTML;
    container.removeAttribute("aria-busy");
}