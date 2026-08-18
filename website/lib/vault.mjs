// Vault scanning, slug generation, and link resolution index.
import { promises as fs } from 'node:fs';
import path from 'node:path';

const MD_EXT = '.md';
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.avif']);

// Directories that are never part of the knowledge base.
const IGNORED_DIRS = new Set(['.git', '.obsidian', '.claude', 'node_modules', 'website', '.github']);

export function slugify(title) {
  const base = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip combining diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'note';
}

// Recursively collect every markdown note and image asset under the vault root.
async function walk(dir, root, acc) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
    }
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      await walk(path.join(dir, entry.name), root, acc);
      continue;
    }
    const abs = path.join(dir, entry.name);
    const rel = path.relative(root, abs);
    const ext = path.extname(entry.name).toLowerCase();
    if (ext === MD_EXT) acc.notes.push({ abs, rel });
    else if (IMAGE_EXT.has(ext)) acc.assets.push({ abs, rel, name: entry.name });
  }
  return acc;
}

// Build the full vault index: notes with unique slugs, plus lookup maps used by
// the wiki-link resolver (case-insensitive by title, basename, and stem).
export async function scanVault(root) {
  const acc = await walk(root, root, { notes: [], assets: [] });

  const notes = [];
  const usedSlugs = new Set();
  for (const n of acc.notes.sort((a, b) => a.rel.localeCompare(b.rel))) {
    const title = path.basename(n.rel, MD_EXT);
    let slug = slugify(title);
    if (usedSlugs.has(slug)) {
      let i = 2;
      while (usedSlugs.has(`${slug}-${i}`)) i++;
      slug = `${slug}-${i}`;
    }
    usedSlugs.add(slug);
    notes.push({ abs: n.abs, rel: n.rel, title, slug, dir: path.dirname(n.rel) });
  }

  // Resolution maps. Obsidian resolves links case-insensitively by note name,
  // preferring an exact basename match; we index by lowercased title and by the
  // lowercased relative path (without extension) for path-qualified links.
  const byTitle = new Map();   // "bias-variance tradeoff" -> note
  const byRelPath = new Map(); // "ld/ld-st unit" -> note
  for (const note of notes) {
    const key = note.title.trim().toLowerCase();
    if (!byTitle.has(key)) byTitle.set(key, note);
    byRelPath.set(note.rel.slice(0, -MD_EXT.length).toLowerCase(), note);
  }

  // Assets: map by basename (case-insensitive) and by relative path. Later, all
  // assets are copied flat into /assets keyed by their basename; collisions get
  // a stable disambiguated output name.
  const assets = [];
  const assetOut = new Map();     // abs -> output filename in /assets
  const usedAssetNames = new Set();
  const byAssetName = new Map();  // "image.png" -> asset
  const byAssetPath = new Map();  // "assets/image.png" -> asset
  for (const a of acc.assets.sort((x, y) => x.rel.localeCompare(y.rel))) {
    let outName = a.name;
    if (usedAssetNames.has(outName.toLowerCase())) {
      const ext = path.extname(outName);
      const stem = outName.slice(0, -ext.length);
      let i = 2;
      while (usedAssetNames.has(`${stem}-${i}${ext}`.toLowerCase())) i++;
      outName = `${stem}-${i}${ext}`;
    }
    usedAssetNames.add(outName.toLowerCase());
    const asset = { abs: a.abs, rel: a.rel, name: a.name, out: outName };
    assets.push(asset);
    assetOut.set(a.abs, outName);
    if (!byAssetName.has(a.name.toLowerCase())) byAssetName.set(a.name.toLowerCase(), asset);
    byAssetPath.set(a.rel.toLowerCase(), asset);
  }

  return { root, notes, assets, byTitle, byRelPath, byAssetName, byAssetPath };
}

// Resolve a wiki-link target (possibly path-qualified, with #heading/^block that
// we strip) to a note. Returns the note or null when unresolved.
export function resolveNote(index, rawTarget) {
  let target = rawTarget.trim();
  // Drop heading/block anchors — pages have no per-heading anchors yet.
  const hashIdx = target.search(/[#^]/);
  if (hashIdx >= 0) target = target.slice(0, hashIdx).trim();
  if (!target) return null;
  const lower = target.toLowerCase();
  if (index.byTitle.has(lower)) return index.byTitle.get(lower);
  // Path-qualified: try full relative path, then trailing basename.
  const noExt = lower.replace(/\.md$/, '');
  if (index.byRelPath.has(noExt)) return index.byRelPath.get(noExt);
  const base = noExt.split('/').pop();
  if (index.byTitle.has(base)) return index.byTitle.get(base);
  return null;
}

// Resolve an embed/asset target to an output asset filename, or null.
export function resolveAsset(index, rawTarget) {
  const target = rawTarget.trim();
  const lower = target.toLowerCase();
  if (index.byAssetPath.has(lower)) return index.byAssetPath.get(lower);
  const base = lower.split('/').pop();
  if (index.byAssetName.has(base)) return index.byAssetName.get(base);
  return null;
}
