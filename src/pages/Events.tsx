
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Event, GalleryImage } from '@/types/database';
import { Calendar, MapPin, Clock, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Events = () => {
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

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-6">Events & Workshops</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Join us for our upcoming events, workshops, and conferences where we share insights about the latest technologies and trends in AI solutions.
        </p>
        
        {/* Search and Filter */}
        <div className="mb-12 bg-white rounded-lg shadow-sm p-4 md:p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events by title, description or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'upcoming' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('upcoming')}
            >
              Upcoming
            </Button>
            <Button 
              variant={filter === 'past' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('past')}
            >
              Past
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Featured Event */}
            {featuredEvent && !searchTerm && filter === 'all' && page === 1 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Featured Event</h2>
                <Card className="overflow-hidden">
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
                      <CardHeader className="p-0 pb-4">
                        <CardTitle className="text-2xl">{featuredEvent.title}</CardTitle>
                        <CardDescription className="text-sm">
                          Featured Event
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-0 pb-6">
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
                      </CardContent>
                      
                      <CardFooter className="p-0">
                        {featuredEvent.registration_url && (
                          <Button asChild>
                            <a 
                              href={featuredEvent.registration_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              Register Now <ChevronRight className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </CardFooter>
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
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}
            
            {/* Events Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {filter === 'all' ? 'All Events' : filter === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
              </h2>
              
              {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 overflow-hidden">
                        {event.image_url ? (
                          <img 
                            src={event.image_url} 
                            alt={event.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                            <Calendar className="h-10 w-10 text-blue-600" />
                          </div>
                        )}
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription>
                          {new Date(event.start_date) > new Date() ? 'Upcoming Event' : 'Past Event'}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
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
                        
                        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                      </CardContent>
                      
                      <CardFooter>
                        {event.registration_url ? (
                          <Button variant="outline" className="w-full" asChild>
                            <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                              View Details
                            </a>
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {searchTerm ? 'No events found matching your search' : `No ${filter !== 'all' ? filter : ''} events found`}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm 
                      ? 'Try using different keywords or removing filters' 
                      : 'Check back soon for our upcoming events!'}
                  </p>
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                        className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      // Show first page, current page, last page, and one page before and after current page
                      if (
                        pageNum === 1 || 
                        pageNum === totalPages || 
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink 
                              isActive={pageNum === page}
                              onClick={() => setPage(pageNum)}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        (pageNum === 2 && page > 3) || 
                        (pageNum === totalPages - 1 && page < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                        className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Events;
