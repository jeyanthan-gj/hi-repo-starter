import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

const AccessoryCategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category>>({});
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('accessory-images')
      .upload(path, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('accessory-images')
      .getPublicUrl(data.path);
    
    return publicUrl;
  };

  const handleCreate = async () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      let imageUrl = newCategory.image_url;
      
      if (imageFile) {
        const fileName = `category-${Date.now()}-${imageFile.name}`;
        imageUrl = await uploadImage(imageFile, fileName);
      }

      const { error } = await supabase
        .from('accessory_categories')
        .insert([{
          name: newCategory.name.trim(),
          description: newCategory.description.trim() || null,
          icon: newCategory.icon.trim() || null,
          image_url: imageUrl,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category created successfully",
      });

      setNewCategory({ name: '', description: '', icon: '', image_url: '' });
      setImageFile(null);
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingCategory(category);
  };

  const handleUpdate = async () => {
    if (!editingCategory.name?.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      let imageUrl = editingCategory.image_url;
      
      if (editImageFile) {
        const fileName = `category-${Date.now()}-${editImageFile.name}`;
        imageUrl = await uploadImage(editImageFile, fileName);
      }

      const { error } = await supabase
        .from('accessory_categories')
        .update({
          name: editingCategory.name.trim(),
          description: editingCategory.description?.trim() || null,
          icon: editingCategory.icon?.trim() || null,
          image_url: imageUrl,
        })
        .eq('id', editingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category updated successfully",
      });

      setEditingId(null);
      setEditingCategory({});
      setEditImageFile(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('accessory_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category deleted successfully",
      });

      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingCategory({});
    setEditImageFile(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Accessory Categories</h1>
        </div>

        {/* Create New Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add New Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <Input
                placeholder="Icon name (optional)"
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="file"
                  id="new-category-image"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('new-category-image')?.click()}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {imageFile ? 'Change' : 'Upload'} Image
                </Button>
              </div>
              <Button onClick={handleCreate} className="btn-3d">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Description (optional)"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
              {imageFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Selected: {imageFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setImageFile(null)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Categories ({categories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No categories found. Create your first category above.</p>
              </div>
            ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Icon</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          {editingId === category.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                id={`edit-category-image-${category.id}`}
                                accept="image/*"
                                onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
                                className="hidden"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById(`edit-category-image-${category.id}`)?.click()}
                              >
                                <Upload className="w-3 h-3" />
                              </Button>
                              {editImageFile && (
                                <span className="text-xs text-muted-foreground">{editImageFile.name}</span>
                              )}
                            </div>
                          ) : category.image_url ? (
                            <img
                              src={category.image_url}
                              alt={category.name}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">No image</span>
                            </div>
                          )}
                        </TableCell>
                      <TableCell>
                        {editingId === category.id ? (
                          <Input
                            value={editingCategory.name || ''}
                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                            className="w-full"
                          />
                        ) : (
                          <span className="font-medium">{category.name}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === category.id ? (
                          <Textarea
                            value={editingCategory.description || ''}
                            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                            className="w-full min-h-[60px]"
                            placeholder="Description (optional)"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {category.description || 'No description'}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === category.id ? (
                          <Input
                            value={editingCategory.icon || ''}
                            onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                            placeholder="Icon (optional)"
                          />
                        ) : (
                          <span className="text-sm">{category.icon || 'No icon'}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(category.created_at).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {editingId === category.id ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleUpdate}
                                className="btn-3d h-8 w-8 p-0"
                              >
                                <Save className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                className="btn-3d h-8 w-8 p-0"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(category)}
                                className="btn-3d h-8 w-8 p-0"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(category.id)}
                                className="btn-3d h-8 w-8 p-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessoryCategoryManagement;