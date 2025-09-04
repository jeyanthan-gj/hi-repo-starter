import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Smartphone, Wrench, ShoppingBag, Star, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-mobile-store.jpg";
import mobileRepairImage from "@/assets/mobile-repair.jpg";
import mobileAccessoriesImage from "@/assets/mobile-accessories.jpg";
import aboutImage from "@/assets/about-jayam.jpg";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for reveal animations
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

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
              NO:1 Smartphone
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Showroom
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We are committed to bringing you the latest mobile phones and accessories, offering exceptional quality at competitive prices. For over a decade, we've proudly served the Anjugramam community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-3d text-lg px-8 py-6">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-tilt text-lg px-8 py-6">
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float hidden lg:block" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: "Happy Customers", value: "10,000+" },
              { icon: Award, label: "Years of Experience", value: "10+" },
              { icon: Star, label: "Customer Rating", value: "4.9/5" },
            ].map((stat, index) => (
              <Card key={index} className="card-3d reveal-up text-center p-8">
                <CardContent className="space-y-4">
                  <stat.icon className="w-12 h-12 text-primary mx-auto" />
                  <div className="text-3xl font-bold text-glow">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-up">
              <img 
                src="/lovable-uploads/c44d59bb-0903-447d-9560-7104bd229f4d.png" 
                alt="About Jayam Mobiles"
                className="rounded-2xl shadow-2xl hover-tilt"
              />
            </div>
            <div className="space-y-6 reveal-up">
              <h2 className="text-4xl md:text-5xl font-bold text-glow">
                We offer the latest mobile devices and accessories
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to provide quality products and exceptional service. We offer the latest mobile devices and accessories with expert advice and reliable warranty support.
              </p>
              <Button asChild size="lg" className="btn-3d">
                <Link to="/about">
                  Read More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Our Gallery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out our latest mobile products and accessories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { image: heroImage, title: "Latest Smartphones", subtitle: "Premium devices" },
              { image: mobileRepairImage, title: "Expert Repairs", subtitle: "Professional service" },
              { image: mobileAccessoriesImage, title: "Quality Accessories", subtitle: "Complete protection" },
            ].map((item, index) => (
              <Card key={index} className="card-3d reveal-up overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.subtitle}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center reveal-up">
            <Button asChild size="lg" variant="outline" className="hover-tilt">
              <Link to="/gallery">See More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide a range of services to enhance your mobile experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Wrench,
                title: "Mobile Repair",
                description: "Expert repair services for all mobile devices.",
                image: mobileRepairImage,
              },
              {
                icon: ShoppingBag,
                title: "Accessories",
                description: "A wide range of mobile accessories available.",
                image: mobileAccessoriesImage,
              },
              {
                icon: Smartphone,
                title: "Consultation",
                description: "Get expert advice on mobile purchases.",
                image: heroImage,
              },
            ].map((service, index) => (
              <Card key={index} className="card-3d reveal-up overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  <service.icon className="absolute top-4 right-4 w-8 h-8 text-primary" />
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  <Button asChild variant="ghost" className="p-0 h-auto text-primary">
                    <Link to={service.title === "Accessories" ? "/accessories" : "/repair-services"}>
                      Read More <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Contact Us</h2>
            <p className="text-lg text-muted-foreground">Send us a message and we'll get back to you.</p>
          </div>

          <Card className="card-3d max-w-2xl mx-auto reveal-up">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input placeholder="Your name" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mobile</label>
                    <Input placeholder="Your mobile number" className="bg-background/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="Your email" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input placeholder="Your address" className="bg-background/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea 
                    placeholder="Tell us about your requirements..."
                    className="bg-background/50 min-h-[120px]"
                  />
                </div>
                <Button type="submit" size="lg" className="btn-3d w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;