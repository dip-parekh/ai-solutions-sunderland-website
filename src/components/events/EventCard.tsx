
import { Event } from '@/types/database';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EventCard = ({ event }: { event: Event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link to={`/events/${event.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="h-48 bg-blue-100 relative">
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
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{event.title}</h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(event.start_date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
