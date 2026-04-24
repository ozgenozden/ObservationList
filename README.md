# ObservationList

ObservationList, nursing home housekeeping ekiplerinin gunluk observation list kagitlarini dijital ortama tasimak icin hazirlanan Expo ve React Native tabanli mobil uygulamadir.

Uygulama; oda numarasi, kat, tarih, problem aciklamasi, bildirimi yazan kisi, oncelik ve sonraki vardiya notlarini tek listede takip etmeyi hedefler. Housekeeping toplantilarinda yoneticiye aktarilacak konular bu liste uzerinden daha duzenli gorulebilir.

## Mimari

Kod yapisi SOLID prensiplerine uygun gelisebilmesi icin katmanlara ayrildi:

- `domain`: Observation modeli ve repository interface sozlesmeleri.
- `application`: Is akisini yoneten use-case siniflari.
- `infrastructure`: API, database veya lokal veri gibi somut veri kaynaklari.
- `presentation`: Ekran, component ve view model yapilari.
- `app`: Bagimliliklarin tek noktada birbirine baglandigi alan.

Bu ayrim sayesinde ileride yeni veri kaynagi veya yeni ekran eklenirken ana yapi bozulmadan yeni implementasyonlar eklenebilir.

## Baslangic

Bagimliliklari kurun:

```bash
npm install
```

Gelistirme sunucusunu baslatin:

```bash
npm start
```

Android emulatorde calistirmak icin:

```bash
npm run android
```

iOS simulatorde calistirmak icin:

```bash
npm run ios
```

> iOS simulator destegi macOS gerektirir.
