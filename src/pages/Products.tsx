import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Headphones, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-mobile-store.jpg";
import mobileAccessoriesImage from "@/assets/mobile-accessories.jpg";
import mobileRepairImage from "@/assets/mobile-repair.jpg";

const Products = () => {
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

  const categories = [
    {
      title: "Mobiles",
      description: "Explore our wide range of smartphones from top brands",
      image: heroImage,
      icon: Smartphone,
      link: "/brands",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Accessories", 
      description: "Complete your mobile experience with quality accessories",
      image: mobileAccessoriesImage,
      icon: Headphones,
      link: "/accessories",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Services",
      description: "Professional repair and maintenance services",
      image: mobileRepairImage,
      icon: Wrench,
      link: "/services",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">Our Products</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive range of mobile products and services designed to meet all your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="card-3d reveal-up overflow-hidden group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.description}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <Button asChild className="w-full btn-3d group">
                    <Link to={category.link}>
                      Explore {category.title}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-up">
            <h2 className="text-4xl font-bold mb-6 text-glow">Why Shop With Us?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best mobile shopping experience in Kanyakumari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Latest Technology",
                description: "Always up-to-date with the newest smartphone releases and innovations.",
                icon: "🚀"
              },
              {
                title: "Best Prices",
                description: "Competitive pricing with regular offers and discounts for our customers.",
                icon: "💎"
              },
              {
                title: "Expert Support",
                description: "Knowledgeable staff ready to help you choose the perfect device.",
                icon: "🎯"
              },
              {
                title: "Quality Assurance",
                description: "All products come with proper warranty and quality guarantees.",
                icon: "✅"
              },
              {
                title: "Fast Service",
                description: "Quick repairs and efficient customer service to minimize downtime.",
                icon: "⚡"
              },
              {
                title: "Local Trust",
                description: "Over 10 years of trusted service in the Anjugramam community.",
                icon: "🏆"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-3d reveal-up text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="card-3d text-center reveal-up">
            <CardContent className="p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-glow">
                Ready to Find Your Perfect Mobile?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Visit our store today or contact us for personalized recommendations based on your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-3d">
                  <Link to="/brands">
                    Browse Mobiles
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover-tilt">
                  <Link to="/about">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Products;