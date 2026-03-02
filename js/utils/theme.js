class ThemeManager {
  constructor() {
    this.themes = ['light', 'nature', 'dark'];
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
  }

  getStoredTheme() {
    const t = localStorage.getItem('theme');
    return t === 'environment' ? 'nature' : t;
  }

  getPreferredTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  setTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }

    const htmlEl = document.documentElement;
    ['light', 'dark', 'environment'].forEach(c => htmlEl.classList.remove(c));

    const themeClass = theme === 'nature' ? 'environment' : theme;
    htmlEl.classList.add(themeClass);
    htmlEl.setAttribute('data-theme', theme);

    localStorage.setItem('theme', theme);
    this.currentTheme = theme;

    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }


  getNextTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    return this.themes[nextIndex];
  }

 
  cycleTheme() {
    const nextTheme = this.getNextTheme();
    this.setTheme(nextTheme);
    return nextTheme;
  }


  loadInitialTheme() {
    const stored = this.getStoredTheme();
    if (stored && this.themes.includes(stored)) {
      this.setTheme(stored);
      return;
    }
    const preferred = this.getPreferredTheme();
    if (preferred) {
      this.setTheme(preferred);
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

export const themeManager = new ThemeManager();

export function enableDarkMode() {
  themeManager.setTheme('dark');
}

export function disableDarkMode() {
  themeManager.setTheme('light');
}

export function loadInitialTheme() {
  themeManager.loadInitialTheme();
}
