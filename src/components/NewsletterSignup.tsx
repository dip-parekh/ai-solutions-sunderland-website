
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      console.log('Newsletter signup:', email);
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-blue-50 rounded-lg p-8 shadow-sm">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-600 p-3 rounded-full">
          <Mail className="h-6 w-6 text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-center mb-2">Subscribe to Our Newsletter</h3>
      <p className="text-gray-600 text-center mb-6">
        Stay updated with the latest in AI technology and receive exclusive insights.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterSignup;
