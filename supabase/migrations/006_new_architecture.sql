-- ================================================
-- FrameCraftAI - New Architecture Migration
-- Version: 006
-- Date: 2026-02-03
-- Description: Hybrid component strategy (GitHub + AI)
-- ================================================

-- ================================================
-- 1. UPDATE component_templates TABLE
-- ================================================

-- Add new columns for GitHub integration
ALTER TABLE component_templates
ADD COLUMN IF NOT EXISTS github_path TEXT,
ADD COLUMN IF NOT EXISTS github_commit_sha TEXT,
ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS preview_desktop_url TEXT,
ADD COLUMN IF NOT EXISTS preview_tablet_url TEXT,
ADD COLUMN IF NOT EXISTS preview_mobile_url TEXT,
ADD COLUMN IF NOT EXISTS best_for_sectors TEXT[],
ADD COLUMN IF NOT EXISTS not_recommended_for TEXT[],
ADD COLUMN IF NOT EXISTS features TEXT[],
ADD COLUMN IF NOT EXISTS libraries_required TEXT[],
ADD COLUMN IF NOT EXISTS performance_impact TEXT DEFAULT 'low',
ADD COLUMN IF NOT EXISTS min_viewport_width INT DEFAULT 320,
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS complexity TEXT DEFAULT 'standard',
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(2,1);

-- Update editable_fields column to JSONB if not already
-- This allows for more complex field configurations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'component_templates'
    AND column_name = 'editable_fields'
    AND data_type = 'jsonb'
  ) THEN
    ALTER TABLE component_templates
    ALTER COLUMN editable_fields TYPE JSONB USING editable_fields::jsonb;
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_component_templates_github_path 
  ON component_templates(github_path);

CREATE INDEX IF NOT EXISTS idx_component_templates_sectors 
  ON component_templates USING GIN(best_for_sectors);

CREATE INDEX IF NOT EXISTS idx_component_templates_features 
  ON component_templates USING GIN(features);

CREATE INDEX IF NOT EXISTS idx_component_templates_premium 
  ON component_templates(is_premium);

-- ================================================
-- 2. UPDATE website_components TABLE
-- ================================================

-- Add columns for hybrid source tracking
ALTER TABLE website_components
ADD COLUMN IF NOT EXISTS source_type TEXT NOT NULL DEFAULT 'github',
ADD COLUMN IF NOT EXISTS ai_generated_html TEXT,
ADD COLUMN IF NOT EXISTS ai_generated_css TEXT,
ADD COLUMN IF NOT EXISTS ai_generated_js TEXT,
ADD COLUMN IF NOT EXISTS ai_generation_prompt TEXT,
ADD COLUMN IF NOT EXISTS ai_model_used TEXT,
ADD COLUMN IF NOT EXISTS ai_generation_id UUID REFERENCES ai_generations(id),
ADD COLUMN IF NOT EXISTS section_name TEXT,
ADD COLUMN IF NOT EXISTS version INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS previous_version_id UUID REFERENCES website_components(id);

-- Add check constraint for source_type
ALTER TABLE website_components
ADD CONSTRAINT check_source_type 
CHECK (source_type IN ('github', 'ai-generated'));

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_website_components_source 
  ON website_components(source_type);

CREATE INDEX IF NOT EXISTS idx_website_components_ai_gen 
  ON website_components(ai_generation_id);

CREATE INDEX IF NOT EXISTS idx_website_components_section 
  ON website_components(section_name);

-- ================================================
-- 3. UPDATE websites TABLE
-- ================================================

-- Add new columns for enhanced website management
ALTER TABLE websites
ADD COLUMN IF NOT EXISTS sitemap JSONB NOT NULL DEFAULT '{"pages": []}',
ADD COLUMN IF NOT EXISTS global_styles JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS custom_css TEXT,
ADD COLUMN IF NOT EXISTS custom_js TEXT,
ADD COLUMN IF NOT EXISTS google_analytics_id TEXT,
ADD COLUMN IF NOT EXISTS facebook_pixel_id TEXT,
ADD COLUMN IF NOT EXISTS google_tag_manager_id TEXT,
ADD COLUMN IF NOT EXISTS lighthouse_score JSONB,
ADD COLUMN IF NOT EXISTS last_lighthouse_check TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS page_views INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS unique_visitors INT DEFAULT 0;

