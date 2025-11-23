export class PageUtils {
  static getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "";
    
    if (page === "" || page === "/" || page === "home") {
      return "index.html";
    }
    
    if (page === "work") {
      return "work.html";
    }
    
    if (page === "about") {
      return "about.html";
    }
    
    if (page === "vending-machine") {
      return "vending-machine.html";
    }
    
    return page || "index.html";
  }
  
  static normalizePageName(page) {
    if (page === "" || page === "/" || page === "home" || page === "index.html") {
      return "index.html";
    }
    if (page === "work" || page === "work.html") {
      return "work.html";
    }
    if (page === "about" || page === "about.html") {
      return "about.html";
    }
    return page;
  }

 
  static highlightActiveLink() {
    const currentPage = this.getCurrentPage();
    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      const normalizedHref = this.normalizePageName(href.replace("/", "").replace(".html", ""));
      const normalizedCurrent = this.normalizePageName(currentPage);
      
      if (normalizedHref === normalizedCurrent || 
          (href === "/" && normalizedCurrent === "index.html") ||
          (href === "/home" && normalizedCurrent === "index.html")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }


  static enableHeaderScrollShadow() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 8) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }


  static initFadeInAnimations() {
    const fadeInElements = document.querySelectorAll(".fade-in-image, .fade-in");
    
    if (fadeInElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const isFadeInImage = entry.target.classList.contains("fade-in-image");
          const className = isFadeInImage ? "visible" : "is-visible";
          
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    fadeInElements.forEach(element => {
      observer.observe(element);
    });
  }
}

