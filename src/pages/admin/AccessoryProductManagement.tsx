import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AccessoryProductManagement = () => {
  const [newProduct, setNewProduct] = useState({
    category_id: '',
    subcategory_id: '',
    name: '',
    description: '',
    price: '',
    original_price: '',
    rating: '',
    reviews: '',
    image_url: ''
  });

  const handleCreate = async () => {
    if (!newProduct.name.trim() || !newProduct.category_id || !newProduct.price) {
      toast({
        title: "Error",
        description: "Product name, category, and price are required",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement database integration when types are updated
    toast({
      title: "Info",
      description: "Database integration pending - types need to be updated",
    });

    setNewProduct({
      category_id: '',
      subcategory_id: '',
      name: '',
      description: '',
      price: '',
      original_price: '',
      rating: '',
      reviews: '',
      image_url: ''
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Accessory Products</h1>
        </div>

        {/* Create New Product */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add New Product</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select
                value={newProduct.category_id}
                onValueChange={(value) => setNewProduct({ ...newProduct, category_id: value, subcategory_id: '' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder">No categories available</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={newProduct.subcategory_id}
                onValueChange={(value) => setNewProduct({ ...newProduct, subcategory_id: value })}
                disabled={true}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder">No subcategories available</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />

              <Input
                placeholder="Price (₹)"
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                placeholder="Original price (₹)"
                type="number"
                step="0.01"
                value={newProduct.original_price}
                onChange={(e) => setNewProduct({ ...newProduct, original_price: e.target.value })}
              />

              <Input
                placeholder="Rating (1-5)"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={newProduct.rating}
                onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
              />

              <Input
                placeholder="Number of reviews"
                type="number"
                value={newProduct.reviews}
                onChange={(e) => setNewProduct({ ...newProduct, reviews: e.target.value })}
              />

              <Button onClick={handleCreate} className="btn-3d">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Input
              placeholder="Image URL"
              value={newProduct.image_url}
              onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
            />

            <Textarea
              placeholder="Description (optional)"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Database integration pending. Products will appear here once the database types are updated.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessoryProductManagement;