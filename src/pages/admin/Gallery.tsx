
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  Image, Plus, Trash2, Upload 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GalleryImage {
  id: string;
  event_id: string;
  image_url: string;
  caption?: string;
  alt_text?: string;
}

interface Event {
  id: string;
  title: string;
}

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event');
  
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(eventId);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
    if (selectedEvent) {
      fetchImages(selectedEvent);
    } else {
      setIsLoading(false);
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id, title')
        .order('start_date', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setEvents(data || []);
      
      // If there's no selectedEvent but we have events, select the first one
      if (!selectedEvent && data && data.length > 0) {
        setSelectedEvent(data[0].id);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching events",
        description: error.message,
      });
    }
  };

  const fetchImages = async (eventId: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setImages(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching images",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (!selectedEvent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an event first",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `event-images/${selectedEvent}/${fileName}`;
        
        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
          
        const publicUrl = urlData.publicUrl;
        
        // Save image data to database
        const { error: dbError } = await supabase
          .from('gallery_images')
          .insert({
            event_id: selectedEvent,
            image_url: publicUrl,
            alt_text: file.name.split('.')[0]
          });
          
        if (dbError) {
          throw dbError;
        }
      }
      
      // Refresh images
      fetchImages(selectedEvent);
      
      toast({
        title: "Upload successful",
        description: `${files.length} image(s) uploaded successfully`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message,
      });
    } finally {
      setIsUploading(false);
      // Clear the input
      e.target.value = '';
    }
  };

  const toggleImageSelection = (imageId: string) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter(id => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const deleteSelectedImages = async () => {
    if (selectedImages.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedImages.length} selected image(s)?`)) {
      return;
    }
    
    try {
      // Delete from database
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .in('id', selectedImages);
        
      if (error) {
        throw error;
      }
      
      // Refresh images
      fetchImages(selectedEvent!);
      
      // Clear selection
      setSelectedImages([]);
      
      toast({
        title: "Images deleted",
        description: `${selectedImages.length} image(s) have been deleted`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error.message,
      });
    }
  };

  const getEventTitle = () => {
    const event = events.find(e => e.id === selectedEvent);
    return event ? event.title : 'All Events';
  };

  return (
    <AdminLayout title="Image Gallery">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Image Gallery</h1>
            {selectedEvent && (
              <p className="text-gray-500">
                Viewing images for: {getEventTitle()}
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            {selectedImages.length > 0 && (
              <Button variant="destructive" onClick={deleteSelectedImages}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected ({selectedImages.length})
              </Button>
            )}
            
            <Button asChild disabled={!selectedEvent || isUploading}>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={!selectedEvent || isUploading}
                />
                {isUploading ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </>
                )}
              </label>
            </Button>
          </div>
        </div>

        {/* Event Selection */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-wrap gap-2">
            {events.map(event => (
              <Button
                key={event.id}
                variant={selectedEvent === event.id ? 'default' : 'outline'}
                onClick={() => setSelectedEvent(event.id)}
              >
                {event.title}
              </Button>
            ))}
            
            {events.length === 0 && (
              <p className="text-gray-500">No events found. Create an event first to add images.</p>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : selectedEvent ? (
          images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div 
                  key={image.id} 
                  className={`relative group cursor-pointer rounded-lg overflow-hidden ${
                    selectedImages.includes(image.id) ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => toggleImageSelection(image.id)}
                >
                  <img 
                    src={image.image_url} 
                    alt={image.alt_text || 'Gallery image'} 
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                    {selectedImages.includes(image.id) && (
                      <div className="bg-blue-500 rounded-full p-1">
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm truncate">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No images found</h3>
              <p className="text-gray-500 mb-4">
                Upload images to create a gallery for this event
              </p>
              <Button asChild>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Images
                </label>
              </Button>
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No event selected</h3>
            <p className="text-gray-500 mb-4">
              Please select an event to view or add images
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Gallery;
