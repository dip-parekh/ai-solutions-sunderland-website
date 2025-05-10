
import { useEffect } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/admin/LoginForm';
import AdminLayout from '../components/admin/AdminLayout';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import Dashboard from './admin/Dashboard';
import Inquiries from './admin/Inquiries';
import Projects from './admin/Projects';
import Testimonials from './admin/Testimonials';
import Articles from './admin/Articles';
import Events from './admin/Events';
import Gallery from './admin/Gallery';

const Admin = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && window.location.pathname === '/admin') {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

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

  // Protected admin routes
  return (
    <Routes>
      <Route path="/dashboard" element={
        isAuthenticated ? <Dashboard /> : <Navigate to="/admin" replace />
      } />
      <Route path="/inquiries" element={
        isAuthenticated ? <Inquiries /> : <Navigate to="/admin" replace />
      } />
      <Route path="/projects" element={
        isAuthenticated ? <Projects /> : <Navigate to="/admin" replace />
      } />
      <Route path="/testimonials" element={
        isAuthenticated ? <Testimonials /> : <Navigate to="/admin" replace />
      } />
      <Route path="/articles" element={
        isAuthenticated ? <Articles /> : <Navigate to="/admin" replace />
      } />
      <Route path="/events" element={
        isAuthenticated ? <Events /> : <Navigate to="/admin" replace />
      } />
      <Route path="/gallery" element={
        isAuthenticated ? <Gallery /> : <Navigate to="/admin" replace />
      } />
      <Route path="/*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default Admin;
