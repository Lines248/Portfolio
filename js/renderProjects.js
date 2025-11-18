import { projects } from "./data/projects.js";
import { ProjectCard } from "./components/projectCard.js";

export function renderProjects({ containerId, filter = null, filteredList = null }) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID "${containerId}" not found. `);
        return;
    }
    
    let list = filteredList || projects;

    if (filter === "featured") {
        list = projects.filter((p) => p.featured);
    }
    
    container.innerHTML = list.map(ProjectCard).join("");
}