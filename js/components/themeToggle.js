export class ThemeToggle {
  constructor() {
    this.themeManager = null;
  }

  init(themeManager) {
    this.themeManager = themeManager;
    this.render();
    this.attachEventListeners();
  }

  render() {
    const container = document.querySelector('[data-theme-toggle-container]');
    if (!container) return;

    const currentTheme = this.themeManager.getCurrentTheme();
    
    container.innerHTML = `
      <button 
        class="theme-toggle" 
        data-theme-toggle 
        aria-label="Toggle theme"
        title="Current theme: ${currentTheme}. Click to cycle themes."
      >
        <span class="theme-toggle-icon" aria-hidden="true"></span>
        <span class="theme-toggle-label">${this.getThemeLabel(currentTheme)}</span>
      </button>
    `;
  }

  getThemeLabel(theme) {
    const labels = {
      light: 'Light',
      dark: 'Dark',
      environment: 'Nature'
    };
    return labels[theme] || theme;
  }

  attachEventListeners() {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;

    button.addEventListener('click', () => {
      const newTheme = this.themeManager.cycleTheme();
      this.updateButton(newTheme);
    });

    // Update button when theme changes externally
    document.addEventListener('themechange', (e) => {
      this.updateButton(e.detail.theme);
    });
  }

  updateButton(theme) {
    const button = document.querySelector('[data-theme-toggle]');
    const label = button?.querySelector('.theme-toggle-label');
    
    if (button && label) {
      label.textContent = this.getThemeLabel(theme);
      button.setAttribute('title', `Current theme: ${theme}. Click to cycle themes.`);
    }
  }
}

