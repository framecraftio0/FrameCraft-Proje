# 🌐 FrameCraftAI - Proje Haritası (YENİ MİMARİ)

**Son Güncelleme:** 3 Şubat 2026  
** Proje Durumu:** Yeni Mimari - Faz 2 Tamamlandı, Faz 9'a doğru ilerliyor ✅

---

## 📊 Genel Bakış

**FrameCraftAI**, yapay zeka destekli **hybrid component strategy** kullanarak otomatik web siteleri üreten yenilikçi bir SaaS platformudur.

### 🎯 Ana Yenilik: Hybrid Component Strategy

```
🎨 15-20 Premium GitHub Components (Elle tasarlanmış, sektöre özel)
        +
✨ Sınırsız AI-Generated Components (Gemini 2.0 Flash ile ihtiyaca göre)
        =
💡 Sürdürülebilir, Akıllı, Ölçeklenebilir Platform
```

### Teknoloji Yığını
- **Frontend:** React 18, TypeScript, Vite, TailwindCSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **AI Integration:** N8N + Google Gemini 2.0 Flash
- **Component Library:** GitHub Repository (version controlled)
- **Deployment:** Vercel (frontend), Railway (N8N)

---

## 🎉 TAMAMLANAN FAZLAR

### ✅ Faz 1: Temel Kurulum ve Altyapı (100% Tamamlandı)

**Yapılan İşler:**

**1. Proje Yapısı ve Kurulum**
- ✅ Vite + React + TypeScript kurulumu
- ✅ TailwindCSS konfigürasyonu
- ✅ Folder structure oluşturuldu
- ✅ ESLint ve Prettier ayarları
- ✅ Git repository başlatıldı
- ✅ Path alias yapılandırması (`@/`)

**2. Supabase Backend Entegrasyonu**
- ✅ Supabase client konfigürasyonu
- ✅ Environment variables setup
- ✅ İlk database migration (`001-005`)
- ✅ Storage bucket yapılandırması

**3. Database Schema (İlk Versiyon - ESKİ)**
```
Tables (ESKİ ŞEMA):
├── profiles (kullanıcı profilleri)
├── websites (kullanıcı web siteleri)
├── pages (site sayfaları)
├── sections (sayfa bölümleri)
├── components (Figma bileşenleri)
├── component_templates (hazır şablonlar)
├── media_assets (resim/video yönetimi)
└── activity_logs (kullanıcı aktiviteleri)
```

**4. Routing ve Sayfa Yapısı**
- ✅ React Router v7 kurulumu
- ✅ Public routes (Landing, Pricing, Privacy, Terms)
- ✅ Auth routes (Login, Signup, Forgot/Reset Password)
- ✅ Protected routes (Dashboard, Profile)
- ✅ Admin routes (AdminDashboard, AdminLogin)
- ✅ 404 error page

**5. UI Components**
- ✅ AuthLayout (giriş/kayıt sayfaları için layout)
- ✅ ProtectedRoute (yetkilendirme koruma)
- ✅ Navigation components
- ✅ Form components

**6. Landing Page**
- ✅ Modern hero section
- ✅ Features showcase
- ✅ Pricing tiers
- ✅ Testimonials
- ✅ CTA sections
- ✅ Footer
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Framer Motion animasyonları

---

### ✅ Faz 2: Authentication ve Kullanıcı Yönetimi (100% Tamamlandı)

**Yapılan İşler:**

**1. Supabase Authentication Entegrasyonu**
- ✅ Mock auth → Supabase Auth migration
- ✅ Email/Password authentication
- ✅ Session management
- ✅ Auto-refresh tokens
- ✅ Auth state listener
- ✅ AuthContext Provider

**2. Google OAuth Integration**
- ✅ Google provider konfigürasyonu
- ✅ OAuth flow implementasyonu
- ✅ Social login butonları (Login & Signup)
- ✅ Callback handling
- ✅ Otomatik profil oluşturma

