import { renderFooter } from "../renderFooter.js";
import { renderHeader } from "../renderHeader.js";
import { renderProjects } from "../renderProjects.js";
import { themeManager } from "../utils/theme.js";
import { ThemeToggle } from "../components/themeToggle.js";
import { SideNav } from "../components/sideNav.js";
import { WorkFilters } from "../components/workFilters.js";
import { CaseStudy } from "../components/caseStudy.js";
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
    this.initPageSpecificFeatures();
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.initNavigation();
        this.initAnimations();
      }, { timeout: 1000 });
    } else {
      setTimeout(() => {
        this.initNavigation();
        this.initAnimations();
      }, 50);
    }
  }

  renderBaseComponents() {
    renderHeader();
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => renderFooter(), { timeout: 1000 });
    } else {
      setTimeout(() => renderFooter(), 50);
    }
  }

  loadTheme() {
    themeManager.loadInitialTheme();
    this.initThemeToggle();
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
    PageUtils.highlightActiveLink();
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        PageUtils.enableHeaderScrollShadow();
        this.initSideNav();
      }, { timeout: 500 });
    } else {
      setTimeout(() => {
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
      }, { timeout: 200 });
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

  handleCaseStudyPage() {
    const caseStudy = new CaseStudy();
    caseStudy.init();
  }


  handleHomePage() {
    const grid = document.querySelector("#feature-grid");
    if (grid) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          renderProjects({ containerId: "feature-grid", filter: "featured" });
        }, { timeout: 500 });
      } else {
        setTimeout(() => {
          renderProjects({ containerId: "feature-grid", filter: "featured" });
        }, 0);
      }
    }
  }

  handleWorkPage() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const workFilters = new WorkFilters();
        workFilters.init();
      }, { timeout: 300 });
    } else {
      setTimeout(() => {
        const workFilters = new WorkFilters();
        workFilters.init();
      }, 0);
    }
  }

  initAnimations() {
    PageUtils.initFadeInAnimations();
  }
}

