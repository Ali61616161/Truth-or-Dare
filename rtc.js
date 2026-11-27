/* Uygulama içi görüntülü arama ve sohbet (WebRTC).
   Görüntü, ses, mesaj, fotoğraf ve videolar iki telefon arasında doğrudan ve şifreli gider; hiçbir sunucuda saklanmaz.
   Firebase yalnızca bağlantıyı kurmak için gereken teknik bilgiyi (SDP) odada kısa süre taşır.
   Doğrudan bağlantı kurulamayan ağlarda (bazı mobil operatörler) TURN aktarma sunucusu kullanılır:
   window.TURN_API (Metered kimlik adresi) ya da window.TURN_SERVERS (firebase-config.js). Aktarılan veri de uçtan uca şifrelidir. */
(function(){
const BASE_ICE=[{urls:['stun:stun.l.google.com:19302','stun:stun.cloudflare.com:3478']}];
const CH=16000,PHOTO_MAX=2560,VIDEO_MAX=200*1024*1024,IMG_MAX=20*1024*1024;
const L={
 tr:{call:'Görüntülü',chat:'Sohbet',camOn:'Kamerayı aç',connecting:'Bağlanıyor…',connected:'Bağlandı',failed:'Bağlantı kurulamadı. Wi‑Fi\'ye geçmeyi dene.',
  typeMsg:'Mesaj yaz…',send:'Gönder',once:'Tek seferlik',photo:'Fotoğraf',video:'Video',media:'Fotoğraf / video',tapView:'Görmek için dokun (tek seferlik)',seen:'Görüldü',opened:'Açıldı ve silindi',
  noCam:'Kamera ya da mikrofon izni verilmedi.',tapSound:'Sesi açmak için dokun',close:'Kapat',empty:'Mesajlar sadece bu iki telefonda, uygulama kapanınca silinir.',
  mic:'Mikrofon',flip:'Çevir',end:'Kapat',mini:'Küçült',sending:'Gönderiliyor',receiving:'Geliyor',failedSend:'Gönderilemedi',
  tooBig:'Video çok büyük (en fazla 200 MB). Daha kısa bir video seç.',badFile:'Bu dosya açılamadı.',onlyFor:'Sadece sana'},
 en:{call:'Video',chat:'Chat',camOn:'Turn camera on',connecting:'Connecting…',connected:'Connected',failed:'Could not connect. Try switching to Wi‑Fi.',
  typeMsg:'Type a message…',send:'Send',once:'View once',photo:'Photo',video:'Video',media:'Photo / video',tapView:'Tap to view (view once)',seen:'Seen',opened:'Opened and deleted',
  noCam:'Camera or microphone permission was not given.',tapSound:'Tap to turn sound on',close:'Close',empty:'Messages live only on these two phones and disappear when the app closes.',
  mic:'Mic',flip:'Flip',end:'End',mini:'Minimize',sending:'Sending',receiving:'Receiving',failedSend:'Not sent',
  tooBig:'Video is too large (max 200 MB). Pick a shorter one.',badFile:'This file could not be opened.',onlyFor:'Only for you'}
};
const tx=k=>((L[(typeof LANG!=='undefined'&&LANG)||'tr']||L.tr)[k]);
const uid=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36);
const fid=()=>(uid()+uid()).replace(/[^a-z0-9]/g,'').slice(0,16).padEnd(16,'0');
const R=window.RTC={pc:null,dc:null,code:null,seat:0,mode:null,offerId:null,answeredId:null,hiSeen:null,local:null,msgs:[],unread:0,gen:0,
 incoming:{},status:'idle',partner:'',polite:false,makingOffer:false,front:true,camOn:false,micOn:true,videoOpen:false,chatOpen:false,mini:false,autoMini:false,miniPos:null};

/* ---------- TURN / ICE ---------- */
let iceCache=null,iceAt=0;
async function getIce(){
 let extra=Array.isArray(window.TURN_SERVERS)?window.TURN_SERVERS.slice():[];
 if(typeof window.TURN_API==='string'&&/^https:\/\//.test(window.TURN_API)){
  if(!iceCache||Date.now()-iceAt>3600e3){
   try{
    const ac=new AbortController(),t=setTimeout(()=>ac.abort(),4000);
    const r=await fetch(window.TURN_API,{signal:ac.signal,cache:'no-store'});clearTimeout(t);
    const j=await r.json();
    if(Array.isArray(j)){iceCache=j.filter(s=>s&&(typeof s.urls==='string'||Array.isArray(s.urls))).slice(0,6);iceAt=Date.now()}
   }catch(e){}
  }
  if(iceCache)extra=extra.concat(iceCache);
 }
 return BASE_ICE.concat(extra);
}
R.route=async function(){ // test/teşhis: seçili bağlantı türü (host/srflx/relay)
 if(!R.pc)return null;const st=await R.pc.getStats();let pair=null;
 st.forEach(s=>{if(s.type==='transport'&&s.selectedCandidatePairId)pair=st.get(s.selectedCandidatePairId)});
 if(!pair)st.forEach(s=>{if(s.type==='candidate-pair'&&s.nominated&&s.state==='succeeded')pair=s});
 if(!pair)return null;const lc=st.get(pair.localCandidateId),rc=st.get(pair.remoteCandidateId);
 return{local:lc&&lc.candidateType,remote:rc&&rc.candidateType};
};

/* ---------- arayüz (oyun ekranının dışında, yeniden çizimde kaybolmaz) ---------- */
function el(tag,attrs,html){const e=document.createElement(tag);for(const k in attrs||{})e.setAttribute(k,attrs[k]);if(html!=null)e.innerHTML=html;return e}
function escH(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
let ui=null;
const BIG='body.vc-on:not(.vc-mini)';
function buildUI(){
 if(ui)return ui;
 const css=el('style',{},`
 #rtcbar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(env(safe-area-inset-bottom) + 12px);display:none;gap:10px;z-index:20}
 body.rtc-on #rtcbar{display:flex}
 body.rtc-on #app{padding-bottom:calc(env(safe-area-inset-bottom) + 84px)}
 #rtcbar button{white-space:nowrap;position:relative;display:flex;align-items:center;gap:8px;border:1px solid var(--line);background:var(--surf2);color:var(--txt);border-radius:99px;padding:12px 18px;font:600 15px inherit;font-family:inherit;box-shadow:0 6px 20px rgba(0,0,0,.4)}
 #rtcbar button.on{background:var(--acc);border-color:var(--acc);color:#fff}
 #rtcbar .badge{position:absolute;top:-4px;right:-4px;background:var(--acc);color:#fff;border-radius:99px;font-size:11px;min-width:18px;height:18px;display:grid;place-items:center;padding:0 5px}
 #rtcst{font-size:12px;color:var(--mut);align-self:center}
 #vc{position:fixed;top:0;left:0;width:100vw;height:62vh;background:#000;z-index:15;display:none;touch-action:none;overflow:hidden}
 body.vc-on #vc{display:block}
 ${BIG} #app{padding-top:calc(62vh + 6px)}
 ${BIG} #app .top{min-height:0}
 ${BIG} #app .top .pill{padding:3px 9px;font-size:11px}
 ${BIG} #app .top button{padding:2px 0}
 ${BIG} #app .who{margin:2px 0}
 ${BIG} #app .who .av{width:34px;height:34px;font-size:16px;border-width:2px}
 ${BIG} #app .who .nm{font-size:22px}
 ${BIG} #app .who .hearts svg{width:15px;height:15px}
 ${BIG} #app .lvrow{margin:2px 0}
 ${BIG} #app .lvrow .flames svg{width:16px;height:16px}
 ${BIG} #app .modebtn{padding:5px 10px;font-size:12px}
 ${BIG} #app .card{min-height:0;padding:14px 16px;margin:6px 0 8px;border-radius:18px}
 ${BIG} #app .card .kind{margin-bottom:6px;font-size:11px}
 ${BIG} #app .card .txt{font-size:18px;line-height:1.3}
 ${BIG} #app .card .wm,${BIG} #app .card .eico{display:none}
 ${BIG} #app .card.empty .txt{font-size:16px}
 ${BIG} #app .btn{padding:12px 14px;font-size:15px}
 ${BIG} #app .stack{gap:8px}
 ${BIG} #app .choose button{padding:12px 8px;font-size:16px;flex-direction:row;gap:8px}
 ${BIG} #app .choose button svg{width:22px;height:22px}
 ${BIG} #app .waitnote{margin:0 0 6px}
 ${BIG}.rtc-on #app{padding-bottom:calc(env(safe-area-inset-bottom) + 12px)}
 ${BIG} #rtcbar{top:calc(env(safe-area-inset-top) + 10px);bottom:auto;left:auto;right:10px;transform:none}
 ${BIG} #rtcbar button{padding:8px 12px;font-size:13px;background:rgba(0,0,0,.55);border-color:transparent}
 ${BIG} #rtcbar button.on{background:rgba(0,0,0,.55)}
 ${BIG} #rtcst{color:#fff}
 body.vc-on.vc-mini #vc{top:auto;left:auto;right:12px;bottom:calc(env(safe-area-inset-bottom) + 80px);width:36vw;max-width:190px;height:auto;aspect-ratio:3/4;border-radius:18px;box-shadow:0 12px 34px rgba(0,0,0,.65);border:2px solid rgba(255,255,255,.25);z-index:33;cursor:pointer}
 body.vc-mini #vc .ctl,body.vc-mini #vc video.l,body.vc-mini #vc .minb{display:none}
 body.vc-mini #vc .msg{font-size:12px;padding:8px}
 #vc .exp{display:none;position:absolute;top:6px;right:6px;width:26px;height:26px;border-radius:99px;background:rgba(0,0,0,.55);color:#fff;font-size:14px;place-items:center;pointer-events:none}
 body.vc-mini #vc .exp{display:grid}
 #vc .minb{position:absolute;top:calc(env(safe-area-inset-top) + 10px);left:10px;border:0;border-radius:99px;background:rgba(0,0,0,.55);color:#fff;font:600 13px inherit;font-family:inherit;padding:8px 12px}
 #vc video.r{width:100%;height:100%;object-fit:cover;background:#111;pointer-events:none}
 #vc video.l{position:absolute;right:10px;bottom:58px;width:30%;max-width:150px;aspect-ratio:3/4;object-fit:cover;border-radius:14px;border:2px solid rgba(255,255,255,.6);background:#222;transform:scaleX(-1);pointer-events:none}
 #vc video.l.back{transform:none}
 #vc .ctl{position:absolute;left:0;right:0;bottom:10px;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;padding:0 8px}
 #vc .ctl button{border:0;border-radius:99px;padding:9px 14px;background:rgba(0,0,0,.55);color:#fff;font:600 13px inherit;font-family:inherit}
 #vc .ctl button.off{background:var(--acc)}
 #vc .msg{position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-size:15px;text-align:center;padding:20px;pointer-events:none}
 #vc .tap{pointer-events:auto;background:rgba(0,0,0,.6);border:0;color:#fff;padding:12px 18px;border-radius:99px;font:600 15px inherit}
 #chat{position:fixed;inset:0;z-index:30;background:var(--bg);display:none;flex-direction:column;padding:calc(env(safe-area-inset-top) + 10px) 14px calc(env(safe-area-inset-bottom) + 10px)}
 body.chat-on #chat{display:flex}
 body.chat-on.vc-mini #vc{bottom:calc(env(safe-area-inset-bottom) + 76px)}
 #chat .hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
 #chat .hd b{font-family:var(--serif);font-size:22px}
 #chat .hd button{background:none;border:0;color:var(--mut);font:15px inherit;font-family:inherit;padding:8px}
 #chat .list{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:6px 2px;-webkit-user-select:text;user-select:text}
 #chat .b{max-width:78%;padding:10px 13px;border-radius:18px;font-size:16px;line-height:1.35;word-wrap:break-word;white-space:pre-wrap}
 #chat .b.me{align-self:flex-end;background:var(--acc);color:#fff;border-bottom-right-radius:6px}
 #chat .b.th{align-self:flex-start;background:var(--surf2);border-bottom-left-radius:6px}
 #chat .b.med{padding:4px}
 #chat .b img,#chat .b video{display:block;max-width:100%;max-height:46vh;border-radius:14px;background:#000}
 #chat .b img{cursor:zoom-in}
 #chat .b .meta{font-size:11px;opacity:.8;margin:4px 6px 2px}
 #chat .b.lock{cursor:pointer;border:1px dashed var(--line);padding:12px 14px}
 #chat .empty{color:var(--mut);font-size:13px;text-align:center;margin:20px 10px}
 #chat .in{display:flex;gap:8px;align-items:center;margin-top:8px}
 #chat .in input[type=text]{flex:1;min-width:0;padding:13px;border-radius:99px}
 #chat .oncehint{font-size:12px;color:var(--acc);text-align:center;min-height:14px}
 #chat .in button,#chat .in label{flex:0 0 auto;border:1px solid var(--line);background:var(--surf);color:var(--txt);border-radius:99px;padding:12px 14px;font:600 14px inherit;font-family:inherit;white-space:nowrap}
 #chat .in label.on{background:var(--acc);border-color:var(--acc);color:#fff}
 #viewer{position:fixed;inset:0;background:rgba(0,0,0,0);z-index:40;display:none;align-items:center;justify-content:center;flex-direction:column;transition:background .22s;touch-action:none}
 #viewer.on{display:flex}
 #viewer.in{background:#000}
 #viewer .vb{position:relative;overflow:hidden;transform:scale(.82);opacity:0;transition:transform .24s cubic-bezier(.2,.8,.2,1),opacity .24s}
 #viewer.in .vb{transform:none;opacity:1}
 #viewer img,#viewer video{display:block;max-width:100vw;max-height:84vh;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}
 #viewer .wm{position:absolute;inset:0;pointer-events:none;overflow:hidden;display:flex;flex-wrap:wrap;align-content:space-around;justify-content:space-around;color:rgba(255,255,255,.16);font:700 15px/1 system-ui,sans-serif;transform:rotate(-24deg) scale(1.3)}
 #viewer .cd{color:#fff;font-size:15px;margin-top:10px;min-height:18px}
 #viewer .x{position:absolute;top:calc(env(safe-area-inset-top) + 12px);right:14px;border:0;border-radius:99px;background:rgba(255,255,255,.14);color:#fff;font-size:18px;width:40px;height:40px}
 `);
 document.head.appendChild(css);
 const bar=el('div',{id:'rtcbar'});
 bar.innerHTML=`<button id="rtcV"></button><button id="rtcC"></button><span id="rtcst"></span>`;
 const vc=el('div',{id:'vc'});
 vc.innerHTML=`<video class="r" playsinline autoplay></video><video class="l" playsinline autoplay muted></video><div class="msg"></div><span class="exp">⤢</span>
  <button class="minb" data-a="mini"></button>
  <div class="ctl"><button data-a="mic"></button><button data-a="cam"></button><button data-a="flip"></button><button data-a="end"></button></div>`;
 const chat=el('div',{id:'chat'});
 chat.innerHTML=`<div class="hd"><b></b><button data-a="close"></button></div><div class="list"></div>
  <div class="oncehint"></div><div class="in"><label data-a="pic"><input type="file" accept="image/*,video/*" style="display:none"><span></span></label><label data-a="once"></label>
  <input type="text" maxlength="1000" enterkeyhint="send"><button data-a="send"></button></div>`;
 const viewer=el('div',{id:'viewer'});
 document.body.append(vc,bar,chat,viewer);
 ui={bar,vc,chat,viewer,rv:vc.querySelector('video.r'),lv:vc.querySelector('video.l'),vmsg:vc.querySelector('.msg'),nodes:new Map()};
 ui.rv.addEventListener('playing',()=>{const t=ui.vmsg.querySelector('.tap');if(t)ui.vmsg.innerHTML='';drawBar()});
 bar.querySelector('#rtcV').onclick=()=>toggleVideo();
 bar.querySelector('#rtcC').onclick=()=>openChat(true);
 vc.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a;if(a==='mic')toggleMic();if(a==='cam')toggleCam();if(a==='flip')flipCam();if(a==='end')endVideo();if(a==='mini')setMini(true)});
 initDrag(vc);
 chat.querySelector('[data-a=close]').onclick=()=>openChat(false);
 chat.querySelector('[data-a=send]').onclick=sendText;
 chat.querySelector('input[type=text]').addEventListener('keydown',e=>{if(e.key==='Enter')sendText()});
 const once=chat.querySelector('[data-a=once]');once.onclick=()=>{R.onceOn=!R.onceOn;drawChat()};
 chat.querySelector('input[type=file]').onchange=e=>{const f=e.target.files&&e.target.files[0];e.target.value='';if(f)sendMedia(f)};
 return ui;
}

