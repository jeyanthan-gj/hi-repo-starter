import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Search, Smartphone, Star } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

interface Model {
  id: string;
  brand_id: string;
  name: string;
  price: number;
  original_price?: number;
  rating: number;
  reviews: number;
  image_url?: string;
  features: string[];
  created_at: string;
  updated_at: string;
  brands?: Brand;
}

const ModelManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [formData, setFormData] = useState({
    brand_id: '',
    name: '',
    price: '',
    original_price: '',
    rating: '',
    reviews: '',
    image_url: '',
    features: ''
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch brands for the dropdown
  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Brand[];
    }
  });

  // Fetch models with brand information
  const { data: models = [], isLoading, error } = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('models')
        .select(`
          *,
          brands:brand_id (
            id,
            name,
            logo_url
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Model[];
    }
  });

  // Add model mutation
  const addModelMutation = useMutation({
    mutationFn: async (newModel: any) => {
      const { data, error } = await supabase
        .from('models')
        .insert([newModel])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      toast({
        title: "Success",
        description: "Model added successfully!",
      });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add model. Please try again.",
        variant: "destructive",
      });
      console.error('Error adding model:', error);
    }
  });

  // Update model mutation
  const updateModelMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('models')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      toast({
        title: "Success",
        description: "Model updated successfully!",
      });
      resetForm();
      setEditingModel(null);
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update model. Please try again.",
        variant: "destructive",
      });
      console.error('Error updating model:', error);
    }
  });

  // Delete model mutation
  const deleteModelMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('models')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      toast({
        title: "Success",
        description: "Model deleted successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete model. Please try again.",
        variant: "destructive",
      });
      console.error('Error deleting model:', error);
    }
  });

  const resetForm = () => {
    setFormData({
      brand_id: '',
      name: '',
      price: '',
      original_price: '',
      rating: '',
      reviews: '',
      image_url: '',
      features: ''
    });
    setEditingModel(null);
  };

  const startEdit = (model: Model) => {
    setEditingModel(model);
    setFormData({
      brand_id: model.brand_id,
      name: model.name,
      price: model.price.toString(),
      original_price: model.original_price?.toString() || '',
      rating: model.rating.toString(),
      reviews: model.reviews.toString(),
      image_url: model.image_url || '',
      features: model.features.join(', ')
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const features = formData.features.split(',').map(f => f.trim()).filter(f => f);
    
    const modelData = {
      brand_id: formData.brand_id,
      name: formData.name,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      image_url: formData.image_url || null,
      features
    };

    if (editingModel) {
      updateModelMutation.mutate({ id: editingModel.id, updates: modelData });
    } else {
      addModelMutation.mutate(modelData);
    }
  };

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.brands?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Models</h1>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Model Management</h1>
            <p className="text-muted-foreground">Manage mobile phone models and their details</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="btn-3d">
                <Plus className="w-4 h-4 mr-2" />
                Add Model
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingModel ? 'Edit Model' : 'Add New Model'}</DialogTitle>
                <DialogDescription>
                  {editingModel ? 'Update the model information below.' : 'Fill in the details for the new mobile model.'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand_id">Brand</Label>
                    <Select
                      value={formData.brand_id}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, brand_id: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Model Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. iPhone 15 Pro Max"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="99999"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="original_price">Original Price (₹)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      step="0.01"
                      value={formData.original_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, original_price: e.target.value }))}
                      placeholder="109999"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                      placeholder="4.5"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reviews">Number of Reviews</Label>
                    <Input
                      id="reviews"
                      type="number"
                      value={formData.reviews}
                      onChange={(e) => setFormData(prev => ({ ...prev, reviews: e.target.value }))}
                      placeholder="256"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/phone-image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="A17 Pro Chip, 48MP Camera, 5G Ready"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    className="btn-3d"
                    disabled={addModelMutation.isPending || updateModelMutation.isPending}
                  >
                    {editingModel ? 'Update Model' : 'Add Model'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Models Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <Card className="card-3d">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardContent className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : filteredModels.length === 0 ? (
          <Card className="card-3d text-center py-12">
            <CardContent>
              <Smartphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Models Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No models match your search criteria.' : 'Start by adding your first mobile model.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsDialogOpen(true)} className="btn-3d">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Model
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <Card key={model.id} className="card-3d overflow-hidden">
                {model.image_url && (
                  <div className="relative">
                    <img 
                      src={model.image_url} 
                      alt={model.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {model.brands?.name}
                      </Badge>
                    </div>
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{model.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({model.reviews} reviews)</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">₹{model.price.toLocaleString()}</span>
                    {model.original_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{model.original_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {model.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {model.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {model.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{model.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(model)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Model</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{model.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteModelMutation.mutate(model.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelManagement;