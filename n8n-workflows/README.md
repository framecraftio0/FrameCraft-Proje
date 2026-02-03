# N8N Workflow'ları - Kurulum Talimatları

Bu klasörde N8N workflow'ları için detaylı talimatlar bulunmaktadır.

## Workflow'lar

### 1. AI Site Generator (`ai-site-generator.md`)
Ana workflow - kullanıcı input'undan tam website oluşturur.

**Nodes:**
1. Webhook Trigger (POST /webhook/generate-site)
2. Validate Input
3. HTTP Request → Gemini API (Sector Analysis)
4. Code → Parse AI Response  
5. Supabase → Fetch Matching Components
6. Code → Component Decision Logic
7. Loop → Generate AI Components (for each missing)
8. HTTP Request → Gemini API (Content Generation)
9. Code → Assemble Full Site
10. Supabase → Insert Website
11. Supabase → Insert Components (bulk)
12. Supabase → Log AI Site Generation
13. Respond to Webhook

**Credentials Gerekli:**
- Supabase URL: `https://afnvmocnzbenttcbnkcr.supabase.co`
- Supabase anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmbnZtb2NuemJlbnR0Y2Jua2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4OTIwNjEsImV4cCI6MjA4NTQ2ODA2MX0.EHcKc2J_XEeGLAv9HvsGdgZqJrMMGMbsdzRDcwbRGL0`
- Gemini API key: `AIzaSyDqvbE7rhteqHMrk1llQU74Y_YSCaYu1yc`

**Test:**
```bash
curl -X POST https://your-n8n-url/webhook/generate-site \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "uuid-here",
    "business_name": "Sunset Cafe",
    "business_sector": "restaurant",
    "description": "Modern cafe in Istanbul"
  }'
```

---

### 2. GitHub Component Sync (`github-component-sync.md`)
GitHub'dan component değişikliklerini Supabase'e sync eder.

**Nodes:**
1. Webhook Trigger (GitHub webhook)
2. Code → Parse Changed Components
3. Loop → For Each Component
4. HTTP Request → Fetch from GitHub (raw)
5. Code → Parse config.json
6. HTTP Request → Upload Preview to Supabase Storage
7. Supabase → Upsert component_templates
8. Supabase → Log Sync History

**Credentials Gerekli:**
- GitHub Personal Access Token
- Supabase (URL + anon key)

---

### 3. AI Text Improvement (`ai-text-improvement.md`)
Kullanıcı metnini AI ile iyileştirir.

**Nodes:**
1. Webhook Trigger (POST /webhook/improve-text)
2. HTTP Request → Gemini API (Improve Text)
3. Code → Parse Response
4. Respond to Webhook

**Input:**
```json
{
  "component_id": "uuid",
  "field_id": "heading-main",
  "current_text": "Welcome to our site",
  "tone": "professional",
  "max_length": 100
}
```

**Output:**
```json
{
  "improved": "Transform Your Business with Professional Solutions"
}
```

---

### 4. AI Image Generation (`ai-image-generation.md`)
AI ile görsel üretir (Stable Diffusion veya Unsplash fallback).

**Nodes:**
1. Webhook Trigger (POST /webhook/generate-image)
2. HTTP Request → Gemini API (Enhance Prompt)
3. HTTP Request → Stable Diffusion API (or Unsplash)
4. HTTP Request → Upload to Supabase Storage
5. Supabase → Insert media_assets
6. Respond to Webhook

**Credentials Gerekli:**
- Gemini API key
- Stability API key (opsiyonel)
- Supabase

---

## Manuel Workflow Oluşturma

N8N'de workflow'ları manuel olarak oluşturmak için:

### Adım 1: Webhook Node
- Webhook Path: `/webhook/generate-site` (veya ilgili path)
- Method: POST
- Authentication: None (frontend'den gelecek)

### Adım 2: HTTP Request Node (Gemini)
```
Method: POST
URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={{$credentials.geminiApiKey}}

Headers:
Content-Type: application/json

Body (JSON):
{
  "contents": [{
    "parts": [{
      "text": "{{$json.prompt}}"
    }]
  }],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 4096
  }
}
```

### Adım 3: Supabase Node
- Operation: Insert/Update/Select
- Table: component_templates, websites, vb.
- Credentials: Supabase URL + anon key

### Adım 4: Code Node (JavaScript)
```javascript
// Örnek: Parse Gemini response
const geminiOutput = $input.first().json;
const aiText = geminiOutput.candidates[0].content.parts[0].text;
const parsed = JSON.parse(aiText);

return {
  json: parsed
};
```

### Adım 5: Loop Node
- Items: Array to iterate
- Execute once per item

---

## Önemli Notlar

1. **Rate Limiting:**
   - Gemini Free: 60 req/min
   - Code node'da 1 saniye delay ekle:
   ```javascript
   await new Promise(resolve => setTimeout(resolve, 1000));
   ```

2. **Error Handling:**
   - Her node'a "On Error" → "Continue" ekle
   - Try-catch blocks kullan

3. **Logging:**
   - Her major step'te console.log() ekle
   - N8N Executions tab'ında görürsün

4. **Testing:**
   - "Execute Workflow" butonu ile test et
   - Webhook URL'i Postman'de test et

---

## Webhook URLs

Manuel kurulum sonrası bu URL'leri `.env` dosyasına ekle:

```bash
VITE_N8N_SITE_GENERATOR_URL=https://n8n-xxxx/webhook/generate-site
VITE_N8N_COMPONENT_SYNC_URL=https://n8n-xxxx/webhook/component-sync
VITE_N8N_AI_IMPROVE_TEXT_URL=https://n8n-xxxx/webhook/improve-text
VITE_N8N_AI_GENERATE_IMAGE_URL=https://n8n-xxxx/webhook/generate-image
```

---

## Troubleshooting

**Problem:** Gemini API returning errors
- Check API key valid mi
- Rate limit aşıldı mı kontrol et
- Prompt format doğru mu

**Problem:** Supabase insert failing
- RLS policies doğru mu
- Table schema migration yapıldı mı
- Credentials doğru mu

**Problem:** GitHub webhook not triggering
- Webhook URL doğru mu
- N8N workflow active mi
- GitHub webhook secret gerekiyor mu (hayır)

---

**Not:** Detaylı workflow JSON export'ları çok büyük olduğu için manuel oluşturmanız önerilir. Yukarıdaki talimatlar ve node yapıları yeterli olacaktır.
