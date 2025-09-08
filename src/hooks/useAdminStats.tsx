import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      // Get counts for all tables
      const [
        brandsResult,
        modelsResult,
        usersResult,
        accessoryProductsResult,
        accessoryCategoriesResult,
        accessorySubcategoriesResult,
        galleryPhotosResult
      ] = await Promise.all([
        supabase.from('brands').select('*', { count: 'exact', head: true }),
        supabase.from('models').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('accessory_products').select('*', { count: 'exact', head: true }),
        supabase.from('accessory_categories').select('*', { count: 'exact', head: true }),
        supabase.from('accessory_subcategories').select('*', { count: 'exact', head: true }),
        supabase.from('gallery_photos').select('*', { count: 'exact', head: true })
      ]);

      // Check for errors
      if (brandsResult.error) throw brandsResult.error;
      if (modelsResult.error) throw modelsResult.error;
      if (usersResult.error) throw usersResult.error;
      if (accessoryProductsResult.error) throw accessoryProductsResult.error;
      if (accessoryCategoriesResult.error) throw accessoryCategoriesResult.error;
      if (accessorySubcategoriesResult.error) throw accessorySubcategoriesResult.error;
      if (galleryPhotosResult.error) throw galleryPhotosResult.error;

      return {
        totalBrands: brandsResult.count || 0,
        totalModels: modelsResult.count || 0,
        totalUsers: usersResult.count || 0,
        totalAccessoryProducts: accessoryProductsResult.count || 0,
        totalAccessoryCategories: accessoryCategoriesResult.count || 0,
        totalAccessorySubcategories: accessorySubcategoriesResult.count || 0,
        totalGalleryPhotos: galleryPhotosResult.count || 0
      };
    },
    staleTime: 30000, // Cache for 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};