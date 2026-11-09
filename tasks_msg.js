/* Mesaj modu: iki telefon, görevler mesajla / sesle / fotoğrafla yapılır (uygulama dışında, kendi sohbetinizde).
   Etiketler: "e|" "k|" aktif oyuncu; "k>e|" aktif kadın partner erkek vb. */
(function(){
const mk=()=>({truth:{1:[],2:[],3:[],4:[]},dare:{1:[],2:[],3:[],4:[]}});
TASKS.msg=mk();TASKS_EN.msg=mk();
const D=(l,a,b)=>{TASKS.msg.dare[l].push(a);TASKS_EN.msg.dare[l].push(b)};
const T=(l,a,b)=>{TASKS.msg.truth[l].push(a);TASKS_EN.msg.truth[l].push(b)};

/* ===== 1: ısınma ===== */
T(1,"Cevabını {p}'ye mesajla yaz: Seni en çok güldüren anımız neydi?","Answer by message to {p}: what's the moment of ours that made you laugh most?");
T(1,"Cevabını sesli mesajla gönder: Beni ilk gördüğünde ne düşündün?","Answer with a voice note: what did you think when you first saw me?");
T(1,"Şu an ne yaptığını ve beni düşündüğün bir şeyi yaz.","Write what you're doing now and one thing you're thinking about me.");
T(1,"Bu hafta bana en çok neyi söylemek istedin, yaz.","Write what you most wanted to tell me this week.");
T(1,"Sesli mesajla bana en sevdiğin şarkıyı ve nedenini anlat.","Tell me your favourite song and why, by voice note.");
T(1,"Beni hangi üç kelimeyle anlatırsın? Yaz.","Describe me in three words. Write them.");
T(1,"Bir sonraki buluşmamızda ilk ne yapacağımızı yaz.","Write what we'll do first when we next meet.");
T(1,"Sesinle bana 'günaydın' ya da 'iyi geceler' de, ama en tatlı haliyle.","Say good morning or good night to me by voice, in your sweetest way.");
T(1,"Birlikte yaptığımız en güzel şeyi tek cümleyle yaz.","Write the best thing we've done together in one sentence.");
T(1,"Beni en çok özlediğin saati ve nedenini yaz.","Write the hour you miss me most and why.");
D(1,"Şu an bulunduğun yerden bir fotoğraf gönder ve ne düşündüğünü yaz.","Send a photo of where you are now and write what you're thinking.");
D(1,"Gülümsediğin bir selfie gönder.","Send a selfie where you're smiling.");
D(1,"{p}'ye 5 emoji ile bugünkü ruh halini anlat.","Tell {p} your mood today using 5 emojis.");
D(1,"{p}'ye en sevdiğin ortak fotoğrafımızı gönder ve nedenini yaz.","Send {p} your favourite photo of us and say why.");
D(1,"{p}'ye şiir gibi bir mesaj yaz (4 satır).","Write {p} a poem-like message (4 lines).");
D(1,"{p}'ye ellerinin fotoğrafını gönder.","Send {p} a photo of your hands.");
D(1,"{p}'ye 10 saniyelik bir sesli mesajla bir şarkı söyle.","Sing {p} a song in a 10-second voice note.");
D(1,"{p}'ye gökyüzünün ya da pencerenden görünen manzaranın fotoğrafını gönder.","Send {p} a photo of the sky or your window view.");
D(1,"{p}'ye şu an giydiğin kıyafetin fotoğrafını gönder.","Send {p} a photo of what you're wearing now.");
D(1,"{p}'ye ne kadar özlediğini bir ses kaydıyla söyle.","Tell {p} how much you miss them in a voice note.");
D(1,"{p}'ye kalp şeklinde bir şey çizip fotoğrafını gönder.","Draw a heart and send {p} a photo of it.");
D(1,"{p}'ye bu akşam için romantik bir plan yaz.","Write {p} a romantic plan for tonight.");
D(1,"{p}'ye saçlarının ya da yüzünün yakın çekim fotoğrafını gönder.","Send {p} a close-up photo of your hair or face.");
D(1,"{p}'ye 'seni seviyorum'u 3 dilde yaz.","Write \"I love you\" to {p} in 3 languages.");
D(1,"e|{p}'ye kendi kolunun kasını gösteren bir fotoğraf gönder.","e|Send {p} a photo flexing your arm.");
D(1,"k|{p}'ye en güzel gülüşünle bir selfie gönder.","k|Send {p} a selfie with your best smile.");

/* ===== 2: ateşli ===== */
T(2,"Cevabını mesajla yaz: Seni en çok hangi dokunuşum açar?","Answer by message: which of my touches turns you on most?");
T(2,"Sesli mesajla bana bu akşam ne yapmak istediğini anlat.","Tell me by voice note what you want to do tonight.");
T(2,"Beni hayal ederken en çok hangi anımızı düşünürsün? Yaz.","Write which moment of ours you imagine most.");
T(2,"Bana yazamadan duramadığın bir an oldu mu, anlat.","Tell me about a moment you couldn't help messaging me.");
T(2,"Yanında olsam ilk nereme dokunurdun? Yaz.","If I were with you, where would you touch me first? Write it.");
T(2,"Bana en çok hangi kıyafetimle gelmemi isterdin, yaz.","Write what outfit you'd most want me to arrive in.");
T(2,"Beni nasıl öpmek istediğini bir sesli mesajla tarif et.","Describe by voice note how you want to kiss me.");
T(2,"Bugün bana ne düşündüğünü, tam olarak yaz.","Write exactly what you thought about me today.");
D(2,"{p}'ye şu an üzerindekileri ve ne hissettirdiğini yaz.","Write {p} what you're wearing now and how it feels.");
D(2,"{p}'ye omzunun ya da boynunun fotoğrafını gönder.","Send {p} a photo of your shoulder or neck.");
D(2,"{p}'ye ona fısıldar gibi 15 saniyelik bir sesli mesaj bırak.","Leave {p} a 15-second voice note as if whispering to them.");
D(2,"{p}'ye bu akşam onu nasıl öpeceğini detaylıca yaz.","Write {p} in detail how you'll kiss them tonight.");
D(2,"{p}'ye aynada çektiğin bir fotoğraf gönder (giyinik, çekici bir pozda).","Send {p} a mirror photo (clothed, in an attractive pose).");
D(2,"{p}'ye bacaklarının ya da ayaklarının fotoğrafını gönder.","Send {p} a photo of your legs or feet.");
D(2,"{p}'ye dudaklarının yakın çekim fotoğrafını gönder.","Send {p} a close-up photo of your lips.");
D(2,"{p}'ye yataktan çektiğin bir fotoğraf gönder.","Send {p} a photo taken from your bed.");
D(2,"{p}'ye nefesini duyuracak şekilde bir sesli mesaj bırak.","Leave {p} a voice note where they can hear your breathing.");
D(2,"{p}'ye en çok neresini öpmek istediğini yaz.","Write {p} where you most want to kiss them.");
D(2,"{p}'ye bir sonraki buluşmanızda onu nasıl soyacağını yaz (yavaş yavaş).","Write {p} how you'll undress them slowly next time you meet.");
D(2,"{p}'ye göğüs hizasından boyuna kadar çekilmiş bir fotoğraf gönder (giyinik).","Send {p} a photo from chest to neck (clothed).");
D(2,"e|{p}'ye gömleksiz bir fotoğraf gönder (yüz yok).","e|Send {p} a shirtless photo (no face).");
D(2,"k|{p}'ye omzu açık bir üstle fotoğraf gönder.","k|Send {p} a photo in an off-the-shoulder top.");
D(2,"e|{p}'ye 'seni istiyorum' diye mırıldanan bir ses kaydı gönder.","e|Send {p} a voice note murmuring \"I want you\".");
D(2,"k|{p}'ye saçını kaldırıp boynunu gösteren bir fotoğraf gönder.","k|Send {p} a photo lifting your hair to show your neck.");

/* ===== 3: çılgın ===== */
T(3,"Mesajla yaz: Seni en çok hangi sözüm heyecanlandırır?","Write: which of my words excites you most?");
T(3,"Sesli mesajla bana bu gece ne yapmak istediğini anlat, detaylı.","Tell me by voice note what you want to do tonight, in detail.");
T(3,"Yaz: Beni nasıl soymak isterdin?","Write: how would you want to undress me?");
T(3,"Sesli mesajla bana seni en çok nerenden öpmemi istediğini söyle.","Tell me by voice note where you most want me to kiss you.");
T(3,"Yaz: bu akşam hangi 3 şeyi yaptırırdın bana?","Write: which 3 things would you have me do tonight?");
T(3,"Bana yazamadan durulmayan bir fantezini 3 cümleyle anlat.","Describe a fantasy you can't stop thinking about in 3 sentences.");
D(3,"{p}'ye yatakta yatarken bir fotoğraf gönder (iç çamaşırı ya da pijama).","Send {p} a photo lying in bed (underwear or pyjamas).");
D(3,"{p}'ye ona ne yapmak istediğini 5 cümleyle yaz.","Write {p} five sentences about what you want to do to them.");
D(3,"{p}'ye bacaklarının ve kalçanın yan profilini gönder (giyinik).","Send {p} a side profile of your legs and hips (clothed).");
D(3,"{p}'ye sırtının çıplak bir fotoğrafını gönder (yüzsüz).","Send {p} a photo of your bare back (no face).");
D(3,"{p}'ye ona fısıldadığın 30 saniyelik bir ses kaydı bırak.","Leave {p} a 30-second whispering voice note.");
D(3,"{p}'ye ayna karşısında iç çamaşırınla bir fotoğraf gönder (yüzsüz).","Send {p} a mirror photo in your underwear (no face).");
D(3,"{p}'ye 'ben yanında olsam' diye başlayan 4 cümle yaz.","Write {p} 4 sentences starting with \"if I were next to you\".");
D(3,"{p}'ye banyodan havluyla çıktığın bir fotoğraf gönder (yüzsüz).","Send {p} a photo in a towel after the shower (no face).");
D(3,"{p}'ye bu gece onun yanında olduğunu hayal ederek bir ses mesajı bırak.","Leave {p} a voice note imagining you're with them tonight.");
D(3,"{p}'ye bacak arası bölgeni giyinik olarak kapatıp bir fotoğraf gönder (yüzsüz).","Send {p} a photo of your hips, clothed (no face).");
D(3,"{p}'ye ona en çok hangi yerinden dokunmak istediğini yaz.","Write {p} where you most want to touch them.");
D(3,"{p}'ye kendini nasıl hazırladığını anlatan bir mesaj yaz.","Write {p} a message about how you're getting ready for them.");
D(3,"e|{p}'ye karnının ve belinin fotoğrafını gönder.","e|Send {p} a photo of your stomach and waist.");
D(3,"k|{p}'ye üst çamaşırınla bir fotoğraf gönder (yüzsüz).","k|Send {p} a photo in your bra (no face).");
D(3,"e|{p}'ye pantolonunun üstünden kasığını ima eden bir fotoğraf gönder (giyinik).","e|Send {p} a clothed photo hinting at your hips.");
D(3,"k|{p}'ye bacaklarını yatakta uzatmış bir fotoğraf gönder.","k|Send {p} a photo with your legs stretched out on the bed.");

/* ===== 4: sınırsız ===== */
T(4,"Yaz: Beni düşünerek kendine dokunduğun oldu mu, ne zaman?","Write: have you touched yourself thinking of me, and when?");
T(4,"Sesli mesajla bana beni nasıl istediğini anlat, açık açık.","Tell me by voice note how you want me, openly.");
T(4,"Yaz: yatakta bana ilk ne yaptırırdın?","Write: what would you have me do first in bed?");
T(4,"Sesli mesajla bu gece benden duymak istediğin her şeyi söyle.","Say by voice note everything you want to hear from me tonight.");
T(4,"Yaz: en çok hangi pozisyonu denemek istersin ve neden?","Write: which position do you most want to try and why?");
T(4,"Mesajla itiraf et: seni en çok ne açıyor?","Confess by message: what turns you on most?");
T(4,"Yaz: bu geceyi birlikte geçirsek ne olurdu, dakika dakika.","Write: what would happen if we spent tonight together, minute by minute.");
D(4,"{p}'ye ona ne yapmak istediğini sesli mesajla anlat, açık açık.","Tell {p} by voice note what you want to do to them, openly.");
D(4,"{p}'ye yüzün görünmeden çıplak bir fotoğraf gönder (tek seferlik görüntülenebilir).","Send {p} a nude photo with no face visible (view-once).");
D(4,"{p}'ye iç çamaşırınla yatakta çektiğin bir video gönder (yüzsüz, tek seferlik).","Send {p} a video in your underwear on the bed (no face, view-once).");
D(4,"{p}'ye şu an ne kadar hazır olduğunu yaz.","Write {p} how ready you are right now.");
D(4,"{p}'ye ona nasıl dokunmak istediğini adım adım yaz.","Write {p} step by step how you want to touch them.");
D(4,"{p}'ye inleyen bir ses kaydı gönder.","Send {p} a voice note with a moan.");
D(4,"{p}'ye kendine dokunurken ismini söylediğin bir ses mesajı bırak.","Leave {p} a voice note saying their name while touching yourself.");
D(4,"{p}'ye bu gece nasıl sevişeceğinizi 6 cümleyle anlat.","Describe to {p} in 6 sentences how you'll make love tonight.");
D(4,"{p}'ye vücudunun en çok sevdiğin yerinin yakın çekimini gönder (yüzsüz, tek seferlik).","Send {p} a close-up of your favourite part of your body (no face, view-once).");
D(4,"{p}'ye bacak aranı kıyafetin üstünden ima eden bir fotoğraf gönder.","Send {p} a clothed photo hinting at what's between your legs.");
D(4,"{p}'ye ona fantezini bir hikâye gibi 8 cümleyle yaz.","Write {p} your fantasy as an 8-sentence story.");
D(4,"{p}'ye seks sırasında ne duymak istediğini sesli mesajla söyle.","Tell {p} by voice note what you want to hear during sex.");
D(4,"{p}'ye bu gece ona ne yapacağını bir komut listesi gibi yaz.","Write {p} what you'll do to them tonight as a command list.");
D(4,"{p}'nin yazdığı her şeye 5 dakika boyunca 'evet' diye cevap ver ve yap.","Answer yes to everything {p} writes for 5 minutes, and do it.");
D(4,"k>e|{p}'ye göğüslerinin fotoğrafını gönder (yüzsüz, tek seferlik).","k>e|Send {p} a photo of your breasts (no face, view-once).");
D(4,"k>e|{p}'ye ona ağzınla ne yapmak istediğini sesli mesajla anlat.","k>e|Tell {p} by voice note what you want to do to them with your mouth.");
D(4,"k>e|{p}'ye penisini nasıl hayal ettiğini yaz.","k>e|Write {p} how you imagine his penis.");
D(4,"e>k|{p}'ye ona dilinle ne yapmak istediğini sesli mesajla anlat.","e>k|Tell {p} by voice note what you want to do to her with your tongue.");
D(4,"e>k|{p}'ye ereksiyonunu ima eden bir fotoğraf gönder (giyinik, yüzsüz).","e>k|Send {p} a clothed photo hinting at your erection (no face).");
D(4,"e>k|{p}'ye onun göğüslerini nasıl öpeceğini yaz.","e>k|Write {p} how you'll kiss her breasts.");
D(4,"e>e|{p}'ye ona ne yapmak istediğini sesli mesajla anlat.","e>e|Tell {p} by voice note what you want to do to him.");
D(4,"k>k|{p}'ye ona ne yapmak istediğini sesli mesajla anlat.","k>k|Tell {p} by voice note what you want to do to her.");
})();
