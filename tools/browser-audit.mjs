import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = path.resolve(import.meta.dirname, '..');
const baseUrl = process.env.WEBO_BASE_URL || 'http://127.0.0.1:4174';
const screenshotDir = process.env.WEBO_SCREENSHOT_DIR || '';
const browserPath = process.env.WEBO_BROWSER_PATH
  || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const axePath = path.join(root, 'node_modules', 'axe-core', 'axe.min.js');

if (!fs.existsSync(browserPath)) throw new Error(`Navegador no encontrado: ${browserPath}`);
if (!fs.existsSync(axePath)) throw new Error('Ejecuta npm install antes de la auditoría de navegador.');

const routes = [
  ['', 'WEBO - Productor'],
  ['#bio', 'WEBO - Bio'],
  ['#aparatos', 'WEBO - Aparatos'],
  ['#aparatos/talkbox', 'WEBO - TalkBox'],
  ['#portfolio', 'WEBO - Portfolio'],
  ['#portfolio/suite-spot', 'WEBO - Suite Spot'],
  ['#portfolio/abbey-road', 'WEBO - Abbey Road'],
  ['#portfolio/paradiso', 'WEBO - Paradiso'],
  ['#portfolio/rockfield', 'WEBO - Rockfield'],
  ['#contacto', 'WEBO - Contacto']
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 }
];

