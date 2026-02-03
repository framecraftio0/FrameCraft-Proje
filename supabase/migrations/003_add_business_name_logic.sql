-- Migration to add business_name handling and fix existing data

-- 0. Ensure business_name column exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS business_name TEXT;

-- 1. Update the handle_new_user function to include business_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name,
    business_name,
    email_verified,
    role
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'business_name', ''),
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false),
    'user'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    business_name = COALESCE(EXCLUDED.business_name, profiles.business_name),
    email_verified = COALESCE(NEW.email_confirmed_at IS NOT NULL, profiles.email_verified);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update existing profiles with NULL business_name
-- We set a default value or fetch it from full_name if needed. 
-- For this request, we will placeholder it.
UPDATE public.profiles
SET business_name = 'Business ' || substring(id::text, 1, 8)
WHERE business_name IS NULL OR business_name = '';