/* ---------- YouTube tarzı küçülen pencere ---------- */
function morph(fn){
 const v=ui.vc,a=v.getBoundingClientRect();fn();const b=v.getBoundingClientRect();
 if(!a.width||!b.width){return}
 v.style.transition='none';v.style.transformOrigin='0 0';
 v.style.transform=`translate(${a.left-b.left}px,${a.top-b.top}px) scale(${a.width/b.width},${a.height/b.height})`;
 v.getBoundingClientRect();
 v.style.transition='transform .3s cubic-bezier(.2,.8,.2,1)';v.style.transform='';
 setTimeout(()=>{v.style.transition='';v.style.transformOrigin=''},340);
}
function placeMini(){
 const v=ui.vc;
 if(R.mini&&R.miniPos){v.style.left=R.miniPos.x+'px';v.style.top=R.miniPos.y+'px';v.style.right='auto';v.style.bottom='auto'}
 else{v.style.left=v.style.top=v.style.right=v.style.bottom=''}
}
function setMini(on,auto){
 if(!R.videoOpen||R.mini===on)return;
 R.autoMini=!!(on&&auto);
 morph(()=>{R.mini=on;document.body.classList.toggle('vc-mini',on);placeMini()});
 if(!on)window.scrollTo(0,0);
 drawBar();
}
R.setMini=setMini;
function initDrag(v){
 let d=null;
 v.addEventListener('pointerdown',e=>{
  if(e.target.closest('button'))return;
  const r=v.getBoundingClientRect();d={x:e.clientX,y:e.clientY,l:r.left,t:r.top,w:r.width,h:r.height,moved:false,id:e.pointerId};
  try{v.setPointerCapture(e.pointerId)}catch(x){}
 });
 v.addEventListener('pointermove',e=>{
  if(!d||e.pointerId!==d.id)return;
  const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.hypot(dx,dy)>8)d.moved=true;if(!d.moved)return;
  if(R.mini){
   const x=Math.max(6,Math.min(innerWidth-d.w-6,d.l+dx)),y=Math.max(6,Math.min(innerHeight-d.h-6,d.t+dy));
   R.miniPos={x,y};placeMini();
  }else if(dy>0){v.style.transition='none';v.style.transform=`translateY(${dy*0.45}px) scale(${Math.max(0.8,1-dy/1200)})`}
 });
 const up=e=>{
  if(!d||e.pointerId!==d.id)return;
  const dy=e.clientY-d.y,moved=d.moved;d=null;
  if(R.mini){if(!moved)setMini(false)}
  else{v.style.transform='';v.style.transition='';if(moved&&dy>70)setMini(true)}
 };
 v.addEventListener('pointerup',up);v.addEventListener('pointercancel',up);
}

