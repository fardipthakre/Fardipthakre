// sw.js – Basic offline cache for FARDIP THAKRE Tools
const CACHE_NAME = 'fardip-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.12.0/math.min.js',
  'https://cdn.simpleicons.org/facebook',
  'https://cdn.simpleicons.org/instagram',
  'https://cdn.simpleicons.org/youtube'
];

// Install event – cache all essential files and skip waiting
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate immediately
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

// Activate event – clean up old caches and claim clients
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheName.includes(CACHE_NAME)) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim() // Take control of all clients immediately
    ])
  );
});
