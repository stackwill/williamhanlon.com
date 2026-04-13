import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

app.innerHTML = `
  <main class="bootstrap-shell">
    <h1>William Hanlon</h1>
    <p>Portfolio site bootstrap complete.</p>
  </main>
`;
