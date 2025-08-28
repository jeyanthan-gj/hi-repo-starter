-- Create brands table
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create models table  
CREATE TABLE public.models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC(10,2),
  original_price NUMERIC(10,2),
  rating NUMERIC(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  image_url TEXT,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create profiles table for user roles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to get user role (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for brands (public read, admin write)
CREATE POLICY "Anyone can read brands" ON public.brands
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert brands" ON public.brands
  FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update brands" ON public.brands
  FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can delete brands" ON public.brands
  FOR DELETE USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for models (public read, admin write)
CREATE POLICY "Anyone can read models" ON public.models
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert models" ON public.models
  FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update models" ON public.models
  FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can delete models" ON public.models
  FOR DELETE USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for profiles  
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('brand-logos', 'brand-logos', true) ON CONFLICT DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('model-images', 'model-images', true) ON CONFLICT DO NOTHING;

-- Storage policies for brand logos
CREATE POLICY "Public can view brand logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'brand-logos');

CREATE POLICY "Admins can upload brand logos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'brand-logos' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can update brand logos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'brand-logos' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can delete brand logos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'brand-logos' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

-- Storage policies for model images
CREATE POLICY "Public can view model images" ON storage.objects
  FOR SELECT USING (bucket_id = 'model-images');

CREATE POLICY "Admins can upload model images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'model-images' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can update model images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'model-images' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can delete model images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'model-images' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_brands_updated_at
  BEFORE UPDATE ON public.brands
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_models_updated_at
  BEFORE UPDATE ON public.models
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();