/**
 * Media item within a case study section (image, Figma embed, or video).
 */
export interface CaseStudySectionMedia {
  type: "image" | "figma-embed" | "video";
  src: string;
  caption: string;
}

/**
 * A single section in a case study (heading, body copy, and optional media).
 */
export interface CaseStudySection {
  heading: string;
  body: string;
  media: CaseStudySectionMedia[];
}

/**
 * Case study content structure for dynamic, data-driven case study pages.
 * Used by the CaseStudy component to render hero, sections, and media
 * (images, Figma embeds, video) in a consistent layout.
 */
export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  roles: string[];
  context: string;
  sections: CaseStudySection[];
}
