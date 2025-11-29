class AnalyticsManager {
  constructor() {
    this.shouldExclude = this.checkExclusion();
    this.clarityLoaded = false;
    this.interactionListenersAdded = false;
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

  loadClarity(projectId, config = {}) {
    if (!projectId || !this.shouldLoadAnalytics() || this.clarityLoaded) {
      return;
    }

    if (window.clarity) {
      this.clarityLoaded = true;
      return;
    }

    const loadClarityScript = () => {
      if (this.clarityLoaded) return;
      
      (function(c, l, a, r, i, t, y) {
        c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.body || l.getElementsByTagName("body")[0];
        y.appendChild(t);
      })(window, document, "clarity", "script", projectId);
      
      this.clarityLoaded = true;
    };

    if (config.loadAfterInteraction) {
      this.loadClarityOnInteraction(loadClarityScript, config.loadDelay);
    } else {
      this.loadClarityAfterDelay(loadClarityScript, config.loadDelay);
    }
  }

  loadClarityOnInteraction(loadFn, minDelay) {
    let delayPassed = false;
    let interacted = false;
    
    const checkAndLoad = () => {
      if (delayPassed && interacted && !this.clarityLoaded) {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadFn, { timeout: 5000 });
        } else {
          setTimeout(loadFn, 100);
        }
      }
    };

    setTimeout(() => {
      delayPassed = true;
      checkAndLoad();
    }, minDelay);

    const interactionEvents = ['scroll', 'click', 'keydown', 'touchstart'];
    const handleInteraction = () => {
      if (!interacted) {
        interacted = true;
        checkAndLoad();
        interactionEvents.forEach(event => {
          document.removeEventListener(event, handleInteraction, { passive: true });
        });
      }
    };

    interactionEvents.forEach(event => {
      document.addEventListener(event, handleInteraction, { passive: true, once: true });
    });

    if (!this.interactionListenersAdded) {
      this.interactionListenersAdded = true;
    }
  }

  loadClarityAfterDelay(loadFn, delay) {
    setTimeout(() => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadFn, { timeout: 5000 });
      } else {
        setTimeout(loadFn, 100);
      }
    }, delay);
  }
}

export const analyticsManager = new AnalyticsManager();

