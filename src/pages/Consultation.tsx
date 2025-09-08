import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Smartphone, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  MessageCircle, 
  Clock,
  CheckCircle2,
  ArrowRight 
} from "lucide-react";
import heroImage from "@/assets/hero-mobile-store.jpg";

const Consultation = () => {
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

  const consultationServices = [
    {
      icon: Smartphone,
      title: "Device Selection",
      description: "Get expert advice on choosing the perfect mobile device for your needs and budget."
    },
    {
      icon: ShieldCheck,
      title: "Protection Planning",
      description: "Learn about the best accessories and protection options for your device."
    },
    {
      icon: TrendingUp,
      title: "Upgrade Strategy",
      description: "Plan your device upgrades with timing and trade-in value optimization."
    },
    {
      icon: Users,
      title: "Business Solutions",
      description: "Consultation for businesses looking for mobile device solutions for their teams."
    }
  ];

  const benefits = [
    "Professional consultation service",
    "Expert advice from certified technicians",
    "Personalized recommendations",
    "Budget-friendly options",
    "Post-purchase support",
    "Warranty guidance"
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-glow">
              Expert Mobile
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Consultation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Get personalized advice from our mobile experts. Whether you're buying, upgrading, or need guidance, we're here to help you make the right choice.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Our Consultation Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guidance to help you make informed decisions about your mobile devices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consultationServices.map((service, index) => (
              <Card key={index} className="card-3d reveal-up text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
                Why Choose Our Consultation?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With over 10 years of experience in the mobile industry, our experts provide unbiased advice to help you find the perfect mobile solution.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="card-3d reveal-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <span>Book Your Consultation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="Your email" className="bg-background/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tell us about your needs</label>
                  <Textarea 
                    placeholder="Describe what you're looking for..."
                    className="bg-background/50 min-h-[100px]"
                  />
                </div>
                <Button className="btn-3d w-full">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Message us on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center reveal-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-glow">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to schedule your free consultation and discover the perfect mobile solution for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-3d">
                <MessageCircle className="mr-2 w-5 h-5" />
                Call Now: +91 9876543210
              </Button>
              <Button size="lg" variant="outline" className="hover-tilt">
                <ArrowRight className="mr-2 w-5 h-5" />
                Visit Our Store
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;