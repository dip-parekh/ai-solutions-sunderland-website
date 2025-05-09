
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ContentTable } from '@/components/admin/ContentTable';
import { ContentForm, FormField } from '@/components/admin/ContentForm';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Event } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const EventsAdmin = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  
  const { 
    items: events, 
    isLoading, 
    fetchItems, 
    createItem, 
    updateItem, 
    deleteItem,
    toggleFeatured
  } = useAdminContent<Event>('events');

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenForm = (event?: Event) => {
    const now = new Date();
    setEditingEvent(event || { 
      start_date: now.toISOString(),
      end_date: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
      is_featured: false
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const handleChange = (name: string, value: any) => {
    setEditingEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingEvent?.id) {
        await updateItem(editingEvent.id, editingEvent);
      } else {
        await createItem(editingEvent as Partial<Event>);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  const formFields: FormField[] = [
    { name: 'title', label: 'Event Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'start_date', label: 'Start Date & Time', type: 'date', required: true },
    { name: 'end_date', label: 'End Date & Time', type: 'date', required: true },
    { name: 'registration_url', label: 'Registration URL', type: 'text' },
    { name: 'image_url', label: 'Event Image', type: 'image' },
    { name: 'is_featured', label: 'Featured Event', type: 'switch' },
  ];

  const headers = ['Title', 'Location', 'Start Date', 'End Date', 'Featured'];

  const getRowContent = (event: Event) => [
    <div className="font-medium">{event.title}</div>,
    event.location,
    format(new Date(event.start_date), 'MMM d, yyyy h:mm a'),
    format(new Date(event.end_date), 'MMM d, yyyy h:mm a'),
    event.is_featured ? 
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Featured</Badge> : 
      '-'
  ];

  return (
    <AdminLayout title="Events">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events & Workshops</h1>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>
      
      <ContentTable
        items={events}
        isLoading={isLoading}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
        onToggleFeatured={toggleFeatured}
        getRowContent={getRowContent}
        headers={headers}
        emptyMessage="No events found. Add your first event to get started!"
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          <ContentForm
            title={editingEvent?.id ? "Edit Event" : "Add New Event"}
            fields={formFields}
            values={editingEvent || {}}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel={editingEvent?.id ? "Update" : "Create"}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default EventsAdmin;
