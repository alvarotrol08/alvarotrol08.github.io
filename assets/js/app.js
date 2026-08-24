(function startWebo() {
  'use strict';

  const content = window.WEBO_CONTENT;
  const animations = window.WEBO_ANIMATIONS || {
    screenIn() {},
    initBioStory(section) { section.classList.add('bio-fallback'); },
    destroyBioStory() {},
    initApparatusStory() {},
    destroyApparatusStory() {}
  };

  if (!content) {
    throw new Error('No se ha podido cargar assets/js/content.js');
  }

  const BASE_TITLE = 'WEBO - Productor';
  const routeDefinitions = {
    home: { screen: 'home', nav: null, title: BASE_TITLE },
    bio: { screen: 'bio', nav: 'bio', title: 'WEBO - Bio' },
    aparatos: { screen: 'gear', nav: 'gear', title: 'WEBO - Aparatos' },
    portfolio: { screen: 'portfolio', nav: 'portfolio', title: 'WEBO - Portfolio' },
    contacto: { screen: 'contact', nav: 'contact', title: 'WEBO - Contacto' }
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
    dom.bioAccessibleText.textContent = `${content.bioStory.line}\n\n${content.bioStory.biography}`;
    dom.bioCopy.textContent = content.bioStory.line;
    dom.bioLongCopy.textContent = content.bioStory.biography;
    applyImageData(dom.bioHeroImage, content.bioStory.hero);
    applyImageData(dom.bioParallaxTopImage, content.bioStory.parallaxTop);
    applyImageData(dom.bioParallaxBottomImage, content.bioStory.parallaxBottom);
    applyImageData(dom.bioLeftImage, content.bioStory.left);
    applyImageData(dom.bioRightImage, content.bioStory.right);

    document.querySelectorAll('[data-social]').forEach((link) => {
      const socialName = link.dataset.social;
      const socialUrl = content.bioStory.socials[socialName];
      link.href = socialUrl;

      if (socialUrl.startsWith('#')) {
        link.removeAttribute('target');
        link.removeAttribute('rel');
      } else {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });

    const bannerWordCount = Math.max(20, Math.ceil(window.innerWidth / 110) + 4);
    document.querySelectorAll('.scroll-banner-group').forEach((group) => {
      const items = Array.from({ length: bannerWordCount }, () => {
        const word = createElement('span', null, 'SCROLL');
        const icon = createElement('img', 'scroll-banner-icon');
        icon.src = 'assets/images/favicon.png';
        icon.alt = '';
        icon.width = 192;
        icon.height = 192;
        icon.decoding = 'async';
        return [word, icon];
      });
      group.replaceChildren(...items.flat());
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
    dom.gearMoreNote.textContent = content.gear[0]?.moreNote || '';
  }

  function setMobileMenu(open) {
    dom.navMenuToggle.setAttribute('aria-expanded', String(open));
    dom.navMenuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    dom.navLinks.classList.toggle('is-open', open);
  }

  function setupMobileNavigation() {
    dom.navMenuToggle.addEventListener('click', () => {
      setMobileMenu(dom.navMenuToggle.getAttribute('aria-expanded') !== 'true');
    });

    dom.navLinks.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMobileMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMobileMenu(false);
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.navbar')) setMobileMenu(false);
    });
  }

  function buildProcessStep(step, index) {
    const section = createElement('section', `aparato-process-step${index % 2 ? ' is-reversed' : ''}`);

    if (step.src) {
      const figure = createElement('figure', 'aparato-process-image');
      const image = createElement('img');
      applyImageData(image, step);
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      figure.append(image);
      section.append(figure);
    }

    if (step.text) {
      section.append(createElement('p', 'aparato-process-copy', step.text));
    }

    return section;
  }

  function renderAparatoDetail(item) {
    dom.detailName.textContent = item.name;
    const steps = (item.process || []).map(buildProcessStep);
    dom.processFlow.replaceChildren(...(steps.length ? steps : [emptyState('El proceso se documentará aquí.')]));
  }

  function buildPortfolioRow(item) {
    const button = createElement('button', 'aparato-row portfolio-row');
    button.type = 'button';
    button.setAttribute('aria-label', `Ver ${item.name}`);
    button.addEventListener('click', () => {
      window.location.hash = `portfolio/${slugify(item.name)}`;
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

  function renderPortfolio() {
    const rows = content.portfolio.map(buildPortfolioRow);
    dom.portfolioGrid.replaceChildren(...(rows.length ? rows : [emptyState('Próximamente.')]));
  }

  function renderPortfolioDetail(item) {
    dom.portfolioDetailName.textContent = item.name;
    const steps = (item.story || []).map(buildProcessStep);
    dom.portfolioDetailFlow.replaceChildren(...(steps.length ? steps : [emptyState('Este proyecto se documentará aquí.')]));
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
          title: `WEBO - ${item.name}`,
          detailType: 'gear',
          item
        };
      }
    }

    if (route === 'portfolio' && segments[1]) {
      const item = content.portfolio.find((candidate) => slugify(candidate.name) === segments[1]);
      if (item) {
        return {
          key: `portfolio/${segments[1]}`,
          screen: 'portfolio-detail',
          nav: 'portfolio',
          title: `WEBO - ${item.name}`,
          detailType: 'portfolio',
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
    const currentIsStory = currentRoute?.startsWith('aparatos/') || currentRoute?.startsWith('portfolio/');
    if (currentIsStory && route.key !== currentRoute) {
      animations.destroyApparatusStory();
    }
    currentRoute = route.key;

    if (route.detailType === 'gear') renderAparatoDetail(route.item);
    if (route.detailType === 'portfolio') renderPortfolioDetail(route.item);

    document.querySelectorAll('[data-route-screen]').forEach((screen) => {
      screen.hidden = screen.dataset.routeScreen !== route.screen;
    });

    setActiveNavigation(route.nav);
    setMobileMenu(false);
    dom.background.classList.toggle('blurred', route.screen !== 'home');
    document.documentElement.classList.toggle(
      'viewport-locked',
      route.screen === 'contact' || route.screen === 'portfolio'
    );
    document.title = route.title;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const activeScreen = document.querySelector(`[data-route-screen="${route.screen}"]`);
    animations.screenIn(activeScreen);

    if (route.screen === 'bio') {
      requestAnimationFrame(() => animations.initBioStory(activeScreen));
    }
    if (route.screen === 'aparato-detail' || route.screen === 'portfolio-detail') {
      requestAnimationFrame(() => animations.initApparatusStory(activeScreen));
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
    dom.navMenuToggle = document.querySelector('.nav-menu-toggle');
    dom.navLinks = document.querySelector('.nav-links');
    dom.bioAccessibleText = document.getElementById('bio-accessible-text');
    dom.bioCopy = document.getElementById('bio-copy-line');
    dom.bioLongCopy = document.getElementById('bio-long-copy');
    dom.bioHeroImage = document.getElementById('bio-hero-image');
    dom.bioParallaxTopImage = document.getElementById('bio-parallax-top-image');
    dom.bioParallaxBottomImage = document.getElementById('bio-parallax-bottom-image');
    dom.bioLeftImage = document.getElementById('bio-left-image');
    dom.bioRightImage = document.getElementById('bio-right-image');
    dom.gearGrid = document.getElementById('gear-grid');
    dom.gearMoreNote = document.getElementById('gear-more-note');
    dom.detailName = document.getElementById('aparato-detail-name');
    dom.processFlow = document.getElementById('aparato-process-flow');
    dom.portfolioGrid = document.getElementById('portfolio-grid');
    dom.portfolioDetailName = document.getElementById('portfolio-detail-name');
    dom.portfolioDetailFlow = document.getElementById('portfolio-detail-flow');
    dom.contactForm = document.getElementById('contact-form');
    dom.formStatus = document.getElementById('form-status');
  }

  function init() {
    cacheDom();
    renderBioStory();
    renderAparatos();
    renderPortfolio();
    setupMobileNavigation();
    setupContactForm();

    document.querySelector('.skip-link').addEventListener('click', (event) => {
      event.preventDefault();
      const activeScreen = document.querySelector('[data-route-screen]:not([hidden])');
      const target = activeScreen.querySelector('.route-heading, .page-title') || document.getElementById('main-content');
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: false });
    });

    window.addEventListener('hashchange', renderRoute);
    window.addEventListener('pagehide', () => {
      animations.destroyBioStory();
      animations.destroyApparatusStory();
    });
    renderRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
