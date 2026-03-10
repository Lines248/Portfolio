# Case Study Structure Reference

This document describes the **exact** data structures, wiring, and templates used to render case study pages in this portfolio. Use it as the single source of truth when adding or changing a case study.

---

## 1. How a case study page is rendered

1. User visits a URL (e.g. `/ia-studio.html`, `/deroche.html`).
2. `App.js` sees `[data-case-study]` in the DOM and calls `CaseStudy.init()`.
3. `CaseStudy` reads the **project id** from the URL via `getProjectIdFromUrl()` (with optional slug→id mapping).
4. It loads **project** from `js/data/projects.js` (for title fallback, stack, links) and **case study content** from `js/data/caseStudies.js` keyed by that same id.
5. It detects **schema**: **Legacy** (has `meta` and no `roles`/`context`) vs **New** (has `roles` array and `context` string).
6. It builds one HTML string and injects it into `[data-case-study]`.

So: **every case study needs a project record and a case study content record keyed by the same `id`**, plus the URLs and nav order configured below.

---

## 2. Two supported schemas

The component supports **two** case study shapes. It chooses by:

- **New schema**: `caseStudyContent.roles` is an array **and** `caseStudyContent.context` is a string.
- **Legacy schema**: otherwise (e.g. has `meta`, or no `roles`/`context`).

---

### 2.1 Legacy schema (IA Studio, NominEat, ACCEX, Vending Machine, This Portfolio)

Used by: `ia-studio`, `nomin-eat`, `accex`, `vending-machine`, `inline-access`.

**Data shape in `caseStudies.js`** (key = project id):

```ts
// Key must match project.id exactly (e.g. "ia-studio", "inline-access")
"[project-id]": {
  meta: {
    role: string;           // e.g. "Software Engineer"
    year: string;           // e.g. "2026"
    stack: string[];        // e.g. ["Next.js 15", "React 19", "Supabase", "TypeScript"]
  };
  overview: string;         // One or two sentences, displayed under meta
  featuredDiagram?: {       // Optional; if present, one hero image below nav
    src: string;            // e.g. "/assets/images/ia-studio-architecture.svg"
    alt: string;
  };
  sections: Array<{
    title: string;           // Section heading
    content: string;         // HTML string (e.g. "<p>...</p>")
    image?: {               // Optional; if present, image above section content
      src: string;
      alt: string;
    };
    embed?: boolean;        // Optional; if true, adds empty Figma embed wrapper div
  }>;
}
```

**TypeScript (for reference):**

```ts
interface CaseStudyLegacyMeta {
  role?: string;
  year?: string;
  stack?: string[];
}

interface CaseStudyLegacySection {
  title: string;
  content: string;
  image?: { src: string; alt: string };
  embed?: boolean;
}

interface CaseStudyLegacy {
  meta: CaseStudyLegacyMeta;
  overview: string;
  featuredDiagram?: { src: string; alt: string };
  sections: CaseStudyLegacySection[];
}
```

**Rendered:**
- Title from `project.title`.
- Optional subtitle from `caseStudyContent.subtitle` (if present).
- Meta: Role, Year, then stack as tags.
- Optional overview paragraph.
- Top nav (prev / all work / next).
- Optional featured diagram (clickable, one image).
- Sections: for each, optional image → `h2` (title) → `content` (HTML) → optional embed wrapper.
- Footer: “Technologies & Tools” from `project.stack`, then links from `project.links`.
- Bottom nav.

---

### 2.2 New schema (DeRoche Projects)

Used by: `deroche-projects`.

**Data shape in `caseStudies.js`** (key = project id):

```ts
"[project-id]": {
  id: string;               // Same as key, e.g. "deroche-projects"
  title: string;            // Page title (overrides project.title)
  subtitle: string;
  roles: string[];          // e.g. ["Information Architect", "UI/UX Designer"]
  context: string;          // e.g. "Contracted via Digital Counsel"
  sections: Array<{
    heading: string;         // Section heading
    body: string;           // Plain text (component wraps in <p>)
    media: Array<{
      type: "image" | "figma-embed" | "video";
      src: string;          // URL or "PLACEHOLDER_URL"
      caption: string;
    }>;
  }>;
}
```

