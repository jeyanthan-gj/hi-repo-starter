import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone, Mail, User, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Mobiles", path: "/brands" },
    { name: "Accessories", path: "/accessories" },
    { name: "Mobile Service", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "glass-nav py-2" : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-tilt">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/13e68c24-915d-41d3-81c6-c97854197081.png" 
                alt="Jayam Mobiles Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-glow">Jayam Mobiles</div>
              <div className="text-xs text-muted-foreground">Your Trusted Mobile Destination</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-foreground"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                
                <Button 
                  onClick={signOut} 
                  variant="outline" 
                  size="sm"
                  className="border-border text-foreground hover:bg-muted"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover-tilt">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-xl border-border">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src="/lovable-uploads/13e68c24-915d-41d3-81c6-c97854197081.png" 
                      alt="Jayam Mobiles Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-bold">Jayam Mobiles</div>
                    <div className="text-xs text-muted-foreground">Mobile Store</div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMobileOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block p-3 rounded-lg transition-colors hover:bg-primary/10 ${
                      location.pathname === item.path ? "bg-primary/20 text-primary" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="mt-8 space-y-4 pt-8 border-t border-border">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMobileOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full justify-start border-border text-foreground">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    
                    <Button 
                      onClick={() => {
                        signOut();
                        setIsMobileOpen(false);
                      }} 
                      variant="outline" 
                      size="sm"
                      className="w-full justify-start border-border text-foreground"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-start border-border text-foreground">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
                
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-sm">+918667200485</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-sm">contact@jayammobile.com</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;