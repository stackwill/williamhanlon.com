import "./styles.css";
import {
  siteData,
  type CarouselSlide,
  type LinkItem,
  type ProjectItem,
} from "./content/site";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

const escapeHtml = (value: string) =>
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
        <article class="project-item">
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

app.innerHTML = `
  <main class="page-shell">
    <header class="hero">
      <div class="hero-copy">
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
      <section class="hero-media" aria-label="Placement image carousel">
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
          <p class="carousel-caption">${escapeHtml(siteData.carouselSlides[0]?.caption ?? "")}</p>
        </div>
      </section>
      <a class="scroll-cue" href="#overview" aria-label="Scroll to experience summary">
        <span class="scroll-cue-arrow" aria-hidden="true"></span>
      </a>
    </header>

    <section class="overview-grid" id="overview" aria-label="Core experience summary">
      <article class="info-panel">
        <div class="section-heading compact">
          <p class="eyebrow">${escapeHtml(siteData.placement.eyebrow)}</p>
          <h2>${escapeHtml(siteData.placement.company)}</h2>
          <p class="section-note">${escapeHtml(siteData.placement.location)}</p>
        </div>
        <p class="panel-copy">${escapeHtml(siteData.placement.caption)}</p>
      </article>

      <article class="info-panel">
        <div class="section-heading compact">
          <p class="eyebrow">Systems</p>
          <h2 id="infrastructure-heading">Infrastructure</h2>
        </div>
        ${renderBulletList(siteData.infrastructure.slice(0, 4), "panel-list")}
      </article>

      <article class="info-panel">
        <div class="section-heading compact">
          <p class="eyebrow">Delivery</p>
          <h2 id="delivery-heading">Deployment and ops</h2>
        </div>
        ${renderBulletList(siteData.delivery, "panel-list")}
      </article>

      <article class="info-panel">
        <div class="section-heading compact">
          <p class="eyebrow">Direction</p>
          <h2 id="ai-heading">Current interests</h2>
        </div>
        ${renderBulletList(siteData.ai, "panel-list")}
      </article>
    </section>

    <section class="section-block" aria-labelledby="projects-heading">
      <div class="section-heading section-header">
        <p class="eyebrow">Projects</p>
        <h2 id="projects-heading">Selected work</h2>
        <p class="section-note">Compact, strongest-first, with GitHub as supporting proof.</p>
      </div>
      <div class="project-list">
        ${renderProjects(siteData.projects)}
      </div>
    </section>

    <section class="section-block contact-section" aria-labelledby="contact-heading">
      <div class="section-heading section-header">
        <p class="eyebrow">Contact</p>
        <h2 id="contact-heading">Get in touch</h2>
        <p class="section-note">Best first step: email me directly.</p>
      </div>
      <div class="contact-grid">
        <p class="contact-copy">If you'd like to talk about internships, junior roles, software, DevOps, sysadmin work, infrastructure or AI, email me.</p>
        <div class="hero-actions">
          <a class="button-link primary-link" href="mailto:${escapeHtml(siteData.contact.email)}">${escapeHtml(siteData.contact.email)}</a>
          <a class="button-link github-link" href="${escapeHtml(siteData.contact.github)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">${githubLogo}</a>
        </div>
      </div>
    </section>
  </main>
`;

const slides = Array.from(document.querySelectorAll<HTMLElement>(".carousel-slide"));
const dots = Array.from(document.querySelectorAll<HTMLButtonElement>(".carousel-dot"));
const carouselShell = document.querySelector<HTMLElement>(".carousel-shell");
const carouselStatus = document.querySelector<HTMLElement>(".carousel-status-value");
const carouselCaption = document.querySelector<HTMLElement>(".carousel-caption");

let activeSlide = 0;
let carouselTimer: number | undefined;

const setActiveSlide = (index: number) => {
  if (slides.length === 0) {
    return;
  }

  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.dataset.active = String(slideIndex === activeSlide);
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.dataset.active = String(isActive);
    dot.setAttribute("aria-current", String(isActive));
  });

  if (carouselStatus) {
    carouselStatus.textContent = `${activeSlide + 1}/${slides.length}`;
  }

  if (carouselCaption) {
    carouselCaption.textContent = siteData.carouselSlides[activeSlide]?.caption ?? "";
  }
};

const stopCarousel = () => {
  if (carouselTimer) {
    window.clearInterval(carouselTimer);
    carouselTimer = undefined;
  }
};

const startCarousel = () => {
  if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  stopCarousel();
  carouselTimer = window.setInterval(() => {
    setActiveSlide(activeSlide + 1);
  }, 5600);
};

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    setActiveSlide(index);
    startCarousel();
  });
});

if (carouselShell) {
  carouselShell.addEventListener("mouseenter", stopCarousel);
  carouselShell.addEventListener("mouseleave", startCarousel);
  carouselShell.addEventListener("focusin", stopCarousel);
  carouselShell.addEventListener("focusout", startCarousel);
}

setActiveSlide(0);
startCarousel();

const updateScrollCue = () => {
  document.documentElement.dataset.scrolled = String(window.scrollY > 8);
};

updateScrollCue();
window.addEventListener("scroll", updateScrollCue, { passive: true });
