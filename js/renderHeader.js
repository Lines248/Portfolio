import { SiteHeader } from "./components/siteHeader.js";

export function renderHeader() {
    const header = document.querySelector("header");
    if (!header) return;
    
    header.classList.add("site-header");
    header.innerHTML = SiteHeader();

    const navLinks = header.querySelectorAll("a[href]");
    const current = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === current) {
            link.classList.add("active");
        }
    });
}