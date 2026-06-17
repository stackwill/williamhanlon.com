import { siteData } from "./content/site";

export const SITE_ORIGIN = "https://williamhanlon.com";

export const canonicalRoutes = [
  { pathname: "/", priority: "1.0" },
  { pathname: "/card", priority: "0.7" },
] as const;

export const homepageLinkHeader =
  '</sitemap.xml>; rel="describedby"; type="application/xml", ' +
  '</llms.txt>; rel="describedby"; type="text/markdown", ' +
  '</portfolio.md>; rel="service-doc"; type="text/markdown", ' +
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/json"';

const absoluteUrl = (pathname: string) => new URL(pathname, SITE_ORIGIN).toString();

const markdownLink = (label: string, href: string) => `[${label}](${href})`;

export const estimateMarkdownTokens = (markdown: string) => markdown.trim().split(/\s+/).filter(Boolean).length;

export const renderPortfolioMarkdown = () => {
  const featuredProject = siteData.featuredProject;

  return `# ${siteData.name}

${siteData.context} based in ${siteData.location}. ${siteData.intro}

${siteData.availability}

## Contact

- Email: ${siteData.contact.email}
- GitHub: ${markdownLink("github.com/stackwill", siteData.contact.github)}
- Website: ${absoluteUrl("/")}

## Work Experience

${siteData.placement.caption}

- Company: ${markdownLink(siteData.placement.displayCompany, siteData.placement.website)}
- Image: ${absoluteUrl(siteData.placement.imageSrc)}

## Infrastructure

${siteData.infrastructure.map((item) => `- ${item}`).join("\n")}

## Deployment And Ops

${siteData.delivery.map((item) => `- ${item}`).join("\n")}

## AI-Based Development

${siteData.ai.map((item) => `- ${item}`).join("\n")}

## Premier Project: ${featuredProject.name}

${featuredProject.summary}

${featuredProject.description}

${featuredProject.stats.map((stat) => `- ${stat.value} ${stat.label}`).join("\n")}

Links:
${featuredProject.links.map((link) => `- ${markdownLink(link.label, link.href)}`).join("\n")}

## Other Selected Work

${siteData.projects
  .map(
    (project) => `### ${project.name}

- Type: ${project.type}
- Languages: ${project.languages}
- Description: ${project.description}
${project.links.map((link) => `- ${markdownLink(link.label, link.href)}`).join("\n")}`
  )
  .join("\n\n")}
`;
};

export const renderCardMarkdown = () => `# ${siteData.name}

${siteData.context}, ${siteData.location}

${siteData.intro}

## Links

- Website: ${absoluteUrl("/")}
- Email: ${siteData.contact.email}
- GitHub: ${siteData.contact.github}

## Open To

Internships, junior opportunities, software projects, infrastructure work, and technical work experience.
`;

export const markdownForPathname = (pathname: string) => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath === "/") {
    return renderPortfolioMarkdown();
  }

  if (normalizedPath === "/card") {
    return renderCardMarkdown();
  }

  return null;
};

export const renderSitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${canonicalRoutes
  .map(
    (route) => `  <url>
    <loc>${absoluteUrl(route.pathname)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

export const renderRobotsTxt = () => `Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

export const renderLlmsTxt = () => `# ${siteData.name}

${siteData.intro}

## Canonical Pages

- ${absoluteUrl("/")} - Portfolio homepage
- ${absoluteUrl("/card")} - NFC business card page

## Agent Resources

- ${absoluteUrl("/sitemap.xml")} - XML sitemap
- ${absoluteUrl("/portfolio.md")} - Markdown portfolio summary
- ${absoluteUrl("/.well-known/api-catalog")} - Machine-readable resource catalog
`;

export const renderApiCatalogJson = () =>
  JSON.stringify(
    {
      name: "William Hanlon portfolio",
      description: "Agent-readable resources for williamhanlon.com.",
      homepage: absoluteUrl("/"),
      resources: [
        {
          rel: "describedby",
          href: absoluteUrl("/llms.txt"),
          type: "text/markdown",
          title: "LLM-oriented site overview",
        },
        {
          rel: "service-doc",
          href: absoluteUrl("/portfolio.md"),
          type: "text/markdown",
          title: "Markdown portfolio summary",
        },
        {
          rel: "describedby",
          href: absoluteUrl("/sitemap.xml"),
          type: "application/xml",
          title: "XML sitemap",
        },
      ],
      apis: [],
    },
    null,
    2
  ) + "\n";
