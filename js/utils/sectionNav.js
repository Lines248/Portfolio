/**
 * On the one-page homepage, mark the header link for the section
 * you're looking at (Work or About).
 *
 * aria-current="true" tells screen readers which link matches where you are;
 * the .active class gives the same cue visually.
 */
export function initSectionNav() {
  const links = [...document.querySelectorAll('.site-header a[href^="/#"]')];
  const sections = links
    .map((link) => document.getElementById(link.getAttribute("href").slice(2)))
    .filter(Boolean);
  if (sections.length === 0) return;

  const setCurrent = (id) => {
    links.forEach((link) => {
      const isCurrent = id !== null && link.getAttribute("href") === `/#${id}`;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  // A section counts as "current" when it crosses the upper middle of the screen.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setCurrent(entry.target.id);
        else if (entry.target === sections[0] && entry.boundingClientRect.top > 0) setCurrent(null);
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
