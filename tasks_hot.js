/* Çılgın/Sınırsız ateşli paket (TR + EN). Yetişkin çiftler, karşılıklı rıza.
   Etiket bayrakları: "!" = kıyafet görevi (Çılgın/Sınırsız'a geçince kadına ilk cesaret olarak gelir),
   "*" = yalnızca kıyafet görevi yapıldıktan sonra gelen devam görevleri. */
(function(){
const C=TASKS.couple,E=TASKS_EN.couple;
const D=(l,a,b)=>{C.dare[l].push(a);E.dare[l].push(b)};
const T=(l,a,b)=>{C.truth[l].push(a);E.truth[l].push(b)};

/* ===== Kıyafet görevleri (kadın) ===== */
D(3,"k!|{p} sana giymen için bir iç çamaşırı seçsin; git, onu giy ve karşısına öyle çık.","k!|Let {p} pick a set of lingerie for you; go put it on and come back wearing only that.");
D(3,"k>e!|{p} bir elbise seçsin; altına da onun seçtiği renkte sutyen ve külot giy, sonra yanına gel.","k>e!|Let {p} pick a dress; wear a bra and panties in the colour he picks underneath, then come to him.");
D(3,"k>e!|{p}'nin seçtiği gömleğini üzerine giy, düğmelerini yarıya kadar ilikle ve altına hiçbir şey giyme.","k>e!|Put on whichever of his shirts {p} picks, button it halfway and wear nothing underneath.");
D(3,"k>e!|{p} dolabından senin için bir şey seçsin: şort, tayt ya da iç çamaşırı. Giy ve önünde bir tur dön.","k>e!|Let {p} pick something for you from your wardrobe: shorts, leggings or lingerie. Put it on and do a spin in front of him.");
D(4,"k!|{p}'nin seçtiği iç çamaşırını ve ayakkabıları giy, sonra odaya yavaşça yürü.","k!|Put on the lingerie and shoes {p} picks, then walk slowly into the room.");
D(4,"k>e!|{p}'nin seçtiği elbiseyi, altına onun seçtiği renkte iç çamaşırı giyerek giy ve oyunun sonuna kadar öyle kal.","k>e!|Put on the dress {p} picks, with underwear in the colour he picks underneath, and stay in it for the rest of the game.");
D(4,"k>e!|{p} sana bir kıyafet söylesin (iç çamaşırı, çorap, gömlek...); onu giy ve gelip dizlerinin dibine otur.","k>e!|Let {p} name an outfit (lingerie, stockings, a shirt...); put it on, come back and sit at his feet.");
D(4,"k!|Sadece {p}'nin seçtiği tek bir parçayı giy, geri kalan her şeyi çıkar ve öyle gel.","k!|Wear only the one piece {p} chooses, take off everything else and come back like that.");

/* ===== Kıyafet sonrası devam görevleri ===== */
D(3,"k*|O kıyafetle {p}'nin kucağına otur ve yavaşça dans et.","k*|In that outfit, sit on {p}'s lap and dance slowly.");
D(3,"k*|O kıyafetle {p}'nin önünde yavaşça dön, eğil ve omzunun üstünden ona bak.","k*|In that outfit, turn slowly in front of {p}, bend over and look back at him over your shoulder.");
D(3,"e>k*|{p}'nin giydiği kıyafetin üstünden tüm vücudunu ellerinle keşfet.","e>k*|Explore {p}'s whole body with your hands over the outfit she's wearing.");
D(3,"e>k*|{p}'nin iç çamaşırının askısını dişlerinle indir ve omzunu öp.","e>k*|Pull down the strap of {p}'s lingerie with your teeth and kiss her shoulder.");
D(3,"k>e*|O kıyafetle {p}'nin önünde diz çök ve pantolonunu yavaşça aç.","k>e*|In that outfit, kneel in front of {p} and slowly undo his pants.");
D(3,"e>k*|{p}'nin kıyafetinin altına elini sok ve iç bacağını okşa.","e>k*|Slide your hand under {p}'s outfit and stroke her inner thigh.");
D(3,"k*|O kıyafetle yatağa uzan ve {p}'ye nereden başlaması gerektiğini göster.","k*|Lie on the bed in that outfit and show {p} where to start.");
D(4,"k>e*|O kıyafeti çıkarmadan {p}'ye sakso çek.","k>e*|Without taking off that outfit, give {p} a blowjob.");
D(4,"k>e*|O kıyafetle {p}'nin üzerine çık, iç çamaşırını kenara çek ve onu içine al.","k>e*|In that outfit, climb on top of {p}, pull your underwear aside and take him inside you.");
D(4,"k>e*|O kıyafetle {p} ile 69 yapın.","k>e*|Do a 69 with {p} while you're still in that outfit.");
D(4,"e>k*|{p}'nin iç çamaşırını çıkarmadan kenara çek ve onu dilinle yala.","e>k*|Without taking off {p}'s underwear, pull it aside and lick her.");
D(4,"e>k*|{p}'yi o kıyafetle duvara yasla, kıyafetini sıyır ve arkadan seviş.","e>k*|Press {p} against the wall in that outfit, pull her clothes aside and take her from behind.");
D(4,"e>k*|{p}'nin üzerindeki kıyafeti hızla, ama yırtmadan çıkar ve onu yatağa at.","e>k*|Strip that outfit off {p} fast, without tearing it, and throw her onto the bed.");
D(4,"k>e*|O kıyafetle {p}'ye sırtını dön, yatağın kenarında eğil ve onu bekle.","k>e*|In that outfit, turn your back to {p}, bend over the edge of the bed and wait for him.");
D(4,"e>k*|{p} o kıyafetle sana sakso çeksin; sen de saçlarını tut.","e>k*|Have {p} give you a blowjob in that outfit while you hold her hair.");
D(4,"e>k*|{p}'nin giydiği kıyafetin üzerine boşal.","e>k*|Come on the outfit {p} is wearing.");

/* ===== Çılgın: parmak, el, iç çamaşırının içi ===== */
T(3,"k|{p}'nin sana parmaklarıyla dokunmasını mı, diliyle dokunmasını mı daha çok seversin?","k|Do you prefer {p} touching you with his fingers or his tongue?");
T(3,"e|{p}'nin sana eliyle mastürbasyon yapmasını mı, ağzıyla yapmasını mı istersin?","e|Would you rather {p} used her hand or her mouth on you?");
T(3,"{p}'nin hangi iç çamaşırını üzerinde görmek seni çıldırtır?","Which underwear on {p} drives you crazy?");
T(3,"Bu gece {p}'ye hangi kıyafeti giydirmek isterdin?","What outfit would you like {p} to wear tonight?");
T(3,"Sence {p}'yi en çabuk ne ıslatır ya da sertleştirir?","What do you think gets {p} wet or hard fastest?");
D(3,"e>k|{p}'nin iç çamaşırının içine elini sok ve parmaklarınla onu okşa.","e>k|Slide your hand into {p}'s underwear and stroke her with your fingers.");
D(3,"e>k|{p}'nin içine bir parmağını yavaşça sok ve tepkisini izle.","e>k|Slowly slide a finger inside {p} and watch her reaction.");
D(3,"e>k|{p}'nin klitorisini parmaklarınla daireler çizerek uyar.","e>k|Circle {p}'s clitoris with your fingers.");
D(3,"e>k|{p}'yi kucağına oturt ve ıslanana kadar parmaklarınla okşa.","e>k|Sit {p} on your lap and stroke her with your fingers until she's wet.");
D(3,"e>k|{p}'nin sutyenini çıkar ve göğüs uçlarını yalayarak em.","e>k|Take off {p}'s bra and lick and suck her nipples.");
D(3,"e>k|{p}'ye penisini göster ve dokunmasına izin ver.","e>k|Show {p} your penis and let her touch it.");
D(3,"k>e|{p}'nin pantolonunu aç ve penisini elinle okşa.","k>e|Undo {p}'s pants and stroke his penis with your hand.");
D(3,"k>e|Eline biraz yağ al ve gözlerinin içine bakarak {p}'ye mastürbasyon yap.","k>e|Put some oil in your hand and jerk {p} off while looking into his eyes.");
D(3,"k>e|{p}'nin penisini iç çamaşırının üstünden okşa, sonra elini içeri sok.","k>e|Stroke {p}'s penis over his underwear, then slip your hand inside.");
D(3,"k>e|{p}'nin penisinin ucunu öp ve orada dur.","k>e|Kiss the tip of {p}'s penis and stop right there.");
D(3,"k>e|Üstünü çıkar ve {p}'nin göğüslerini emmesine izin ver.","k>e|Take your top off and let {p} suck your breasts.");
D(3,"k>e|Elini külotunun içine sok ve {p}'nin önünde kendine dokun.","k>e|Slip your hand into your panties and touch yourself in front of {p}.");
D(3,"{p} ile birbirinizin iç çamaşırının içine elinizi sokun ve aynı anda okşayın.","Slip your hands into each other's underwear with {p} and stroke each other at the same time.");
D(3,"{p}'nin elini bacak arana götür ve ne kadar istediğini hissettir.","Guide {p}'s hand between your legs and let them feel how ready you are.");
D(3,"e>e|{p}'nin pantolonunu aç ve ona mastürbasyon yap.","e>e|Undo {p}'s pants and give him a handjob.");
D(3,"k>k|{p}'nin külotunun içine elini sok ve onu parmaklarınla okşa.","k>k|Slip your hand into {p}'s panties and stroke her with your fingers.");

/* ===== Sınırsız: oral, seks, boşalma ===== */
T(4,"k>e|{p}'nin ağzına boşalması hakkında ne düşünüyorsun?","k>e|How do you feel about {p} coming in your mouth?");
T(4,"e>k|{p}'nin üzerine boşalacak olsan en çok nereye isterdin?","e>k|If you came on {p}, where would you most want to?");
T(4,"k>e|{p}'ye sakso çekmeyi mi, onun seni yalamasını mı daha çok seversin?","k>e|Do you prefer giving {p} a blowjob or him going down on you?");
T(4,"e>k|{p}'nin sana sakso çekişinde en çok neyi seviyorsun?","e>k|What do you love most about the way {p} gives you head?");
T(4,"En kolay hangi pozisyonda orgazm oluyorsun?","In which position do you come most easily?");
T(4,"Hiç aynı gece birden fazla orgazm oldun mu, nasıl?","Have you ever come more than once in one night? How?");
T(4,"k|Seni orgazma en çabuk ne götürür: parmak, dil, penis ya da oyuncak?","k|What gets you to orgasm fastest: fingers, tongue, penis or a toy?");
T(4,"e|Boşalmadan hemen önce ne duymak istersin?","e|What do you want to hear right before you come?");
T(4,"e>k|{p}'nin hangi iç çamaşırını giymesini istersin, tarif et.","e>k|Describe the lingerie you'd want {p} to wear.");
T(4,"k>e|{p} sana hangi kıyafeti giydirse onunla ona ne yapardın?","k>e|If {p} dressed you in any outfit, what would you do to him in it?");
D(4,"k>e|{p}'ye sakso çek; bitirmesine az kala dur ve yeniden başla.","k>e|Give {p} a blowjob; stop just before he finishes and start again.");
D(4,"k>e|{p} ağzına boşalana kadar ona sakso çek.","k>e|Blow {p} until he comes in your mouth.");
D(4,"k>e|{p}'ye göğüslerinle titjob yap ve göğüslerine boşalmasını iste.","k>e|Give {p} a titjob and ask him to come on your breasts.");
D(4,"k>e|Eline yağ al ve {p} boşalana kadar ona mastürbasyon yap.","k>e|Oil your hand and jerk {p} off until he comes.");
D(4,"k>e|{p}'nin önünde diz çök, onu ağzınla ıslat, sonra üstüne çık.","k>e|Kneel in front of {p}, get him wet with your mouth, then climb on top.");
D(4,"k>e|{p}'nin üzerine çık, onu içine al ve o boşalana kadar durma.","k>e|Climb on top of {p}, take him inside you and don't stop until he comes.");
D(4,"k>e|Sırtüstü uzan ve {p}'den karnına ya da göğüslerine boşalmasını iste.","k>e|Lie on your back and ask {p} to come on your stomach or breasts.");
D(4,"k>e|Yüzüstü yat, kalçanı kaldır ve {p}'yi bekle.","k>e|Lie face down, raise your hips and wait for {p}.");
D(4,"k>e|{p}'nin penisini yalarken bir elinle de testislerini okşa.","k>e|Lick {p}'s penis while stroking his balls with one hand.");
D(4,"k>e|{p}'nin üzerinde sırtın ona dönük hareket et ve kalçalarına bakmasına izin ver.","k>e|Ride {p} facing away from him and let him watch your hips.");
D(4,"e>k|{p}'nin içine iki parmağını sok ve o gelene kadar devam et.","e>k|Slide two fingers inside {p} and keep going until she comes.");
D(4,"e>k|{p}'yi dilinle orgazma ulaştır; durma.","e>k|Bring {p} to orgasm with your tongue; don't stop.");
D(4,"e>k|{p}'nin ağzına boşal.","e>k|Come in {p}'s mouth.");
D(4,"e>k|{p}'nin göğüslerine boşal.","e>k|Come on {p}'s breasts.");
D(4,"e>k|{p}'yi arkadan al ve kalçalarına boşal.","e>k|Take {p} from behind and come on her ass.");
D(4,"e>k|{p}'den sakso çekmesini iste ve o çekerken saçlarını tut.","e>k|Ask {p} for a blowjob and hold her hair while she does it.");
D(4,"e>k|{p} ile misyonerde sevişirken klitorisini parmağınla uyar.","e>k|Have sex with {p} in missionary while rubbing her clitoris.");
D(4,"e>k|{p}'yi dört ayak pozisyonuna al ve arkadan seviş.","e>k|Put {p} on all fours and take her from behind.");
D(4,"e>k|{p}'nin bacaklarını omuzlarına al, derinden seviş ve nereye boşalmanı istediğini sor.","e>k|Put {p}'s legs on your shoulders, go deep and ask her where she wants you to come.");
D(4,"e>k|{p}'nin göğüslerinin arasına penisini koy ve onları birbirine bastırarak hareket et.","e>k|Put your penis between {p}'s breasts, press them together and move.");
D(4,"{p} ile 69 yapın; ilk bitiren diğerinin bir isteğini yerine getirsin.","Do a 69 with {p}; whoever finishes first grants the other a wish.");
D(4,"{p} ile aynı anda birbirinize oral seks yapın ve ikiniz de bitirene kadar durmayın.","Go down on each other with {p} at the same time and don't stop until you both finish.");
D(4,"{p}'yi bitirmenin eşiğine getir, dur, 10 saniye bekle ve yeniden başla (3 kez).","Bring {p} right to the edge, stop, wait 10 seconds and start again (3 times).");
D(4,"{p}'nin seçtiği pozisyonda seks yapın ve pozisyonu 3 kez değiştirin.","Have sex in a position {p} picks and switch positions 3 times.");
D(4,"{p}'yi ayna karşısında arkadan al; ikiniz de aynadan bakın.","Take {p} from behind in front of a mirror; both of you watch in the mirror.");
D(4,"Bir vibratör ya da oyuncakla {p}'yi orgazma ulaştır.","Use a vibrator or a toy to bring {p} to orgasm.");
D(4,"e>e|{p}'ye sakso çek ve ağzına boşalmasına izin ver.","e>e|Blow {p} and let him come in your mouth.");
D(4,"e>e|{p} ile birbirinize mastürbasyon yapın ve birlikte boşalın.","e>e|Jerk each other off with {p} and come together.");
D(4,"k>k|{p}'yi parmaklarınla ve dilinle orgazma ulaştır.","k>k|Bring {p} to orgasm with your fingers and tongue.");
D(4,"k>k|{p} ile makas pozisyonunda birbirinize sürtünün.","k>k|Scissor with {p}, grinding against each other.");
})();
