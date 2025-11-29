import { App } from "./core/App.js";
import { analyticsManager } from "./utils/analytics.js";
import { analyticsConfig } from "./config/analytics.js";

const app = new App();
app.init();

if (analyticsManager.shouldLoadAnalytics()) {
  const loadAnalytics = () => {
    const insightsScript = document.createElement("script");
    insightsScript.src = "/_vercel/insights/script.js";
    insightsScript.defer = true;
    document.body.appendChild(insightsScript);

    const speedScript = document.createElement("script");
    speedScript.src = "/_vercel/speed-insights/script.js";
    speedScript.defer = true;
    document.body.appendChild(speedScript);

    if (analyticsConfig.clarity.enabled && analyticsConfig.clarity.projectId) {
      analyticsManager.loadClarity(analyticsConfig.clarity.projectId);
    }
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadAnalytics, { timeout: 2000 });
  } else {
    setTimeout(loadAnalytics, 1000);
  }
}