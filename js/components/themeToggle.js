import { makeDraggable } from "../utils/draggable.js";

export class ThemeToggle {
  constructor() {
    this.themeManager = null;
  }
  init(themeManager) {
    this.themeManager = themeManager;
    this.render();
    this.attachEventListeners();
    this.enableMoving();
  }

  // The switcher can be dragged anywhere on screen (or moved with arrow keys)
  enableMoving() {
    const container = document.querySelector('[data-theme-toggle-container]');
    const handle = container?.querySelector('[data-theme-toggle-grip]');
    makeDraggable(container, { handle, storageKey: 'themeTogglePosition' });
  }

  render() {
    const container = document.querySelector('[data-theme-toggle-container]');
    if (!container) return;

    const currentTheme = this.themeManager.getCurrentTheme();
    const themeLabel = this.getThemeLabel(currentTheme);

    container.innerHTML = `
      <button
        class="theme-toggle__grip"
        data-theme-toggle-grip
        type="button"
        aria-label="Move theme switcher. Arrow keys move it, Home puts it back."
        title="Drag to move. Double-click to reset."
      ><span aria-hidden="true"></span></button>
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

