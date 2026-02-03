-- FrameCraftAI Database Schema
-- This SQL file contains the complete database schema as specified in the project brief

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS & PROFILES
-- =====================================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  business_name TEXT,
  business_sector TEXT,
  avatar_url TEXT,
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired')),
  credits_remaining INT DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- COMPONENT TEMPLATES
-- =====================================================

CREATE TABLE public.component_templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('heroes', 'features', 'galleries', 'testimonials', 'ctas', 'forms', 'footers', 'headers', 'pricing', 'team', 'faq')),
  description TEXT,
  
  -- Figma metadata
  figma_component_id TEXT,
  figma_file_key TEXT,
  figma_node_id TEXT,
  
  -- Visual previews
  thumbnail_url TEXT NOT NULL,
  preview_desktop_url TEXT,
  preview_tablet_url TEXT,
  preview_mobile_url TEXT,
  
  -- Code templates
  html_template TEXT NOT NULL,
  css_template TEXT NOT NULL,
  js_template TEXT,
  
  -- Editable fields configuration (JSONB)
  editable_fields JSONB NOT NULL DEFAULT '{"fields": []}',
  
  -- Metadata
  tags TEXT[] DEFAULT '{}',
  is_premium BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  usage_count INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- WEBSITES
-- =====================================================

CREATE TABLE public.websites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic info
  site_name TEXT NOT NULL,
  business_sector TEXT,
  
  -- Domain settings
  custom_domain TEXT,
  subdomain TEXT UNIQUE NOT NULL,
  
  -- Site structure (JSONB)
  sitemap JSONB NOT NULL DEFAULT '{"pages": []}',
  
  -- Global settings (JSONB)
  global_styles JSONB DEFAULT '{}',
  custom_css TEXT,
  custom_js TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  favicon_url TEXT,
  
  -- Analytics
  google_analytics_id TEXT,
  facebook_pixel_id TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  last_published_at TIMESTAMPTZ,
  
  -- Stats
  page_views INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- WEBSITE COMPONENTS
-- =====================================================

CREATE TABLE public.website_components (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  website_id UUID REFERENCES public.websites(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES public.component_templates(id) ON DELETE SET NULL,
  
  -- Position
  page_path TEXT NOT NULL,
  section_order INT NOT NULL,
  
  -- Custom content (JSONB)
  custom_content JSONB NOT NULL DEFAULT '{}',
  
  -- Custom styles (JSONB)
  custom_styles JSONB DEFAULT '{}',
  
  -- Visibility
  is_visible BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(website_id, page_path, section_order)
);

-- =====================================================
-- AI GENERATIONS
-- =====================================================

CREATE TABLE public.ai_generations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  website_id UUID REFERENCES public.websites(id) ON DELETE CASCADE,
  
  generation_type TEXT NOT NULL CHECK (generation_type IN ('sitemap', 'content', 'image', 'chat')),
  
  -- Request
  prompt TEXT NOT NULL,
  parameters JSONB DEFAULT '{}',
  
  -- Response
  result JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  error_message TEXT,
  
  -- Credits
  credits_used INT DEFAULT 1,
  
  -- Metadata
  ai_model TEXT,
  processing_time_ms INT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- MEDIA LIBRARY
-- =====================================================

CREATE TABLE public.media_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  website_id UUID REFERENCES public.websites(id) ON DELETE CASCADE,
  
  -- File info
  filename TEXT NOT NULL,
  file_size INT NOT NULL,
  file_type TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  
  -- Storage
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  thumbnail_url TEXT,
  
  -- Metadata
  width INT,
  height INT,
  duration INT,
  alt_text TEXT,
  
  -- Source
  source TEXT DEFAULT 'upload' CHECK (source IN ('upload', 'ai-generated', 'url')),
  ai_generation_id UUID REFERENCES public.ai_generations(id),
  
  -- Usage tracking
  used_in_components UUID[] DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ADMIN SETTINGS
-- =====================================================

CREATE TABLE public.admin_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT,
  description TEXT,
  is_secret BOOLEAN DEFAULT false,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ACTIVITY LOGS
-- =====================================================

CREATE TABLE public.activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_websites_user ON public.websites(user_id);
CREATE INDEX idx_websites_subdomain ON public.websites(subdomain);
CREATE INDEX idx_websites_status ON public.websites(status);
CREATE INDEX idx_components_website ON public.website_components(website_id);
CREATE INDEX idx_components_template ON public.website_components(template_id);
CREATE INDEX idx_media_user ON public.media_assets(user_id);
CREATE INDEX idx_media_website ON public.media_assets(website_id);
CREATE INDEX idx_ai_gen_user ON public.ai_generations(user_id);
CREATE INDEX idx_ai_gen_type ON public.ai_generations(generation_type);
CREATE INDEX idx_activity_user ON public.activity_logs(user_id);
CREATE INDEX idx_activity_created ON public.activity_logs(created_at DESC);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_component_templates_updated_at BEFORE UPDATE ON public.component_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_websites_updated_at BEFORE UPDATE ON public.websites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_components_updated_at BEFORE UPDATE ON public.website_components
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Component templates are publicly readable
ALTER TABLE public.component_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Component templates are viewable by everyone" ON public.component_templates
  FOR SELECT USING (is_published = true);

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Websites policies
CREATE POLICY "Users can view own websites" ON public.websites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own websites" ON public.websites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own websites" ON public.websites
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own websites" ON public.websites
  FOR DELETE USING (auth.uid() = user_id);

-- Website components policies
CREATE POLICY "Users can view components of own websites" ON public.website_components
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.websites
      WHERE websites.id = website_components.website_id
      AND websites.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert components to own websites" ON public.website_components
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.websites
      WHERE websites.id = website_components.website_id
      AND websites.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update components of own websites" ON public.website_components
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.websites
      WHERE websites.id = website_components.website_id
      AND websites.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete components of own websites" ON public.website_components
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.websites
      WHERE websites.id = website_components.website_id
      AND websites.user_id = auth.uid()
    )
  );

-- Media assets policies
CREATE POLICY "Users can view own media" ON public.media_assets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upload media" ON public.media_assets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own media" ON public.media_assets
  FOR DELETE USING (auth.uid() = user_id);

-- AI generations policies
CREATE POLICY "Users can view own AI generations" ON public.ai_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create AI generations" ON public.ai_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Activity logs policies
CREATE POLICY "Users can view own activity" ON public.activity_logs
  FOR SELECT USING (auth.uid() = user_id);
