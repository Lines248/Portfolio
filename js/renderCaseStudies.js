import { featuredCaseStudies } from "./data/featuredCaseStudies.js";
import { CaseStudyCard } from "./components/caseStudyCard.js";

export function renderCaseStudies() {
  const grid = document.querySelector(".case-studies-grid");
  if (!grid) return;

  grid.innerHTML = featuredCaseStudies
    .map((study, index) => CaseStudyCard(study, index))
    .join("");
}
