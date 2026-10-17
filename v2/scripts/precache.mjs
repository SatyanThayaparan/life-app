import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', dist), 'utf8');
const assets = new Set(['./', './index.html', './manifest.webmanifest', './icon.svg']);
for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
  assets.add('.' + match[1]);
}
const assetDir = new URL('assets/', dist);
for (const name of await readdir(assetDir)) {
  if (/\.(?:js|css|woff2?|png|svg|webp)$/.test(name)) assets.add('./assets/' + name);
}
const swUrl = new URL('sw.js', dist);
const source = await readFile(swUrl, 'utf8');
if (!source.includes('__PRECACHE_ASSETS__')) throw Error('Service worker precache placeholder missing');
await writeFile(swUrl, source.replace('__PRECACHE_ASSETS__', JSON.stringify([...assets])));
console.log('Precached', assets.size, 'app-shell files');
