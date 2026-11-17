# WEBO

Portfolio estático de WEBO, publicado con GitHub Pages en [webowebo.com](https://webowebo.com/).

## Estructura

```text
index.html                  Estructura, metadatos, CSP y marcado accesible
404.html                    Página de error coherente con el sitio
assets/css/styles.css       Diseño responsive y estilos
assets/js/content.js        Textos, imágenes, aparatos y portfolio
assets/js/animations.js     Carga progresiva de GSAP y animaciones
assets/js/app.js            Renderizado, rutas, formulario y navegación
assets/fonts/               Monoton y Oswald alojadas localmente
assets/vendor/gsap/         GSAP 3.13.0 y ScrollTrigger locales
assets/images/              Recursos optimizados para producción
tools/serve.mjs             Servidor local sin caché
tools/check-site.mjs        Comprobaciones estáticas
tools/browser-audit.mjs     Playwright y axe-core
_config.yml                 Exclusiones de publicación de GitHub Pages
AUDIT.md                    Auditoría, métricas y pendientes
```

## Editar contenido

El contenido editable está en `assets/js/content.js`:

- `sectionIntros`: introducciones de Aparatos, Portfolio y Contacto.
- `bioStory`: frase inicial, biografía, imágenes y redes sociales.
- `gear`: aparatos y pasos de cada proceso.
- `portfolio`: tarjetas, páginas narrativas y showcases visuales.
- `contact`: endpoint público de Formspree y correo alternativo.

Las secciones usan hashes: `#bio`, `#aparatos`, `#portfolio` y `#contacto`. Los detalles usan `#aparatos/nombre` y `#portfolio/nombre`.

Cuando cambies el JSON-LD de `index.html`, ejecuta `npm run check`. La CSP utiliza un hash exacto y la prueba indicará el nuevo valor necesario.

## Preparación local

Node.js es la única herramienta necesaria:

```powershell
npm install
npm run serve
```

Abre `http://127.0.0.1:4173`. El servidor desactiva la caché para que cada actualización muestre los últimos cambios.

## Verificación

```powershell
npm run check
npm run audit:browser
npm audit
```

`audit:browser` utiliza Microsoft Edge instalado en Windows. Para elegir otro Chromium o cambiar la URL:

```powershell
$env:WEBO_BROWSER_PATH = 'C:\ruta\al\navegador.exe'
$env:WEBO_BASE_URL = 'http://127.0.0.1:4173'
npm run audit:browser
```

Las métricas y el alcance completo están en [AUDIT.md](AUDIT.md).

## Imágenes

Los fondos disponen de AVIF, WebP y JPEG fallback. Las tarjetas utilizan miniaturas; los detalles conservan las imágenes grandes.

Los originales de Suite Spot y `Foto_Web_phone.png` permanecen en Git, pero `_config.yml` impide que GitHub Pages los publique. No los elimines: sirven como fuentes para futuras optimizaciones.

## GSAP

GSAP y ScrollTrigger están fijados en la versión 3.13.0 y guardados en `assets/vendor/gsap/`. Solo se cargan cuando una ruta necesita animación. Hover, foco o pulsación sobre Bio inicia la precarga.

Si la carga falla o el usuario prefiere movimiento reducido, Bio muestra una alternativa estática funcional. Licencias, fuentes y hashes están documentados en `THIRD_PARTY_NOTICES.md`.

## Publicación

GitHub Pages publica `main` y usa `CNAME` para `webowebo.com`. Antes de publicar:

1. Ejecuta todas las comprobaciones.
2. Recorre visualmente escritorio y móvil.
3. Revisa `git status`.
4. Actualiza los sufijos `?v=` cuando cambien CSS o JavaScript.
5. Haz commit y push únicamente cuando la revisión esté aprobada.
