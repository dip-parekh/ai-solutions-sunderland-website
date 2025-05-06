
import { Event } from '@/types/database';
import { EventCard } from './EventCard';
import { NoEvents } from './NoEvents';

interface EventListProps {
  events: Event[];
  filter: 'all' | 'upcoming' | 'past';
  searchTerm: string;
}

export const EventList = ({ events, filter, searchTerm }: EventListProps) => {
  if (events.length === 0) {
    return <NoEvents searchTerm={searchTerm} filter={filter} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
