/* stenbossong.nl – hero-slogan + tijdlijn (vervangt de tabbladen bij Ervaring).
   Draait na de Gatsby-render en zet zichzelf opnieuw neer na client-side navigatie. */
(function () {
  'use strict';
  var PINK = '#FF3861', INK = '#2E2E2E';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- CSS ---------- */
  var CSS = '' +
  /* hero */
  '.sbh{position:relative}' +
  '.sbh .sbh-hi{margin:0 0 30px 4px;color:var(--green);font-family:var(--font-mono);font-size:clamp(var(--fz-sm),5vw,var(--fz-md));font-weight:400}' +
  '@media (max-width:480px){.sbh .sbh-hi{margin:0 0 20px 2px}}' +
  '.sbh h2.big-heading{margin:0}' +
  '.sbh h3.big-heading{margin-top:5px;color:var(--slate);line-height:1.1}' +
  '.sbh .sbh-in{opacity:0;transform:translateY(20px);animation:sbhUp .5s var(--easing) forwards}' +
  '.sbh{margin-bottom:10px}' +
  '.sbh .d1{animation-delay:.1s}.sbh .d2{animation-delay:.2s}.sbh .d3{animation-delay:.3s}' +
  '@keyframes sbhUp{to{opacity:1;transform:none}}' +
  '.sbh-rot{display:inline-grid;vertical-align:baseline;filter:drop-shadow(0 0 18px rgba(255,77,141,.28))}' +
  '.sbh-w{grid-area:1/1;white-space:nowrap;padding:0 .04em .08em 0;opacity:0;filter:blur(8px);transform:translateY(.12em);transition:opacity 1.1s ease,filter 1.1s ease,transform 1.1s cubic-bezier(.2,.7,.2,1);' +
  'background:linear-gradient(90deg,#E7255A 0%,#FF5E9A 18%,#E7255A 34%,#C04BFF 50%,#E7255A 66%,#FF7A3D 82%,#E7255A 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;animation:sbhWave 5s linear infinite}' +
  '.sbh-w.on{opacity:1;filter:blur(0);transform:none}' +
  '.sbh-w.off{opacity:0;filter:blur(8px);transform:translateY(-.12em)}' +
  '@keyframes sbhWave{0%{background-position:0% 0}100%{background-position:200% 0}}' +
  '@media (prefers-reduced-motion:reduce){.sbh-w{transition:none;animation:none;filter:none;transform:none}}' +

  /* tijdlijn */
  '#jobs > .inner{display:none!important}' +
  '.sb-tl{position:relative;margin:10px 0 0;padding:0 0 0 46px;max-width:760px}.sb-list{list-style:none;margin:0;padding:0}' +
  '.sb-tl:before,.sb-tl .sb-prog{content:"";position:absolute;left:11px;top:6px;width:2px;border-radius:2px}' +
  '.sb-tl:before{bottom:6px;background:rgba(46,46,46,.12)}' +
  '.sb-tl .sb-prog{height:0;background:var(--green);transition:height .2s linear}' +
  '.sb-it{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 210px;gap:28px;align-items:start;padding:0 0 64px}' +
  '.sb-it:last-child{padding-bottom:10px}' +
  '.sb-dot{position:absolute;left:-41px;top:4px;width:14px;height:14px;border-radius:50%;background:var(--navy);border:2px solid rgba(46,46,46,.25);transition:border-color .4s,background .4s,transform .4s}' +
  '.sb-it.in .sb-dot{border-color:var(--green);background:var(--green);transform:scale(1.15);box-shadow:0 0 0 5px rgba(255,56,97,.12)}' +
  '.sb-txt{opacity:0;transform:translateY(18px);transition:opacity .6s var(--easing),transform .6s var(--easing)}' +
  '.sb-it.in .sb-txt{opacity:1;transform:none}' +
  '.sb-date{display:block;margin:0 0 8px;font-family:var(--font-mono);font-size:var(--fz-xs);color:var(--green);letter-spacing:.04em}' +
  '.sb-t{margin:0;font-size:var(--fz-xxl);font-weight:500;line-height:1.3;color:var(--slate)}' +
  '.sb-t .at{color:var(--green)}.sb-t a{color:var(--green);text-decoration:none}' +
  '.sb-t a:hover{text-decoration:underline;text-underline-offset:3px}' +
  '.sb-sub{margin:6px 0 0;font-family:var(--font-mono);font-size:var(--fz-sm);color:var(--light-slate)}' +
  '.sb-art{width:210px;opacity:0;transition:opacity .4s .15s}' +
  '.sb-it.in .sb-art{opacity:1}' +
  '.sk{display:block;width:100%;height:auto;overflow:visible}' +
  '.sk .rough{filter:url(#sb-rough)}' +
  '.sk .s,.sk .p{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.7;stroke-dasharray:1;stroke-dashoffset:1}' +
  '.sk .s{stroke:' + INK + '}.sk .p{stroke:' + PINK + '}' +
  '.sk .fp{fill:rgba(255,56,97,.14)}' +
  '.sb-it.in .sk .s,.sb-it.in .sk .p{animation:sbDraw 1.1s cubic-bezier(.55,.1,.3,1) forwards;animation-delay:calc(var(--d,0) * 1s + .2s)}' +
  '@keyframes sbDraw{to{stroke-dashoffset:0}}' +
  /* pop-ins (voetjes, confetti) */
  '.sk .pop{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.2)}' +
  '.sb-it.in .sk .pop{animation:sbPop .45s cubic-bezier(.3,1.6,.5,1) forwards;animation-delay:calc(var(--d,0) * 1s)}' +
  '@keyframes sbPop{to{opacity:1;transform:none}}' +
  /* confetti-burst */
  '.sk .cf{opacity:0;transform-box:fill-box;transform-origin:center}' +
  '.sb-it.in .sk .cf{animation:sbBurst 1.5s cubic-bezier(.15,.7,.3,1) forwards;animation-delay:calc(var(--d,0) * 1s)}' +
  '@keyframes sbBurst{0%{opacity:0;transform:translate(var(--x0),var(--y0)) rotate(0) scale(.3)}12%{opacity:1}100%{opacity:1;transform:translate(0,0) rotate(var(--r,180deg)) scale(1)}}' +
  '.sb-it.in .sk .cf.loop{animation:sbBurst 1.5s cubic-bezier(.15,.7,.3,1) forwards,sbFloat 3.2s ease-in-out infinite alternate;animation-delay:calc(var(--d,0) * 1s),calc(var(--d,0) * 1s + 1.5s)}' +
  '@keyframes sbFloat{from{transform:translate(0,0) rotate(var(--r,180deg))}to{transform:translate(0,4px) rotate(calc(var(--r,180deg) + 25deg))}}' +
  /* gooi-hoed */
  '.sk .cap{opacity:0;transform-box:fill-box;transform-origin:center}' +
  '.sb-it.in .sk .cap{animation:sbToss 1.6s cubic-bezier(.3,.7,.4,1) forwards;animation-delay:1.1s}' +
  '@keyframes sbToss{0%{opacity:0;transform:translate(10px,50px) rotate(-60deg)}20%{opacity:1}100%{opacity:1;transform:translate(0,0) rotate(-8deg)}}' +
  /* fiets */
  '.sk .spin{transform-box:fill-box;transform-origin:center}' +
  '.sb-it.in .sk .spin{animation:sbSpin 1.6s linear infinite;animation-delay:1.4s}' +
  '@keyframes sbSpin{to{transform:rotate(360deg)}}' +
  '.sb-it.in .sk .ride{animation:sbRide 4s ease-in-out 1.4s infinite alternate}' +
  '@keyframes sbRide{from{transform:translateX(-6px)}to{transform:translateX(8px)}}' +
  /* water */
  '.sb-it.in .sk .wave{animation:sbWave 3s ease-in-out 1.6s infinite alternate}' +
  '@keyframes sbWave{from{transform:translateX(0)}to{transform:translateX(-7px)}}' +
  /* vliegtuigje */
  '.sk .plane{opacity:0}.sb-it.in .sk .plane{opacity:1;transition:opacity .2s .25s}' +
  '.sk .trail{fill:none;stroke:' + PINK + ';stroke-width:1.6;stroke-linecap:round;stroke-dasharray:3 6}' +
  '.sk .trailmask{fill:none;stroke:#fff;stroke-width:8;stroke-dasharray:1;stroke-dashoffset:1}' +
  '.sb-it.in .sk .trailmask{animation:sbDraw 2.6s .25s ease-in-out forwards}' +
  /* cases + projecten als editorial lijst */
  '#cases .cases-grid,.sb-hidegrid{display:none!important}' +
  '.sb-rows{list-style:none;margin:28px 0 0;padding:0;width:100%;max-width:900px;border-top:1px solid rgba(46,46,46,.14)}' +
  '#cases .sb-rows{margin-left:auto;margin-right:auto}' +
  '.sb-rows li{margin:0;padding:0;border-bottom:1px solid rgba(46,46,46,.14)}' +
  '.sb-rows li:before{display:none!important}' +
  '.sb-row{display:grid;grid-template-columns:96px minmax(0,1fr) 28px;gap:24px;align-items:baseline;padding:22px 4px;color:var(--slate);text-decoration:none!important;transition:background .25s var(--easing)}' +
  '.sb-row:hover,.sb-row:focus-visible{background:rgba(255,56,97,.04);outline:none}' +
  '.sb-r-meta{font-family:var(--font-mono);font-size:var(--fz-xs);color:var(--green);letter-spacing:.04em}' +
  '.sb-r-title{display:block;font-size:var(--fz-xxl);font-weight:500;line-height:1.25;color:var(--slate);transition:color .25s}' +
  '.sb-row:hover .sb-r-title{color:var(--green)}' +
  '.sb-r-sub{display:block;margin-top:6px;font-size:var(--fz-md);color:var(--light-slate)}' +
  '.sb-r-tools{display:block;margin-top:10px;font-family:var(--font-mono);font-size:var(--fz-xxs);color:var(--light-slate);line-height:1.7}' +
  '.sb-r-tools i{font-style:normal;color:rgba(46,46,46,.35);margin:0 7px}' +
  '.sb-r-arrow{justify-self:end;font-family:var(--font-mono);color:var(--green);transition:transform .25s var(--easing)}' +
  '.sb-row:hover .sb-r-arrow{transform:translateX(5px)}' +
  '@media (max-width:600px){.sb-row{grid-template-columns:minmax(0,1fr) 20px;gap:6px 14px;padding:18px 2px}.sb-r-meta{grid-column:1/-1}.sb-r-title{font-size:var(--fz-xl)}}' +
  /* archief: tools-kolom + doelrij */
  'td.sb-tools{font-family:var(--font-mono);font-size:var(--fz-xxs);line-height:1.6;color:var(--light-slate);padding-right:20px}' +
  'tr.sb-target td{background:rgba(255,56,97,.07);transition:background 1.2s}' +
  '@media (max-width:768px){.sb-tl{padding-left:40px}.sb-tl:before,.sb-tl .sb-prog{left:8px}.sb-dot{left:-38px}' +
  '.sb-it{grid-template-columns:1fr;gap:16px;padding-bottom:52px}.sb-art{width:min(230px,80%)}.sb-t{font-size:var(--fz-xl)}}' +
  '@media (prefers-reduced-motion:reduce){.sb-txt,.sb-art{opacity:1!important;transform:none!important;transition:none!important}' +
  '.sk *{animation:none!important;stroke-dashoffset:0!important;opacity:1!important;transform:none!important}' +
  '.sbh .sbh-in{animation:none;opacity:1;transform:none}}';

  function addCSS() {
    if (document.getElementById('sb-home-css')) return;
    var st = document.createElement('style'); st.id = 'sb-home-css'; st.textContent = CSS;
    document.head.appendChild(st);
    var f = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    f.setAttribute('width', '0'); f.setAttribute('height', '0'); f.setAttribute('aria-hidden', 'true');
    f.setAttribute('style', 'position:fixed;top:0;left:0;width:0!important;height:0!important;overflow:hidden;pointer-events:none');
    f.innerHTML = '<filter id="sb-rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="1.8"/></filter>';
    document.body.appendChild(f);
  }

  /* ---------- hero ---------- */
  var WORDS = ['verbinding', 'verhalen', 'resultaat'];
  var HOLD = [2000, 3000, 5000];
  var heroTimer = null;

  function doHero() {
    var sec = document.querySelector('main section:first-of-type');
    if (!sec || sec.id) return;
    var h1 = sec.querySelector(':scope > div > h1');
    var h3 = sec.querySelector(':scope > div > h3.big-heading');
    if (!h1 || !h3) return;
    if (sec.querySelector('.sbh')) return;
    var anchor = h3.parentNode.nextSibling; // de div met de ondertitel
    [h1, sec.querySelector(':scope > div > h2.big-heading'), h3].forEach(function (h) {
      if (h && h.parentNode) h.parentNode.style.display = 'none';
    });
    if (anchor && anchor.querySelector && anchor.querySelector('p')) anchor.style.display = 'none';
    var box = document.createElement('div');
    box.className = 'sbh';
    box.innerHTML =
      '<h1 class="sbh-hi sbh-in">Hi, mijn naam is</h1>' +
      '<h2 class="big-heading sbh-in d1">Sten Bossong</h2>' +
      '<h3 class="big-heading sbh-in d2">Tijd voor <span class="sbh-rot" aria-live="polite">' +
      WORDS.map(function (w, i) { return '<span class="sbh-w"' + (i ? ' aria-hidden="true"' : '') + '>' + w + '</span>'; }).join('') +
      '</span></h3>';
    sec.insertBefore(box, anchor);
    var rot = box.querySelector('.sbh-rot'), ws = rot.querySelectorAll('.sbh-w');
    setTimeout(function () { ws[0].classList.add('on'); }, reduce ? 0 : 450);
    var cur = 0;
    if (heroTimer) clearTimeout(heroTimer);
    function step() {
      heroTimer = setTimeout(function () {
        if (!document.body.contains(rot)) return;
        var nxt = (cur + 1) % ws.length, a = ws[cur], b = ws[nxt];
        a.classList.remove('on'); a.classList.add('off'); a.setAttribute('aria-hidden', 'true');
        b.removeAttribute('aria-hidden');
        setTimeout(function () { a.classList.remove('off'); b.classList.add('on'); }, reduce ? 0 : 650);
        cur = nxt; step();
      }, HOLD[cur] + (reduce ? 0 : 1100));
    }
    step();
  }

  /* ---------- schetsen ---------- */
  function S(inner) {
    return '<svg class="sk" viewBox="0 0 200 120" aria-hidden="true"><g class="rough">' + inner + '</g></svg>';
  }
  function P(d, cls, delay) {
    return '<path class="' + (cls || 's') + '" pathLength="1" style="--d:' + (delay || 0) + '" d="' + d + '"/>';
  }
  function foot(x, y, rot, mirror, delay, filled) {
    var sole = 'M9 34 C4 34 3 28 4 22 C5 16 3 12 5 8 C7 3 17 3 18 9 C19 14 16 17 16 23 C16 29 14 34 9 34Z';
    var toes = [[5.5, 3.6, 1.5], [8.6, 1.6, 1.7], [12, 0.8, 1.9], [16, 2, 2.4]];
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + (mirror ? -1 : 1) + ' 1) translate(-10 -17)"><g class="pop" style="--d:' + delay + '">' +
      '<path d="' + sole + '" class="' + (filled ? 'fp' : '') + '" fill="' + (filled ? '' : 'none') + '" stroke="' + INK + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      toes.map(function (t) { return '<circle cx="' + t[0] + '" cy="' + t[1] + '" r="' + t[2] + '" fill="none" stroke="' + INK + '" stroke-width="1.4"/>'; }).join('') +
      '</g></g>';
  }
  function confetti(cx, cy, list, base, loop) {
    return list.map(function (c, i) {
      var shape;
      if (c[2] === 'o') shape = '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="2.4" fill="none" stroke="' + (i % 2 ? INK : PINK) + '" stroke-width="1.5"/>';
      else if (c[2] === '~') shape = '<path d="M' + c[0] + ' ' + c[1] + ' q3 -4 6 0 t6 0" fill="none" stroke="' + PINK + '" stroke-width="1.6" stroke-linecap="round"/>';
      else shape = '<rect x="' + (c[0] - 2.5) + '" y="' + (c[1] - 1.2) + '" width="5" height="2.4" rx=".6" fill="' + (i % 3 ? PINK : INK) + '"/>';
      return '<g class="cf' + (loop ? ' loop' : '') + '" style="--d:' + (base + i * 0.03).toFixed(2) + ';--x0:' + (cx - c[0]) + 'px;--y0:' + (cy - c[1]) + 'px;--r:' + (c[3] || 160) + 'deg">' + shape + '</g>';
    }).join('');
  }
  function popper(base) {
    // kegel van linksonder naar rechtsboven, opening rond (92,58)
    return P('M46 104 L80 47', 's', base) + P('M46 104 L103 70', 's', base) +
      P('M80 47 C 92 46, 106 58, 103 70', 's', base + 0.25) + P('M80 47 C 79 58, 92 71, 103 70', 's', base + 0.35) +
      P('M57 85 L76 92', 'p', base + 0.5) + P('M64 72 L88 83', 'p', base + 0.6) + P('M72 60 L95 73', 'p', base + 0.7);
  }
  var BURST = [[118, 30, 'r', 220], [130, 46, 'o'], [142, 26, '~'], [112, 14, 'r', 300], [150, 50, 'r', 120], [160, 32, 'o'], [128, 10, '~'], [168, 58, 'r', 260], [100, 22, 'o'], [146, 8, 'r', 200], [176, 40, '~'], [158, 70, 'o']];

  var ART = {
    birth: S(
      foot(42, 96, -12, false, 0.25, false) + foot(64, 84, 8, true, 0.6, false) +
      foot(92, 74, -12, false, 0.95, false) + foot(116, 60, 8, true, 1.3, false) +
      foot(146, 48, -12, false, 1.65, true) + foot(168, 32, 8, true, 2.0, true)
    ),
    grad1: S(popper(0) + confetti(92, 58, BURST, 1.1)),
    grad2: S(popper(0) + confetti(92, 58, BURST.slice(0, 9), 1.1) +
      '<g transform="translate(36 30)"><g class="cap"><path d="M-22 0 L0 -10 L22 0 L0 10 Z" fill="none" stroke="' + INK + '" stroke-width="1.7" stroke-linejoin="round"/>' +
      '<path d="M-12 4 L-12 13 C -4 18, 4 18, 12 13 L12 4" fill="none" stroke="' + INK + '" stroke-width="1.7" stroke-linejoin="round"/>' +
      '<path d="M0 0 L16 4 L16 15" fill="none" stroke="' + PINK + '" stroke-width="1.7" stroke-linecap="round"/><circle cx="16" cy="17" r="2" fill="' + PINK + '"/></g></g>'),
    world: (function () {
      var trail = 'M18 100 C 40 96, 52 70, 70 66 C 92 61, 104 86, 92 92 C 80 98, 72 74, 96 58 C 120 42, 150 50, 176 22';
      return '<svg class="sk" viewBox="0 0 200 120" aria-hidden="true"><defs><mask id="sbTrailMask" maskUnits="userSpaceOnUse"><path class="trailmask" pathLength="1" d="' + trail + '"/></mask></defs>' +
        '<g class="rough">' +
        P('M128 98 c-6 0 -8 -8 -1 -9 c1 -6 10 -7 12 -2 c5 -2 10 2 8 7 c4 1 3 6 -1 6 z', 's', 0.1) +
        P('M30 30 c-5 0 -6 -6 0 -7 c1 -5 9 -5 10 -1 c4 -1 8 2 6 6 c3 1 2 4 -1 4 z', 's', 0.3) +
        '<path class="trail" mask="url(#sbTrailMask)" d="' + trail + '"/>' +
        '</g>' +
        '<g class="plane"><g transform="rotate(0)"><path d="M-11 -7 L13 0 L-11 7 L-6 0 Z" fill="' + '#FAF9F6' + '" stroke="' + INK + '" stroke-width="1.6" stroke-linejoin="round"/><path d="M-6 0 L13 0 M-11 7 L-3 2" fill="none" stroke="' + INK + '" stroke-width="1.3"/></g>' +
        '<animateMotion class="am" dur="2.6s" begin="indefinite" fill="freeze" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1" path="' + trail + '"/></g>' +
        '</svg>';
    })(),
    canal: S(
      P('M14 88 V48 H19 V42 H24 V36 H29 V30 H37 V36 H42 V42 H47 V48 H52 V88', 's', 0) +
      P('M52 88 V50 C52 42 58 42 58 36 C58 28 62 24 67 24 C72 24 76 28 76 36 C76 42 82 42 82 50 V88', 's', 0.15) +
      P('M82 88 V52 H88 V38 H92 V30 H100 V38 H104 V52 H110 V88', 's', 0.3) +
      P('M110 88 V46 L126 28 L142 46 V88', 's', 0.45) +
      P('M142 88 V54 C142 46 150 44 150 38 L162 32 L174 38 C174 44 182 46 182 54 V88', 's', 0.6) +
      P('M22 56 h8 v9 h-8z M36 56 h8 v9 h-8z M22 72 h8 v9 h-8z M36 72 h8 v9 h-8z', 's', 0.7) +
      P('M60 56 h6 v9 h-6z M70 56 h6 v9 h-6z M64 74 h8 v14', 'p', 0.8) +
      P('M90 60 h7 v9 h-7z M100 60 h0 M90 74 h14 v14', 's', 0.9) +
      P('M118 54 h7 v9 h-7z M128 54 h7 v9 h-7z M118 70 h7 v9 h-7z M128 70 h7 v9 h-7z M126 34 v-6 h6', 's', 1.0) +
      P('M150 58 h8 v10 h-8z M164 58 h8 v10 h-8z M156 74 h10 v14', 's', 1.1) +
      P('M6 88 H194', 's', 0.2) +
      '<g class="wave">' + P('M10 97 q6 -3 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0', 'p', 0.9) +
      P('M22 106 q6 -3 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0', 's', 1.1) + '</g>'
    ),
    globe: '<svg class="sk" viewBox="0 0 200 120" aria-hidden="true"><g class="rough">' +
      P('M100 22 A36 36 0 1 1 99.9 22 Z', 's', 0) +
      P('M64 58 H136 M70 40 H130 M70 76 H130', 's', 0.3) +
      '<ellipse class="s" pathLength="1" style="--d:.5" cx="100" cy="58" rx="16" ry="36"><animate attributeName="rx" values="16;30;4;16" dur="6s" begin="1.6s" repeatCount="indefinite"/></ellipse>' +
      P('M100 22 V94', 's', 0.45) +
      P('M150 74 L150 102 L174 88 Z', 'p', 0.8) +
      '<g transform="rotate(-14 100 58)"><ellipse cx="100" cy="58" rx="74" ry="20" fill="none" stroke="' + PINK + '" stroke-width="1.3" stroke-dasharray="2 5" class="pop" style="--d:1.1"/></g>' +
      '</g><g transform="rotate(-14 100 58)"><circle r="4" fill="' + PINK + '" class="pop" style="--d:1.2"><animateMotion dur="5s" begin="1.4s" repeatCount="indefinite" path="M174 58 A74 20 0 1 1 26 58 A74 20 0 1 1 174 58" rotate="0"/></circle></g>' +
      '</svg>',
    bike: S(
      '<g class="ride">' +
      '<circle class="s" pathLength="1" cx="56" cy="84" r="24"/>' +
      '<circle class="s" pathLength="1" style="--d:.15" cx="146" cy="84" r="24"/>' +
      '<g class="spin">' + P('M56 60 V108 M32 84 H80 M39 67 L73 101 M39 101 L73 67', 's', 0.4) + '</g>' +
      '<g class="spin">' + P('M146 60 V108 M122 84 H170 M129 67 L163 101 M129 101 L163 67', 's', 0.45) + '</g>' +
      P('M56 84 L96 84 L84 50 Z M84 50 L132 50 L96 84 M132 50 L146 84 M132 50 L128 40 C 130 36, 138 36, 142 40', 'p', 0.6) +
      P('M76 46 H92 M84 50 V46', 's', 0.9) +
      '<g class="spin">' + P('M96 84 L104 94 M104 94 h6 M96 84 L88 74 M88 74 h-6', 's', 1.0) + '</g>' +
      '</g>' + P('M8 110 H194', 's', 0.1)
    ),
    party: S(
      popper(0) + confetti(92, 58, BURST.concat([[110, 40, 'r', 90], [170, 14, 'o'], [186, 24, 'r', 240], [138, 64, '~']]), 1.1, true) +
      P('M150 102 v-14 h22 v14 M148 102 h26 M154 88 v-5 M161 88 v-5 M168 88 v-5', 's', 1.6) +
      '<g class="pop" style="--d:2.2"><path d="M154 80 q-1.5 -3 0 -5 q1.5 2 0 5 M161 80 q-1.5 -3 0 -5 q1.5 2 0 5 M168 80 q-1.5 -3 0 -5 q1.5 2 0 5" fill="' + PINK + '" stroke="' + PINK + '" stroke-width="1"/></g>'
    )
  };

  var STEPS = [
    { d: '1992', t: 'Geboren in Aalsmeer', a: 'birth' },
    { d: '2009', t: 'Afgestudeerd Atheneum <span class="at">@ KKC</span>', a: 'grad1' },
    { d: '2012', t: 'Afgestudeerd Bsc. Communicatiewetenschappen <span class="at">@ VU</span>', a: 'grad2' },
    { d: '2014–15', t: 'Reis rond de wereld van 14 maanden', a: 'world' },
    { d: '2018 · jan.', t: 'Kick-start carrière <a href="https://imlounge.nl" target="_blank" rel="noopener noreferrer">@ IM Lounge</a>', a: 'canal' },
    { d: '2020 · apr.', t: 'Transfer <a href="https://beyonddutch.nl" target="_blank" rel="noopener noreferrer">@ BeyondDutch</a>', s: 'Global performance marketeer', a: 'globe' },
    { d: '2021 · mei', t: 'Chief marketing officer <a href="https://bikefair.org" target="_blank" rel="noopener noreferrer">@ BikeFair</a>', s: '&amp; oprichting Flii Media', a: 'bike' },
    { d: '2026 · apr.', t: 'Celebrating 5 years <a href="https://flii.nl" target="_blank" rel="noopener noreferrer">@ Flii</a>', s: '<span class="cnt" data-n="40">40</span>+ clients, <span class="cnt" data-n="84">84</span> projects', a: 'party' }
  ];

  var io = null;
  function count(el) {
    var n = +el.getAttribute('data-n'), t0 = null;
    if (reduce) return;
    function f(ts) { if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / 1400); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); }
    el.textContent = '0'; requestAnimationFrame(f);
  }
  function reveal(li) {
    if (li.classList.contains('in')) return;
    li.classList.add('in');
    var am = li.querySelector('.am');
    if (am && am.beginElement) { try { am.beginElement(); } catch (e) {} }
    li.querySelectorAll('.cnt').forEach(count);
  }

  function doTimeline() {
    var sec = document.getElementById('jobs');
    if (!sec || sec.querySelector('.sb-tl')) return;
    var h = sec.querySelector('h2');
    var ol = document.createElement('div');
    ol.className = 'sb-tl';
    ol.innerHTML = '<span class="sb-prog" aria-hidden="true"></span><ol class="sb-list">' + STEPS.map(function (s) {
      return '<li class="sb-it"><span class="sb-dot" aria-hidden="true"></span><div class="sb-txt"><span class="sb-date">' + s.d + '</span>' +
        '<h3 class="sb-t">' + s.t + '</h3>' + (s.s ? '<p class="sb-sub">' + s.s + '</p>' : '') + '</div>' +
        '<div class="sb-art">' + ART[s.a] + '</div></li>';
    }).join('') + '</ol>';
    if (h && h.nextSibling) sec.insertBefore(ol, h.nextSibling); else sec.appendChild(ol);
    var items = ol.querySelectorAll('.sb-it');
    if (reduce || !('IntersectionObserver' in window)) { items.forEach(reveal); }
    else {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -22% 0px', threshold: 0.15 });
      items.forEach(function (li) { io.observe(li); });
    }
    progress();
  }

  function progress() {
    var ol = document.querySelector('.sb-tl'); if (!ol) return;
    var bar = ol.querySelector('.sb-prog'), r = ol.getBoundingClientRect();
    var mid = window.innerHeight * 0.72;
    var h = Math.max(0, Math.min(r.height - 12, mid - r.top));
    bar.style.height = h + 'px';
  }

  var raf = 0;
  function onScroll() { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; progress(); }); }


  /* ---------- cases + projecten ---------- */
  var projData = null;
  function getProjects() {
    if (!projData) projData = fetch('/page-data/sq/d/380049031.json').then(function (r) { return r.json(); }).then(function (d) {
      return d.data.projects.edges.map(function (e) { return e.node.frontmatter; });
    }).catch(function () { projData = null; return []; });
    return projData;
  }
  function slug(t) { return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function doCases() {
    var sec = document.getElementById('cases');
    if (!sec || sec.querySelector('.sb-rows')) return;
    var grid = sec.querySelector('.cases-grid'); if (!grid) return;
    var lis = grid.querySelectorAll(':scope > li'); if (!lis.length) return;
    var ul = document.createElement('ul'); ul.className = 'sb-rows';
    ul.innerHTML = Array.prototype.map.call(lis, function (li) {
      var a = li.querySelector('.case-title a'), d = li.querySelector('.case-date'), sub = li.querySelector('.case-desc');
      if (!a) return '';
      var yr = d ? (d.textContent.match(/\d{4}/) || [''])[0] : '';
      return '<li><a class="sb-row" href="' + a.getAttribute('href') + '"><span class="sb-r-meta">' + yr + '</span>' +
        '<span><span class="sb-r-title">' + esc(a.textContent) + '</span>' + (sub ? '<span class="sb-r-sub">' + esc(sub.textContent) + '</span>' : '') + '</span>' +
        '<span class="sb-r-arrow" aria-hidden="true">→</span></a></li>';
    }).join('');
    grid.parentNode.insertBefore(ul, grid.nextSibling);
  }

  function doProjects() {
    var grid = document.querySelector('main .projects-grid');
    if (!grid || location.pathname.indexOf('/archive') === 0) return;
    var sec = grid.parentNode;
    if (sec.querySelector('.sb-rows')) return;
    var ul = document.createElement('ul'); ul.className = 'sb-rows';
    sec.insertBefore(ul, grid.nextSibling);
    grid.classList.add('sb-hidegrid');
    var more = sec.querySelector('.more-button'); if (more) more.classList.add('sb-hidegrid');
    getProjects().then(function (list) {
      ul.innerHTML = list.map(function (f, i) {
        return '<li><a class="sb-row" href="/archive/#' + slug(f.title) + '"><span class="sb-r-meta">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
          '<span><span class="sb-r-title">' + esc(f.title) + '</span><span class="sb-r-sub">' + esc(f.descr_short || '') + '</span>' +
          ((f.tech && f.tech.length) ? '<span class="sb-r-tools">' + f.tech.map(esc).join('<i>·</i>') + '</span>' : '') + '</span>' +
          '<span class="sb-r-arrow" aria-hidden="true">→</span></a></li>';
      }).join('');
    });
  }

  /* ---------- archief: tools-kolom ---------- */
  function hydrated(el) { return Object.keys(el).some(function (k) { return k.indexOf('__reactFiber') === 0 || k.indexOf('__reactInternalInstance') === 0; }); }
  function doArchive() {
    if (location.pathname.indexOf('/archive') !== 0) return;
    var table = document.querySelector('main table');
    if (!table || table.getAttribute('data-sb')) return;
    if (!hydrated(table)) { setTimeout(sched, 250); return; }
    table.setAttribute('data-sb', '1');
    getProjects().then(function (list) {
      var tools = {};
      list.forEach(function (f) { if (f.tech) tools[f.title] = f.tech; });
      var th = table.querySelector('thead th.hide-on-mobile');
      if (th) { var n = document.createElement('th'); n.className = 'hide-on-mobile'; n.textContent = 'Tools'; th.parentNode.insertBefore(n, th.nextSibling); }
      table.querySelectorAll('tbody tr').forEach(function (tr) {
        var t = tr.querySelector('td.title'), dn = tr.querySelector('td.diensten'); if (!t) return;
        var name = t.textContent.trim();
        tr.id = slug(name);
        var td = document.createElement('td'); td.className = 'sb-tools hide-on-mobile';
        td.innerHTML = tools[name] ? tools[name].map(esc).join('<br>') : '';
        if (dn) dn.parentNode.insertBefore(td, dn.nextSibling); else tr.appendChild(td);
      });
      var h = decodeURIComponent(location.hash.slice(1)), row = h && document.getElementById(h);
      if (row && row.tagName === 'TR') {
        row.classList.add('sb-target');
        setTimeout(function () { row.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 150);
        setTimeout(function () { row.classList.remove('sb-target'); }, 4000);
      }
    });
  }

  function run() { addCSS(); doHero(); doTimeline(); doCases(); doProjects(); doArchive(); }
  var pend = 0;
  function sched() { if (pend) return; pend = setTimeout(function () { pend = 0; run(); }, 30); }

  function init() {
    run();
    new MutationObserver(sched).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
