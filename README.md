# FrameCraftAI - Yapay Zeka Destekli Web Sitesi Oluşturucu Platformu

Kullanıcıların yapay zeka destekli içerik üretimi, önceden tasarlanmış bileşenler ve görsel sürükle-bırak editörü kullanarak profesyonel web siteleri oluşturmasına olanak tanıyan kapsamlı bir SaaS web uygulaması.

## 🚀 Özellikler

- **Yapay Zeka Destekli Site Haritası Oluşturma**: İşletme bilgilerine dayalı olarak otomatik olarak eksiksiz web sitesi yapısı oluşturur
- **Akıllı İçerik Oluşturma**: Yapay zeka tüm web sitesi bölümleri için ilgi çekici içerik üretir
- **Görsel Sürükle Bırak Editör**: Web sitenizi özelleştirmek için sezgisel arayüz
- **Bileşen Kütüphanesi**: Profesyonelce tasarlanmış, özelleştirilebilir yüzlerce bileşen
- **Yapay Zeka Görsel Üretimi**: Markanıza uygun özel görseller oluşturun
- **Vibe Kodlama**: Bileşenleri doğal dil kullanarak değiştirmek için yapay zeka ile sohbet edin
- **Gerçek Zamanlı Önizleme**: Değişiklikleri masaüstü, tablet ve mobil cihazlarda anında görün
- **Tek Tıkla Yayınlama**: Web sitenizi özel subdomain veya domain ile yayınlayın
- **Medya Kütüphanesi**: Tüm resimlerinizi ve videolarınızı tek yerde yönetin

## 🛠️ Teknoloji Yığını

### Ön Yüz
- **React 18+** ile TypeScript
- Stil için **TailwindCSS** + Shadcn/UI
- Durum yönetimi için **Zustand**
- Veri çekme için **TanStack Query** (React Query)
- Sürükle bırak işlevselliği için **@dnd-kit**
- Animasyonlar için **Framer Motion**
- Zengin metin düzenleme için **TipTap**
- Form doğrulama için **React Hook Form** + Zod

### Arka Yüz ve Veritabanı
- **Supabase** (PostgreSQL, Auth, Storage, Realtime)
- İş akışı otomasyonu için **N8N**
- Yapay zeka içerik üretimi için **Google Gemini API**
- Yapay zeka görsel üretimi için **Nano Banana API**

### Deployment
- Ön yüz hosting için **Vercel**
- Veritabanı için **Supabase Cloud**
- Railway veya self-hosted üzerinde **N8N**

## 📦 Kurulum

### Ön Gereksinimler

- Node.js 18+ ve npm
- Supabase hesabı
- Google Gemini API anahtarı
- Nano Banana API anahtarı (veya Stable Diffusion)
- N8N instance (yapay zeka özellikleri için isteğe bağlı)

### Kurulum Adımları

1. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

2. **Ortam değişkenlerini yapılandırın**
   ```bash
   cp .env.example .env
   ```

3. **Supabase veritabanını ayarlayın**
   - Yeni bir Supabase projesi oluşturun
   - Migration dosyasını çalıştırın: `supabase/migrations/001_initial_schema.sql`

4. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

Detaylı kurulum için `SETUP.md` dosyasına bakın.

## 📝 Geliştirme İş Akışı

### Mevcut Faz: Temel Kurulum ✅

- [x] Proje başlatma
- [x] Bağımlılıkları yükleme
- [x] Yapılandırma
- [x] Veritabanı şeması
- [x] Açılış sayfası

### Sonraki Adımlar

1. **Faz 2**: Kimlik Doğrulama
2. **Faz 3**: Temel Bileşenler
3. **Faz 4**: Dashboard
4. **Faz 5**: Onboarding
5. **Faz 6**: Web Sitesi Editörü
6. **Faz 7**: Yapay Zeka Özellikleri
7. **Faz 8**: Admin Paneli
8. **Faz 9**: Yayınlama Sistemi

## 📧 Destek

Destek için support@framecraftai.com adresine e-posta gönderin

---

**React, TypeScript, Supabase ve Yapay Zeka ile ❤️ ile oluşturuldu**
