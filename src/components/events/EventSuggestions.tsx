
import { useEffect, useState } from 'react';
import { Event } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface EventSuggestionsProps {
  currentEventId?: string;
}

export const EventSuggestions = ({ currentEventId }: EventSuggestionsProps) => {
  const [suggestedEvents, setSuggestedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedEvents = async () => {
      setIsLoading(true);
      try {
        // Get user interests from localStorage (simplified approach)
        // In a real app, this would come from a user profile or be tracked server-side
        const viewedEventIds = JSON.parse(localStorage.getItem('viewedEvents') || '[]');
        
        // Fetch events not already viewed by the user and not the current event
        let query = supabase.from('events')
          .select('*')
          .order('start_date', { ascending: true })
          .limit(3);
        
        // Exclude current event if provided
        if (currentEventId) {
          query = query.neq('id', currentEventId);
        }
        
        // Exclude already viewed events if there are any
        if (viewedEventIds.length > 0) {
          query = query.not('id', 'in', `(${viewedEventIds.join(',')})`);
        }
          
        const { data, error } = await query;
        
        if (error) throw error;
        
        setSuggestedEvents(data || []);
      } catch (error) {
        console.error('Error fetching suggested events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestedEvents();
  }, [currentEventId]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">You Might Also Be Interested In</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-gray-100"></CardHeader>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-100 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (suggestedEvents.length === 0) {
    return null;
  }

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">You Might Also Be Interested In</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestedEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <Link to={`/events/${event.id}`}>
              <div className="h-40 bg-blue-100 relative">
                {event.image_url ? (
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Calendar className="h-12 w-12 text-blue-500" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                  {new Date(event.start_date) > new Date() ? 'Upcoming' : 'Past'}
                </div>
              </div>
            </Link>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2 line-clamp-1">
                <Link to={`/events/${event.id}`} className="hover:text-blue-600 transition-colors">
                  {event.title}
                </Link>
              </CardTitle>
              <CardDescription className="mb-3 line-clamp-2">
                {event.description}
              </CardDescription>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(event.start_date)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
