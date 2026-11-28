
const cacheName = 'welders-v2-shell-3';
const shell = ['/', '/app.css', '/app.js', '/data.js', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(shell)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('welders-v2-shell-') && key !== cacheName)
    .map(key => caches.delete(key)))));
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !shell.includes(url.pathname)) return;
  event.respondWith(fetch(event.request).catch(async () => {
    const cache = await caches.open(cacheName);
    return await cache.match(url.pathname) || Response.error();
  }));
});
