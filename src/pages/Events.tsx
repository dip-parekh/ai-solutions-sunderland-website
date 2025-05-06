
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Event, GalleryImage } from '@/types/database';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [featuredEventImages, setFeaturedEventImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      // Fetch all events
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setEvents(data);
        
        // Find a featured event (either marked as featured or the next upcoming one)
        const featuredEvents = data.filter(event => event.is_featured);
        const selectedFeatured = featuredEvents.length > 0 
          ? featuredEvents[0] 
          : data.find(event => new Date(event.start_date) >= new Date()) || data[0];
        
        setFeaturedEvent(selectedFeatured);
        
        // Fetch images for the featured event
        if (selectedFeatured) {
          const { data: imageData, error: imageError } = await supabase
            .from('gallery_images')
            .select('*')
            .eq('event_id', selectedFeatured.id)
            .limit(4);
          
          if (imageError) throw imageError;
          
          setFeaturedEventImages(imageData || []);
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching events",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Events & Workshops</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Featured Event */}
            {featuredEvent && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Featured Event</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      {featuredEvent.image_url ? (
                        <img 
                          src={featuredEvent.image_url} 
                          alt={featuredEvent.title}
                          className="w-full h-64 md:h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-64 md:h-full bg-blue-100 flex items-center justify-center">
                          <Calendar className="h-16 w-16 text-blue-600" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 md:w-1/2">
                      <h3 className="text-2xl font-bold mb-3">{featuredEvent.title}</h3>
                      <p className="text-gray-600 mb-6">{featuredEvent.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                          <span>
                            {format(new Date(featuredEvent.start_date), 'MMMM d, yyyy')}
                            {featuredEvent.end_date && featuredEvent.start_date !== featuredEvent.end_date && 
                              ` - ${format(new Date(featuredEvent.end_date), 'MMMM d, yyyy')}`
                            }
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-blue-600 mr-2" />
                          <span>
                            {format(new Date(featuredEvent.start_date), 'h:mm a')}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                          <span>{featuredEvent.location}</span>
                        </div>
                      </div>
                      
                      {featuredEvent.registration_url && (
                        <a 
                          href={featuredEvent.registration_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Register Now
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {featuredEventImages.length > 0 && (
                    <div className="p-6 border-t">
                      <h4 className="text-lg font-medium mb-4">Event Gallery</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {featuredEventImages.map((image) => (
                          <div key={image.id} className="h-24 rounded overflow-hidden">
                            <img 
                              src={image.image_url} 
                              alt={image.alt_text || featuredEvent.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Upcoming Events */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
              
              {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 overflow-hidden">
                        {event.image_url ? (
                          <img 
                            src={event.image_url} 
                            alt={event.title} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                            <Calendar className="h-10 w-10 text-blue-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                            <span>
                              {format(new Date(event.start_date), 'MMMM d, yyyy')}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 text-blue-600 mr-2" />
                            <span>
                              {format(new Date(event.start_date), 'h:mm a')}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <button className="text-blue-600 font-medium hover:underline">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No upcoming events</h3>
                  <p className="text-gray-600">Check back soon for our upcoming events!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Events;
