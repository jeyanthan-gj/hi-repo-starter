import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Shield, Headphones, Cable, Smartphone } from "lucide-react";
import mobileAccessoriesImage from "@/assets/mobile-accessories.jpg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon_name: string | null;
  products: Product[];
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  description: string | null;
  products: Product[];
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
}

const Accessories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    try {
      // For now, use hardcoded data until types are updated
      setCategories([]);
      setLoading(false);
      
      // TODO: Uncomment when Supabase types are updated
      /*
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('accessory_categories')
        .select(`
          id,
          name,
          description,
          icon_name,
          accessory_subcategories (
            id,
            name,
            description,
            accessory_products (
              id,
              name,
              description,
              price,
              original_price,
              rating,
              reviews,
              image_url
            )
          ),
          accessory_products (
            id,
            name,
            description,
            price,
            original_price,
            rating,
            reviews,
            image_url
          )
        `)
        .order('name');

      if (categoriesError) throw categoriesError;

      const processedCategories: Category[] = (categoriesData || []).map(cat => ({
        ...cat,
        products: cat.accessory_products || [],
        subcategories: (cat.accessory_subcategories || []).map(sub => ({
          ...sub,
          products: sub.accessory_products || []
        }))
      }));

      setCategories(processedCategories);
      */
    } catch (error) {
      console.error('Error fetching accessories:', error);
      toast({
        title: "Error",
        description: "Failed to load accessories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const getIconComponent = (iconName: string | null) => {
    switch (iconName) {
      case 'Shield': return Shield;
      case 'Cable': return Cable;
      case 'Headphones': return Headphones;
      case 'Smartphone': return Smartphone;
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

  const hardcodedCategories = [
    {
      name: "Phone Cases & Covers",
      icon: Shield,
      description: "Protect your device with premium cases",
      items: [
        {
          name: "Transparent Soft Case",
          price: "₹299",
          originalPrice: "₹399",
          rating: 4.5,
          reviews: 123,
          image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=400&h=400&fit=crop&crop=center"
        },
        {
          name: "Heavy Duty Armor Case",
          price: "₹799",
          originalPrice: "₹999",
          rating: 4.7,
          reviews: 89,
          image: "https://images.unsplash.com/photo-1574739782594-db4edd6ba80d?w=400&h=400&fit=crop&crop=center"
        }
      ]
    },
    {
      name: "Chargers & Cables",
      icon: Cable,
      description: "Fast charging solutions for all devices",
      items: [
        {
          name: "USB-C Fast Charger 65W",
          price: "₹1,299",
          originalPrice: "₹1,599",
          rating: 4.6,
          reviews: 156,
          image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center"
        },
        {
          name: "Lightning to USB Cable",
          price: "₹599",
          originalPrice: "₹799",
          rating: 4.4,
          reviews: 234,
          image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&crop=center"
        }
      ]
    },
    {
      name: "Headphones & Earbuds",
      icon: Headphones,
      description: "Premium audio accessories",
      items: [
        {
          name: "Wireless Bluetooth Earbuds",
          price: "₹2,499",
          originalPrice: "₹2,999",
          rating: 4.8,
          reviews: 67,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
        },
        {
          name: "Over-Ear Wireless Headphones",
          price: "₹3,999",
          originalPrice: "₹4,999",
          rating: 4.7,
          reviews: 45,
          image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&crop=center"
        }
      ]
    },
    {
      name: "Screen Protectors",
      icon: Smartphone,
      description: "Protect your screen from scratches",
      items: [
        {
          name: "Tempered Glass Screen Guard",
          price: "₹199",
          originalPrice: "₹299",
          rating: 4.3,
          reviews: 289,
          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center"
        },
        {
          name: "Privacy Screen Protector",
          price: "₹399",
          originalPrice: "₹499",
          rating: 4.5,
          reviews: 78,
          image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop&crop=center"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-gradient-to-b from-card/50 to-background bg-cover bg-center"
        style={{ backgroundImage: `url(${mobileAccessoriesImage})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16 reveal-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">Mobile Accessories</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete your mobile experience with our premium range of accessories designed to protect, enhance, and personalize your device.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up">
            <h2 className="text-4xl font-bold mb-6 text-glow">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive range of mobile accessories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {hardcodedCategories.map((category, index) => (
              <Card key={index} className="card-3d reveal-up text-center hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <Badge variant="outline">{category.items.length} Items</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {hardcodedCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 1 ? 'bg-gradient-to-b from-background to-card/50' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 reveal-up">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <category.icon className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-glow">{category.name}</h2>
              </div>
              <p className="text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.items.map((item, itemIndex) => (
                <Card key={itemIndex} className="card-3d reveal-up overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground">
                        {Math.round(((parseInt(item.originalPrice.slice(1)) - parseInt(item.price.slice(1))) / parseInt(item.originalPrice.slice(1))) * 100)}% OFF
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({item.reviews})</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">{item.price}</span>
                        <span className="text-xs text-muted-foreground line-through">{item.originalPrice}</span>
                      </div>
                    </div>

                    <Button size="sm" className="btn-3d w-full">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-up">
            <h2 className="text-4xl font-bold mb-6 text-glow">Why Choose Our Accessories?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Genuine Products",
                description: "All accessories are authentic and come with manufacturer warranty.",
                icon: "✅"
              },
              {
                title: "Perfect Fit",
                description: "Designed specifically for your device model for optimal compatibility.",
                icon: "🎯"
              },
              {
                title: "Best Value",
                description: "Competitive prices with regular discounts and combo offers.",
                icon: "💰"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-3d reveal-up text-center">
                <CardContent className="p-8 space-y-4">
                  <div className="text-4xl">{feature.icon}</div>
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

const ProductCard = ({ product }: { product: Product }) => {
  const discountPercentage = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <Card className="card-3d reveal-up overflow-hidden group">
      <div className="relative">
        <img 
          src={product.image_url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center"} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
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

        <Button size="sm" className="btn-3d w-full">
          <ShoppingCart className="w-3 h-3 mr-1" />
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default Accessories;