const failures = [];
if (screenshotDir) fs.mkdirSync(screenshotDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: browserPath,
  headless: true,
  args: ['--disable-gpu']
});

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.addInitScript({ path: axePath });

    let activeRoute = '';
    page.on('console', (message) => {
      const expected404 = activeRoute === '#404' && message.text().includes('404');
      if (message.type() === 'error' && !expected404) {
        failures.push(`${viewport.name} ${activeRoute}: consola: ${message.text()}`);
      }
    });
    page.on('pageerror', (error) => failures.push(`${viewport.name} ${activeRoute}: ${error.message}`));

    for (const [route, expectedTitle] of routes) {
      activeRoute = route || '#home';
      await page.goto(`${baseUrl}/${route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(450);

      const state = await page.evaluate(async () => {
        const axeResults = await globalThis.axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
          }
        });
        return {
          title: document.title,
          activeScreens: document.querySelectorAll('[data-route-screen]:not([hidden])').length,
          horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
          violations: axeResults.violations
            .filter((violation) => ['critical', 'serious'].includes(violation.impact))
            .flatMap((violation) => violation.nodes.map((node) => (
              `${violation.id}: ${violation.help} [${node.target.join(', ')}] ${node.failureSummary || ''}`
            )))
        };
      });

      if (state.title !== expectedTitle) failures.push(`${viewport.name} ${activeRoute}: título inesperado: ${state.title}`);
      if (state.activeScreens !== 1) failures.push(`${viewport.name} ${activeRoute}: ${state.activeScreens} pantallas activas`);
      if (state.horizontalOverflow > 1) failures.push(`${viewport.name} ${activeRoute}: overflow horizontal de ${state.horizontalOverflow}px`);
      state.violations.forEach((violation) => failures.push(`${viewport.name} ${activeRoute}: ${violation}`));

      if (viewport.name === 'desktop' && route === '') {
        const gsapLoaded = await page.evaluate(() => Boolean(document.querySelector('script[src*="gsap.min.js"]')));
        if (gsapLoaded) failures.push('desktop #home: GSAP se descargó antes de necesitarse');
      }
      if (viewport.name === 'desktop' && route === '#bio') {
        const engineReady = await page.evaluate(() => Boolean(globalThis.gsap && globalThis.ScrollTrigger));
        if (!engineReady) failures.push('desktop #bio: GSAP o ScrollTrigger no se cargaron');
      }

      if (route.startsWith('#portfolio/') || route.startsWith('#aparatos/')) {
        const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < pageHeight; y += viewport.height) {
          await page.evaluate((top) => window.scrollTo(0, top), y);
          await page.waitForTimeout(60);
        }
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await page.waitForTimeout(120);
        const unloadedImages = await page.locator('[data-route-screen]:not([hidden]) img').evaluateAll((images) => (
          images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src)
        ));
        unloadedImages.forEach((image) => failures.push(`${viewport.name} ${activeRoute}: imagen sin cargar: ${image}`));
        await page.evaluate(() => window.scrollTo(0, 0));
      }

      if (route === '#aparatos/talkbox') {
        await page.locator('.aparato-process-video video').waitFor({ state: 'visible' });
        await page.waitForFunction(() => document.querySelector('.aparato-process-video video')?.readyState >= 1);
        const videoState = await page.locator('.aparato-process-video video').evaluate((video) => {
          const bounds = video.getBoundingClientRect();
          return {
            controls: video.controls,
            naturalWidth: video.videoWidth,
            naturalHeight: video.videoHeight,
            renderedDifference: Math.abs(bounds.width - bounds.height)
          };
        });
        if (!videoState.controls) failures.push(`${viewport.name} ${activeRoute}: el vídeo no tiene controles`);
        if (!videoState.naturalWidth || !videoState.naturalHeight) failures.push(`${viewport.name} ${activeRoute}: el vídeo no cargó sus metadatos`);
        if (videoState.renderedDifference > 1) failures.push(`${viewport.name} ${activeRoute}: el reproductor no es 1:1`);
      }

      if (screenshotDir && ['', '#aparatos/talkbox', '#portfolio', '#portfolio/suite-spot', '#portfolio/abbey-road', '#portfolio/rockfield', '#contacto'].includes(route)) {
        const name = `${viewport.name}-${route.replace(/^#/, '').replaceAll('/', '-') || 'home'}.png`;
        await page.screenshot({ path: path.join(screenshotDir, name), fullPage: true, animations: 'disabled' });
      }
      if (screenshotDir && route === '#bio') {
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await page.waitForTimeout(550);
        await page.screenshot({ path: path.join(screenshotDir, `${viewport.name}-bio-final.png`) });
      }
    }

    if (viewport.name === 'desktop') {
      await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
      await page.keyboard.press('Tab');
      const firstFocus = await page.evaluate(() => document.activeElement?.className || '');
      if (!String(firstFocus).includes('skip-link')) failures.push('desktop: el primer foco no llega al enlace de salto');

      await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
      await page.locator('.screen-home').click({ position: { x: 100, y: 200 } });
      await page.waitForTimeout(250);
      if (new URL(page.url()).hash !== '#bio') failures.push('desktop: pulsar la portada no abrió Bio');

      await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
      await page.mouse.wheel(0, 120);
      await page.waitForTimeout(250);
      if (new URL(page.url()).hash !== '#bio') failures.push('desktop: desplazar la portada no abrió Bio');

      await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
      await page.evaluate(() => { window.location.hash = 'bio'; });
      await page.waitForFunction(() => window.location.hash === '#bio');
      await page.goBack({ waitUntil: 'networkidle' });
      if (new URL(page.url()).hash) failures.push('desktop: atrás no regresó correctamente al inicio');
      await page.goForward({ waitUntil: 'networkidle' });
      if (new URL(page.url()).hash !== '#bio') failures.push('desktop: adelante no restauró #bio');

      activeRoute = '#404';
      const notFoundResponse = await page.goto(`${baseUrl}/pagina-inexistente.html`, { waitUntil: 'networkidle' });
      if (notFoundResponse?.status() !== 404) failures.push('desktop: la página inexistente no respondió con 404');
      const notFoundTitle = await page.title();
      if (notFoundTitle !== 'Página no encontrada - WEBO') failures.push(`desktop: título 404 inesperado: ${notFoundTitle}`);
    }

    if (viewport.name === 'mobile') {
      await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
      const toggle = page.locator('.nav-menu-toggle');
      await toggle.click();
      if (await toggle.getAttribute('aria-expanded') !== 'true') failures.push('mobile: el menú no se abrió');
      await page.keyboard.press('Escape');
      if (await toggle.getAttribute('aria-expanded') !== 'false') failures.push('mobile: Escape no cerró el menú');
    }

    await context.close();
  }

  const reducedContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce'
  });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${baseUrl}/#bio`, { waitUntil: 'networkidle' });
  const reducedState = await reducedPage.evaluate(() => ({
    fallback: document.querySelector('.bio-screen')?.classList.contains('bio-fallback'),
    gsapLoaded: Boolean(document.querySelector('script[src*="gsap.min.js"]'))
  }));
  if (!reducedState.fallback) failures.push('reduced-motion: Bio no activó la alternativa estática');
  if (reducedState.gsapLoaded) failures.push('reduced-motion: GSAP se descargó innecesariamente');
  await reducedContext.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`Fallaron ${failures.length} comprobaciones de navegador:`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`OK: ${routes.length} rutas verificadas en ${viewports.length} tamaños, sin errores críticos.`);
}

