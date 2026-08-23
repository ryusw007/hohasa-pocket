const C='hohasa-2026-08-22';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const req=e.request; if(req.method!=='GET') return;
 const url=new URL(req.url); const img=/\.(jpg|jpeg|png|webp)$/i.test(url.pathname);
 e.respondWith((async()=>{ const c=await caches.open(C);
  if(img){ const hit=await c.match(req); if(hit) return hit;
    try{const r=await fetch(req); if(r.status===200) c.put(req,r.clone()); return r;}catch(_){return hit||Response.error();} }
  try{const r=await fetch(req); if(r.status===200) c.put(req,r.clone()); return r;}
  catch(_){ return (await c.match(req)) || (await c.match('index.html')); }
 })()); });
