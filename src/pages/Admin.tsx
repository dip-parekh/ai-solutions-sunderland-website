
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/admin/LoginForm';
import AdminLayout from '../components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import Dashboard from './admin/Dashboard';
import Inquiries from './admin/Inquiries';
import Projects from './admin/Projects';
import Testimonials from './admin/Testimonials';
import Articles from './admin/Articles';
import Events from './admin/Events';
import Gallery from './admin/Gallery';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      const sessionAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
      
      const isAuth = !!session || sessionAuth;
      setIsAuthenticated(isAuth);
      
      if (isAuth && window.location.pathname === '/admin') {
        navigate('/admin/dashboard');
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Set up auth listener for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const isAuth = !!session;
        setIsAuthenticated(isAuth);
        
        if (isAuth && window.location.pathname === '/admin') {
          navigate('/admin/dashboard');
        } else if (!isAuth && window.location.pathname !== '/admin') {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Main admin login route
  if (window.location.pathname === '/admin') {
    return (
      <AdminLayout title="Admin Login" requireAuth={false}>
        {isAuthenticated ? (
          <Navigate to="/admin/dashboard" replace />
        ) : (
          <div className="flex items-center justify-center min-h-[80vh]">
            <LoginForm />
          </div>
        )}
      </AdminLayout>
    );
  }

  // If not authenticated and trying to access any admin route, redirect to login
  if (!isAuthenticated && window.location.pathname.startsWith('/admin/')) {
    return <Navigate to="/admin" replace />;
  }

  // Protected admin routes
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inquiries" element={<Inquiries />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/events" element={<Events />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default Admin;
