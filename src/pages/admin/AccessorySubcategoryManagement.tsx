import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AccessorySubcategoryManagement = () => {
  const [newSubcategory, setNewSubcategory] = useState({
    category_id: '',
    name: '',
    description: ''
  });

  const handleCreate = async () => {
    if (!newSubcategory.name.trim() || !newSubcategory.category_id) {
      toast({
        title: "Error",
        description: "Subcategory name and category are required",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement database integration when types are updated
    toast({
      title: "Info",
      description: "Database integration pending - types need to be updated",
    });

    setNewSubcategory({ category_id: '', name: '', description: '' });
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
                  <SelectItem value="placeholder">No categories available</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Subcategory name"
                value={newSubcategory.name}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
              />
              <Button onClick={handleCreate} className="btn-3d">
                <Plus className="w-4 h-4 mr-2" />
                Add Subcategory
              </Button>
            </div>
            <Textarea
              placeholder="Description (optional)"
              value={newSubcategory.description}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Subcategories Table */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Subcategories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Database integration pending. Subcategories will appear here once the database types are updated.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessorySubcategoryManagement;