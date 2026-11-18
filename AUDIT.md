# Auditoría técnica — 16 de noviembre de 2026

## Alcance y recuperación

La auditoría parte del commit `b408dee` (`actualizacion portfolio`), que conserva el estado exacto anterior. No se ha realizado commit, push ni despliegue.

La web es una aplicación estática HTML/CSS/JavaScript alojada en GitHub Pages con el dominio canónico `https://webowebo.com/`.

## Diagnóstico inicial

- Lighthouse ya puntuaba 100 en sus cuatro categorías, pero descargaba 1.073.227 bytes en la primera visita móvil.
- La portada solicitaba una fotografía de Bio de 320 KB aunque Bio estuviera cerrada.
- Google Fonts bloqueaba el renderizado y GSAP/ScrollTrigger se descargaban siempre desde terceros.
- El fondo móvil JPEG pesaba 538 KB y no tenía variantes modernas.
- Las tarjetas de Portfolio y Aparatos utilizaban imágenes de resolución completa.
- No existía una CSP efectiva ni una política de referrer explícita.
- El JSON-LD describía parcialmente a WEBO.
- Los originales y herramientas internas podían acabar publicados por GitHub Pages.
- No había pruebas automatizadas de rutas, overflow, consola, historial o WCAG.
- No existía una página 404 propia.
- `www.webowebo.com` resolvía por DNS, pero falló la validación TLS por nombre de certificado.

## Cambios implementados

### Rendimiento

- Fondos AVIF y WebP con JPEG de respaldo, sin alterar el encuadre.
- Monoton y Oswald locales en WOFF2, con preload y `font-display: swap`.
- GSAP 3.13.0 y ScrollTrigger locales y cargados bajo demanda.
- Precarga del motor al interactuar con el enlace de Bio.
- GSAP no se descarga en portada, Suite Spot, Abbey Road ni con movimiento reducido.
- Imagen principal de Bio diferida mientras la sección está cerrada.
- Miniaturas para las tarjetas de TalkBox, Suite Spot, Abbey Road, Paradiso y Rockfield.

### Seguridad

- CSP mediante meta compatible con GitHub Pages: recursos propios por defecto y permisos limitados para Formspree.
- Hash SHA-256 exacto para el JSON-LD inline.
- Referrer Policy `strict-origin-when-cross-origin`.
- Scripts de animación eliminados de la CDN; versiones, licencias y hashes documentados.
- Enlaces externos con `noopener noreferrer`.
- Renderizado con `textContent`, sin `innerHTML`, `eval` ni plantillas HTML sin sanear.
- Límites de longitud, honeypot, timeout y `AbortController` en el formulario.
- `npm audit`: 0 vulnerabilidades.

### SEO

- Description, Open Graph y Twitter Cards ampliados sin modificar contenido visible.
- JSON-LD con `WebSite` y `Person`, profesión, ubicación, formación y perfiles reales.
- Canonical, robots y sitemap verificados; `lastmod` actualizado.
- Página 404 accesible con `noindex, follow`.

### Accesibilidad y compatibilidad

- Nombres accesibles corregidos en Abbey Road.
- Preferencia de movimiento gestionada en tiempo real.
- Alternativa estática para Bio sin descargar GSAP.
- Eliminado el selector `:has()` innecesario.
- Objetivos táctiles del menú móvil de 44 px.
- Estado `aria-busy` durante el envío del formulario.

### Mantenibilidad

- `_config.yml` evita publicar originales, herramientas, dependencias y documentación interna.
- Servidor local mediante `npm run serve`.
- `npm run check`: sintaxis y 63 verificaciones estáticas.
- `npm run audit:browser`: rutas, axe-core, consola, overflow, historial, menú, imágenes lazy, 404 y movimiento reducido.
- Licencias y hashes en `THIRD_PARTY_NOTICES.md`.

## Rendimiento medido

Lighthouse 13.6.0, perfil móvil predeterminado, Edge 157 headless y servidor local. Son métricas de laboratorio, no datos de usuarios reales.

| Métrica | Antes | Después | Cambio |
|---|---:|---:|---:|
| Performance | 100 | 100 | = |
| Accessibility | 100 | 100 | = |
| Best Practices | 100 | 100 | = |
| SEO | 100 | 100 | = |
| Transferencia inicial | 1.073.227 B | 452.627 B | −57,8 % |
| FCP | 1.437 ms | 1.054 ms | −383 ms |
| LCP | 1.437 ms | 1.054 ms | −383 ms |
| Speed Index | 1.437 ms | 1.061 ms | −376 ms |
| TBT | 0 ms | 0 ms | = |
| CLS | 0 | 0 | = |

INP necesita datos de campo y no puede afirmarse con esta prueba local.

## Infraestructura verificada

- `webowebo.com` resuelve a las cuatro IPv4 de GitHub Pages.
- HTTPS responde 200 y HTTP redirige 301 a HTTPS.
- GitHub Pages entrega HSTS y caché de 600 segundos.
- `robots.txt` y `sitemap.xml` responden correctamente.

GitHub Pages no permite configurar cabeceras HTTP arbitrarias desde este repositorio. La CSP y Referrer Policy se aplican en HTML; una CSP de respuesta, `X-Content-Type-Options` o `frame-ancestors` requerirían un proxy/CDN configurable.

## Pruebas superadas

- Sintaxis de los tres scripts de la web y de las tres herramientas locales.
- 63 verificaciones estáticas de archivos, rutas, CSP, JSON-LD, canonical, sitemap y CNAME.
- 10 rutas en escritorio, tablet y móvil sin errores críticos de axe, consola u overflow.
- Navegación atrás/adelante, menú móvil, lazy loading, motor de animación, movimiento reducido y página 404.
- Enlaces de YouTube, Instagram, Abbey Road y Suite Spot accesibles.
- `npm audit`: 0 vulnerabilidades.
- Lighthouse: 100/100/100/100.

LinkedIn devuelve `999` a comprobadores automatizados por su protección anti-bot. Formspree devuelve `405` a GET porque solo acepta el POST del formulario; no se enviaron mensajes.

Las pruebas responsive automatizadas se ejecutaron con Edge/Chromium en perfiles de escritorio, tablet y móvil. No había Safari, Firefox ni un iPhone físico disponibles en este entorno; su revisión nativa sigue siendo una comprobación manual recomendable antes de publicar.

## Pendientes externos o que requieren decisión

1. Corregir el DNS de `www` y emitir un certificado que incluya `www.webowebo.com`. No se ha modificado DNS.
2. Publicar y repetir PageSpeed Insights sobre producción. Esta auditoría no despliega.
3. Verificar la propiedad y enviar el sitemap en Google Search Console y Bing Webmaster Tools.
4. Revisar Core Web Vitals reales cuando haya tráfico suficiente, especialmente INP.
5. Decidir si se migra de hashes a rutas reales. Los hashes conservan la navegación creativa, pero Bio y cada proyecto no son URLs indexables independientes ni generan previews sociales distintas.
6. Configurar protección anti-spam y límites en Formspree si el volumen lo requiere.

