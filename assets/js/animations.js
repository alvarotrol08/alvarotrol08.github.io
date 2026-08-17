/*
 * Punto único de entrada para animaciones.
 * GSAP se carga antes de este archivo; si la CDN no responde, la web sigue
 * funcionando mediante la Web Animations API. Todas las funciones respetan
 * prefers-reduced-motion.
 */

(function setupAnimations() {
  'use strict';

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

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
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'opacity,transform,visibility' }
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

  function galleryIn(items) {
    if (!canAnimate() || !items.length) return;

    if (window.gsap) {
      window.gsap.fromTo(
        items,
        { autoAlpha: 0, scale: 0.88 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.055,
          ease: 'back.out(1.4)',
          clearProps: 'opacity,scale,visibility'
        }
      );
    }
  }

  function dialogIn(dialog) {
    if (!canAnimate() || !window.gsap) return;
    const figure = dialog.querySelector('figure');
    window.gsap.fromTo(
      figure,
      { autoAlpha: 0, scale: 0.94 },
      { autoAlpha: 1, scale: 1, duration: 0.32, ease: 'power2.out', clearProps: 'opacity,transform,visibility' }
    );
  }

  window.WEBO_ANIMATIONS = Object.freeze({
    screenIn,
    galleryIn,
    dialogIn,
    prefersReducedMotion: () => reducedMotionQuery.matches
  });
})();
