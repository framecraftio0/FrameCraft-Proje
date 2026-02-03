-- Migration to fix Admin Dashboard visibility
-- The Admin Dashboard uses client-side auth (localStorage) and doesn't log in to Supabase as an admin user.
-- Therefore, it runs queries as an 'anonymous' or currently logged-in user.
-- RLS policies previously restricted viewing profiles to the user themselves.

-- SOLUTION: Allow public read access to profiles so the Admin Dashboard can list them.
-- WARNING: This exposes user names and business names publicly. For a production app, you should implement true Admin Auth.

-- 1. Enable public read access to profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

-- 2. (Optional) If you want to be more restrictive, you could try to restrict by IP or other means, but for now this enables the dashboard.
