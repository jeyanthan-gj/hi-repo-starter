import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, ArrowLeft, Shield, Headphones, Cable, Smartphone } from "lucide-react";
import mobileAccessoriesImage from "@/assets/mobile-accessories.jpg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
}

interface Subcategory {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category_id: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  rating: number | null;
  reviews: number | null;
  image_url: string | null;
  category_id: string;
  subcategory_id: string | null;
}

const Accessories = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');
  const productId = searchParams.get('product');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    } else if (subcategoryId) {
      fetchSubcategoryProducts(subcategoryId);
    } else if (categoryId) {
      fetchCategoryData(categoryId);
    } else {
      fetchCategories();
    }
  }, [categoryId, subcategoryId, productId]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('accessory_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryData = async (catId: string) => {
    try {
      setLoading(true);
      
      // Fetch category details
      const { data: categoryData, error: categoryError } = await supabase
        .from('accessory_categories')
        .select('*')
        .eq('id', catId)
        .single();

      if (categoryError) throw categoryError;
      setSelectedCategory(categoryData);

      // Fetch subcategories for this category
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('accessory_subcategories')
        .select('*')
        .eq('category_id', catId)
        .order('name');

      if (subcategoriesError) throw subcategoriesError;
      setSubcategories(subcategoriesData || []);

      // If no subcategories, fetch products directly
      if (!subcategoriesData || subcategoriesData.length === 0) {
        const { data: productsData, error: productsError } = await supabase
          .from('accessory_products')
          .select('*')
          .eq('category_id', catId)
          .is('subcategory_id', null)
          .order('name');

        if (productsError) throw productsError;
        setProducts(productsData || []);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
      toast({
        title: "Error",
        description: "Failed to load category data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategoryProducts = async (subId: string) => {
    try {
      setLoading(true);
      
      // Fetch subcategory details
      const { data: subcategoryData, error: subcategoryError } = await supabase
        .from('accessory_subcategories')
        .select('*, accessory_categories(*)')
        .eq('id', subId)
        .single();

      if (subcategoryError) throw subcategoryError;
      setSelectedSubcategory(subcategoryData);
      setSelectedCategory(subcategoryData.accessory_categories);

      // Fetch products for this subcategory
      const { data: productsData, error: productsError } = await supabase
        .from('accessory_products')
        .select('*')
        .eq('subcategory_id', subId)
        .order('name');

      if (productsError) throw productsError;
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error fetching subcategory products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (prodId: string) => {
    try {
      setLoading(true);
      
      const { data: productData, error: productError } = await supabase
        .from('accessory_products')
        .select(`
          *,
          accessory_categories(*),
          accessory_subcategories(*)
        `)
        .eq('id', prodId)
        .single();

      if (productError) throw productError;
      setSelectedProduct(productData);
      setSelectedCategory(productData.accessory_categories);
      if (productData.accessory_subcategories) {
        setSelectedSubcategory(productData.accessory_subcategories);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast({
        title: "Error",
        description: "Failed to load product details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: Category) => {
    navigate(`/accessories?category=${category.id}`);
  };

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    navigate(`/accessories?category=${selectedCategory?.id}&subcategory=${subcategory.id}`);
  };

  const handleProductClick = (product: Product) => {
    const params = new URLSearchParams();
    params.set('category', product.category_id);
    if (product.subcategory_id) {
      params.set('subcategory', product.subcategory_id);
    }
    params.set('product', product.id);
    navigate(`/accessories?${params.toString()}`);
  };

  const handleBack = () => {
    if (productId) {
      // From product back to subcategory or category
      if (subcategoryId) {
        navigate(`/accessories?category=${categoryId}&subcategory=${subcategoryId}`);
      } else {
        navigate(`/accessories?category=${categoryId}`);
      }
    } else if (subcategoryId) {
      // From subcategory back to category
      navigate(`/accessories?category=${categoryId}`);
    } else if (categoryId) {
      // From category back to categories list
      navigate('/accessories');
    }
  };

  const getIconComponent = (iconName: string | null) => {
    switch (iconName?.toLowerCase()) {
      case 'shield': return Shield;
      case 'cable': return Cable;
      case 'headphones': return Headphones;
      case 'smartphone': return Smartphone;
      default: return Smartphone;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Product Detail View
  if (selectedProduct) {
    const discountPercentage = selectedProduct.original_price 
      ? Math.round(((selectedProduct.original_price - selectedProduct.price) / selectedProduct.original_price) * 100)
      : 0;

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="outline" onClick={handleBack} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src={selectedProduct.image_url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center"}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{selectedProduct.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="outline">{selectedCategory?.name}</Badge>
                  {selectedSubcategory && (
                    <Badge variant="secondary">{selectedSubcategory.name}</Badge>
                  )}
                </div>
              </div>

              {selectedProduct.rating && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedProduct.rating}</span>
                  </div>
                  {selectedProduct.reviews && (
                    <span className="text-muted-foreground">({selectedProduct.reviews} reviews)</span>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-primary">₹{selectedProduct.price}</span>
                  {selectedProduct.original_price && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">₹{selectedProduct.original_price}</span>
                      <Badge className="bg-green-500 text-white">{discountPercentage}% OFF</Badge>
                    </>
                  )}
                </div>
              </div>

              {selectedProduct.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedProduct.description}</p>
                </div>
              )}

              <Button size="lg" className="w-full btn-3d">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Products List View (for category or subcategory)
  if (products.length > 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button variant="outline" onClick={handleBack} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">
                {selectedSubcategory ? selectedSubcategory.name : selectedCategory?.name} Products
              </h1>
              <p className="text-muted-foreground mt-2">
                {selectedSubcategory ? selectedSubcategory.description : selectedCategory?.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Subcategories List View
  if (subcategories.length > 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button variant="outline" onClick={handleBack} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
              <h1 className="text-3xl font-bold">{selectedCategory?.name}</h1>
              <p className="text-muted-foreground mt-2">{selectedCategory?.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subcategories.map((subcategory) => (
              <Card
                key={subcategory.id}
                className="card-3d cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                <div className="relative">
                  <img
                    src={subcategory.image_url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=200&fit=crop&crop=center"}
                    alt={subcategory.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{subcategory.name}</h3>
                  {subcategory.description && (
                    <p className="text-sm text-muted-foreground">{subcategory.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Categories List View (Default)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-gradient-to-b from-card/50 to-background bg-cover bg-center"
        style={{ backgroundImage: `url(${mobileAccessoriesImage})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">Mobile Accessories</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete your mobile experience with our premium range of accessories designed to protect, enhance, and personalize your device.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-glow">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive range of mobile accessories.
            </p>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No categories available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <Card
                    key={category.id}
                    className="card-3d cursor-pointer hover:scale-105 transition-all duration-300 text-center"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="relative">
                      {category.image_url ? (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-primary flex items-center justify-center">
                          <IconComponent className="w-16 h-16 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      {category.description && (
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  const discountPercentage = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <Card className="card-3d cursor-pointer overflow-hidden group" onClick={onClick}>
      <div className="relative">
        <img 
          src={product.image_url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center"} 
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-accent text-accent-foreground">
              {discountPercentage}% OFF
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
        
        {product.rating && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
            {product.reviews && (
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            )}
          </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            {product.original_price && (
              <span className="text-xs text-muted-foreground line-through">₹{product.original_price}</span>
            )}
          </div>
        </div>

        <Button size="sm" className="btn-3d w-full" onClick={(e) => { e.stopPropagation(); onClick(); }}>
          <ShoppingCart className="w-3 h-3 mr-1" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default Accessories;