// Static-site build: renders the mind_map vault into ./dist.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { scanVault, resolveNote } from './lib/vault.mjs';
import { createMarkdown, renderNote, toPlainText } from './lib/markdown.mjs';
import { notePage, indexPage, graphPage } from './lib/templates.mjs';
import { serviceWorkerSource } from './lib/sw-template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VAULT_ROOT = path.resolve(__dirname, '..');
const OUT = path.resolve(__dirname, 'dist');
const STATIC_SRC = path.resolve(__dirname, 'assets');

async function rmrf(p) {
  await fs.rm(p, { recursive: true, force: true });
}

async function copyFile(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}

// Recursively list files under `dir`, returned as posix paths relative to it.
async function walkFiles(dir, base = dir) {
  const out = [];
  for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...await walkFiles(abs, base));
    else out.push(path.relative(base, abs).split(path.sep).join('/'));
  }
  return out;
}

async function main() {
  const t0 = Date.now();
  console.log(`Scanning vault: ${VAULT_ROOT}`);
  const index = await scanVault(VAULT_ROOT);
  console.log(`  ${index.notes.length} notes, ${index.assets.length} assets`);

  const md = createMarkdown();

  // Pass 1: render every note, collecting outgoing links + unresolved targets.
  const rendered = new Map(); // slug -> { note, html, links, unresolved }
  for (const note of index.notes) {
    const source = await fs.readFile(note.abs, 'utf8');
    const { html, links, unresolved } = renderNote(md, source, index, {
      notePrefix: '', // sibling notes in /notes
      assetPrefix: '../assets/',
    });
    rendered.set(note.slug, { note, html, links, unresolved, source });
  }

  // Pass 2: backlinks (reverse of resolved outgoing links).
  const backlinks = new Map(); // slug -> Set(slug)
  for (const note of index.notes) backlinks.set(note.slug, new Set());
  for (const { note, links } of rendered.values()) {
    for (const target of links) {
      if (target !== note.slug && backlinks.has(target)) backlinks.get(target).add(note.slug);
    }
  }

  // Graph model: nodes + undirected unique edges. Degree drives node size.
  const degree = new Map(index.notes.map(n => [n.slug, 0]));
  const edgeSet = new Set();
  const edges = [];
  for (const { note, links } of rendered.values()) {
    for (const target of links) {
      if (target === note.slug || !degree.has(target)) continue;
      const key = note.slug < target ? `${note.slug}\u0000${target}` : `${target}\u0000${note.slug}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      edges.push({ source: note.slug, target });
      degree.set(note.slug, degree.get(note.slug) + 1);
      degree.set(target, degree.get(target) + 1);
    }
  }
  const nodes = index.notes.map(n => ({
    id: n.slug,
    title: n.title,
    deg: degree.get(n.slug) || 0,
  }));
  const orphanCount = nodes.filter(n => n.deg === 0).length;

  // ---- write output tree ----
  await rmrf(OUT);
  await fs.mkdir(path.join(OUT, 'notes'), { recursive: true });
  await fs.mkdir(path.join(OUT, 'assets'), { recursive: true });
  await fs.mkdir(path.join(OUT, 'static'), { recursive: true });

  // Assets.
  for (const a of index.assets) {
    await copyFile(a.abs, path.join(OUT, 'assets', a.out));
  }

  // Static app files.
  for (const f of await fs.readdir(STATIC_SRC)) {
    await copyFile(path.join(STATIC_SRC, f), path.join(OUT, 'static', f));
  }

  // KaTeX CSS + fonts (CSS references ./fonts relatively).
  const katexDist = path.resolve(__dirname, 'node_modules', 'katex', 'dist');
  await copyFile(path.join(katexDist, 'katex.min.css'), path.join(OUT, 'static', 'katex.min.css'));
  const fontsSrc = path.join(katexDist, 'fonts');
  const fontsOut = path.join(OUT, 'static', 'fonts');
  await fs.mkdir(fontsOut, { recursive: true });
  for (const f of await fs.readdir(fontsSrc)) {
    await copyFile(path.join(fontsSrc, f), path.join(fontsOut, f));
  }

  // Note pages.
  const titleBySlug = new Map(index.notes.map(n => [n.slug, n.title]));
  const adjacency = new Map(); // slug -> Set(neighbor slug)
  for (const n of index.notes) adjacency.set(n.slug, new Set());
  for (const e of edges) {
    adjacency.get(e.source).add(e.target);
    adjacency.get(e.target).add(e.source);
  }

  for (const { note, html } of rendered.values()) {
    const back = [...backlinks.get(note.slug)].map(s => ({ slug: s, title: titleBySlug.get(s) }))
      .sort((a, b) => a.title.localeCompare(b.title));
    const out = [...(rendered.get(note.slug).links)]
      .filter(s => titleBySlug.has(s))
      .map(s => ({ slug: s, title: titleBySlug.get(s) }))
      .sort((a, b) => a.title.localeCompare(b.title));

    // Local graph: the note + its neighbors + edges among them.
    const neighborSlugs = adjacency.get(note.slug);
    const localIds = new Set([note.slug, ...neighborSlugs]);
    const localNodes = [...localIds].map(s => ({ id: s, title: titleBySlug.get(s), deg: degree.get(s) || 0 }));
    const localEdges = edges
      .filter(e => localIds.has(e.source) && localIds.has(e.target))
      .map(e => ({ source: e.source, target: e.target }));
    const localGraph = { center: note.slug, nodes: localNodes, links: localEdges };

    const pageHtml = notePage(note, html, { backlinks: back, outgoing: out, localGraph });
    await fs.writeFile(path.join(OUT, 'notes', `${note.slug}.html`), pageHtml);
  }

  // Index + graph pages.
  const stats = {
    noteCount: index.notes.length,
    linkCount: edges.length,
    assetCount: index.assets.length,
    orphanCount,
  };
  const sortedNotes = [...index.notes].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
  await fs.writeFile(path.join(OUT, 'index.html'), indexPage(sortedNotes, stats));
  await fs.writeFile(path.join(OUT, 'graph.html'), graphPage(stats));

  // Data files.
  await fs.writeFile(path.join(OUT, 'graph.json'), JSON.stringify({ nodes, links: edges }));
  const searchIndex = index.notes.map(n => {
    const { source } = rendered.get(n.slug);
    const text = toPlainText(source);
    return { title: n.title, slug: n.slug, url: `notes/${n.slug}.html`, excerpt: text.slice(0, 240) };
  });
  await fs.writeFile(path.join(OUT, 'search-index.json'), JSON.stringify(searchIndex));

  // Report unresolved links (helps the author fix the vault).
  let unresolvedTotal = 0;
  const unresolvedSet = new Set();
  for (const { unresolved } of rendered.values()) {
    for (const u of unresolved) { unresolvedTotal++; unresolvedSet.add(u); }
  }
  await fs.writeFile(
    path.join(OUT, 'unresolved.json'),
    JSON.stringify([...unresolvedSet].sort(), null, 2),
  );

  // Service worker: precache the whole built tree so one online visit makes the
  // entire vault readable offline. Exclude dev-only artifacts and the SW itself.
  const exclude = new Set(['sw.js', 'unresolved.json', '.nojekyll']);
  const precache = (await walkFiles(OUT))
    .filter(u => !exclude.has(u) && !u.endsWith('/.DS_Store'))
    .sort();
  const version = new Date().toISOString();
  await fs.writeFile(path.join(OUT, 'sw.js'), serviceWorkerSource({ version, urls: precache }));
  console.log(`  service worker precaches ${precache.length} files (cache ${version})`);

  console.log(`  ${edges.length} edges, ${orphanCount} orphans`);
  console.log(`  ${unresolvedTotal} unresolved link occurrences (${unresolvedSet.size} distinct) -> dist/unresolved.json`);
  console.log(`Built ${index.notes.length + 2} pages into ${OUT} in ${((Date.now() - t0) / 1000).toFixed(2)}s`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
