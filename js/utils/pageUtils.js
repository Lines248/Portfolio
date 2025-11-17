export class PageUtils {
  static getCurrentPage() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

 
  static highlightActiveLink() {
    const currentPage = this.getCurrentPage();
    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === currentPage) {
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

