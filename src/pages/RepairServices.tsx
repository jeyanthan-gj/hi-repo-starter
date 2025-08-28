import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const RepairServices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchParams] = useSearchParams();

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

  const services = [
    {
      name: "Screen Repair or Replacement",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center",
      price: "₹1,500 - ₹8,000",
      time: "30 mins - 2 hours"
    },
    {
      name: "Battery Replacement", 
      image: "https://images.unsplash.com/photo-1609592439469-a1ba9a7b9e5e?w=400&h=300&fit=crop&crop=center",
      price: "₹800 - ₹3,500",
      time: "20 - 45 mins"
    },
    {
      name: "Camera Repair",
      image: "https://images.unsplash.com/photo-1606983340737-7e5e0a0e8b0d?w=400&h=300&fit=crop&crop=center",
      price: "₹1,200 - ₹5,000", 
      time: "45 mins - 3 hours"
    },
    {
      name: "Charging Port Repair",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop&crop=center",
      price: "₹600 - ₹2,500",
      time: "30 mins - 1 hour"
    },
    {
      name: "Speaker Repair",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
      price: "₹500 - ₹2,000",
      time: "20 - 60 mins"
    },
    {
      name: "Microphone Repair",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center",
      price: "₹400 - ₹1,800",
      time: "25 - 50 mins"
    },
    {
      name: "Home Button Repair",
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop&crop=center",
      price: "₹300 - ₹1,500",
      time: "15 - 45 mins"
    },
    {
      name: "Software Troubleshooting",
      image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=400&h=300&fit=crop&crop=center",
      price: "₹200 - ₹1,000",
      time: "30 mins - 2 hours"
    },
    {
      name: "Data Recovery",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&crop=center",
      price: "₹1,000 - ₹5,000",
      time: "2 - 24 hours"
    },
    {
      name: "Volume and Power Button Repair",
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=300&fit=crop&crop=center",
      price: "₹300 - ₹1,200",
      time: "20 - 40 mins"
    },
    {
      name: "Fingerprint Sensor Repair",
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=300&fit=crop&crop=center",
      price: "₹800 - ₹3,000",
      time: "45 mins - 2 hours"
    },
    {
      name: "Back Panel Replacement",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=300&fit=crop&crop=center",
      price: "₹600 - ₹4,000",
      time: "30 mins - 1.5 hours"
    },
    {
      name: "Motherboard Repair or Replacement",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop&crop=center",
      price: "₹2,000 - ₹15,000",
      time: "4 - 48 hours"
    },
    {
      name: "Headphone Jack Repair",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop&crop=center",
      price: "₹400 - ₹1,500",
      time: "25 - 50 mins"
    },
    {
      name: "Any Other Issue",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop&crop=center",
      price: "Quote on inspection",
      time: "Varies"
    }
  ];

  // Filter services based on search query
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      const results = services.filter(service =>
        service.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Handle service selection from search
  const handleServiceSelect = (serviceName: string) => {
    setSearchQuery(serviceName);
    setShowResults(false);
  };

  // Handle service booking
  const handleServiceBook = (serviceName: string) => {
    const whatsappMessage = encodeURIComponent(
      `Hi! I would like to book a service for: ${serviceName}\n\nPlease provide me with more details about the pricing and availability.`
    );
    window.open(`https://wa.me/918667200485?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <section className="relative py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">Repair Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Professional mobile repair services with expert technicians, genuine parts, and quick turnaround times.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for repair services..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-background/80 backdrop-blur-sm border-border/50 text-lg py-6"
                />
              </div>
              
              {/* Search Results */}
              {showResults && searchResults.length > 0 && (
                <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-card/95 backdrop-blur-xl border-border">
                  <CardContent className="p-0">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="p-3 border-b border-border/50 last:border-b-0 hover:bg-primary/10 cursor-pointer transition-colors"
                        onClick={() => handleServiceSelect(result.name)}
                      >
                        <div className="flex items-center space-x-3">
                          <img 
                            src={result.image} 
                            alt={result.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="text-left">
                            <div className="font-medium">{result.name}</div>
                            <div className="text-sm text-muted-foreground">{result.price}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <Card key={index} className="card-3d reveal-up overflow-hidden group cursor-pointer">
                <div className="relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Price and Time Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {service.price}
                    </Badge>
                    <Badge className="bg-accent/90 text-accent-foreground block">
                      {service.time}
                    </Badge>
                  </div>

                  {/* Service Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {service.name}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>💰 {service.price}</span>
                      <span>⏱️ {service.time}</span>
                    </div>
                    
                    <button
                      onClick={() => handleServiceBook(service.name)}
                      className="w-full btn-3d py-3 text-center font-medium transition-all duration-300"
                    >
                      Book Service
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {searchQuery && filteredServices.length === 0 && (
            <div className="text-center py-12 reveal-up">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No services found</h3>
              <p className="text-muted-foreground">
                Try searching with different keywords or browse all services above.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Repairs */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-up">
            <h2 className="text-4xl font-bold mb-6 text-glow">Why Choose Our Repair Services?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Technicians",
                description: "Certified professionals with years of experience",
                icon: "👨‍🔧"
              },
              {
                title: "Genuine Parts",
                description: "We use only authentic replacement parts",
                icon: "✅"
              },
              {
                title: "Quick Service",
                description: "Most repairs completed the same day",
                icon: "⚡"
              },
              {
                title: "Warranty",
                description: "All repairs come with service warranty",
                icon: "🛡️"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-3d reveal-up text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="card-3d text-center reveal-up">
            <CardContent className="p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-glow">
                Need Immediate Assistance?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Call us or visit our store for urgent repairs and expert consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+918667200485"
                  className="btn-3d inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
                >
                  📞 Call Now
                </a>
                <a
                  href="https://wa.me/918667200485"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
                >
                  💬 WhatsApp
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RepairServices;