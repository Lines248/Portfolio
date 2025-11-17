export class SideNav {
  constructor() {
    this.currentPage = window.location.pathname.split("/").pop() || "index.html";
  }

  render() {
    return `
      <nav class="side-nav" aria-label="Main navigation">
        <a 
          href="work.html" 
          class="side-nav-btn ${this.currentPage === 'work.html' ? 'active' : ''}"
          data-nav="work"
        >
          <span class="side-nav-btn-text">Work</span>
          <span class="side-nav-btn-bg"></span>
        </a>
        <a 
          href="about.html" 
          class="side-nav-btn ${this.currentPage === 'about.html' ? 'active' : ''}"
          data-nav="about"
        >
          <span class="side-nav-btn-text">About</span>
          <span class="side-nav-btn-bg"></span>
        </a>
      </nav>
    `;
  }

  init() {
    const container = document.querySelector('[data-side-nav-container]');
    if (!container) return;

    container.innerHTML = this.render();
    this.attachEventListeners();
  }

  attachEventListeners() {
    const buttons = document.querySelectorAll('.side-nav-btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        if (!button.classList.contains('active')) {
          button.classList.add('hover');
        }
      });

      button.addEventListener('mouseleave', () => {
        button.classList.remove('hover');
      });
    });
  }
}

