export function CaseStudyCard(study, index = 0) {
  const isFirst = index === 0;
  const loading = isFirst ? "eager" : "lazy";
  const fetchpriority = isFirst ? "high" : "auto";

  return `
    <a href="${study.href}" class="case-study-card" aria-label="View ${study.title} case study">
      <span class="case-study-card__image-wrap">
        <img
          class="case-study-card__image"
          src="${study.image}"
          alt="${study.alt}"
          width="800"
          height="450"
          loading="${loading}"
          fetchpriority="${fetchpriority}"
          decoding="async"
        />
      </span>
      <div class="case-study-card__body">
        <h3 class="case-study-card__title">${study.title}</h3>
        <p class="case-study-card__subtitle">${study.subtitle}</p>
        <p class="case-study-card__description">${study.description}</p>
      </div>
    </a>
  `;
}
