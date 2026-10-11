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

    const firstLink = navDropdown.querySelector("a");

    function closeMenu() {
        navDropdown.style.display = "none";
        navDropdown.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "Menu";
        document.body.style.overflow = "auto";
        menuToggle.focus();
    }

    function openMenu() {
        navDropdown.style.display = "flex";
        navDropdown.hidden = false;
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.textContent = "Close";
        document.body.style.overflow = "hidden";
        if (firstLink) firstLink.focus();
    }

    navDropdown.querySelectorAll('a[href^="/#"]').forEach(link => {
        link.addEventListener("click", () => {
            navDropdown.style.display = "none";
            navDropdown.hidden = true;
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "Menu";
            document.body.style.overflow = "auto";
        });
    });

    menuToggle.addEventListener("click", () => {
        const isOpen = navDropdown.style.display === "flex";
        if (isOpen) closeMenu();
        else openMenu();
    });

    // Close the menu if keyboard focus moves outside it (no trapped or hidden focus)
    header.addEventListener("focusout", (e) => {
        const isOpen = navDropdown.style.display === "flex";
        if (isOpen && !header.contains(e.relatedTarget)) {
            navDropdown.style.display = "none";
            navDropdown.hidden = true;
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "Menu";
            document.body.style.overflow = "auto";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navDropdown.style.display === "flex") {
            closeMenu();
        }
    });
}