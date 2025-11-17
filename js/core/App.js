import { renderFooter } from "../renderFooter.js";
import { renderHeader } from "../renderHeader.js";
import { renderProjects } from "../renderProjects.js";
import { themeManager } from "../utils/theme.js";
import { ThemeToggle } from "../components/themeToggle.js";
import { SideNav } from "../components/sideNav.js";
import { PageUtils } from "../utils/pageUtils.js";

export class App {
  constructor() {
    this.currentPage = PageUtils.getCurrentPage();
    this.components = {
      themeToggle: null,
      sideNav: null
    };
  }


  init() {
    this.renderBaseComponents();
    this.loadTheme();
    this.initNavigation();
    this.initPageSpecificFeatures();
    this.initAnimations();
  }

  renderBaseComponents() {
    renderHeader();
    renderFooter();
  }

  loadTheme() {
    themeManager.loadInitialTheme();
    this.initThemeToggle();
  }


  initThemeToggle() {
    this.components.themeToggle = new ThemeToggle();
    this.components.themeToggle.init(themeManager);
  }


  initNavigation() {
    PageUtils.highlightActiveLink();
    PageUtils.enableHeaderScrollShadow();
    this.initSideNav();
  }

  initSideNav() {
    this.components.sideNav = new SideNav();
    this.components.sideNav.init();
  }

  initPageSpecificFeatures() {
    const pageHandlers = {
      "index.html": () => this.handleHomePage(),
      "work.html": () => this.handleWorkPage()
    };

    const handler = pageHandlers[this.currentPage];
    if (handler) {
      handler();
    }
  }


  handleHomePage() {
    const grid = document.querySelector("#feature-grid");
    if (grid) {
      renderProjects({ containerId: "feature-grid", filter: "feaured" });
    }
  }

  handleWorkPage() {
    const grid = document.querySelector("#work-grid");
    if (grid) {
      renderProjects({ containerId: "work-grid" });
    }
  }

  initAnimations() {
    PageUtils.initFadeInAnimations();
  }
}

