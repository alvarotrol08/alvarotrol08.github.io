import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const failures = [];
let checks = 0;

function check(condition, message) {
  checks += 1;
  if (!condition) failures.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function localPathFromUrl(value) {
  const clean = value.split(/[?#]/, 1)[0].replace(/^\//, '');
  return clean && !/^(?:[a-z]+:|#)/i.test(value) ? clean : null;
}

const html = read('index.html');
const css = read('assets/css/styles.css');
const contentSource = read('assets/js/content.js');
const appSource = read('assets/js/app.js');
const animationSource = read('assets/js/animations.js');

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
check(ids.length === new Set(ids).size, 'index.html contiene identificadores duplicados');
check(/<html\s+lang="es">/.test(html), 'Falta lang="es" en index.html');
check(/<meta\s+name="description"/.test(html), 'Falta meta description');
check(/<link\s+rel="canonical"\s+href="https:\/\/webowebo\.com\/"/.test(html), 'Canonical incorrecta o ausente');
check(/Content-Security-Policy/.test(html), 'Falta Content Security Policy');
check(/<meta\s+name="referrer"/.test(html), 'Falta Referrer Policy');
check(/<meta\s+property="og:image:alt"/.test(html), 'Falta texto alternativo de Open Graph');

const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
check(Boolean(jsonLdMatch), 'Falta JSON-LD');
if (jsonLdMatch) {
  try {
    JSON.parse(jsonLdMatch[1]);
    const hash = `sha256-${crypto.createHash('sha256').update(jsonLdMatch[1]).digest('base64')}`;
    if (!html.includes(`'${hash}'`)) console.error(`Hash CSP esperado: ${hash}`);
    check(html.includes(`'${hash}'`), 'El hash CSP del JSON-LD no coincide con su contenido');
  } catch {
    check(false, 'El JSON-LD no es JSON válido');
  }
}

const referencedFiles = new Set();
for (const match of html.matchAll(/\s(?:src|href|srcset)="([^"]+)"/g)) {
  for (const candidate of match[1].split(',')) {
    const localPath = localPathFromUrl(candidate.trim().split(/\s+/, 1)[0]);
    if (localPath) referencedFiles.add(localPath);
  }
}

for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
  const value = match[1];
  if (/^(?:data:|https?:)/i.test(value)) continue;
  referencedFiles.add(path.posix.normalize(path.posix.join('assets/css', value)));
}

const sandbox = { window: {} };
vm.runInNewContext(contentSource, sandbox, { filename: 'assets/js/content.js' });

function collectAssetReferences(value) {
  if (Array.isArray(value)) {
    value.forEach(collectAssetReferences);
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (['src', 'image', 'imageThumb', 'thumbnail'].includes(key) && typeof child === 'string') {
      referencedFiles.add(child);
    } else {
      collectAssetReferences(child);
    }
  }
}

collectAssetReferences(sandbox.window.WEBO_CONTENT);

for (const source of [appSource, animationSource]) {
  for (const match of source.matchAll(/['"`](assets\/[^?'"`]+)(?:\?[^'"`]*)?['"`]/g)) {
    referencedFiles.add(match[1]);
  }
}

for (const relativePath of referencedFiles) {
  check(exists(relativePath), `Recurso local inexistente: ${relativePath}`);
}

for (const requiredFile of ['CNAME', 'robots.txt', 'sitemap.xml', '404.html', '_config.yml']) {
  check(exists(requiredFile), `Falta ${requiredFile}`);
}

check(read('CNAME').trim() === 'webowebo.com', 'CNAME no apunta a webowebo.com');
check(read('robots.txt').includes('https://webowebo.com/sitemap.xml'), 'robots.txt no referencia el sitemap canónico');
check(read('sitemap.xml').includes('<loc>https://webowebo.com/</loc>'), 'sitemap.xml no contiene la URL canónica');

if (failures.length) {
  console.error(`Fallaron ${failures.length} de ${checks} comprobaciones:`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`OK: ${checks} comprobaciones estáticas superadas.`);
}

