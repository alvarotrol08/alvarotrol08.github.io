/*
 * Punto único de entrada para animaciones.
 * GSAP y ScrollTrigger se cargan antes de este archivo. La interfaz mantiene
 * un modo estático si la CDN falla o el usuario prefiere reducir movimiento.
 */

(function setupAnimations() {
  'use strict';

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let bioContext = null;
  let gearContext = null;
  let apparatusContext = null;

  function canAnimate() {
    return !reducedMotionQuery.matches;
  }

  function screenIn(screen) {
    if (!canAnimate()) return;
    const content = screen.querySelector('.screen-content');
    if (!content) return;

    if (window.gsap) {
      window.gsap.fromTo(
        content,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.36,
          ease: 'power2.out',
          clearProps: 'opacity,transform,visibility'
        }
      );
      return;
    }

    content.animate(
      [
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' }
    );
  }

  function destroyBioStory() {
    if (bioContext) {
      bioContext.revert();
      bioContext = null;
    }

    const section = document.querySelector('.bio-screen');
    if (section) section.classList.remove('bio-fallback');
  }

  function initBioStory(section) {
    destroyBioStory();

    if (!canAnimate() || !window.gsap || !window.ScrollTrigger) {
      section.classList.add('bio-fallback');
      return;
    }

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    bioContext = gsap.context(() => {
      const story = section.querySelector('.bio-story');
      const stage = section.querySelector('.bio-stage');
      const hero = section.querySelector('.bio-hero-visual');
      const copy = section.querySelector('.bio-copy-track');
      const parallaxTop = section.querySelector('.bio-parallax-image-top');
      const parallaxBottom = section.querySelector('.bio-parallax-image-bottom');
      const finalScene = section.querySelector('.bio-final');
      const finalCenter = section.querySelector('.bio-final-center');
      const leftImage = section.querySelector('.bio-final-image-left');
      const rightImage = section.querySelector('.bio-final-image-right');
      const banner = section.querySelector('.scroll-banner');
      const bannerTrack = section.querySelector('.scroll-banner-track');

      gsap.set([hero, copy, parallaxTop, parallaxBottom, finalCenter, leftImage, rightImage], { force3D: true });
      gsap.set(copy, { x: 0, autoAlpha: 1 });
      gsap.set(parallaxTop, { x: '9vw', autoAlpha: 0 });
      gsap.set(parallaxBottom, { x: '18vw', autoAlpha: 0 });
      gsap.set(finalScene, { autoAlpha: 1, pointerEvents: 'none' });
      gsap.set(finalCenter, { y: 14, autoAlpha: 0 });
      gsap.set(leftImage, { x: '-62vw', autoAlpha: 0 });
      gsap.set(rightImage, { x: '62vw', autoAlpha: 0 });

      gsap.fromTo(
        hero,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.62, delay: 0.08, ease: 'power2.out' }
      );

      gsap.fromTo(
        banner,
        { yPercent: 135, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.78, delay: 0.08, ease: 'power3.out' }
      );

      gsap.fromTo(
        bannerTrack,
        { xPercent: -50 },
        { xPercent: 0, duration: 22, repeat: -1, ease: 'none' }
      );

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'bio-story',
          trigger: story,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 6.2, 3900)}`,
          scrub: 0.8,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      timeline
        .to(hero, { x: () => -window.innerWidth * 0.46, scale: 0.84, duration: 1.15 }, 0)
        .to(
          copy,
          { x: () => -(window.innerWidth + copy.offsetWidth + 100), duration: 4.5 },
          0.3
        )
        .to(parallaxTop, { autoAlpha: 1, duration: 0.18 }, 0.4)
        .to(
          parallaxTop,
          {
            x: () => -(window.innerWidth * 1.46 + parallaxTop.offsetWidth),
            duration: 4.15
          },
          0.4
        )
        .to(parallaxBottom, { autoAlpha: 1, duration: 0.18 }, 1.1)
        .to(
          parallaxBottom,
          {
            x: () => -(window.innerWidth * 1.72 + parallaxBottom.offsetWidth),
            duration: 4.15
          },
          1.1
        )
        .to(
          hero,
          { x: () => -window.innerWidth * 0.9, autoAlpha: 0, duration: 1.1 },
          1.15
        )
        .to(
          [parallaxTop, parallaxBottom],
          { autoAlpha: 0, duration: 0.68 },
          3.72
        )
        .to(
          leftImage,
          { x: 0, autoAlpha: 1, duration: 1.15, ease: 'power3.out' },
          3.85
        )
        .to(
          rightImage,
          { x: 0, autoAlpha: 1, duration: 1.15, ease: 'power3.out' },
          3.85
        )
        .to(
          finalCenter,
          { y: 0, autoAlpha: 1, duration: 0.85, ease: 'power2.out' },
          4.05
        )
        .set(finalScene, { pointerEvents: 'auto' }, 4.72);

      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    }, section);
  }

  function destroyGearGallery() {
    if (gearContext) {
      gearContext.revert();
      gearContext = null;
    }

    const section = document.querySelector('.gear-screen');
    if (section) section.classList.remove('gear-fallback');
  }

  function initGearGallery(section) {
    destroyGearGallery();
    if (!section) return;
    if (!canAnimate() || !window.gsap) {
      section.classList.add('gear-fallback');
      return;
    }

    const { gsap } = window;
    gearContext = gsap.context(() => {
      const leftPhotos = section.querySelectorAll('.gear-side-photo-left');
      const rightPhotos = section.querySelectorAll('.gear-side-photo-right');

      gsap.fromTo(
        leftPhotos,
        { x: '-135%' },
        {
          x: 0,
          duration: 0.88,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform'
        }
      );

      gsap.fromTo(
        rightPhotos,
        { x: '135%' },
        {
          x: 0,
          duration: 0.88,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform'
        }
      );
    }, section);
  }

  function exitGearGallery(section) {
    if (!section || !canAnimate() || !window.gsap) return Promise.resolve();

    const { gsap } = window;
    const leftPhotos = section.querySelectorAll('.gear-side-photo-left');
    const rightPhotos = section.querySelectorAll('.gear-side-photo-right');
    const allPhotos = [...leftPhotos, ...rightPhotos];
    gsap.killTweensOf(allPhotos);

    return new Promise((resolve) => {
      gsap.timeline({ onComplete: resolve })
        .to(
          leftPhotos,
          { x: '-145%', duration: 0.5, stagger: 0.045, ease: 'power3.in' },
          0
        )
        .to(
          rightPhotos,
          { x: '145%', duration: 0.5, stagger: 0.045, ease: 'power3.in' },
          0
        );
    });
  }

  function destroyApparatusStory() {
    if (apparatusContext) {
      apparatusContext.revert();
      apparatusContext = null;
    }
  }

  function initApparatusStory(section) {
    destroyApparatusStory();
    if (!section || !canAnimate() || !window.gsap || !window.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    apparatusContext = gsap.context(() => {
      section.querySelectorAll('.aparato-process-step').forEach((step) => {
        const parts = step.querySelectorAll('.aparato-process-image, .aparato-process-copy');
        gsap.fromTo(
          parts,
          { y: 76, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.86,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 82%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    }, section);
  }

  window.WEBO_ANIMATIONS = Object.freeze({
    screenIn,
    initBioStory,
    destroyBioStory,
    initGearGallery,
    exitGearGallery,
    destroyGearGallery,
    initApparatusStory,
    destroyApparatusStory,
    prefersReducedMotion: () => reducedMotionQuery.matches
  });
})();
