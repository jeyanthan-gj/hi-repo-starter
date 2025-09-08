import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import ModelDetail from "./pages/ModelDetail";
import Accessories from "./pages/Accessories";
import Services from "./pages/Services";
import Consultation from "./pages/Consultation";

import Gallery from "./pages/Gallery";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import BrandManagement from "./pages/admin/BrandManagement";
import ModelManagement from "./pages/admin/ModelManagement";
import AccessoryCategoryManagement from "./pages/admin/AccessoryCategoryManagement";
import AccessorySubcategoryManagement from "./pages/admin/AccessorySubcategoryManagement";
import AccessoryProductManagement from "./pages/admin/AccessoryProductManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Public routes with layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/brands" element={<Layout><Brands /></Layout>} />
            <Route path="/model/:id" element={<Layout><ModelDetail /></Layout>} />
            <Route path="/accessories" element={<Layout><Accessories /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/consultation" element={<Layout><Consultation /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            
            {/* Protected admin routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/brands" 
              element={
                <ProtectedRoute requireAdmin>
                  <BrandManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/models" 
              element={
                <ProtectedRoute requireAdmin>
                  <ModelManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/accessory-categories" 
              element={
                <ProtectedRoute requireAdmin>
                  <AccessoryCategoryManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/accessory-subcategories" 
              element={
                <ProtectedRoute requireAdmin>
                  <AccessorySubcategoryManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/accessory-products" 
              element={
                <ProtectedRoute requireAdmin>
                  <AccessoryProductManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/gallery" 
              element={
                <ProtectedRoute requireAdmin>
                  <GalleryManagement />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
