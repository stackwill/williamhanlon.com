import "./styles.css";
import { siteData } from "./content/site";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

app.innerHTML = `
  <main class="bootstrap-shell">
    <h1>${siteData.name}</h1>
    <p>${siteData.intro}</p>
    <p>${siteData.placement.caption}</p>
  </main>
`;
