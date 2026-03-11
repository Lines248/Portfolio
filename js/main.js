import { App } from "./core/App.js";
import { analyticsManager } from "./utils/analytics.js";
import { analyticsConfig } from "./config/analytics.js";
import { magneticHover } from "./utils/magneticHover.js";

const app = new App();
app.init();

magneticHover.init();
if (typeof requestIdleCallback !== "undefined") {
  requestIdleCallback(() => magneticHover.updateElements(), { timeout: 2000 });
} else {
  setTimeout(() => magneticHover.updateElements(), 1500);
}

if (window.location.hostname !== '127.0.0.1' && window.location.hostname !== 'localhost' && analyticsManager.shouldLoadAnalytics()) {
  const loadVercelAnalytics = () => {
    const insightsScript = document.createElement("script");
    insightsScript.src = "/_vercel/insights/script.js";
    insightsScript.defer = true;
    document.body.appendChild(insightsScript);

    const speedScript = document.createElement("script");
    speedScript.src = "/_vercel/speed-insights/script.js";
    speedScript.defer = true;
    document.body.appendChild(speedScript);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadVercelAnalytics, { timeout: 4000 });
  } else {
    setTimeout(loadVercelAnalytics, 2000);
  }
}

if (analyticsConfig.clarity.enabled && analyticsConfig.clarity.projectId && analyticsManager.shouldLoadAnalytics()) {
  if (document.readyState === 'complete') {
    analyticsManager.loadClarity(analyticsConfig.clarity.projectId, analyticsConfig.clarity);
  } else {
    window.addEventListener('load', () => {
      analyticsManager.loadClarity(analyticsConfig.clarity.projectId, analyticsConfig.clarity);
    }, { once: true });
  }
}