export function SiteFooter() {
    const year = new Date().getFullYear();
    
    return `
        <div class="footer-inner">
        <p>© ${year} Lines Sultzer - InLine Access Studio</p>
        <nav class="footer-nav">
            <a href="mailto: LinesSultzer@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/lines-sultzer/">LinkedIn</a>
            <a href="https://github.com/Lines248"">GitHub</a>
        </nav>
        </div>
    `;
}