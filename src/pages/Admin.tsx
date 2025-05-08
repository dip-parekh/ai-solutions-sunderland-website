import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
        // If on main admin page and authenticated, redirect to dashboard
        if (window.location.pathname === '/admin') {
          navigate('/admin/dashboard');
        }
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
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Sub-routes handling for admin paths
  if (window.location.pathname !== '/admin') {
    return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    );
  }

  return (
    <AdminLayout title="Admin Login">
      {!isAuthenticated && (
        <div className="flex items-center justify-center min-h-[80vh]">
          <LoginForm />
        </div>
      )}
    </AdminLayout>
  );
};

export default Admin;