function drawBar(){
 if(!ui)return;
 const v=ui.bar.querySelector('#rtcV'),c=ui.bar.querySelector('#rtcC');
 v.style.display=R.mode==='call'?'':'none';
 v.className=R.videoOpen?'on':'';v.textContent='📹 '+tx('call');
 c.innerHTML='💬 '+tx('chat')+(R.unread?`<span class="badge">${R.unread}</span>`:'');
 ui.bar.querySelector('#rtcst').textContent=R.status==='connected'?'':(R.status==='failed'?'⚠︎':tx('connecting'));
 const ctl=ui.vc.querySelector('.ctl');
 ctl.querySelector('[data-a=mic]').textContent='🎙 '+tx('mic');ctl.querySelector('[data-a=mic]').className=R.micOn?'':'off';
 ctl.querySelector('[data-a=cam]').textContent='📷';ctl.querySelector('[data-a=cam]').className=R.camOn?'':'off';
 ctl.querySelector('[data-a=flip]').textContent='🔄 '+tx('flip');
 ctl.querySelector('[data-a=end]').textContent='✕ '+tx('end');
 ui.vc.querySelector('.minb').textContent='⌄ '+tx('mini');
 const hasRemote=ui.rv.srcObject&&ui.rv.srcObject.getVideoTracks().some(t=>t.readyState==='live');
 if(!ui.vmsg.querySelector('.tap'))ui.vmsg.innerHTML=R.status==='failed'?escH(tx('failed')):(!hasRemote?escH(R.status==='connected'?(R.camOn?'…':tx('camOn')):tx('connecting')):'');
 ui.lv.style.display=R.camOn?'':'none';ui.lv.className='l'+(R.front?'':' back');
}

