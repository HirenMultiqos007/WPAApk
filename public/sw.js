let cacheData = "appV1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(["/static/js/bundle.js", "/index.html", "/", "/users"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
    if(!navigator.onLine){
        event.respondWith(
          caches.match(event.request).then((result) => {
            if (result) {
              return result;
            }
            let requestUrl = event.request.clone();
            return fetch(requestUrl);
          })
        );
    }
});

// This variable will save the event for later use.
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevents the default mini-infobar or install dialog from appearing on mobile
  e.preventDefault();
  // Save the event because you'll need to trigger it later.
  deferredPrompt = e;
  showInAppInstallPromotion();
});


// Gather the data from your custom install UI event listener
installButton.addEventListener('click', async () => {
  // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
  deferredPrompt.prompt();
  // Find out whether the user confirmed the installation or not
  const { outcome } = await deferredPrompt.userChoice;
  // The deferredPrompt can only be used once.
  deferredPrompt = null;
  // Act on the user's choice
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt.');
  } else if (outcome === 'dismissed') {
    console.log('User dismissed the install prompt');
  }
});

// self.addEventListener("fetch", (event) => {
//     if(!navigator.onLine){
//         event.respondWith(
//           caches.match(event.request).then((cachedResponse) => {
//             if (cachedResponse) {
//               return cachedResponse;
//             }

//             // If the request is not in cache, fetch it from the network
//             return fetch(event.request)
//               .then((response) => {
//                 // Clone the response as it can only be consumed once
//                 const responseClone = response.clone();

//                 // Cache the response for future requests
//                 caches.open(cacheData).then((cache) => {
//                   cache.put(event.request, responseClone);
//                 });

//                 return response;
//               })
//               .catch((error) => {
//                 console.log(error)
//             //   return  caches.match(event.request)
//               });
//           })
//         );
//     }
//   });
