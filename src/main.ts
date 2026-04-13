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

const renderLanguageChips = (languages: string) =>
  `<ul class="language-chip-list">${languages
    .split(",")
    .map((language) => language.trim())
    .filter(Boolean)
    .map((language) => {
      const slug = language.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return `
        <li>
          <span class="language-chip" data-language="${escapeHtml(slug)}">${escapeHtml(language)}</span>
        </li>
      `;
    })
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
            ${renderLanguageChips(project.languages)}
            <p>${escapeHtml(project.description)}</p>
            ${renderLinks(project.links)}
          </div>
        </article>
      `
    )
    .join("");

app.innerHTML = `
  <nav class="top-nav" aria-label="Primary navigation">
    <a class="nav-mark" href="#top">W. Hanlon</a>
    <div class="nav-links" aria-label="Page sections">
      <a href="#experience">Experience</a>
      <a href="#infrastructure">Infrastructure</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </div>
    <a class="nav-contact" href="mailto:${escapeHtml(siteData.contact.email)}">Email</a>
  </nav>

  <main class="page-shell" id="top">
    <header class="hero editorial-grid">
      <div class="hero-copy">
        <p class="eyebrow">Student / systems / software</p>
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

    <section class="experience-band" id="experience" aria-labelledby="experience-heading">
      <div class="section-heading">
        <p class="eyebrow">${escapeHtml(siteData.placement.eyebrow)}</p>
        <h2 id="experience-heading">Work experience</h2>
      </div>
      <article class="experience-card">
        <div>
          <p class="eyebrow">${escapeHtml(siteData.placement.location)}</p>
          <h3>${escapeHtml(siteData.placement.company)}</h3>
        </div>
        <p>${escapeHtml(siteData.placement.caption)}</p>
      </article>
    </section>

    <section class="bento-section" id="infrastructure" aria-labelledby="infrastructure-heading">
      <div class="section-heading section-header">
        <p class="eyebrow">Infrastructure</p>
        <h2 id="infrastructure-heading">Systems and home lab</h2>
        <p class="section-note">Hardware, Linux, containers and deployment work.</p>
      </div>
      <div class="bento-grid">
        <article class="bento-card bento-card-feature">
          <p class="eyebrow">Proxmox and services</p>
          <h3>Self-hosted infrastructure</h3>
          ${renderBulletList(siteData.infrastructure.slice(0, 3), "panel-list")}
        </article>
        <article class="bento-card">
          <p class="eyebrow">Linux</p>
          <h3>Daily systems use</h3>
          ${renderBulletList(siteData.infrastructure.slice(3, 6), "panel-list")}
        </article>
        <article class="bento-card" id="ops">
          <p class="eyebrow">Delivery</p>
          <h3>Deployment and ops</h3>
          ${renderBulletList(siteData.delivery, "panel-list")}
        </article>
      </div>
    </section>

    <section class="split-section" id="ai" aria-labelledby="ai-heading">
      <div class="section-heading sticky-heading">
        <p class="eyebrow">Direction</p>
        <h2 id="ai-heading">AI and current interests</h2>
        <p class="section-note">Practical interest in AI, local models and development tools.</p>
      </div>
      <div class="interest-list">
        ${siteData.ai
          .map(
            (item) => `
              <article class="interest-item">
                <p>${escapeHtml(item)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-block" id="projects" aria-labelledby="projects-heading">
      <div class="section-heading section-header">
        <p class="eyebrow">Projects</p>
        <h2 id="projects-heading">Selected work</h2>
        <p class="section-note">Strongest first, with GitHub as supporting proof.</p>
      </div>
      <div class="project-list">
        ${renderProjects(siteData.projects)}
      </div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-heading">
      <div class="section-heading">
        <p class="eyebrow">Contact</p>
        <h2 id="contact-heading">Email first.</h2>
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

  <footer class="site-footer">
    <p>W. Hanlon</p>
    <a href="${escapeHtml(siteData.contact.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
  </footer>
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
