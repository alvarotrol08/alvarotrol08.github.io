/*
 * Contenido editable de WEBO.
 * Mantén aquí los textos, aparatos, fotografías, eventos y enlaces.
 * La lógica de navegación y renderizado vive en app.js.
 */

window.WEBO_CONTENT = {
  bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,

  // Contenido provisional de la narrativa animada de Bio.
  // Sustituye estos textos e imágenes sin modificar animations.js.
  bioStory: {
    // Primera frase: el texto grande que cruza horizontalmente la pantalla.
    line: 'LOREM IPSUM DOLOR SIT AMET · CONSECTETUR ADIPISCING ELIT · SED DO EIUSMOD TEMPOR INCIDIDUNT ·',

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
      image: 'assets/images/gear/talkbox.jpg',
      imageWidth: 1440,
      imageHeight: 837,
      imageAlt: 'Componentes de un TalkBox con tubo transparente y driver de audio',
      moreNote: 'más próximamente',

      // Estas seis imágenes forman los laterales de la portada de Aparatos.
      // Sustitúyelas por componentes electrónicos y fotografías del taller cuando las tengas.
      sideGallery: [
        {
          side: 'left',
          src: 'assets/images/gear/talkbox.jpg',
          width: 1440,
          height: 837,
          alt: 'Primer plano provisional de los componentes del TalkBox'
        },
        {
          side: 'left',
          src: 'assets/images/gallery/studio-console-3.jpg',
          width: 1800,
          height: 1723,
          alt: 'Imagen provisional de trabajo técnico en estudio'
        },
        {
          side: 'left',
          src: 'assets/images/gallery/studio-console-5.jpg',
          width: 1800,
          height: 1350,
          alt: 'Imagen provisional de una sala de trabajo de audio'
        },
        {
          side: 'right',
          src: 'assets/images/gallery/studio-console-4.jpg',
          width: 1800,
          height: 1200,
          alt: 'Imagen provisional de ajustes sobre una mesa de mezclas'
        },
        {
          side: 'right',
          src: 'assets/images/gallery/studio-console-2.jpg',
          width: 1536,
          height: 1329,
          alt: 'Imagen provisional de una sesión de trabajo técnico'
        },
        {
          side: 'right',
          src: 'assets/images/gallery/studio-console-1.jpg',
          width: 1440,
          height: 817,
          alt: 'Imagen provisional de una mesa de mezclas'
        }
      ],

      // Añade nuevos objetos a este array para ampliar el relato del proceso.
      // Cada paso admite una imagen y un texto de la longitud que necesites.
      process: [
        {
          src: 'assets/images/gear/talkbox.jpg',
          width: 1440,
          height: 837,
          alt: 'Driver, tubo y primeras piezas utilizadas para construir el TalkBox',
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.`
        },
        {
          src: 'assets/images/gallery/studio-console-4.jpg',
          width: 1800,
          height: 1200,
          alt: 'Imagen provisional de una fase de pruebas de audio',
          text: `Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor.`
        }
      ]
    }
  ],

  // Cada proyecto genera una tarjeta y su propia URL #portfolio/nombre-del-proyecto.
  // Añade nuevos bloques a `story` cuando quieras ampliar una subpágina.
  portfolio: [
    {
      name: 'Paradiso',
      image: 'assets/images/gallery/paradiso-studio.jpg',
      imageWidth: 1537,
      imageHeight: 1023,
      imageAlt: 'WEBO sentado ante la mesa de mezclas del estudio Paradiso',
      story: [
        {
          src: 'assets/images/gallery/paradiso-studio.jpg',
          width: 1537,
          height: 1023,
          alt: 'WEBO trabajando en el estudio Paradiso',
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Cras justo odio, dapibus ac facilisis in, egestas eget quam.`
        }
      ]
    },
    {
      name: 'Abbey Road',
      image: 'assets/images/gallery/studio-console-1.jpg',
      imageWidth: 1440,
      imageHeight: 817,
      imageAlt: 'Técnico de audio frente a una gran mesa de mezclas',
      story: [
        {
          src: 'assets/images/gallery/studio-console-1.jpg',
          width: 1440,
          height: 817,
          alt: 'Imagen provisional para el proyecto Abbey Road',
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.`
        }
      ]
    },
    {
      name: 'Suite Spot',
      image: 'assets/images/gallery/studio-console-2.jpg',
      imageWidth: 1536,
      imageHeight: 1329,
      imageAlt: 'Dos personas trabajando sobre una mesa de mezclas',
      story: [
        {
          src: 'assets/images/gallery/studio-console-2.jpg',
          width: 1536,
          height: 1329,
          alt: 'Imagen provisional para el proyecto Suite Spot',
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper.`
        }
      ]
    },
    {
      name: 'Producciones',
      image: 'assets/images/gallery/home-piano.jpg',
      imageWidth: 1800,
      imageHeight: 1200,
      imageAlt: 'WEBO trabajando con un teclado en un estudio doméstico',
      story: [
        {
          src: 'assets/images/gallery/home-piano.jpg',
          width: 1800,
          height: 1200,
          alt: 'WEBO desarrollando una producción propia',
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla.`
        }
      ]
    }
  ],

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
