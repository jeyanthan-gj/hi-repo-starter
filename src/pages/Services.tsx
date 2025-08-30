import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Battery, 
  Camera, 
  Zap, 
  Volume2, 
  Mic, 
  Home, 
  Settings, 
  Database, 
  VolumeX, 
  Fingerprint, 
  Square,
  Cpu,
  Headphones,
  MessageCircle,
  Clock,
  CheckCircle,
  Star
} from "lucide-react";
import mobileRepairImage from "@/assets/mobile-repair.jpg";

// Import service images
import screenRepairImage from "@/assets/Screen Repair or Replacement.jpg";
import batteryReplacementImage from "@/assets/Battery Replacement.jpg";
import cameraRepairImage from "@/assets/Camera Repair.jpg";
import chargingPortRepairImage from "@/assets/Charging Port Repair.jpg";
import speakerRepairImage from "@/assets/Speaker Repair.jpg";
import microphoneRepairImage from "@/assets/Microphone Repair.jpg";
import homeButtonRepairImage from "@/assets/Home Button Repair.jpg";
import softwareTroubleshootingImage from "@/assets/Software Troubleshooting.jpg";
import dataRecoveryImage from "@/assets/Data Recovery.jpg";
import volumePowerButtonRepairImage from "@/assets/Volume and Power Button Repair.jpg";
import fingerprintSensorRepairImage from "@/assets/Fingerprint Sensor Repair.jpg";
import backPanelReplacementImage from "@/assets/Back Panel Replacement.jpg";
import motherboardRepairImage from "@/assets/Motherboard Repair or Replacement.jpg";
import headphoneJackRepairImage from "@/assets/Headphone Jack Repair.jpg";
import anyOtherIssueImage from "@/assets/Any Other Issue.jpg";

