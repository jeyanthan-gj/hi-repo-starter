-- Fix profiles table RLS policies to ensure maximum security
-- Remove the potentially conflicting "Deny anonymous access" policy and strengthen user-specific policies

-- Drop the existing "Deny anonymous access" policy which may be causing conflicts
DROP POLICY IF EXISTS "Deny anonymous access to profiles" ON public.profiles;

-- Drop existing policies to recreate them with better security
DROP POLICY IF EXISTS "Users can only read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can only insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can only update their own profile" ON public.profiles;

-- Create more explicit and secure policies

-- SELECT policy: Users can only read their own profile, requires authentication
CREATE POLICY "Users can read only their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- INSERT policy: Users can only create their own profile, requires authentication
CREATE POLICY "Users can insert only their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- UPDATE policy: Users can only update their own profile, requires authentication
CREATE POLICY "Users can update only their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- DELETE policy: Users can delete their own profile (optional, add if needed)
CREATE POLICY "Users can delete only their own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);

-- Ensure RLS is enabled (should already be enabled but double-check)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;