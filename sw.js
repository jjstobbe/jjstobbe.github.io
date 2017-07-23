self.addEventListener('install', event => {
    self.skipWaiting();
    
    event.waitUntil(
        caches.open('offline-v1')
            .then(cache => cache.addAll([
             '/offline.html',
             '/css/offline.css'
            ]))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => {
                if(event.request.mode == 'navigate'){
                    console.log('returning stuff');
                    return caches.match('/offline.html');
                }
            })
    );
});