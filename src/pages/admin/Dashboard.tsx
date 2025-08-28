import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Package, 
  Users, 
  Settings,
  BarChart3,
  ShoppingBag
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  const dashboardCards = [
    {
      title: 'Brand Management',
      description: 'Manage mobile brands and their information',
      icon: Package,
      link: '/admin/brands',
      color: 'text-blue-500'
    },
    {
      title: 'Model Management', 
      description: 'Add and manage mobile models',
      icon: Smartphone,
      link: '/admin/models',
      color: 'text-green-500'
    },
    {
      title: 'User Management',
      description: 'View and manage user accounts',
      icon: Users,
      link: '/admin/users',
      color: 'text-purple-500'
    },
    {
      title: 'Analytics',
      description: 'View sales and performance metrics',
      icon: BarChart3,
      link: '/admin/analytics',
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.email}. Manage your mobile store from here.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-3d border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Total Brands
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4</div>
              <p className="text-xs text-muted-foreground">
                Active mobile brands
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Total Models
              </CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">
                Available mobile models
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1</div>
              <p className="text-xs text-muted-foreground">
                Registered users
              </p>
            </CardContent>
          </Card>

          <Card className="card-3d border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Revenue
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹0</div>
              <p className="text-xs text-muted-foreground">
                Total sales
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardCards.map((card, index) => (
            <Card key={index} className="card-3d border-border/50 hover-tilt">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                  {card.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={card.link}>
                  <Button className="w-full btn-3d">
                    Manage
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="card-3d border-border/50 mt-8">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription className="text-muted-foreground">
              Latest changes and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/20">
                <Settings className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-foreground font-medium">
                    Admin dashboard initialized
                  </p>
                  <p className="text-sm text-muted-foreground">
                    System ready for brand and model management
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;