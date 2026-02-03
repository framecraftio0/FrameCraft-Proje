-- FrameCraftAI - Extend Profiles Migration
-- This migration extends the profiles table with additional user information fields

-- Add new optional columns to profiles table (if they don't exist)
DO $$ 
BEGIN
    -- Add phone column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='phone') THEN
        ALTER TABLE public.profiles ADD COLUMN phone TEXT;
    END IF;

    -- Add address column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='address') THEN
        ALTER TABLE public.profiles ADD COLUMN address TEXT;
    END IF;

    -- Add city column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='city') THEN
        ALTER TABLE public.profiles ADD COLUMN city TEXT;
    END IF;

    -- Add country column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='country') THEN
        ALTER TABLE public.profiles ADD COLUMN country TEXT;
    END IF;

    -- Add postal_code column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='postal_code') THEN
        ALTER TABLE public.profiles ADD COLUMN postal_code TEXT;
    END IF;

    -- Add bio column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='bio') THEN
        ALTER TABLE public.profiles ADD COLUMN bio TEXT;
    END IF;

    -- Add email_verified column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='email_verified') THEN
        ALTER TABLE public.profiles ADD COLUMN email_verified BOOLEAN DEFAULT false;
    END IF;

    -- Add role column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));
    END IF;
END $$;

-- Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name,
    email_verified,
    role
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false),
    'user'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    email_verified = COALESCE(NEW.email_confirmed_at IS NOT NULL, profiles.email_verified);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update existing profiles to have default role if null
UPDATE public.profiles SET role = 'user' WHERE role IS NULL;

COMMENT ON COLUMN public.profiles.phone IS 'User phone number (optional)';
COMMENT ON COLUMN public.profiles.address IS 'User street address (optional)';
COMMENT ON COLUMN public.profiles.city IS 'User city (optional)';
COMMENT ON COLUMN public.profiles.country IS 'User country (optional)';
COMMENT ON COLUMN public.profiles.postal_code IS 'User postal/ZIP code (optional)';
COMMENT ON COLUMN public.profiles.bio IS 'User biography/about text (optional)';
COMMENT ON COLUMN public.profiles.email_verified IS 'Whether user email is verified';
COMMENT ON COLUMN public.profiles.role IS 'User role: user or admin';
