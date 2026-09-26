const V='20260926110433'; const C='hohasa-'+V; const IMG='hohasa-img'; const IMG_MAX=250;

self.addEventListener('install', e=>{ self.skipWaiting(); });

self.addEventListener('activate', e=>{
  e.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('hohasa-') && k!==C && k!==IMG).map(k=>caches.delete(k)));
    await clients.claim();
  })());
});

async function trim(cache){
  const keys = await cache.keys();
  const over = keys.length - IMG_MAX;
  if(over > 0){ for(let i=0;i<over;i++){ await cache.delete(keys[i]); } }
}

self.addEventListener('fetch', e=>{
  const req = e.request;
  if(req.method!=='GET') return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;   // 브라우저 기본 처리
  const key = url.origin + url.pathname;   // 쿼리 제거 — ?t=... 로 캐시가 무한히 쌓이는 것 방지

  if(/\.(jpg|jpeg|png|webp)$/i.test(url.pathname)){
    e.respondWith((async()=>{
      const cache = await caches.open(IMG);
      const hit = await cache.match(key);
      const net = fetch(req).then(r=>{
        if(r.ok){ cache.put(key, r.clone()); trim(cache); }
        return r;
      }).catch(()=>null);
      if(hit){ e.waitUntil(net); return hit; }
      return (await net) || Response.error();
    })());
    return;
  }

  e.respondWith((async()=>{
    const cache = await caches.open(C);
    try{
      const r = await fetch(req);
      if(r.ok){ cache.put(key, r.clone()); }
      return r;
    }catch(_){
      const hit = await cache.match(key);
      if(hit) return hit;
      if(req.mode==='navigate'){
        const idx = await cache.match(self.registration.scope + 'index.html');
        if(idx) return idx;
      }
      return Response.error();
    }
  })());
});
