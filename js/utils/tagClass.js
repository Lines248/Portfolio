/**
 * Maps technology tag names to color-coding modifier classes for backend / frontend / creative.
 */

const BACKEND = [
  "java", "python", "postgresql", "rest api", "rest apis", "sql", "spring boot",
  "yelp api", "yelp fusion", "cli", "dao", "sanity cms"
];

const FRONTEND = [
  "react", "vue", "vue.js", "javascript", "typescript", "html", "semantic html",
  "css", "tailwind", "vite", "css modules", "next.js", "framer motion", "vercel"
];

const CREATIVE = [
  "wcag", "accessibility", "full-stack", "interactive design", "ui/ux", "ux/ui",
  "responsive ui", "figma", "design"
];

function normalize(tag) {
  return (tag || "").toLowerCase().trim();
}

export function getTagClass(tag) {
  const t = normalize(tag);
  if (BACKEND.some((k) => t.includes(k) || k.includes(t))) return "tag-backend";
  if (CREATIVE.some((k) => t.includes(k) || k.includes(t))) return "tag-creative";
  if (FRONTEND.some((k) => t.includes(k) || k.includes(t))) return "tag-frontend";
  return "tag-frontend";
}
