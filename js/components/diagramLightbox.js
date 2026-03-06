/**
 * Shared fullscreen diagram lightbox. Used on work page and case study pages.
 * open(projects, currentIndex, getImageInfo) where getImageInfo(project) => { src, alt, title, caseStudyUrl }
 */
let _projects = null;
let _index = 0;
let _getImageInfo = null;
let _listenersAttached = false;

function ensureDOM() {
  if (document.getElementById("diagram-lightbox")) return;
  const box = document.createElement("div");
  box.id = "diagram-lightbox";
  box.className = "diagram-lightbox";
  box.setAttribute("aria-hidden", "true");
  box.innerHTML = `
    <div class="diagram-lightbox__backdrop" data-lightbox-close></div>
    <button type="button" class="diagram-lightbox__close" aria-label="Close" data-lightbox-close>×</button>
    <button type="button" class="diagram-lightbox__arrow diagram-lightbox__prev" aria-label="Previous project" data-lightbox-prev>←</button>
    <button type="button" class="diagram-lightbox__arrow diagram-lightbox__next" aria-label="Next project" data-lightbox-next>→</button>
    <div class="diagram-lightbox__panel">
      <h2 class="diagram-lightbox__title"></h2>
      <div class="diagram-lightbox__image-wrap">
        <img class="diagram-lightbox__image" src="" alt="" />
        <a href="#" class="diagram-lightbox__case-study-link" data-lightbox-case-study>View Case Study</a>
      </div>
      <p class="diagram-lightbox__caption"></p>
    </div>
  `;
  document.body.appendChild(box);
  attachListeners();
}

function attachListeners() {
  if (_listenersAttached) return;
  const box = document.getElementById("diagram-lightbox");
  if (!box) return;
  _listenersAttached = true;
  box.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", () => close());
  });
  box.querySelector("[data-lightbox-prev]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    goPrev();
  });
  box.querySelector("[data-lightbox-next]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    goNext();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && box.classList.contains("diagram-lightbox--open")) {
      close();
    }
    if (box.classList.contains("diagram-lightbox--open")) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
  });
}

function updateContent() {
  const box = document.getElementById("diagram-lightbox");
  if (!box || _projects == null || _getImageInfo == null) return;
  const project = _projects[_index];
  if (!project) return;
  const info = _getImageInfo(project);
  if (!info) return;
  box.querySelector(".diagram-lightbox__title").textContent = info.title ?? "";
  const img = box.querySelector(".diagram-lightbox__image");
  img.setAttribute("src", info.src ?? "");
  img.setAttribute("alt", info.alt ?? "");
  box.querySelector(".diagram-lightbox__caption").textContent = info.alt ?? "";
  const caseStudyLink = box.querySelector(".diagram-lightbox__case-study-link");
  if (caseStudyLink) {
    caseStudyLink.href = info.caseStudyUrl ?? "#";
  }
  const prevBtn = box.querySelector("[data-lightbox-prev]");
  const nextBtn = box.querySelector("[data-lightbox-next]");
  if (prevBtn) {
    prevBtn.disabled = _index === 0;
    prevBtn.setAttribute("aria-disabled", _index === 0);
  }
  if (nextBtn) {
    nextBtn.disabled = _index === _projects.length - 1;
    nextBtn.setAttribute("aria-disabled", _index === _projects.length - 1);
  }
}

export function open(projects, currentIndex, getImageInfo) {
  if (!projects || !projects.length || typeof getImageInfo !== "function") return;
  _projects = projects;
  _index = Math.max(0, Math.min(currentIndex, projects.length - 1));
  _getImageInfo = getImageInfo;
  ensureDOM();
  updateContent();
  const box = document.getElementById("diagram-lightbox");
  if (box) {
    box.classList.add("diagram-lightbox--open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

export function close() {
  const box = document.getElementById("diagram-lightbox");
  if (box) {
    box.classList.remove("diagram-lightbox--open");
    box.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  _projects = null;
  _index = 0;
  _getImageInfo = null;
}

function goPrev() {
  if (_index > 0) {
    _index--;
    updateContent();
  }
}

function goNext() {
  if (_projects && _index < _projects.length - 1) {
    _index++;
    updateContent();
  }
}

export const diagramLightbox = { ensureDOM, open, close };
