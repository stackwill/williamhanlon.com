import "./styles.css";
import { siteData, type LinkItem, type ProjectItem } from "./content/site";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

const renderLinks = (links: readonly LinkItem[]) =>
  links
    .map(
      (link) =>
        `<a class="inline-link" href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
    )
    .join('<span aria-hidden="true"> · </span>');

const renderBulletList = (items: readonly string[]) =>
  `<ul class="detail-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

const renderProjects = (projects: readonly ProjectItem[]) =>
  projects
    .map(
      (project) => `
        <article class="project-item">
          <div class="project-meta">
            <p class="eyebrow">Project</p>
            <h3>${project.name}</h3>
          </div>
          <div class="project-body">
            <dl class="project-facts">
              <div>
                <dt>Languages</dt>
                <dd>${project.languages}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>${project.type}</dd>
              </div>
            </dl>
            <p>${project.description}</p>
            <div class="project-links">${renderLinks(project.links)}</div>
          </div>
        </article>
      `
    )
    .join("");

app.innerHTML = `
  <main class="page-shell">
    <header class="hero section">
      <div class="hero-copy">
        <p class="eyebrow">Portfolio</p>
        <h1>${siteData.name}</h1>
        <p class="hero-context">${siteData.context} · ${siteData.location}</p>
        <p class="hero-intro">${siteData.intro}</p>
        <p class="hero-availability">${siteData.availability}</p>
        <div class="hero-actions">
          <a class="button-link primary-link" href="mailto:${siteData.contact.email}">Email me</a>
          <a class="button-link" href="${siteData.contact.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </header>

    <section class="section featured-placement" aria-labelledby="placement-heading">
      <div class="section-heading">
        <p class="eyebrow">${siteData.placement.eyebrow}</p>
        <h2 id="placement-heading">${siteData.placement.company}</h2>
        <p class="section-note">${siteData.placement.location}</p>
      </div>
      <figure class="placement-media">
        <img
          src="${siteData.placement.imageSrc}"
          alt="${siteData.placement.imageAlt}"
          class="placement-image"
        />
        <figcaption>${siteData.placement.caption}</figcaption>
      </figure>
    </section>

    <section class="section" aria-labelledby="infrastructure-heading">
      <div class="section-heading">
        <p class="eyebrow">Infrastructure</p>
        <h2 id="infrastructure-heading">Systems experience</h2>
      </div>
      ${renderBulletList(siteData.infrastructure)}
    </section>

    <section class="section" aria-labelledby="delivery-heading">
      <div class="section-heading">
        <p class="eyebrow">Delivery</p>
        <h2 id="delivery-heading">Deployment and operations</h2>
      </div>
      ${renderBulletList(siteData.delivery)}
    </section>

    <section class="section" aria-labelledby="projects-heading">
      <div class="section-heading">
        <p class="eyebrow">Projects</p>
        <h2 id="projects-heading">Selected work</h2>
      </div>
      <div class="projects-grid">
        ${renderProjects(siteData.projects)}
      </div>
    </section>

    <section class="section" aria-labelledby="ai-heading">
      <div class="section-heading">
        <p class="eyebrow">AI</p>
        <h2 id="ai-heading">Current interests</h2>
      </div>
      ${renderBulletList(siteData.ai)}
    </section>

    <section class="section contact-section" aria-labelledby="contact-heading">
      <div class="section-heading">
        <p class="eyebrow">Contact</p>
        <h2 id="contact-heading">Get in touch</h2>
      </div>
      <p>If you'd like to talk about internships, junior roles, software, infrastructure or AI, email me.</p>
      <div class="hero-actions">
        <a class="button-link primary-link" href="mailto:${siteData.contact.email}">${siteData.contact.email}</a>
        <a class="button-link" href="${siteData.contact.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </section>
  </main>
`;
