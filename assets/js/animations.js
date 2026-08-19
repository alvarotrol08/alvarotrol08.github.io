/*
 * Punto único de entrada para animaciones.
 * GSAP y ScrollTrigger se cargan antes de este archivo. La interfaz mantiene
 * un modo estático si la CDN falla o el usuario prefiere reducir movimiento.
 */

(function setupAnimations() {
  'use strict';

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let bioContext = null;

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
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'opacity,transform,visibility'
        }
      );
      return;
    }

    content.animate(
      [
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)' }
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
      const topImage = section.querySelector('.bio-support-image-top');
      const bottomImage = section.querySelector('.bio-support-image-bottom');
      const bannerTrack = section.querySelector('.scroll-banner-track');

      gsap.set([hero, copy, topImage, bottomImage], { force3D: true });
      gsap.set(copy, { x: 0, autoAlpha: 1 });
      gsap.set(topImage, { x: '12vw', autoAlpha: 0, rotate: 5 });
      gsap.set(bottomImage, { x: '16vw', autoAlpha: 0, rotate: -5 });

      gsap.fromTo(
        bannerTrack,
        { xPercent: -50 },
        { xPercent: 0, duration: 11, repeat: -1, ease: 'none' }
      );

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'bio-story',
          trigger: story,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 4.5, 2800)}`,
          scrub: 0.8,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      timeline
        .to(hero, { x: () => -window.innerWidth * 0.38, scale: 0.84, duration: 1.45 }, 0)
        .to(
          copy,
          { x: () => -(window.innerWidth + copy.offsetWidth + 100), duration: 5.2 },
          0.3
        )
        .to(
          topImage,
          {
            x: () => -window.innerWidth * 1.5,
            autoAlpha: 1,
            rotate: -3,
            duration: 3.3
          },
          1.1
        )
        .to(
          bottomImage,
          {
            x: () => -window.innerWidth * 1.55,
            autoAlpha: 1,
            rotate: 3,
            duration: 3.15
          },
          2
        )
        .to(
          hero,
          { x: () => -window.innerWidth * 0.72, autoAlpha: 0.2, duration: 2.7 },
          1.45
        );

      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    }, section);
  }

  window.WEBO_ANIMATIONS = Object.freeze({
    screenIn,
    initBioStory,
    destroyBioStory,
    prefersReducedMotion: () => reducedMotionQuery.matches
  });
})();
