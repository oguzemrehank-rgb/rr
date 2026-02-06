# KODE - Profesyonel Eğitim İnisiyatifi Web Sitesi

Eğitim, teknoloji ve yaratıcılığı bir araya getiren KODE inisiyatifinin profesyonel web sitesi.

## 📋 İçerik

Bu sitede aşağıdaki sayfalar bulunmaktadır:

- **Anasayfa** (`index.html`) - KODE'nin tanıtımı, haberler ve duyurular
- **KODE Nedir** (`kode-nedir.html`) - Misyon, vizyon ve eğitim yaklaşımı
- **Ekibimiz** (`ekibimiz.html`) - Ekip üyeleri ve profilleri
- **Galeri** (`galeri.html`) - Kurslar, projeler ve etkinlik fotoğrafları
- **Forum** (`forum.html`) - Kullanıcı forumu, konular, yanıtlar, oylama
- **Sıkça Sorulan Sorular** (`sss.html`) - SSS cevapları
- **İletişim** (`iletisim.html`) - İletişim bilgileri ve formu
- **Giriş/Kaydol** (`giris.html`, `kaydol.html`) - Kullanıcı girişi ve kayıt
- **Hesabım** (`hesabim.html`) - Profil yönetimi, puanlar, rozetler
- **RSS Feed** (`rss.html`) - Forum konularının RSS beslemesi

## 🎨 Tasarım Özellikleri

- **Profesyonel & Güvenilir**: Kurumsal bir imaj sunmak için özenle tasarlanmıştır
- **Responsive**: Tüm cihazlarda (mobil, tablet, masaüstü) mükemmel şekilde görüntülenir
- **Erişilebilir**: Semantic HTML ve WCAG uyumluluğu
- **Hızlı**: Herhangi bir framework olmadan, saf HTML/CSS/JS ile yazılmıştır
- **SEO Uyumlu**: Arama motorları tarafından kolayca indekslenebilir
- **Dark Mode**: Kullanıcı tercihine göre açık/koyu tema
- **PWA**: Progressive Web App olarak kurulabilir

## 🎯 Renk Şeması