**TypeScript (defined in `js/types/caseStudy.d.ts`):**

```ts
export interface CaseStudySectionMedia {
  type: "image" | "figma-embed" | "video";
  src: string;
  caption: string;
}

export interface CaseStudySection {
  heading: string;
  body: string;
  media: CaseStudySectionMedia[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  roles: string[];
  context: string;
  sections: CaseStudySection[];
}
```

**Rendered:**
- Title from `caseStudyContent.title`.
- Subtitle.
- Meta: “Context: …” then role tags (no Role/Year).
- No overview, no featured diagram.
- Top nav → sections → footer (stack + links) → bottom nav.
- Each section: `h2` (heading) → body in `<p>` → for each media: figure with image/iframe/video + caption.

---

## 3. Project record (required for every case study)

Every case study must have a matching entry in `js/data/projects.js` with the **same `id`** as the key in `caseStudies.js`.

**Minimal shape:**

```ts
{
  id: string;              // Must match caseStudies key and URL wiring
  title: string;           // Used for legacy schema title; fallback for new
  type: string;            // Shown if no case study meta (fallback)
  image: string;          // For work grid / cards
  alt: string;
  description: string;     // Fallback if no case study content
  stack: string[];         // Shown in case study footer "Technologies & Tools"
  links: { live?: string; repo?: string };
  featured?: boolean;
  category: string;
  hidden?: boolean;        // If true, excluded from work grid
}
```

---

## 4. URL and navigation wiring

When adding a **new** case study you must update these places so the correct page loads and “View Case Study” / prev/next work.

### 4.1 `js/components/caseStudy.js`

- **`CASE_STUDY_ORDER`**  
  Add one object so the case study appears in prev/next and lightbox order:
  ```ts
  { id: "<project-id>", url: "/<page>.html", title: "<display title>" }
  ```

- **`getProjectIdFromUrl()`**  
  If the **filename/slug** is different from **project id**, add a mapping:
  ```ts
  if (projectId === "portfolio-site") projectId = "inline-access";
  if (projectId === "nomineat") projectId = "nomin-eat";
  if (projectId === "deroche") projectId = "deroche-projects";
  ```

### 4.2 `js/components/workFilters.js`

- **`CASE_STUDY_PATHS`**  
  Map project id → case study page path:
  ```ts
  "<project-id>": "/<page>.html"
  ```

### 4.3 `js/components/projectCard.js`

- **`hasCaseStudy(project)`**  
  Include the new project id in the array so the card shows “View Case Study”.

- **`getCaseStudyUrl(project)`** (or the inline map)  
  Add:
  ```ts
  "<project-id>": "/<page>.html"
  ```

---

## 5. HTML page skeleton

Every case study is a **static HTML file** that only provides layout and the mount point. The same skeleton is used for all (e.g. `ia-studio.html`, `accex.html`, `deroche.html`).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>... | Caroline (Lines) Sultzer</title>
    <!-- meta, og, twitter, ld+json as needed -->
    <link rel="preload" href="css/styles.css?v=20260115-1" as="style" />
    <link rel="modulepreload" href="js/main.js?v=20260115-1" />
    <link rel="stylesheet" href="css/styles.css?v=20260115-1" />
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header class="site-header" role="banner"></header>
    <main id="main-content" class="case-study-page" role="main">
      <div data-case-study></div>
    </main>
    <nav aria-label="Theme selection" data-theme-toggle-container></nav>
    <footer class="site-footer" role="contentinfo"></footer>
    <script type="module" src="./js/main.js?v=20260115-1"></script>
  </body>
