import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Gallery2DSlideshow } from "@/components/Gallery2DSlideshow";
import heroImage from "@/assets/hero-mobile-store.jpg";
import aboutImage from "@/assets/about-jayam.jpg";

interface GalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

const Gallery = () => {
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

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched gallery data:', data);
      
      if (data && data.length > 0) {
        setGalleryImages(data as GalleryPhoto[]);
      } else {
        // Use fallback images if no data from database
        const fallbackImages: GalleryPhoto[] = [
          {
            id: 'hero-1',
            title: "Modern Mobile Showroom",
            description: "Our state-of-the-art showroom featuring the latest smartphones",
            image_url: heroImage,
            category: "showroom"
          },
          {
            id: 'about-1',
            title: "Jayam Mobiles Store Interior",
            description: "Welcome to our friendly and professional environment",
            image_url: aboutImage,
            category: "showroom"
          }
        ];
        setGalleryImages(fallbackImages);
      }
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
      // Use fallback images on error
      setGalleryImages([
        {
          id: 'hero-1',
          title: "Modern Mobile Showroom",
          description: "Our state-of-the-art showroom featuring the latest smartphones",
          image_url: heroImage,
          category: "showroom"
        },
        {
          id: 'about-1',
          title: "Jayam Mobiles Store Interior",
          description: "Welcome to our friendly and professional environment", 
          image_url: aboutImage,
          category: "showroom"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take a visual tour of our showroom, products, and services. See why Jayam Mobiles is the preferred choice in Anjugramam.
            </p>
          </div>
        </div>
      </section>


      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading gallery...</p>
            </div>
          ) : (
            <Gallery2DSlideshow images={galleryImages} />
          )}
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