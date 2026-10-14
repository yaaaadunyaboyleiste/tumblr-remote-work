/**
 * Tumblr yönlendirme — redirectUrl doldur, GitHub'a push et.
 * CDN: https://cdn.jsdelivr.net/gh/yaaaadunyaboyleiste/tumblr-remote-work@main/redirect.js
 */
(() => {
  'use strict';

  const CONFIG = {
    redirectUrl: 'https://LINK-BURAYA',
    pageTitle: 'Holiganbet | Bağlantıya Yönlendirme',
    heading: 'Holiganbet Bağlantısına Yönlendiriliyorsunuz',
    fastRedirect: true
  };

  function safeUrl(url) {
    try {
      const u = new URL(String(url).trim());
      return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : '';
    } catch {
      return '';
    }
  }

  const target = safeUrl(CONFIG.redirectUrl);

  function go() {
    if (target) {
      window.location.replace(target);
    }
  }

  if (target && CONFIG.fastRedirect) {
    go();
    return;
  }

  const runSplash = () => {
    if (!document.body) {
      return;
    }
    document.title = CONFIG.pageTitle;
    const el = document.createElement('div');
    el.id = 'tumblr-redirect-splash';
    el.innerHTML =
      '<style>#tumblr-redirect-splash{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:#eaf4ee;font-family:system-ui,sans-serif;text-align:center;padding:20px}#tumblr-redirect-splash h1{margin:0;font-size:clamp(22px,5vw,34px);color:#123423}</style>' +
      '<h1>' +
      CONFIG.heading +
      '</h1>';
    document.body.appendChild(el);
    if (target) {
      go();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runSplash, { once: true });
  } else {
    runSplash();
  }
})();
