-- FIX ADMIN VISIBILITY & PERMISSIONS (Run this in Supabase SQL Editor)

-- 1. Ensure column exists (Just in case Migration 003 didn't run fully)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS business_name TEXT;

-- 2. Grant necessary permissions (Crucial step that might be missing)
-- Allow the anonymous role (used by Admin Dashboard before login) to select from profiles
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO service_role;

-- 3. Fix RLS Policies (Row Level Security)
-- First, drop potential conflicting policies to ensure a clean slate
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Re-create the policies correctly
-- Policy 1: Everyone (including Admin Dashboard) can READ all profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

-- Policy 2: Users can still UPDATE their own profile (Keep security for writes)
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 4. Ensure data is populated
-- Fix missing business_name for existing users
UPDATE public.profiles
SET business_name = 'Business ' || substring(id::text, 1, 8)
WHERE (business_name IS NULL OR business_name = '') AND id IS NOT NULL;
