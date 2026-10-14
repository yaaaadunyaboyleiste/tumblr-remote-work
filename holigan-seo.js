/**
 * Holiganbet giriş — SEO alanları (yönlendirme YOK).
 * Tumblr tema: <head> veya </body> öncesi yükle.
 */
(function () {
  'use strict';

  const CONFIG = {
    title: 'Holiganbet Giriş | Güncel Holiganbet Giriş Adresi ve Bilgilendirme',
    description:
      'Holiganbet giriş için güncel bilgilendirme, Holiganbet giriş adresi ve Holiganbet giriş adımları. Resmi kaynakları kontrol ederek güvenli Holiganbet giriş yapın.',
    keywords:
      'Holiganbet giriş, Holiganbet güncel giriş, Holiganbet giriş adresi, Holiganbet yeni adres',
    h1: 'Holiganbet Giriş',
    tagline: 'Güncel Holiganbet giriş adresi ve Holiganbet giriş notları',
    introTitle: 'Holiganbet giriş hakkında',
    introHtml:
      '<p>Bu sayfa <strong>Holiganbet giriş</strong> arayanlar için bilgilendirme amaçlıdır. <strong>Holiganbet giriş adresi</strong> zaman zaman güncellenebilir.</p>' +
      '<p><strong>Holiganbet güncel giriş</strong> duyurularını aşağıdaki gönderilerden takip edebilirsiniz.</p>',
    ogSiteName: 'Holiganbet Giriş',
    locale: 'tr_TR'
  };

  function setMetaName(name, content) {
    if (!content) return;
    let el = document.querySelector('meta[name="' + name + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.name = name;
      document.head.appendChild(el);
    }
    el.content = content;
  }

  function setMetaProperty(prop, content) {
    if (!content) return;
    let el = document.querySelector('meta[property="' + prop + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', prop);
      document.head.appendChild(el);
    }
    el.content = content;
  }

  function isIndexPage() {
    return document.body && document.body.classList.contains('index-page');
  }

  function applyHead() {
    if (!isIndexPage()) return;
    document.title = CONFIG.title;
    setMetaName('description', CONFIG.description);
    setMetaName('keywords', CONFIG.keywords);
    setMetaProperty('og:locale', CONFIG.locale);
    setMetaProperty('og:site_name', CONFIG.ogSiteName);
    setMetaProperty('og:title', CONFIG.title);
    setMetaProperty('og:description', CONFIG.description);
    setMetaName('twitter:title', CONFIG.title);
    setMetaName('twitter:description', CONFIG.description);
  }

  function applyBody() {
    if (!isIndexPage()) return;
    const h1 =
      document.querySelector('h1.brand a') ||
      document.querySelector('h1.brand') ||
      document.querySelector('header h1');
    if (h1 && CONFIG.h1) {
      if (h1.tagName === 'A') {
        h1.textContent = CONFIG.h1;
      } else {
        const link = h1.querySelector('a');
        if (link) link.textContent = CONFIG.h1;
        else h1.textContent = CONFIG.h1;
      }
    }

    const tagline = document.querySelector('.tagline');
    if (tagline && CONFIG.tagline) {
      tagline.textContent = CONFIG.tagline;
    }

    const introHeading = document.querySelector('.seo-intro h2');
    if (introHeading && CONFIG.introTitle) {
      introHeading.textContent = CONFIG.introTitle;
    }

    const intro = document.querySelector('.seo-intro');
    if (intro && CONFIG.introHtml) {
      const h2 = intro.querySelector('h2');
      intro.innerHTML = '';
      if (h2) intro.appendChild(h2);
      else if (CONFIG.introTitle) {
        const nh = document.createElement('h2');
        nh.id = 'intro-heading';
        nh.textContent = CONFIG.introTitle;
        intro.appendChild(nh);
      }
      const wrap = document.createElement('div');
      wrap.innerHTML = CONFIG.introHtml;
      while (wrap.firstChild) intro.appendChild(wrap.firstChild);
    }
  }

  applyHead();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyBody, { once: true });
  } else {
    applyBody();
  }
})();
