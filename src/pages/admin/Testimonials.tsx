
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ContentTable } from '@/components/admin/ContentTable';
import { ContentForm, FormField } from '@/components/admin/ContentForm';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Testimonial } from '@/types/database';
import { Badge } from '@/components/ui/badge';

const TestimonialsAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  
  const { 
    items: testimonials, 
    isLoading, 
    fetchItems, 
    createItem, 
    updateItem, 
    deleteItem, 
    toggleFeatured 
  } = useAdminContent<Testimonial>('testimonials');

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenForm = (testimonial?: Testimonial) => {
    setEditingTestimonial(testimonial || {});
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTestimonial(null);
  };

  const handleChange = (name: string, value: any) => {
    setEditingTestimonial(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingTestimonial?.id) {
        await updateItem(editingTestimonial.id, editingTestimonial);
      } else {
        await createItem(editingTestimonial as Partial<Testimonial>);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  const formFields: FormField[] = [
    { name: 'name', label: 'Client Name', type: 'text', required: true },
    { name: 'position', label: 'Position', type: 'text' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'quote', label: 'Testimonial Quote', type: 'textarea', required: true },
    { name: 'rating', label: 'Rating (1-5)', type: 'text' },
    { name: 'image_url', label: 'Client Photo', type: 'image' },
    { name: 'is_featured', label: 'Featured', type: 'switch' },
  ];

  const headers = ['Name', 'Company', 'Quote', 'Rating', 'Featured'];

  const getRowContent = (testimonial: Testimonial) => [
    <div className="font-medium">{testimonial.name}</div>,
    testimonial.company || '-',
    <div className="line-clamp-2">{testimonial.quote}</div>,
    testimonial.rating ? `★`.repeat(testimonial.rating) : '-',
    testimonial.is_featured ? 
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Featured</Badge> : 
      '-'
  ];

  return (
    <AdminLayout title="Testimonials">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>
      
      <ContentTable
        items={testimonials}
        isLoading={isLoading}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
        onToggleFeatured={toggleFeatured}
        getRowContent={getRowContent}
        headers={headers}
        emptyMessage="No testimonials found. Add your first testimonial to get started!"
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          <ContentForm
            title={editingTestimonial?.id ? "Edit Testimonial" : "Add New Testimonial"}
            fields={formFields}
            values={editingTestimonial || {}}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel={editingTestimonial?.id ? "Update" : "Create"}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default TestimonialsAdmin;