/* ---------- bağlantı ---------- */
function newPc(ice){
 const pc=new RTCPeerConnection({iceServers:ice,iceTransportPolicy:window.ICE_RELAY_ONLY?'relay':'all'});
 pc.ontrack=e=>{
  const st=(ui.rv.srcObject instanceof MediaStream)?ui.rv.srcObject:new MediaStream();
  if(!st.getTracks().includes(e.track))st.addTrack(e.track);
  ui.rv.srcObject=st;
  e.track.onunmute=drawBar;e.track.onended=()=>{st.removeTrack(e.track);drawBar()};
  ui.rv.play().catch(err=>{if(!err||err.name!=='NotAllowedError'||!ui.rv.paused)return;   // yalnızca tarayıcı sesi engellediyse
   ui.vmsg.innerHTML=`<button class="tap">${escH(tx('tapSound'))}</button>`;ui.vmsg.querySelector('.tap').onclick=()=>{ui.rv.play().catch(()=>{});ui.vmsg.innerHTML='';drawBar()}});
  drawBar();
 };
 pc.onconnectionstatechange=()=>{
  const s=pc.connectionState;
  if(s==='connected'){R.status='connected'}
  else if(s==='failed'){R.status='failed';setTimeout(()=>{if(R.pc===pc&&pc.connectionState==='failed')restart()},2500)}
  else if(s==='disconnected'){setTimeout(()=>{if(R.pc===pc&&pc.connectionState==='disconnected')restart()},6000)}
  drawBar();
 };
 pc.onicecandidate=e=>{if(e.candidate&&R.dc&&R.dc.readyState==='open')dcSend({t:'ice',c:e.candidate})};
 pc.onnegotiationneeded=async()=>{
  if(!R.dc||R.dc.readyState!=='open')return;
  try{R.makingOffer=true;const o=await pc.createOffer();await pc.setLocalDescription(o);dcSend({t:'sdp',d:pc.localDescription})}catch(e){}finally{R.makingOffer=false}
 };
 pc.ondatachannel=e=>setupDc(e.channel);
 return pc;
}
function waitIce(pc){return new Promise(res=>{if(pc.iceGatheringState==='complete')return res();const t=setTimeout(res,4000);pc.addEventListener('icegatheringstatechange',()=>{if(pc.iceGatheringState==='complete'){clearTimeout(t);res()}})})}
function addLocal(pc){if(R.local)R.local.getTracks().forEach(t=>{try{pc.addTrack(t,R.local)}catch(e){}})}
function closePc(){try{R.dc&&R.dc.close()}catch(e){}try{R.pc&&R.pc.close()}catch(e){}R.pc=null;R.dc=null;if(ui&&ui.rv)ui.rv.srcObject=null}
async function makeOffer(){
 const g=++R.gen;closePc();R.status='connecting';drawBar();
 const ice=await getIce();if(g!==R.gen)return;
 const pc=R.pc=newPc(ice);
 setupDc(pc.createDataChannel('c',{ordered:true}));
 addLocal(pc);
 const id=uid();R.offerId=id;
 const o=await pc.createOffer();await pc.setLocalDescription(o);await waitIce(pc);
 if(R.pc!==pc)return;
 RT.update(R.code,{ro:JSON.stringify({id,sdp:pc.localDescription.sdp})});
}
async function answer(ro){
 const g=++R.gen;closePc();R.answeredId=ro.id;R.status='connecting';drawBar();
 const ice=await getIce();if(g!==R.gen)return;
 const pc=R.pc=newPc(ice);
 addLocal(pc);
 await pc.setRemoteDescription({type:'offer',sdp:ro.sdp});
 const a=await pc.createAnswer();await pc.setLocalDescription(a);await waitIce(pc);
 if(R.pc!==pc)return;
 RT.update(R.code,{ra:JSON.stringify({id:ro.id,sdp:pc.localDescription.sdp})});
}
function restart(){
 if(!R.code)return;
 if(R.seat===0)makeOffer();
 else RT.update(R.code,{h1:uid()});   // teklif sahibinden yeni bağlantı iste
}
function parseSig(s){if(typeof s!=='string'||s.length>30000)return null;try{const o=JSON.parse(s);return(o&&typeof o.id==='string'&&o.id.length<40&&typeof o.sdp==='string')?o:null}catch(e){return null}}

