(function startWebo() {
  'use strict';

  const content = window.WEBO_CONTENT;
  const animations = window.WEBO_ANIMATIONS || {
    screenIn() {},
    initBioStory(section) { section.classList.add('bio-fallback'); },
    destroyBioStory() {}
  };

  if (!content) {
    throw new Error('No se ha podido cargar assets/js/content.js');
  }

  const BASE_TITLE = 'WEBO — Ingeniería de audio y aparatos musicales';
  const routeDefinitions = {
    home: { screen: 'home', nav: null, title: BASE_TITLE },
    bio: { screen: 'bio', nav: 'bio', title: `Bio | ${BASE_TITLE}` },
    aparatos: { screen: 'gear', nav: 'gear', title: `Aparatos | ${BASE_TITLE}` },
    portfolio: { screen: 'portfolio', nav: 'portfolio', title: `Portfolio | ${BASE_TITLE}` },
    contacto: { screen: 'contact', nav: 'contact', title: `Contacto | ${BASE_TITLE}` }
  };

  const dom = {};
  let currentRoute = null;
  let hasRenderedRoute = false;

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-+|-+$)/g, '');
  }

  function safeExternalUrl(value) {
    if (!value) return null;
    try {
      const url = new URL(value, window.location.origin);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  function emptyState(message) {
    return createElement('p', 'empty-state', message);
  }

  function applyImageData(image, data) {
    image.src = data.src;
    image.alt = data.alt;
    image.width = data.width;
    image.height = data.height;
  }

  function renderBioStory() {
    dom.bioAccessibleText.textContent = content.bio;
    dom.bioCopy.textContent = content.bioStory.line;
    applyImageData(dom.bioHeroImage, content.bioStory.hero);
    applyImageData(dom.bioTopImage, content.bioStory.top);
    applyImageData(dom.bioBottomImage, content.bioStory.bottom);

    const bannerWordCount = Math.max(20, Math.ceil(window.innerWidth / 110) + 4);
    document.querySelectorAll('.scroll-banner-group').forEach((group) => {
      const words = Array.from({ length: bannerWordCount }, () => createElement('span', null, 'SCROLL'));
      group.replaceChildren(...words);
    });
  }

  function buildAparatoRow(item) {
    const button = createElement('button', 'aparato-row');
    button.type = 'button';
    button.setAttribute('aria-label', `Ver ${item.name}`);
    button.addEventListener('click', () => {
      window.location.hash = `aparatos/${slugify(item.name)}`;
    });

    if (item.image) {
      const image = createElement('img', 'aparato-photo');
      image.src = item.image;
      image.alt = item.imageAlt || item.name;
      image.width = item.imageWidth;
      image.height = item.imageHeight;
      image.loading = 'lazy';
      image.decoding = 'async';
      button.append(image);
    }

    const overlay = createElement('span', 'aparato-overlay');
    overlay.append(createElement('span', 'aparato-name', item.name));
    button.append(overlay);
    return button;
  }

  function renderAparatos() {
    const rows = content.gear.map(buildAparatoRow);
    dom.gearGrid.replaceChildren(...(rows.length ? rows : [emptyState('El catálogo está en preparación.')]));
  }

  function renderAparatoDetail(item) {
    dom.detailPhoto.replaceChildren();
    if (item.image) {
      const image = createElement('img');
      image.src = item.image;
      image.alt = item.imageAlt || item.name;
      image.width = item.imageWidth;
      image.height = item.imageHeight;
      image.decoding = 'async';
      dom.detailPhoto.append(image);
    }

    dom.detailName.textContent = item.name;
    dom.detailPrice.textContent = item.price || '';
    dom.detailDescription.textContent = item.description || '';

    const link = safeExternalUrl(item.link);
    dom.detailLink.hidden = Boolean(item.soon || !link);
    if (link) dom.detailLink.href = link;
  }

  function buildPortfolioCard(item) {
    const card = createElement('article', `card${item.soon ? ' card-soon' : ''}`);
    card.append(createElement('h2', 'card-name', item.name || item.title || 'Sin título'));

    if (item.price || item.date) {
      card.append(createElement('p', 'card-price', item.price || item.date));
    }
    if (item.description || item.desc) {
      card.append(createElement('p', 'card-desc', item.description || item.desc));
    }

    const link = safeExternalUrl(item.link);
    if (link && !item.soon) {
      const anchor = createElement('a', 'card-link', 'Ver más');
      anchor.href = link;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      card.append(anchor);
    } else if (item.soon) {
      card.append(createElement('span', 'card-desc', 'Próximamente'));
    }

    return card;
  }

  function renderPortfolio() {
    if (!content.portfolio.length) {
      dom.portfolioGrid.replaceChildren(emptyState('Próximamente: aquí aparecerán los trabajos seleccionados.'));
      return;
    }
    dom.portfolioGrid.replaceChildren(...content.portfolio.map(buildPortfolioCard));
  }

  function parseRoute() {
    const rawHash = window.location.hash.replace(/^#/, '');
    const decoded = (() => {
      try {
        return decodeURIComponent(rawHash);
      } catch {
        return rawHash;
      }
    })();
    const segments = decoded.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    const route = segments[0] || 'home';

    if (route === 'aparatos' && segments[1]) {
      const item = content.gear.find((candidate) => slugify(candidate.name) === segments[1]);
      if (item) {
        return {
          key: `aparatos/${segments[1]}`,
          screen: 'aparato-detail',
          nav: 'gear',
          title: `${item.name} | ${BASE_TITLE}`,
          item
        };
      }
    }

    const definition = routeDefinitions[route] || routeDefinitions.home;
    return { key: routeDefinitions[route] ? route : 'home', ...definition };
  }

  function setActiveNavigation(navKey) {
    document.querySelectorAll('.nav-links [data-route]').forEach((link) => {
      if (link.dataset.route === navKey) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (navKey) {
      dom.navLogo.removeAttribute('aria-current');
    } else {
      dom.navLogo.setAttribute('aria-current', 'page');
    }
  }

  function renderRoute() {
    const route = parseRoute();
    if (route.key === currentRoute && hasRenderedRoute) return;

    if (currentRoute === 'bio' && route.key !== 'bio') {
      animations.destroyBioStory();
    }
    currentRoute = route.key;

    if (route.item) renderAparatoDetail(route.item);

    document.querySelectorAll('[data-route-screen]').forEach((screen) => {
      screen.hidden = screen.dataset.routeScreen !== route.screen;
    });

    setActiveNavigation(route.nav);
    dom.background.classList.toggle('blurred', route.screen !== 'home');
    document.title = route.title;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const activeScreen = document.querySelector(`[data-route-screen="${route.screen}"]`);
    animations.screenIn(activeScreen);

    if (route.screen === 'bio') {
      requestAnimationFrame(() => animations.initBioStory(activeScreen));
    }

    if (hasRenderedRoute) {
      const heading = activeScreen.querySelector('.route-heading, .page-title');
      if (heading) requestAnimationFrame(() => heading.focus({ preventScroll: true }));
    }
    hasRenderedRoute = true;
  }

  function showFormFailure(status) {
    const emailLink = createElement('a', null, content.contact.fallbackEmail);
    emailLink.href = `mailto:${content.contact.fallbackEmail}`;
    status.replaceChildren('No se pudo enviar. Escríbeme a ', emailLink, '.');
  }

  function setupContactForm() {
    dom.contactForm.action = content.contact.endpoint;
    dom.contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = dom.formStatus;
      const submitButton = dom.contactForm.querySelector('[type="submit"]');
      status.textContent = 'Enviando…';
      submitButton.disabled = true;

      try {
        const response = await fetch(content.contact.endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(dom.contactForm)
        });
        if (!response.ok) throw new Error(`Formspree respondió ${response.status}`);
        status.textContent = '¡Mensaje enviado! Te respondo pronto 🎶';
        dom.contactForm.reset();
      } catch {
        showFormFailure(status);
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  function cacheDom() {
    dom.background = document.getElementById('bg-photo');
    dom.navLogo = document.querySelector('.nav-logo');
    dom.bioAccessibleText = document.getElementById('bio-accessible-text');
    dom.bioCopy = document.getElementById('bio-copy-line');
    dom.bioHeroImage = document.getElementById('bio-hero-image');
    dom.bioTopImage = document.getElementById('bio-top-image');
    dom.bioBottomImage = document.getElementById('bio-bottom-image');
    dom.gearGrid = document.getElementById('gear-grid');
    dom.detailPhoto = document.getElementById('aparato-detail-photo');
    dom.detailName = document.getElementById('aparato-detail-name');
    dom.detailPrice = document.getElementById('aparato-detail-price');
    dom.detailDescription = document.getElementById('aparato-detail-desc');
    dom.detailLink = document.getElementById('aparato-detail-link');
    dom.portfolioGrid = document.getElementById('portfolio-grid');
    dom.contactForm = document.getElementById('contact-form');
    dom.formStatus = document.getElementById('form-status');
  }

  function init() {
    cacheDom();
    renderBioStory();
    renderAparatos();
    renderPortfolio();
    setupContactForm();

    document.querySelector('.skip-link').addEventListener('click', (event) => {
      event.preventDefault();
      const activeScreen = document.querySelector('[data-route-screen]:not([hidden])');
      const target = activeScreen.querySelector('.route-heading, .page-title') || document.getElementById('main-content');
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: false });
    });

    window.addEventListener('hashchange', renderRoute);
    window.addEventListener('pagehide', () => animations.destroyBioStory());
    renderRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
