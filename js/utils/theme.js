export function enableDarkMode() {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
}
export function disableDarkMode() {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
}

export function loadInitialTheme() {
    const stored = localStorage.getItem("theme");

    if (stored === "dark") {
        enableDarkMode();
    }   else if (stored === "light") {
        disableDarkMode();
    } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            enableDarkMode();
        }
    }
}