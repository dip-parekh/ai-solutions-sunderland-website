
import Layout from '@/components/Layout';
import { EventSearch } from '@/components/events/EventSearch';
import { EventList } from '@/components/events/EventList';
import { EventPagination } from '@/components/events/EventPagination';
import { EventsLoader } from '@/components/events/EventsLoader';
import { FeaturedEvent } from '@/components/events/FeaturedEvent';
import { EventSuggestions } from '@/components/events/EventSuggestions';
import { useEvents } from '@/hooks/useEvents';

const Events = () => {
  const {
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
    shouldShowFeaturedEvent
  } = useEvents();

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-6">Events & Workshops</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Join us for our upcoming events, workshops, and conferences where we share insights about the latest technologies and trends in AI solutions.
        </p>
        
        {/* Search and Filter */}
        <EventSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          filter={filter}
          onFilterChange={handleFilterChange}
        />
        
        {isLoading ? (
          <EventsLoader />
        ) : (
          <>
            {/* Featured Event */}
            {shouldShowFeaturedEvent && featuredEvent && (
              <FeaturedEvent event={featuredEvent} images={featuredEventImages} />
            )}
            
            {/* Events Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {filter === 'all' ? 'All Events' : filter === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
              </h2>
              
              <EventList 
                events={events}
                filter={filter}
                searchTerm={searchTerm}
              />
              
              {/* AI Event Suggestions */}
              {events.length > 0 && !searchTerm && (
                <div className="mt-16">
                  <EventSuggestions />
                </div>
              )}
              
              {/* Pagination */}
              <EventPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Events;
