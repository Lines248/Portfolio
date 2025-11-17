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

    // Remove all theme classes
    this.themes.forEach(t => {
      document.documentElement.classList.remove(t);
    });

    // Add the selected theme class
    document.documentElement.classList.add(theme);
    
    // Store in localStorage
    localStorage.setItem('theme', theme);
    
    this.currentTheme = theme;
    
    // Dispatch custom event for theme change
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
      this.setTheme(stored);
    } else {
      this.setTheme(this.getPreferredTheme());
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

// Create singleton instance
export const themeManager = new ThemeManager();

// Export convenience functions for backward compatibility
export function enableDarkMode() {
  themeManager.setTheme('dark');
}

export function disableDarkMode() {
  themeManager.setTheme('light');
}

export function loadInitialTheme() {
  themeManager.loadInitialTheme();
}
