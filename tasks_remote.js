/* Uzaktan modlar için gece senaryosu (Görüntülü + Mesaj), TR + EN.
   "!" giydirme (kadına ilk cesaret), "*" kıyafet üstündeyken, "@" 1. aşama: kıyafetle oyun,
   "%" 2. aşama: parça parça soyma, "&" 3. aşama: çıplak final, "~" seçilen parçayı çıkar, "^" serpiştirilen özel görev. */
(function(){
const V=TASKS.call,VE=TASKS_EN.call,M=TASKS.msg,ME=TASKS_EN.msg;
const VD=(l,a,b)=>{V.dare[l].push(a);VE.dare[l].push(b)};
const MD=(l,a,b)=>{M.dare[l].push(a);ME.dare[l].push(b)};

/* ================= GÖRÜNTÜLÜ ================= */
/* Giydirme */
VD(2,"k>e!|{p} bir elbise seçsin; giy ve kameraya bir tur dön.","k>e!|Let {p} pick a dress; put it on and do a spin for the camera.");
VD(2,"k>e!|{p}'nin seçtiği elbiseyi giy ve kameraya yakından göster.","k>e!|Put on the dress {p} picks and show it to him up close on camera.");
VD(3,"k>e!|{p}'nin seçtiği elbiseyi giy, altına onun söylediği renkte iç çamaşırı giy ve kameraya gel.","k>e!|Put on the dress {p} picks, with underwear in the colour he names underneath, and come back to the camera.");
VD(3,"k>e!|{p}'nin seçtiği elbiseyi giy ve altına hiçbir şey giyme; kameraya yavaşça dön.","k>e!|Put on the dress {p} picks with nothing underneath and turn slowly for the camera.");
VD(3,"k>e!|{p}'nin seçtiği kısa elbiseyi giy ve kameranın önünde bir tur at.","k>e!|Put on the short dress {p} picks and walk a lap in front of the camera.");
VD(4,"k>e!|{p}'nin seçtiği elbiseyi altında hiçbir şey olmadan giy ve kamerayı yatağa yerleştir.","k>e!|Put on the dress {p} picks with nothing underneath and set the camera up on the bed.");
VD(4,"k>e!|{p}'nin seçtiği elbiseyi ve onun seçtiği renkte iç çamaşırı giy; kameraya yakın otur.","k>e!|Put on the dress {p} picks and underwear in the colour he picks; sit close to the camera.");
VD(4,"k>e!|{p}'nin seçtiği iç çamaşırını giy, üstüne sadece elbiseni al ve fermuarını açık bırak.","k>e!|Put on the lingerie {p} picks, just your dress over it, and leave the zip open.");
/* Kıyafet üstündeyken */
VD(3,"k*|O elbiseyle kameraya sırtını dön ve omzunun üstünden ona bak.","k*|In that dress, turn your back to the camera and look at him over your shoulder.");
VD(3,"e>k*|{p}'den elbisenin bir askısını kamerada yavaşça indirmesini iste.","e>k*|Ask {p} to slowly slide one strap of her dress down on camera.");
VD(4,"k*|O elbiseyle yatağa uzan ve elini elbisenin altına sok; {p} izlesin.","k*|Lie on the bed in that dress and slide your hand under it while {p} watches.");
VD(4,"e>k*|{p}'ye o elbiseyle kameranın önünde bacaklarını yavaşça açmasını söyle.","e>k*|Tell {p} to slowly open her legs in front of the camera in that dress.");
/* 1. aşama */
VD(3,"k>e@|O elbiseyle kameraya yaklaş, dudaklarını ısır ve {p}'ye ne düşündüğünü sor.","k>e@|Come close to the camera in that dress, bite your lip and ask {p} what he's thinking.");
VD(3,"e>k@|{p}'ye elbisesinin içinde nasıl göründüğünü anlat; o da kameraya dönerek dinlesin.","e>k@|Tell {p} how she looks in that dress while she turns around for the camera.");
VD(4,"k>e@|O elbiseyle kameraya dönük dans et; şarkı bitince eteğini yavaşça kaldır.","k>e@|Dance for the camera in that dress; when the song ends, slowly lift the hem.");
VD(4,"e>k@|{p}'ye elbisenin altından kendine dokunmasını söyle ve tepkisini izle.","e>k@|Tell {p} to touch herself under the dress and watch her reaction.");
VD(4,"k>e@|O elbiseyle kamerayı bacaklarına çevir ve iç bacağını yavaşça okşa.","k>e@|In that dress, point the camera at your legs and slowly stroke your inner thigh.");
VD(4,"e>k@|{p}'ye pantolonunu kamerada açıp kendine dokunduğunu göster.","e>k@|Show {p} on camera as you undo your pants and touch yourself.");
/* 2. aşama: soyma */
VD(3,"k>e%|Kamerada üstündekini yavaşça çıkar ve omuzlarından kaydır.","k>e%|On camera, slowly take off your top and slide it off your shoulders.");
VD(3,"e>k%|Kamerada tişörtünü çıkar ve {p}'ye göğsünü göster.","e>k%|Take off your T-shirt on camera and show {p} your chest.");
VD(3,"k>e%|Sutyenini kamerada arkadan aç ve askıları yavaşça indir.","k>e%|Unhook your bra on camera and slowly slide the straps down.");
VD(3,"e>k%|Pantolonunu kamerada çıkar ve sadece iç çamaşırıyla kal.","e>k%|Take off your pants on camera and stay in just your underwear.");
VD(4,"k>e%|Kamerada üstündekileri tek tek çıkar ve iç çamaşırınla bir tur dön.","k>e%|Take your clothes off one by one on camera and do a spin in your underwear.");
VD(4,"e>k%|Kamerada iç çamaşırını yavaşça indir ve {p}'ye kendini göster.","e>k%|Slowly pull down your underwear on camera and show {p} yourself.");
VD(4,"k>e%|Sutyenini çıkar ve kameraya yaklaş.","k>e%|Take off your bra and come close to the camera.");
VD(4,"k>e%|Külotunu en son parça olarak yavaşça indir ve kameraya ver.","k>e%|Slowly pull your panties down as the last piece and hand them to the camera.");
/* 3. aşama: çıplak final */
VD(3,"k>e&|Çıplak olarak yatağa uzan ve {p}'ye nereden başlaması gerektiğini göster.","k>e&|Lie naked on the bed and show {p} where he'd start.");
VD(3,"e>k&|Çıplak olarak kendine dokun ve {p}'ye ona ne yapacağını anlat.","e>k&|Touch yourself naked and tell {p} what you'd do to her.");
VD(4,"k>e&|Bacaklarını kameraya aç ve {p}'nin söylediği tempoda kendine dokun.","k>e&|Open your legs to the camera and touch yourself at the pace {p} sets.");
VD(4,"e>k&|{p}'yi izlerken kendine dokun ve ona nasıl girmek istediğini anlat.","e>k&|Touch yourself while watching {p} and tell her how you'd want to enter her.");
VD(4,"k>e&|Oyuncağın varsa kullan, yoksa parmaklarınla devam et; {p} izlesin.","k>e&|Use a toy if you have one, or your fingers; let {p} watch.");
VD(4,"e>k&|Birlikte geri sayın ve aynı anda bitirmeye çalışın.","e>k&|Count down together and try to come at the same time.");
/* Seçilen parçayı çıkar */
VD(2,"~|{p} üzerinden bir parça seçsin; kamerada yavaşça çıkar.","~|Let {p} pick one piece of your clothing; take it off slowly on camera.");
VD(3,"~|{p}'nin seçtiği parçayı çıkar ve kameraya fırlat.","~|Take off the piece {p} picks and toss it at the camera.");
VD(3,"~|{p}'nin seçtiği iki parçayı müzikle çıkar.","~|Take off two pieces {p} picks to music.");
VD(4,"~|{p}'nin seçtiği son parçayı da çıkar ve öyle kal.","~|Take off the last piece {p} picks and stay that way.");
/* Serpiştirilen */
VD(3,"k^|Kameraya sırtını dön ve kalçanı müzikle yavaşça hareket ettir.","k^|Turn your back to the camera and move your hips slowly to music.");
VD(3,"e^|Kamerada tişörtünü yavaşça çıkar ve kollarını kas.","e^|Slowly take off your shirt on camera and flex.");
VD(4,"k^|Çıplak olarak kameraya sırtı dönük dans et.","k^|Dance naked for the camera with your back to it.");
VD(4,"^|Aramadan sonra {p}'ye çıplak bir fotoğraf gönder (yüzsüz, tek seferlik).","^|After the call, send {p} a nude photo (no face, view-once).");

/* ================= MESAJ ================= */
/* Giydirme */
MD(2,"k>e!|{p} bir elbise seçsin; giy ve bir fotoğrafını gönder.","k>e!|Let {p} pick a dress; put it on and send him a photo.");
MD(2,"k>e!|{p}'nin seçtiği elbiseyi giy ve boydan bir fotoğraf gönder.","k>e!|Put on the dress {p} picks and send a full-length photo.");
MD(3,"k>e!|{p}'nin seçtiği elbiseyi giy, altına onun söylediği renkte iç çamaşırı giy; elbiseyle bir fotoğraf gönder.","k>e!|Put on the dress {p} picks, with underwear in the colour he names underneath; send a photo in the dress.");
MD(3,"k>e!|{p}'nin seçtiği elbiseyi altında hiçbir şey olmadan giy ve ona yaz.","k>e!|Put on the dress {p} picks with nothing underneath and text him about it.");
MD(3,"k>e!|{p}'nin seçtiği kısa elbiseyi giy ve aynada bir fotoğraf çekip gönder.","k>e!|Put on the short dress {p} picks and send him a mirror photo.");
MD(4,"k>e!|{p}'nin seçtiği elbiseyi ve onun seçtiği renkte iç çamaşırı giy; elbisenin ucunu kaldırıp rengi gösteren bir fotoğraf gönder.","k>e!|Put on the dress {p} picks and underwear in the colour he picks; send a photo lifting the hem to show the colour.");
MD(4,"k>e!|{p}'nin seçtiği elbiseyi altında hiçbir şey olmadan giy ve yatakta bir fotoğraf gönder (yüzsüz).","k>e!|Put on the dress {p} picks with nothing underneath and send a photo on the bed (no face).");
/* Kıyafet üstündeyken */
MD(3,"k*|O elbiseyle arkadan bir fotoğraf gönder.","k*|Send a photo of yourself from behind in that dress.");
MD(3,"e>k*|{p}'den o elbiseyle oturduğu bir fotoğraf iste ve ona ne düşündüğünü yaz.","e>k*|Ask {p} for a photo of her sitting in that dress and write what you think.");
MD(4,"k*|O elbiseyle yatakta bacaklarını açtığın bir ima fotoğrafı gönder (yüzsüz).","k*|Send a teasing photo in that dress on the bed with your legs apart (no face).");
MD(4,"e>k*|{p}'ye o elbisenin altına elini sokmasını ve bunu sesli mesajla anlatmasını söyle.","e>k*|Tell {p} to slide her hand under that dress and describe it in a voice note.");
/* 1. aşama */
MD(3,"k>e@|O elbiseyle bir selfie gönder ve altına 'şimdi yanında olsam ne yapardın?' yaz.","k>e@|Send a selfie in that dress captioned \"what would you do if I were next to you right now?\"");
MD(3,"e>k@|{p}'ye o elbiseyle onu görünce ne yapmak istediğini sesli mesajla anlat.","e>k@|Tell {p} in a voice note what you'd want to do seeing her in that dress.");
MD(4,"k>e@|O elbiseyle askısını indirdiğin bir fotoğraf gönder (yüzsüz).","k>e@|Send a photo in that dress with a strap pulled down (no face).");
MD(4,"e>k@|{p}'ye ona elbisenin altından nasıl dokunacağını adım adım yaz.","e>k@|Write {p} step by step how you'd touch her under that dress.");
MD(4,"k>e@|O elbiseyle kendine dokunurken çekilmiş bir ses kaydı gönder.","k>e@|Send a voice note of you touching yourself in that dress.");
/* 2. aşama: soyma */
MD(3,"k>e%|Üstünü çıkarırken çekilmiş bir fotoğraf gönder (yüzsüz).","k>e%|Send a photo taken as you take off your top (no face).");
MD(3,"e>k%|Tişörtünü çıkar ve üstsüz bir fotoğraf gönder.","e>k%|Take off your T-shirt and send a shirtless photo.");
MD(3,"k>e%|İç çamaşırınla bir fotoğraf gönder ve {p}'ye sıradaki parçayı sor.","k>e%|Send a photo in your underwear and ask {p} which piece comes off next.");
MD(4,"k>e%|Sutyenini çıkar ve bir fotoğraf gönder (yüzsüz, tek seferlik).","k>e%|Take off your bra and send a photo (no face, view-once).");
MD(4,"e>k%|İç çamaşırınla ayakta bir fotoğraf gönder.","e>k%|Send a standing photo in your underwear.");
MD(4,"k>e%|Külotunu en son parça olarak çıkar ve onu gösteren bir fotoğraf gönder.","k>e%|Take off your panties as the last piece and send a photo of them.");
MD(4,"e>k%|İç çamaşırını da çıkar ve {p}'ye şu an ne kadar istediğini yaz.","e>k%|Take your underwear off too and tell {p} how much you want her right now.");
/* 3. aşama: çıplak final */
MD(3,"k>e&|Çıplak olduğunu yaz ve {p}'ye nereden başlaması gerektiğini anlat.","k>e&|Tell {p} you're naked and where he should start.");
MD(3,"e>k&|Çıplak bir fotoğraf gönder (yüzsüz, tek seferlik).","e>k&|Send a nude photo (no face, view-once).");
MD(4,"k>e&|Kendine dokunurken çekilmiş bir ses kaydı gönder ve sonunda ismini söyle.","k>e&|Send a voice note of you touching yourself, saying his name at the end.");
MD(4,"e>k&|{p}'ye onu nasıl alacağını sesli mesajla, açık açık anlat.","e>k&|Tell {p} openly in a voice note how you'd take her.");
MD(4,"k>e&|Çıplak bir video gönder (yüzsüz, tek seferlik).","k>e&|Send a nude video (no face, view-once).");
MD(4,"e>k&|Bitirdiğinde ona haber ver ve nasıl olduğunu yaz.","e>k&|Let her know when you finish and write how it was.");
/* Seçilen parçayı çıkar */
MD(2,"~|{p} üzerinden bir parça seçsin; onu çıkar ve fotoğrafını gönder.","~|Let {p} pick one piece of your clothing; take it off and send a photo.");
MD(3,"~|{p}'nin seçtiği parçayı çıkarırken çekilmiş bir fotoğraf gönder.","~|Send a photo taken as you remove the piece {p} picked.");
MD(4,"~|{p}'nin seçtiği son parçayı da çıkar ve ona yaz.","~|Take off the last piece {p} picks and text him.");
/* Serpiştirilen */
MD(3,"k^|Sırtın dönük, iç çamaşırınla bir fotoğraf gönder.","k^|Send a photo from behind in your underwear.");
MD(3,"e^|Aynada üstsüz bir fotoğraf gönder.","e^|Send a shirtless mirror photo.");
MD(4,"^|{p}'ye ismini fısıldayıp inlediğin kısa bir ses kaydı gönder.","^|Send {p} a short voice note whispering their name and moaning.");
MD(4,"^|{p}'ye bu gece ona ne yapacağını tek bir cümleyle yaz, sonra bir fotoğraf gönder.","^|Write {p} one sentence about what you'll do to them tonight, then send a photo.");
})();
