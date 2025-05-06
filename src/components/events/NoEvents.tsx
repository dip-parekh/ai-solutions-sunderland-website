
import { Calendar } from 'lucide-react';

interface NoEventsProps {
  searchTerm: string;
  filter: string;
}

export const NoEvents = ({ searchTerm, filter }: NoEventsProps) => {
  return (
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
  );
};