/* Oda her güncellendiğinde çağrılır */
R.sync=function(code,seat,raw,mode,players){
 if(!window.RTCPeerConnection)return;
 buildUI();
 const fresh=R.code!==code||R.seat!==seat;
 if(fresh){R.stop(true);R.code=code;R.seat=seat;R.polite=seat===1;clearMsgs();R.unread=0;R.incoming={};R.offerId=null;R.answeredId=null;R.hiSeen=null;
  RT.update(code,{['h'+seat]:uid()})}
 R.mode=mode;R.partner=(players[1-seat]||{}).n||'';R.me=(players[seat]||{}).n||'';
 document.body.classList.add('rtc-on');
 if(seat===0){
  const hi=typeof raw.h1==='string'?raw.h1:null;
  if((!R.pc&&!R.pending)||hi!==R.hiSeen||(R.pc&&R.pc.connectionState==='failed')){R.hiSeen=hi;R.pending=true;makeOffer().catch(()=>{}).finally(()=>{R.pending=false})}
  else if(R.pc){const ra=parseSig(raw.ra);if(ra&&ra.id===R.offerId&&R.pc.signalingState==='have-local-offer')R.pc.setRemoteDescription({type:'answer',sdp:ra.sdp}).catch(()=>{})}
 }else{
  const ro=parseSig(raw.ro);
  if(ro&&ro.id!==R.answeredId)answer(ro).catch(()=>{});
 }
 drawBar();drawChat();
};
R.stop=function(keepUi){
 R.gen++;closePc();
 if(R.local){R.local.getTracks().forEach(t=>t.stop());R.local=null}
 R.camOn=false;R.videoOpen=false;R.mini=false;R.code=null;R.status='idle';
 document.body.classList.remove('rtc-on','vc-on','vc-mini','chat-on');
 if(ui)placeMini();
};

