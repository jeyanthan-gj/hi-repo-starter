-- Fix security issues with functions that have mutable search paths and potential RLS bypass

-- 1. Fix the get_user_role function to be more secure and set search_path
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  user_role TEXT;
BEGIN
  -- Only allow users to get their own role or if they're calling this internally
  IF user_id != auth.uid() AND auth.uid() IS NOT NULL THEN
    RETURN 'user'; -- Default role for unauthorized access attempts
  END IF;
  
  SELECT role INTO user_role
  FROM profiles
  WHERE id = user_id;
  
  RETURN COALESCE(user_role, 'user');
END;
$function$;

-- 2. Fix the handle_new_user function to set search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$function$;

-- 3. Fix the update_updated_at_column function to set search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 4. Add a more secure alternative function for role checking that doesn't take parameters
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $function$
  SELECT COALESCE(role, 'user')
  FROM profiles
  WHERE id = auth.uid();
$function$;