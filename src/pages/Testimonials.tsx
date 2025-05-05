
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  quote: string;
  rating: number;
  image_url?: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
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
      toast({
        variant: "destructive",
        title: "Error fetching testimonials",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
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
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover what our clients say about their experiences working with AI-Solutions.
          We take pride in delivering exceptional results that exceed expectations.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {testimonial.image_url ? (
                    <img 
                      src={testimonial.image_url} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover mr-4" 
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 text-xl font-bold">{testimonial.name.substring(0, 1)}</span>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No testimonials available yet</h3>
            <p className="text-gray-600">Check back soon to see what our clients are saying!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Testimonials;