/* ---------- veri kanalı ---------- */
const enc=new TextEncoder(),dec=new TextDecoder();
function setupDc(dc){
 R.dc=dc;dc.binaryType='arraybuffer';
 // yarım kalan aktarımlar yeni bağlantıda devam edemez
 for(const id in R.incoming){const m=R.msgs.find(x=>x.id===id&&!x.me);if(m){m.failed=true}delete R.incoming[id]}
 dc.onopen=()=>{R.status='connected';drawBar();drawChat()};
 dc.onclose=()=>{drawBar()};
 dc.onmessage=async e=>{
  if(e.data instanceof ArrayBuffer){gotChunk(e.data);return}
  let m;try{m=JSON.parse(e.data)}catch(x){return}
  const pc=R.pc;if(!pc||!m||typeof m!=='object')return;
  if(m.t==='sdp'&&m.d&&typeof m.d.sdp==='string'){
   const collision=m.d.type==='offer'&&(R.makingOffer||pc.signalingState!=='stable');
   if(!R.polite&&collision)return;
   try{
    if(collision)await Promise.all([pc.setLocalDescription({type:'rollback'}).catch(()=>{}),pc.setRemoteDescription(m.d)]);
    else await pc.setRemoteDescription(m.d);
    if(m.d.type==='offer'){const a=await pc.createAnswer();await pc.setLocalDescription(a);dcSend({t:'sdp',d:pc.localDescription})}
   }catch(x){}
  }else if(m.t==='ice'&&m.c){try{await pc.addIceCandidate(m.c)}catch(x){}}
  else if(m.t==='m'&&typeof m.text==='string'){addMsg({id:String(m.id).slice(0,40),me:false,type:'text',text:m.text.slice(0,1000)})}
  else if(m.t==='f0'){
   const id=typeof m.id==='string'&&/^[a-z0-9]{16}$/.test(m.id)?m.id:null,kind=m.kind==='video'?'video':m.kind==='photo'?'photo':null,size=Number(m.size);
   if(!id||!kind||R.incoming[id]||!Number.isInteger(size)||size<=0||size>(kind==='video'?VIDEO_MAX:IMG_MAX))return;
   const mime=kind==='photo'?'image/jpeg':(/^video\/(mp4|quicktime|webm|3gpp|x-m4v)$/.test(m.mime)?m.mime:'video/mp4');
   R.incoming[id]={kind,mime,size,parts:[],got:0};
   addMsg({id,me:false,type:kind,once:!!m.once,prog:0,size});
  }
  else if(m.t==='seen'){const x=R.msgs.find(y=>y.id===m.id&&y.me);if(x){x.seen=true;if(x.url&&x.once){URL.revokeObjectURL(x.url);x.url=null}drawChat()}}
 };
}
function gotChunk(buf){
 if(buf.byteLength<17)return;
 const id=dec.decode(new Uint8Array(buf,0,16)),s=R.incoming[id];if(!s)return;
 const part=buf.slice(16);s.parts.push(part);s.got+=part.byteLength;
 const m=R.msgs.find(x=>x.id===id&&!x.me);
 if(s.got>s.size){delete R.incoming[id];if(m){m.failed=true;drawChat()}return}
 if(!m){delete R.incoming[id];return}
 if(s.got===s.size){
  delete R.incoming[id];
  let type=s.mime;if(s.kind==='video'){const t=document.createElement('video');if(!t.canPlayType(type))type='video/mp4'}
  m.url=URL.createObjectURL(new Blob(s.parts,{type}));m.prog=100;drawChat();
 }else{const p=Math.floor(s.got*100/s.size);if(p!==m.prog){m.prog=p;updProg(m)}}
}
function dcSend(o){try{if(R.dc&&R.dc.readyState==='open'){R.dc.send(JSON.stringify(o));return true}}catch(e){}return false}

/* ---------- görüntülü ---------- */
async function startCam(){
 try{
  const st=await navigator.mediaDevices.getUserMedia({video:{facingMode:R.front?'user':'environment',width:{ideal:640},height:{ideal:480}},audio:true});
  R.local=st;R.camOn=true;R.micOn=true;ui.lv.srcObject=st;ui.lv.play().catch(()=>{});
  if(R.pc)st.getTracks().forEach(t=>R.pc.addTrack(t,st));
 }catch(e){alert(tx('noCam'))}
 drawBar();
}
function toggleVideo(){
 if(R.videoOpen&&R.mini){setMini(false);return}   // küçükken dokununca büyüt
 R.videoOpen=!R.videoOpen;
 if(!R.videoOpen){R.mini=false;document.body.classList.remove('vc-mini')}
 document.body.classList.toggle('vc-on',R.videoOpen);placeMini();
 if(R.videoOpen&&!R.local)startCam();
 drawBar();window.scrollTo(0,0);
}
function toggleMic(){if(!R.local)return;R.micOn=!R.micOn;R.local.getAudioTracks().forEach(t=>t.enabled=R.micOn);drawBar()}
function toggleCam(){if(!R.local){startCam();return}R.camOn=!R.camOn;R.local.getVideoTracks().forEach(t=>t.enabled=R.camOn);drawBar()}
async function flipCam(){
 if(!R.local)return;R.front=!R.front;
 try{
  const ns=await navigator.mediaDevices.getUserMedia({video:{facingMode:R.front?'user':'environment'}});
  const nt=ns.getVideoTracks()[0],old=R.local.getVideoTracks()[0];
  const snd=R.pc&&R.pc.getSenders().find(s=>s.track&&s.track.kind==='video');if(snd)await snd.replaceTrack(nt);
  if(old){R.local.removeTrack(old);old.stop()}R.local.addTrack(nt);ui.lv.srcObject=R.local;
 }catch(e){R.front=!R.front}
 drawBar();
}
function endVideo(){
 if(R.local){if(R.pc)R.pc.getSenders().forEach(s=>{if(s.track)try{R.pc.removeTrack(s)}catch(e){}});R.local.getTracks().forEach(t=>t.stop());R.local=null}
 R.camOn=false;R.videoOpen=false;R.mini=false;document.body.classList.remove('vc-on','vc-mini');placeMini();ui.lv.srcObject=null;drawBar();
}

