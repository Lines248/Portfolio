export async function renderProjects({ containerId, filter = null, filteredList = null }) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    
    container.innerHTML = '';
    container.setAttribute("aria-busy", "true");
    
    const [{ projects }, { ProjectCard }] = await Promise.all([
        import("./data/projects.js"),
        import("./components/projectCard.js")
    ]);
    
    let list;
    if (filteredList) {
        list = filteredList;
    } else if (filter === "featured") {
        list = projects.filter((p) => p.featured);
    } else {
        list = projects;
    }
    
    const seenIds = new Set();
    const uniqueList = list.filter(project => {
        if (!project || !project.id) return false;
        if (seenIds.has(project.id)) {
            return false;
        }
        seenIds.add(project.id);
        return true;
    });
    
    const cardsHTML = uniqueList.map((project, index) => ProjectCard(project, index)).join("");
    container.innerHTML = cardsHTML;
    container.removeAttribute("aria-busy");
}