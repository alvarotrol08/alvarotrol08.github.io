/*
 * Contenido editable de WEBO.
 * Mantén aquí los textos, aparatos, fotografías, eventos y enlaces.
 * La lógica de navegación y renderizado vive en app.js.
 */

window.WEBO_CONTENT = {
  bio: `Soy Webo, productor musical e ingeniero de grabación. Después de indagar por mi cuenta en el gran mundo de la producción por unos años, decidí profesionalizarme estudiando en Abbey Road Amsterdam. Allí crecí como ingeniero y empecé a entender cómo se mueven los cables de esta industria. Me junté con artistas de todo tipo y aprendí a tratar con ellos para sacar su máximo potencial. Mi visión es dedicarle toda la vida a la música, mejorar, entender, estudiar; y conseguir que los artistas transmitan en sus canciones todo lo que ellos sienten. Esta es mi formación:`,

  sectionIntros: {
    gear: 'mis inventos jejej',
    portfolio: 'mis trabajillos jejej',
    contact: "let's work togetherrr !!!!"
  },

  // Contenido de la narrativa animada de Bio.
  // Edita estos textos e imágenes sin modificar animations.js.
  bioStory: {
    // Primera frase: el texto grande que cruza horizontalmente la pantalla.
    line: 'PRODUCTOR MUSICAL, INGENIERO DE SONIDO, PROFUNK',

    // Texto largo: aparece en el centro durante el segundo acto de la Bio.
    biography: `Soy Webo, productor musical e ingeniero de grabación. Después de indagar por mi cuenta en el gran mundo de la producción por unos años, decidí profesionalizarme estudiando en Abbey Road Amsterdam. Allí crecí como ingeniero y empecé a entender cómo se mueven los cables de esta industria. Me junté con artistas de todo tipo y aprendí a tratar con ellos para sacar su máximo potencial. Mi visión es dedicarle toda la vida a la música, mejorar, entender, estudiar; y conseguir que los artistas transmitan en sus canciones todo lo que ellos sienten. Esta es mi formación:`,

    // Formación: cada elemento genera una línea debajo de la biografía.
    education: [
      {
        institution: 'Abbey Road Institute Amsterdam',
        qualification: 'Advanced Diploma in Music Production & Sound Engineering',
        period: '2025–2026',
        url: 'https://abbeyroadinstitute.nl/courses/diploma-music-production-sound-engineering/curriculum/',
        logo: {
          src: 'assets/images/portfolio/abbey-road/logo.png',
          width: 553,
          height: 253,
          alt: 'Abbey Road Institute'
        }
      },
      {
        institution: 'Dolby Atmos',
        qualification: 'Formación Dolby Atmos',
        period: 'En curso'
      },
      {
        institution: 'Apple Music',
        qualification: 'Formación Apple Music',
        period: 'En curso'
      }
    ],


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
      imageThumb: 'assets/images/gear/talkbox-thumb.jpg',
      imageThumbWidth: 480,
      imageThumbHeight: 279,
      imageAlt: 'Componentes de un TalkBox con tubo transparente y driver de audio',
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
      // Cada paso puede incluir texto, una imagen, una galería o un vídeo.
      process: [
        {
          src: 'assets/images/gear/talkbox/process-1.jpg',
          width: 907,
          height: 711,
          alt: 'Stevie Wonder utilizando un TalkBox durante una actuación',
          paragraphs: [
            `Allá por principios de 2026 me obsesioné completamente con un género musical al que, hasta la fecha, nunca había prestado especial atención. Ese género, que hacía que mi cuerpo se moviese como poseído y me transmitía una felicidad casi inacabable, era el Funk.`,
            `Desde el día que lo conocí no paré de indagar en sus entrañas, descubriendo cada vez artistas más talentosos que provocaban en mí sentimientos indescriptibles.`,
            `Rápidamente, y como haría cualquier productor, me puse a intentar producir aquello que tanto llamaba mi atención. Enseguida me topé con un problema.`,
            `Había estado escuchando algo en común en todas esas grabaciones. No era el ritmo, ni los sintetizadores, ni el bajo protagonista, ni las palmadas. Había una voz robótica que siempre aparecía. Rápidamente descubrí que esa voz se llamaba TalkBox, y más rápidamente aún descubrí que esas TalkBox costaban como mínimo 200 pavos. Yo, que soy pobre pero algo inteligente, decidí aprender un mínimo de electrónica competente para diseñar mi propia máquina del Funk.`
          ]
        },
        {
          layout: 'wide',
          src: 'assets/images/gear/talkbox/process-2.jpg',
          width: 1600,
          height: 900,
          alt: 'Componentes electrónicos y herramientas utilizados para construir el TalkBox',
          paragraphs: [
            {
              before: 'Ahí descubrí ',
              link: {
                label: 'ESTA PÁGINA',
                url: 'https://www.gfworks.jp/talkbox/'
              },
              after: ', que es como el paraíso para las personas que quieran construir su propio TalkBox. Aquí no voy a quitaros mucho tiempo explicando detalles, puesto que allí podéis encontrar la respuesta a todas vuestras dudas.'
            },
            `Hay cuatro cosas que se necesitan para construir una:`
          ],
          list: [
            'Un driver de compresión, que es básicamente un altavoz.',
            'Un tubo de un material que no te intoxique instantáneamente.',
            'Un amplificador.',
            'Un filtro RC de paso alto.'
          ]
        },
        {
          layout: 'portrait',
          src: 'assets/images/gear/talkbox/process-3.jpg',
          width: 1200,
          height: 1600,
          alt: 'Driver de compresión, amplificador y filtro conectados durante las pruebas',
          paragraphs: [
            `El TalkBox funciona de la siguiente manera: un sintetizador produce una señal, normalmente una onda de sierra. Esa señal, a nivel de línea, entra a un amplificador que la amplifica para que un altavoz la reproduzca. Ese altavoz es el driver de compresión, y lo que nos interesa es que saca toda su presión sonora por un agujero chiquitito. En ese agujero se conecta el tubo de PVC para que el sonido viaje hasta tu boca. Y es la boca la que modulará la señal para producir un formante u otro. El filtro se suele poner antes del amplificador para cortar las frecuencias más bajas que podrían dañar el driver. Y ya está.`
          ]
        },
        {
          layout: 'gallery',
          images: [
            {
              src: 'assets/images/gear/talkbox/process-4.jpg',
              width: 1600,
              height: 1200,
              alt: 'Amplificador y conexiones instalados dentro de la caja del TalkBox'
            },
            {
              src: 'assets/images/gear/talkbox/process-5.jpg',
              width: 1200,
              height: 1600,
              alt: 'Vista superior de los componentes montados dentro de la caja'
            },
            {
              src: 'assets/images/gear/talkbox/process-6.jpg',
              width: 1200,
              height: 1600,
              alt: 'TalkBox montado en su caja y conectado al tubo'
            }
          ],
          paragraphs: [
            `Después de bastantes pruebas lo metí todo en una caja que, de momento, funciona y hace el apaño de no tener todos los componentes sueltos por ahí. A futuro sí que me gustaría mejorar el amplificador, para ganar inteligibilidad, y la conexión del tubo al driver, pero por ahora puedo mejorar mucho el sonido solo aprendiendo a usarla como tal. Antes que gastar más dinero, prefiero mejorar mi habilidad y ver hasta dónde puedo llegar con estos componentes. En total, todo me salió por unos 80 euros, que no está nada mal teniendo en cuenta que es una TalkBox con la potencia de una tope de gama.`
          ]
        },
        {
          layout: 'video',
          video: {
            src: 'assets/videos/talkbox-demo.mp4',
            label: 'Demostración del sonido del TalkBox construido por WEBO',
            caption: 'Así suena el resultado.'
          }
        }
      ]
    }
  ],

  // Cada proyecto genera una tarjeta y su propia URL #portfolio/nombre-del-proyecto.
  // Añade nuevos bloques a `story` cuando quieras ampliar una subpágina.
  portfolio: [
    {
      name: 'Suite Spot',
      image: 'assets/images/portfolio/suite-spot/studio-stage.jpg',
      imageWidth: 1800,
      imageHeight: 1350,
      imageThumb: 'assets/images/portfolio/suite-spot/studio-stage-thumb.jpg',
      imageThumbWidth: 480,
      imageThumbHeight: 360,
      imageAlt: 'Escenario de Suite Spot preparado para una sesión',
      showcase: {
        channelUrl: 'https://www.youtube.com/@SuiteSpotConcert',
        tagline: 'Sesiones en directo grabadas en Amsterdam. Una gran forma de descubrir talentos.',
        logo: {
          src: 'assets/images/portfolio/suite-spot/logo.png',
          width: 1924,
          height: 1168,
          alt: 'Suite Spot'
        },
        videos: [
          {
            title: 'Suite Spot Concerts: Sneurf',
            role: 'Ingeniero de Grabación',
            url: 'https://www.youtube.com/watch?v=KkZOZ65tmZM',
            thumbnail: 'assets/images/portfolio/suite-spot/video-sneurf.jpg',
            thumbnailWidth: 1280,
            thumbnailHeight: 720
          },
          {
            title: 'Suite Spot Concerts: Dorsy',
            role: 'Ingeniero de Grabación',
            url: 'https://www.youtube.com/watch?v=4qN9ekb9Eyo',
            thumbnail: 'assets/images/portfolio/suite-spot/video-dorsy.jpg',
            thumbnailWidth: 1280,
            thumbnailHeight: 720
          },
          {
            title: 'Suite Spot Concerts: sulaWesi',
            role: 'Ingeniero de Grabación',
            url: 'https://www.youtube.com/watch?v=ow2CCMunL4Y',
            thumbnail: 'assets/images/portfolio/suite-spot/video-sulawesi.jpg',
            thumbnailWidth: 1280,
            thumbnailHeight: 720
          }
        ],
        gallery: [
          {
            src: 'assets/images/portfolio/suite-spot/live-session.jpg',
            width: 1350,
            height: 1800,
            alt: 'Concierto de Suite Spot con la banda reunida en el escenario'
          },
          {
            src: 'assets/images/portfolio/suite-spot/piano-session.jpg',
            width: 1800,
            height: 1350,
            alt: 'Sesión de Suite Spot junto al piano y la batería'
          },
          {
            src: 'assets/images/portfolio/suite-spot/studio-stage.jpg',
            width: 1800,
            height: 1350,
            alt: 'Instrumentos preparados para grabar una sesión de Suite Spot'
          },
          {
            src: 'assets/images/portfolio/suite-spot/prepared-room.jpg',
            width: 1800,
            height: 1350,
            alt: 'Piano preparado dentro del espacio de Suite Spot'
          }
        ]
      }
    },
    {
      name: 'Abbey Road',
      image: 'assets/images/gallery/studio-console-1.jpg',
      imageWidth: 1440,
      imageHeight: 817,
      imageThumb: 'assets/images/gallery/studio-console-1-thumb.jpg',
      imageThumbWidth: 480,
      imageThumbHeight: 272,
      imageAlt: 'Mesa de mezclas en Abbey Road Institute Amsterdam',
      showcase: {
        layout: 'work-list',
        channelUrl: 'https://abbeyroadinstitute.nl',
        linkLabel: 'Abrir la web de Abbey Road Institute Amsterdam',
        tagline: 'El lugar donde me formé en Producción Musical e Ingeniería de Sonido.',
        logo: {
          src: 'assets/images/portfolio/abbey-road/logo.png',
          width: 553,
          height: 253,
          alt: 'Abbey Road Institute'
        },
        works: [
          {
            title: 'Rover Onslow — Buddy',
            role: 'Asistente de grabación · Mix',
            url: 'https://www.youtube.com/watch?v=-bXbV3J6IFk',
            frames: [
              { src: 'assets/images/portfolio/abbey-road/rover-onslow-1.jpg', width: 480, height: 360 },
              { src: 'assets/images/portfolio/abbey-road/rover-onslow-2.jpg', width: 480, height: 360 }
            ]
          },
          {
            title: 'Angelo Benson — 03/09',
            role: 'Asistente de grabación · Mix',
            url: 'https://www.youtube.com/watch?v=Bt-6jrsoXkw',
            frames: [
              { src: 'assets/images/portfolio/abbey-road/angelo-benson-1.jpg', width: 480, height: 360 },
              { src: 'assets/images/portfolio/abbey-road/angelo-benson-2.jpg', width: 480, height: 360 }
            ]
          },
          {
            title: 'Oskar Billy — The Water',
            role: 'Asistente de grabación · Mix',
            url: 'https://www.youtube.com/watch?v=i_8iLfEVJtQ',
            frames: [
              { src: 'assets/images/portfolio/abbey-road/oskar-billy-1.jpg', width: 480, height: 360 },
              { src: 'assets/images/portfolio/abbey-road/oskar-billy-2.jpg', width: 480, height: 360 }
            ]
          },
          {
            title: 'Sé — ARIA Live',
            role: 'Ingeniero de grabación · Camera Operator',
            url: 'https://www.youtube.com/watch?v=iq69LO7Vhq0',
            frames: [
              { src: 'assets/images/portfolio/abbey-road/se-aria-1.jpg', width: 480, height: 360 },
              { src: 'assets/images/portfolio/abbey-road/se-aria-2.jpg', width: 480, height: 360 }
            ]
          },
          {
            title: 'Petra Jordan — Tattoo In My Mind',
            role: 'Asistente de grabación · Camera Operator',
            url: 'https://www.youtube.com/watch?v=3ytlCf-pD4k',
            frames: [
              { src: 'assets/images/portfolio/abbey-road/petra-jordan-tattoo-in-my-mind.jpg', width: 480, height: 360 },
              { src: 'assets/images/portfolio/abbey-road/abbey-road-studio-1.jpg', width: 1600, height: 1067 }
            ]
          },
          {
            title: 'Petra Jordan — The Way We Dance',
            role: 'Asistente de grabación · Camera Operator',
            url: 'https://www.youtube.com/watch?v=nDvyjmDYB7c',
            frames: [
              { src: 'assets/images/portfolio/abbey-road/petra-jordan-the-way-we-dance.jpg', width: 480, height: 360 },
              { src: 'assets/images/portfolio/abbey-road/abbey-road-studio-2.jpg', width: 1600, height: 1067 }
            ]
          },
          {
            title: 'Petra Jordan — Pretty Boy',
            role: 'Asistente de grabación · Camera Operator',
            url: 'https://www.youtube.com/watch?v=quTv90VDucM',
            frames: [
              { src: 'assets/images/portfolio/abbey-road/petra-jordan-pretty-boy.jpg', width: 480, height: 360 },
              { src: 'assets/images/portfolio/abbey-road/petra-jordan-pretty-boy-frame.jpg', width: 480, height: 360 }
            ]
          },
          {
            title: "Petra Jordan — I Don't Wanna Love You No More",
            role: 'Asistente de grabación · Camera Operator',
            url: 'https://www.youtube.com/watch?v=5UeY4jpfGoI',
            frames: [
              { src: 'assets/images/portfolio/abbey-road/petra-jordan-dont-wanna-love-you.jpg', width: 480, height: 360 },
              { src: 'assets/images/portfolio/abbey-road/petra-jordan-dont-wanna-love-you-frame.jpg', width: 480, height: 360 }
            ]
          },
          {
            title: 'Tony Pitony — Jam Session',
            role: 'Asistente de grabación',
            url: 'https://www.youtube.com/channel/UCMSnPwNXOfPbV1hvbE8YYlA',
            frames: [
              { src: 'assets/images/portfolio/abbey-road/tony-pitony-1.jpg', width: 480, height: 360 },
              { src: 'assets/images/portfolio/abbey-road/tony-pitony-2.jpg', width: 480, height: 360 }
            ]
          }
        ]
      }
    },
    {
      name: 'Paradiso',
      image: 'assets/images/gallery/paradiso-studio.jpg',
      imageWidth: 1537,
      imageHeight: 1023,
      imageThumb: 'assets/images/gallery/paradiso-studio-thumb.jpg',
      imageThumbWidth: 480,
      imageThumbHeight: 319,
      imageAlt: 'WEBO sentado ante la mesa de mezclas del estudio Paradiso',
      showcase: {
        layout: 'photo-story',
        channelUrl: 'https://www.paradiso.nl/en',
        linkLabel: 'Abrir la web oficial de Paradiso Amsterdam',
        tagline: 'En Paradiso iba a grabar conciertos directamente desde la sala. Operaba Pro Tools y la Sony MXP mientras el artista tocaba; después preparaba un mix y se lo enviaba por si quería publicar la versión en directo. Allí conocí a músicos muy distintos, aprendí mucho más de sonido en directo y, sobre todo, entendí lo importante que es escuchar, decidir y resolver rápido cuando todo está pasando en ese momento.',
        logo: {
          src: 'assets/images/portfolio/paradiso/logo.svg',
          width: 1200,
          height: 224,
          alt: 'Paradiso Amsterdam',
          className: 'portfolio-logo-paradiso'
        },
        gallery: [
          {
            src: 'assets/images/portfolio/paradiso/paradiso-1.jpg',
            width: 1600,
            height: 1067,
            alt: 'WEBO operando Pro Tools y la mesa Sony MXP durante un concierto en Paradiso'
          },
          {
            src: 'assets/images/portfolio/paradiso/paradiso-2.jpg',
            width: 1600,
            height: 1067,
            alt: 'Seguimiento del escenario de Paradiso desde la sala de control'
          },
          {
            src: 'assets/images/portfolio/paradiso/paradiso-3.jpg',
            width: 1600,
            height: 1067,
            alt: 'WEBO junto al patch de audio de la sala de control de Paradiso'
          },
          {
            src: 'assets/images/portfolio/paradiso/paradiso-4.jpg',
            width: 1600,
            height: 1200,
            alt: 'Sala principal de Paradiso Amsterdam preparada para un concierto'
          },
          {
            src: 'assets/images/portfolio/paradiso/paradiso-5.jpg',
            width: 1600,
            height: 1200,
            alt: 'Mesa Sony MXP y sistema de grabación de Paradiso'
          }
        ]
      }
    },
    {
      name: 'Rockfield',
      image: 'assets/images/portfolio/rockfield/rockfield-studio.jpg',
      imageWidth: 1600,
      imageHeight: 1061,
      imageThumb: 'assets/images/portfolio/rockfield/rockfield-studio-thumb.jpg',
      imageThumbWidth: 480,
      imageThumbHeight: 318,
      imageAlt: 'WEBO trabajando en Rockfield Studios',
      showcase: {
        layout: 'photo-story',
        channelUrl: 'https://rockfieldmusicgroup.com/',
        linkLabel: 'Abrir la web oficial de Rockfield Studios',
        taglineParts: [
          'Tuve la oportunidad de grabar un tema en Rockfield, uno de esos estudios legendarios por los que han pasado bandas como Queen, Oasis o Black Sabbath. Fueron tres días intensos de grabación en los que mi trabajo principal fue operar Pro Tools y asistir en la consola. Estuvimos asesorados en todo momento por ',
          {
            label: 'Matt Butler',
            url: 'https://www.matt-butler.com/artists-clients'
          },
          ', que nos guió durante las sesiones y nos enseñó su forma de trabajar. También pude conocer a ',
          {
            label: 'Kingsley Ward',
            url: 'https://en.wikipedia.org/wiki/Rockfield_Studios'
          },
          ', uno de los dos hermanos fundadores del estudio. La experiencia fue acogedora y difícil de explicar: hay una paz muy especial en grabar rodeado de vacas y monte, en mitad de Gales.'
        ],
        logo: {
          src: 'assets/images/portfolio/rockfield/logo.png',
          width: 600,
          height: 193,
          alt: 'Rockfield Studios'
        },
        // Las próximas fotos se añaden aquí y se muestran una debajo de otra.
        gallery: [
          {
            src: 'assets/images/portfolio/rockfield/rockfield-studio.jpg',
            width: 1600,
            height: 1061,
            alt: 'WEBO durante su experiencia en Rockfield Studios'
          },
          {
            src: 'assets/images/portfolio/rockfield/rockfield-session-2.jpg',
            width: 1600,
            height: 1067,
            alt: 'Equipo de grabación trabajando frente a la consola de Rockfield Studios'
          },
          {
            src: 'assets/images/portfolio/rockfield/rockfield-session-1.jpg',
            width: 1067,
            height: 1600,
            alt: 'WEBO operando Pro Tools durante la sesión en Rockfield Studios'
          },
          {
            src: 'assets/images/portfolio/rockfield/rockfield-session-3.jpg',
            width: 1600,
            height: 1067,
            alt: 'WEBO trabajando en la sala de control de Rockfield Studios'
          },
          {
            src: 'assets/images/portfolio/rockfield/rockfield-session-4.jpg',
            width: 1600,
            height: 1067,
            alt: 'Conversación durante una jornada de grabación en Rockfield Studios'
          }
        ]
      }
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
