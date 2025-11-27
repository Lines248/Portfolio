import { App } from "./core/App.js";
import { analyticsManager } from "./utils/analytics.js";

const app = new App();
app.init();

if (analyticsManager.shouldLoadAnalytics()) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const insightsScript = document.createElement("script");
      insightsScript.src = "/_vercel/insights/script.js";
      insightsScript.defer = true;
      document.body.appendChild(insightsScript);

      const speedScript = document.createElement("script");
      speedScript.src = "/_vercel/speed-insights/script.js";
      speedScript.defer = true;
      document.body.appendChild(speedScript);
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      const insightsScript = document.createElement("script");
      insightsScript.src = "/_vercel/insights/script.js";
      insightsScript.defer = true;
      document.body.appendChild(insightsScript);

      const speedScript = document.createElement("script");
      speedScript.src = "/_vercel/speed-insights/script.js";
      speedScript.defer = true;
      document.body.appendChild(speedScript);
    }, 1000);
  }
}