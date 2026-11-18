/* Giydirme ve "seçtiği parçayı çıkar" görevleri (TR + EN), Sevgili modu.
   "!" = giydirme görevi (kadına; aralarında en az 8 tur olur, Çılgın/Sınırsız'da ilk cesaret olarak gelir)
   "~" = seçilen bir parçayı çıkarma görevi (aralarında en az 3 tur olur) */
(function(){
const C=TASKS.couple,E=TASKS_EN.couple;
const D=(l,a,b)=>{C.dare[l].push(a);E.dare[l].push(b)};

/* ----- Giydirme: Ateşli ----- */
D(2,"k>e!|{p}'nin seçtiği elbiseyi giy, altına sadece kendi iç çamaşırını bırak.","k>e!|Put on the dress {p} picks, with just your own underwear underneath.");
D(2,"k!|{p} bir renk söylesin; o renkteki iç çamaşırını giy (yoksa en yakın rengi).","k!|Let {p} name a colour; put on underwear in that colour (or the closest you have).");
D(2,"k>e!|{p}'nin seçtiği elbiseyi giy ve önünde bir tur dön.","k>e!|Put on the dress {p} picks and do a spin in front of him.");
D(2,"k>e!|{p}'nin seçtiği elbiseyi giy ve yanına uzan.","k>e!|Put on the dress {p} picks and lie down next to him.");
D(2,"k>e!|{p}'nin seçtiği elbiseyi giy ve kucağına kıvrıl.","k>e!|Put on the dress {p} picks and curl up on his lap.");
D(2,"k>e!|{p}'nin seçtiği çorapları giy ve bacaklarını ona doğru uzat.","k>e!|Put on the socks or stockings {p} picks and stretch your legs out toward him.");

/* ----- Giydirme: Çılgın ----- */
D(3,"k!|{p}'nin seçtiği renkteki sutyeni ve külotu giy, üstüne hiçbir şey alma.","k!|Put on a bra and panties in the colour {p} picks, with nothing on top.");
D(3,"k>e!|{p}'nin seçtiği elbiseyi giy, altına sadece onun seçtiği renkte bir külot giy.","k>e!|Put on the dress {p} picks, with only panties in the colour he picks underneath.");
D(3,"k!|{p}'nin seçtiği çorapları ve iç çamaşırını giy, sonra kapıdan yavaşça içeri gir.","k!|Put on the stockings and underwear {p} picks, then walk slowly in through the door.");
D(3,"k!|{p}'nin seçtiği kısa elbiseyi giy ve altına hiçbir şey giyme.","k!|Put on the short dress {p} picks and wear nothing underneath.");
D(3,"k!|{p}'nin seçtiği elbiseyi giy ve askılarından birini omzundan düşür.","k!|Put on the dress {p} picks and let one strap slip off your shoulder.");
D(3,"k>e!|{p}'nin seçtiği elbiseyi giy ve fermuarını yarıya kadar açık bırak.","k>e!|Put on the dress {p} picks and leave the zip half open.");
D(3,"k>e!|{p}'nin seçtiği dar elbiseyi giy, altına da onun seçtiği renkte iç çamaşırı giy; önünde yavaşça eğilip doğrul.","k>e!|Put on the tight dress {p} picks, with underwear in the colour he picks underneath, then slowly bend over and straighten up in front of him.");
D(3,"k>e!|{p}'nin seçtiği sutyeni ve külotu giy, sonra kucağına otur.","k>e!|Put on the bra and panties {p} picks, then sit on his lap.");
D(3,"k>e!|{p}'nin seçtiği bir elbiseyi giy ve 'nasıl görünüyorum?' diye sorarak yavaşça dön.","k>e!|Put on a dress {p} picks and turn slowly, asking him \"how do I look?\"");
D(3,"k!|{p}'nin seçtiği topukluları ve iç çamaşırını giy, başka hiçbir şey giyme.","k!|Wear the heels and underwear {p} picks, and nothing else.");
D(3,"k!|{p}'nin seçtiği elbiseyi giy ve oyunun geri kalanında onunla kal.","k!|Put on the dress {p} picks and stay in it for the rest of the game.");
D(3,"k>e!|{p}'nin seçtiği renkte bir ruj sür ve onun seçtiği iç çamaşırıyla gel.","k>e!|Put on lipstick in the colour {p} picks and come back in the underwear he picks.");

/* ----- Giydirme: Sınırsız ----- */
D(4,"k!|{p}'nin seçtiği iç çamaşırını giy, külotu çıkar ve sadece sutyenle gel.","k!|Put on the lingerie {p} picks, then take off the panties and come back in just the bra.");
D(4,"k>e!|{p}'nin seçtiği elbiseyi altında hiçbir şey olmadan giy, gelip yüzüne dönük kucağına otur.","k>e!|Put on the dress {p} picks with nothing underneath, then come and sit on his lap facing him.");
D(4,"k!|{p}'nin seçtiği çorapları giy, başka hiçbir şey giyme ve yatağa uzan.","k!|Put on the stockings {p} picks, nothing else, and lie down on the bed.");
D(4,"k>e!|{p}'nin seçtiği elbiseyi çıplak tenine giy ve önünde yavaşça dön.","k>e!|Put on the dress {p} picks over your bare skin and turn slowly in front of him.");
D(4,"k!|{p}'nin seçtiği renkte bir külot giy ve üstünde başka hiçbir şey olmasın.","k!|Put on panties in the colour {p} picks and nothing else.");
D(4,"k>e!|{p}'nin seçtiği iç çamaşırını giy ve onun önünde diz çök.","k>e!|Put on the lingerie {p} picks and kneel in front of him.");
D(4,"k!|{p}'nin seçtiği kısa elbiseyi altında hiçbir şey olmadan giy ve yatağın kenarına eğil.","k!|Put on the short dress {p} picks with nothing underneath and bend over the edge of the bed.");
D(4,"k!|{p}'nin seçtiği tek parçayı giy (sadece sutyen, sadece külot ya da sadece çorap) ve öyle kal.","k!|Wear only the single piece {p} picks (just a bra, just panties or just stockings) and stay like that.");
D(4,"k>e!|{p}'nin seçtiği elbiseyi altında hiçbir şey olmadan giy ve üzerine çık.","k>e!|Put on the dress {p} picks with nothing underneath and climb on top of him.");
D(4,"k>e!|{p}'nin seçtiği iç çamaşırını giy ve onun önünde yavaşça kendine dokun.","k>e!|Put on the lingerie {p} picks and slowly touch yourself in front of him.");

/* ----- Seçilen parçayı çıkar ----- */
D(2,"~|{p} üzerindeki bir parçayı seçsin; onu yavaşça çıkar.","~|Let {p} pick one piece of your clothing; take it off slowly.");
D(2,"~|{p}'nin seçtiği bir parçayı müzik eşliğinde çıkar ve ona doğru fırlat.","~|Take off the piece {p} picks to music and toss it to them.");
D(2,"~|{p}'nin seçtiği bir parçayı onun gözlerinin içine bakarak çıkar.","~|Take off the piece {p} picks while looking them in the eye.");
D(2,"~|{p} senin üzerinden bir parça seçsin, sen de onun üzerinden; ikiniz aynı anda çıkarın.","~|{p} picks one piece of yours and you pick one of theirs; take them off at the same time.");
D(2,"~|{p}'nin seçtiği bir parçayı çıkarmasına izin ver; o çıkarsın, sen kıpırdama.","~|Let {p} take off a piece of your clothing of their choice; they do it, you stay still.");
D(2,"~|Sen {p}'nin üzerinden bir parça seç ve onu yavaşça sen çıkar.","~|Pick one piece of {p}'s clothing and slowly take it off them yourself.");
D(3,"~|{p}'nin seçtiği bir parçayı dişlerinle çıkar.","~|Take off a piece {p} picks using only your teeth.");
D(3,"~|{p}'nin seçtiği iki parçayı çıkar ve ona doğru yavaşça yürü.","~|Take off two pieces {p} picks and walk slowly toward them.");
D(3,"~|{p}'nin seçtiği parçayı çıkarırken ellerinin vücudunda dolaşmasına izin ver.","~|Let {p}'s hands roam your body while you take off the piece they pick.");
D(3,"~|Arkanı dön ve {p}'nin seçtiği parçayı eğilerek çıkar.","~|Turn around and bend over as you take off the piece {p} picks.");
D(3,"~|{p}'nin seçtiği parçayı çıkar ve onu onun boynuna dola.","~|Take off the piece {p} picks and drape it around their neck.");
D(3,"~|{p}'nin üzerinden istediğin bir parçayı seç ve sadece ağzınla çıkar.","~|Pick any piece of {p}'s clothing and take it off with only your mouth.");
D(4,"~|{p}'nin seçtiği son parçayı da çıkar ve öyle kal.","~|Take off the last piece {p} picks and stay that way.");
D(4,"~|{p}'nin seçtiği parçayı çıkarırken kendine dokun.","~|Touch yourself while taking off the piece {p} picks.");
D(4,"~|{p}'nin seçtiği iç çamaşırını çıkar ve ona ver.","~|Take off the underwear {p} picks and hand it to them.");
D(4,"~|{p}'nin üzerinden kalan son parçayı dişlerinle çıkar.","~|Take off the last piece {p} is wearing with your teeth.");
D(4,"~|{p}'nin seçtiği parçayı çıkar, onun kucağına bırak ve bacaklarını aç.","~|Take off the piece {p} picks, drop it in their lap and open your legs.");
D(4,"~|{p} senin üzerinden bir parça seçsin; çıkarmadan önce onun eliyle bacak aranı okşamasına izin ver.","~|{p} picks a piece of yours; before you take it off, let their hand stroke between your legs.");

/* ----- Elbise + partnerin seçtiği renkte iç çamaşırı ----- */
D(3,"k>e!|{p}'nin seçtiği elbiseyi giy, altına onun söylediği renkte iç çamaşırı giy; sonra elbisenin ucunu hafifçe kaldırıp rengi ona göster.","k>e!|Put on the dress {p} picks, with underwear in the colour he names underneath, then lift the hem slightly and show him the colour.");
D(3,"k>e!|{p} bir elbise ve bir renk seçsin; elbiseyi o renkteki iç çamaşırıyla giy ve önünde bir tur dön.","k>e!|Let {p} pick a dress and a colour; wear the dress with underwear in that colour and do a spin in front of him.");
D(3,"k>e!|{p}'nin seçtiği elbiseyi giy, kucağına otur ve ellerini elbisenin altına sokmasına izin ver.","k>e!|Put on the dress {p} picks, sit on his lap and let him slide his hands under the dress.");
D(3,"k>e!|{p}'nin seçtiği elbiseyi giy; altına sadece külot giy, sutyen giyme.","k>e!|Put on the dress {p} picks; wear only panties underneath, no bra.");
D(4,"k>e!|{p}'nin seçtiği elbiseyi ve onun seçtiği renkte iç çamaşırı giy; sonra külotu çıkarıp ona ver.","k>e!|Put on the dress {p} picks and underwear in the colour he picks; then take off the panties and hand them to him.");
D(4,"k>e!|{p}'nin seçtiği elbiseyi ve onun seçtiği renkte iç çamaşırı giy; yatağın kenarına eğil ve elbiseyi yukarı çek.","k>e!|Put on the dress {p} picks and underwear in the colour he picks; bend over the edge of the bed and pull the dress up.");
D(4,"k>e!|{p}'nin seçtiği iç çamaşırını giy; yüzüne dönük kucağına otur ve sutyenin askılarını indir.","k>e!|Put on the lingerie {p} picks; sit on his lap facing him and pull down the bra straps.");
D(4,"k>e!|{p}'nin seçtiği elbiseyi giy; çıkarmadan önünde diz çök.","k>e!|Put on the dress {p} picks and kneel in front of him without taking it off.");
})();
