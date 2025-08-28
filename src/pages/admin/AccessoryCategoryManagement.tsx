import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AccessoryCategoryManagement = () => {
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon_name: ''
  });

  const handleCreate = async () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement database integration when types are updated
    toast({
      title: "Info",
      description: "Database integration pending - types need to be updated",
    });

    setNewCategory({ name: '', description: '', icon_name: '' });
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <Input
                placeholder="Icon name (optional)"
                value={newCategory.icon_name}
                onChange={(e) => setNewCategory({ ...newCategory, icon_name: e.target.value })}
              />
              <Button onClick={handleCreate} className="btn-3d">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
            <Textarea
              placeholder="Description (optional)"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Database integration pending. Categories will appear here once the database types are updated.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessoryCategoryManagement;