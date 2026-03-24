/**
 * okuname — Preloader
 * Discord-style preloader with okuname orange/dark pixel aesthetic
 * Include this script in <head> of every page
 */
(function () {
  'use strict';

  /* ── Inject critical CSS immediately (before paint) ── */
  const style = document.createElement('style');
  style.id = 'oku-preloader-css';
  style.textContent = `
    #oku-preloader {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #060606;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      font-family: 'Press Start 2P', monospace;
      overflow: hidden;
      transition: opacity 0.45s ease, transform 0.45s ease;
    }

    /* scanlines overlay */
    #oku-preloader::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.10) 2px,
        rgba(0,0,0,0.10) 3px
      );
      pointer-events: none;
      z-index: 1;
    }

    /* grid overlay */
    #oku-preloader::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.012) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.012) 1px, transparent 1px);
      background-size: 22px 22px;
      pointer-events: none;
      z-index: 1;
    }

    #oku-preloader.oku-hide {
      opacity: 0;
      pointer-events: none;
    }

    /* ── Discord-style window card ── */
    .oku-pl-card {
      position: relative;
      z-index: 2;
      width: min(420px, 90vw);
      background: #0f0f0f;
      border: 1px solid #1e1e1e;
      clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px);
      animation: okuCardIn 0.5s cubic-bezier(.22,1,.36,1) both;
    }

    @keyframes okuCardIn {
      from { opacity: 0; transform: scale(0.9) translateY(12px); }
      to   { opacity: 1; transform: none; }
    }

    /* title bar */
    .oku-pl-bar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 10px 14px;
      background: #0a0a0a;
      border-bottom: 1px solid #1a1a1a;
    }

    .oku-pl-dots {
      display: flex;
      gap: 5px;
    }

    .oku-pl-dot {
      width: 8px;
      height: 8px;
      background: #222;
      clip-path: polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px);
    }

    .oku-pl-dot:nth-child(1) { background: #ff5f57; }
    .oku-pl-dot:nth-child(2) { background: #ffbd2e; }
    .oku-pl-dot:nth-child(3) { background: #28c840; }

    .oku-pl-bar-title {
      flex: 1;
      text-align: center;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 0.5rem;
      color: #444;
      letter-spacing: 0.08em;
    }

    /* body */
    .oku-pl-body {
      padding: 28px 24px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    /* logo */
    .oku-pl-logo {
      font-family: 'Press Start 2P', monospace;
      font-size: 0.9rem;
      color: #ff7a18;
      letter-spacing: 0.06em;
      text-shadow: 0 0 12px rgba(255,122,24,0.5), 0 0 28px rgba(255,122,24,0.2);
      animation: okuLogoFlicker 3s steps(1) infinite;
    }

    @keyframes okuLogoFlicker {
      0%, 92%, 100% { opacity: 1; }
      93% { opacity: 0.4; }
      95% { opacity: 1; }
      97% { opacity: 0.2; }
      98% { opacity: 1; }
    }

    /* status text */
    .oku-pl-status {
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 0.48rem;
      color: #555;
      letter-spacing: 0.06em;
      min-height: 1.2em;
      text-align: center;
    }

    .oku-pl-status .oku-cursor {
      display: inline-block;
      width: 6px;
      height: 0.9em;
      background: #ff7a18;
      vertical-align: middle;
      margin-left: 2px;
      animation: okuBlink 0.9s steps(1) infinite;
    }

    @keyframes okuBlink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }

    /* progress bar */
    .oku-pl-track {
      width: 100%;
      height: 4px;
      background: #161616;
      border: 1px solid #1e1e1e;
      position: relative;
      overflow: hidden;
    }

    .oku-pl-fill {
      height: 100%;
      background: linear-gradient(90deg, #ff5500, #ff7a18, #ffb347);
      box-shadow: 0 0 10px rgba(255,122,24,0.5);
      width: 0%;
      transition: width 0.22s cubic-bezier(.4,0,.2,1);
      position: relative;
    }

    /* shimmer on bar */
    .oku-pl-fill::after {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: 60px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: okuShimmer 1.4s ease-in-out infinite;
    }

    @keyframes okuShimmer {
      0% { transform: translateX(-60px); }
      100% { transform: translateX(60px); }
    }

    /* pixel segments indicator */
    .oku-pl-segs {
      display: flex;
      gap: 3px;
      align-items: center;
    }

    .oku-pl-seg {
      width: 10px;
      height: 10px;
      background: #1a1a1a;
      border: 1px solid #222;
      clip-path: polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px);
      transition: background 0.15s, box-shadow 0.15s;
    }

    .oku-pl-seg.active {
      background: #ff7a18;
      box-shadow: 0 0 6px rgba(255,122,24,0.7);
      border-color: #ff7a18;
    }

    .oku-pl-seg.done {
      background: #331800;
      border-color: #552200;
    }

    /* percent */
    .oku-pl-pct {
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 0.5rem;
      color: #ff7a18;
      letter-spacing: 0.04em;
      min-width: 38px;
      text-align: right;
    }

    /* floating pixel particles */
    .oku-pl-particle {
      position: absolute;
      width: 3px;
      height: 3px;
      background: rgba(255,122,24,0.6);
      animation: okuParticleFloat linear infinite;
      pointer-events: none;
      z-index: 0;
    }

    @keyframes okuParticleFloat {
      0%   { transform: translateY(0) translateX(0); opacity: 0.7; }
      100% { transform: translateY(-100vh) translateX(var(--dx,0px)); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  /* ── Build HTML ── */
  const el = document.createElement('div');
  el.id = 'oku-preloader';

  const SEGS = 12;
  let segsHTML = '';
  for (let i = 0; i < SEGS; i++) segsHTML += `<span class="oku-pl-seg" id="oku-seg-${i}"></span>`;

  el.innerHTML = `
    <div class="oku-pl-card">
      <div class="oku-pl-bar">
        <div class="oku-pl-dots">
          <span class="oku-pl-dot"></span>
          <span class="oku-pl-dot"></span>
          <span class="oku-pl-dot"></span>
        </div>
        <span class="oku-pl-bar-title">okuname.ru — loading</span>
      </div>
      <div class="oku-pl-body">
        <div class="oku-pl-logo">okuname</div>
        <div class="oku-pl-track">
          <div class="oku-pl-fill" id="oku-pl-fill"></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px">
          <div class="oku-pl-segs">${segsHTML}</div>
          <div class="oku-pl-pct" id="oku-pl-pct">0%</div>
        </div>
        <div class="oku-pl-status" id="oku-pl-status">
          <span id="oku-pl-status-text">initializing</span><span class="oku-cursor"></span>
        </div>
      </div>
    </div>
  `;

  /* particles */
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'oku-pl-particle';
    const size = Math.random() > 0.6 ? '5px' : '3px';
    p.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100 + 100}%;
      width:${size}; height:${size};
      --dx:${(Math.random() - 0.5) * 40}px;
      animation-duration:${4 + Math.random() * 6}s;
      animation-delay:${Math.random() * 4}s;
      opacity:${0.4 + Math.random() * 0.5};
    `;
    el.appendChild(p);
  }

  /* Append as first child of body (needs body to exist) */
  function mount() {
    if (document.body) {
      document.body.insertBefore(el, document.body.firstChild);
    } else {
      document.addEventListener('DOMContentLoaded', mount);
    }
  }

  /* ── Progress logic ── */
  const messages = [
    'initializing',
    'loading assets',
    'syncing discord api',
    'rendering ui',
    'almost ready',
    'done',
  ];

  let progress = 0;
  let msgIdx = 0;
  const fillEl = () => document.getElementById('oku-pl-fill');
  const pctEl  = () => document.getElementById('oku-pl-pct');
  const txtEl  = () => document.getElementById('oku-pl-status-text');

  function setProgress(p) {
    progress = Math.min(100, Math.max(progress, p));
    const f = fillEl();
    const pt = pctEl();
    if (f) f.style.width = progress + '%';
    if (pt) pt.textContent = Math.round(progress) + '%';

    // update segments
    const segCount = Math.round((progress / 100) * SEGS);
    for (let i = 0; i < SEGS; i++) {
      const s = document.getElementById('oku-seg-' + i);
      if (!s) continue;
      if (i < segCount - 1) {
        s.className = 'oku-pl-seg done';
      } else if (i === segCount - 1) {
        s.className = 'oku-pl-seg active';
      } else {
        s.className = 'oku-pl-seg';
      }
    }

    // update message
    const newIdx = Math.min(messages.length - 1, Math.floor((progress / 100) * messages.length));
    if (newIdx !== msgIdx) {
      msgIdx = newIdx;
      const t = txtEl();
      if (t) t.textContent = messages[msgIdx];
    }
  }

  function hide() {
    setProgress(100);
    const t = txtEl();
    if (t) t.textContent = 'done';
    setTimeout(function () {
      el.classList.add('oku-hide');
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
        const css = document.getElementById('oku-preloader-css');
        if (css) css.parentNode.removeChild(css);
      }, 500);
    }, 250);
  }

  /* ── Fake smooth progress ── */
  let fakeTimer;
  function startFakeProgress() {
    let current = 0;
    const targets = [15, 35, 55, 72, 85, 92];
    let ti = 0;
    fakeTimer = setInterval(function () {
      if (ti < targets.length) {
        current = targets[ti];
        ti++;
        setProgress(current);
      }
    }, 320);
  }

  /* ── Real load tracking ── */
  function onLoad() {
    clearInterval(fakeTimer);
    // Smoothly animate to 100
    let p = progress;
    const step = setInterval(function () {
      p = Math.min(100, p + 4);
      setProgress(p);
      if (p >= 100) {
        clearInterval(step);
        hide();
      }
    }, 18);
  }

  /* ── Init ── */
  mount();
  startFakeProgress();

  if (document.readyState === 'complete') {
    // already loaded
    setTimeout(onLoad, 200);
  } else {
    window.addEventListener('load', onLoad);
    // fallback: max 5s
    setTimeout(function () {
      clearInterval(fakeTimer);
      onLoad();
    }, 5000);
  }
})();
