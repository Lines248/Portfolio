export function SiteFooter() {
    const year = new Date().getFullYear();
    
    return `
        <footer class="site-footer">
        <div class="footer-inner">
        <p>© ${year} Lines Sultzer - InLine Access Studio</p>
        <nav class="footer-nav">
        <a href="index.html">Home</a>
        <a href="work.html">Work</a>
        <a href="about.html">About</a>
        </nav>
        </div>
        </footer>
    `;
}