
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Event, GalleryImage } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { EventSuggestions } from '@/components/events/EventSuggestions';
import { EventsLoader } from '@/components/events/EventsLoader';
import { useToast } from '@/hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    setIsLoading(true);
    try {
      // Fetch event details
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();
        
      if (eventError) throw eventError;
      
      // Fetch event images
      const { data: imageData, error: imageError } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('event_id', eventId);
        
      if (imageError) throw imageError;
      
      setEvent(eventData);
      setImages(imageData || []);
      
      // Track this event view for AI suggestions
      trackEventView(eventId);
    } catch (error: any) {
      console.error('Error fetching event details:', error);
      toast({
        variant: "destructive",
        title: "Error loading event",
        description: "Could not load event details. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Track event views for AI suggestions
  const trackEventView = (eventId: string) => {
    const viewedEvents = JSON.parse(localStorage.getItem('viewedEvents') || '[]');
    if (!viewedEvents.includes(eventId)) {
      const updatedViewedEvents = [...viewedEvents, eventId];
      localStorage.setItem('viewedEvents', JSON.stringify(updatedViewedEvents.slice(-20)));
    }
  };

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startDay = start.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endDay = end.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (startDay === endDay) {
      return `${startDay}, ${startTime} - ${endTime}`;
    } else {
      return `${startDay}, ${startTime} - ${endDay}, ${endTime}`;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <EventsLoader />
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/events">Back to Events</a>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        {/* Event Header */}
        <div className="mb-10">
          <div className="mb-6 flex flex-wrap justify-between items-start gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
            {event.registration_url && (
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                  Register Now <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Event Image */}
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                {event.image_url ? (
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                    <Calendar className="h-20 w-20 text-blue-500" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Event Info */}
            <div className="md:w-1/2 space-y-5">
              <div className="p-4 border bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3 mb-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Date & Time</h3>
                    <p>{formatDateRange(event.start_date, event.end_date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p>{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Event Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      new Date(event.start_date) > new Date() 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {new Date(event.start_date) > new Date() ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">About This Event</h3>
                <p className="text-gray-700">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Gallery */}
        {images.length > 0 && (
          <div className="my-10">
            <h2 className="text-2xl font-bold mb-6">Event Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={image.image_url} 
                    alt={image.caption || event.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* AI Powered Suggestions */}
        <div className="my-16">
          <EventSuggestions currentEventId={id} />
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
