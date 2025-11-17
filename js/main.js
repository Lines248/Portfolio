console.log("Portfolio loaded")
import { renderFooter } from "./renderFooter.js";
import { renderHeader } from "./renderHeader.js";
import { renderProjects } from "./renderProjects.js";

import { loadInitialTheme, enableDarkMode, disableDarkMode } from "./utils/theme.js";

renderHeader();
renderFooter();
loadInitialTheme();

const CURRENT_PAGE = window.location.pathname.split("/").pop() || "index.html";

if (CURRENT_PAGE === "index.html") {
    const grid = document.querySelector("#feature-grid");
    if (grid) {
        renderProjects({ containerId: "feature-grid", filter: "feaured" });
    }
}

if (CURRENT_PAGE === "work.html") {
    const grid = document.querySelector("#work-grid");
    if (grid) {
        renderProjects({ containerId: "work-grid" });
    }
}

document.addEventListener("click", (e) => {
    if (e.target.matches("[data-theme-toggle]")) {
        const isDark = document.documentElement.classList.contains("dark");

        if (isDark) disableDarkMode();
        else enableDarkMode();
    }
});
