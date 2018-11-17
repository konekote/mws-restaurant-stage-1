//create cache name
let cacheName = 'cache-v1';

//create array with urls to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/media query restaurant.css',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
];

//add event listener to open cache and add URLs to cache when install
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

//add event listener to add new fetched info to cache if it's not already there and to load from cache if it is
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request)
        .then(function (response) {
                if (response) {
                    console.log("Loaded info from cache")
                    return response;
                }

                //cloning to request to be able to use again
                var fetchClone = e.request.clone();

                return fetch(fetchClone)
                    .then(function (response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        //cloning response to be able to use again
                        var responseClone = response.clone();

                        caches.open('cache-v1')
                            .then(function (cache) {
                                console.log("Added new cache")
                                cache.put(e.request, responseClone);
                            });

                        return response;
                    })
            }
        )
    )
})