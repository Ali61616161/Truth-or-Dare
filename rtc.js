/* Uygulama içi görüntülü arama ve sohbet (WebRTC).
   Görüntü, ses, mesaj ve fotoğraflar iki telefon arasında doğrudan ve şifreli gider; hiçbir sunucuda saklanmaz.
   Firebase yalnızca bağlantıyı kurmak için gereken teknik bilgiyi (SDP) odada kısa süre taşır.
   window.TURN_SERVERS tanımlıysa (firebase-config.js), doğrudan bağlantı kurulamayan ağlarda aktarma sunucusu kullanılır. */
(function(){
const ICE=[{urls:['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302']}].concat(Array.isArray(window.TURN_SERVERS)?window.TURN_SERVERS:[]);
const L={
 tr:{call:'Görüntülü',chat:'Sohbet',camOn:'Kamerayı aç',connecting:'Bağlanıyor…',connected:'Bağlandı',failed:'Bağlantı kurulamadı. Wi‑Fi\'ye geçmeyi dene.',
  typeMsg:'Mesaj yaz…',send:'Gönder',once:'Tek seferlik',photo:'Fotoğraf',tapView:'Görmek için dokun (tek seferlik)',seen:'Görüldü',opened:'Açıldı ve silindi',
  noCam:'Kamera ya da mikrofon izni verilmedi.',tapSound:'Sesi açmak için dokun',close:'Kapat',empty:'Mesajlar sadece bu iki telefonda, uygulama kapanınca silinir.',
  mic:'Mikrofon',flip:'Çevir',end:'Kapat'},
 en:{call:'Video',chat:'Chat',camOn:'Turn camera on',connecting:'Connecting…',connected:'Connected',failed:'Could not connect. Try switching to Wi‑Fi.',
  typeMsg:'Type a message…',send:'Send',once:'View once',photo:'Photo',tapView:'Tap to view (view once)',seen:'Seen',opened:'Opened and deleted',
  noCam:'Camera or microphone permission was not given.',tapSound:'Tap to turn sound on',close:'Close',empty:'Messages live only on these two phones and disappear when the app closes.',
  mic:'Mic',flip:'Flip',end:'End'}
};
const tx=k=>((L[(typeof LANG!=='undefined'&&LANG)||'tr']||L.tr)[k]);
const uid=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36);
const R=window.RTC={pc:null,dc:null,code:null,seat:0,mode:null,offerId:null,answeredId:null,hiSeen:null,local:null,msgs:[],unread:0,
 incoming:{},status:'idle',partner:'',polite:false,makingOffer:false,front:true,camOn:false,micOn:true,videoOpen:false,chatOpen:false};

/* ---------- arayüz (oyun ekranının dışında, yeniden çizimde kaybolmaz) ---------- */
function el(tag,attrs,html){const e=document.createElement(tag);for(const k in attrs||{})e.setAttribute(k,attrs[k]);if(html!=null)e.innerHTML=html;return e}
function escH(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
let ui=null;
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
 #vc{position:fixed;top:0;left:0;right:0;height:42vh;background:#000;z-index:15;display:none}
 body.vc-on #vc{display:block}
 body.vc-on #app{padding-top:calc(42vh + 12px)}
 #vc video.r{width:100%;height:100%;object-fit:cover;background:#111}
 #vc video.l{position:absolute;right:10px;bottom:56px;width:28%;max-width:130px;aspect-ratio:3/4;object-fit:cover;border-radius:14px;border:2px solid rgba(255,255,255,.6);background:#222;transform:scaleX(-1)}
 #vc video.l.back{transform:none}
 #vc .ctl{position:absolute;left:0;right:0;bottom:10px;display:flex;justify-content:center;gap:10px}
 #vc .ctl button{border:0;border-radius:99px;padding:9px 14px;background:rgba(0,0,0,.55);color:#fff;font:600 13px inherit;font-family:inherit}
 #vc .ctl button.off{background:var(--acc)}
 #vc .msg{position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-size:15px;text-align:center;padding:20px;pointer-events:none}
 #vc .tap{pointer-events:auto;background:rgba(0,0,0,.6);border:0;color:#fff;padding:12px 18px;border-radius:99px;font:600 15px inherit}
 #chat{position:fixed;inset:0;z-index:30;background:var(--bg);display:none;flex-direction:column;padding:calc(env(safe-area-inset-top) + 10px) 14px calc(env(safe-area-inset-bottom) + 10px)}
 body.chat-on #chat{display:flex}
 #chat .hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
 #chat .hd b{font-family:var(--serif);font-size:22px}
 #chat .hd button{background:none;border:0;color:var(--mut);font:15px inherit;font-family:inherit;padding:8px}
 #chat .list{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:6px 2px;-webkit-user-select:text;user-select:text}
 #chat .b{max-width:78%;padding:10px 13px;border-radius:18px;font-size:16px;line-height:1.35;word-wrap:break-word;white-space:pre-wrap}
 #chat .b.me{align-self:flex-end;background:var(--acc);color:#fff;border-bottom-right-radius:6px}
 #chat .b.th{align-self:flex-start;background:var(--surf2);border-bottom-left-radius:6px}
 #chat .b img{display:block;max-width:100%;border-radius:12px}
 #chat .b .meta{font-size:11px;opacity:.75;margin-top:4px}
 #chat .b.lock{cursor:pointer;border:1px dashed var(--line)}
 #chat .empty{color:var(--mut);font-size:13px;text-align:center;margin:20px 10px}
 #chat .in{display:flex;gap:8px;align-items:center;margin-top:8px}
 #chat .in input[type=text]{flex:1;min-width:0;padding:13px;border-radius:99px}
 #chat .oncehint{font-size:12px;color:var(--acc);text-align:center;min-height:14px}
 #chat .in button,#chat .in label{flex:0 0 auto;border:1px solid var(--line);background:var(--surf);color:var(--txt);border-radius:99px;padding:12px 14px;font:600 14px inherit;font-family:inherit;white-space:nowrap}
 #chat .in label.on{background:var(--acc);border-color:var(--acc);color:#fff}
 #viewer{position:fixed;inset:0;background:#000;z-index:40;display:none;align-items:center;justify-content:center;flex-direction:column}
 #viewer.on{display:flex}
 #viewer img{max-width:100%;max-height:85vh}
 #viewer .cd{color:#fff;font-size:15px;margin-top:10px}
 `);
 document.head.appendChild(css);
 const bar=el('div',{id:'rtcbar'});
 bar.innerHTML=`<button id="rtcV"></button><button id="rtcC"></button><span id="rtcst"></span>`;
 const vc=el('div',{id:'vc'});
 vc.innerHTML=`<video class="r" playsinline autoplay></video><video class="l" playsinline autoplay muted></video><div class="msg"></div>
  <div class="ctl"><button data-a="mic"></button><button data-a="cam"></button><button data-a="flip"></button><button data-a="end"></button></div>`;
 const chat=el('div',{id:'chat'});
 chat.innerHTML=`<div class="hd"><b></b><button data-a="close"></button></div><div class="list"></div>
  <div class="oncehint"></div><div class="in"><label data-a="pic"><input type="file" accept="image/*" style="display:none"><span></span></label><label data-a="once"></label>
  <input type="text" maxlength="1000" enterkeyhint="send"><button data-a="send"></button></div>`;
 const viewer=el('div',{id:'viewer'});viewer.innerHTML=`<img alt=""><div class="cd"></div>`;
 document.body.append(vc,bar,chat,viewer);
 ui={bar,vc,chat,viewer,rv:vc.querySelector('video.r'),lv:vc.querySelector('video.l'),vmsg:vc.querySelector('.msg')};
 bar.querySelector('#rtcV').onclick=()=>toggleVideo();
 bar.querySelector('#rtcC').onclick=()=>openChat(true);
 vc.querySelector('.ctl').onclick=e=>{const a=e.target.dataset.a;if(a==='mic')toggleMic();if(a==='cam')toggleCam();if(a==='flip')flip();if(a==='end')endVideo()};
 chat.querySelector('[data-a=close]').onclick=()=>openChat(false);
 chat.querySelector('[data-a=send]').onclick=sendText;
 chat.querySelector('input[type=text]').addEventListener('keydown',e=>{if(e.key==='Enter')sendText()});
 const once=chat.querySelector('[data-a=once]');once.onclick=()=>{R.onceOn=!R.onceOn;drawChat()};
 chat.querySelector('input[type=file]').onchange=e=>{const f=e.target.files&&e.target.files[0];e.target.value='';if(f)sendPhoto(f)};
 return ui;
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
 const hasRemote=ui.rv.srcObject&&ui.rv.srcObject.getVideoTracks().some(t=>t.readyState==='live');
 ui.vmsg.innerHTML=R.status==='failed'?escH(tx('failed')):(!hasRemote?escH(R.status==='connected'?(R.camOn?'…':tx('camOn')):tx('connecting')):'');
 ui.lv.style.display=R.camOn?'':'none';ui.lv.className='l'+(R.front?'':' back');
}

/* ---------- bağlantı ---------- */
function newPc(){
 const pc=new RTCPeerConnection({iceServers:ICE});
 pc.ontrack=e=>{
  const st=(ui.rv.srcObject instanceof MediaStream)?ui.rv.srcObject:new MediaStream();
  if(!st.getTracks().includes(e.track))st.addTrack(e.track);
  ui.rv.srcObject=st;
  e.track.onunmute=drawBar;e.track.onended=()=>{st.removeTrack(e.track);drawBar()};
  ui.rv.play().catch(()=>{ui.vmsg.innerHTML=`<button class="tap">${escH(tx('tapSound'))}</button>`;ui.vmsg.querySelector('.tap').onclick=()=>{ui.rv.play().catch(()=>{});drawBar()}});
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
function waitIce(pc){return new Promise(res=>{if(pc.iceGatheringState==='complete')return res();const t=setTimeout(res,3500);pc.addEventListener('icegatheringstatechange',()=>{if(pc.iceGatheringState==='complete'){clearTimeout(t);res()}})})}
function addLocal(pc){if(R.local)R.local.getTracks().forEach(t=>{try{pc.addTrack(t,R.local)}catch(e){}})}
function closePc(){try{R.dc&&R.dc.close()}catch(e){}try{R.pc&&R.pc.close()}catch(e){}R.pc=null;R.dc=null;if(ui&&ui.rv)ui.rv.srcObject=null}
async function makeOffer(){
 closePc();
 const pc=R.pc=newPc();
 setupDc(pc.createDataChannel('c',{ordered:true}));
 addLocal(pc);
 const id=uid();R.offerId=id;R.status='connecting';drawBar();
 const o=await pc.createOffer();await pc.setLocalDescription(o);await waitIce(pc);
 if(R.pc!==pc)return;
 RT.update(R.code,{ro:JSON.stringify({id,sdp:pc.localDescription.sdp})});
}
async function answer(ro){
 closePc();
 const pc=R.pc=newPc();
 addLocal(pc);
 R.answeredId=ro.id;R.status='connecting';drawBar();
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
 if(fresh){R.stop(true);R.code=code;R.seat=seat;R.polite=seat===1;R.msgs=[];R.unread=0;R.incoming={};R.offerId=null;R.answeredId=null;R.hiSeen=null;
  RT.update(code,{['h'+seat]:uid()})}
 R.mode=mode;R.partner=(players[1-seat]||{}).n||'';
 document.body.classList.add('rtc-on');
 if(seat===0){
  const hi=typeof raw.h1==='string'?raw.h1:null;
  if(!R.pc||hi!==R.hiSeen||R.pc.connectionState==='failed'){R.hiSeen=hi;makeOffer()}
  else{const ra=parseSig(raw.ra);if(ra&&ra.id===R.offerId&&R.pc.signalingState==='have-local-offer')R.pc.setRemoteDescription({type:'answer',sdp:ra.sdp}).catch(()=>{})}
 }else{
  const ro=parseSig(raw.ro);
  if(ro&&ro.id!==R.answeredId)answer(ro).catch(()=>{});
 }
 drawBar();drawChat();
};
R.stop=function(keepUi){
 closePc();
 if(R.local){R.local.getTracks().forEach(t=>t.stop());R.local=null}
 R.camOn=false;R.videoOpen=false;R.code=null;R.status='idle';
 document.body.classList.remove('rtc-on','vc-on','chat-on');
};

/* ---------- veri kanalı ---------- */
function setupDc(dc){
 R.dc=dc;
 dc.onopen=()=>{R.status='connected';drawBar();drawChat()};
 dc.onclose=()=>{drawBar()};
 dc.onmessage=async e=>{
  let m;try{m=JSON.parse(e.data)}catch(x){return}
  const pc=R.pc;if(!pc)return;
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
  else if(m.t==='p0'){const n=Math.min(m.n|0,400);if(n>0)R.incoming[m.id]={n,parts:[],once:!!m.once,got:0}}
  else if(m.t==='p'){const s=R.incoming[m.id];if(!s||typeof m.d!=='string')return;if(s.parts[m.i]==null){s.parts[m.i]=m.d;s.got++}
   if(s.got===s.n){const data=s.parts.join('');delete R.incoming[m.id];if(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(data))addMsg({id:String(m.id).slice(0,40),me:false,type:'photo',data,once:s.once})}}
  else if(m.t==='seen'){const x=R.msgs.find(y=>y.id===m.id&&y.me);if(x){x.seen=true;x.data=null;drawChat()}}
 };
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
 R.videoOpen=!R.videoOpen;document.body.classList.toggle('vc-on',R.videoOpen);
 if(R.videoOpen&&!R.local)startCam();
 drawBar();window.scrollTo(0,0);
}
function toggleMic(){if(!R.local)return;R.micOn=!R.micOn;R.local.getAudioTracks().forEach(t=>t.enabled=R.micOn);drawBar()}
function toggleCam(){if(!R.local){startCam();return}R.camOn=!R.camOn;R.local.getVideoTracks().forEach(t=>t.enabled=R.camOn);drawBar()}
async function flip(){
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
 R.camOn=false;R.videoOpen=false;document.body.classList.remove('vc-on');ui.lv.srcObject=null;drawBar();
}

/* ---------- sohbet ---------- */
function addMsg(m){R.msgs.push(m);if(R.msgs.length>300)R.msgs.shift();if(!m.me&&!R.chatOpen){R.unread++;try{navigator.vibrate&&navigator.vibrate(30)}catch(e){}}drawBar();drawChat()}
function openChat(on){R.chatOpen=on;document.body.classList.toggle('chat-on',on);if(on){R.unread=0;drawBar();drawChat();setTimeout(()=>{const i=ui.chat.querySelector('input[type=text]');i&&i.focus()},50)}}
function sendText(){
 const i=ui.chat.querySelector('input[type=text]');const v=(i.value||'').trim();if(!v)return;
 const id=uid();if(dcSend({t:'m',id,text:v})){addMsg({id,me:true,type:'text',text:v});i.value=''}
}
function sendPhoto(file){
 const img=new Image(),url=URL.createObjectURL(file);
 img.onload=()=>{
  const max=1280,sc=Math.min(1,max/Math.max(img.width,img.height));
  const c=document.createElement('canvas');c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);
  c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);
  const data=c.toDataURL('image/jpeg',0.8),id=uid(),CH=15000,n=Math.ceil(data.length/CH),once=!!R.onceOn;
  if(!dcSend({t:'p0',id,n,once}))return;
  for(let k=0;k<n;k++)dcSend({t:'p',id,i:k,d:data.slice(k*CH,(k+1)*CH)});
  addMsg({id,me:true,type:'photo',data:once?null:data,once});
 };
 img.src=url;
}
function viewOnce(m){
 if(!m.data)return;
 const v=ui.viewer;v.querySelector('img').src=m.data;v.classList.add('on');
 let s=10;const cd=v.querySelector('.cd');cd.textContent=s;
 const it=setInterval(()=>{s--;cd.textContent=s;if(s<=0)fin()},1000);
 const fin=()=>{clearInterval(it);v.classList.remove('on');v.querySelector('img').src='';m.data=null;m.seen=true;dcSend({t:'seen',id:m.id});drawChat()};
 v.onclick=fin;
}
function drawChat(){
 if(!ui)return;
 const c=ui.chat;
 c.querySelector('.hd b').textContent=R.partner||tx('chat');
 c.querySelector('[data-a=close]').textContent=tx('close');
 c.querySelector('[data-a=send]').textContent=tx('send');
 c.querySelector('[data-a=pic] span').textContent='📷';c.querySelector('[data-a=pic]').title=tx('photo');
 const once=c.querySelector('[data-a=once]');once.textContent='1×';once.title=tx('once');once.className=R.onceOn?'on':'';
 c.querySelector('.oncehint').textContent=R.onceOn?'1× '+tx('once'):'';
 c.querySelector('input[type=text]').placeholder=tx('typeMsg');
 const open=R.dc&&R.dc.readyState==='open';
 c.querySelector('[data-a=send]').disabled=!open;
 const list=c.querySelector('.list');
 if(!R.msgs.length){list.innerHTML=`<p class="empty">${escH(open?tx('empty'):tx('connecting'))}</p>`;return}
 list.innerHTML='';
 R.msgs.forEach(m=>{
  const b=el('div',{class:'b '+(m.me?'me':'th')});
  if(m.type==='text')b.textContent=m.text;
  else if(m.me)b.innerHTML=m.once?`📷 ${escH(tx('once'))}<div class="meta">${m.seen?escH(tx('seen')):''}</div>`:`<img alt="" src="${m.data}">`;
  else if(m.once){if(m.data){b.classList.add('lock');b.textContent='🔒 '+tx('tapView');b.onclick=()=>viewOnce(m)}else b.innerHTML=`<span class="meta">${escH(tx('opened'))}</span>`}
  else b.innerHTML=`<img alt="" src="${m.data}">`;
  list.appendChild(b);
 });
 list.scrollTop=list.scrollHeight;
}
})();
