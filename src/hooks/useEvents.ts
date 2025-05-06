
import { useState, useEffect } from 'react';
import { Event, GalleryImage } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [featuredEventImages, setFeaturedEventImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [page, setPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const eventsPerPage = 6;
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, [page, filter]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      // Calculate offset for pagination
      const offset = (page - 1) * eventsPerPage;
      
      // Get current date
      const now = new Date().toISOString();
      
      // Build query based on filter
      let query = supabase
        .from('events')
        .select('*', { count: 'exact' });
      
      if (filter === 'upcoming') {
        query = query.gte('start_date', now);
      } else if (filter === 'past') {
        query = query.lt('start_date', now);
      }
      
      // Add search term if provided
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
      }
      
      // Add pagination
      query = query.order('start_date', { ascending: filter !== 'past' })
                  .range(offset, offset + eventsPerPage - 1);
      
      // Execute query
      const { data, error, count } = await query;
      
      if (error) throw error;
      
      // Update state with results
      setEvents(data || []);
      if (count !== null) {
        setTotalEvents(count);
      }
      
      // Handle featured event logic (separate query for better performance)
      if (page === 1 && filter === 'all' && !searchTerm) {
        const { data: featuredData } = await supabase
          .from('events')
          .select('*')
          .eq('is_featured', true)
          .order('start_date', { ascending: true })
          .limit(1);
        
        // If no featured event, use the next upcoming one
        if (featuredData && featuredData.length > 0) {
          setFeaturedEvent(featuredData[0]);
          fetchFeaturedEventImages(featuredData[0].id);
        } else {
          const { data: upcomingData } = await supabase
            .from('events')
            .select('*')
            .gte('start_date', now)
            .order('start_date', { ascending: true })
            .limit(1);
          
          if (upcomingData && upcomingData.length > 0) {
            setFeaturedEvent(upcomingData[0]);
            fetchFeaturedEventImages(upcomingData[0].id);
          } else if (data && data.length > 0) {
            setFeaturedEvent(data[0]);
            fetchFeaturedEventImages(data[0].id);
          }
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

  const fetchFeaturedEventImages = async (eventId: string) => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('event_id', eventId)
        .limit(4);
      
      if (error) throw error;
      setFeaturedEventImages(data || []);
    } catch (error: any) {
      console.error('Error fetching event images:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page
    fetchEvents();
  };

  const handleFilterChange = (newFilter: 'all' | 'upcoming' | 'past') => {
    setFilter(newFilter);
    setPage(1); // Reset to first page
  };

  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  return {
    events,
    featuredEvent,
    featuredEventImages,
    isLoading,
    searchTerm,
    setSearchTerm,
    filter,
    page,
    totalPages,
    setPage,
    handleSearch,
    handleFilterChange,
    shouldShowFeaturedEvent: page === 1 && filter === 'all' && !searchTerm && featuredEvent !== null
  };
};
