const V='pp-v51',A=['./','index.html','manifest.json','three.module.min.js','title.jpg','ogp.jpg','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
if(e.request.method!=='GET')return;
const isShell=e.request.mode==='navigate'||e.request.url.endsWith('index.html')||e.request.url.endsWith('/')||e.request.url.endsWith('sw.js');
if(isShell){
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(cache=>cache.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
return;
}
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
