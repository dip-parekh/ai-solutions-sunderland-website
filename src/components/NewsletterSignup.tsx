
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const NewsletterSignup = ({ className = "" }: { className?: string }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thanks for subscribing!",
        description: "You'll receive our newsletter updates soon.",
      });
      
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className={`bg-blue-50 p-8 rounded-lg ${className}`}>
      <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
      <p className="text-gray-600 mb-6">
        Get the latest AI insights, industry news, and company updates delivered to your inbox.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : (
            <>
              Subscribe <Send size={16} className="ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