**3. Email Verification**
- ✅ Signup sonrası otomatik email gönderimi
- ✅ Email doğrulama linki
- ✅ Verification success/error handling
- ✅ Email verified badge
- ✅ Resend verification email

**4. Password Management**
- ✅ Forgot Password sayfası
- ✅ Reset password email akışı
- ✅ Reset Password sayfası
- ✅ New password validation
- ✅ Update password fonksiyonu

**5. Database Schema Genişletilmesi**
```
Profiles table eklenenler:
├── phone, address, city, country, postal_code
├── bio
├── email_verified
├── role (user/admin)
└── updated_at (otomatik)
```

**6. Extended User Profile**
- ✅ Profil düzenleme formu
- ✅ Avatar upload (Supabase Storage)
- ✅ Tüm opsiyonel alanlar
- ✅ Edit/Save mode toggle
- ✅ Success/Error mesajları
- ✅ File validation
- ✅ Responsive grid layout

**7. Auth Pages**
```
Sayfalar:
├── Login.tsx (Email + Google OAuth)
├── Signup.tsx (Email + Google OAuth + Email verification)
├── ForgotPassword.tsx
├── ResetPassword.tsx
└── AdminLogin.tsx
```

**8. Database Triggers & Functions**
- ✅ Auto-create profile on signup
- ✅ Auto-update `updated_at` timestamp
- ✅ Row Level Security (RLS) policies
- ✅ Future-proof schema

**9. Database Migrations**
```
Çalıştırılmış migrations:
├── 001_initial_schema.sql
├── 002_extend_profiles.sql
├── 003_add_business_name_logic.sql
├── 004_fix_admin_rls.sql
└── 005_fix_visibility_perms.sql
```

---

## 🚧 DEVAM EDEN / PLANLANAN FAZLAR

### 📋 Faz 3: Database Schema Migration - YENİ MİMARİ ⚠️ ACİL

**Durum:** ⚠️ Migration dosyası hazır, çalıştırılması gerekiyor

**Yeni/Güncellenecek Tablolar:**

**1. `component_templates` (BÜYÜK GÜNCELLEME)**
```sql
Yeni kolonlar:
├── github_path TEXT
├── github_commit_sha TEXT
├── last_synced_at TIMESTAMPTZ
├── preview_desktop_url TEXT
├── preview_tablet_url TEXT
├── preview_mobile_url TEXT
├── editable_fields JSONB (enhanced)
├── best_for_sectors TEXT[]
├── not_recommended_for TEXT[]
├── features TEXT[]
├── libraries_required TEXT[]
├── performance_impact TEXT
├── min_viewport_width INT
├── is_premium BOOLEAN
├── complexity TEXT
└── average_rating DECIMAL
```

**2. `website_components` (BÜYÜK GÜNCELLEME)**
```sql
Yeni kolonlar:
├── source_type TEXT ('github' | 'ai-generated')
├── ai_generated_html TEXT
├── ai_generated_css TEXT
├── ai_generated_js TEXT
├── ai_generation_prompt TEXT
├── ai_model_used TEXT
├── ai_generation_id UUID
├── section_name TEXT
├── version INT
└── previous_version_id UUID
```

**3. `ai_site_generations` (YENİ TABLO)**
```sql
Kolonlar:
├── id, website_id, user_id
├── business_name, business_sector
├── user_description, user_preferences
├── sector_analysis JSONB
├── recommended_pages JSONB
├── component_decisions JSONB
├── design_guidelines JSONB
├── github_components_used INT
├── ai_components_generated INT
└── total_generation_time_ms, total_tokens_used
```

**4. `component_sync_history` (YENİ TABLO)**
```sql
GitHub → Supabase sync tracking:
├── github_commit_sha, github_branch
├── components_added, updated, deleted
├── sync_status, error_log
└── changed_components JSONB
```

**5. `admin_settings` (YENİ TABLO)**
```sql
Sistem konfigürasyonu:
├── key, value JSONB
├── category, description
└── is_secret BOOLEAN
```

