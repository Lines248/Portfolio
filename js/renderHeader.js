import { SiteHeader } from "./components/siteHeader.js";

export function renderHeader() {
    const header = document.querySelector("header");

    if (!header) {
        console.error("No <header> tag found on this page.");
        return;
    }
    header.outerHTML = SiteHeader();
}