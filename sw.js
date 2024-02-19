self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('first-app')
        .then(function(cache) {
          cache.addAll([
            '/',
            '/index.html',
            '/src/css/app.css',
            '/src/js/app.js',
            'src/images/icons/',
            '/offline.html'
          ])
        })
    );
    return self.clients.claim();
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME)
        .then(function(cache) {
          return fetch(event.request)
            .then(function(res) {
              cache.put(event.request, res.clone());
              return res;
            });
        })
        .catch(function(err) {
          return caches.open(CACHE_STATIC_NAME)
            .then(function(cache) {
              return cache.match('/offline.html');
            });
        })
    );
  });
  
  
  
  
