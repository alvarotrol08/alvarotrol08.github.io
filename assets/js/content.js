/*
 * Contenido editable de WEBO.
 * Mantén aquí los textos, aparatos, fotografías, eventos y enlaces.
 * La lógica de navegación y renderizado vive en app.js.
 */

window.WEBO_CONTENT = {
  bio: `Soy WEBO, productor musical e ingeniero de grabación. Trabajo con artistas para convertir una idea en una canción que conserve su identidad, desde las primeras decisiones de producción hasta la grabación final.`,

  sectionIntros: {
    gear: 'Además de producir y grabar, desarrollo herramientas musicales que responden a necesidades concretas dentro del estudio.',
    portfolio: 'Una selección de espacios, sesiones y proyectos que han formado mi manera de trabajar con el sonido.',
    contact: 'Cuéntame qué estás preparando y en qué punto se encuentra. Respondo rápido.'
  },

  // Contenido de la narrativa animada de Bio.
  // Edita estos textos e imágenes sin modificar animations.js.
  bioStory: {
    // Primera frase: el texto grande que cruza horizontalmente la pantalla.
    line: 'PRODUCTOR MUSICAL, INGENIERO DE SONIDO, PROFUNK',

    // Texto largo: aparece en el centro durante el segundo acto de la Bio.
    biography: `Soy WEBO, productor musical e ingeniero de grabación. Mi relación con la música nace de la curiosidad: paso horas detrás de los altavoces intentando entender por qué una canción consigue movernos y cómo se puede llevar esa emoción a una grabación.

Estudié Ingeniería de Sonido y Producción Musical en Abbey Road Institute Amsterdam. Allí profundicé en la ciencia que hay detrás de una grabación, trabajé con distintos artistas y desarrollé un criterio más sólido como músico, técnico y productor. La convivencia diaria con estudios y equipos profesionales también me enseñó que conocer las herramientas solo tiene sentido cuando ayuda a tomar mejores decisiones.

Mi paso por Paradiso, una de las salas de conciertos más importantes de Ámsterdam, me permitió seguir creciendo como ingeniero y entender más de cerca cómo funciona la industria musical. El contacto con los artistas que pasaban por la sala amplió mi manera de escuchar y de pensar el trabajo que ocurre antes, durante y después de cada actuación.

Mi visión es sencilla: hacer música que inspire y transmita emociones. Quiero reducir el ego alrededor del proceso para que el arte sea lo más honesto posible. Trabajo para ayudar a artistas con un mundo propio a terminar sus canciones sin perder su esencia, reforzando aquello que los hace reconocibles y ofreciendo una guía cercana sobre la parte creativa y técnica de la industria.`,


    hero: {
      src: 'assets/images/gallery/paradiso-studio.jpg',
      width: 1537,
      height: 1023,
      alt: 'WEBO sentado frente a la mesa de mezclas de Paradiso'
    },
    parallaxTop: {
      src: 'assets/images/gallery/studio-console-4.jpg',
      width: 1800,
      height: 1200,
      alt: 'WEBO ajustando una mesa de mezclas durante una sesión'
    },
    parallaxBottom: {
      src: 'assets/images/gallery/studio-console-5.jpg',
      width: 1800,
      height: 1350,
      alt: 'WEBO trabajando frente a una mesa de mezclas en una sala de control'
    },
    left: {
      src: 'assets/images/gallery/studio-console-2.jpg',
      width: 1536,
      height: 1329,
      alt: 'Dos personas trabajando sobre una mesa de mezclas'
    },
    right: {
      src: 'assets/images/gallery/home-piano.jpg',
      width: 1800,
      height: 1200,
      alt: 'WEBO tocando un teclado en su espacio de trabajo'
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

      // Material reservado para una posible composición futura de Aparatos.
      // Estas imágenes se conservan, pero actualmente no se muestran en la web.
      sideGallery: [
        {
          side: 'left',
          src: 'assets/images/gear/talkbox.jpg',
          width: 1440,
          height: 837,
          alt: 'Primer plano de los componentes del TalkBox'
        },
        {
          side: 'left',
          src: 'assets/images/gallery/studio-console-3.jpg',
          width: 1800,
          height: 1723,
          alt: 'Trabajo técnico durante una sesión de grabación'
        },
        {
          side: 'left',
          src: 'assets/images/gallery/studio-console-5.jpg',
          width: 1800,
          height: 1350,
          alt: 'Sala de control preparada para trabajar con audio'
        },
        {
          side: 'right',
          src: 'assets/images/gallery/studio-console-4.jpg',
          width: 1800,
          height: 1200,
          alt: 'Ajustes sobre una mesa de mezclas'
        },
        {
          side: 'right',
          src: 'assets/images/gallery/studio-console-2.jpg',
          width: 1536,
          height: 1329,
          alt: 'Sesión de trabajo técnico sobre una mesa de mezclas'
        },
        {
          side: 'right',
          src: 'assets/images/gallery/studio-console-1.jpg',
          width: 1440,
          height: 817,
          alt: 'Mesa de mezclas en un estudio de grabación'
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
          text: `El TalkBox nace de mi interés por unir electrónica, diseño y producción musical en una herramienta física. Su funcionamiento parte de un driver que envía el sonido por un tubo hasta la boca; al articular, la forma de la boca modifica esa señal antes de que un micrófono vuelva a capturarla. Empecé este proyecto para comprender el recorrido completo del sonido y construir una unidad adaptada a mi manera de trabajar, con una respuesta clara y una conexión sencilla dentro del estudio.`
        },
        {
          src: 'assets/images/gallery/studio-console-4.jpg',
          width: 1800,
          height: 1200,
          alt: 'Ajustes de sonido sobre una mesa de mezclas durante una sesión',
          text: `El desarrollo del prototipo es iterativo. Estoy probando cómo influyen el driver, el diámetro y la longitud del tubo, el recinto y el nivel de entrada en la presión, el ruido y la comodidad de uso. Cada versión me permite detectar un problema concreto y simplificar la siguiente. El objetivo es llegar a un aparato robusto, reparable y fácil de integrar en una sesión real. Esta página recoge el proceso a medida que el TalkBox evoluciona.`
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
          text: `Paradiso fue una parte importante de mi etapa en Ámsterdam. Trabajar dentro de una sala con una identidad tan marcada me permitió conocer de cerca el ritmo que rodea a cada concierto y entender que el sonido no termina en una buena configuración técnica. También depende de escuchar al artista, reaccionar con criterio y mantener una comunicación clara. El contacto con músicos y equipos distintos amplió mi visión de la industria y sigue influyendo en la forma en que afronto una grabación o una producción.`
        }
      ]
    },
    {
      name: 'Abbey Road',
      image: 'assets/images/gallery/studio-console-1.jpg',
      imageWidth: 1440,
      imageHeight: 817,
      imageAlt: 'Mesa de mezclas en un estudio de grabación',
      story: [
        {
          src: 'assets/images/gallery/studio-console-1.jpg',
          width: 1440,
          height: 817,
          alt: 'Mesa de mezclas asociada a la etapa de formación en Abbey Road Institute Amsterdam',
          text: `Mi formación en Abbey Road Institute Amsterdam convirtió años de curiosidad musical en un método de trabajo. Allí estudié Ingeniería de Sonido y Producción Musical y profundicé tanto en la parte creativa como en la técnica de una grabación. Aprendí a escuchar antes de actuar, a justificar cada decisión y a utilizar el equipo como una herramienta al servicio de la canción. Fue también un entorno de colaboración constante con otros músicos, productores e ingenieros, fundamental para construir mi criterio profesional.`
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
          alt: 'Sesión de trabajo compartida sobre una mesa de mezclas',
          text: `Este apartado reúne mi trabajo en Suite Spot y las sesiones desarrolladas allí. Representa la parte más colaborativa del estudio: escuchar una referencia, entender qué busca el artista y convertir una conversación en decisiones concretas de sonido. Mi manera de trabajar parte de ordenar las ideas sin imponer una dirección ajena al proyecto. La técnica, desde la elección de una toma hasta el equilibrio de una mezcla, debe ayudar a que la intención original se entienda con más claridad.`
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
          text: `Aquí reúno las producciones y proyectos que nacen de mis propias ideas o de una colaboración directa con otros artistas. Es el espacio donde puedo enseñar el recorrido completo de una canción: la intuición inicial, las pruebas que no funcionan, las decisiones de arreglo y la versión que finalmente sale al mundo. Me interesa mostrar el proceso además del resultado, porque una producción también se define por la manera en que se escucha, se descarta y se vuelve a construir.`
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
