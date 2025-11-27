import { renderFooter } from "../renderFooter.js";
import { renderHeader } from "../renderHeader.js";
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
    this.loadTheme();
    this.renderBaseComponents();
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.initPageSpecificFeatures();
      }, { timeout: 0 });
      
      requestIdleCallback(() => {
        this.initNavigation();
        this.initAnimations();
      }, { timeout: 500 });
    } else {
      setTimeout(() => {
        this.initPageSpecificFeatures();
      }, 0);
      
      setTimeout(() => {
        this.initNavigation();
        this.initAnimations();
      }, 50);
    }
  }

  renderBaseComponents() {
    renderHeader();
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => renderFooter(), { timeout: 2000 });
    } else {
      setTimeout(() => renderFooter(), 100);
    }
  }

  loadTheme() {
    themeManager.loadInitialTheme();
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.initThemeToggle();
      }, { timeout: 100 });
    } else {
      setTimeout(() => {
        this.initThemeToggle();
      }, 0);
    }
  }


  initThemeToggle() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.components.themeToggle = new ThemeToggle();
        this.components.themeToggle.init(themeManager);
      }, { timeout: 500 });
    } else {
      setTimeout(() => {
        this.components.themeToggle = new ThemeToggle();
        this.components.themeToggle.init(themeManager);
      }, 0);
    }
  }


  initNavigation() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        PageUtils.highlightActiveLink();
        PageUtils.enableHeaderScrollShadow();
        this.initSideNav();
      }, { timeout: 500 });
    } else {
      setTimeout(() => {
        PageUtils.highlightActiveLink();
        PageUtils.enableHeaderScrollShadow();
        this.initSideNav();
      }, 50);
    }
  }

  initSideNav() {
    this.components.sideNav = new SideNav();
    this.components.sideNav.init();
  }

  initPageSpecificFeatures() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const pageHandlers = {
          "index.html": () => this.handleHomePage(),
          "work.html": () => this.handleWorkPage(),
          "vending-machine.html": () => this.handleCaseStudyPage()
        };

        const handler = pageHandlers[this.currentPage];
        if (handler) {
          handler();
        } else if (this.isCaseStudyPage()) {
          this.handleCaseStudyPage();
        }
      }, { timeout: 100 });
    } else {
      setTimeout(() => {
        const pageHandlers = {
          "index.html": () => this.handleHomePage(),
          "work.html": () => this.handleWorkPage(),
          "vending-machine.html": () => this.handleCaseStudyPage()
        };

        const handler = pageHandlers[this.currentPage];
        if (handler) {
          handler();
        } else if (this.isCaseStudyPage()) {
          this.handleCaseStudyPage();
        }
      }, 0);
    }
  }

  isCaseStudyPage() {
    const caseStudyContainer = document.querySelector("[data-case-study]");
    if (caseStudyContainer !== null) {
      return true;
    }
    return false;
  }

  async handleCaseStudyPage() {
    const { CaseStudy } = await import("../components/caseStudy.js");
    const caseStudy = new CaseStudy();
    caseStudy.init();
  }


  async handleHomePage() {
    const grid = document.querySelector("#feature-grid");
    if (grid) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(async () => {
          const { renderProjects } = await import("../renderProjects.js");
          await renderProjects({ containerId: "feature-grid", filter: "featured" });
        }, { timeout: 100 });
      } else {
        setTimeout(async () => {
          const { renderProjects } = await import("../renderProjects.js");
          await renderProjects({ containerId: "feature-grid", filter: "featured" });
        }, 0);
      }
    }
  }

  async handleWorkPage() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(async () => {
        const { WorkFilters } = await import("../components/workFilters.js");
        const workFilters = new WorkFilters();
        workFilters.init();
      }, { timeout: 300 });
    } else {
      setTimeout(async () => {
        const { WorkFilters } = await import("../components/workFilters.js");
        const workFilters = new WorkFilters();
        workFilters.init();
      }, 0);
    }
  }

  initAnimations() {
    PageUtils.initFadeInAnimations();
  }
}

