/* Client-side search over search-index.json: prefix/substring ranking with
   keyboard navigation. No dependencies. */
(function () {
  'use strict';

  function score(query, item) {
    const q = query.toLowerCase();
    const title = item.title.toLowerCase();
    if (title === q) return 1000;
    if (title.startsWith(q)) return 500 - title.length;
    const wordStart = title.split(/[\s(_\-]/).some(w => w.startsWith(q));
    if (wordStart) return 300 - title.length;
    const ti = title.indexOf(q);
    if (ti >= 0) return 150 - ti;
    if (item.excerpt && item.excerpt.toLowerCase().includes(q)) return 40;
    return -1;
  }

  function init({ input, results, indexUrl, base }) {
    let data = null, active = -1, current = [];

    async function ensure() {
      if (data) return data;
      const res = await fetch(indexUrl);
      data = await res.json();
      return data;
    }

    function render(list, q) {
      current = list;
      active = list.length ? 0 : -1;
      if (!q) { results.hidden = true; results.innerHTML = ''; return; }
      if (!list.length) {
        results.hidden = false;
        results.innerHTML = '<div class="empty">No matches for “' + q.replace(/</g, '&lt;') + '”</div>';
        return;
      }
      results.hidden = false;
      results.innerHTML = list.map((it, i) =>
        '<a class="' + (i === 0 ? 'active' : '') + '" href="' + base + it.url + '">' +
        '<span class="r-title">' + highlight(it.title, q) + '</span>' +
        (it.excerpt ? '<span class="r-excerpt">' + escape(it.excerpt) + '</span>' : '') +
        '</a>'
      ).join('');
      [...results.children].forEach((el, i) => {
        el.addEventListener('mouseenter', () => setActive(i));
      });
    }

    function escape(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function highlight(title, q) {
      const i = title.toLowerCase().indexOf(q.toLowerCase());
      if (i < 0) return escape(title);
      return escape(title.slice(0, i)) + '<mark>' + escape(title.slice(i, i + q.length)) + '</mark>' + escape(title.slice(i + q.length));
    }

    function setActive(i) {
      const els = results.querySelectorAll('a');
      if (!els.length) return;
      active = (i + els.length) % els.length;
      els.forEach((el, idx) => el.classList.toggle('active', idx === active));
      els[active].scrollIntoView({ block: 'nearest' });
    }

    async function onInput() {
      const q = input.value.trim();
      if (!q) { render([], ''); return; }
      await ensure();
      const scored = [];
      for (const it of data) {
        const s = score(q, it);
        if (s > 0) scored.push([s, it]);
      }
      scored.sort((a, b) => b[0] - a[0] || a[1].title.localeCompare(b[1].title));
      render(scored.slice(0, 20).map(x => x[1]), q);
    }

    input.addEventListener('input', onInput);
    input.addEventListener('focus', () => { if (input.value.trim()) onInput(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Enter') {
        const els = results.querySelectorAll('a');
        if (els[active]) { e.preventDefault(); window.location.href = els[active].getAttribute('href'); }
      } else if (e.key === 'Escape') { input.blur(); results.hidden = true; }
    });
    document.addEventListener('click', (e) => {
      if (!results.contains(e.target) && e.target !== input) results.hidden = true;
    });
  }

  window.MindSearch = { init };
})();
