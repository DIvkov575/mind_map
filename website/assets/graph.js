/* Dependency-free force-directed graph on <canvas>.
   Used for the full graph page and the per-note local graph. */
(function () {
  'use strict';

  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function createGraph(canvas, data, opts) {
    opts = opts || {};
    const ctx = canvas.getContext('2d');
    const nodesById = new Map();
    const nodes = data.nodes.map(n => {
      const node = { id: n.id, title: n.title, deg: n.deg || 0, x: 0, y: 0, vx: 0, vy: 0 };
      nodesById.set(n.id, node);
      return node;
    });
    const links = data.links
      .map(l => ({ source: nodesById.get(l.source), target: nodesById.get(l.target) }))
      .filter(l => l.source && l.target);

    const N = nodes.length || 1;
    // Seed positions on a circle so the layout unfolds deterministically.
    nodes.forEach((n, i) => {
      const a = (i / N) * Math.PI * 2;
      const r = 40 + Math.sqrt(i) * 14;
      n.x = Math.cos(a) * r;
      n.y = Math.sin(a) * r;
    });

    const focusId = opts.focus || (data.center || null);
    let W = 1, H = 1, dpr = 1;
    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    }
    resize();

    // View transform (world -> screen): screen = (world * k) + translate + center
    const view = { k: opts.initialScale || 1, tx: 0, ty: 0 };

    // Force parameters scale with graph size.
    const repel = opts.repel != null ? opts.repel : (N > 120 ? 2600 : 900);
    const linkDist = opts.linkDist || (N > 120 ? 42 : 60);
    const linkK = 0.04;
    const centerK = opts.centerK != null ? opts.centerK : 0.012;
    let alpha = 1;
    const alphaDecay = 0.985;
    const minAlpha = 0.02;

    function tick() {
      // Repulsion (O(n^2); fine up to a few thousand nodes).
      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < N; j++) {
          const b = nodes[j];
          let dx = a.x - b.x, dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 0.01) { dx = (Math.random() - 0.5) * 0.1; dy = (Math.random() - 0.5) * 0.1; d2 = dx * dx + dy * dy; }
          const inv = repel / d2;
          const fx = dx * inv, fy = dy * inv;
          a.vx += fx; a.vy += fy;
          b.vx -= fx; b.vy -= fy;
        }
      }
      // Spring attraction along links.
      for (const l of links) {
        const a = l.source, b = l.target;
        let dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (d - linkDist) * linkK;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;
      }
      // Gravity to center.
      for (const n of nodes) {
        n.vx -= n.x * centerK;
        n.vy -= n.y * centerK;
        n.vx *= 0.82; n.vy *= 0.82;
        if (n === dragging) continue;
        n.x += n.vx * alpha;
        n.y += n.vy * alpha;
      }
      if (focusNode) { focusNode.x = 0; focusNode.y = 0; }
      alpha = Math.max(minAlpha, alpha * alphaDecay);
    }

    const focusNode = focusId ? nodesById.get(focusId) : null;

    function radiusOf(n) {
      const base = opts.small ? 2.4 : 3.2;
      const r = base + Math.sqrt(n.deg) * (opts.small ? 1.0 : 1.4);
      return (n === focusNode) ? r + 2.5 : r;
    }

    const colAccent = () => cssVar('--accent', '#a78bfa');
    const colText = () => cssVar('--text', '#dcdde1');
    const colMuted = () => cssVar('--text-muted', '#9a9ba3');
    const colBorder = () => cssVar('--border', '#35353f');

    function worldToScreen(x, y) {
      return { x: x * view.k + view.tx + W / 2, y: y * view.k + view.ty + H / 2 };
    }
    function screenToWorld(sx, sy) {
      return { x: (sx - view.tx - W / 2) / view.k, y: (sy - view.ty - H / 2) / view.k };
    }

    let showLabels = opts.labels != null ? opts.labels : (N <= 120);
    function setLabels(v) { showLabels = v; }

    function draw() {
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      // edges
      ctx.strokeStyle = colBorder();
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const l of links) {
        const s = worldToScreen(l.source.x, l.source.y);
        const t = worldToScreen(l.target.x, l.target.y);
        ctx.moveTo(s.x, s.y); ctx.lineTo(t.x, t.y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
      // nodes
      for (const n of nodes) {
        const p = worldToScreen(n.x, n.y);
        const r = radiusOf(n) * Math.max(0.7, Math.min(1.6, view.k));
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = (n === hover || n === focusNode) ? colAccent() : (n.deg === 0 ? colMuted() : colText());
        ctx.fill();
        if (n === hover) { ctx.lineWidth = 1.5; ctx.strokeStyle = colAccent(); ctx.stroke(); }
      }
      // labels
      if (showLabels || hover) {
        ctx.fillStyle = colText();
        ctx.font = '11px -apple-system, system-ui, sans-serif';
        ctx.textAlign = 'center';
        for (const n of nodes) {
          const showThis = (n === hover) || (showLabels && (view.k > 0.55 || n.deg > 6 || n === focusNode));
          if (!showThis) continue;
          const p = worldToScreen(n.x, n.y);
          ctx.fillText(n.title, p.x, p.y - radiusOf(n) - 4);
        }
      }
      ctx.restore();
    }

    // Fit the whole graph into the viewport after warmup.
    function fit(padding) {
      padding = padding || 40;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const n of nodes) {
        if (n.x < minX) minX = n.x; if (n.y < minY) minY = n.y;
        if (n.x > maxX) maxX = n.x; if (n.y > maxY) maxY = n.y;
      }
      const gw = Math.max(1, maxX - minX), gh = Math.max(1, maxY - minY);
      const k = Math.min((W - padding * 2) / gw, (H - padding * 2) / gh);
      view.k = Math.max(0.05, Math.min(2, k));
      const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
      view.tx = -cx * view.k;
      view.ty = -cy * view.k;
    }

    let hover = null, dragging = null, panning = false;
    let lastX = 0, lastY = 0, moved = false;
    const tooltip = opts.tooltip || null;

    function pickNode(sx, sy) {
      let best = null, bestD = 14 * 14;
      for (const n of nodes) {
        const p = worldToScreen(n.x, n.y);
        const dx = p.x - sx, dy = p.y - sy, d = dx * dx + dy * dy;
        const rr = (radiusOf(n) + 6); 
        if (d < Math.max(bestD, rr * rr) && d < 18 * 18) { best = n; bestD = d; }
      }
      return best;
    }

    function onDown(e) {
      const { sx, sy } = evtPos(e);
      const n = pickNode(sx, sy);
      moved = false;
      if (n) { dragging = n; alpha = Math.max(alpha, 0.6); }
      else { panning = true; canvas.classList.add('grabbing'); }
      lastX = sx; lastY = sy;
    }
    function onMove(e) {
      const { sx, sy } = evtPos(e);
      if (dragging) {
        const w = screenToWorld(sx, sy);
        dragging.x = w.x; dragging.y = w.y; dragging.vx = 0; dragging.vy = 0;
        moved = true; alpha = Math.max(alpha, 0.4);
      } else if (panning) {
        view.tx += sx - lastX; view.ty += sy - lastY; lastX = sx; lastY = sy; moved = true;
      } else {
        const n = pickNode(sx, sy);
        if (n !== hover) {
          hover = n;
          canvas.style.cursor = n ? 'pointer' : 'grab';
          if (tooltip) {
            if (n) { tooltip.hidden = false; tooltip.textContent = n.title; tooltip.style.left = (sx + 12) + 'px'; tooltip.style.top = (sy + 12) + 'px'; }
            else tooltip.hidden = true;
          }
        } else if (n && tooltip) { tooltip.style.left = (sx + 12) + 'px'; tooltip.style.top = (sy + 12) + 'px'; }
      }
    }
    function onUp(e) {
      canvas.classList.remove('grabbing');
      if (dragging && !moved) navigate(dragging);
      else if (!dragging && !moved && !panning) { /* click empty */ }
      dragging = null; panning = false;
    }
    function onClick(e) {
      const { sx, sy } = evtPos(e);
      const n = pickNode(sx, sy);
      if (n && !moved) navigate(n);
    }
    function navigate(n) {
      if (n === focusNode && opts.focus) return; // already here
      const base = opts.noteBase || '';
      window.location.href = base + n.id + '.html';
    }
    function onWheel(e) {
      e.preventDefault();
      const { sx, sy } = evtPos(e);
      const before = screenToWorld(sx, sy);
      const factor = Math.exp(-e.deltaY * 0.0015);
      view.k = Math.max(0.03, Math.min(6, view.k * factor));
      const after = screenToWorld(sx, sy);
      view.tx += (after.x - before.x) * view.k;
      view.ty += (after.y - before.y) * view.k;
    }
    function evtPos(e) {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches ? e.touches[0] : e;
      return { sx: t.clientX - rect.left, sy: t.clientY - rect.top };
    }

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    // Touch: 1 finger drags a node or pans; 2 fingers pinch-zoom + pan.
    let pinch = null;
    function touchXY(t) { const r = canvas.getBoundingClientRect(); return { sx: t.clientX - r.left, sy: t.clientY - r.top }; }
    function pinchState(e) {
      const a = touchXY(e.touches[0]), b = touchXY(e.touches[1]);
      return { d: Math.hypot(a.sx - b.sx, a.sy - b.sy) || 1, cx: (a.sx + b.sx) / 2, cy: (a.sy + b.sy) / 2 };
    }
    function onTouchStart(e) {
      if (e.touches.length >= 2) { dragging = null; panning = false; pinch = pinchState(e); moved = true; return; }
      const { sx, sy } = touchXY(e.touches[0]);
      const n = pickNode(sx, sy);
      moved = false; pinch = null;
      if (n) { dragging = n; alpha = Math.max(alpha, 0.6); } else { panning = true; }
      lastX = sx; lastY = sy;
    }
    function onTouchMove(e) {
      e.preventDefault();
      if (e.touches.length >= 2 && pinch) {
        const p = pinchState(e);
        const before = screenToWorld(p.cx, p.cy);
        view.k = Math.max(0.03, Math.min(6, view.k * (p.d / pinch.d)));
        const after = screenToWorld(p.cx, p.cy);
        view.tx += (after.x - before.x) * view.k + (p.cx - pinch.cx);
        view.ty += (after.y - before.y) * view.k + (p.cy - pinch.cy);
        pinch = p; moved = true;
        return;
      }
      if (e.touches.length !== 1) return;
      const { sx, sy } = touchXY(e.touches[0]);
      if (dragging) {
        const w = screenToWorld(sx, sy);
        dragging.x = w.x; dragging.y = w.y; dragging.vx = 0; dragging.vy = 0; moved = true; alpha = Math.max(alpha, 0.4);
      } else if (panning) {
        view.tx += sx - lastX; view.ty += sy - lastY; lastX = sx; lastY = sy; moved = true;
      }
    }
    function onTouchEnd(e) {
      if (e.touches.length === 0) {
        if (dragging && !moved) navigate(dragging);
        dragging = null; panning = false; pinch = null;
      } else if (e.touches.length === 1) {
        pinch = null; dragging = null;
        const { sx, sy } = touchXY(e.touches[0]);
        lastX = sx; lastY = sy; panning = true;
      }
    }
    canvas.style.touchAction = 'none';
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('touchcancel', onTouchEnd);
    canvas.addEventListener('mouseleave', () => { if (tooltip) tooltip.hidden = true; hover = null; });

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);

    // Warm up the simulation off-screen, then fit.
    const warm = opts.warmup != null ? opts.warmup : (N > 120 ? 120 : 60);
    for (let i = 0; i < warm; i++) tick();
    fit(opts.small ? 24 : 60);

    let raf;
    function loop() {
      if (alpha > minAlpha + 1e-4 || dragging) tick();
      draw();
      raf = requestAnimationFrame(loop);
    }
    loop();

    return {
      setLabels,
      reheat() { alpha = 1; },
      fit,
      destroy() { cancelAnimationFrame(raf); ro.disconnect(); },
    };
  }

  window.MindGraph = { create: createGraph };
})();
