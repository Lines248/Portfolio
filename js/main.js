import { App } from "./core/App.js";
import { analyticsManager } from "./utils/analytics.js";

if (analyticsManager.shouldLoadAnalytics()) {
  const insightsScript = document.createElement("script");
  insightsScript.src = "/_vercel/insights/script.js";
  insightsScript.defer = true;
  document.body.appendChild(insightsScript);

  const speedScript = document.createElement("script");
  speedScript.src = "/_vercel/speed-insights/script.js";
  speedScript.defer = true;
  document.body.appendChild(speedScript);
}

const app = new App();
app.init();