// sw.js – Basic offline cache for FARDIP THAKRE Tools
const CACHE_NAME = 'fardip-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './icon-192.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.12.0/math.min.js',
  'https://cdn.simpleicons.org/facebook',
  'https://cdn.simpleicons.org/instagram',
  'https://cdn.simpleicons.org/youtube'
];

// Install event – cache all essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event – serve from cache first, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event – clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
