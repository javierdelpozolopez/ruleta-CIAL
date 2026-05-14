const CACHE_VERSION = "cial-memorice-v2";
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;

const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/logo-cial.jpg"
];

const STATIC_DESTINATIONS = new Set([
  "font",
  "image",
  "script",
  "style",
  "worker"
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(async (cache) => {
      await Promise.all(
        SHELL_ASSETS.map((asset) =>
          fetch(asset)
            .then((response) => {
              if (response.ok) {
                return cache.put(asset, response);
              }
              return undefined;
            })
            .catch(() => undefined)
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const removals = []
      for (const cacheName of cacheNames) {
        if (!cacheName.startsWith(CACHE_VERSION)) removals.push(caches.delete(cacheName))
      }
      return Promise.all(removals)
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (SHELL_ASSETS.includes(url.pathname) || STATIC_DESTINATIONS.has(request.destination)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  }
});

async function networkFirstNavigation(request) {
  const cache = await caches.open(SHELL_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
      cache.put("/", response.clone());
    }
    return response;
  } catch {
    return (
      (await cache.match(request)) ||
      (await cache.match("/")) ||
      (await cache.match("/index.html")) ||
      Response.error()
    );
  }
}

async function cacheFirst(request, cacheName, fallbackResponse) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    if (fallbackResponse) {
      const response = fallbackResponse.clone();
      cache.put(request, response.clone());
      return response;
    }
    return Response.error();
  }
}
