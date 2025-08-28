import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AccessorySubcategoryManagement = () => {
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSubcategory, setNewSubcategory] = useState({
    category_id: '',
    name: '',
    description: '',
    image_url: ''
  });
  const [editingSubcategory, setEditingSubcategory] = useState({
    category_id: '',
    name: '',
    description: '',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('accessory_subcategories')
        .select(`
          *,
          accessory_categories(name, id)
        `);
      
      if (error) throw error;
      setSubcategories(data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subcategories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('accessory_categories')
        .select('*');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
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
    if (!newSubcategory.name.trim() || !newSubcategory.category_id) {
      toast({
        title: "Error",
        description: "Subcategory name and category are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let imageUrl = newSubcategory.image_url;
      
      if (imageFile) {
        const fileName = `subcategory-${Date.now()}-${imageFile.name}`;
        imageUrl = await uploadImage(imageFile, fileName);
      }

      const { error } = await supabase
        .from('accessory_subcategories')
        .insert([{
          name: newSubcategory.name,
          description: newSubcategory.description,
          category_id: newSubcategory.category_id,
          image_url: imageUrl
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subcategory created successfully",
      });

      setNewSubcategory({ category_id: '', name: '', description: '', image_url: '' });
      setImageFile(null);
      fetchSubcategories();
    } catch (error) {
      console.error('Error creating subcategory:', error);
      toast({
        title: "Error",
        description: "Failed to create subcategory",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    if (!editingSubcategory.name.trim() || !editingSubcategory.category_id) {
      toast({
        title: "Error",
        description: "Subcategory name and category are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let imageUrl = editingSubcategory.image_url;
      
      if (editImageFile) {
        const fileName = `subcategory-${Date.now()}-${editImageFile.name}`;
        imageUrl = await uploadImage(editImageFile, fileName);
      }

      const { error } = await supabase
        .from('accessory_subcategories')
        .update({
          name: editingSubcategory.name,
          description: editingSubcategory.description,
          category_id: editingSubcategory.category_id,
          image_url: imageUrl
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subcategory updated successfully",
      });

      setEditingId(null);
      setEditImageFile(null);
      fetchSubcategories();
    } catch (error) {
      console.error('Error updating subcategory:', error);
      toast({
        title: "Error",
        description: "Failed to update subcategory",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('accessory_subcategories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Subcategory deleted successfully",
      });

      fetchSubcategories();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      toast({
        title: "Error",
        description: "Failed to delete subcategory",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (subcategory: any) => {
    setEditingId(subcategory.id);
    setEditingSubcategory({
      category_id: subcategory.category_id,
      name: subcategory.name,
      description: subcategory.description || '',
      image_url: subcategory.image_url || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditImageFile(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Accessory Subcategories</h1>
        </div>

        {/* Create New Subcategory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add New Subcategory</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                value={newSubcategory.category_id}
                onValueChange={(value) => setNewSubcategory({ ...newSubcategory, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Subcategory name"
                value={newSubcategory.name}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="file"
                  id="new-image"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('new-image')?.click()}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {imageFile ? 'Change Image' : 'Upload Image'}
                </Button>
                <Button onClick={handleCreate} disabled={loading} className="btn-3d">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Description (optional)"
                value={newSubcategory.description}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
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

        {/* Subcategories Table */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Subcategories ({subcategories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading subcategories...</div>
            ) : subcategories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No subcategories found. Create your first subcategory above.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {subcategories.map((subcategory) => (
                  <div key={subcategory.id} className="border rounded-lg p-4">
                    {editingId === subcategory.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Select
                            value={editingSubcategory.category_id}
                            onValueChange={(value) => setEditingSubcategory({ ...editingSubcategory, category_id: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            value={editingSubcategory.name}
                            onChange={(e) => setEditingSubcategory({ ...editingSubcategory, name: e.target.value })}
                            placeholder="Subcategory name"
                          />
                        </div>
                        <Textarea
                          value={editingSubcategory.description}
                          onChange={(e) => setEditingSubcategory({ ...editingSubcategory, description: e.target.value })}
                          placeholder="Description"
                          rows={2}
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            id={`edit-image-${subcategory.id}`}
                            accept="image/*"
                            onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById(`edit-image-${subcategory.id}`)?.click()}
                          >
                            <Upload className="w-3 h-3 mr-1" />
                            {editImageFile ? 'Change' : subcategory.image_url ? 'Update' : 'Add'} Image
                          </Button>
                          {editImageFile && (
                            <span className="text-xs text-muted-foreground">{editImageFile.name}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(subcategory.id)}
                            disabled={loading}
                            size="sm"
                            className="btn-3d"
                          >
                            Save Changes
                          </Button>
                          <Button
                            onClick={cancelEdit}
                            variant="outline"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {subcategory.image_url && (
                            <img
                              src={subcategory.image_url}
                              alt={subcategory.name}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                          )}
                          <div>
                            <h3 className="font-medium">{subcategory.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Category: {subcategory.accessory_categories?.name}
                            </p>
                            {subcategory.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {subcategory.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => startEdit(subcategory)}
                            variant="outline"
                            size="sm"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(subcategory.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessorySubcategoryManagement;