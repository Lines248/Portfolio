export class SideNav {
  constructor() {
    this.currentPage = window.location.pathname.split("/").pop() || "index.html";
  }

  render() {
    const isWorkActive = this.currentPage === 'work.html';
    const isAboutActive = this.currentPage === 'about.html';
    
    return `
      <nav class="side-nav" aria-label="Page navigation">
        <a 
          href="work.html" 
          class="side-nav-btn ${isWorkActive ? 'active' : ''}"
          data-nav="work"
          aria-label="View work portfolio${isWorkActive ? ' (current page)' : ''}"
          ${isWorkActive ? 'aria-current="page"' : ''}
        >
          <span class="side-nav-btn-text">Work</span>
          <span class="side-nav-btn-bg" aria-hidden="true"></span>
        </a>
        <a 
          href="about.html" 
          class="side-nav-btn ${isAboutActive ? 'active' : ''}"
          data-nav="about"
          aria-label="View about page${isAboutActive ? ' (current page)' : ''}"
          ${isAboutActive ? 'aria-current="page"' : ''}
        >
          <span class="side-nav-btn-text">About</span>
          <span class="side-nav-btn-bg" aria-hidden="true"></span>
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

