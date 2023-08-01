const staticCache = 'wordle-v2.1';
const dynamicCache = 'dynamic-wordle-v1';
const urls = [
    '/static/js/main.d77cd303.chunk.js',
    '/static/js/2.5ca26764.chunk.js',
    '/static/css/main.244baeb0.chunk.css',
    '/static/media/Flag-of-the-United-Kingdom.330b4363.svg',
    '/static/media/pngwing.com.b015d31c.png',
    '/index.html',
    '/',
    '/manifest.json',
    '/favicon.ico'
];

self.addEventListener('install', async (e) => {
    const cache = await caches.open(staticCache);
    await cache.addAll(urls);
})


self.addEventListener('activate', async (e) => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.filter(name => name !== staticCache && name !== dynamicCache).map(name => caches.delete(name))
    )
})

self.addEventListener('fetch', (e) => {
    // console.log(e.request.url);
    const url = new URL(e.request.url);
    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(e.request))
    } else {
        e.respondWith(networkFirst(e.request))
    }
})

async function cacheFirst(request) {
    try {
        const cached = await caches.match(request);
        return cached ?? await fetch(request);
    } catch(e) {
        console.log(e);
    }
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCache)
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;

    } catch(e) {
        const cached = await cache.match(request);
        return cached;
    }
}
