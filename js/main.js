import { inject } from "@vercel/analytics";
import { App } from "./core/App.js";

inject();

const app = new App();
app.init();