/* Çevrimiçi eşleşme katmanı: Firebase Realtime Database (compat SDK). ?mock ile yerel test modu. */
(function(){
const FB_VER='10.12.2';
const loadScript=src=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=()=>rej(new Error('load '+src));document.head.appendChild(s)});
const mock=/[?&]mock\b/.test(location.search);

function mockRT(){
 const K='tod_mockdb',bc=new BroadcastChannel('tod-mock'),ws={};
 const rd=()=>{try{return JSON.parse(localStorage.getItem(K)||'{}')}catch(e){return{}}};
 const wr=o=>localStorage.setItem(K,JSON.stringify(o));
 const clean=o=>JSON.parse(JSON.stringify(o===undefined?null:o));
 const fire=code=>{const d=rd()[code]||null;(ws[code]||[]).forEach(cb=>cb(clean(d)))};
 bc.onmessage=e=>fire(e.data);
 return{
  available:()=>true,
  async create(code,data){const o=rd();o[code]=clean(data);wr(o);bc.postMessage(code);fire(code)},
  async join(code,guest){const o=rd(),c=o[code];if(!c)return{err:'notfound'};if(c.closed)return{err:'closed'};if(c.p1)return{err:'full'};c.p1=guest;wr(o);bc.postMessage(code);fire(code);return{ok:true,data:c}},
  watch(code,cb){
   (ws[code]=ws[code]||[]).push(cb);
   let last=null;const wrap=d=>{const j=JSON.stringify(d);if(j===last)return;last=j;cb(d)};
   ws[code]=(ws[code]||[]).filter(x=>x!==cb);ws[code].push(wrap);
   setTimeout(()=>wrap(clean(rd()[code]||null)),0);
   const iv=setInterval(()=>wrap(clean(rd()[code]||null)),200);
   return()=>{clearInterval(iv);ws[code]=(ws[code]||[]).filter(x=>x!==wrap)}},
  async update(code,patch){const o=rd();if(!o[code])return;for(const k in patch){if(patch[k]===null)delete o[code][k];else o[code][k]=patch[k]}wr(o);bc.postMessage(code);fire(code)},
  async exists(code){return !!rd()[code]}
 };
}

function fbRT(){
 let db=null;
 async function init(){
  if(db)return db;
  if(!window.FB_CONFIG)throw new Error('noconfig');
  await loadScript('https://www.gstatic.com/firebasejs/'+FB_VER+'/firebase-app-compat.js');
  await loadScript('https://www.gstatic.com/firebasejs/'+FB_VER+'/firebase-database-compat.js');
  if(!firebase.apps.length)firebase.initializeApp(window.FB_CONFIG);
  db=firebase.database();return db;
 }
 return{
  available:()=>!!window.FB_CONFIG,
  async create(code,data){const d=await init();await d.ref('rooms/'+code).set(data)},
  async join(code,guest){
   const d=await init(),ref=d.ref('rooms/'+code),snap=await ref.once('value'),cur=snap.val();
   if(!cur)return{err:'notfound'};if(cur.closed)return{err:'closed'};if(cur.p1)return{err:'full'};
   const tr=await ref.child('p1').transaction(c=>c===null?guest:undefined);
   if(!tr.committed)return{err:'full'};
   return{ok:true,data:cur};
  },
  watch(code,cb){
   let off=()=>{},dead=false;
   init().then(d=>{if(dead)return;const ref=d.ref('rooms/'+code),h=ref.on('value',s=>cb(s.val()));off=()=>ref.off('value',h)}).catch(()=>cb(undefined));
   return()=>{dead=true;off()};
  },
  async update(code,patch){const d=await init();await d.ref('rooms/'+code).update(patch)},
  async exists(code){const d=await init();return (await d.ref('rooms/'+code).once('value')).exists()}
 };
}
window.RT=mock?mockRT():fbRT();
})();
