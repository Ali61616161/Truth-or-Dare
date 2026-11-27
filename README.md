# Doğruluk mu Cesaret mi

Arkadaş, Sevgili, Görüntülü ve Mesaj modları olan, Türkçe/İngilizce web uygulaması (PWA).

## Çevrimiçi eşleşme (Firebase)
1. console.firebase.google.com → proje oluştur → Realtime Database oluştur.
2. Proje ayarları → Web uygulaması ekle → `firebaseConfig` değerini kopyala.
3. `firebase-config.js` içindeki `null` yerine bu nesneyi yaz (databaseURL dahil).
4. Realtime Database → Kurallar:

```json
{
  "rules": {
    "rooms": {
      "$code": {
        ".read": true,
        ".write": true,
        ".validate": "newData.hasChildren(['mode','p0'])",
        "mode": {".validate": "newData.val()=='call'||newData.val()=='msg'||newData.val()=='couple'"},
        "v": {".validate": "newData.isString()&&newData.val().length<12"},
        "ts": {".validate": "newData.isNumber()"},
        "p0": {".validate": "newData.hasChildren(['n','g'])",
          "n": {".validate": "newData.isString()&&newData.val().length>0&&newData.val().length<=16"},
          "g": {".validate": "newData.val()=='e'||newData.val()=='k'"},
          "$o": {".validate": false}},
        "p1": {".validate": "newData.hasChildren(['n','g'])",
          "n": {".validate": "newData.isString()&&newData.val().length>0&&newData.val().length<=16"},
          "g": {".validate": "newData.val()=='e'||newData.val()=='k'"},
          "$o": {".validate": false}},
        "turn": {".validate": "newData.isNumber()&&newData.val()>=0&&newData.val()<100000"},
        "lv": {".validate": "newData.isString()&&newData.val().length<=8"},
        "pa": {".validate": "newData.isNumber()&&newData.val()>=0&&newData.val()<=3"},
        "pb": {".validate": "newData.isNumber()&&newData.val()>=0&&newData.val()<=3"},
        "closed": {".validate": "newData.isBoolean()"},
        "task": {"kind": {".validate": "newData.val()=='truth'||newData.val()=='dare'"},
          "lv": {".validate": "newData.isNumber()&&newData.val()>=0&&newData.val()<=4"},
          "i": {".validate": "newData.isNumber()&&newData.val()>=0&&newData.val()<100000"},
          "pi": {".validate": "newData.isNumber()&&newData.val()>=0&&newData.val()<=1"},
          "setup": {".validate": "newData.isNumber()&&(newData.val()==0||newData.val()==1)"},
          "$o": {".validate": false}},
        "sc": {".validate": "newData.isString()&&newData.val().length<4000"},
        "tm": {".validate": "newData.isString()&&newData.val().length<200"},
        "ro": {".validate": "newData.isString()&&newData.val().length<30000"},
        "ra": {".validate": "newData.isString()&&newData.val().length<30000"},
        "h0": {".validate": "newData.isString()&&newData.val().length<40"},
        "h1": {".validate": "newData.isString()&&newData.val().length<40"},
        "$other": {".validate": false}
      }
    }
  }
}
```

## Görüntülü arama için TURN (mobil veride bağlantı)

Bazı mobil operatörlerde iki telefon doğrudan bağlanamaz; o zaman bağlantı bir TURN aktarma sunucusundan geçer (veri yine uçtan uca şifreli kalır, saklanmaz).

1. https://www.metered.ca/tools/openrelay/ adresinden ücretsiz hesap aç (ayda 20 GB ücretsiz).
2. Panelde bir uygulama oluştur, **TURN Credentials** sayfasındaki API adresini kopyala:
   `https://UYGULAMAADIN.metered.live/api/v1/turn/credentials?apiKey=ANAHTAR`
3. `firebase-config.js` içinde `window.TURN_API='...'` satırına yapıştır.

Bu anahtar herkese açık uygulama kodunda durur; yalnızca TURN kullanımı için geçerlidir. Panelde izin verilen alan adını `ali61616161.github.io` olarak sınırlayabilirsin.
