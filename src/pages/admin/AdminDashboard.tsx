
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MessageSquare, FolderKanban, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { counts, inquiries, isLoading } = useDashboardData();
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    { 
      title: 'Events', 
      value: counts.events, 
      icon: <CalendarIcon className="h-8 w-8 text-blue-500" />,
      onClick: () => navigate('/admin/events')
    },
    { 
      title: 'Projects', 
      value: counts.projects, 
      icon: <FolderKanban className="h-8 w-8 text-green-500" />,
      onClick: () => navigate('/admin/projects')
    },
    { 
      title: 'Testimonials', 
      value: counts.testimonials, 
      icon: <Users className="h-8 w-8 text-purple-500" />,
      onClick: () => navigate('/admin/testimonials')
    },
    { 
      title: 'Inquiries', 
      value: counts.inquiries, 
      icon: <MessageSquare className="h-8 w-8 text-orange-500" />,
      onClick: () => navigate('/admin/inquiries')
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome to your admin dashboard. Manage your site content and view analytics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={stat.onClick}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">{stat.value}</span>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
        {inquiries.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No recent inquiries
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{inquiry.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{inquiry.email}</p>
                      <p className="text-sm mt-2 line-clamp-2">{inquiry.message}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                      {new Date(inquiry.created_at || '').toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
