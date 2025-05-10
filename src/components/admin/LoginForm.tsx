
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Create default admin user if it doesn't exist
    const createDefaultAdmin = async () => {
      try {
        // Check if admin user exists
        const { data: adminUser, error: fetchError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', 'admin@example.com')
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means "no rows returned"
          console.error('Error checking for admin user:', fetchError);
          return;
        }

        if (!adminUser) {
          console.log('Creating default admin user...');
          // Create admin user in auth
          const { error: signupError } = await supabase.auth.signUp({
            email: 'admin@example.com',
            password: 'admin',
          });

          if (signupError) {
            console.error('Error creating admin user:', signupError);
          }
        }
      } catch (error) {
        console.error('Error in createDefaultAdmin:', error);
      }
    };

    createDefaultAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Handle default admin login
    const loginEmail = email === 'admin' ? 'admin@example.com' : email;

    try {
      // Attempt to sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        // Set session storage for quicker checks
        sessionStorage.setItem('adminAuthenticated', 'true');
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard.",
        });
        
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || 'Invalid credentials',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the admin dashboard
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email / Username</Label>
            <Input
              id="email"
              type="text"
              placeholder="admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
