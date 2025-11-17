class ThemeManager {
  constructor() {
    this.themes = ['light', 'dark', 'environment'];
    
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
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

    this.themes.forEach(t => {
      document.documentElement.classList.remove(t);
    });

    document.documentElement.classList.add(theme);
    
    localStorage.setItem('theme', theme);
    
    this.currentTheme = theme;
    
    document.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme } 
    }));
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
      // Use stored theme if valid
      this.setTheme(stored);
    } else {
      this.setTheme(this.getPreferredTheme());
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
