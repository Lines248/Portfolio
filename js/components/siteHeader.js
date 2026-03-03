export function SiteHeader() {
    return `
    <nav class="nav" role="navigation" aria-label="Main navigation">
        <a href="/" class="logo" aria-label="Lines Sultzer - Home">LINES SULTZER</a>
        <ul class="nav__links" role="list">
            <li><a href="/work">Work</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/assets/resume.pdf" class="nav__resume" download="Resume-Caroline-Sultzer.pdf" aria-label="Download Lines Sultzer's resume (PDF)">Resume</a></li>
        </ul>
        <button type="button" class="mobile-menu-toggle" aria-expanded="false" aria-controls="nav-dropdown" aria-label="Toggle menu">MENU</button>
    </nav>
    <div id="nav-dropdown" class="nav-dropdown" role="navigation" aria-label="Mobile menu" hidden>
        <a href="/work">Work</a>
        <a href="/about">About</a>
        <a href="/assets/resume.pdf" class="nav__resume" download="Resume-Caroline-Sultzer.pdf" aria-label="Download Lines Sultzer's resume (PDF)">Resume</a>
    </div>
    `;
}