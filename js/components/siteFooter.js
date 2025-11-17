export function SiteFooter() {
    const year = new Date().getFullYear();
    
    return `
        <div class="footer-inner">
            <p>© ${year} Lines Sultzer - InLine Access Studio</p>
            <nav class="footer-nav" aria-label="Footer links">
                <a href="mailto:LinesSultzer@gmail.com" aria-label="Send email to Lines Sultzer">Email</a>
                <a href="https://www.linkedin.com/in/lines-sultzer/" aria-label="Visit Lines Sultzer's LinkedIn profile (opens in new window)" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/Lines248" aria-label="Visit Lines Sultzer's GitHub profile (opens in new window)" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="assets/resume.pdf" aria-label="Download Lines Sultzer's resume (PDF)" download="Lines-Sultzer-Resume.pdf">Resume</a>
            </nav>
        </div>
    `;
}