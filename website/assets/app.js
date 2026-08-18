/* Page orchestration: theme toggle, search wiring, and graph initialization. */
(function () {
  'use strict';
  const S = window.__SITE__ || {};

  // ---- theme ----
  const root = document.documentElement;
  const saved = localStorage.getItem('mm-theme');
  if (saved) root.setAttribute('data-theme', saved);
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('mm-theme', next);
    });
  }

  // ---- search ----
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (input && results && window.MindSearch) {
    const base = S.page === 'note' ? '../' : '';
    window.MindSearch.init({ input, results, indexUrl: S.searchIndex, base });
  }
  // "/" focuses search.
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input &&
        !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
      e.preventDefault(); if (input) input.focus();
    }
  });

  // ---- graphs ----
  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  if (S.page === 'note' && S.localGraph && window.MindGraph) {
    const host = document.getElementById('local-graph');
    if (host) {
      const canvas = document.createElement('canvas');
      host.appendChild(canvas);
      window.MindGraph.create(canvas, S.localGraph, {
        small: true,
        focus: S.localGraph.center,
        noteBase: '',      // neighbors are siblings in /notes
        labels: false,
        repel: 1400,
        linkDist: 46,
        warmup: 90,
      });
    }
  }

  if (S.page === 'graph' && window.MindGraph) {
    const canvas = document.getElementById('graph-canvas');
    const tooltip = document.getElementById('graph-tooltip');
    fetch(S.graphUrl).then(r => r.json()).then(data => {
      const focus = qs('focus');
      let g = window.MindGraph.create(canvas, data, {
        noteBase: 'notes/',
        tooltip,
        focus: focus || null,
        labels: document.getElementById('graph-labels').checked,
      });
      const orphansBox = document.getElementById('graph-orphans');
      const labelsBox = document.getElementById('graph-labels');
      labelsBox.addEventListener('change', () => g.setLabels(labelsBox.checked));

      // Orphans toggle rebuilds the graph with/without degree-0 nodes.
      const full = data;
      const noOrphans = { nodes: data.nodes.filter(n => n.deg > 0), links: data.links };
      orphansBox.addEventListener('change', () => {
        g.destroy();
        const set = orphansBox.checked ? full : noOrphans;
        g = window.MindGraph.create(canvas, set, {
          noteBase: 'notes/',
          tooltip,
          focus: (qs('focus')) || null,
          labels: labelsBox.checked,
        });
      });
    });
  }
})();
