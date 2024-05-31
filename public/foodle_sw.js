//https://medium.com/notonlycss/turn-your-website-into-a-pwa-6aaecb95f8b9
const dynamicCacheName = "Img-v2.0";
const assetsToCache = [
  "https://jasoncameron.dev/foodle/",
  "https://jasoncameron.dev/foodle/index.html",
  "https://jasoncameron.dev/foodle/global.css",
  "https://jasoncameron.dev/foodle/src/build/bundle.css",
  "https://jasoncameron.dev/foodle/src/build/bundle.js",
];
const assetsToNOTCache = [
  "https://api.github.com/repos/JasonLovesDoggo/JasonLovesDoggo.github.io/releases/latest",
];
const domainsNotToCache = [
  "https://abacus.jasoncameron.dev",
  "chrome-extension://",
];

self.addEventListener("install", (e) => {
  log("Installing");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(dynamicCacheName);
      await cache.addAll(assetsToCache);
    })(),
  );
});
// activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== dynamicCacheName)
          .map((key) => caches.delete(key)),
      );
    }),
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  if (
    evt.request.url in assetsToNOTCache ||
    domainsNotToCache.some((d) => evt.request.url.includes(d))
  ) {
    return fetch(evt.request);
  }

  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache
              .put(evt.request.url, fetchRes.clone())
              .then((r) => log(`Caching Url ${evt.request.url}`));
            return fetchRes;
          });
        })
      );
    }),
  );
});

/**
 * Special log function to clearly distinguish logs from the service worker.
 * @param {string} text - The text to log
 */
function log(text) {
  console.log(
    "%cService Worker",
    "color: purple; font-weight: 600; background: white; padding: 0 5px; border-radius: 2px",
    text,
  );
}
