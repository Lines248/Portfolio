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
    const themeLabel = this.getThemeLabel(currentTheme);
    
    container.innerHTML = `
      <button 
        class="theme-toggle" 
        data-theme-toggle 
        type="button"
        aria-label="Change theme. Current theme: ${themeLabel}. Cycles through Light, Dark, and Nature themes."
        aria-pressed="false"
        title="Current theme: ${themeLabel}. Click to cycle themes."
      >
        <span class="theme-toggle-icon" aria-hidden="true"></span>
        <span class="theme-toggle-label">${themeLabel}</span>
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

    document.addEventListener('themechange', (e) => {
      this.updateButton(e.detail.theme);
    });
  }

  updateButton(theme) {
    const button = document.querySelector('[data-theme-toggle]');
    const label = button?.querySelector('.theme-toggle-label');
    
    if (button && label) {
      const themeLabel = this.getThemeLabel(theme);
      label.textContent = themeLabel;
      button.setAttribute('aria-label', `Change theme. Current theme: ${themeLabel}. Cycles through Light, Dark, and Nature themes.`);
      button.setAttribute('title', `Current theme: ${themeLabel}. Click to cycle themes.`);
    }
  }
}

