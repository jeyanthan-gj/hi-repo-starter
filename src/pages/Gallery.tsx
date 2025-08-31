import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Download, X } from "lucide-react";
import heroImage from "@/assets/hero-mobile-store.jpg";
import aboutImage from "@/assets/about-jayam.jpg";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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

  const categories = [
    { id: "all", name: "All Images", count: 12 },
    { id: "showroom", name: "Showroom", count: 8 },
    { id: "products", name: "Products", count: 4 }
  ];

  // Sample gallery images - in a real app this would come from a backend
  const galleryImages = [
    {
      id: 1,
      src: heroImage,
      title: "Modern Mobile Showroom",
      category: "showroom",
      description: "Our state-of-the-art showroom featuring the latest smartphones"
    },
    {
      id: 2,
      src: aboutImage,
      title: "Jayam Mobile Store Interior",
      category: "showroom",
      description: "Welcome to our friendly and professional environment"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&crop=center",
      title: "Latest iPhone Models",
      category: "products",
      description: "Apple iPhone collection with latest models and variants"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=600&fit=crop&crop=center",
      title: "Samsung Galaxy Series",
      category: "products",
      description: "Samsung smartphones ranging from budget to premium"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=600&fit=crop&crop=center",
      title: "OnePlus Collection",
      category: "products",
      description: "OnePlus devices with flagship features at competitive prices"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&crop=center",
      title: "Xiaomi Redmi Series",
      category: "products",
      description: "Xiaomi smartphones offering great value for money"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop&crop=center",
      title: "Customer Service Area",
      category: "showroom",
      description: "Comfortable customer consultation and service area"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop&crop=center",
      title: "Product Display",
      category: "showroom",
      description: "Elegant product displays showcasing latest devices"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center",
      title: "Store Front View",
      category: "showroom",
      description: "Jayam Mobile store exterior in North Bazaar, Anjugramam"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1606983340737-7e5e0a0e8b0d?w=800&h=600&fit=crop&crop=center",
      title: "Camera Testing Zone",
      category: "showroom",
      description: "Interactive area for testing mobile camera capabilities"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&crop=center",
      title: "Audio Experience Corner",
      category: "showroom",
      description: "Dedicated space for testing audio quality and features"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop&crop=center",
      title: "Team Photo",
      category: "showroom",
      description: "Our dedicated team of mobile experts and technicians"
    }
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take a visual tour of our showroom, products, and services. See why Jayam Mobile is the preferred choice in Anjugramam.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 reveal-up">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`hover-tilt ${selectedCategory === category.id ? "btn-3d" : ""}`}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card key={image.id} className="card-3d reveal-up overflow-hidden group">
                <div className="relative">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="btn-3d">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-xl border-border">
                        <div className="relative">
                          <img 
                            src={image.src} 
                            alt={image.title}
                            className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                          />
                          <div className="mt-4 space-y-2">
                            <h3 className="text-xl font-bold">{image.title}</h3>
                            <p className="text-muted-foreground">{image.description}</p>
                            <Badge variant="outline" className="capitalize">
                              {image.category}
                            </Badge>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-black/50 text-white capitalize">
                      {image.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-1 mb-1">{image.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <Card className="card-3d text-center reveal-up">
            <CardContent className="p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-glow">
                Visit Our Showroom
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience our products and services in person. Our friendly staff is ready to help you find the perfect mobile solution.
              </p>
              <div className="text-muted-foreground space-y-2">
                <div className="font-medium">📍 North Bazaar, Anjugramam, Kanyakumari, Tamil Nadu</div>
                <div>📞 +91 123 456 7890</div>
                <div>📧 contact@jayammobile.com</div>
              </div>
              <Button size="lg" className="btn-3d">
                Get Directions
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Gallery;