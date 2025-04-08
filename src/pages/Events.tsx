
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

const EVENTS = [
  {
    id: 1,
    title: "AI in the Digital Workplace Summit",
    description: "Join industry leaders and AI experts to explore how artificial intelligence is transforming the digital employee experience.",
    date: "May 15-16, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Tech Conference Center, London",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    type: "Conference",
    status: "upcoming",
    attendees: 250,
    galleryImages: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    id: 2,
    title: "AI-Powered Employee Experience Webinar",
    description: "Learn how leading organizations are leveraging AI to enhance employee experiences, boost productivity, and drive engagement.",
    date: "April 25, 2025",
    time: "2:00 PM - 3:30 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    type: "Webinar",
    status: "upcoming",
    attendees: 500,
    galleryImages: [
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    id: 3,
    title: "Future of Work: AI Implementation Workshop",
    description: "A hands-on workshop exploring practical approaches to implementing AI in your workplace, from assessment to deployment.",
    date: "June 8, 2025",
    time: "9:30 AM - 4:30 PM",
    location: "Business Innovation Hub, Manchester",
    image: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    type: "Workshop",
    status: "upcoming",
    attendees: 50,
    galleryImages: [
      "https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    id: 4,
    title: "AI Ethics in the Workplace Panel Discussion",
    description: "Join our expert panel as we discuss the ethical considerations of implementing AI in the workplace and best practices for responsible use.",
    date: "April 18, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "The Innovation Center, Edinburgh",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    type: "Panel Discussion",
    status: "upcoming",
    attendees: 120,
    galleryImages: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    id: 5,
    title: "Digital Employee Experience Summit",
    description: "Our annual summit focused on innovations in the digital employee experience, featuring keynotes, workshops, and networking opportunities.",
    date: "March 10, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Grand Hotel Conference Center, Liverpool",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    type: "Conference",
    status: "past",
    attendees: 350,
    galleryImages: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    id: 6,
    title: "AI for HR Professionals Masterclass",
    description: "A specialized masterclass designed to help HR professionals understand and leverage AI technologies to transform their people processes.",
    date: "February 22, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Business School, Newcastle",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    type: "Workshop",
    status: "past",
    attendees: 75,
    galleryImages: [
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    id: 7,
    title: "Introducing AI-Solutions' New Product Line",
    description: "Join us for the exclusive launch of our new AI product line designed specifically for enhancing digital employee experiences.",
    date: "January 30, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "The Ritz, London",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    type: "Product Launch",
    status: "past",
    attendees: 200,
    galleryImages: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
    ]
  }
];

// Combined images from all events for the gallery
const ALL_GALLERY_IMAGES = EVENTS.reduce((acc, event) => [...acc, ...event.galleryImages], [] as string[]);

const EventCard = ({ event }: { event: typeof EVENTS[0] }) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge 
            className={
              event.status === 'upcoming' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-500 text-white'
            }
          >
            {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            {event.type}
          </Badge>
        </div>
        <h3 className="text-xl font-bold mb-3">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-2" /> {event.date}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-2" /> {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={14} className="mr-2" /> {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users size={14} className="mr-2" /> {event.attendees} attendees
          </div>
        </div>
        
        <div className="flex justify-end">
          <Link 
            to={`#event-detail-${event.id}`} 
            className="text-blue-600 font-medium inline-flex items-center"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(`event-detail-${event.id}`)?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
          >
            {event.status === 'upcoming' ? 'Register' : 'View Details'} <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const EventDetail = ({ event }: { event: typeof EVENTS[0] }) => {
  return (
    <div id={`event-detail-${event.id}`} className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-64 lg:h-auto">
          <img 
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <Badge 
              className={
                event.status === 'upcoming' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-500 text-white'
              }
            >
              {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              {event.type}
            </Badge>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
          <p className="text-gray-600 mb-6">{event.description}</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-gray-500">{event.date}, {event.time}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-500">{event.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Users size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Attendees</p>
                <p className="text-gray-500">{event.attendees} expected</p>
              </div>
            </div>
          </div>
          
          {event.status === 'upcoming' ? (
            <Button asChild className="btn-primary">
              <Link to="/contact">Register for this event</Link>
            </Button>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {event.galleryImages.slice(0, 3).map((image, index) => (
                <div key={index} className="h-20 rounded overflow-hidden">
                  <img 
                    src={image}
                    alt={`Event photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PhotoGallery = ({ images }: { images: string[] }) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="aspect-square rounded-lg overflow-hidden cursor-pointer card-hover"
            onClick={() => setExpandedImage(image)}
          >
            <img 
              src={image}
              alt={`Event gallery photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="max-w-4xl max-h-screen p-2 relative">
            <button 
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center"
              onClick={() => setExpandedImage(null)}
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={expandedImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] mx-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};

const Events = () => {
  const [filter, setFilter] = useState("all");
  
  // Filter events by type
  const upcomingEvents = EVENTS.filter(event => event.status === 'upcoming');
  const pastEvents = EVENTS.filter(event => event.status === 'past');
  const filteredEvents = filter === "all" 
    ? EVENTS 
    : filter === "upcoming" 
      ? upcomingEvents 
      : pastEvents;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="container-custom text-center">
          <h1 className="heading-xl text-white mb-6">Events & Gallery</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Join us at our upcoming events or browse photos from our past gatherings to 
            see how AI-Solutions is connecting with the community.
          </p>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Our Events</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We regularly host events to share knowledge, showcase innovations, and 
              connect with the community of AI professionals and business leaders.
            </p>
          </div>
          
          {/* Event Filters */}
          <div className="mb-12">
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          {/* Featured Event */}
          {filter !== 'past' && upcomingEvents.length > 0 && (
            <EventDetail event={upcomingEvents[0]} />
          )}
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">No events found</h3>
              <p className="text-gray-600">Check back later or view past events</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Event Details Section */}
      <section id="event-details" className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Event Details</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Learn more about our upcoming and past events
            </p>
          </div>
          
          {filteredEvents.map(event => (
            <EventDetail key={event.id} event={event} />
          ))}
        </div>
      </section>
      
      {/* Photo Gallery Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Event Photo Gallery</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Browse photos from our past events and conferences
            </p>
          </div>
          
          <PhotoGallery images={ALL_GALLERY_IMAGES} />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Want to Stay Updated on Our Events?</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            Subscribe to our newsletter to receive notifications about upcoming events and early registration opportunities.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link to="/contact">Subscribe Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
