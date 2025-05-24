const CACHE_NAME = 'restaurant-cache-v1';
const IMAGE_CACHE_NAME = 'restaurant-image-cache-v1';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/logo.jpg',
  '/background.jpg'
];

// Install event - precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName !== CACHE_NAME && 
              cacheName !== IMAGE_CACHE_NAME
            );
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// Special handling for API image requests
// Update the isImageAPIRequest function:

const isImageAPIRequest = (url) => {
  return (
    // Backend API images
    (url.includes('restraunt-booking.onrender.com') && 
     (url.includes('.jpg') || url.includes('.jpeg') || 
      url.includes('.png') || url.includes('.gif') || 
      url.includes('.webp') || url.includes('/media/'))) ||
    // External images (Unsplash, etc.)
    (url.includes('images.unsplash.com') || 
     url.includes('via.placeholder.com'))
  );
};

// Update the fetch event listener:
self.addEventListener('fetch', (event) => {
  // Skip caching for malformed URLs
  try {
    new URL(event.request.url);
  } catch (e) {
    console.error('Invalid URL:', event.request.url);
    return;
  }

  // Special handling for image requests
  if (isImageAPIRequest(event.request.url)) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch((error) => {
              console.error('Fetch failed:', error);
              // Return a placeholder response for failed images
              return new Response('', { 
                status: 404, 
                statusText: 'Image not found' 
              });
            });
        });
      })
    );
  } else {
    // Standard cache-first strategy for other requests
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Special handling for image API requests
  if (isImageAPIRequest(event.request.url)) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Return cached response if found
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Fetch from network, cache and return
          return fetch(event.request).then((networkResponse) => {
            // Cache the fetched response
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    // Standard cache-first strategy for other requests
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
