-- Add image_url column to accessory_categories if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'accessory_categories' 
                   AND column_name = 'image_url') THEN
        ALTER TABLE public.accessory_categories ADD COLUMN image_url TEXT;
    END IF;
END $$;

-- Add image_url column to accessory_subcategories
ALTER TABLE public.accessory_subcategories ADD COLUMN image_url TEXT;

-- Create storage bucket for accessory images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('accessory-images', 'accessory-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for accessory images bucket
CREATE POLICY "Anyone can view accessory images"
ON storage.objects FOR SELECT
USING (bucket_id = 'accessory-images');

CREATE POLICY "Admins can upload accessory images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'accessory-images' AND get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update accessory images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'accessory-images' AND get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can delete accessory images"
ON storage.objects FOR DELETE
USING (bucket_id = 'accessory-images' AND get_user_role(auth.uid()) = 'admin');