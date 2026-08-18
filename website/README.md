# mind_map website

A static site that automatically renders the `mind_map` Obsidian vault — every
`.md` note, its `[[wiki links]]`, `![[embeds]]`, and LaTeX math — into a
browsable, searchable, graph-navigable website. No server or database at
runtime; the build emits plain HTML/CSS/JS.

## What it does

- **Renders every note** in the vault to `dist/notes/<slug>.html`.
- **Resolves `[[wiki links]]`** and `[[target|alias]]` case-insensitively to the
  matching note; unresolved links are styled distinctly (and listed in
  `dist/unresolved.json` so you can fix the vault).
- **Embeds `![[image.png]]`** and copies all referenced images.
- **Renders math** (`$…$` and `$$…$$`) server-side with KaTeX — no flash of raw
  TeX, works with JS disabled. Single-line display math glued to text is
  normalized to match Obsidian.
- **Interactive graph** (`graph.html`): a force-directed, pan/zoom/drag canvas of
  all notes and links. Every note page also shows a **local graph** of its
  neighborhood.
- **Backlinks** and outgoing links per note.
- **Instant client-side search** (`/` to focus) over titles and excerpts.
- **Dark / light theme** toggle (persisted).

All internal links are relative, so the site works both at a domain root and
under a GitHub Pages project subpath (`user.github.io/mind_map/`).

## Usage

```bash
cd website
npm install        # first time
npm run build      # -> website/dist
npm run serve      # preview at http://localhost:8080
# or: npm run dev  # build + serve
```

The build reads the vault from the parent directory (the repo root). Rebuild
after editing notes.

## How it works

| File | Responsibility |
| --- | --- |
| `build.mjs` | Orchestration: scan → render → backlinks → graph/search data → write `dist/` |
| `lib/vault.mjs` | Recursively scans notes/images, assigns unique slugs, resolves links & assets |
| `lib/markdown.mjs` | `markdown-it` + KaTeX + custom inline rules for `[[links]]` / `![[embeds]]` |
| `lib/templates.mjs` | HTML shells for note, index, and graph pages |
| `assets/graph.js` | Dependency-free canvas force-directed graph (full + local) |
| `assets/search.js` | Ranked client-side search over `search-index.json` |
| `assets/app.js` | Theme, search wiring, graph initialization |
| `assets/app.css` | Obsidian-like theme |
| `serve.mjs` | Minimal static preview server |

Output artifacts in `dist/`: per-note pages, `index.html`, `graph.html`,
`graph.json` (nodes + edges), `search-index.json`, and `unresolved.json`.

## Deployment (GitHub Pages)

`.github/workflows/pages.yml` builds and deploys on every push to `main`.
Enable it once: repo **Settings → Pages → Build and deployment → Source:
GitHub Actions**. Ignored dirs (`.git`, `.obsidian`, `.claude`, `website`,
`.github`, `node_modules`) are never treated as notes.
