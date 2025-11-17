console.log("Portfolio loaded")
import { renderFooter } from "./renderFooter.js";
import { renderHeader } from "./renderHeader.js";
import { loadInitialTheme, enableDarkMode, disableDarkMode } from "./utils/theme.js";

renderHeader();
renderFooter();
loadInitialTheme();

document.addEventListener("click", (e) => {
    if (e.target.matches("[data-theme-toggle]")) {
        const isDark = document.documentElement.classList.contains("dark");

        if (isDark) disableDarkMode();
        else enableDarkMode();
    }
});