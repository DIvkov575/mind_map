// HTML shells for the generated site. `p` is a set of root-relative-to-page
// path prefixes so the same markup works at the root and inside /notes.

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function head(title, p, extraHead = '') {
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<link rel="stylesheet" href="${p.static}katex.min.css">
<link rel="stylesheet" href="${p.static}app.css">
${extraHead}
</head>`;
}

function header(p) {
  return `<header class="topbar">
  <a class="brand" href="${p.home}index.html">🧠 mind_map</a>
  <div class="search">
    <input id="search-input" type="search" placeholder="Search notes…  ( / )" autocomplete="off" spellcheck="false">
    <div id="search-results" class="search-results" hidden></div>
  </div>
  <nav class="nav">
    <a href="${p.home}index.html">Index</a>
    <a href="${p.home}graph.html">Graph</a>
    <button id="theme-toggle" title="Toggle theme" aria-label="Toggle theme">◐</button>
  </nav>
</header>`;
}

function scripts(p, pageData) {
  const home = p.home || './';
  return `<script>window.__SITE__ = ${JSON.stringify(pageData)};</script>
<script src="${p.static}search.js" defer></script>
<script src="${p.static}graph.js" defer></script>
<script src="${p.static}app.js" defer></script>
<script>if('serviceWorker' in navigator){addEventListener('load',function(){navigator.serviceWorker.register('${home}sw.js',{scope:'${home}'}).catch(function(){});});}</script>`;
}

// A note page: article + sidebar (local graph + backlinks + outgoing links).
export function notePage(note, contentHtml, { backlinks, outgoing, localGraph }) {
  const p = { static: '../static/', home: '../', search: '../search-index.json', note: '' };
  const backlinkList = backlinks.length
    ? `<ul class="link-list">${backlinks.map(b => `<li><a href="${b.slug}.html">${esc(b.title)}</a></li>`).join('')}</ul>`
    : `<p class="muted">No backlinks.</p>`;
  const outgoingList = outgoing.length
    ? `<ul class="link-list">${outgoing.map(o => `<li><a href="${o.slug}.html">${esc(o.title)}</a></li>`).join('')}</ul>`
    : `<p class="muted">No outgoing links.</p>`;

  const pageData = {
    page: 'note',
    slug: note.slug,
    searchIndex: p.search,
    graphUrl: '../graph.json',
    localGraph,
  };

  return `${head(note.title, p)}
<body>
${header(p)}
<main class="layout">
  <article class="note">
    <h1 class="note-title">${esc(note.title)}</h1>
    <div class="markdown">${contentHtml}</div>
  </article>
  <aside class="sidebar">
    <section class="panel">
      <h2>Local graph</h2>
      <div id="local-graph" class="local-graph"></div>
      <a class="graph-expand" href="../graph.html?focus=${encodeURIComponent(note.slug)}">Open in full graph →</a>
    </section>
    <section class="panel">
      <h2>Backlinks <span class="count">${backlinks.length}</span></h2>
      ${backlinkList}
    </section>
    <section class="panel">
      <h2>Links <span class="count">${outgoing.length}</span></h2>
      ${outgoingList}
    </section>
  </aside>
</main>
${scripts(p, pageData)}
</body>
</html>`;
}

// Index / home page: stats + alphabetical listing grouped by first letter.
export function indexPage(notes, stats) {
  const p = { static: 'static/', home: '', search: 'search-index.json', note: 'notes/' };
  const groups = new Map();
  for (const n of notes) {
    const first = /[a-z]/i.test(n.title[0]) ? n.title[0].toUpperCase() : '#';
    if (!groups.has(first)) groups.set(first, []);
    groups.get(first).push(n);
  }
  const letters = [...groups.keys()].sort();
  const listHtml = letters.map(letter => `
    <section class="letter-group" id="letter-${esc(letter)}">
      <h2 class="letter">${esc(letter)}</h2>
      <ul class="note-index">
        ${groups.get(letter).map(n => `<li><a href="notes/${n.slug}.html">${esc(n.title)}</a></li>`).join('')}
      </ul>
    </section>`).join('');

  const pageData = { page: 'index', searchIndex: p.search };

  return `${head('mind_map', p)}
<body>
${header(p)}
<main class="layout single">
  <article class="note">
    <h1 class="note-title">mind_map</h1>
    <p class="lede">An interconnected knowledge base of ${stats.noteCount} notes and ${stats.linkCount} links spanning ML, math, biology, and systems.</p>
    <div class="stat-row">
      <a class="stat" href="graph.html"><strong>${stats.noteCount}</strong><span>notes</span></a>
      <a class="stat" href="graph.html"><strong>${stats.linkCount}</strong><span>links</span></a>
      <div class="stat"><strong>${stats.assetCount}</strong><span>images</span></div>
      <div class="stat"><strong>${stats.orphanCount}</strong><span>orphans</span></div>
    </div>
    <div class="alpha-jump">${letters.map(l => `<a href="#letter-${esc(l)}">${esc(l)}</a>`).join('')}</div>
    ${listHtml}
  </article>
</main>
${scripts(p, pageData)}
</body>
</html>`;
}

// Full interactive graph page.
export function graphPage(stats) {
  const p = { static: 'static/', home: '', search: 'search-index.json', note: 'notes/' };
  const pageData = { page: 'graph', searchIndex: p.search, graphUrl: 'graph.json' };
  return `${head('Graph — mind_map', p, '<style>body{overflow:hidden}</style>')}
<body class="graph-body">
${header(p)}
<main class="graph-main">
  <div class="graph-toolbar">
    <label><input type="checkbox" id="graph-orphans" checked> orphans</label>
    <label><input type="checkbox" id="graph-labels" checked> labels</label>
    <span class="graph-hint">drag to pan · scroll to zoom · click a node to open</span>
  </div>
  <canvas id="graph-canvas"></canvas>
  <div id="graph-tooltip" class="graph-tooltip" hidden></div>
</main>
${scripts(p, pageData)}
</body>
</html>`;
}
