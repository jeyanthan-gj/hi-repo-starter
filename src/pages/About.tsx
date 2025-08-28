import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Target, Eye, Phone, Mail, MapPin } from "lucide-react";
import aboutImage from "@/assets/about-jayam.jpg";

const About = () => {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">About Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Welcome to Jayam Mobiles – Your Trusted Mobile Destination!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="reveal-up">
              <img 
                src={aboutImage} 
                alt="Jayam Mobile Store"
                className="rounded-2xl shadow-2xl hover-tilt"
              />
            </div>
            <div className="space-y-6 reveal-up">
              <h2 className="text-4xl font-bold text-glow">
                Welcome to Jayam Mobiles
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Jayam Mobiles, we are committed to bringing you the latest mobile phones and accessories, offering exceptional quality at competitive prices. For over a decade, we've proudly served the Anjugramam community, ensuring that every customer finds the perfect mobile device to fit their needs.
              </p>
              <div className="space-y-4">
                {[
                  "Over 10 years of trusted service",
                  "Latest smartphones from top brands",
                  "Competitive prices and exclusive offers",
                  "Expert advice and customer support"
                ].map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <Card className="card-3d reveal-up">
              <CardContent className="p-8 text-center space-y-6">
                <Target className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-2xl font-bold text-glow">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our goal is to provide you with top-of-the-line smartphones and accessories from the best brands, combined with outstanding customer service. Whether you're buying your first phone or upgrading to the newest model, we ensure a seamless, hassle-free shopping experience that leaves you completely satisfied.
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d reveal-up">
              <CardContent className="p-8 text-center space-y-6">
                <Eye className="w-16 h-16 text-secondary mx-auto" />
                <h3 className="text-2xl font-bold text-glow">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We aspire to become the leading mobile retailer in Kanyakumari, known for our diverse selection, affordable pricing, and unwavering commitment to customer satisfaction. Our focus is on delivering not just products, but an experience that exceeds your expectations.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Us */}
          <div className="text-center mb-12 reveal-up">
            <h2 className="text-4xl font-bold mb-6 text-glow">Why Choose Jayam Mobiles?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                title: "Wide Range of Smartphones",
                description: "From premium brands to affordable options, we offer a diverse selection.",
                icon: "📱"
              },
              {
                title: "Competitive Prices", 
                description: "Get the best deals and exclusive offers that make your purchase even more rewarding.",
                icon: "💰"
              },
              {
                title: "Expert Advice",
                description: "Our knowledgeable staff is here to help you make the right choice for your needs.",
                icon: "🎯"
              },
              {
                title: "Warranty & After-Sales Service",
                description: "Enjoy peace of mind with our reliable warranty and customer support.",
                icon: "🛡️"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-3d reveal-up text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="card-3d max-w-4xl mx-auto reveal-up">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-glow">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions or need more information, don't hesitate to reach out to us:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-3">
                  <Phone className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 123 456 7890
                  </a>
                </div>

                <div className="text-center space-y-3">
                  <Mail className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:contact@jayammobile.com" className="text-muted-foreground hover:text-primary transition-colors">
                    contact@jayammobile.com
                  </a>
                </div>

                <div className="text-center space-y-3">
                  <MapPin className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="font-semibold">Address</h3>
                  <div className="text-muted-foreground">
                    North Bazaar, Anjugramam,<br />
                    Kanyakumari, Tamil Nadu
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-lg font-semibold text-primary mb-4">
                  Visit us today and experience the Jayam Mobiles difference!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;