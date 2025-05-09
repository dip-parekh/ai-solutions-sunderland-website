
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Image } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ContentForm, FormField } from '@/components/admin/ContentForm';
import { useAdminContent } from '@/hooks/useAdminContent';
import { GalleryImage, Event } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';

const Gallery = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<Partial<GalleryImage> | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  
  const { 
    items: images, 
    isLoading, 
    fetchItems, 
    createItem, 
    updateItem, 
    deleteItem 
  } = useAdminContent<GalleryImage>('gallery_images');

  useEffect(() => {
    fetchItems();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await supabase
        .from('events')
        .select('id, title')
        .order('start_date', { ascending: false });
      
      if (data) {
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleOpenForm = (image?: GalleryImage) => {
    setEditingImage(image || {});
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingImage(null);
  };

  const handleChange = (name: string, value: any) => {
    setEditingImage(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingImage?.id) {
        await updateItem(editingImage.id, editingImage);
      } else {
        await createItem(editingImage as Partial<GalleryImage>);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  const formFields: FormField[] = [
    { name: 'image_url', label: 'Image', type: 'image', required: true },
    { name: 'caption', label: 'Caption', type: 'text' },
    { name: 'alt_text', label: 'Alt Text', type: 'text' },
    // Here you would add a dropdown for event_id, but our simple form doesn't support dropdowns yet
  ];

  return (
    <AdminLayout title="Gallery">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Add Image
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(image => (
            <div key={image.id} className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
              {image.image_url ? (
                <img 
                  src={image.image_url} 
                  alt={image.alt_text || 'Gallery image'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Image className="w-10 h-10 text-gray-400" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-3 transition-opacity duration-200">
                <div className="text-white text-sm">{image.caption}</div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:bg-white hover:bg-opacity-20"
                    onClick={() => handleOpenForm(image)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(image.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by uploading a new image.</p>
          <div className="mt-6">
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" /> Add Image
            </Button>
          </div>
        </div>
      )}
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md">
          <ContentForm
            title={editingImage?.id ? "Edit Image" : "Add New Image"}
            fields={formFields}
            values={editingImage || {}}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel={editingImage?.id ? "Update" : "Create"}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Gallery;