- **Birincil Renk**: Mavi (#0066cc) - Güven ve profesyonellik
- **Arka Plan**: Beyaz ve açık gri (#f9f9f9) / Dark mode için koyu
- **Metin**: Koyu gri (#1a1a1a) - Yüksek kontrastlılık

## 📁 Dosya Yapısı

```
.
├── index.html           # Anasayfa
├── kode-nedir.html      # KODE Nedir
├── ekibimiz.html        # Ekibimiz
├── galeri.html          # Galeri
├── forum.html           # Forum sayfası
├── sss.html             # SSS
├── iletisim.html        # İletişim
├── giris.html           # Giriş
├── kaydol.html          # Kayıt
├── hesabim.html         # Hesap yönetimi
├── rss.html             # RSS feed
├── manifest.json        # PWA manifest
├── sw.js                # Service Worker
├── css/
│   └── style.css        # Tüm stiller
├── js/
│   ├── main.js          # Ana JS (navigasyon, tema)
│   ├── auth.js          # Kimlik doğrulama, puanlar, rozetler
│   └── forum.js         # Forum işlevselliği
└── images/              # Resim klasörü (placeholder)
```

## 🚀 Kullanım

1. Tüm dosyaları bir web sunucusundan hizmet alın
2. `index.html`'i tarayıcıda açın
3. Sitede gezinin ve tüm sayfaları kontrol edin

## 🏛️ Forum Özellikleri

KODE sitesi kapsamlı bir forum sistemi içerir:

### Kullanıcı Yönetimi
- **Kayıt/Giriş**: E-posta ve şifre ile güvenli giriş
- **Profil Yönetimi**: Kullanıcı profili, puanlar, rozetler
- **Admin Erişimi**: Özel admin hesabı ile moderasyon

### Forum İşlevselliği
- **Konu Oluşturma**: Kategorilere göre konular açma
- **Yanıt Verme**: Konulara yanıt yazma ve tartışma
- **Oylama Sistemi**: Beğeni/beğenmeme oyları
- **Arama**: Konular arasında hızlı arama
- **Kategoriler**: Konuları kategorilere ayırma
- **Topluluklar**: Özel topluluk oluşturma ve katılım

### Gamification
- **Puan Sistemi**: Etkileşimler için puan kazanma
- **Rozetler**: Başarımlar için rozet kazanma
- **Dereceler**: Puanlara göre seviye atlama

### Sosyal Özellikler
- **Özel Mesaj**: Kullanıcılar arası DM gönderme
- **Bildirimler**: Etkileşimler için bildirimler
- **Dosya Yükleme**: Konulara resim ekleme

### Güvenlik
- **Spam Koruması**: Yasaklı kelime filtresi
- **Rate Limiting**: Aşırı kullanım önleme
- **Hesap Yasaklama**: Kuralları ihlal eden hesapların engellenmesi

### Teknik Özellikler
- **RSS Feed**: Forum konularının RSS beslemesi
- **PWA Desteği**: Offline kullanım ve kurulum
- **Dark Mode**: Açık/koyu tema seçimi
- **Responsive Tasarım**: Mobil uyumlu

## 📱 Mobil Uyumluluk

Site, aşağıdaki cihazlarda test edilmiştir:
- İPhone 12, 13, 14, 15
- Samsung Galaxy S21, S22
- iPad, iPad Pro
- Çeşitli Android cihazlar
- Modern masaüstü tarayıcıları (Chrome, Firefox, Safari, Edge)

## ♿ Erişilebilirlik

- Semantic HTML5 kullanımı
- Uygun heading hiyerarşisi
- Form etiketleri ve ARIA attribute'ları
- Renk kontrastı WCAG AA seviyesine uygun
- Klavye navigasyonu desteklenir

## 🔒 Güvenlik & Gizlilik

- **Veri Depolanmıyor**: İletişim formu hiçbir veri depolamaz, sadece e-mail gönderir
- **HTTPS Önerisi**: Sunucunuz HTTPS kullanmalıdır
- **Hiçbir Harici Betiği Yok**: Tüm JS yerelde yazılmıştır
- **GDPR Uyumlu**: Gizlilik bilgilendirmesi sağlanmıştır

## 🌍 Uluslararasılaştırme

Site şu anda Türkçe dilindedir. Başka dillere çevirmek için:
1. HTML dosyalarını aynı yapı ile yeni dil klasörlerine kopyalayın
2. Metin içeriğini çevirin
3. İç linkler dil klasörüne işaret edecek şekilde güncelleyin

## 📞 İletişim

- **E-Mail**: info@kode.edu.tr
- **İletişim Formu**: iletisim.html

## 📄 Lisans

Bu site KODE Eğitim İnisiyatifi tarafından oluşturulmuştur. Tüm hakları saklıdır.

---

**Son Güncelleme**: 4 Şubat 2026  
**Versiyon**: 1.1

## 🚀 Gelecek Geliştirme Planı

Bu proje şu anda 0 bütçe ile GitHub Pages üzerinde geliştirilmektedir. GitHub Pages yalnızca statik dosyaları (HTML, CSS, JavaScript) çalıştırabildiği için, sunucu tabanlı (PHP, Node.js, veritabanı vb.) sistemler şu aşamada kullanılamamaktadır. Buna rağmen proje, ileride kendi domain ve gerçek bir sunucuya taşındığında hiçbir şey çöpe gitmeyecek şekilde tasarlanmıştır.

VS Code üzerinde geliştirilen yapı, frontend (arayüz) ve backend (sunucu) mantığını kesin olarak birbirinden ayırır. Şu an kullanılan geçici çözümler (localStorage veya Firebase gibi) ileride kolayca gerçek bir backend ile değiştirilebilecek şekilde konumlandırılmıştır.

### Kullanıcı Sistemi Mantığı

Web sitesine "Kaydol" ve "Giriş Yap" bölümleri eklenecektir. Kullanıcı giriş yaptığında bu butonlar gizlenecek, yerine "Hesabım" butonu gelecektir. "Hesabım" sayfasında kullanıcı:

- Profil bilgilerini (isim, açıklama, profil simgesi)
- Oturumu kapatma
- Hesabı silme

işlemlerini yapabilecektir.

Kullanıcının giriş durumu tarayıcı tarafında kontrol edilir ve buna göre arayüz dinamik olarak güncellenir. Bu mantık, ileride gerçek bir sunucuya geçildiğinde de aynen kullanılacaktır.

### Forum / Haberler Bölümü Mantığı

Forum kısmı Reddit benzeri bir yapıda planlanmıştır. Kullanıcılar:

- Konu açabilecek
- Sorunlarını paylaşabilecek
- Ürün (robot) ile ilgili deneyimlerini yazabilecek

Şu an veriler geçici olarak tarayıcı tarafında veya Firebase üzerinden tutulmaktadır. Ancak arayüz, ileride API üzerinden veri alacak şekilde tasarlanmıştır. Yani forumun HTML ve CSS yapısı değişmeden, sadece veri kaynağı değiştirilerek gerçek veritabanına geçiş yapılabilecektir.

### VS Code'da Geliştirme Prensibi

Tüm JavaScript dosyaları şu mantıkla yazılır:

- Arayüz (butonlar, sayfalar) → sadece kullanıcıyla ilgilenir
- Veri işlemleri → ayrı bir mantık katmanında toplanır
- HTML dosyaları backend'in nasıl çalıştığını bilmez

Bu sayede:

- GitHub Pages üzerinde çalışan bir sistem oluşur
- Domain ve sunucu alındığında yalnızca veri katmanı değiştirilir
- Tüm site baştan yazılmak zorunda kalmaz

### Gelecek Taşıma Planı

İleride:

- GitHub Pages kapatılacak
- Domain + hosting alınacak
- Node.js veya benzeri bir backend kurulacak
- Veritabanı bağlanacak

Bu aşamada sadece backend kısmı değiştirilecek, mevcut frontend yapısı aynen korunacaktır.

Bu proje, geçici değil; ileride gerçek ürüne dönüşecek şekilde VS Code üzerinde planlanmış ve geliştirilmektedir.
