import { renderAppHtml } from "../src/render";

const indexPath = "dist/index.html";
const indexFile = Bun.file(indexPath);
const indexHtml = await indexFile.text();
const appShell = '<div id="app"></div>';

if (!indexHtml.includes(appShell)) {
  throw new Error(`Could not find ${appShell} in ${indexPath}`);
}

await Bun.write(indexPath, indexHtml.replace(appShell, `<div id="app">${renderAppHtml()}</div>`));
