const CACHE_NAME = "health-tracker-v2";
const URLS_TO_CACHE = ["/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  // network-first for HTML: always try network, fall back to cache
  if (event.request.mode === "navigate" || event.request.url.includes("index.html")) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  // cache-first for other assets
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
