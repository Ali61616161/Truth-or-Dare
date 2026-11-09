/* Yeni görevler (TR + EN birlikte). Çoğu süresiz. Sınırsız seviye: sevişmeye çok yakın. */
(function(){
const C=TASKS.couple,F=TASKS.friend;
const add=(arr,enArr,tr,en)=>{arr.push(tr);enArr.push(en)};
const E=TASKS_EN;
function cd(l,tr,en){add(C.dare[l],E.couple.dare[l],tr,en)}
function ct(l,tr,en){add(C.truth[l],E.couple.truth[l],tr,en)}
function fd(tr,en){add(F.dare,E.friend.dare,tr,en)}
function ft(tr,en){add(F.truth,E.friend.truth,tr,en)}

/* ---- Arkadaş: süresiz ---- */
fd("Gruptaki birinin kişiliğini üç kelimeyle anlat.","Describe someone's personality in three words.");
fd("Telefonundaki en son emojiyi gerçek hayatta canlandır.","Act out the last emoji you used.");
fd("{p}'ye bir şarkı seç, o da senin için seçsin; ikisini de söyleyin.","Pick a song for {p}, they pick one for you; sing both.");
fd("Gözlerini kapat ve {p}'nin yerini tahmin et.","Close your eyes and guess where {p} is standing.");
fd("Bir ünlünün ağzından kendini tanıt.","Introduce yourself as a celebrity would.");
fd("Hayatındaki en komik anıyı tek cümleyle anlat.","Tell your funniest memory in one sentence.");
fd("Gruptan birine ismini söylemeden onu tarif et, bulsunlar.","Describe someone in the group without saying their name; the others guess.");
fd("Bir sonraki cümleni şarkı gibi söyle.","Sing your next sentence like a song.");
fd("En sevdiğin filmden bir replik söyle.","Say a line from your favourite movie.");
fd("Komik bir selfie çek, grup yazısını seçsin.","Take a funny selfie; the group picks the caption.");
ft("Bu gruptaki biriyle bir gün yer değiştirsen kim olurdu?","If you could swap lives with someone here for a day, who?");
ft("Hayatındaki en iyi tavsiyeyi kim verdi?","Who gave you the best advice of your life?");
ft("Telefonunda en çok kimle yazışıyorsun, neden?","Who do you text the most, and why?");
ft("Seni en çok ne güldürür?","What makes you laugh the most?");
ft("En son hangi şey seni gerçekten mutlu etti?","What last made you truly happy?");

/* ---- Sevgili L1: süresiz ---- */
cd(1,"{p}'nin elini tut ve gözlerinin içine bakarak ona bir iltifat et.","Hold {p}'s hand and give them a compliment looking into their eyes.");
cd(1,"{p}'nin yanağına yavaşça bir öpücük bırak.","Leave a slow kiss on {p}'s cheek.");
cd(1,"{p}'ye sıkıca sarıl ve kulağına bir şey fısılda.","Hug {p} tightly and whisper something in their ear.");
cd(1,"{p}'nin alnına bir öpücük ver ve 'iyi ki varsın' de.","Kiss {p}'s forehead and say \"I'm so glad you exist\".");
cd(1,"{p}'nin parmaklarını parmaklarınla birleştir ve yavaşça öp.","Interlace your fingers with {p}'s and kiss their hand slowly.");
cd(1,"{p}'ye bir adım yaklaş ve dudaklarına çok hafif bir öpücük bırak.","Step closer to {p} and leave a very light kiss on their lips.");
cd(1,"{p}'nin boynuna kısa bir öpücük bırak.","Leave a short kiss on {p}'s neck.");
cd(1,"{p}'nin saçlarını ve yüzünü okşa.","Stroke {p}'s hair and face.");
ct(1,"{p} ile ilgili en çok hangi anıyı tekrar yaşamak isterdin?","Which memory with {p} would you most like to relive?");
ct(1,"Beni gülümsetmek için ne yaparsın?","What do you do to make me smile?");
ct(1,"Bu akşam benimle ne yapmak isterdin?","What would you like to do with me tonight?");

/* ---- Sevgili L2: süresiz ---- */
cd(2,"{p}'nin kulağına çok yaklaş ve ne yapmak istediğini fısılda.","Get very close to {p}'s ear and whisper what you want to do.");
cd(2,"{p}'yi duvara yasla ve boynunu öp.","Press {p} against the wall and kiss their neck.");
cd(2,"{p}'nin tişörtünün altından belini okşa.","Stroke {p}'s waist under their shirt.");
cd(2,"{p}'nin elini al ve bileğinden dirseğine öp.","Take {p}'s hand and kiss from wrist to elbow.");
cd(2,"{p}'yi kucağına çek ve derin bir öpücük ver.","Pull {p} onto your lap and give a deep kiss.");
cd(2,"{p}'nin köprücük kemiğini yavaşça öp.","Slowly kiss {p}'s collarbone.");
cd(2,"{p}'ye arkadan sarıl, boynuna nefes ver ve öp.","Hug {p} from behind, breathe on their neck and kiss it.");
cd(2,"{p}'nin dudaklarına hafifçe dokun ve geri çekil, sonra tutkuyla öp.","Brush {p}'s lips, pull back, then kiss them passionately.");
cd(2,"{p}'nin üstünü yavaşça çıkar ve omzunu öp.","Slowly take off {p}'s top and kiss their shoulder.");
cd(2,"{p}'ye ne kadar çekici bulduğunu fısılda ve nerelerini sevdiğini göster.","Whisper how attractive {p} is and show which parts you love.");
ct(2,"Beni nasıl öpmek isterdin, şimdi?","How would you want to kiss me, right now?");
ct(2,"Seni en çok neyim heyecanlandırıyor?","What excites you most about me?");
ct(2,"Bu gece neler olsun istersin?","What do you want to happen tonight?");

/* ---- Sevgili L3: süresiz ---- */
cd(3,"{p}'nin tüm üstünü çıkar ve göğsüne öpücük bırak.","Take off {p}'s top completely and kiss their chest.");
cd(3,"{p}'yi yatağa yatır ve üstüne eğilip uzun uzun öp.","Lay {p} on the bed, lean over and kiss for a long time.");
cd(3,"{p}'nin bacağını dizinden kalçasına kadar öp.","Kiss {p}'s leg from knee to hip.");
cd(3,"{p}'nin kalçasından tutup kendine çek ve boynunu öp.","Hold {p} by the hips, pull them close and kiss their neck.");
cd(3,"{p}'ye sırtını dön, saçını kaldır; boynunu öpmesine izin ver.","Turn your back to {p}, lift your hair and let them kiss your neck.");
cd(3,"{p}'yi gözleri bağlı bırak ve istediğin yerine öpücük bırak.","Leave {p} blindfolded and kiss them wherever you like.");
cd(3,"Birbirinizin üstünü çıkarın ve sarılın.","Take off each other's tops and hug.");
cd(3,"{p}'nin belini kavra ve nefesin kesilene kadar öp.","Grab {p}'s waist and kiss until you're out of breath.");
cd(3,"{p}'nin karnını ve belini öp, kulağına 'seni istiyorum' fısılda.","Kiss {p}'s stomach and waist and whisper \"I want you\" in their ear.");
cd(3,"{p}'nin kucağına otur ve istediğin yere dokunmasına izin ver.","Sit on {p}'s lap and let them touch you wherever they like.");
ct(3,"Bu gece seni en çok neyin heyecanlandıracağını söyle.","Tell me what would excite you most tonight.");
ct(3,"Beni nasıl soymak isterdin?","How would you like to undress me?");

/* ---- Sevgili L4 (Sınırsız): seksin bir tık altı, çoğu süresiz ---- */
cd(4,"{p}'nin tüm kıyafetlerini yavaşça çıkar ve vücudunun her yerini öp.","Slowly take off all of {p}'s clothes and kiss all over their body.");
cd(4,"{p}'nin iç çamaşırının üstünden yavaşça okşa ve tepkisini izle.","Stroke {p} slowly over their underwear and watch their reaction.");
cd(4,"{p}'nin bacak arasını kıyafetinin üstünden dudaklarınla ısıt.","Warm {p}'s inner thighs with your lips over their clothes.");
cd(4,"{p}'yi sırtüstü yatır, üzerine çık ve yavaşça hareket et; kıyafetler üstünüzde kalsın.","Lay {p} on their back, get on top and move slowly, clothes still on.");
cd(4,"{p}'nin göğsünü ve karnını dudaklarınla öp, sonra daha aşağıya in ve dur.","Kiss {p}'s chest and stomach, move lower, then stop.");
cd(4,"{p}'nin iç çamaşırını yavaşça indir ve nefesinle ısıt, sonra yukarı çık.","Slowly lower {p}'s underwear and warm them with your breath, then come back up.");
cd(4,"{p}'nin ellerini başının üstünde tut ve vücudunun her yerini öp.","Hold {p}'s hands above their head and kiss all over their body.");
cd(4,"{p}'nin gözlerini bağla ve onu parmak uçlarınla çıldırtana kadar dolaş.","Blindfold {p} and trace them with your fingertips until they lose it.");
cd(4,"{p}'yi duvara yasla, bir bacağını belinde tut ve öpüş.","Press {p} against the wall, hold one of their legs around your waist and kiss.");
cd(4,"{p}'nin sırtından kalçasına öpücük bırak, sonra bacaklarının arasına geç.","Kiss from {p}'s back to their hips, then move between their legs.");
cd(4,"{p}'ye kendini göster: yavaşça soyun ve sadece bakmasına izin ver.","Show yourself to {p}: undress slowly and just let them look.");
cd(4,"{p}'yi kucağına oturt, birbirinize bastırıp yavaşça hareket edin.","Sit {p} on your lap, press into each other and move slowly.");
cd(4,"{p}'ye en çok neyi istediğini söyle ve bunu yaptırması için ona 30 saniye ver.","Tell {p} what you want most and give them 30 seconds to do it.");
cd(4,"{p}'nin tüm boynunu, göğsünü ve karnını öp; ardından iç çamaşırının kenarına kadar in.","Kiss {p}'s neck, chest and stomach, then go down to the edge of their underwear.");
cd(4,"{p}'nin üzerine yat, vücut vücuda öpüş; ellerin her yerde olsun.","Lie on top of {p}, body to body, kissing with your hands everywhere.");
cd(4,"{p}'yi yavaşça dizlerinin üstüne oturt ve kulağına en cesur isteğini fısılda.","Slowly sit {p} on your knees and whisper your boldest wish in their ear.");
cd(4,"{p}'nin bacak aralarını ve iç bacağını yavaşça öp, sonra dur ve gözlerine bak.","Slowly kiss {p}'s inner thighs, then stop and look into their eyes.");
cd(4,"{p}'nin tüm vücuduna tenin tenine değerek sarıl, kimse konuşmasın.","Hold {p} skin to skin with no one speaking.");
cd(4,"{p}'nin elini al ve kendi vücudunda istediğin yere götür.","Take {p}'s hand and guide it anywhere on your body you want.");
cd(4,"Birbirinizi sadece iç çamaşırınızla bırakın ve sarılıp öpüşün.","Strip each other down to underwear, then hold and kiss.");
cd(4,"{p}'nin her yerini ağzınla keşfet; dur dediğinde durana kadar.","Explore all of {p} with your mouth until they say stop.");
cd(4,"{p}'ye bir şey fısılda: sana yapmasını istediğin en cüretkâr şey; sonra birlikte yapın.","Whisper to {p} the boldest thing you want them to do to you; then do it together.");
cd(4,"{p}'yi yatağa yatır, bacaklarının arasına otur ve onu öpücüklerle ele geçir.","Lay {p} on the bed, settle between their legs and cover them in kisses.");
cd(4,"{p}'nin her yerine buz ve dudaklarınla dokun, nefesi hızlanana kadar.","Touch {p} everywhere with ice and your lips until their breathing quickens.");
cd(4,"{p}'nin iç çamaşırını çıkarmasına izin ver ve ona sadece bak.","Let {p} take off your underwear and let them just look at you.");
cd(4,"{p}'nin sırtına yatıp ensesini öp ve ellerini göğsüne götür.","Lie against {p}'s back, kiss their nape and bring your hands to their chest.");
cd(4,"{p}'yi yavaşça soy ve bir kez 'hayır' diyene kadar devam et.","Slowly undress {p} and keep going until they say stop.");
cd(4,"{p}'nin bacaklarını omuzlarına al ve yavaşça öp.","Take {p}'s legs over your shoulders and kiss slowly.");
cd(4,"{p}'yi arkadan sar, ellerini her yerinde gezdir ve boynunu öp.","Hold {p} from behind, roam your hands everywhere and kiss their neck.");
cd(4,"Birbirinizi tamamen çıplak bırakın ve sadece öpüşün; başka bir şey yok.","Strip each other fully and just kiss; nothing else.");
cd(4,"{p}'ye bu gece ona ne yapacağını anlat; her cümleden sonra bir öpücük ver.","Tell {p} what you'll do to them tonight; give a kiss after every sentence.");
cd(4,"{p}'ye bir 'öpücük ve dokunuş sırası' seç: sırayla seni nerelerden ele geçireceğini söyle.","Give {p} a kiss-and-touch list: say in order where you'll take them.");
cd(4,"{p}'nin gözlerinin içine bakarak yavaşça kendi üstünü çıkar ve onun ellerini oraya götür.","Looking into {p}'s eyes, slowly take off your own top and bring their hands to you.");
cd(4,"{p}'yi kucakla, yatak odasına taşı ve orada devam et.","Carry {p} to the bedroom and continue there.");
cd(4,"e|{p}'nin üzerine uzan, kalçasını kavra ve boynunu öp.","e|Lie on {p}, grip their hips and kiss their neck.");
cd(4,"k|{p}'nin üzerine otur ve yavaşça hareket ederek boynunu öp.","k|Sit on {p} and move slowly while kissing their neck.");
cd(4,"e|{p}'nin göğsünü ve karnını öpüp iç çamaşırının kenarında dur.","e|Kiss {p}'s chest and stomach and stop at the edge of their underwear.");
cd(4,"k|{p}'nin üstünde dans et, yavaşça soyun ve iç çamaşırınla kal.","k|Dance on {p}, slowly strip and stay in your underwear.");
cd(4,"e|{p}'yi kendine çek, ellerini kalçasına koy ve sert bir öpücük ver.","e|Pull {p} in, put your hands on their hips and give a hard kiss.");
cd(4,"k|{p}'nin ellerini kendi vücuduna götür, nerede en çok titrediğini göster.","k|Guide {p}'s hands over your body and show where you tremble most.");
ct(4,"Bu gece beni nasıl yatağa götürmek istersin?","How would you want to take me to bed tonight?");
ct(4,"Seni en çok nerede öpmemi istersin, dürüst ol.","Where do you most want me to kiss you? Be honest.");
ct(4,"Yatakta bana ilk ne yapmak istersin?","What do you want to do to me first in bed?");
ct(4,"Beni soyarken en çok neye bakmak istersin?","What do you most want to look at while I undress?");
ct(4,"Birlikte yaptığımız en kızgın an hangisiydi?","What's the hottest moment we've shared?");
ct(4,"Bu gece benden neyi saklamayacaksın?","What won't you hold back from me tonight?");
ct(4,"Beni nasıl kendine çekerdin, hemen şimdi?","How would you draw me in, right now?");
ct(4,"Ne kadar sürede seni kendinden geçirebilirim?","How fast can I make you lose control?");
})();