const Services = () => {
  const [selectedService, setSelectedService] = useState("");
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

  const services = [
    {
      title: "Screen Repair or Replacement",
      icon: Smartphone,
      description: "Professional screen repair and replacement for all mobile devices with high-quality parts.",
      price: "₹1,500 - ₹8,000",
      time: "30 minutes - 2 hours",
      image: screenRepairImage
    },
    {
      title: "Battery Replacement",
      icon: Battery,
      description: "Replace old or faulty batteries to restore your phone's power and performance.",
      price: "₹800 - ₹3,500",
      time: "20 - 45 minutes",
      image: batteryReplacementImage
    },
    {
      title: "Camera Repair",
      icon: Camera,
      description: "Fix camera issues, lens replacement, and calibration for perfect photo quality.",
      price: "₹1,200 - ₹5,000",
      time: "45 minutes - 3 hours",
      image: cameraRepairImage
    },
    {
      title: "Charging Port Repair",
      icon: Zap,
      description: "Repair or replace damaged charging ports to restore proper charging functionality.",
      price: "₹600 - ₹2,500",
      time: "30 minutes - 1 hour",
      image: chargingPortRepairImage
    },
    {
      title: "Speaker Repair",
      icon: Volume2,
      description: "Fix audio issues, speaker replacement, and sound quality optimization.",
      price: "₹500 - ₹2,000",
      time: "20 - 60 minutes",
      image: speakerRepairImage
    },
    {
      title: "Microphone Repair",
      icon: Mic,
      description: "Restore clear call quality and voice recording with microphone repairs.",
      price: "₹400 - ₹1,800",
      time: "25 - 50 minutes",
      image: microphoneRepairImage
    },
    {
      title: "Home Button Repair",
      icon: Home,
      description: "Fix non-responsive home buttons and restore full functionality.",
      price: "₹300 - ₹1,500",
      time: "15 - 45 minutes",
      image: homeButtonRepairImage
    },
    {
      title: "Software Troubleshooting",
      icon: Settings,
      description: "Resolve software issues, OS updates, and performance optimization.",
      price: "₹200 - ₹1,000",
      time: "30 minutes - 2 hours",
      image: softwareTroubleshootingImage
    },
    {
      title: "Data Recovery",
      icon: Database,
      description: "Recover lost photos, contacts, and important data from damaged devices.",
      price: "₹1,000 - ₹5,000",
      time: "2 - 24 hours",
      image: dataRecoveryImage
    },
    {
      title: "Volume and Power Button Repair",
      icon: VolumeX,
      description: "Fix stuck or non-responsive volume and power buttons.",
      price: "₹300 - ₹1,200",
      time: "20 - 40 minutes",
      image: volumePowerButtonRepairImage
    },
    {
      title: "Fingerprint Sensor Repair",
      icon: Fingerprint,
      description: "Restore fingerprint unlock functionality and biometric security.",
      price: "₹800 - ₹3,000",
      time: "45 minutes - 2 hours",
      image: fingerprintSensorRepairImage
    },
    {
      title: "Back Panel Replacement",
      icon: Square,
      description: "Replace cracked or damaged back panels with original quality parts.",
      price: "₹600 - ₹4,000",
      time: "30 minutes - 1.5 hours",
      image: backPanelReplacementImage
    },
    {
      title: "Motherboard Repair or Replacement",
      icon: Cpu,
      description: "Complex motherboard repairs and replacements for critical hardware issues.",
      price: "₹2,000 - ₹15,000",
      time: "4 - 48 hours",
      image: motherboardRepairImage
    },
    {
      title: "Headphone Jack Repair",
      icon: Headphones,
      description: "Fix audio jack connectivity issues for headphones and external speakers.",
      price: "₹400 - ₹1,500",
      time: "25 - 50 minutes",
      image: headphoneJackRepairImage
    },
    {
      title: "Any Other Issue",
      icon: MessageCircle,
      description: "Have a different problem? Contact us for personalized repair solutions.",
      price: "Quote on inspection",
      time: "Varies",
      image: anyOtherIssueImage
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-gradient-to-b from-card/50 to-background bg-cover bg-center"
        style={{ backgroundImage: `url(${mobileRepairImage})` }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">Mobile Repair Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Professional mobile repair services with expert technicians, genuine parts, and quick turnaround times. We fix all brands and models.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <Clock className="w-4 h-4 mr-2" />
                Same Day Service
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <CheckCircle className="w-4 h-4 mr-2" />
                Genuine Parts
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <Star className="w-4 h-4 mr-2" />
                Expert Technicians
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up">
            <h2 className="text-4xl font-bold mb-6 text-glow">Our Repair Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From simple fixes to complex repairs, we handle all mobile device issues with precision and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-3d reveal-up overflow-hidden group">
                <div className="relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-bold">{service.price}</div>
                    <div className="text-sm opacity-90">{service.time}</div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                <Button 
                  asChild
                  className="w-full btn-3d"
                >
                  <Link to="/repair-services">
                    Book Service
                  </Link>
                </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-up">
            <h2 className="text-4xl font-bold mb-6 text-glow">Why Choose Our Repair Services?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Technicians",
                description: "Certified professionals with years of experience in mobile repairs.",
                icon: "👨‍🔧"
              },
              {
                title: "Genuine Parts",
                description: "We use only authentic replacement parts for lasting quality.",
                icon: "✅"
              },
              {
                title: "Quick Service",
                description: "Most repairs completed within the same day for your convenience.",
                icon: "⚡"
              },
              {
                title: "Warranty",
                description: "All repairs come with our comprehensive service warranty.",
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

      {/* Service Request Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-up">
            <h2 className="text-4xl font-bold mb-6 text-glow">Request a Service</h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you with a quote and timeline.
            </p>
          </div>

          <Card className="card-3d max-w-2xl mx-auto reveal-up">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Brand Name</label>
                    <Input placeholder="e.g., Apple, Samsung, OnePlus" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Model</label>
                    <Input placeholder="e.g., iPhone 15, Galaxy S24" className="bg-background/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Required</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service, index) => (
                        <SelectItem key={index} value={service.title}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Problem Description</label>
                  <Textarea 
                    placeholder="Describe the issue with your device in detail..."
                    className="bg-background/50 min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <Input placeholder="Full name" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input placeholder="+91 XXXXX XXXXX" className="bg-background/50" />
                  </div>
                </div>

                <Button type="submit" size="lg" className="btn-3d w-full">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Services;