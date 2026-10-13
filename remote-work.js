(() => {
  'use strict';

  const CONFIG = {
    title: 'Holiganbet | Bağlantıya Yönlendirme',
    heading: 'Holiganbet Bağlantısına Yönlendiriliyorsunuz'
  };

  const ID = 'bg-safe-redirect-v7';

  function start() {
    if (!document.body || document.getElementById(ID)) {
      return;
    }

    document.title = CONFIG.title;

    const css = document.createElement('style');
    css.textContent = [
      '#bg-safe-redirect-v7 {',
      '  position: fixed;',
      '  inset: 0;',
      '  width: 100%;',
      '  height: 100vh;',
      '  height: 100dvh;',
      '  z-index: 2147483647;',
      '  overflow: auto;',
      '  box-sizing: border-box;',
      '  background: linear-gradient(155deg, #f9fdfb, #eaf4ee);',
      '  color: #142b20;',
      '  font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;',
      '  margin: 0;',
      '  padding: 20px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  text-align: center;',
      '}',
      '#bg-safe-redirect-v7 h1 {',
      '  max-width: 700px;',
      '  font-size: clamp(27px, 5vw, 38px);',
      '  line-height: 1.2;',
      '  letter-spacing: -.035em;',
      '  margin: 0;',
      '  color: #123423;',
      '  font-weight: 850;',
      '}',
      '@media (max-width: 520px) {',
      '  #bg-safe-redirect-v7 { padding: 16px; }',
      '}'
    ].join('\n');

    document.head.appendChild(css);

    const root = document.createElement('div');
    root.id = ID;
    root.setAttribute('role', 'main');

    const heading = document.createElement('h1');
    heading.textContent = CONFIG.heading;

    root.appendChild(heading);
    document.body.appendChild(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
