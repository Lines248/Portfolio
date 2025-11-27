class AnalyticsManager {
  constructor() {
    this.shouldExclude = this.checkExclusion();
  }

  checkExclusion() {
    const excludeParam = new URLSearchParams(window.location.search).get('exclude-analytics');
    const excludeStorage = localStorage.getItem('exclude-analytics') === 'true';
    
    if (excludeParam === 'true') {
      localStorage.setItem('exclude-analytics', 'true');
      return true;
    }
    
    if (excludeParam === 'false') {
      localStorage.removeItem('exclude-analytics');
      return false;
    }
    
    return excludeStorage;
  }

  shouldLoadAnalytics() {
    return !this.shouldExclude;
  }

  disableAnalytics() {
    const insightsScript = document.querySelector('script[src*="/_vercel/insights/script.js"]');
    const speedScript = document.querySelector('script[src*="/_vercel/speed-insights/script.js"]');
    
    if (insightsScript) {
      insightsScript.remove();
    }
    
    if (speedScript) {
      speedScript.remove();
    }
  }
}

export const analyticsManager = new AnalyticsManager();

