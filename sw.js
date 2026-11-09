const C='tod-v13',F=['./','index.html','manifest.webmanifest','icon.svg','icon.png','tasks.js','tasks2.js','tasks3.js','tasks4.js','tasks_en.js','tasks5.js','tasks6.js','tasks7.js','tasks8.js','tasks9.js','tasks_msg.js','firebase-config.js','online.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).catch(()=>caches.match(e.request))));
