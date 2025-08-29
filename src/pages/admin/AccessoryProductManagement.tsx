import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Upload, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AccessoryProductManagement = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  
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

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('accessory_products')
        .select(`
          *,
          accessory_categories(name),
          accessory_subcategories(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('accessory_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('accessory_subcategories')
        .select('*')
        .eq('category_id', categoryId)
        .order('name');

      if (error) throw error;
      setSubcategories(data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubcategories(newProduct.category_id);
  }, [newProduct.category_id]);

  const handleImageUpload = async (file: File, isEditing = false) => {
    try {
      setUploadingImage(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `accessory-products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('accessory-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('accessory-images')
        .getPublicUrl(filePath);

      if (isEditing) {
        setEditingProduct({ ...editingProduct, image_url: publicUrl });
      } else {
        setNewProduct({ ...newProduct, image_url: publicUrl });
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreate = async () => {
    if (!newProduct.name.trim() || !newProduct.category_id || !newProduct.price) {
      toast({
        title: "Error",
        description: "Product name, category, and price are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price) || null,
        original_price: newProduct.original_price ? parseFloat(newProduct.original_price) : null,
        rating: newProduct.rating ? parseFloat(newProduct.rating) : null,
        reviews: newProduct.reviews ? parseInt(newProduct.reviews) : null,
        subcategory_id: newProduct.subcategory_id === 'none' ? null : newProduct.subcategory_id || null
      };

      const { error } = await supabase
        .from('accessory_products')
        .insert([productData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product created successfully",
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

      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setEditingProduct({
      ...product,
      price: product.price?.toString() || '',
      original_price: product.original_price?.toString() || '',
      rating: product.rating?.toString() || '',
      reviews: product.reviews?.toString() || ''
    });
    fetchSubcategories(product.category_id);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      
      const productData = {
        ...editingProduct,
        price: parseFloat(editingProduct.price) || null,
        original_price: editingProduct.original_price ? parseFloat(editingProduct.original_price) : null,
        rating: editingProduct.rating ? parseFloat(editingProduct.rating) : null,
        reviews: editingProduct.reviews ? parseInt(editingProduct.reviews) : null,
        subcategory_id: editingProduct.subcategory_id === 'none' ? null : editingProduct.subcategory_id || null
      };

      const { error } = await supabase
        .from('accessory_products')
        .update(productData)
        .eq('id', editingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product updated successfully",
      });

      setEditingId(null);
      setEditingProduct({});
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('accessory_products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                  {categories.length === 0 ? (
                    <SelectItem value="placeholder" disabled>No categories available</SelectItem>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              <Select
                value={newProduct.subcategory_id}
                onValueChange={(value) => setNewProduct({ ...newProduct, subcategory_id: value })}
                disabled={!newProduct.category_id || subcategories.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.length === 0 ? (
                    <SelectItem value="none" disabled>No subcategories available</SelectItem>
                  ) : (
                    <>
                      <SelectItem value="none">None</SelectItem>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </>
                  )}
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

              <Button onClick={handleCreate} disabled={loading} className="btn-3d">
                <Plus className="w-4 h-4 mr-2" />
                {loading ? 'Creating...' : 'Add Product'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Image URL"
                    value={newProduct.image_url}
                    onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploadingImage}
                    />
                    <Button variant="outline" disabled={uploadingImage} className="whitespace-nowrap">
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingImage ? 'Uploading...' : 'Upload'}
                    </Button>
                  </div>
                </div>
                {newProduct.image_url && (
                  <img 
                    src={newProduct.image_url} 
                    alt="Preview" 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                )}
              </div>

              <Textarea
                placeholder="Description (optional)"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No products found. Add your first product above.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Reviews</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-xs">
                              No Image
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === product.id ? (
                            <Input
                              value={editingProduct.name || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                              className="min-w-[150px]"
                            />
                          ) : (
                            <div className="min-w-[150px]">{product.name}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === product.id ? (
                            <Select
                              value={editingProduct.category_id || ''}
                              onValueChange={(value) => {
                                setEditingProduct({ ...editingProduct, category_id: value, subcategory_id: '' });
                                fetchSubcategories(value);
                              }}
                            >
                              <SelectTrigger className="min-w-[120px]">
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant="secondary">
                              {product.accessory_categories?.name || 'Unknown'}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === product.id ? (
                            <Select
                              value={editingProduct.subcategory_id || ''}
                              onValueChange={(value) => setEditingProduct({ ...editingProduct, subcategory_id: value })}
                              disabled={subcategories.length === 0}
                            >
                              <SelectTrigger className="min-w-[120px]">
                                <SelectValue placeholder="Subcategory" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {subcategories.map((subcategory) => (
                                  <SelectItem key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {product.accessory_subcategories?.name || 'None'}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === product.id ? (
                            <div className="space-y-1">
                              <Input
                                placeholder="Price"
                                type="number"
                                step="0.01"
                                value={editingProduct.price || ''}
                                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                className="min-w-[100px]"
                              />
                              <Input
                                placeholder="Original"
                                type="number"
                                step="0.01"
                                value={editingProduct.original_price || ''}
                                onChange={(e) => setEditingProduct({ ...editingProduct, original_price: e.target.value })}
                                className="min-w-[100px]"
                              />
                            </div>
                          ) : (
                            <div className="text-sm">
                              <div className="font-medium">₹{product.price || 'N/A'}</div>
                              {product.original_price && (
                                <div className="text-muted-foreground line-through">₹{product.original_price}</div>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === product.id ? (
                            <Input
                              placeholder="Rating"
                              type="number"
                              step="0.1"
                              min="1"
                              max="5"
                              value={editingProduct.rating || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, rating: e.target.value })}
                              className="min-w-[80px]"
                            />
                          ) : (
                            <div className="text-sm">
                              {product.rating ? `${product.rating}/5` : 'N/A'}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === product.id ? (
                            <Input
                              placeholder="Reviews"
                              type="number"
                              value={editingProduct.reviews || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, reviews: e.target.value })}
                              className="min-w-[80px]"
                            />
                          ) : (
                            <div className="text-sm">
                              {product.reviews || 0}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {editingId === product.id ? (
                              <>
                                {editingId === product.id && (
                                  <div className="flex items-center gap-2 mb-2">
                                    <Input
                                      placeholder="Image URL"
                                      value={editingProduct.image_url || ''}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                                      className="text-xs"
                                    />
                                    <div className="relative">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], true)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        disabled={uploadingImage}
                                      />
                                      <Button size="sm" variant="outline" disabled={uploadingImage}>
                                        <Upload className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                                <Button size="sm" onClick={handleUpdate} disabled={loading}>
                                  <Save className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessoryProductManagement;