(function startWebo() {
  'use strict';

  const content = window.WEBO_CONTENT;
  const animations = window.WEBO_ANIMATIONS || {
    screenIn() {},
    initBioStory(section) { section.classList.add('bio-fallback'); },
    showBioFinal(section) { section.classList.add('bio-direct-final'); },
    destroyBioStory() {},
    initApparatusStory() {},
    destroyApparatusStory() {},
    preloadAnimationEngine() { return Promise.resolve(false); }
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
    image.alt = data.alt || '';
    image.width = data.width;
    image.height = data.height;
  }

  function applyCardImageData(image, item) {
    image.src = item.imageThumb || item.image;
    image.alt = item.imageAlt || item.name;
    image.width = item.imageThumbWidth || item.imageWidth;
    image.height = item.imageThumbHeight || item.imageHeight;
  }

  function buildEducationRow(item) {
    const row = createElement(item.url ? 'a' : 'div', 'bio-education-row');
    if (item.url) {
      row.href = item.url;
      row.target = '_blank';
      row.rel = 'noopener noreferrer';
    }

    const brand = createElement('span', 'bio-education-brand');
    if (item.logo) {
      const logo = createElement('img');
      applyImageData(logo, item.logo);
      logo.loading = 'lazy';
      logo.decoding = 'async';
      brand.append(logo);
    } else {
      brand.textContent = item.institution;
    }

    const copy = createElement('span', 'bio-education-copy');
    if (item.logo) copy.append(createElement('span', 'sr-only', `${item.institution}: `));
    copy.append(createElement('span', 'bio-education-qualification', item.qualification));

    const period = createElement('span', 'bio-education-period', item.period);
    row.append(brand, copy, period);
    if (item.url) row.append(createElement('span', 'bio-education-arrow', '↗'));
    return row;
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
    dom.bioEducation.replaceChildren(...(content.bioStory.education || []).map(buildEducationRow));

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

  function renderSectionIntros() {
    const intros = content.sectionIntros || {};
    dom.gearIntro.textContent = intros.gear || '';
    dom.portfolioIntro.textContent = intros.portfolio || '';
    dom.portfolioIntro.hidden = !intros.portfolio;
    dom.contactIntro.textContent = intros.contact || 'Respondo rápido.';
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
      applyCardImageData(image, item);
      image.loading = 'lazy';
      image.decoding = 'async';
      image.fetchPriority = 'low';
      button.append(image);
    }

    const overlay = createElement('span', 'aparato-overlay');
    overlay.append(createElement('span', 'aparato-name', item.name));
    button.append(overlay);
    return button;
  }

  function renderAparatos() {
    const rows = content.gear.map(buildAparatoRow);
    dom.gearGrid.replaceChildren(...(rows.length ? rows : [emptyState('No hay aparatos publicados en este momento.')]));
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
    const layoutClass = step.layout ? ` is-${step.layout}-media` : '';
    const reverseClass = index % 2 && step.layout !== 'video' ? ' is-reversed' : '';
    const section = createElement('section', `aparato-process-step${reverseClass}${layoutClass}`);

    if (step.src) {
      const figure = createElement('figure', 'aparato-process-image');
      const image = createElement('img');
      applyImageData(image, step);
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      figure.append(image);
      section.append(figure);
    }

    if (step.images?.length) {
      const gallery = createElement('div', 'aparato-process-gallery');
      step.images.forEach((photo) => {
        const figure = createElement('figure', 'aparato-process-gallery-item');
        const image = createElement('img');
        applyImageData(image, photo);
        image.loading = 'lazy';
        image.decoding = 'async';
        figure.append(image);
        gallery.append(figure);
      });
      section.append(gallery);
    }

    if (step.video) {
      const figure = createElement('figure', 'aparato-process-video');
      const video = createElement('video');
      video.src = step.video.src;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', step.video.label);
      figure.append(video);
      if (step.video.caption) {
        figure.append(createElement('figcaption', 'aparato-process-video-caption', step.video.caption));
      }
      section.append(figure);
    }

    const paragraphs = step.paragraphs || (step.text ? [step.text] : []);
    if (paragraphs.length || step.list?.length) {
      const copy = createElement('div', 'aparato-process-copy');

      paragraphs.forEach((paragraphData) => {
        const paragraph = createElement('p');
        if (typeof paragraphData === 'string') {
          paragraph.textContent = paragraphData;
        } else {
          if (paragraphData.before) paragraph.append(document.createTextNode(paragraphData.before));
          if (paragraphData.link) {
            const link = createElement('a', 'aparato-process-link', paragraphData.link.label);
            link.href = paragraphData.link.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            paragraph.append(link);
          }
          if (paragraphData.after) paragraph.append(document.createTextNode(paragraphData.after));
        }
        copy.append(paragraph);
      });

      if (step.list?.length) {
        const list = createElement('ul', 'aparato-process-list');
        step.list.forEach((item) => list.append(createElement('li', '', item)));
        copy.append(list);
      }

      section.append(copy);
    }

    return section;
  }

  function renderAparatoDetail(item) {
    dom.detailName.textContent = item.name;
    const steps = (item.process || []).map(buildProcessStep);
    dom.processFlow.replaceChildren(...(steps.length ? steps : [emptyState('Este aparato todavía no tiene un proceso publicado.')]));
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
      applyCardImageData(image, item);
      image.loading = 'lazy';
      image.decoding = 'async';
      image.fetchPriority = 'low';
      button.append(image);
    }

    const overlay = createElement('span', 'aparato-overlay');
    overlay.append(createElement('span', 'aparato-name', item.name));
    button.append(overlay);
    return button;
  }

  function renderPortfolio() {
    const rows = content.portfolio.map(buildPortfolioRow);
    dom.portfolioGrid.replaceChildren(...(rows.length ? rows : [emptyState('No hay proyectos publicados en este momento.')]));
  }

  function buildPortfolioShowcase(showcase) {
    const isWorkList = showcase.layout === 'work-list';
    const isPhotoStory = showcase.layout === 'photo-story';
    const layoutClass = isWorkList ? ' is-work-list' : (isPhotoStory ? ' is-photo-story' : '');
    const container = createElement('div', `portfolio-showcase${layoutClass}`);

    if (showcase.logo && showcase.channelUrl) {
      const logoLink = createElement('a', 'portfolio-showcase-logo');
      logoLink.href = showcase.channelUrl;
      logoLink.target = '_blank';
      logoLink.rel = 'noopener noreferrer';
      logoLink.setAttribute('aria-label', showcase.linkLabel || 'Abrir el enlace del proyecto');

      const logo = createElement('img');
      applyImageData(logo, showcase.logo);
      if (showcase.logo.className) logo.classList.add(showcase.logo.className);
      logo.decoding = 'async';
      logoLink.append(logo);
      container.append(logoLink);

      const taglineContent = showcase.taglineParts || showcase.tagline;
      if (taglineContent) {
        const tagline = createElement('p', 'portfolio-showcase-tagline');
        const parts = Array.isArray(taglineContent) ? taglineContent : [taglineContent];

        parts.forEach((part) => {
          if (typeof part === 'string') {
            tagline.append(document.createTextNode(part));
            return;
          }

          const link = createElement('a', null, part.label);
          link.href = part.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          tagline.append(link);
        });

        container.append(tagline);
      }
    }

    if (isWorkList) {
      const workList = createElement('div', 'portfolio-work-list');

      (showcase.works || []).forEach((work, index) => {
        const link = createElement('a', `portfolio-work-row frame-delay-${index % 4}`);
        link.href = work.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        const visual = createElement('span', 'portfolio-work-visual');
        (work.frames || []).forEach((frame, frameIndex) => {
          const image = createElement('img', `portfolio-work-frame${frameIndex ? ' is-secondary' : ''}`);
          applyImageData(image, frame);
          image.loading = index === 0 && frameIndex === 0 ? 'eager' : 'lazy';
          image.decoding = 'async';
          visual.append(image);
        });

        const copy = createElement('span', 'portfolio-work-copy');
        copy.append(
          createElement('span', 'portfolio-work-title', work.title),
          createElement('span', 'portfolio-work-role', work.role)
        );

        const arrow = createElement('span', 'portfolio-work-arrow', '↗');
        arrow.setAttribute('aria-hidden', 'true');
        link.append(visual, copy, arrow, createElement('span', 'sr-only', 'Abrir en YouTube'));
        workList.append(link);
      });

      container.append(workList);
      return container;
    }

    const videoGrid = createElement('div', 'portfolio-video-grid');
    (showcase.videos || []).forEach((video, index) => {
      const link = createElement('a', 'portfolio-video-card');
      link.href = video.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      const visual = createElement('span', 'portfolio-video-visual');
      const thumbnail = createElement('img');
      thumbnail.src = video.thumbnail;
      thumbnail.alt = '';
      thumbnail.width = video.thumbnailWidth;
      thumbnail.height = video.thumbnailHeight;
      thumbnail.loading = index === 0 ? 'eager' : 'lazy';
      thumbnail.decoding = 'async';
      visual.append(thumbnail, createElement('span', 'portfolio-video-play'));

      link.append(
        visual,
        createElement('span', 'portfolio-video-title', video.title),
        createElement('span', 'portfolio-video-role', video.role || '')
      );
      videoGrid.append(link);
    });
    if (videoGrid.childElementCount) container.append(videoGrid);

    const gallery = createElement('div', 'portfolio-photo-grid');
    (showcase.gallery || []).forEach((photo, index) => {
      const figure = createElement('figure', `portfolio-photo portfolio-photo-${index + 1}`);
      const image = createElement('img');
      applyImageData(image, photo);
      image.loading = 'lazy';
      image.decoding = 'async';
      figure.append(image);
      gallery.append(figure);
    });
    if (gallery.childElementCount) container.append(gallery);

    return container;
  }

  function renderPortfolioDetail(item) {
    dom.portfolioDetailName.textContent = item.name;
    const process = dom.portfolioDetailFlow.closest('.aparato-process');
    process?.classList.toggle('is-showcase', Boolean(item.showcase));

    if (item.showcase) {
      dom.portfolioDetailFlow.replaceChildren(buildPortfolioShowcase(item.showcase));
      return;
    }

    const steps = (item.story || []).map(buildProcessStep);
    dom.portfolioDetailFlow.replaceChildren(...(steps.length ? steps : [emptyState('Este proyecto todavía no tiene contenido publicado.')]));
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

    if (route === 'bio' && segments[1] === 'final') {
      return {
        key: 'bio/final',
        ...routeDefinitions.bio,
        bioMode: 'final'
      };
    }

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

    if (currentRoute?.startsWith('bio') && route.key !== currentRoute) {
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
      requestAnimationFrame(() => {
        if (route.bioMode === 'final') {
          animations.showBioFinal(activeScreen);
        } else {
          animations.initBioStory(activeScreen);
        }
      });
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
      dom.contactForm.setAttribute('aria-busy', 'true');
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 15000);

      try {
        const response = await fetch(content.contact.endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(dom.contactForm),
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`Formspree respondió ${response.status}`);
        status.textContent = 'Mensaje enviado. Te respondo pronto.';
        dom.contactForm.reset();
      } catch {
        showFormFailure(status);
      } finally {
        window.clearTimeout(timeoutId);
        submitButton.disabled = false;
        dom.contactForm.removeAttribute('aria-busy');
      }
    });
  }

  function setupHomeEntry() {
    const homeScreen = document.querySelector('.screen-home');
    let touchStartY = null;

    function openBio() {
      if (parseRoute().key !== 'home') return;
      animations.preloadAnimationEngine();
      window.location.hash = 'bio';
    }

    homeScreen.addEventListener('click', openBio);
    homeScreen.addEventListener('touchstart', (event) => {
      touchStartY = event.changedTouches[0]?.clientY ?? null;
    }, { passive: true });
    homeScreen.addEventListener('touchend', (event) => {
      const endY = event.changedTouches[0]?.clientY;
      if (touchStartY !== null && endY !== undefined && Math.abs(endY - touchStartY) > 18) openBio();
      touchStartY = null;
    }, { passive: true });

    window.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) > 4) openBio();
    }, { passive: true });

    document.addEventListener('keydown', (event) => {
      if (!['Enter', ' ', 'ArrowDown', 'PageDown'].includes(event.key)) return;
      if (event.target instanceof Element && event.target.closest('a, button, input, textarea, select')) return;
      openBio();
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
    dom.bioEducation = document.getElementById('bio-education');
    dom.bioHeroImage = document.getElementById('bio-hero-image');
    dom.bioParallaxTopImage = document.getElementById('bio-parallax-top-image');
    dom.bioParallaxBottomImage = document.getElementById('bio-parallax-bottom-image');
    dom.bioLeftImage = document.getElementById('bio-left-image');
    dom.bioRightImage = document.getElementById('bio-right-image');
    dom.gearIntro = document.getElementById('gear-intro');
    dom.gearGrid = document.getElementById('gear-grid');
    dom.gearMoreNote = document.getElementById('gear-more-note');
    dom.detailName = document.getElementById('aparato-detail-name');
    dom.processFlow = document.getElementById('aparato-process-flow');
    dom.portfolioGrid = document.getElementById('portfolio-grid');
    dom.portfolioIntro = document.getElementById('portfolio-intro');
    dom.portfolioDetailName = document.getElementById('portfolio-detail-name');
    dom.portfolioDetailFlow = document.getElementById('portfolio-detail-flow');
    dom.contactForm = document.getElementById('contact-form');
    dom.contactIntro = document.getElementById('contact-intro');
    dom.formStatus = document.getElementById('form-status');
  }

  function init() {
    cacheDom();
    renderBioStory();
    renderSectionIntros();
    renderAparatos();
    renderPortfolio();
    setupMobileNavigation();
    setupContactForm();
    setupHomeEntry();

    const bioLink = document.querySelector('[data-route="bio"]');
    ['pointerenter', 'pointerdown', 'focus'].forEach((eventName) => {
      bioLink.addEventListener(eventName, () => animations.preloadAnimationEngine(), { once: true });
    });

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
