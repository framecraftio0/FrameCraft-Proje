# FrameCraftAI - Proje Kurulum Rehberi

## Hızlı Başlangıç

### 1. Bağımlılıkları Yükleyin
```bash
cd framecraftai
npm install
```

### 2. Ortam Değişkenlerini Ayarlayın
```bash
# Örnek dosyayı kopyalayın
cp .env.example .env

# .env dosyasını düzenleyin ve kimlik bilgilerinizi ekleyin
# - Supabase URL ve anon key (auth ve veritabanı için gerekli)
# - N8N webhook URL'leri (isteğe bağlı, yapay zeka özellikleri için)
```

### 3. Supabase'i Ayarlayın

#### Proje Oluşturun
1. [supabase.com](https://supabase.com) adresine gidin
2. "New Project" (Yeni Proje) butonuna tıklayın
3. Organizasyon seçin ve proje adını belirleyin
4. Projenin başlatılmasını bekleyin

#### Veritabanı Migration'ını Çalıştırın
1. Supabase proje dashboard'unuza gidin
2. Sol kenar çubuğunda "SQL Editor" seçeneğine tıklayın
3. "New query" (Yeni sorgu) butonuna tıklayın
4. `supabase/migrations/001_initial_schema.sql` dosyasının tüm içeriğini kopyalayın
5. Editöre yapıştırın
6. Çalıştırmak için "Run" (Çalıştır) butonuna tıklayın
7. Tüm tabloların başarıyla oluşturulduğunu doğrulayın

#### Storage Bucket'larını Oluşturun
1. Sol kenar çubuğunda "Storage" seçeneğine gidin
2. Üç yeni bucket oluşturun:
   - Ad: `media` | Genel: Evet | Dosya boyutu limiti: 10MB
   - Ad: `component-previews` | Genel: Evet | Dosya boyutu limiti: 5MB
   - Ad: `website-assets` | Genel: Evet | Dosya boyutu limiti: 50MB

#### API Kimlik Bilgilerini Alın
1. "Settings" (Ayarlar) → "API" bölümüne gidin
2. "Project URL" (Proje URL'si) değerini kopyalayın
3. "anon public" anahtarını kopyalayın
4. Her ikisini de `.env` dosyanıza ekleyin

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Uygulamayı görmek için [http://localhost:5173](http://localhost:5173) adresini açın!

---

## Proje Yapısı Açıklaması

### `/src/components`
Özelliğe göre düzenlenmiş yeniden kullanılabilir React bileşenleri:
- `ui/` - Temel UI bileşenleri (butonlar, inputlar, vb.) - *Shadcn/UI buraya gelecek*
- `auth/` - Kimlik doğrulama formları ve akışları
- `dashboard/` - Dashboard'a özgü bileşenler
- `builder/` - Web sitesi editörü arayüz bileşenleri
- `admin/` - Admin panel bileşenleri
- `onboarding/` - Yeni web sitesi oluşturma sihirbazı
- `shared/` - Birden fazla özellikte kullanılan bileşenler

### `/src/pages`
Her rota için üst düzey sayfa bileşenleri:
- `Landing.tsx` - Pazarlama açılış sayfası ✅
- `auth/` - Giriş, kayıt, şifre sıfırlama sayfaları
- `dashboard/` - Kullanıcı dashboard'u ve web sitesi yönetimi
- `builder/` - Görsel web sitesi editörü
- `admin/` - Admin panel sayfaları

### `/src/lib`
Yardımcı kütüphaneler ve API istemcileri:
- `supabase.ts` - Supabase istemcisi ve yardımcı fonksiyonlar
- `n8n.ts` - Yapay zeka özellikleri için N8N webhook istemcisi
- `utils.ts` - Genel yardımcı fonksiyonlar

### `/src/hooks`
Yeniden kullanılabilir mantık için özel React hook'ları (gerektiğinde oluşturulacak)

### `/src/stores`
Zustand durum yönetimi store'ları (gerektiğinde oluşturulacak)

### `/src/types`
TypeScript tip tanımlamaları:
- `database.ts` - Supabase şemasından otomatik oluşturulan
- `index.ts` - Uygulama düzeyinde tip tanımlamaları

---

## Kullanılabilir Komutlar

### Geliştirme
```bash
npm run dev          # HMR ile dev sunucusunu başlat
npm run build        # Production için build et
npm run preview      # Production build'ini yerel olarak önizle
npm run lint         # ESLint'i çalıştır
```

### Test (kurulacak)
```bash
npm test             # Unit testleri çalıştır
npm run test:e2e     # End-to-end testleri çalıştır
```

---

## Teknoloji Genel Bakış

### Frontend Yığını
- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Vite** - Build aracı ve dev sunucusu
- **TailwindCSS** - Utility-first CSS
- **React Router** - İstemci tarafı yönlendirme
- **Framer Motion** - Animasyonlar
- **Zustand** - Durum yönetimi
- **React Query** - Sunucu durum yönetimi

### Backend Servisleri
- **Supabase** - Veritabanı, auth, storage, real-time
- **N8N** - Yapay zeka için iş akışı otomasyonu
- **Gemini API** - Yapay zeka içerik üretimi
- **Nano Banana** - Yapay zeka görsel üretimi

### Geliştirme Araçları
- **TypeScript** - Statik tipleme
- **ESLint** - Kod linting
- **PostCSS** - CSS işleme
- **Vite HMR** - Hot module replacement

---

## Ortam Değişkenleri Açıklaması

### Gerekli (Supabase)
```env
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```
Bunlar kimlik doğrulama, veritabanı erişimi ve storage için gereklidir.

### İsteğe Bağlı (N8N Webhook'ları)
```env
VITE_N8N_SITEMAP_WEBHOOK=https://n8n.yourdomain.com/webhook/sitemap-generator
VITE_N8N_WEBSITE_GEN_WEBHOOK=https://n8n.yourdomain.com/webhook/website-generator
VITE_N8N_IMAGE_GEN_WEBHOOK=https://n8n.yourdomain.com/webhook/image-generator
VITE_N8N_VIBE_CHAT_WEBHOOK=https://n8n.yourdomain.com/webhook/vibe-chat
```
Bunlar sadece yapay zeka özelliklerinin çalışmasını istiyorsanız gereklidir. Başlangıçta bunlar olmadan da geliştirebilirsiniz.

### Uygulama Yapılandırması
```env
VITE_APP_URL=http://localhost:5173
VITE_SUBDOMAIN_BASE=framecraftai.com
```
Önizleme URL'leri ve özel domain'ler oluşturmak için kullanılır.

---

## Veritabanı Şeması Genel Bakış

### Ana Tablolar

#### `profiles` 
Supabase auth'u genişleten kullanıcı profilleri
- `auth.users` ile bağlantılı
- İşletme bilgilerini, aboneliği, kredileri saklar

#### `component_templates`
Figma'dan önceden tasarlanmış bileşen kütüphanesi
- HTML/CSS/JS şablonları
- Düzenlenebilir alanlar yapılandırması
- Önizleme görselleri
- Kategoriler ve etiketler

#### `websites`
Kullanıcı web siteleri
- Site haritası (sayfalar ve yapı)
- Global stiller
- SEO ayarları
- Yayınlama durumu

#### `website_components`
Web sitelerindeki bileşen örnekleri
- Şablona bağlantı
- Özel içerik ve stiller
- Sayfadaki konum

#### `media_assets`
Kullanıcının medya kütüphanesi
- Resimler ve videolar
- Supabase storage referansları
- Metadata ve alt metin

#### `ai_generations`
Yapay zeka kullanımını takip
- Tip (sitemap, content, image, chat)
- Kullanılan krediler
- Sonuçlar ve durum

---

## Sonraki Faz: Kimlik Doğrulama

Yukarıdaki Supabase kurulumunu tamamladıktan sonra, Faz 2'ye başlamaya hazırsınız:

1. **Auth Sayfaları Oluştur**
   - E-posta/şifre ile giriş formu
   - Doğrulama ile kayıt formu
   - Şifre sıfırlama akışı
   - E-posta doğrulama

2. **Auth Context Provider**
   - Kullanıcı oturumunu yönet
   - Kimlik doğrulamayı sürdür
   - Bileşenlere auth durumunu sağla

3. **Korumalı Rotalar**
   - Kimliği doğrulanmamış kullanıcıları yönlendir
   - İzinleri kontrol et
   - Yükleme durumlarını yönet

4. **Kullanıcı Profili**
   - Profili görüntüle ve düzenle
   - Avatar yükle
   - Ayarları yönet

---

## Sorun Giderme

### "Supabase URL not found" (Supabase URL bulunamadı)
`.env` dosyasını oluşturduğunuzdan ve Supabase kimlik bilgilerinizi eklediğinizden emin olun.

### "Cannot find module '@/...'" (Modül bulunamıyor)
Path alias çözümlenmiyor olabilir. Dev sunucunuzu yeniden başlatın:
```bash
# Durdurmak için Ctrl+C
npm run dev
```

### Veritabanı hataları
Supabase SQL Editor'da migration dosyasını çalıştırdığınızdan emin olun.

### TypeScript hataları
Veritabanı tiplerinizi yeniden oluşturmayı deneyin. Bunu Faz 2'de kuracağız.

---

## Yardım Alma

- **Dokümantasyon**: `README.md` ve `walkthrough.md` dosyalarına bakın
- **Görev Listesi**: İlerleme için `task.md` dosyasını kontrol edin
- **Uygulama Planı**: Genel mimari için `implementation_plan.md` dosyasına bakın

---

## Şu Anda Çalışan

✅ **Geliştirme sunucusu** - Vite ile hızlı HMR
✅ **Açılış sayfası** - Güzel pazarlama sayfası
✅ **Yönlendirme** - React Router yapılandırıldı
✅ **Stil** - Özel tema ile TailwindCSS
✅ **Animasyonlar** - Framer Motion hazır
✅ **Tip güvenliği** - Tam TypeScript desteği
✅ **Path alias'ları** - `@/` ile temiz import'lar
✅ **Veritabanı şeması** - Supabase'de çalıştırılmaya hazır
✅ **Yardımcı fonksiyonlar** - Ortak yardımcılar hazır
✅ **API istemcileri** - Supabase ve N8N istemcileri yapılandırıldı

---

**Mutlu kodlamalar! 🚀**
