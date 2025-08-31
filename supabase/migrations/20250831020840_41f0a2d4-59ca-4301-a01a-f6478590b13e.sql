-- Create gallery_photos table for managing gallery images
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('showroom', 'products')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for gallery_photos
CREATE POLICY "Anyone can read gallery photos" 
ON public.gallery_photos 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert gallery photos" 
ON public.gallery_photos 
FOR INSERT 
WITH CHECK (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update gallery photos" 
ON public.gallery_photos 
FOR UPDATE 
USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can delete gallery photos" 
ON public.gallery_photos 
FOR DELETE 
USING (get_user_role(auth.uid()) = 'admin');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gallery_photos_updated_at
BEFORE UPDATE ON public.gallery_photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();