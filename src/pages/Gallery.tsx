import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-mobile-store.jpg";
import aboutImage from "@/assets/about-jayam.jpg";

interface GalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: 'showroom' | 'products';
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchGalleryPhotos();
    
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

  const fetchGalleryPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Add fallback images if no data from database
      const dbImages = (data as GalleryPhoto[]) || [];
      const fallbackImages: GalleryPhoto[] = [
        {
          id: 'hero-1',
          title: "Modern Mobile Showroom",
          category: "showroom",
          description: "Our state-of-the-art showroom featuring the latest smartphones",
          image_url: heroImage
        },
        {
          id: 'about-1',
          title: "Jayam Mobile Store Interior",
          category: "showroom",
          description: "Welcome to our friendly and professional environment",
          image_url: aboutImage
        }
      ];
      
      setGalleryImages(dbImages.length > 0 ? dbImages : fallbackImages);
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
      // Use fallback images on error
      setGalleryImages([
        {
          id: 'hero-1',
          title: "Modern Mobile Showroom",
          category: "showroom",
          description: "Our state-of-the-art showroom featuring the latest smartphones",
          image_url: heroImage
        },
        {
          id: 'about-1',
          title: "Jayam Mobile Store Interior",
          category: "showroom",
          description: "Welcome to our friendly and professional environment",
          image_url: aboutImage
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All Images", count: galleryImages.length },
    { id: "showroom", name: "Showroom", count: galleryImages.filter(img => img.category === 'showroom').length },
    { id: "products", name: "Products", count: galleryImages.filter(img => img.category === 'products').length }
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
                    src={image.image_url} 
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
                            src={image.image_url} 
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