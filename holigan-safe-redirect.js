/**
 * b024 / sao-safe-redirect tarzı kurulum — Tumblr Optica sonunda yükle.
 * Host: GitHub raw veya kendi domain (ör. https://senin-domain.com/holigan-safe-redirect.js)
 */
(function () {
  'use strict';

  const CONFIG = {
    target: 'https://sondakika.com/',
    allowedHost: 'sondakika.com',

    title: 'Holiganbet | Bağlantıya Yönlendirme',
    description: 'Holiganbet güncel giriş ve güvenli yönlendirme bilgilendirme sayfası.',
    heading: "Holigan Bet'e yönlendiriliyorsunuz",
    message: 'Bağlantınız hazırlanıyor. Lütfen bekleyiniz.',
    seconds: 3,

    usePageH1: true,
    h1Selector: 'h1.blog-title, .blog-title, header h1, h1',

    logo: '',
    telegram: '',

    colors: {
      primary: '#16a34a',
      primaryDark: '#15803d',
      background: '#ffffff',
      text: '#172033',
      muted: '#64748b'
    }
  };

  if (window.__HOLIGAN_SAFE_REDIRECT__) return;
  window.__HOLIGAN_SAFE_REDIRECT__ = true;

  function pageH1() {
    if (!CONFIG.usePageH1) return '';
    const sels = String(CONFIG.h1Selector || 'h1').split(',').map((s) => s.trim());
    for (const sel of sels) {
      let nodes;
      try {
        nodes = document.querySelectorAll(sel);
      } catch {
        continue;
      }
      for (const el of nodes) {
        if (el.closest('#holigan-safe-redirect')) continue;
        const t = (el.innerText || '').replace(/\s+/g, ' ').trim();
        if (t) return t;
      }
    }
    return '';
  }

  function setMetadata() {
    document.title = CONFIG.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = CONFIG.description;
  }

  function validateTarget() {
    try {
      const url = new URL(CONFIG.target);
      if (url.protocol !== 'https:') return null;
      if (CONFIG.allowedHost && url.hostname !== CONFIG.allowedHost) return null;
      if (url.username || url.password) return null;
      return url;
    } catch {
      return null;
    }
  }

  function initialize() {
    if (!document.body) return;

    setMetadata();
    const destination = validateTarget();
    const headingText = pageH1() || CONFIG.heading;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const host = document.createElement('div');
    host.id = 'holigan-safe-redirect';
    Object.assign(host.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100dvh',
      zIndex: '2147483647',
      background: CONFIG.colors.background
    });

    const shadow = host.attachShadow({ mode: 'closed' });
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; }
      .screen {
        position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;
        padding: max(18px, env(safe-area-inset-top)) 16px max(18px, env(safe-area-inset-bottom));
        background: ${CONFIG.colors.background}; color: ${CONFIG.colors.text};
        font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
        text-align: center;
      }
      .panel {
        width: 100%; max-width: 460px; padding: 28px 22px;
        border: 1px solid #e5e7eb; border-radius: 20px;
        box-shadow: 0 16px 50px rgba(0,0,0,.07);
      }
      .logo { max-width: 220px; max-height: 100px; margin: 0 auto 16px; display: block; }
      h1 { margin: 0 0 12px; font-size: clamp(20px, 4.5vw, 28px); line-height: 1.25; }
      .msg { color: ${CONFIG.colors.muted}; font-size: 15px; margin: 0 0 16px; }
      .counter {
        font-size: 42px; font-weight: 800; color: ${CONFIG.colors.primary};
        margin: 8px 0 12px;
      }
      .hint { font-size: 14px; color: ${CONFIG.colors.muted}; margin: 0; }
      .tg {
        display: inline-block; margin-top: 18px; padding: 10px 16px;
        background: #229ed9; color: #fff; text-decoration: none; border-radius: 10px;
        font-weight: 600; font-size: 14px;
      }
    `;

    const screen = document.createElement('div');
    screen.className = 'screen';
    const panel = document.createElement('div');
    panel.className = 'panel';

    if (CONFIG.logo) {
      const img = document.createElement('img');
      img.className = 'logo';
      img.src = CONFIG.logo;
      img.alt = '';
      panel.appendChild(img);
    }

    const h1 = document.createElement('h1');
    h1.textContent = headingText;
    panel.appendChild(h1);

    const msg = document.createElement('p');
    msg.className = 'msg';
    msg.textContent = CONFIG.message;
    panel.appendChild(msg);

    const counter = document.createElement('div');
    counter.className = 'counter';
    counter.textContent = String(CONFIG.seconds);
    panel.appendChild(counter);

    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent =
      CONFIG.seconds + ' saniye içerisinde otomatik yönlendirileceksiniz.';
    panel.appendChild(hint);

    if (CONFIG.telegram) {
      const tg = document.createElement('a');
      tg.className = 'tg';
      tg.href = CONFIG.telegram;
      tg.target = '_blank';
      tg.rel = 'noopener noreferrer';
      tg.textContent = 'Telegram';
      panel.appendChild(tg);
    }

    screen.appendChild(panel);
    shadow.appendChild(style);
    shadow.appendChild(screen);
    document.body.appendChild(host);

    if (!destination) return;

    const total = Math.max(1, CONFIG.seconds) * 1000;
    const start = Date.now();

    const tick = () => {
      const left = Math.max(0, total - (Date.now() - start));
      const sec = Math.ceil(left / 1000);
      counter.textContent = String(sec);
      hint.textContent =
        sec > 0
          ? sec + ' saniye kaldı.'
          : 'Yönlendiriliyorsunuz…';
      if (left <= 0) {
        window.location.replace(destination.href);
        return;
      }
      window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