-- ================================================
-- 4. CREATE ai_site_generations TABLE
-- ================================================

CREATE TABLE IF NOT EXISTS ai_site_generations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- User input
  business_name TEXT NOT NULL,
  business_sector TEXT NOT NULL,
  user_description TEXT,
  user_preferences JSONB,
  
  -- AI analysis results
  sector_analysis JSONB,
  recommended_pages JSONB,
  component_decisions JSONB,
  design_guidelines JSONB,
  
  -- Stats
  github_components_used INT DEFAULT 0,
  ai_components_generated INT DEFAULT 0,
  total_generation_time_ms INT,
  total_tokens_used INT,
  total_credits_used INT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ai_site_generations_website 
  ON ai_site_generations(website_id);

CREATE INDEX IF NOT EXISTS idx_ai_site_generations_user 
  ON ai_site_generations(user_id);

CREATE INDEX IF NOT EXISTS idx_ai_site_generations_sector 
  ON ai_site_generations(business_sector);

-- ================================================
-- 5. CREATE component_sync_history TABLE
-- ================================================

CREATE TABLE IF NOT EXISTS component_sync_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  github_commit_sha TEXT NOT NULL,
  github_branch TEXT DEFAULT 'main',
  
  components_added INT DEFAULT 0,
  components_updated INT DEFAULT 0,
  components_deleted INT DEFAULT 0,
  
  sync_status TEXT DEFAULT 'success',
  error_log TEXT,
  
  changed_components JSONB,
  
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_component_sync_history_sha 
  ON component_sync_history(github_commit_sha);

CREATE INDEX IF NOT EXISTS idx_component_sync_history_status 
  ON component_sync_history(sync_status);

CREATE INDEX IF NOT EXISTS idx_component_sync_history_date 
  ON component_sync_history(synced_at DESC);

-- ================================================
-- 6. CREATE admin_settings TABLE
-- ================================================

CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  
  category TEXT,
  description TEXT,
  is_secret BOOLEAN DEFAULT false,
  
  updated_by UUID REFERENCES profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_settings_category 
  ON admin_settings(category);

CREATE INDEX IF NOT EXISTS idx_admin_settings_key 
  ON admin_settings(key);

-- ================================================
-- 7. UPDATE RLS POLICIES
-- ================================================

-- component_sync_history: Admin only
ALTER TABLE component_sync_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view sync history" ON component_sync_history;
CREATE POLICY "Admins can view sync history" 
  ON component_sync_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ai_site_generations: Users can view their own
ALTER TABLE ai_site_generations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own site generations" ON ai_site_generations;
CREATE POLICY "Users can view own site generations" 
  ON ai_site_generations
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own site generations" ON ai_site_generations;
CREATE POLICY "Users can insert own site generations" 
  ON ai_site_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- admin_settings: Admin only
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view settings" ON admin_settings;
CREATE POLICY "Admins can view settings" 
  ON admin_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can update settings" ON admin_settings;
CREATE POLICY "Admins can update settings" 
  ON admin_settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ================================================
-- 8. DATABASE FUNCTIONS
-- ================================================

