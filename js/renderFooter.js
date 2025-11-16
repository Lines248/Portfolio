import { SiteFooter } from "./components/siteFooter.js";

export function renderFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;
    footer.outterHTML = SiteFooter();
}