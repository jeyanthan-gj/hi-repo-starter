import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, Phone, Shield, Truck, CreditCard } from "lucide-react";
import { toast } from "sonner";

const ModelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch model details with brand information
  const { data: model, isLoading, error } = useQuery({
    queryKey: ['model-detail', id],
    queryFn: async () => {
      if (!id) throw new Error('Model ID is required');
      
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
        .eq('id', id)
        .maybeSingle();

      if (error) {
        toast.error('Failed to load model details');
        throw error;
      }
      
      if (!data) {
        throw new Error('Model not found');
      }

      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-card/50 to-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading model details...</p>
        </div>
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-card/50 to-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Model Not Found</h1>
          <p className="text-muted-foreground">The requested model could not be found.</p>
          <Button onClick={() => navigate('/brands')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Brands
          </Button>
        </div>
      </div>
    );
  }

  const calculateDiscount = (price: number, originalPrice: number) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const discount = calculateDiscount(model.price || 0, model.original_price || 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card/50 to-background">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Button 
            onClick={() => navigate('/brands')} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Brands
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="card-3d overflow-hidden">
              <div className="aspect-square relative bg-gradient-to-br from-card to-muted">
                {model.image_url ? (
                  <img 
                    src={model.image_url} 
                    alt={model.name}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Phone className="w-24 h-24 text-muted-foreground" />
                  </div>
                )}
                {discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                    {discount}% OFF
                  </Badge>
                )}
              </div>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand and Title */}
            <div className="space-y-2">
              {model.brands && (
                <div className="flex items-center gap-3 mb-4">
                  {model.brands.logo_url && (
                    <img 
                      src={model.brands.logo_url} 
                      alt={model.brands.name}
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <Badge variant="outline" className="text-sm">
                    {model.brands.name}
                  </Badge>
                </div>
              )}
              <h1 className="text-4xl font-bold text-glow">{model.name}</h1>
            </div>

            {/* Rating */}
            {model.rating && model.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(model.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {model.rating} ({model.reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${model.price?.toLocaleString() || 'Price on request'}
                </span>
                {model.original_price && model.original_price > (model.price || 0) && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${model.original_price.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-green-600 font-medium">
                  You save ${((model.original_price || 0) - (model.price || 0)).toLocaleString()}
                </p>
              )}
            </div>

            {/* Features */}
            {model.features && model.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Key Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {model.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="space-y-4 pt-6">
              <Button size="lg" className="w-full text-lg">
                Contact for Price
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" size="sm">
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-green-600" />
                Warranty Included
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 text-blue-600" />
                Free Delivery
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="w-4 h-4 text-purple-600" />
                Easy EMI
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-orange-600" />
                24/7 Support
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 space-y-8">
          <Card className="card-3d">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-glow">Why Choose This Model?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <Shield className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="font-semibold">Genuine Product</h3>
                  <p className="text-sm text-muted-foreground">
                    100% authentic with full manufacturer warranty
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <Truck className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick and secure delivery to your doorstep
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <Phone className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="font-semibold">Expert Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional assistance before and after purchase
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;