# William Hanlon Portfolio

<p align="center">
  A fast, statically prerendered portfolio site for my work and interests.
</p>

<p align="center">
  Built with Vite, TypeScript, plain DOM rendering, and Bun.
</p>

<p align="center">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Bun" src="https://img.shields.io/badge/Bun-runtime-000000?style=flat-square&logo=bun&logoColor=white" />
  <img alt="Static Site" src="https://img.shields.io/badge/output-static_site-171717?style=flat-square" />
</p>

## Overview

This repository contains the current version of my personal portfolio site: a lightweight, framework-free static site.

The site is rendered from TypeScript, styled with a single CSS entrypoint, and prerendered during the build so the final `dist/index.html` ships with real content instead of an empty app shell.

## What It Includes

- A responsive hero section with an image carousel and motion-aware interactions
- Typed content data for projects, experience, infrastructure, delivery, and AI interests
- HTML rendering functions kept separate from browser behavior
- A Bun prerender step that writes the rendered markup into the production HTML output
- Zero UI framework overhead

## Stack

- `Vite` for local development and bundling
- `TypeScript` for site content, rendering, and browser logic
- `Bun` for install, scripts, and prerendering
- Plain HTML/CSS/DOM APIs for the actual site

## Project Structure

```text
.
├── index.html              # Vite entry shell
├── public/                 # Static assets such as images and favicon
├── scripts/
│   └── prerender.ts        # Injects rendered HTML into dist/index.html
├── src/
│   ├── content/
│   │   └── site.ts         # Typed portfolio content
│   ├── main.ts             # Client-side behavior and interactions
│   ├── render.ts           # HTML rendering helpers
│   └── styles.css          # Site styling
├── package.json
└── tsconfig.json
```

## Development

Install dependencies:

```bash
bun install
```

Start the dev server:

```bash
bun run dev
```

Build the site:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## Build Flow

The production build has two stages:

1. `vite build` creates the client bundle and output HTML.
2. `bun scripts/prerender.ts` replaces the empty `#app` container in `dist/index.html` with the HTML returned by `renderAppHtml()`.

That means the deployed site remains static, but the generated HTML is already present in the final file.

## Editing Content

Most site updates fall into one of these buckets:

- Personal details, project entries, work experience, and section copy: update `src/content/site.ts`
- Markup structure: update `src/render.ts`
- Interactive behavior such as the carousel and scroll effects: update `src/main.ts`
- Visual design and layout: update `src/styles.css`

## Notes

- The project is intentionally small and direct.
- There is no frontend framework here to work around.
- The content model is typed, which keeps copy edits and structural changes safer than editing raw HTML by hand.

## License

This repository is for my portfolio site. Reuse of code may be fine depending on context, but the personal content, images, and identity should be treated as private unless I have given permission.
