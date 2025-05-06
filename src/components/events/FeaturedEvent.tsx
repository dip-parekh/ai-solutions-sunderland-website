
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Event, GalleryImage } from '@/types/database';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeaturedEventProps {
  event: Event;
  images: GalleryImage[];
}

export const FeaturedEvent = ({ event, images }: FeaturedEventProps) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Featured Event</h2>
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {event.image_url ? (
              <img 
                src={event.image_url} 
                alt={event.title}
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
              <CardTitle className="text-2xl">{event.title}</CardTitle>
              <CardDescription className="text-sm">
                Featured Event
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 pb-6">
              <p className="text-gray-600 mb-6">{event.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span>
                    {format(new Date(event.start_date), 'MMMM d, yyyy')}
                    {event.end_date && event.start_date !== event.end_date && 
                      ` - ${format(new Date(event.end_date), 'MMMM d, yyyy')}`
                    }
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span>
                    {format(new Date(event.start_date), 'h:mm a')}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-0">
              {event.registration_url && (
                <Button asChild>
                  <a 
                    href={event.registration_url} 
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
        
        {images.length > 0 && (
          <div className="p-6 border-t">
            <h4 className="text-lg font-medium mb-4">Event Gallery</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="h-24 rounded overflow-hidden">
                  <img 
                    src={image.image_url} 
                    alt={image.alt_text || event.title} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
