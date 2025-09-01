import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const GalleryManagement = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos((data as GalleryPhoto[]) || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Error",
        description: "Failed to fetch gallery photos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingPhoto) {
        const { error } = await supabase
          .from('gallery_photos')
          .update(formData)
          .eq('id', editingPhoto.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Photo updated successfully"
        });
        setIsEditDialogOpen(false);
      } else {
        const { error } = await supabase
          .from('gallery_photos')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Photo added successfully"
        });
        setIsAddDialogOpen(false);
      }

      resetForm();
      fetchPhotos();
    } catch (error) {
      console.error('Error saving photo:', error);
      toast({
        title: "Error",
        description: "Failed to save photo",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Photo deleted successfully"
      });
      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: ''
    });
    setEditingPhoto(null);
  };

  const openEditDialog = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      description: photo.description || '',
      image_url: photo.image_url
    });
    setIsEditDialogOpen(true);
  };

  if (loading && photos.length === 0) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Gallery Management
              </h1>
              <p className="text-muted-foreground">
                Manage gallery photos
              </p>
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-3d">
                <Plus className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Photo</DialogTitle>
                <DialogDescription>
                  Add a new photo to the gallery by providing a URL
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter photo title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter photo description"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    type="url"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" disabled={loading} className="btn-3d">
                    Add Photo
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="card-3d">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{photos.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="card-3d overflow-hidden">
              <div className="relative">
                <img 
                  src={photo.image_url} 
                  alt={photo.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">{photo.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {photo.description || 'No description'}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(photo)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(photo.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {photos.length === 0 && (
          <Card className="card-3d text-center py-12">
            <CardContent>
              <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No photos yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first gallery photo
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="btn-3d">
                <Plus className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Photo</DialogTitle>
              <DialogDescription>
                Update photo information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter photo title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter photo description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading} className="btn-3d">
                  Update Photo
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GalleryManagement;