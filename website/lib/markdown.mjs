// Markdown pipeline: markdown-it + server-side KaTeX + Obsidian wiki-links and
// embeds. Wiki-link/embed parsing is done as inline rules (not regex on raw
// text) so links inside code spans and math are correctly left untouched.
import MarkdownIt from 'markdown-it';
import katexPluginModule from '@vscode/markdown-it-katex';
import { resolveNote, resolveAsset } from './vault.mjs';

// Interop: the plugin ships as { default: { default: fn } } under ESM.
const katexPlugin = katexPluginModule.default?.default ?? katexPluginModule.default ?? katexPluginModule;

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function splitAlias(inner) {
  const pipe = inner.indexOf('|');
  if (pipe < 0) return { target: inner.trim(), alias: null };
  return { target: inner.slice(0, pipe).trim(), alias: inner.slice(pipe + 1).trim() };
}

const OPEN = 0x5b; // [
const BANG = 0x21; // !

// Embed rule: ![[target]] or ![[target|size]]. Images become <img>; embeds of
// other notes are rendered as a link to that note (transclusion is not expanded).
function embedRule(state, silent) {
  const pos = state.pos;
  const src = state.src;
  if (src.charCodeAt(pos) !== BANG) return false;
  if (src.charCodeAt(pos + 1) !== OPEN || src.charCodeAt(pos + 2) !== OPEN) return false;
  const end = src.indexOf(']]', pos + 3);
  if (end < 0) return false;
  const inner = src.slice(pos + 3, end);
  if (inner.includes('[[')) return false;
  if (!silent) {
    const { target, alias } = splitAlias(inner);
    const env = state.env;
    const asset = resolveAsset(env.index, target);
    const token = state.push('html_inline', '', 0);
    if (asset) {
      const href = `${env.assetPrefix}${encodeURI(asset.out)}`;
      // An alias on an image embed is Obsidian's width (e.g. ![[img|300]]).
      const width = alias && /^\d+(x\d+)?$/.test(alias) ? ` width="${alias.split('x')[0]}"` : '';
      token.content = `<img class="embed" src="${escapeHtml(href)}" alt="${escapeHtml(target)}" loading="lazy"${width}>`;
    } else {
      // Embed of another note or an unresolved asset -> link.
      const note = resolveNote(env.index, target);
      const label = alias || target;
      if (note) {
        env.links.push(note.slug);
        token.content = `<a class="wl embed-note" href="${env.notePrefix}${note.slug}.html">${escapeHtml(label)}</a>`;
      } else {
        env.unresolved.push(target);
        token.content = `<span class="wl-unresolved" title="Unresolved embed: ${escapeHtml(target)}">${escapeHtml(label)}</span>`;
      }
    }
  }
  state.pos = end + 2;
  return true;
}

// Wiki-link rule: [[target]] or [[target|alias]].
function wikilinkRule(state, silent) {
  const pos = state.pos;
  const src = state.src;
  if (src.charCodeAt(pos) !== OPEN || src.charCodeAt(pos + 1) !== OPEN) return false;
  const end = src.indexOf(']]', pos + 2);
  if (end < 0) return false;
  const inner = src.slice(pos + 2, end);
  if (inner.includes('[[')) return false;
  if (!silent) {
    const { target, alias } = splitAlias(inner);
    const env = state.env;
    const note = resolveNote(env.index, target);
    const label = alias || target;
    const token = state.push('html_inline', '', 0);
    if (note) {
      env.links.push(note.slug);
      token.content = `<a class="wl" href="${env.notePrefix}${note.slug}.html">${escapeHtml(label)}</a>`;
    } else {
      env.unresolved.push(target);
      token.content = `<a class="wl-unresolved" title="Unresolved: ${escapeHtml(target)}">${escapeHtml(label)}</a>`;
    }
  }
  state.pos = end + 2;
  return true;
}

export function createMarkdown() {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false,
    breaks: true, // match Obsidian reading view: single newline -> line break
  });

  // KaTeX first so $...$ / $$...$$ consume their contents before wiki rules run.
  md.use(katexPlugin, { throwOnError: false, errorColor: '#f87171' });

  // Register embed before link so ![[ is handled before [[.
  md.inline.ruler.before('link', 'obsidian_embed', embedRule);
  md.inline.ruler.before('link', 'obsidian_wikilink', wikilinkRule);

  // Make external links open in a new tab and mark them.
  const defaultLinkOpen = md.renderer.rules.link_open
    || ((tokens, i, opts, env, self) => self.renderToken(tokens, i, opts));
  md.renderer.rules.link_open = (tokens, i, opts, env, self) => {
    const href = tokens[i].attrGet('href') || '';
    if (/^https?:\/\//i.test(href)) {
      tokens[i].attrSet('target', '_blank');
      tokens[i].attrSet('rel', 'noopener noreferrer');
      tokens[i].attrJoin('class', 'external');
    }
    return defaultLinkOpen(tokens, i, opts, env, self);
  };

  return md;
}

// Normalize vault quirks before parsing:
//  - strip zero-width characters KaTeX cannot render (spam "unknownSymbol")
//  - split single-line display math ($$...$$gluedText) into its own block so
//    KaTeX sees clean delimiters, matching Obsidian's rendering. Fenced code is
//    left untouched.
function separateDisplayMath(text) {
  let out = '';
  let inDisplay = false;
  for (let i = 0; i < text.length; ) {
    if (text[i] === '$' && text[i + 1] === '$') {
      if (!inDisplay) {
        if (out.length && !/\n\s*$/.test(out)) out += '\n\n'; // glued opener
        out += '$$';
        inDisplay = true;
      } else {
        out += '$$';
        inDisplay = false;
        const next = text[i + 2];
        if (next !== undefined && next !== '\n' && next !== '$') out += '\n\n';
      }
      i += 2;
    } else {
      out += text[i];
      i += 1;
    }
  }
  return out;
}

function normalizeSource(src) {
  src = src.replace(/[\u200B\u200C\u200D\uFEFF]/g, '');
  // Keep fenced code (``` or ~~~) verbatim; process only the segments between.
  const parts = src.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g);
  for (let i = 0; i < parts.length; i += 2) parts[i] = separateDisplayMath(parts[i]);
  return parts.join('');
}

// Render one note. env carries the vault index, output-relative link prefixes,
// and collectors for outgoing links / unresolved targets.
export function renderNote(md, source, index, { notePrefix, assetPrefix }) {
  const env = {
    index,
    notePrefix,
    assetPrefix,
    links: [],
    unresolved: [],
  };
  const html = md.render(normalizeSource(source), env);
  // Dedupe outgoing links, preserving order.
  const seen = new Set();
  const links = [];
  for (const s of env.links) {
    if (!seen.has(s)) { seen.add(s); links.push(s); }
  }
  return { html, links, unresolved: env.unresolved };
}

// Cheap plaintext extraction for the search index and excerpts.
export function toPlainText(source) {
  return source
    .replace(/```[\s\S]*?```/g, ' ')            // fenced code
    .replace(/`[^`]*`/g, ' ')                    // inline code
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')           // block math
    .replace(/\$[^$\n]*\$/g, ' ')                // inline math
    .replace(/!\[\[[^\]]*\]\]/g, ' ')            // embeds
    .replace(/\[\[([^\]|]*)(?:\|([^\]]*))?\]\]/g, (_, t, a) => a || t) // wiki links -> label
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')       // md images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')     // md links -> label
    .replace(/[#>*_~`>-]+/g, ' ')                // md punctuation
    .replace(/\s+/g, ' ')
    .trim();
}
