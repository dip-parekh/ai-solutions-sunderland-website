
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        const sessionAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
        
        const isAuth = !!session || sessionAuth;
        setIsAuthenticated(isAuth);
        
        if (!isAuth && window.location.pathname !== '/admin') {
          toast({
            variant: "destructive",
            title: "Authentication required",
            description: "Please login to access the admin panel.",
          });
          navigate('/admin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth listener for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const isAuth = !!session;
        setIsAuthenticated(isAuth);
        
        if (!isAuth && window.location.pathname !== '/admin') {
          toast({
            variant: "destructive",
            title: "Session expired",
            description: "Please login again to continue.",
          });
          navigate('/admin');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      sessionStorage.removeItem('adminAuthenticated');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/admin');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.message || 'Something went wrong',
      });
    }
  };

  return { isAuthenticated, isLoading, logout };
};