**6. `websites` (GÜNCELLEME)**
```sql
Yeni kolonlar:
├── sitemap JSONB
├── global_styles JSONB
├── custom_css, custom_js
├── google_analytics_id
├── facebook_pixel_id
├── lighthouse_score JSONB
└── page_views, unique_visitors
```

**Adımlar:**
- [x] Migration dosyası oluşturuldu (`006_new_architecture.sql`)
- [ ] Supabase SQL Editor'da çalıştır
- [ ] Admin settings default data insert
- [ ] Verification queries çalıştır
- [ ] Test et

---

### 📋 Faz 4: N8N Workflow Setup ⚠️ KRİTİK

**Durum:** ⚠️ Railway.app'te kurulacak

**Kurulacak Workflows:**

**1. AI Site Generator** (Ana Workflow)
```
Nodes:
1. Webhook Trigger (/webhook/generate-site)
2. Validate Input
3. Gemini: Sector Analysis
4. Parse AI Response
5. Supabase: Fetch GitHub Components
6. Component Decision Logic
7. Loop: Generate AI Components
8. Gemini: Generate Content
9. Assemble Full Site
10. Supabase: Create Website
11. Supabase: Insert Components
12. Log AI Site Generation
13. Respond to Webhook

Input: business_name, sector, description, preferences
Output: website_id, subdomain, preview_url, stats
Hedef Süre: < 30 saniye
```

**2. GitHub Component Sync**
```
Nodes:
1. GitHub Webhook Trigger
2. Parse Changed Components
3. Loop: For Each Component
4. Fetch Files from GitHub
5. Parse config.json
6. Upload Preview to Supabase Storage
7. Upsert component_templates
8. Log Sync History

Trigger: GitHub push event
```

**3. AI Text Improvement**
```
Nodes:
1. Webhook Trigger (/webhook/improve-text)
2. Gemini: Improve Text
3. Return Result

Input: current_text, tone, max_length
Output: improved text
```

**4. AI Image Generation** (Opsiyonel)
```
Nodes:
1. Webhook Trigger (/webhook/generate-image)
2. Gemini: Enhance Prompt
3. Stable Diffusion API / Unsplash
4. Upload to Supabase Storage
5. Insert media_assets
6. Return Image URL
```

**Adımlar:**
- [ ] Railway.app hesabı aç
- [ ] N8N instance deploy et
- [ ] 4 workflow oluştur
- [ ] Credentials ekle (Supabase, Gemini, GitHub)
- [ ] Webhook URL'leri kaydet
- [ ] `.env` dosyasını güncelle
- [ ] Her workflow'u test et

---

### 📋 Faz 5: GitHub Component Library ⚠️ YÜKSEK ÖNCELİK

**Durum:** ⚠️ Repository oluşturulacak

**Repository Yapısı:**
```
framecraftai-components/
├── README.md
├── .github/workflows/
│   └── sync-to-supabase.yml
├── _templates/
│   └── config.template.json
├── heroes/
│   ├── hero-parallax-3d/
│   ├── hero-video-overlay/
│   └── hero-split-animated/
├── features/
├── galleries/
├── testimonials/
├── pricing/
├── ctas/
├── forms/
└── footers/
```

**İlk 15-20 Premium Components:**
- [ ] **Heroes:** hero-parallax-3d, hero-video-overlay, hero-split-animated (3-4)
- [ ] **Features:** features-scroll-reveal, features-grid-hover (2-3)
- [ ] **Galleries:** gallery-masonry, gallery-lightbox (2)
- [ ] **Testimonials:** testimonials-marquee, testimonials-slider (2)
- [ ] **Pricing:** pricing-3d, pricing-simple (2)
- [ ] **CTAs:** cta-gradient, cta-centered (2)
- [ ] **Forms:** contact-modern, newsletter-inline (2)
- [ ] **Footers:** footer-mega, footer-minimal (2)

