(function startWebo() {
  'use strict';

  const content = window.WEBO_CONTENT;
  const animations = window.WEBO_ANIMATIONS || {
    screenIn() {},
    galleryIn() {},
    dialogIn() {},
    prefersReducedMotion: () => false
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
    galeria: { screen: 'gallery', nav: 'gallery', title: `Galería | ${BASE_TITLE}` },
    eventos: { screen: 'events', nav: 'events', title: `Eventos | ${BASE_TITLE}` },
    contacto: { screen: 'contact', nav: 'contact', title: `Contacto | ${BASE_TITLE}` }
  };

  const dom = {};
  let currentRoute = null;
  let hasRenderedRoute = false;
  let activePhotoIndex = 0;
  let lastGalleryTrigger = null;
  let restoreGalleryFocus = true;
  let galleryResizeTimer = null;

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

  function renderBio() {
    dom.bioText.textContent = content.bio;
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
    dom.gearGrid.replaceChildren(...(rows.length ? rows : [emptyState('El catálogo está en preparación.')])) ;
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

  function buildCard(item, type) {
    const card = createElement('article', `card${item.soon ? ' card-soon' : ''}`);
    card.append(createElement('h3', 'card-name', item.name || item.title || 'Sin título'));

    if (item.price || item.date) {
      card.append(createElement('p', 'card-price', item.price || item.date));
    }
    if (item.place) card.append(createElement('p', 'card-desc', item.place));
    if (item.description || item.desc) {
      card.append(createElement('p', 'card-desc', item.description || item.desc));
    }

    const link = safeExternalUrl(item.link);
    if (link && !item.soon) {
      const anchor = createElement('a', 'card-link', type === 'event' ? 'Más info' : 'Ver más');
      anchor.href = link;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      card.append(anchor);
    } else if (item.soon) {
      card.append(createElement('span', 'card-desc', 'Próximamente'));
    }

    return card;
  }

  function setupGrid(grid, pager, items, type, perPage = 6) {
    const pages = [];
    for (let index = 0; index < items.length; index += perPage) {
      pages.push(items.slice(index, index + perPage));
    }
    let page = 0;

    function draw() {
      if (!pages.length) {
        const message = type === 'portfolio'
          ? 'Próximamente: aquí aparecerán los trabajos seleccionados.'
          : 'No hay eventos publicados ahora mismo.';
        grid.replaceChildren(emptyState(message));
        if (pager) pager.replaceChildren();
        return;
      }

      grid.replaceChildren(...pages[page].map((item) => buildCard(item, type)));
      if (!pager) return;
      pager.replaceChildren();
      if (pages.length <= 1) return;

      const previous = createElement('button', 'pager-btn', '‹');
      previous.type = 'button';
      previous.setAttribute('aria-label', 'Página anterior');
      previous.addEventListener('click', () => {
        page = (page - 1 + pages.length) % pages.length;
        draw();
      });

      const indicator = createElement('span', 'page-indicator', `${page + 1} / ${pages.length}`);
      indicator.setAttribute('aria-live', 'polite');

      const next = createElement('button', 'pager-btn', '›');
      next.type = 'button';
      next.setAttribute('aria-label', 'Página siguiente');
      next.addEventListener('click', () => {
        page = (page + 1) % pages.length;
        draw();
      });

      pager.append(previous, indicator, next);
    }

    draw();
  }

  function seededRandom(seed) {
    const value = Math.sin(seed * 9301 + 49297) * 233280;
    return value - Math.floor(value);
  }

  function layoutGalleryCloud() {
    const items = [...dom.galleryItems.querySelectorAll('.gallery-cloud-item')];
    if (!items.length || window.matchMedia('(max-width: 720px)').matches) return;

    const columns = Math.max(1, Math.round(Math.sqrt(items.length * 1.7)));
    const rows = Math.ceil(items.length / columns);

    items.forEach((item, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const cellWidth = 100 / columns;
      const cellHeight = 100 / rows;
      const offsetX = (seededRandom(index * 7 + 1) - 0.5) * cellWidth * 0.7;
      const offsetY = (seededRandom(index * 13 + 2) - 0.5) * cellHeight * 0.7;
      const left = Math.min(Math.max(cellWidth * column + cellWidth / 2 + offsetX, 10), 90);
      const top = Math.min(Math.max(cellHeight * row + cellHeight / 2 + offsetY, 10), 90);
      const size = 104 + seededRandom(index * 3 + 5) * 62;
      const rotation = (seededRandom(index * 11 + 9) - 0.5) * 18;
      const duration = 5 + seededRandom(index * 17 + 3) * 3;
      const delay = seededRandom(index * 19 + 7) * -4;

      item.style.left = `calc(${left}% - ${size / 2}px)`;
      item.style.top = `calc(${top}% - ${size / 2}px)`;
      item.style.width = `${size}px`;
      item.style.height = `${size}px`;
      item.style.setProperty('--rot', `${rotation.toFixed(2)}deg`);
      item.style.setProperty('--float-duration', `${duration.toFixed(2)}s`);
      item.style.setProperty('--float-delay', `${delay.toFixed(2)}s`);
    });
  }

  function buildGalleryItem(photo, index) {
    const button = createElement('button', 'gallery-cloud-item');
    button.type = 'button';
    button.dataset.index = String(index);
    button.setAttribute('aria-label', `Ampliar: ${photo.caption}`);

    const image = createElement('img');
    image.src = photo.thumb;
    image.srcset = `${photo.thumb} ${photo.thumbWidth}w, ${photo.src} ${photo.width}w`;
    image.sizes = '(max-width: 720px) 44vw, 166px';
    image.alt = photo.alt;
    image.width = photo.thumbWidth;
    image.height = photo.thumbHeight;
    image.loading = 'lazy';
    image.decoding = 'async';
    button.append(image);
    button.addEventListener('click', () => openGalleryDialog(index, button));
    return button;
  }

  function renderGallery() {
    dom.galleryItems.replaceChildren(...content.photos.map(buildGalleryItem));
    requestAnimationFrame(layoutGalleryCloud);
  }

  function updateDialogPhoto() {
    const photo = content.photos[activePhotoIndex];
    if (!photo) return;
    dom.dialogImage.src = photo.src;
    dom.dialogImage.alt = photo.alt;
    dom.dialogImage.width = photo.width;
    dom.dialogImage.height = photo.height;
    dom.dialogCaption.textContent = `${photo.caption} · ${activePhotoIndex + 1} de ${content.photos.length}`;
  }

  function openGalleryDialog(index, trigger) {
    if (!content.photos[index]) return;
    activePhotoIndex = index;
    lastGalleryTrigger = trigger;
    restoreGalleryFocus = true;
    updateDialogPhoto();
    dom.galleryDialog.showModal();
    animations.dialogIn(dom.galleryDialog);
  }

  function closeGalleryDialog(shouldRestoreFocus = true) {
    if (!dom.galleryDialog.open) return;
    restoreGalleryFocus = shouldRestoreFocus;
    dom.galleryDialog.close();
  }

  function stepGallery(direction) {
    if (!content.photos.length) return;
    activePhotoIndex = (activePhotoIndex + direction + content.photos.length) % content.photos.length;
    updateDialogPhoto();
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
  }

  function renderRoute() {
    const route = parseRoute();
    if (route.key === currentRoute && hasRenderedRoute) return;
    currentRoute = route.key;

    closeGalleryDialog(false);
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

    if (route.screen === 'gallery') {
      requestAnimationFrame(() => {
        layoutGalleryCloud();
        animations.galleryIn([...dom.galleryItems.querySelectorAll('.gallery-cloud-item')]);
      });
    }

    if (hasRenderedRoute) {
      const heading = activeScreen.querySelector('.page-title');
      if (heading) requestAnimationFrame(() => heading.focus({ preventScroll: true }));
    }
    hasRenderedRoute = true;
  }

  function setupGalleryDialog() {
    dom.galleryDialog.querySelector('[data-gallery-close]').addEventListener('click', () => closeGalleryDialog());
    dom.galleryDialog.querySelector('[data-gallery-prev]').addEventListener('click', () => stepGallery(-1));
    dom.galleryDialog.querySelector('[data-gallery-next]').addEventListener('click', () => stepGallery(1));

    dom.galleryDialog.addEventListener('click', (event) => {
      if (event.target === dom.galleryDialog) closeGalleryDialog();
    });

    dom.galleryDialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepGallery(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepGallery(1);
      }
    });

    dom.galleryDialog.addEventListener('close', () => {
      dom.dialogImage.removeAttribute('src');
      if (
        restoreGalleryFocus &&
        lastGalleryTrigger &&
        lastGalleryTrigger.isConnected &&
        !lastGalleryTrigger.closest('[hidden]')
      ) {
        lastGalleryTrigger.focus();
      }
    });
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
    dom.bioText = document.getElementById('bio-text');
    dom.gearGrid = document.getElementById('gear-grid');
    dom.detailPhoto = document.getElementById('aparato-detail-photo');
    dom.detailName = document.getElementById('aparato-detail-name');
    dom.detailPrice = document.getElementById('aparato-detail-price');
    dom.detailDescription = document.getElementById('aparato-detail-desc');
    dom.detailLink = document.getElementById('aparato-detail-link');
    dom.portfolioGrid = document.getElementById('portfolio-grid');
    dom.eventsGrid = document.getElementById('events-grid');
    dom.eventsPager = document.getElementById('events-pager');
    dom.galleryItems = document.getElementById('gallery-cloud-items');
    dom.galleryDialog = document.getElementById('gallery-dialog');
    dom.dialogImage = document.getElementById('gallery-dialog-image');
    dom.dialogCaption = document.getElementById('gallery-dialog-caption');
    dom.contactForm = document.getElementById('contact-form');
    dom.formStatus = document.getElementById('form-status');
  }

  function init() {
    cacheDom();
    renderBio();
    renderAparatos();
    setupGrid(dom.portfolioGrid, null, content.portfolio, 'portfolio');
    setupGrid(dom.eventsGrid, dom.eventsPager, content.events, 'event');
    renderGallery();
    setupGalleryDialog();
    setupContactForm();

    document.querySelector('.skip-link').addEventListener('click', (event) => {
      event.preventDefault();
      const activeScreen = document.querySelector('[data-route-screen]:not([hidden])');
      const target = activeScreen.querySelector('.page-title') || document.getElementById('main-content');
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: false });
    });

    window.addEventListener('hashchange', renderRoute);
    window.addEventListener('resize', () => {
      window.clearTimeout(galleryResizeTimer);
      galleryResizeTimer = window.setTimeout(layoutGalleryCloud, 120);
    });

    renderRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
