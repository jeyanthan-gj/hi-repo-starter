-- Make the category column nullable in gallery_photos table
ALTER TABLE public.gallery_photos 
ALTER COLUMN category DROP NOT NULL;

-- Set a default value for category to handle existing data
ALTER TABLE public.gallery_photos 
ALTER COLUMN category SET DEFAULT 'gallery';