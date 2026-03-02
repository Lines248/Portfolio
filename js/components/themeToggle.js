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
        id="theme-toggle-btn"
        class="theme-toggle"
        data-theme-toggle
        type="button"
        aria-label="Cycle theme. Current: ${themeLabel}."
        title="Current theme: ${themeLabel}. Click to cycle."
      >
        <span class="horizon-window">
          <span class="celestial-body"></span>
        </span>
        <span class="theme-label" id="theme-label-text">${themeLabel}</span>
      </button>
    `;
  }

  getThemeLabel(theme) {
    const labels = { light: 'LIGHT', nature: 'NATURE', dark: 'DARK' };
    return labels[theme] || (theme || '').toUpperCase();
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
    const label = document.getElementById('theme-label-text');
    const button = document.getElementById('theme-toggle-btn');
    if (button && label) {
      const themeLabel = this.getThemeLabel(theme);
      label.textContent = themeLabel;
      button.setAttribute('aria-label', `Cycle theme. Current: ${themeLabel}.`);
      button.setAttribute('title', `Current theme: ${themeLabel}. Click to cycle.`);
    }
  }
}