/* ---------- sohbet ---------- */
function clearMsgs(){R.msgs.forEach(m=>{if(m.url)URL.revokeObjectURL(m.url)});R.msgs=[];if(ui)ui.nodes.clear()}
function addMsg(m){
 R.msgs.push(m);
 if(R.msgs.length>300){const o=R.msgs.shift();if(o.url)URL.revokeObjectURL(o.url);if(ui)ui.nodes.delete(o.id)}
 if(!m.me&&!R.chatOpen){R.unread++;try{navigator.vibrate&&navigator.vibrate(30)}catch(e){}}
 drawBar();drawChat();
}
function openChat(on){
 R.chatOpen=on;document.body.classList.toggle('chat-on',on);
 if(on){if(R.videoOpen&&!R.mini)setMini(true,true);R.unread=0;drawBar();drawChat();setTimeout(()=>{const i=ui.chat.querySelector('input[type=text]');i&&i.focus()},50)}
 else if(R.autoMini&&R.mini)setMini(false);
}
function sendText(){
 const i=ui.chat.querySelector('input[type=text]');const v=(i.value||'').trim();if(!v)return;
 const id=uid();if(dcSend({t:'m',id,text:v})){addMsg({id,me:true,type:'text',text:v});i.value=''}
}
function loadImage(file){
 return new Promise((res,rej)=>{const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{URL.revokeObjectURL(url);res(img)};img.onerror=()=>{URL.revokeObjectURL(url);rej(new Error('img'))};img.src=url});
}
async function sendMedia(file){
 if(!R.dc||R.dc.readyState!=='open')return;
 const once=!!R.onceOn;
 if(/^video\//.test(file.type)||/\.(mp4|mov|m4v|webm|3gp)$/i.test(file.name||'')){
  if(file.size>VIDEO_MAX){alert(tx('tooBig'));return}
  return sendBlob(file,'video',file.type||'video/mp4',once);
 }
 try{
  const img=await loadImage(file);
  const sc=Math.min(1,PHOTO_MAX/Math.max(img.naturalWidth,img.naturalHeight));
  const c=document.createElement('canvas');c.width=Math.round(img.naturalWidth*sc);c.height=Math.round(img.naturalHeight*sc);
  const g=c.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(img,0,0,c.width,c.height);
  const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',0.92));
  if(!blob)throw new Error('enc');
  return sendBlob(blob,'photo','image/jpeg',once);
 }catch(e){alert(tx('badFile'))}
}
R.sendMedia=sendMedia;
async function sendBlob(blob,kind,mime,once){
 const dc=R.dc,id=fid(),size=blob.size;
 if(!dcSend({t:'f0',id,kind,mime,size,once}))return;
 const m={id,me:true,type:kind,once,prog:0,size,url:URL.createObjectURL(blob)};
 addMsg(m);
 const head=enc.encode(id);
 dc.bufferedAmountLowThreshold=1<<20;
 const waitLow=()=>new Promise(r=>{const f=()=>{dc.removeEventListener('bufferedamountlow',f);r()};dc.addEventListener('bufferedamountlow',f);setTimeout(f,500)});
 try{
  for(let off=0;off<size;){
   const big=new Uint8Array(await blob.slice(off,off+(1<<20)).arrayBuffer());
   for(let k=0;k<big.length;k+=CH){
    if(R.dc!==dc||dc.readyState!=='open')throw new Error('closed');
    while(dc.bufferedAmount>(4<<20))await waitLow();
    const part=big.subarray(k,k+CH),out=new Uint8Array(16+part.length);out.set(head);out.set(part,16);dc.send(out.buffer);
   }
   off+=big.length;const p=Math.floor(off*100/size);if(p!==m.prog&&p<100){m.prog=p;updProg(m)}
  }
  m.prog=100;
 }catch(e){m.failed=true}
 drawChat();
}
function updProg(m){
 const n=ui&&ui.nodes.get(m.id);const p=n&&n.el.querySelector('.prog');
 if(p)p.textContent=tx(m.me?'sending':'receiving')+' %'+m.prog;
}
function viewMedia(m,once){
 if(!m.url)return;
 const v=ui.viewer;v.innerHTML='';v.className='on';
 const box=el('div',{class:'vb'});let media;
 if(m.type==='video'){
  media=el('video',{playsinline:'',controlslist:'nodownload noplaybackrate',disablepictureinpicture:''});media.playsInline=true;media.src=m.url;
  if(!once)media.controls=true;
 }else media=el('img',{alt:'',draggable:'false'}),media.src=m.url;
 media.oncontextmenu=e=>e.preventDefault();
 box.appendChild(media);
 if(once){const w=el('div',{class:'wm'});const t=escH((R.me||tx('onlyFor'))+' · '+new Date().toLocaleDateString());w.innerHTML=Array(24).fill(`<span>${t}</span>`).join('');box.appendChild(w)}
 const cd=el('div',{class:'cd'}),x=el('button',{class:'x','aria-label':tx('close')},'✕');
 v.append(box,cd,x);
 if(m.type==='video')media.play().catch(()=>{media.controls=true});
 requestAnimationFrame(()=>requestAnimationFrame(()=>v.classList.add('in')));
 let it=null,done=false;
 const fin=()=>{
  if(done)return;done=true;clearInterval(it);document.removeEventListener('visibilitychange',hid);window.removeEventListener('blur',fin);
  try{media.pause&&media.pause()}catch(e){}
  v.classList.remove('in');setTimeout(()=>{if(done){v.className='';v.innerHTML=''}},230);
  if(once){URL.revokeObjectURL(m.url);m.url=null;m.seen=true;dcSend({t:'seen',id:m.id});drawChat()}
 };
 const hid=()=>{if(document.visibilityState==='hidden')fin()};
 if(once){document.addEventListener('visibilitychange',hid);window.addEventListener('blur',fin)}   // uygulamadan çıkılırsa hemen kapanır
 if(once&&m.type==='photo'){let s=10;cd.textContent=s;it=setInterval(()=>{s--;cd.textContent=s;if(s<=0)fin()},1000)}
 if(m.type==='video'&&once)media.addEventListener('ended',fin);
 x.onclick=fin;
 // aşağı kaydırınca küçülerek kapanır
 let sy=null;
 v.onpointerdown=e=>{if(e.target===x||(m.type==='video'&&!once&&e.target===media&&e.clientY>media.getBoundingClientRect().bottom-60))return;sy=e.clientY};
 v.onpointermove=e=>{if(sy==null)return;const dy=Math.max(0,e.clientY-sy);box.style.transition='none';box.style.transform=`translateY(${dy}px) scale(${Math.max(.6,1-dy/700)})`};
 v.onpointerup=v.onpointercancel=e=>{if(sy==null)return;const dy=e.clientY-sy;sy=null;box.style.transition='';box.style.transform='';if(dy>90)fin();else if(Math.abs(dy)<6&&m.type==='photo'&&!once)fin()};
 R._viewerClose=fin;
}
function bubble(m){
 const b=el('div',{class:'b '+(m.me?'me':'th')});
 if(m.type==='text'){b.textContent=m.text;return b}
 const ic=m.type==='video'?'🎬':'📷',nm=tx(m.type==='video'?'video':'photo');
 const prog=m.prog<100&&!m.failed?`<div class="meta prog">${escH(tx(m.me?'sending':'receiving'))} %${m.prog}</div>`:'';
 if(m.failed){b.innerHTML=`${ic} ${escH(nm)}<div class="meta">${escH(tx('failedSend'))}</div>`;return b}
 if(m.once){
  if(m.me)b.innerHTML=`${ic} ${escH(tx('once'))}${prog}<div class="meta">${m.seen?escH(tx('seen')):''}</div>`;
  else if(m.prog<100)b.innerHTML=`🔒 ${ic} ${escH(tx('once'))}${prog}`;
  else if(m.url){b.classList.add('lock');b.textContent='🔒 '+ic+' '+tx('tapView');b.onclick=()=>viewMedia(m,true)}
  else b.innerHTML=`<span class="meta">${escH(tx('opened'))}</span>`;
  return b;
 }
 if(!m.url){b.innerHTML=`${ic} ${escH(nm)}${prog}`;return b}
 b.classList.add('med');
 if(m.type==='video'){const vd=el('video',{playsinline:'',controls:'',preload:'metadata'});vd.playsInline=true;vd.src=m.url+'#t=0.1';b.appendChild(vd)}
 else{const im=el('img',{alt:''});im.src=m.url;im.onclick=()=>viewMedia(m,false);b.appendChild(im)}
 if(prog)b.insertAdjacentHTML('beforeend',prog);
 return b;
}
function drawChat(){
 if(!ui)return;
 const c=ui.chat;
 c.querySelector('.hd b').textContent=R.partner||tx('chat');
 c.querySelector('[data-a=close]').textContent=tx('close');
 c.querySelector('[data-a=send]').textContent=tx('send');
 c.querySelector('[data-a=pic] span').textContent='📎';c.querySelector('[data-a=pic]').title=tx('media');
 const once=c.querySelector('[data-a=once]');once.textContent='1×';once.title=tx('once');once.className=R.onceOn?'on':'';
 c.querySelector('.oncehint').textContent=R.onceOn?'1× '+tx('once'):'';
 c.querySelector('input[type=text]').placeholder=tx('typeMsg');
 const open=R.dc&&R.dc.readyState==='open';
 c.querySelector('[data-a=send]').disabled=!open;
 const list=c.querySelector('.list');
 if(!R.msgs.length){ui.nodes.clear();list.innerHTML=`<p class="empty">${escH(open?tx('empty'):tx('connecting'))}</p>`;return}
 const em=list.querySelector('.empty');if(em)em.remove();
 const atEnd=list.scrollHeight-list.scrollTop-list.clientHeight<80;
 const keep=new Set();
 R.msgs.forEach((m,i)=>{
  const sig=[m.prog===100||m.prog==null?1:0,!!m.url,!!m.seen,!!m.failed].join();
  let n=ui.nodes.get(m.id);
  if(!n||n.sig!==sig){const e=bubble(m);if(n&&n.el.parentNode)n.el.replaceWith(e);n={el:e,sig};ui.nodes.set(m.id,n)}
  keep.add(n.el);
  if(list.children[i]!==n.el)list.insertBefore(n.el,list.children[i]||null);
 });
 [...list.children].forEach(ch=>{if(!keep.has(ch))ch.remove()});
 if(atEnd)list.scrollTop=list.scrollHeight;
}
})();
