
import { useEffect } from 'react';
import { AdminHeader } from './dashboard/AdminHeader';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  requireAuth?: boolean;
}

const AdminLayout = ({ children, title = "Admin", requireAuth = true }: AdminLayoutProps) => {
  const { isAuthenticated, isLoading, logout } = useAdminAuth();

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
      {requireAuth && <AdminHeader title={title} handleLogout={logout} />}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
