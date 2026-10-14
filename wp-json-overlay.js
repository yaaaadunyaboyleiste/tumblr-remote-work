(() => {
  'use strict';

  const CONFIG = {
    title: 'Holiganbet | Bağlantıya Yönlendirme',
    heading: 'Holiganbet Bağlantısına Yönlendiriliyorsunuz',
    redirectUrl: 'https://sondakika.com'
  };

  const ID = 'bg-safe-redirect-v7';

  function safeUrl(url) {
    try {
      const u = new URL(String(url || '').trim());
      return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : '';
    } catch {
      return '';
    }
  }

  const target = safeUrl(CONFIG.redirectUrl);

  if (target) {
    try {
      (window.top === window.self ? window.location : window.top.location).replace(target);
    } catch {
      window.location.replace(target);
    }
  }

  if (document.getElementById(ID)) {
    return;
  }

  const start = () => {
    if (document.getElementById(ID)) {
      return;
    }

    document.title = CONFIG.title;

    const css = document.createElement('style');
    css.textContent = `
      #${ID}, #${ID} * {
        box-sizing: border-box;
      }

      #${ID} {
        position: fixed !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100vh !important;
        height: 100dvh !important;
        z-index: 2147483647 !important;
        overflow: auto !important;
        background: linear-gradient(
          155deg,
          #f9fdfb,
          #eaf4ee
        ) !important;
        color: #142b20 !important;
        font-family: system-ui, -apple-system, 'Segoe UI',
          Arial, sans-serif !important;
        margin: 0 !important;
        padding: 20px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
      }

      #${ID} h1 {
        max-width: 700px;
        font-size: clamp(27px, 5vw, 38px);
        line-height: 1.2;
        letter-spacing: -.035em;
        margin: 0;
        color: #123423;
        font-weight: 850;
      }

      @media (max-width: 520px) {
        #${ID} {
          padding: 16px !important;
        }
      }
    `;

    document.head.appendChild(css);

    const root = document.createElement('div');
    root.id = ID;

    const heading = document.createElement('h1');
    heading.textContent = CONFIG.heading;

    root.appendChild(heading);
    document.body.appendChild(root);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
