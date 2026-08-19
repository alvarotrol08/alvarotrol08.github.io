# WEBO

Web estática de WEBO para GitHub Pages, publicada en [webowebo.com](https://webowebo.com/).

## Estructura

```text
index.html                  Estructura, SEO y marcado accesible
assets/css/styles.css       Diseño responsive y estilos
assets/js/content.js        Textos, Bio animada, aparatos y contenido reservado
assets/js/animations.js     Integración progresiva con GSAP
assets/js/app.js            Renderizado, rutas y comportamiento
assets/images/              Imágenes optimizadas para producción
tools/optimize-images.ps1   Regeneración de imágenes desde los originales
CNAME                       Dominio personalizado de GitHub Pages
robots.txt / sitemap.xml    Descubrimiento para buscadores
```

## Editar contenido

El contenido que cambia con frecuencia está en `assets/js/content.js`:

- `bioStory`: texto e imágenes provisionales de la narrativa animada.
- `gear`: aparatos y enlaces.
- `portfolio`: trabajos publicados.
- `photos`: fotografías reservadas para futuras secciones; ahora no se muestran como galería.
- `events`: eventos reservados; la sección permanece fuera de la web hasta que haya contenido.
- `contact`: endpoint de Formspree y correo alternativo.

Cada aparato recibe una URL con el formato `#aparatos/nombre-del-aparato`. Las secciones públicas usan `#bio`, `#aparatos`, `#portfolio` y `#contacto`; atrás y adelante del navegador funcionan con estos hashes.

## Probar en local

El sitio no necesita compilación. Debe abrirse mediante un servidor HTTP para reproducir el comportamiento de producción:

```powershell
python -m http.server 8000
```

Después abre `http://localhost:8000`. También puede utilizarse cualquier servidor estático del editor.

## Imágenes

Las miniaturas de la galería se descargan inicialmente; la versión grande se solicita al abrir el visor. Los originales no se publican, pero siguen recuperables desde el historial de Git.

Para regenerar las versiones optimizadas en Windows, coloca los originales con sus nombres históricos en la raíz y ejecuta:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/optimize-images.ps1
```

Después verifica visualmente los resultados antes de publicar. Los nombres de entrada y salida se definen al final del script.

## GSAP

GSAP 3.13.0 y ScrollTrigger se cargan de forma diferida desde jsDelivr en `index.html`. Toda animación se incorpora a través de `assets/js/animations.js`, para mantener la lógica de interfaz separada y respetar `prefers-reduced-motion`.

La sección Bio usa una timeline vinculada al scroll mediante `scrub`: al desplazarse hacia arriba, la secuencia retrocede automáticamente. `initBioStory()` crea la escena al entrar en la ruta y `destroyBioStory()` elimina el pin y restaura el DOM al salir.

La web tiene una alternativa basada en Web Animations API si la CDN falla. Para añadir un plugin de GSAP más adelante:

1. Añade su script después de `gsap.min.js` y antes de `animations.js`.
2. Regístralo al inicio de `animations.js`, por ejemplo `gsap.registerPlugin(ScrollTrigger)`.
3. Mantén una alternativa funcional cuando JavaScript externo no esté disponible.

La instalación mediante CDN y el registro explícito de plugins siguen las [recomendaciones oficiales de GSAP](https://gsap.com/docs/v3/Installation/).

## Publicación

GitHub Pages publica la rama `main`. Antes de subir cambios:

1. Comprueba las vistas de escritorio y móvil.
2. Recorre todas las rutas con atrás y adelante.
3. Abre el visor de galería con ratón y teclado.
4. Revisa `git status` para evitar originales pesados o archivos locales.
5. Haz commit y push a `main`.
