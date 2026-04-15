import {
  siteData,
  type CarouselSlide,
  type LinkItem,
  type ProjectItem,
} from "./content/site";

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });

export const renderMissionGlobalText = (value: string) => {
  const company = escapeHtml(siteData.placement.company);
  const website = escapeHtml(siteData.placement.website);
  const companyLink = `<a class="inline-link" href="${website}" target="_blank" rel="noopener noreferrer">${company}</a>`;

  return escapeHtml(value).split(company).join(companyLink);
};

export const renderCarouselOutcome = (slide?: CarouselSlide) => {
  if (!slide) {
    return "";
  }

  return `
    <div class="carousel-outcome">
      <p class="carousel-outcome-kicker">${escapeHtml(slide.outcomeLabel)}</p>
      <p class="carousel-outcome-headline">${escapeHtml(slide.outcomeHeadline)}</p>
      <p class="carousel-outcome-detail">${renderMissionGlobalText(slide.caption)}</p>
    </div>
  `;
};

const renderMissionGlobalDisplayText = () => {
  const company = escapeHtml(siteData.placement.company);
  const displayCompany = escapeHtml(siteData.placement.displayCompany);
  const website = escapeHtml(siteData.placement.website);

  return displayCompany.replace(
    company,
    `<a class="inline-link" href="${website}" target="_blank" rel="noopener noreferrer">${company}</a>`
  );
};

const renderLinks = (links: readonly LinkItem[]) =>
  `<ul class="project-links">${links
    .map(
      (link) => `
        <li>
          <a class="inline-link" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(link.label)}
          </a>
        </li>
      `
    )
    .join("")}</ul>`;

const renderBulletList = (items: readonly string[], className = "detail-list") =>
  `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

const githubLogo = `
  <svg class="github-logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.01c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18.92-.25 1.9-.38 2.88-.39.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.39-5.26 5.68.42.36.79 1.07.79 2.16v3.18c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
    />
  </svg>
`;

const languageBadgeStyles: Record<string, { readonly color: string; readonly logo: string; readonly logoColor: string }> = {
  ansible: { color: "EE0000", logo: "ansible", logoColor: "white" },
  docker: { color: "2496ED", logo: "docker", logoColor: "white" },
  githubactions: { color: "2088FF", logo: "githubactions", logoColor: "white" },
  go: { color: "00ADD8", logo: "go", logoColor: "white" },
  linux: { color: "FCC624", logo: "linux", logoColor: "171717" },
  lua: { color: "2C2D72", logo: "lua", logoColor: "white" },
  nodedotjs: { color: "5FA04E", logo: "nodedotjs", logoColor: "white" },
  proxmox: { color: "E57000", logo: "proxmox", logoColor: "white" },
  python: { color: "3776AB", logo: "python", logoColor: "white" },
  rust: { color: "CE422B", logo: "rust", logoColor: "white" },
  typescript: { color: "3178C6", logo: "typescript", logoColor: "white" },
};

const heroTechnologies = ["Linux", "Proxmox", "Docker", "Rust", "Python", "TypeScript", "Node.js", "GitHub Actions", "Ansible"];

const getBadgeStyle = (label: string) => {
  const slug = label.toLowerCase().replace(/\./g, "dot").replace(/[^a-z0-9]+/g, "");
  return {
    badge: languageBadgeStyles[slug] ?? {
      color: "655F58",
      logo: "code",
      logoColor: "white",
    },
    slug,
  };
};

const renderBadgeImage = (label: string, className: string) => {
  const { badge } = getBadgeStyle(label);
  const src = `https://img.shields.io/badge/${encodeURIComponent(label)}-${badge.color}?style=flat-square&logo=${encodeURIComponent(badge.logo)}&logoColor=${encodeURIComponent(badge.logoColor)}`;

  return `
    <img
      class="${className}"
      src="${escapeHtml(src)}"
      alt="${escapeHtml(label)}"
      loading="lazy"
      decoding="async"
    />
  `;
};

const renderLanguageBadges = (languages: string) =>
  `<ul class="language-badge-list">${languages
    .split(",")
    .map((language) => language.trim())
    .filter(Boolean)
    .map((language) => `<li>${renderBadgeImage(language, "language-badge")}</li>`)
    .join("")}</ul>`;

const renderHeroTechnologies = (technologies: readonly string[]) =>
  `<ul class="tech-badge-list">${technologies
    .map((technology) => `<li>${renderBadgeImage(technology, "tech-badge")}</li>`)
    .join("")}</ul>`;

const renderCarouselSlides = (slides: readonly CarouselSlide[]) =>
  slides
    .map(
      (slide, index) => `
        <article class="carousel-slide" data-active="${index === 0}">
          <img
            src="${escapeHtml(slide.src)}"
            alt="${escapeHtml(slide.alt)}"
            class="carousel-image"
          />
          ${
            slide.callout
              ? `
                <div class="carousel-callout" data-variant="${escapeHtml(slide.callout.variant)}" aria-hidden="true">
                  <span class="carousel-callout-ring"></span>
                  <span class="carousel-callout-text">${escapeHtml(slide.callout.label)}</span>
                </div>
              `
              : ""
          }
        </article>
      `
    )
    .join("");

