export function SiteHeader() {
    return `
    <nav class="nav" aria-label="Main navigation">
        <a href="/" class="logo" aria-label="Caroline (Lines) Sultzer – Home">CAROLINE (LINES) SULTZER</a>
        <ul class="nav__links" role="list">
            <li><a href="/work" aria-label="Go to Work page">Work</a></li>
            <li><a href="/about" aria-label="Go to About page">About</a></li>
            <li><a href="/assets/caroline_sultzer_resume.pdf" class="nav__resume" target="_blank" rel="noopener noreferrer" download="Caroline-Sultzer-Resume.pdf" data-tooltip="Click to download PDF" aria-label="Download Caroline Sultzer's resume (PDF, opens in new tab)">RESUME</a></li>
        </ul>
        <button type="button" class="mobile-menu-toggle" aria-expanded="false" aria-controls="nav-dropdown" aria-haspopup="true" aria-label="Open main menu">MENU</button>
    </nav>
    <nav id="nav-dropdown" class="nav-dropdown" aria-label="Main navigation (mobile)" hidden>
        <a href="/work" aria-label="Go to Work page">Work</a>
        <a href="/about" aria-label="Go to About page">About</a>
        <a href="/assets/caroline_sultzer_resume.pdf" class="nav__resume" target="_blank" rel="noopener noreferrer" download="Caroline-Sultzer-Resume.pdf" data-tooltip="Click to download PDF" aria-label="Download Caroline Sultzer's resume (PDF, opens in new tab)">RESUME</a>
    </nav>
    `;
}