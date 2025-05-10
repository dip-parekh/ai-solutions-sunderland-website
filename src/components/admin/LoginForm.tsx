
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

  // Default admin credentials for easier reference
  const defaultAdminEmail = 'admin@example.com';
  const defaultAdminPassword = 'admin123'; // Changed to meet 6-character minimum

  useEffect(() => {
    // Create default admin user if it doesn't exist
    const createDefaultAdmin = async () => {
      try {
        // Check if the default admin exists in auth system
        const { data, error } = await supabase.auth.signUp({
          email: defaultAdminEmail,
          password: defaultAdminPassword,
        });

        if (!error || error.message.includes('already registered')) {
          // Either successfully created or already exists
          console.log('Default admin user available');
        } else {
          console.error('Error creating admin user:', error);
          toast({
            variant: "destructive",
            title: "Setup Error",
            description: "Could not create default admin user. Please try again later.",
          });
        }
        
        // Ensure admin exists in admin_users table as well (in case trigger didn't work)
        if (!error || error.message.includes('already registered')) {
          // Try to get user ID
          const { data: authData } = await supabase.auth.getSession();
          const userId = authData?.session?.user?.id;
          
          if (userId) {
            // Check if user exists in admin_users table
            const { data: adminUserData, error: fetchError } = await supabase
              .from('admin_users')
              .select('*')
              .eq('email', defaultAdminEmail)
              .maybeSingle();
              
            if (!adminUserData && (!fetchError || fetchError.code === 'PGRST116')) {
              // Add user to admin_users table manually if not exists
              const { error: insertError } = await supabase
                .from('admin_users')
                .insert({
                  id: userId,
                  email: defaultAdminEmail,
                  is_super_admin: true
                });
                
              if (insertError) {
                console.error('Error adding user to admin_users table:', insertError);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error in createDefaultAdmin:', error);
      }
    };

    createDefaultAdmin();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Handle default admin login
    const loginEmail = email === 'admin' ? defaultAdminEmail : email;
    const loginPassword = password === 'admin' ? defaultAdminPassword : password;

    try {
      // Attempt to sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword
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
          <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded">
            <p className="text-sm text-blue-700 font-medium">Default login:</p>
            <p className="text-sm">Username: admin</p>
            <p className="text-sm">Password: admin123</p>
          </div>
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
