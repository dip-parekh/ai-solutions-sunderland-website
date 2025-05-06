
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Event } from '@/types/database';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
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
  );
};