</html>
```

- **Critical:** `main.case-study-page` and **exactly one** `<div data-case-study></div>` inside it. The component replaces that div’s innerHTML.
- Header and footer are filled by the same `main.js` (renderHeader / renderFooter).

---

## 6. DOM template the component outputs

The following is the **exact** structure emitted by `CaseStudy.buildCaseStudyHTML()` (same for both schemas; only the contents of meta and main differ).

```html
<article class="case-study" role="article">
  <header class="case-study-header">
    <div class="case-study-title-section">
      <h1 class="case-study-title">…</h1>
      <!-- optional: <p class="case-study-subtitle">…</p> -->
      <!-- meta: <ul class="case-study-meta tech-stack-grid">…</ul> -->
      <!-- legacy only: <p class="case-study-overview">…</p> -->
    </div>
  </header>

  <nav class="case-study-nav-top case-study-nav" aria-label="Case study navigation">
    <div class="case-study-nav-inner">
      <span class="nav-link-wrap nav-link-wrap-prev">…</span>
      <span class="nav-link-wrap nav-link-wrap-all">…</span>
      <span class="nav-link-wrap nav-link-wrap-next">…</span>
    </div>
  </nav>

  <!-- legacy only: <figure class="featured-diagram"><img … /></figure> -->

  <div class="case-study-main" style="margin-top: 3rem;">
    <!-- Sections (see below) -->
  </div>

  <footer class="case-study-details" aria-label="Project details" style="…">
    <div class="case-study-stack">
      <h3>Technologies & Tools</h3>
      <ul class="stack-list tech-stack-grid" role="list">…</ul>
    </div>
    <!-- optional: <nav class="case-study-links">…</nav> -->
  </footer>

  <nav class="case-study-nav-bottom case-study-nav" …>…</nav>
</article>
```

**Legacy section:**

```html
<section class="case-study-section" aria-labelledby="section-1">
  <!-- optional: <figure class="section-image">…<img />…</figure> -->
  <h2 id="section-1">…</h2>
  <div class="case-study-section-content">…HTML…</div>
  <!-- optional: <div class="case-study-embed figma-embed-wrapper">…</div> -->
</section>
```

**New-schema section:**

```html
<section class="case-study-section" aria-labelledby="section-1">
  <h2 id="section-1">…</h2>
  <div class="case-study-section-content"><p>…</p></div>
  <!-- per media item: -->
  <figure class="case-study-media case-study-media--image|figma|video">
    <!-- image: <img /> | figma/video: <div class="case-study-embed figma-embed-wrapper"><iframe|…></div> -->
    <figcaption class="case-study-media-caption">…</figcaption>
  </figure>
</figure>
```

---

## 7. Checklist: adding a new case study

- [ ] **`js/data/projects.js`**  
  Add (or reuse) a project with the **id** you will use everywhere.

- [ ] **`js/data/caseStudies.js`**  
  Add an entry keyed by that **id**, using either:
  - **Legacy**: `meta`, `overview`, optional `featuredDiagram`, `sections` with `title`, `content`, optional `image`/`embed`.
  - **New**: `id`, `title`, `subtitle`, `roles`, `context`, `sections` with `heading`, `body`, `media[]` (`type`, `src`, `caption`).

- [ ] **`js/components/caseStudy.js`**  
  - Append to **`CASE_STUDY_ORDER`**: `{ id, url: "/YourPage.html", title }`.  
  - If the URL slug ≠ id, add a branch in **`getProjectIdFromUrl()`** (e.g. `if (projectId === "my-slug") projectId = "my-project-id";`).

- [ ] **`js/components/workFilters.js`**  
  Add to **`CASE_STUDY_PATHS`**: `"<id>": "/YourPage.html"`.

- [ ] **`js/components/projectCard.js`**  
  - Add `"<id>"` to the list in **`hasCaseStudy`**.  
  - Add **`"<id>": "/YourPage.html"`** to the case study URL map used by **`getCaseStudyUrl`**.

- [ ] **New HTML file**  
  Create **`YourPage.html`** using the skeleton in §5 (same as `ia-studio.html`), and set `<title>`, meta, and canonical/og URLs for this case study.

After that, visiting `/YourPage.html` will resolve the project, load the case study content, and render with the correct schema and layout.
