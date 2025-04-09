
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/admin/LoginForm';
import Dashboard from '../components/admin/Dashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(adminAuth);
    
    // Handle direct access to dashboard URL
    const path = window.location.pathname;
    if (path === '/admin/dashboard' && !adminAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  // Determine if we're on the dashboard route
  const isDashboardRoute = window.location.pathname === '/admin/dashboard';

  return (
    <div className="min-h-screen bg-gray-100">
      {(isAuthenticated || isDashboardRoute) ? (
        <Dashboard />
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4">
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default Admin;
