import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Zap, ArrowLeft } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

interface Model {
  id: string;
  brand_id: string;
  name: string;
  price: number;
  original_price?: number;
  rating: number;
  reviews: number;
  image_url?: string;
  features: string[];
  created_at: string;
  updated_at: string;
  brands?: Brand;
}

const Brands = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    // Make all reveal elements visible immediately
    document.querySelectorAll(".reveal-up").forEach((el) => {
      el.classList.add("visible");
    });
  }, []);

  // Fetch brands from Supabase (accessible to all users)
  const { data: brands = [], isLoading: brandsLoading, error: brandsError } = useQuery({
    queryKey: ['public-brands'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Brands fetch error:', error);
          throw error;
        }
        return data as Brand[];
      } catch (error) {
        console.error('Query error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3
  });

  // Fetch models from Supabase (accessible to all users)
  const { data: models = [], isLoading: modelsLoading, error: modelsError } = useQuery({
    queryKey: ['public-models'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('models')
          .select(`
            *,
            brands:brand_id (
              id,
              name,
              logo_url
            )
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Models fetch error:', error);
          throw error;
        }
        return data as Model[];
      } catch (error) {
        console.error('Query error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3
  });

  const isLoading = brandsLoading || modelsLoading;

  // Filter models by selected brand
  const filteredModels = selectedBrand 
    ? models.filter(model => model.brand_id === selectedBrand)
    : models;

  // Calculate discount percentage
  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Debug: Log data for troubleshooting
  console.log('Brands data:', brands);
  console.log('Models data:', models);
  console.log('Brands error:', brandsError);
  console.log('Models error:', modelsError);

  return (
    <div className="min-h-screen">
      {/* Debug info for troubleshooting */}
      {(brandsError || modelsError) && (
        <div className="container mx-auto px-4 py-4">
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="p-4">
              <h3 className="font-semibold text-destructive mb-2">Debug Information:</h3>
              {brandsError && <p className="text-sm text-destructive">Brands Error: {brandsError.message}</p>}
              {modelsError && <p className="text-sm text-destructive">Models Error: {modelsError.message}</p>}
              <p className="text-sm text-muted-foreground mt-2">
                Brands loaded: {brands.length} | Models loaded: {models.length}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-up visible">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">Mobile Brands</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the latest smartphones from top brands with competitive prices and exclusive offers.
            </p>
          </div>
        </div>
      </section>

      {/* Brands Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up visible">
            <h2 className="text-4xl font-bold mb-6 text-glow">Available Brands</h2>
            <p className="text-lg text-muted-foreground">
              We stock the latest models from leading smartphone manufacturers.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card className="card-3d text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-20 mx-auto"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {brands.map((brand) => {
                const brandModels = models.filter(model => model.brand_id === brand.id);
                return (
                  <Card 
                    key={brand.id} 
                    className={`card-3d reveal-up visible text-center hover:scale-105 transition-all duration-300 cursor-pointer ${
                      selectedBrand === brand.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedBrand(selectedBrand === brand.id ? null : brand.id)}
                  >
                    <CardContent className="p-6">
                      {brand.logo_url ? (
                        <img 
                          src={brand.logo_url} 
                          alt={brand.name}
                          className="w-16 h-16 object-contain mx-auto mb-4 rounded-full"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">{brand.name[0]}</span>
                        </div>
                      )}
                      <h3 className="font-bold text-lg">{brand.name}</h3>
                      <p className="text-sm text-muted-foreground">{brandModels.length} Models</p>
                      {selectedBrand === brand.id && (
                        <Badge className="mt-2">Selected</Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Mobile Models */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up visible">
            <div className="flex items-center justify-center gap-4 mb-6">
              {selectedBrand && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedBrand(null)}
                  className="hover-tilt"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View All Brands
                </Button>
              )}
              <h2 className="text-4xl font-bold text-glow">
                {selectedBrand 
                  ? `${brands.find(b => b.id === selectedBrand)?.name} Models`
                  : 'Latest Models'
                }
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              {selectedBrand 
                ? `Explore ${brands.find(b => b.id === selectedBrand)?.name} smartphone collection.`
                : 'Browse our collection of the newest smartphone models.'
              }
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card className="card-3d overflow-hidden">
                    <div className="h-64 bg-muted"></div>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : filteredModels.length === 0 ? (
            <div className="text-center py-12">
              <Card className="card-3d max-w-md mx-auto">
                <CardContent className="p-8 text-center">
                  <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Models Available</h3>
                  <p className="text-muted-foreground">
                    {selectedBrand 
                      ? 'This brand currently has no models available.'
                      : 'No mobile models have been added yet.'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredModels.map((model) => {
                const discount = calculateDiscount(model.price, model.original_price);
                return (
                  <Card 
                    key={model.id} 
                    className="card-3d reveal-up visible overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => navigate(`/model/${model.id}`)}
                  >
                    <div className="relative">
                      {model.image_url ? (
                        <img 
                          src={model.image_url} 
                          alt={model.name}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-primary flex items-center justify-center">
                          <Zap className="w-16 h-16 text-white" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          {model.brands?.name}
                        </Badge>
                      </div>
                      {discount && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-accent text-accent-foreground">
                            {discount}% OFF
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">{model.name}</h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{model.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({model.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary">₹{model.price.toLocaleString()}</span>
                          {model.original_price && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{model.original_price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {model.features.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Key Features:</h4>
                          <div className="flex flex-wrap gap-1">
                            {model.features.slice(0, 3).map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {model.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{model.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2 pt-4">
                        <Button size="sm" className="btn-3d flex-1">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Buy Now
                        </Button>
                        <Button variant="outline" size="sm" className="hover-tilt">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-up visible">
            <h2 className="text-4xl font-bold mb-6 text-glow">Why Buy From Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Latest Technology",
                description: "We stock the newest releases as soon as they're available in the market."
              },
              {
                icon: ShoppingCart,
                title: "Best Prices",
                description: "Competitive pricing with exclusive deals and offers for our customers."
              },
              {
                icon: Star,
                title: "Warranty Support",
                description: "Full manufacturer warranty with additional after-sales service support."
              }
            ].map((feature, index) => (
              <Card key={index} className="card-3d reveal-up visible text-center">
                <CardContent className="p-8 space-y-4">
                  <feature.icon className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;