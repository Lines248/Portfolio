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
    const clarityScript = document.querySelector('script[src*="clarity.ms"]');
    
    if (insightsScript) {
      insightsScript.remove();
    }
    
    if (speedScript) {
      speedScript.remove();
    }
    
    if (clarityScript) {
      clarityScript.remove();
    }
    
    if (window.clarity) {
      window.clarity = undefined;
    }
  }

  loadClarity(projectId) {
    if (!projectId || !this.shouldLoadAnalytics()) {
      return;
    }

    if (window.clarity) {
      return;
    }

    (function(c, l, a, r, i, t, y) {
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.body || l.getElementsByTagName("body")[0];
      y.appendChild(t);
    })(window, document, "clarity", "script", projectId);
  }
}

export const analyticsManager = new AnalyticsManager();

