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

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
});

buttonInstall.addEventListener('click', (e) => {
  // Hide the app provided install promotion
  hideMyInstallPromotion();
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  });
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
