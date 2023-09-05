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

let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  installPrompt = null;
  installButton.setAttribute("hidden", "");
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
