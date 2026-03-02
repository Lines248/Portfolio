export function SiteHeader() {
    return `
    <nav class="nav" role="navigation" aria-label="Main navigation">
        <a href="/" class="logo" aria-label="Caroline (Lines) Sultzer - Home">Caroline (Lines) Sultzer</a>
        <ul class="nav__links" role="list">
            <li><a href="/work">Work</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/assets/resume.pdf" download="Resume-Caroline-Sultzer.pdf" aria-label="Download Caroline (Lines) Sultzer's resume (PDF)">Resume</a></li>
        </ul>
    </nav>
    `;
}