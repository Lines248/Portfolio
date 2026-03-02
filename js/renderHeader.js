import { SiteHeader } from "./components/siteHeader.js";
import { PageUtils } from "./utils/pageUtils.js";

export function renderHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    header.classList.add("site-header");
    header.innerHTML = SiteHeader();

    const navLinks = header.querySelectorAll("a[href]");
    const current = PageUtils.getCurrentPage();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        const normalizedPath = PageUtils.normalizePageName(linkPath.replace("/", "").replace(".html", ""));
        const normalizedCurrent = PageUtils.normalizePageName(current);

        if (normalizedPath === normalizedCurrent ||
            (linkPath === "/" && normalizedCurrent === "index.html") ||
            (linkPath === "/home" && normalizedCurrent === "index.html")) {
            link.classList.add("active");
        }
    });

    initMobileMenu(header);
}

function initMobileMenu(header) {
    const menuToggle = header.querySelector(".mobile-menu-toggle");
    const navDropdown = header.querySelector("#nav-dropdown");

    if (!menuToggle || !navDropdown) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = navDropdown.style.display === "flex";
        navDropdown.style.display = isOpen ? "none" : "flex";
        navDropdown.hidden = isOpen;
        menuToggle.setAttribute("aria-expanded", !isOpen);
        menuToggle.innerText = isOpen ? "MENU" : "CLOSE";

        if (isOpen) {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";
        }
    });
}