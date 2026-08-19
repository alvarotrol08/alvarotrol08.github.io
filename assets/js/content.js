/*
 * Contenido editable de WEBO.
 * Mantén aquí los textos, aparatos, fotografías, eventos y enlaces.
 * La lógica de navegación y renderizado vive en app.js.
 */

window.WEBO_CONTENT = {
  bio: `grabo artistas en estudios. diseño aparatos musicales eléctricos.

estudié ingeniería de audio y producción en abbey road amsterdam. volví a madrid en 2026 para trabajar en la industria.`,

  // Contenido provisional de la narrativa animada de Bio.
  // Sustituye estos textos e imágenes sin modificar animations.js.
  bioStory: {
    // Primera frase: el texto grande que cruza horizontalmente la pantalla.
    line: 'ESTE ES UN TEXTO DUMMY PARA CONSTRUIR LA HISTORIA DE WEBO · AQUÍ IRÁ LA BIOGRAFÍA DEFINITIVA ·',

    // Texto largo: aparece en el centro durante el segundo acto de la Bio.
    biography: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Praesent vitae justo sed arcu fermentum viverra.
Integer laoreet neque at sapien posuere, a tempor erat luctus.
Curabitur euismod tellus vel sem consequat, vitae commodo urna aliquet.
Sed finibus mauris in augue feugiat, sit amet ultrices odio interdum.
Aliquam erat volutpat, cras dictum libero vitae sapien tincidunt.
Donec consequat justo nec nibh cursus, id vulputate velit vulputate.
Morbi feugiat lectus sit amet mi malesuada, vel malesuada justo luctus.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
Fusce dignissim nulla a lacus interdum, vitae pretium mauris fermentum.
Maecenas quis erat vitae urna malesuada interdum sed at justo.
Nullam sed magna ut libero posuere viverra et vitae lectus.
Phasellus non velit ac augue interdum faucibus quis sed turpis.
Suspendisse potenti, nam laoreet dolor at neque bibendum facilisis.
Etiam malesuada metus id ipsum gravida, non efficitur sapien volutpat.
Vivamus egestas purus eu tortor commodo, vel faucibus nibh faucibus.
Quisque fringilla tellus vitae augue posuere, eget tincidunt neque malesuada.
Aenean sodales lacus sit amet mauris tincidunt, vitae pharetra magna feugiat.
Pellentesque habitant morbi tristique senectus et netus et malesuada fames.`,

    hero: {
      src: 'assets/images/gallery/paradiso-studio.jpg',
      width: 1537,
      height: 1023,
      alt: 'Imagen provisional de WEBO en un estudio de grabación'
    },
    parallaxTop: {
      src: 'assets/images/gallery/studio-console-4.jpg',
      width: 1800,
      height: 1200,
      alt: 'Imagen provisional que acompaña la primera frase por arriba'
    },
    parallaxBottom: {
      src: 'assets/images/gallery/studio-console-5.jpg',
      width: 1800,
      height: 1350,
      alt: 'Imagen provisional que acompaña la primera frase por abajo'
    },
    left: {
      src: 'assets/images/gallery/studio-console-2.jpg',
      width: 1536,
      height: 1329,
      alt: 'Imagen provisional situada a la izquierda de la biografía'
    },
    right: {
      src: 'assets/images/gallery/home-piano.jpg',
      width: 1800,
      height: 1200,
      alt: 'Imagen provisional situada a la derecha de la biografía'
    },

    // Gmail mantiene una ruta interna y abre el apartado Contacto.
    socials: {
      instagram: 'https://www.instagram.com/webo______/',
      linkedin: 'https://www.linkedin.com/in/alvaro-ramiro-a7191a42a/',
      gmail: '#contacto',
      soundcloud: 'https://soundcloud.com/webowebo',
      youtube: 'https://www.youtube.com/@webowebowebo'
    }
  },

  gear: [
    {
      name: 'TalkBox',
      price: '—',
      image: 'assets/images/gear/talkbox.jpg',
      imageWidth: 1440,
      imageHeight: 837,
      imageAlt: 'Componentes de un TalkBox con tubo transparente y driver de audio',
      description: 'el aparato del funk',
      link: null,
      soon: true
    }
  ],

  portfolio: [],

  photos: [
    {
      src: 'assets/images/gallery/studio-console-1.jpg',
      thumb: 'assets/images/gallery/studio-console-1-thumb.jpg',
      width: 1440,
      height: 817,
      thumbWidth: 480,
      thumbHeight: 272,
      alt: 'Técnico de audio frente a una gran mesa de mezclas en un estudio',
      caption: 'Trabajando frente a la mesa de mezclas'
    },
    {
      src: 'assets/images/gallery/studio-console-2.jpg',
      thumb: 'assets/images/gallery/studio-console-2-thumb.jpg',
      width: 1536,
      height: 1329,
      thumbWidth: 480,
      thumbHeight: 415,
      alt: 'Dos personas trabajando sobre una mesa de mezclas en un estudio iluminado en violeta',
      caption: 'Sesión de estudio'
    },
    {
      src: 'assets/images/gallery/studio-console-3.jpg',
      thumb: 'assets/images/gallery/studio-console-3-thumb.jpg',
      width: 1800,
      height: 1723,
      thumbWidth: 480,
      thumbHeight: 460,
      alt: 'Sesión de grabación con micrófono, portátil y mesa de mezclas',
      caption: 'Grabación y mezcla'
    },
    {
      src: 'assets/images/gallery/studio-console-4.jpg',
      thumb: 'assets/images/gallery/studio-console-4-thumb.jpg',
      width: 1800,
      height: 1200,
      thumbWidth: 480,
      thumbHeight: 320,
      alt: 'Técnico ajustando controles de una mesa de mezclas frente a una sesión de audio',
      caption: 'Ajustes durante una sesión'
    },
    {
      src: 'assets/images/gallery/studio-console-5.jpg',
      thumb: 'assets/images/gallery/studio-console-5-thumb.jpg',
      width: 1800,
      height: 1350,
      thumbWidth: 480,
      thumbHeight: 360,
      alt: 'Técnico visto de espaldas ante una mesa de mezclas y varias pantallas',
      caption: 'En la sala de control'
    },
    {
      src: 'assets/images/gallery/paradiso-studio.jpg',
      thumb: 'assets/images/gallery/paradiso-studio-thumb.jpg',
      width: 1537,
      height: 1023,
      thumbWidth: 480,
      thumbHeight: 319,
      alt: 'WEBO sentado ante la mesa de mezclas del estudio Paradiso',
      caption: 'Estudio Paradiso'
    },
    {
      src: 'assets/images/gallery/home-piano.jpg',
      thumb: 'assets/images/gallery/home-piano-thumb.jpg',
      width: 1800,
      height: 1200,
      thumbWidth: 480,
      thumbHeight: 320,
      alt: 'WEBO tocando un teclado en un estudio doméstico',
      caption: 'Piano en casa'
    }
  ],

  events: [
    {
      date: '—',
      title: 'Fiebre',
      place: 'usa tu red de contactos',
      description: 'diez artistas, BYOD, solo por invitación',
      link: null
    }
  ],

  contact: {
    endpoint: 'https://formspree.io/f/mppajzry',
    fallbackEmail: 'webo.managment@gmail.com'
  }
};
