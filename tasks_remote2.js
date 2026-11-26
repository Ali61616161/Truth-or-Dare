/* Uzaktan modlar: görsel ağırlıklı ek görevler, özellikle erkeğe (TR + EN). */
(function(){
const V=TASKS.call,VE=TASKS_EN.call,M=TASKS.msg,ME=TASKS_EN.msg;
const VD=(l,a,b)=>{V.dare[l].push(a);VE.dare[l].push(b)};
const MD=(l,a,b)=>{M.dare[l].push(a);ME.dare[l].push(b)};

/* ================= GÖRÜNTÜLÜ: ERKEK ================= */
VD(1,"e|Kameraya en çekici bakışını at ve 10 saniye tut.","e|Give the camera your most attractive look and hold it for 10 seconds.");
VD(1,"e|{p}'ye kollarını sıvayıp kollarını göster.","e|Roll up your sleeves and show {p} your forearms.");
VD(1,"e|Kameraya yaklaşıp sadece dudaklarını göster ve bir öpücük gönder.","e|Come close to the camera, show only your lips and blow a kiss.");
VD(1,"e|{p}'ye ellerini göster, sonra yavaşça yüzünde gezdir.","e|Show {p} your hands, then slowly run them over your face.");
VD(1,"e|{p}'nin seçtiği bir tişörtü giy ve kameraya bir tur dön.","e|Put on a T-shirt {p} picks and do a spin for the camera.");
VD(2,"e|Gömleğinin düğmelerini kamerada tek tek aç.","e|Undo your shirt buttons one by one on camera.");
VD(2,"e|Tişörtünü yukarı kaldır ve karnını göster.","e|Lift your T-shirt and show your stomach.");
VD(2,"e|Kameraya dönük şınav çek, en sonunda gülümse.","e|Do push-ups facing the camera and smile at the end.");
VD(2,"e|Yatağa uzan, kamerayı yukarıdan tut ve {p}'ye bak.","e|Lie on the bed, hold the camera above you and look at {p}.");
VD(2,"e|Kemerini yavaşça çıkar ve bir kenara bırak.","e|Slowly take off your belt and set it aside.");
VD(2,"e|Kameraya yakın dur, boynunu ve köprücük kemiğini göster.","e|Stand close to the camera and show your neck and collarbone.");
VD(3,"e|Üstsüz olarak kameraya dön ve ellerini göğsünde gezdir.","e|Turn to the camera shirtless and run your hands over your chest.");
VD(3,"e|Pantolonunu yavaşça indir ve iç çamaşırınla bir tur dön.","e|Slowly pull your pants down and do a spin in your underwear.");
VD(3,"e|İç çamaşırınla yatağa uzan ve kamerayı vücudunda aşağı doğru gezdir.","e|Lie on the bed in your underwear and move the camera slowly down your body.");
VD(3,"e|Kameraya sırtını dön ve iç çamaşırınla omzunun üstünden bak.","e|Turn your back to the camera in your underwear and look over your shoulder.");
VD(3,"e|İç çamaşırının kenarını kamerada yavaşça aşağı çek ve dur.","e|Slowly pull the waistband of your underwear down on camera and stop.");
VD(3,"e|Duştan yeni çıkmış gibi beline havlu sarıp kameraya gel.","e|Come to the camera with a towel around your waist as if fresh from the shower.");
VD(4,"e|İç çamaşırını çıkar ve kameraya yavaşça dön.","e|Take off your underwear and turn slowly to the camera.");
VD(4,"e|{p} izlerken penisini yavaşça okşa.","e|Slowly stroke your penis while {p} watches.");
VD(4,"e|Kamerayı bacaklarının arasına çevir ve {p}'nin söylediği hızda kendine dokun.","e|Point the camera between your legs and touch yourself at the speed {p} sets.");
VD(4,"e|Yatağa sırtüstü uzan, kamerayı yukarıdan tut ve kendine dokunurken {p}'ye bak.","e|Lie on your back, hold the camera above you and look at {p} while you touch yourself.");
VD(4,"e|Elini yağla ve kamerada yavaşça mastürbasyon yap.","e|Oil your hand and slowly masturbate on camera.");
VD(4,"e|Boşalmaya yaklaşınca dur, 10 saniye bekle ve kameraya bakarak yeniden başla.","e|Stop when you're close, wait 10 seconds and start again looking into the camera.");
VD(4,"e|Kameranın önünde bitir ve {p}'ye göster.","e|Finish in front of the camera and show {p}.");

/* ================= GÖRÜNTÜLÜ: KADIN ================= */
VD(1,"k|Saçını aç, kameraya yaklaş ve yavaşça geri at.","k|Let your hair down, come close to the camera and slowly flip it back.");
VD(1,"k|Kameraya dudaklarını yaklaştır ve bir öpücük bırak.","k|Bring your lips to the camera and leave a kiss.");
VD(2,"k|Kameraya dönük bacak bacak üstüne at ve yavaşça değiştir.","k|Cross your legs facing the camera and slowly switch them.");
VD(2,"k|Kameraya sırtını dön ve saçını kaldırıp enseni göster.","k|Turn your back to the camera and lift your hair to show your nape.");
VD(3,"k|İç çamaşırınla kameraya dön ve ellerini belinden kalçana kaydır.","k|Turn to the camera in your underwear and slide your hands from your waist to your hips.");
VD(3,"k|Yatağa yüzüstü uzan, kamerayı yanına koy ve kalçanı hafifçe kaldır.","k|Lie face down on the bed, put the camera beside you and lift your hips a little.");
VD(4,"k|Kamerayı bacaklarının arasına çevir ve {p}'nin söylediği hızda kendine dokun.","k|Point the camera between your legs and touch yourself at the speed {p} sets.");
VD(4,"k|Göğüslerini ellerinle sık ve {p}'ye bakarak yavaşça okşa.","k|Squeeze your breasts and caress them slowly while looking at {p}.");

/* ================= MESAJ: ERKEK ================= */
MD(1,"e|{p}'ye şu anki halinden bir selfie gönder, sadece gözlerin ve gülüşün.","e|Send {p} a selfie of yourself right now, just your eyes and smile.");
MD(1,"e|{p}'ye spor sonrası terli bir selfie gönder.","e|Send {p} a sweaty selfie after a workout.");
MD(1,"e|{p}'ye yatağından, uykulu bir selfie gönder.","e|Send {p} a sleepy selfie from bed.");
MD(2,"e|{p}'ye gömleğinin düğmeleri açık bir fotoğraf gönder.","e|Send {p} a photo with your shirt unbuttoned.");
MD(2,"e|{p}'ye karnını gösteren bir fotoğraf gönder.","e|Send {p} a photo showing your stomach.");
MD(2,"e|{p}'ye kollarını ve omuzlarını gösteren bir fotoğraf gönder.","e|Send {p} a photo showing your arms and shoulders.");
MD(2,"e|{p}'ye yatakta uzanırken çekilmiş üstten bir fotoğraf gönder.","e|Send {p} a photo of you lying in bed, taken from above.");
MD(2,"e|{p}'ye boynunu ve köprücük kemiğini gösteren yakın bir fotoğraf gönder.","e|Send {p} a close-up of your neck and collarbone.");
MD(3,"e|{p}'ye iç çamaşırınla yatakta çekilmiş bir fotoğraf gönder (yüzsüz).","e|Send {p} a photo of you in bed in your underwear (no face).");
MD(3,"e|{p}'ye sırtını gösteren bir fotoğraf gönder.","e|Send {p} a photo of your back.");
MD(3,"e|{p}'ye beline havlu sarılmış bir fotoğraf gönder.","e|Send {p} a photo with a towel around your waist.");
MD(3,"e|{p}'ye iç çamaşırının kenarını aşağı çektiğin bir fotoğraf gönder (yüzsüz).","e|Send {p} a photo pulling the waistband of your underwear down (no face).");
MD(3,"e|{p}'ye ereksiyonunu iç çamaşırının üstünden gösteren bir fotoğraf gönder (yüzsüz).","e|Send {p} a photo showing your erection through your underwear (no face).");
MD(4,"e|{p}'ye penisinin fotoğrafını gönder (tek seferlik).","e|Send {p} a photo of your penis (view-once).");
MD(4,"e|{p}'ye kendine dokunduğun 10 saniyelik bir video gönder (yüzsüz, tek seferlik).","e|Send {p} a 10-second video of you touching yourself (no face, view-once).");
MD(4,"e|{p}'ye yatakta çıplak uzandığın, üstten çekilmiş bir fotoğraf gönder (yüzsüz, tek seferlik).","e|Send {p} a photo of you lying naked in bed, taken from above (no face, view-once).");
MD(4,"e|{p}'ye bitirdikten sonra bir fotoğraf gönder (tek seferlik).","e|Send {p} a photo after you finish (view-once).");

/* ================= MESAJ: KADIN ================= */
MD(1,"k|{p}'ye saçların dağınık, uykulu bir selfie gönder.","k|Send {p} a sleepy selfie with messy hair.");
MD(2,"k|{p}'ye bacak bacak üstüne atmış oturduğun bir fotoğraf gönder.","k|Send {p} a photo of you sitting with your legs crossed.");
MD(3,"k|{p}'ye yüzüstü yatarken kalçanı gösteren bir fotoğraf gönder (yüzsüz).","k|Send {p} a photo lying face down showing your hips (no face).");
MD(3,"k|{p}'ye sutyeninle çekilmiş yakın bir fotoğraf gönder (yüzsüz).","k|Send {p} a close-up photo in your bra (no face).");
MD(4,"k|{p}'ye kendine dokunduğun 10 saniyelik bir video gönder (yüzsüz, tek seferlik).","k|Send {p} a 10-second video of you touching yourself (no face, view-once).");
MD(4,"k|{p}'ye bacaklarını açtığın çıplak bir fotoğraf gönder (yüzsüz, tek seferlik).","k|Send {p} a naked photo with your legs open (no face, view-once).");
MD(4,"k|{p}'ye göğüslerinin çıplak bir fotoğrafını gönder (yüzsüz, tek seferlik).","k|Send {p} a naked photo of your breasts (no face, view-once).");
})();
