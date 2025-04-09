
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';

// Mock admin credentials - in a real app, this would be verified against a database
const ADMIN_EMAIL = 'admin@ai-solutions.com';
const ADMIN_PASSWORD = 'admin123';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple mock authentication
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Store in session storage for demo purposes
        // In a real app, this would be a JWT token or similar
        sessionStorage.setItem('adminAuthenticated', 'true');
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard.",
        });
        
        navigate('/admin/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
          <Lock className="text-white" size={24} />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="admin@ai-solutions.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>For demo purposes, use:</p>
          <p>Email: admin@ai-solutions.com</p>
          <p>Password: admin123</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
