-- Drop the existing check constraint that's causing the issue
ALTER TABLE public.gallery_photos 
DROP CONSTRAINT IF EXISTS gallery_photos_category_check;

-- Add a new check constraint that allows 'gallery' as well as the original values
ALTER TABLE public.gallery_photos 
ADD CONSTRAINT gallery_photos_category_check 
CHECK (category IN ('showroom', 'products', 'gallery'));