const renderCarouselDots = (slides: readonly CarouselSlide[]) =>
  slides
    .map(
      (_, index) => `
        <button
          class="carousel-dot"
          type="button"
          aria-label="Show slide ${index + 1}"
          aria-current="${index === 0}"
          data-index="${index}"
        ></button>
      `
    )
    .join("");

const renderProjects = (projects: readonly ProjectItem[]) =>
  projects
    .map(
      (project) => `
        <article class="project-item" data-scroll-reveal>
          <div class="project-meta">
            <p class="project-kicker">${escapeHtml(project.type)}</p>
            <h3>${escapeHtml(project.name)}</h3>
          </div>
          <div class="project-body">
            ${renderLanguageBadges(project.languages)}
            <p>${escapeHtml(project.description)}</p>
            ${renderLinks(project.links)}
          </div>
        </article>
      `
    )
    .join("");

export const renderAppHtml = () => `
  <main class="page-shell">
    <header class="hero" data-scroll-progress>
      <div class="hero-copy" data-scroll-reveal>
        <p class="eyebrow">Portfolio</p>
        <h1>${escapeHtml(siteData.name)}</h1>
        <p class="hero-context">
          <span class="hero-stamp">${escapeHtml(siteData.context)}</span>
          <span class="hero-separator" aria-hidden="true">·</span>
          <span>${escapeHtml(siteData.location)}</span>
        </p>
        <p class="hero-intro">${escapeHtml(siteData.intro)}</p>
        <p class="hero-availability">${escapeHtml(siteData.availability)}</p>
        <div class="hero-actions">
          <a class="button-link primary-link" href="mailto:${escapeHtml(siteData.contact.email)}">Email me</a>
          <a class="button-link github-link" href="${escapeHtml(siteData.contact.github)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">${githubLogo}</a>
        </div>
        <div class="hero-tech" aria-label="Technologies I use or am interested in">
          <p class="eyebrow">Technologies</p>
          ${renderHeroTechnologies(heroTechnologies)}
        </div>
      </div>
      <section class="hero-media" aria-label="Placement image carousel" data-scroll-reveal>
        <div class="carousel-shell">
          <div class="carousel-viewport">
            ${renderCarouselSlides(siteData.carouselSlides)}
          </div>
          <div class="carousel-controls">
            <div class="carousel-dots" role="tablist" aria-label="Carousel pagination">
              ${renderCarouselDots(siteData.carouselSlides)}
            </div>
            <p class="carousel-status">
              <span class="carousel-status-value">1/${siteData.carouselSlides.length}</span>
            </p>
          </div>
          <div class="carousel-outcome-host">${renderCarouselOutcome(siteData.carouselSlides[0])}</div>
        </div>
      </section>
      <a class="scroll-cue" href="#overview" aria-label="Scroll to experience summary">
        <span class="scroll-cue-arrow" aria-hidden="true"></span>
      </a>
    </header>

    <section class="overview-grid" id="overview" aria-label="Core experience summary">
      <article class="info-panel" data-scroll-reveal>
        <div class="section-heading compact">
          <p class="eyebrow">${escapeHtml(siteData.placement.eyebrow)}</p>
          <h2>${renderMissionGlobalDisplayText()}</h2>
        </div>
        <p class="panel-copy">${renderMissionGlobalText(siteData.placement.caption)}</p>
      </article>

      <article class="info-panel" data-scroll-reveal>
        <div class="section-heading compact">
          <p class="eyebrow">Systems</p>
          <h2 id="infrastructure-heading">Infrastructure</h2>
        </div>
        ${renderBulletList(siteData.infrastructure.slice(0, 5), "panel-list")}
      </article>

      <article class="info-panel" data-scroll-reveal>
        <div class="section-heading compact">
          <p class="eyebrow">Delivery</p>
          <h2 id="delivery-heading">Deployment and ops</h2>
        </div>
        ${renderBulletList(siteData.delivery, "panel-list")}
      </article>

      <article class="info-panel" data-scroll-reveal>
        <div class="section-heading compact">
          <p class="eyebrow">Direction</p>
          <h2 id="ai-heading">Current interests</h2>
        </div>
        ${renderBulletList(siteData.ai, "panel-list")}
      </article>
    </section>

    <section class="section-block sticky-section" aria-labelledby="projects-heading" data-scroll-progress>
      <div class="section-heading section-header sticky-heading" data-scroll-reveal>
        <p class="eyebrow">Projects</p>
        <h2 id="projects-heading">Selected work</h2>
      </div>
      <div class="project-list">
        ${renderProjects(siteData.projects)}
      </div>
    </section>

    <section class="section-block contact-section sticky-section" aria-labelledby="contact-heading" data-scroll-progress>
      <div class="section-heading section-header sticky-heading" data-scroll-reveal>
        <p class="eyebrow">Contact</p>
        <h2 id="contact-heading">Get in touch</h2>
        <p class="section-note">Best first step: email me directly.</p>
      </div>
      <div class="contact-grid" data-scroll-reveal>
        <p class="contact-copy">If you'd like to talk about internships, junior roles, software, DevOps, sysadmin work, infrastructure or AI, email me.</p>
        <div class="hero-actions">
          <a class="button-link primary-link" href="mailto:${escapeHtml(siteData.contact.email)}">${escapeHtml(siteData.contact.email)}</a>
          <a class="button-link github-link" href="${escapeHtml(siteData.contact.github)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">${githubLogo}</a>
        </div>
      </div>
    </section>
  </main>
`;
