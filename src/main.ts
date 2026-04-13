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

const renderProofs = (items: readonly string[]) =>
  `<ul class="hero-proof-list">${items
    .map((item) => `<li class="hero-proof-item">${escapeHtml(item)}</li>`)
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
            <p class="project-languages">${escapeHtml(project.languages)}</p>
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
          <a class="button-link" href="${escapeHtml(siteData.contact.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        ${renderProofs(siteData.heroProofs)}
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
    </header>

    <section class="overview-grid" aria-label="Core experience summary">
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
          <a class="button-link" href="${escapeHtml(siteData.contact.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
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
