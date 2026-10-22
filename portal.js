(function () {
  var LABEL = 'Formats';
  var HREF = '/formats/';
  function addDesktop() {
    var cv = document.querySelector('header a.resume-button');
    if (!cv || !cv.parentNode || !cv.parentNode.parentNode) return;
    var links = cv.parentNode.parentNode;
    var ex = links.querySelector('[data-portal] a');
    if (ex) { if (ex.textContent !== LABEL) ex.textContent = LABEL; return; }
    var wrap = document.createElement('div');
    wrap.setAttribute('data-portal', '');
    wrap.className = 'portal-fade';
    var a = document.createElement('a');
    a.className = 'resume-button';
    a.href = HREF;
    a.textContent = LABEL;
    wrap.appendChild(a);
    links.appendChild(wrap);
  }
  function addMobile() {
    var r = document.querySelector('header aside a.resume-link');
    if (!r || !r.parentNode) return;
    var nav = r.parentNode;
    var em = nav.querySelector('a[data-portal]');
    if (em) { if (em.textContent !== LABEL) em.textContent = LABEL; return; }
    var a = document.createElement('a');
    a.className = 'resume-link portal-mobile';
    a.href = HREF;
    a.textContent = LABEL;
    a.setAttribute('data-portal', '');
    nav.appendChild(a);
  }
  function run() { addDesktop(); addMobile(); }
  var css = document.createElement('style');
  css.textContent = '@keyframes portalFade{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:none}}' +
    '.portal-fade{animation:portalFade .3s cubic-bezier(0.645,0.045,0.355,1) .5s both}' +
    'aside .portal-mobile{margin-top:20px!important}';
  (document.head || document.documentElement).appendChild(css);
  function start() {
    run();
    new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