**Adımlar:**
- [ ] GitHub'da repo oluştur (`framecraftai-components`)
- [ ] Klasör yapısı hazırla
- [ ] config.template.json ekle
- [ ] GitHub Actions workflow ekle
- [ ] İlk 5 example component ekle
- [ ] GitHub Personal Access Token oluştur
- [ ] GitHub Webhook kur (N8N'e)
- [ ] Test: Push yap → N8N tetiklenmeli

---

### 📋 Faz 6: Dashboard & Website Management (0% - Kodlanacak)

**Durum:** ⚠️ Frontend development başlayacak

**Yapılacak Sayfalar:**

**1. Dashboard Ana Sayfa** (`/dashboard`)
- [ ] Web siteleri listesi (card view)
- [ ] "Yeni Web Sitesi Oluştur" butonu
- [ ] Boş durum (empty state)
- [ ] Son aktiviteler feed
- [ ] Kullanım istatistikleri (sites, AI gens)

**2. Create Website Wizard** (`/dashboard/websites/new`)
- [ ] **Adım 1:** İşletme bilgileri
  - Business name input
  - Sector dropdown (50+ sektör)
  - Description textarea
- [ ] **Adım 2:** Tercihler
  - Style selection (modern, minimal, bold, elegant)
  - Target audience
  - Features checklist (booking, gallery, blog, etc.)
- [ ] **Adım 3:** AI Generation
  - N8N webhook POST request
  - Loading state (progress bar, 30s countdown)
  - Success → redirect to builder
- [ ] Form validation (Zod)
- [ ] Error handling

**3. Website Builder** (`/dashboard/websites/:id/builder`)
- [ ] **Sol Sidebar:**
  - Site info (name, subdomain)
  - Pages list (Home, About, Contact)
  - Add page button
  - Publish button
- [ ] **Center Canvas:**
  - Responsive preview iframe
  - Device switcher (desktop/tablet/mobile)
  - Component selection (click to select)
- [ ] **Sağ Sidebar:**
  - Component editor panel
  - Field-based editing (text, image, button, video)
  - Style controls (font size, color, weight)
  - AI Assistant tab
- [ ] Real-time Supabase sync
- [ ] Undo/Redo (gelecek)
- [ ] Drag & drop (gelecek)

**4. Component Editor** (Sağ Panel)
- [ ] Text fields (textarea + style controls)
- [ ] Image fields (upload + AI generation)
- [ ] Button fields (text + link + style)
- [ ] Video fields (YouTube/Vimeo/upload)
- [ ] Style controls:
  - Font size slider
  - Color picker
  - Font weight dropdown
  - Text align buttons
- [ ] AI Assistant tab:
  - "Improve this text" button
  - Tone selector (professional/casual/persuasive)
  - Apply changes preview

**5. Media Library** (`/dashboard/media`)
- [ ] Uploaded images/videos grid
- [ ] Upload button (drag & drop)
- [ ] AI image generation dialog
- [ ] Search, filter, tags
- [ ] Usage tracking
- [ ] Delete confirmation

**6. Website Settings** (`/dashboard/websites/:id/settings`)
- [ ] Domain settings (subdomain, custom domain)
- [ ] SEO settings (meta title, description, OG image)
- [ ] Analytics integration (Google Analytics, Facebook Pixel)
- [ ] Global styles (colors, fonts)
- [ ] Custom CSS/JS
- [ ] Delete website (confirmation)

---

### 📋 Faz 7: AI Integration (Frontend) (0%)

**Durum:** ⚠️ N8N bittikten sonra

**Frontend AI Features:**

**1. AI Text Improvement**
```typescript
// Button: "✨ Improve with AI"
const improveText = async (fieldId, currentText) => {
  const response = await fetch(VITE_N8N_AI_IMPROVE_TEXT_URL, {
    method: 'POST',
    body: JSON.stringify({
      component_id,
      field_id: fieldId,
      current_text: currentText,
      tone: selectedTone,
      max_length: 100
    })
  });
  const { improved } = await response.json();
  // Apply to component
};
```

**2. AI Image Generation**
```typescript
// Button: "✨ Generate with AI"
const generateImage = async (prompt) => {
  setLoading(true);
  const response = await fetch(VITE_N8N_AI_GENERATE_IMAGE_URL, {
    method: 'POST',
    body: JSON.stringify({
      user_id,
      prompt,
      width: 1920,
      height: 1080,
      style: 'photography'
    })
  });
  const { imageUrl } = await response.json();
  setLoading(false);
};
```

**3. AI Chat Assistant** (Component Panel)
- [ ] Chat interface (right panel tab)
- [ ] Natural language commands
  - "Make the heading catchier"
  - "Change button color to blue"
  - "Add a call-to-action"
- [ ] Context-aware suggestions
- [ ] Apply changes preview

---

### 📋 Faz 8: Component Management & Admin Panel (10%)

**Durum:** 📋 Basit AdminDashboard mevcut, genişletilecek

**Mevcut:**
- ✅ AdminDashboard.tsx (basit)
- ✅ AdminLogin.tsx

**Yapılacaklar:**
- [ ] **User Management:**
  - Kullanıcı listesi (tablo)
  - Arama ve filtreleme
  - User details modal
  - Ban/unban user
  - Credit management
- [ ] **Component Management:**
  - GitHub'dan sync edilen components listesi
  - Usage statistics (hangi component kaç kez kullanılmış)
  - Preview modal
  - Edit component metadata
  - Delete component
  - Rating/review system
- [ ] **Admin Settings:**
  - API keys yönetimi (Gemini, Stability)
  - N8N webhook URLs
  - System limits (max sites, daily AI gens)
  - Feature flags (enable/disable features)
  - Pricing tiers configuration
- [ ] **Analytics Dashboard:**
  - Total users, sites, AI generations
  - Most used components (chart)
  - AI usage trends (line chart)
  - Revenue tracking (gelecekte)
  - Daily/weekly/monthly stats

---

### 📋 Faz 9: Publishing & Deployment (0%)

**Durum:** 📋 Planlandı (ileriki fazlarda)

**Yapılacaklar:**
- [ ] Build optimization
  - Code splitting
  - Lazy loading
  - Tree shaking
  - Image optimization
- [ ] Static site generation
  - Generate HTML/CSS/JS for each website
  - Optimize assets
  - Minify code
- [ ] Vercel deployment
  - Deploy user sites to Vercel Edge Functions
  - Subdomain routing (site.framecraftai.com)
  - Custom domain support
- [ ] SSL certificate
  - Auto SSL for subdomains
  - Custom domain SSL (Let's Encrypt)
- [ ] CDN integration
  - Cloudflare CDN
  - Asset optimization
  - Caching strategy
- [ ] Preview URLs
  - Draft preview (before publish)
  - Share preview link
- [ ] Version control & rollback
  - Save site versions
  - Rollback to previous version
  - Version comparison

---

## 📁 Mevcut Proje Yapısı

```
framecraftai/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthLayout.tsx ✅
│   │   │   └── ProtectedRoute.tsx ✅
│   │   ├── dashboard/ ⚠️ (yapılacak)
│   │   ├── ui/ (boş)
│   │   ├── builder/ (boş)
│   │   ├── admin/ (boş)
│   │   ├── onboarding/ (boş)
│   │   └── shared/ (boş)
│   │
│   ├── pages/
│   │   ├── Landing.tsx ✅
│   │   ├── PrivacyPolicy.tsx ✅
│   │   ├── TermsOfService.tsx ✅
│   │   ├── auth/
│   │   │   ├── Login.tsx ✅
│   │   │   ├── Signup.tsx ✅
│   │   │   ├── ForgotPassword.tsx ✅
│   │   │   ├── ResetPassword.tsx ✅
│   │   │   └── AdminLogin.tsx ✅
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx ✅ (basit)
│   │   │   └── UserProfile.tsx ✅
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx ✅ (basit)
│   │   ├── public/
│   │   │   └── NotFound.tsx ✅
│   │   └── builder/ (boş)
│   │
│   ├── lib/
│   │   ├── supabase.ts ✅
│   │   ├── auth-context.tsx ✅
│   │   ├── n8n.ts ⚠️ (oluşturulacak)
│   │   └── utils.ts ✅
│   │
│   ├── types/
│   │   ├── database.ts ✅
│   │   └── index.ts ✅
│   │
│   ├── hooks/ (boş)
│   ├── stores/ (boş)
│   ├── styles/ (boş)
│   │
│   ├── App.tsx ✅
│   ├── main.tsx ✅
│   └── index.css ✅
│
├── supabase/migrations/
│   ├── 001_initial_schema.sql ✅
│   ├── 002_extend_profiles.sql ✅
│   ├── 003_add_business_name_logic.sql ✅
│   ├── 004_fix_admin_rls.sql ✅
│   ├── 005_fix_visibility_perms.sql ✅
│   └── 006_new_architecture.sql ⚠️ (çalıştırılacak)
│
├── github-templates/
│   ├── config.template.json ✅
│   └── sync-to-supabase.yml ✅
│
├── n8n-workflows/
│   └── README.md ✅ (talimatlar)
│
├── .env ⚠️ (güncellenecek)
├── package.json ✅
├── tsconfig.json ✅
├── tailwind.config.js ✅
├── vite.config.ts ✅
├── README.md ✅
├── SETUP.md ✅
└── PROJE_HARITASI.md ✅ (bu dosya)
```

---

## 📊 İlerleme Özeti

| Faz | Durum | Tamamlanma | Açıklama |
|-----|-------|------------|----------|
| **Faz 1** | ✅ Tamamlandı | 100% | Temel kurulum ve altyapı |
| **Faz 2** | ✅ Tamamlandı | 100% | Authentication ve kullanıcı yönetimi |
| **Faz 3** | ⚠️ Hazır | 90% | Database migration (çalıştırılacak) |
| **Faz 4** | ⚠️ Bekliyor | 0% | N8N workflow setup |
| **Faz 5** | ⚠️ Bekliyor | 0% | GitHub component library |
| **Faz 6** | 📋 Planlandı | 0% | Dashboard & Website Management |
| **Faz 7** | 📋 Planlandı | 0% | AI Integration (Frontend) |
| **Faz 8** | 📋 Başlandı | 10% | Admin Panel (genişletilecek) |
| **Faz 9** | 📋 Planlandı | 0% | Publishing & Deployment |

**Genel İlerleme:** 2/9 Faz Tamamlandı (%22)

---

## 🎯 Sıradaki Öncelikler (Sıralı)

### 1️⃣ ACİL: Database Migration (Yarın)
- [ ] Supabase SQL Editor'da `006_new_architecture.sql` çalıştır
- [ ] Admin settings default data insert
- [ ] Verification queries çalıştır
- [ ] Supabase Storage buckets oluştur (4 bucket)

### 2️⃣ KRİTİK: N8N Setup (1-2 gün)
- [ ] Railway.app'te N8N instance kur
- [ ] 4 workflow oluştur (site generator, component sync, text improve, image gen)
- [ ] Credentials ekle (Supabase, Gemini API, GitHub token)
- [ ] Webhook URL'leri `.env` dosyasına ekle
- [ ] Her workflow'u test et

### 3️⃣ YÜKSEK: GitHub Repo (1 gün)
- [ ] `framecraftai-components` repository oluştur
- [ ] Klasör yapısı + template dosyaları
- [ ] GitHub Actions workflow ekle
- [ ] İlk 5 örnek component ekle
- [ ] GitHub Personal Access Token oluştur
- [ ] GitHub Webhook kur (N8N'e bağla)

### 4️⃣ ORTA: Frontend - Create Website Wizard (2-3 gün)
- [ ] `/dashboard/websites/new` sayfası
- [ ] Multi-step wizard UI (3 adım)
- [ ] Form validation
- [ ] N8N webhook entegrasyonu
- [ ] Loading states & progress bar

### 5️⃣ ORTA: Frontend - Website Builder (1 hafta)
- [ ] Canvas preview (iframe)
- [ ] Component selection
- [ ] Component editor (right panel)
- [ ] Real-time Supabase sync
- [ ] Device preview switcher

---

## 🔧 Kurulum Gereksinimleri

### ✅ Tamamlanmış
- Supabase projesi aktif
- Email provider aktif
- Google OAuth credentials eklendi
- Database migration 001-005 çalıştırıldı
- Storage buckets: `media`, `user-avatars`

### ⚠️ Yapılacaklar (Manuel - Yarın)
- [ ] Database migration 006 çalıştır
- [ ] Storage buckets ekle: `component-previews`, `website-assets`
- [ ] N8N instance kur (Railway.app)
- [ ] N8N workflows oluştur
- [ ] Gemini API key al
- [ ] GitHub repo oluştur + webhook
- [ ] .env dosyasını güncelle

---

## 📈 Başarı Kriterleri (KPI)

### Teknik Metrikler
- ✅ Site generation time: < 30 saniye (hedef)
- ✅ Uptime: > 99.9%
- ✅ Page load time: < 2 saniye
- ✅ Error rate: < 0.1%
- ✅ Lighthouse score: > 90

### İş Metrikleri
- User signups (günlük/haftalık/aylık)
- Sites created (kullanıcı başına ortalama)
- Published sites (draft → published conversion)
- AI usage (ortalama AI generation per site)
- Component usage (En popüler GitHub components)
- User retention (7-day, 30-day)

---

## 💡 Yeni Mimarinin Avantajları

### ✅ Sürdürülebilirlik
- 15-20 component yönetmek yüzlerce yönetmekten çok daha kolay
- GitHub version control ile tam kontrol
- AI geri kalanını hallediyor

### ✅ Kalite
- Elle hazırlanmış premium components (yüksek kalite)
- AI-generated components (sınırsız çeşitlilik)
- Sektöre özel optimizasyon

### ✅ Hız
- Gemini 2.0 Flash çok hızlı
- 30 saniyede tam site
- Gerçek zamanlı önizleme

### ✅ Maliyet
- Gemini free tier: 60 req/min
- Minimal infrastructure
- Ölçeklenebilir

### ✅ Developer Experience
- Temiz, anlaşılır mimari
- TypeScript type safety
- Modern tooling

---

## 📞 İletişim ve Destek

**Proje:** FrameCraftAI  
**Versiyon:** 0.3.0 (YENİ MİMARİ)  
**Son Güncelleme:** 3 Şubat 2026

**Dokümantasyon:**
- `README.md` - Genel proje açıklaması
- `SETUP.md` - Kurulum rehberi
- `PROJE_HARITASI.md` - Bu dosya (Teknik yol haritası)
- `PROJE_DURUMU_REVIZE.md` - Türkçe durum raporu
- `MANUEL_GOREVLER.md` - Manuel yapılacaklar listesi

---

## 🎉 Sonuç

FrameCraftAI projesi **yeni ve akıllı bir mimariye** geçiş yapıyor:

**Tamamlanan:**
- ✅ Faz 1-2: Temel altyapı ve authentication (%100)
- ✅ Faz 3: Database migration dosyası hazır (%90)

**Acil Öncelikler:**
1. 🔴 Database migration çalıştır (10 dakika)
2. 🔴 N8N workflow setup (1-2 gün)
3. 🔴 GitHub component library (1 gün)

**Ana Yenilik:**
- 15-20 premium GitHub components
- + Sınırsız AI-generated components (Gemini 2.0 Flash)
- = Sürdürülebilir, ölçeklenebilir, kaliteli platform

**Hedef:**
- 30 saniyede tam website generation
- Production-ready hybrid component system
- AI-first user experience

**Sonraki 3 Hafta:**
- Hafta 1: Backend (Database + N8N + GitHub)
- Hafta 2: Frontend (Wizard + Dashboard + Builder temelleri)
- Hafta 3: Integration (AI features + Testing + Polish)

---

**Not:** Bu proje haritası, FrameCraftAI'nın tüm geliştirme fazlarını ve mevcut durumunu gösterir. Her faz tamamlandıkça bu dosya güncellenecektir.
