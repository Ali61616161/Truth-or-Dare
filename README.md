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
        ".validate": "newData.hasChildren(['mode','p0'])"
      }
    }
  }
}
```
