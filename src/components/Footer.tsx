import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
                JM
              </div>
              <div>
                <div className="font-bold text-lg text-glow">Jayam Mobile</div>
                <div className="text-sm text-muted-foreground">Since 2013</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted mobile destination in Anjugramam. We provide the latest smartphones and accessories with exceptional customer service for over a decade.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="hover-tilt">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover-tilt">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover-tilt">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "Brands", path: "/brands" },
                { name: "Accessories", path: "/accessories" },
                { name: "Services", path: "/services" },
                { name: "About Us", path: "/about" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Our Services</h3>
            <div className="space-y-2">
              {[
                "Screen Repair",
                "Battery Replacement", 
                "Camera Repair",
                "Charging Port Repair",
                "Software Troubleshooting",
                "Data Recovery",
              ].map((service) => (
                <div key={service} className="text-sm text-muted-foreground">
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  North Bazaar, Anjugramam,<br />
                  Kanyakumari, Tamil Nadu
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+911234567890" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:contact@jayammobile.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  contact@jayammobile.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2023 Jayam Mobiles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;