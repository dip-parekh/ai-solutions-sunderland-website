
import { FormEvent } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EventSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (e: FormEvent) => void;
  filter: 'all' | 'upcoming' | 'past';
  onFilterChange: (filter: 'all' | 'upcoming' | 'past') => void;
}

export const EventSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  onSearch, 
  filter, 
  onFilterChange 
}: EventSearchProps) => {
  return (
    <div className="mb-12 bg-white rounded-lg shadow-sm p-4 md:p-6">
      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-4">
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
          onClick={() => onFilterChange('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'upcoming' ? 'default' : 'outline'}
          onClick={() => onFilterChange('upcoming')}
        >
          Upcoming
        </Button>
        <Button 
          variant={filter === 'past' ? 'default' : 'outline'}
          onClick={() => onFilterChange('past')}
        >
          Past
        </Button>
      </div>
    </div>
  );
};
