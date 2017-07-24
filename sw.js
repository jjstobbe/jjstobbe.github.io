self.addEventListener('install', event => {
    self.skipWaiting();
    
    // Store outline html css for caching
    // Then populate with indexedDb values
    event.waitUntil(
        caches.open('offline-v1')
            .then(cache => cache.addAll([
             '/dashboard.html',
             '/css/dashboard.css'
            ]))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => {
                if(event.request.mode == 'navigate'){
                    return caches.match('/dashboard.html');
                }
            })
    );
});