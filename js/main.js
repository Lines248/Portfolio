console.log("Portfolio loaded")
import { renderFooter } from "./renderFooter.js";
import { renderHeader } from "./renderHeader.js";
import { renderProjects } from "./renderProjects.js";

import { loadInitialTheme, enableDarkMode, disableDarkMode } from "./utils/theme.js";

renderHeader();
renderFooter();
loadInitialTheme();
renderHeader();
highlightActiveLink();
enableHeaderScrollShadow();
initFadeInAnimations();

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

function highlightActiveLink() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".nav a");

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href === path) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function enableHeaderScrollShadow() {
    const header = document.querySelector(".site-header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 8) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

function initFadeInAnimations() {
    const fadeInElements = document.querySelectorAll(".fade-in-image, .fade-in");
    
    if (fadeInElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(entry.target.classList.contains("fade-in-image") ? "visible" : "is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
}