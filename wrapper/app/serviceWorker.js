var staticCacheName = 'monstercat-static-v7';
var contentImgsCache = 'monstercat-content-imgs';
var allCaches = [
  staticCacheName,
  contentImgsCache
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'views/offline.html',
        'views/error.html',
        'views/menu.html',
        'views/artists.html',
        'views/music.html',
        'views/home.html',
        'views/settings.html',
        'views/login.html',
        'views/player-minimized.html',
        'views/player-maximized.html',
        'views/album.html',
        'views/artist.html',
        'views/featured.html'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('monstercat-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {

    if (requestUrl.pathname.startsWith('/views/')) {
      event.respondWith(serveTemplate(event.request));
      return;
    }

    event.respondWith(
      fetch(event.request)
      .catch(error => {
        if(event.request.headers.get('accept').includes('text/html')){
          return caches.match('views/offline.html')
        }
        else{
          return error;
        }
      })
    );
    return;
  } else{
    if(requestUrl.origin == 'https://assets.monstercat.com'){
      event.respondWith(serveOutsideRequests(event))
    }
    else{
      event.respondWith(
        fetch(event.request)
        .catch(error => {
          if(event.request.headers.get('accept').includes('text/html')){
            return caches.match('views/offline.html')
          }
          else{
            return error;
          }
        }))
  return;
    }
  }
});

function serveTemplate(request){
  var storageUrl = request.url.replace(/http:\/\/(\w+\.?)+(:\w+)\/views\//, 'views/').replace("?","");

  return caches.open(staticCacheName).then(function(cache) {
    return cache.match(storageUrl).catch(function() {
      var networkFetch = fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });

      return response || networkFetch;
    })
  });
}

async function serveOutsideRequests(event){
  return caches.open(staticCacheName).then(function(cache) {
    return cache.match(event.request.url).then(function(response) {
      if (response) return response;

      return fetch(event.request).then(async (networkResponse) => {
        let cacheControll = false;
        for(let header of networkResponse.headers.entries()){
          if(header[0] == 'error'){
            if (!event.clientId) return;

            // Get the client.
            const client = await clients.get(event.clientId);
            // Exit early if we don't get the client.
            // Eg, if it closed.
            if (!client) return;

            // Send a message to the client.
            client.postMessage({
              msg: "error",
              error: header[1]
            });
          }
          else if(header[0] == 'cache-control' && header[1] == 'no-cache'){
            cacheControll = true;
          }
        } 

        if(!cacheControll){
          cache.put(event.request.url, networkResponse.clone());
        }

        return networkResponse;
      }).catch(error => {
        if(event.request.headers.get('accept').includes('text/html')){
          return caches.match('views/offline.html')
        }
        else{
          return error;
        }
      });
    });
  });
}


self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});