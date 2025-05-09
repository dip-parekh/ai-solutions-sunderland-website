
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Testimonial } from '@/types/database';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
    
    // Set up real-time listener for testimonials changes
    const channel = supabase.channel('public-testimonials')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'testimonials'
      }, () => {
        fetchTestimonials();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setTestimonials(data || []);
    } catch (error: any) {
      console.error('Error fetching testimonials:', error);
      toast({
        variant: "destructive",
        title: "Error fetching testimonials",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Client Testimonials</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say about our AI solutions.
        </p>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <Skeleton key={starIndex} className="h-5 w-5 mr-1" />
                  ))}
                </div>
                <Skeleton className="h-24 w-full mb-6" />
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className={`bg-white p-6 rounded-lg shadow-md ${testimonial.is_featured ? 'border-2 border-blue-500' : ''}`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex">{renderStars(testimonial.rating)}</div>
                  
                  <blockquote className="text-gray-700 mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    {testimonial.image_url ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image_url} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold">
                          {testimonial.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      {(testimonial.position || testimonial.company) && (
                        <div className="text-sm text-gray-500">
                          {testimonial.position && <span>{testimonial.position}</span>}
                          {testimonial.position && testimonial.company && <span>, </span>}
                          {testimonial.company && <span>{testimonial.company}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No testimonials available yet</h3>
            <p className="text-gray-600">Check back soon to hear from our satisfied clients!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Testimonials;
