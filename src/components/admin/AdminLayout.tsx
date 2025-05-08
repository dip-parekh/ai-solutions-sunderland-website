
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminHeader } from './dashboard/AdminHeader';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  requireAuth?: boolean;
}

const AdminLayout = ({ children, title = "Admin", requireAuth = true }: AdminLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // First check session storage for quick access
      const sessionAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
      
      // Then verify with Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      const isAuth = sessionAuth || !!session;
      setIsAuthenticated(isAuth);
      
      if (requireAuth && !isAuth) {
        navigate('/admin');
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate, requireAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null; // Don't render content, will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {requireAuth && <AdminHeader title={title} />}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
