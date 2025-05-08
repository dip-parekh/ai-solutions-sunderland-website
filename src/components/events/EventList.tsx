
import { Event } from '@/types/database';
import { EventCard } from './EventCard';
import { NoEvents } from './NoEvents';
import { useEffect } from 'react';
import { EventSuggestions } from './EventSuggestions';

interface EventListProps {
  events: Event[];
  filter: 'all' | 'upcoming' | 'past';
  searchTerm: string;
}

export const EventList = ({ events, filter, searchTerm }: EventListProps) => {
  // Track viewed events for AI suggestions
  useEffect(() => {
    if (events.length > 0) {
      // Get current event IDs
      const currentEventIds = events.map(event => event.id);
      
      // Get previously viewed events from localStorage
      const viewedEvents = JSON.parse(localStorage.getItem('viewedEvents') || '[]');
      
      // Add current events to viewed events (without duplicates)
      const updatedViewedEvents = Array.from(new Set([...viewedEvents, ...currentEventIds]));
      
      // Store back to localStorage (limit to last 20 to prevent excessive storage)
      localStorage.setItem('viewedEvents', JSON.stringify(updatedViewedEvents.slice(-20)));
    }
  }, [events]);

  if (events.length === 0) {
    return <NoEvents searchTerm={searchTerm} filter={filter} />;
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      
      {/* Show event suggestions based on user's viewing history */}
      <EventSuggestions />
    </div>
  );
};
