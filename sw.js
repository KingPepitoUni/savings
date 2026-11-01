// Offline support: the app works without internet once opened once.
// Bump VERSION after uploading a new index.html to refresh the cache.
const VERSION = 'v2';
const CACHE = 'savings-' + VERSION;
const LOCAL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './example-backup.json'];
const XLSX_URL = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(LOCAL).then(() => c.add(XLSX_URL).catch(() => {}))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.url === XLSX_URL) {   // library never changes: cache first
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
    return;
  }
  if (new URL(req.url).origin !== location.origin) return;
  // app files: network first so updates arrive, cache when offline
  e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
    .catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match('./index.html'))));
});
