
import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, FolderOpen, Star, FileText, 
  Calendar, MessageSquare, Image, LogOut, User, Settings, Bell
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      // Check if admin is authenticated with Supabase
      const { data: { session } } = await supabase.auth.getSession();
      const authStatus = !!session;
      
      setIsAuthenticated(authStatus);
      
      // If not authenticated and trying to access protected routes, redirect to login
      if (!authStatus && location.pathname !== '/admin') {
        navigate('/admin');
        toast({
          title: "Authentication required",
          description: "Please log in to access the admin area.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const authStatus = !!session;
        setIsAuthenticated(authStatus);
        
        if (event === 'SIGNED_OUT') {
          navigate('/admin');
          toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
          });
        } else if (event === 'SIGNED_IN' && location.pathname === '/admin') {
          // Redirect to dashboard after successful login
          navigate('/admin/dashboard');
          toast({
            title: "Logged in",
            description: "Welcome to the admin dashboard.",
          });
        }
      }
    );
    
    // Mock unread notifications count
    setUnreadCount(3);
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Add a special message when not authenticated but on admin page
  if (!isAuthenticated && location.pathname === '/admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-blue-600">
                AI-Solutions
              </Link>
              <span className="hidden md:inline text-gray-400">|</span>
              <h1 className="hidden md:inline text-lg font-medium text-gray-800">{title}</h1>
            </div>
          </div>
        </header>
        {children}
      </div>
    );
  }

  if (!isAuthenticated && location.pathname !== '/admin') {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-blue-600">
              AI-Solutions
            </Link>
            <span className="hidden md:inline text-gray-400">|</span>
            <h1 className="hidden md:inline text-lg font-medium text-gray-800">{title}</h1>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 rounded-full bg-red-500 w-4 h-4 text-xs text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {isAuthenticated && (
          <aside className="w-64 bg-white border-r hidden md:block overflow-y-auto">
            <nav className="p-4 space-y-2">
              <Link to="/admin/dashboard" className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/admin/dashboard')}`}>
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
              <Link to="/admin/projects" className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/admin/projects')}`}>
                <FolderOpen className="h-5 w-5 mr-3" />
                Projects
              </Link>
              <Link to="/admin/testimonials" className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/admin/testimonials')}`}>
                <Star className="h-5 w-5 mr-3" />
                Testimonials
              </Link>
              <Link to="/admin/articles" className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/admin/articles')}`}>
                <FileText className="h-5 w-5 mr-3" />
                Articles
              </Link>
              <Link to="/admin/events" className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/admin/events')}`}>
                <Calendar className="h-5 w-5 mr-3" />
                Events
              </Link>
              <Link to="/admin/gallery" className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/admin/gallery')}`}>
                <Image className="h-5 w-5 mr-3" />
                Gallery
              </Link>
              <Link to="/admin/inquiries" className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/admin/inquiries')}`}>
                <MessageSquare className="h-5 w-5 mr-3" />
                Inquiries
              </Link>
              
              <div className="pt-4 mt-4 border-t">
                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
                  Settings
                </div>
                <Link to="/admin/profile" className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/admin/profile')}`}>
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </Link>
                <Link to="/admin/settings" className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/admin/settings')}`}>
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </Link>
              </div>
            </nav>
          </aside>
        )}
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
