import { mkdir } from "node:fs/promises";
import {
  renderApiCatalogJson,
  renderCardMarkdown,
  renderLlmsTxt,
  renderPortfolioMarkdown,
  renderRobotsTxt,
  renderSitemapXml,
} from "../src/agent-resources";
import { renderPageHtml } from "../src/render";

const indexPath = "dist/index.html";
const indexFile = Bun.file(indexPath);
const indexHtml = await indexFile.text();
const appShell = '<div id="app"></div>';

if (!indexHtml.includes(appShell)) {
  throw new Error(`Could not find ${appShell} in ${indexPath}`);
}

const renderDocument = (pathname: string) => indexHtml.replace(appShell, `<div id="app">${renderPageHtml(pathname)}</div>`);

await Bun.write(indexPath, renderDocument("/"));

await mkdir("dist/card", { recursive: true });
await Bun.write("dist/card/index.html", renderDocument("/card"));

await mkdir("dist/.well-known", { recursive: true });
await Bun.write("dist/sitemap.xml", renderSitemapXml());
await Bun.write("dist/robots.txt", renderRobotsTxt());
await Bun.write("dist/llms.txt", renderLlmsTxt());
await Bun.write("dist/portfolio.md", renderPortfolioMarkdown());
await Bun.write("dist/card.md", renderCardMarkdown());
await Bun.write("dist/.well-known/api-catalog", renderApiCatalogJson());