-- Function: Increment component usage count
CREATE OR REPLACE FUNCTION increment_component_usage(component_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE component_templates
  SET usage_count = COALESCE(usage_count, 0) + 1
  WHERE id = component_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function: Get user's credit balance
CREATE OR REPLACE FUNCTION get_user_credits(user_uuid UUID)
RETURNS INT AS $$
DECLARE
  credits INT;
BEGIN
  SELECT credits_remaining INTO credits
  FROM profiles
  WHERE id = user_uuid;
  
  RETURN COALESCE(credits, 0);
END;
$$ LANGUAGE plpgsql;

-- Function: Deduct credits
CREATE OR REPLACE FUNCTION deduct_credits(user_uuid UUID, amount INT)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INT;
BEGIN
  SELECT credits_remaining INTO current_credits
  FROM profiles
  WHERE id = user_uuid;
  
  IF current_credits >= amount THEN
    UPDATE profiles
    SET credits_remaining = credits_remaining - amount
    WHERE id = user_uuid;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function: Log AI generation
CREATE OR REPLACE FUNCTION log_ai_generation(
  p_user_id UUID,
  p_website_id UUID,
  p_generation_type TEXT,
  p_prompt TEXT,
  p_result JSONB,
  p_credits_used INT
)
RETURNS UUID AS $$
DECLARE
  generation_id UUID;
BEGIN
  INSERT INTO ai_generations (
    user_id,
    website_id,
    generation_type,
    prompt,
    result,
    status,
    credits_used,
    ai_model
  ) VALUES (
    p_user_id,
    p_website_id,
    p_generation_type,
    p_prompt,
    p_result,
    'completed',
    p_credits_used,
    'gemini-2.0-flash-exp'
  ) RETURNING id INTO generation_id;
  
  -- Deduct credits
  PERFORM deduct_credits(p_user_id, p_credits_used);
  
  RETURN generation_id;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- 9. INSERT DEFAULT ADMIN SETTINGS
-- ================================================

INSERT INTO admin_settings (key, value, category, description, is_secret) 
VALUES
  ('n8n_webhook_site_generator', '{"url": ""}', 'n8n_webhooks', 'N8N webhook for AI site generation', false),
  ('n8n_webhook_component_import', '{"url": ""}', 'n8n_webhooks', 'N8N webhook for GitHub component sync', false),
  ('n8n_webhook_improve_text', '{"url": ""}', 'n8n_webhooks', 'N8N webhook for text improvement', false),
  ('n8n_webhook_generate_image', '{"url": ""}', 'n8n_webhooks', 'N8N webhook for image generation', false),
  ('gemini_api_key', '{"key": ""}', 'api_keys', 'Google Gemini API key', true),
  ('stability_api_key', '{"key": ""}', 'api_keys', 'Stable Diffusion API key', true),
  ('max_websites_free', '{"limit": 3}', 'limits', 'Max websites for free tier', false),
  ('max_websites_pro', '{"limit": 20}', 'limits', 'Max websites for pro tier', false),
  ('max_ai_generations_per_day', '{"limit": 50}', 'limits', 'Max AI generations per day per user', false),
  ('github_repo_url', '{"url": "https://github.com/YOUR_USERNAME/framecraftai-components"}', 'integrations', 'GitHub component library repository', false),
  ('enable_ai_features', '{"enabled": true}', 'features', 'Enable AI features globally', false),
  ('enable_custom_domains', '{"enabled": false}', 'features', 'Enable custom domain feature', false)
ON CONFLICT (key) DO NOTHING;

-- ================================================
-- 10. MIGRATION VERIFICATION
-- ================================================

-- Show created/updated tables
DO $$
BEGIN
  RAISE NOTICE 'Migration 006 completed successfully!';
  RAISE NOTICE 'New tables created:';
  RAISE NOTICE '  - ai_site_generations';
  RAISE NOTICE '  - component_sync_history';
  RAISE NOTICE '  - admin_settings';
  RAISE NOTICE '';
  RAISE NOTICE 'Updated tables:';
  RAISE NOTICE '  - component_templates (added 13 columns)';
  RAISE NOTICE '  - website_components (added 8 columns)';
  RAISE NOTICE '  - websites (added 10 columns)';
  RAISE NOTICE '';
  RAISE NOTICE 'Created functions:';
  RAISE NOTICE '  - increment_component_usage()';
  RAISE NOTICE '  - get_user_credits()';
  RAISE NOTICE '  - deduct_credits()';
  RAISE NOTICE '  - log_ai_generation()';
END $$;
