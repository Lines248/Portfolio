/**
 * Main Entry Point
 * 
 * This file initializes the portfolio application.
 * It uses the App class to manage all components in an organized, OOP way.
 */

import { App } from "./core/App.js";

// Initialize the application when the DOM is ready
const app = new App();
app.init();