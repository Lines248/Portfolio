/**
 * Magnetic hover: subtle pull toward cursor for .metric-pill and .work-card / .project-card.
 * 44px ghost range, max 5px movement, requestAnimationFrame for 120Hz smoothness.
 * Only runs when prefers-reduced-motion: no-preference.
 */

const MAGNET_RANGE = 44;
const MAGNET_STRENGTH = 5;
const SELECTORS = ".metric-pill, .metric-pill--link, .work-card, .project-card";
const VAR_X = "--m-x";
const VAR_Y = "--m-y";
const VAR_RESET = "0px";

let rafId = null;
let mouseX = 0;
let mouseY = 0;
let elements = [];
let active = false;

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getRect(el) {
  return el.getBoundingClientRect();
}

function getCenter(rect) {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function distance(ax, ay, bx, by) {
  return Math.hypot(bx - ax, by - ay);
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function updateElements() {
  elements = Array.from(document.querySelectorAll(SELECTORS));
}

function tick() {
  if (!active || elements.length === 0) {
    rafId = null;
    return;
  }
  elements.forEach((el) => {
    const rect = getRect(el);
    const center = getCenter(rect);
    const d = distance(mouseX, mouseY, center.x, center.y);
    if (d >= MAGNET_RANGE) {
      el.style.setProperty(VAR_X, VAR_RESET);
      el.style.setProperty(VAR_Y, VAR_RESET);
      return;
    }
    const t = 1 - d / MAGNET_RANGE;
    const pull = t * MAGNET_STRENGTH;
    const angle = Math.atan2(mouseY - center.y, mouseX - center.x);
    const dx = clamp(Math.cos(angle) * pull, -MAGNET_STRENGTH, MAGNET_STRENGTH);
    const dy = clamp(Math.sin(angle) * pull, -MAGNET_STRENGTH, MAGNET_STRENGTH);
    el.style.setProperty(VAR_X, `${dx}px`);
    el.style.setProperty(VAR_Y, `${dy}px`);
  });
  rafId = requestAnimationFrame(tick);
}

function onMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!active) return;
  if (rafId == null) rafId = requestAnimationFrame(tick);
}

function onMouseLeave() {
  mouseX = -1e4;
  mouseY = -1e4;
  elements.forEach((el) => {
    el.style.setProperty(VAR_X, VAR_RESET);
    el.style.setProperty(VAR_Y, VAR_RESET);
  });
}

function init() {
  if (prefersReducedMotion()) return;
  active = true;
  updateElements();
  document.addEventListener("mousemove", onMouseMove, { passive: true });
  document.addEventListener("mouseleave", onMouseLeave);
  window.addEventListener("blur", onMouseLeave);
}

function destroy() {
  active = false;
  if (rafId != null) cancelAnimationFrame(rafId);
  rafId = null;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseleave", onMouseLeave);
  window.removeEventListener("blur", onMouseLeave);
  elements.forEach((el) => {
    el.style.setProperty(VAR_X, VAR_RESET);
    el.style.setProperty(VAR_Y, VAR_RESET);
  });
  elements = [];
}

export const magneticHover = { init, destroy, updateElements };
