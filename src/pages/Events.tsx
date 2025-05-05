
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Image, MapPin } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  image_url?: string;
  registration_url?: string;
}

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    
    try {
      const now = new Date().toISOString();
      
      // Fetch upcoming events
      const { data: upcomingData, error: upcomingError } = await supabase
        .from('events')
        .select('*')
        .gte('start_date', now)
        .order('start_date', { ascending: true });
        
      if (upcomingError) {
        throw upcomingError;
      }
      
      // Fetch past events
      const { data: pastData, error: pastError } = await supabase
        .from('events')
        .select('*')
        .lt('start_date', now)
        .order('start_date', { ascending: false })
        .limit(6);
        
      if (pastError) {
        throw pastError;
      }
      
      setUpcomingEvents(upcomingData || []);
      setPastEvents(pastData || []);
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

  // Function to format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString()} • ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
  };

  // Function to fetch images for an event
  const [eventImages, setEventImages] = useState<{ [key: string]: { url: string }[] }>({});
  
  const fetchEventImages = async (eventId: string) => {
    if (eventImages[eventId]) return; // Already fetched
    
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('image_url')
        .eq('event_id', eventId)
        .limit(6);
        
      if (error) {
        throw error;
      }
      
      setEventImages(prev => ({
        ...prev,
        [eventId]: data?.map(item => ({ url: item.image_url })) || []
      }));
    } catch (error) {
      console.error('Error fetching event images:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Events</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Join us at our upcoming events to learn more about AI-Solutions and how we can help transform your business.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Upcoming Events */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
              
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        {event.image_url ? (
                          <img 
                            src={event.image_url} 
                            alt={event.title} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                            <Calendar className="h-16 w-16 text-blue-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatDateRange(event.start_date, event.end_date)}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                        
                        {event.registration_url && (
                          <a
                            href={event.registration_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                          >
                            Register Now
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No upcoming events</h3>
                  <p className="text-gray-600">Check back soon for our upcoming events!</p>
                </div>
              )}
            </div>
            
            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Past Events</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {pastEvents.map((event) => {
                    // Fetch images when this event is rendered
                    if (!eventImages[event.id]) {
                      fetchEventImages(event.id);
                    }
                    
                    return (
                      <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{formatDateRange(event.start_date, event.end_date)}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{event.location}</span>
                          </div>
                          
                          <p className="text-gray-700 mb-4">{event.description}</p>
                          
                          {/* Event photos gallery */}
                          {eventImages[event.id] && eventImages[event.id].length > 0 ? (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                <Image className="h-4 w-4 mr-2" />
                                Event Photos
                              </h4>
                              
                              <div className="grid grid-cols-3 gap-2">
                                {eventImages[event.id].slice(0, 6).map((image, idx) => (
                                  <div key={idx} className="aspect-square overflow-hidden rounded">
                                    <img 
                                      src={image.url} 
                                      alt={`${event.title} photo ${idx+1}`} 
                                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                                    />
                                  </div>
                                ))}
                              </div>
                              
                              {eventImages[event.id].length > 6 && (
                                <button className="text-blue-600 text-sm font-medium hover:underline mt-2">
                                  View all photos
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Image className="h-4 w-4 mr-2" />
                              No photos available
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Events;
