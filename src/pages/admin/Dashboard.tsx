
import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BarChart2, Calendar, FileText, FolderOpen, 
  MessageSquare, Star, Users
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardCounts {
  projects: number;
  testimonials: number;
  articles: number;
  events: number;
  inquiries: number;
}

const Dashboard = () => {
  const [counts, setCounts] = useState<DashboardCounts>({
    projects: 0,
    testimonials: 0,
    articles: 0,
    events: 0,
    inquiries: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setIsLoading(true);
      
      try {
        // Fetch counts from each table
        const [
          projectsResult, 
          testimonialsResult, 
          articlesResult, 
          eventsResult
        ] = await Promise.all([
          supabase.from('projects').select('id', { count: 'exact', head: true }),
          supabase.from('testimonials').select('id', { count: 'exact', head: true }),
          supabase.from('articles').select('id', { count: 'exact', head: true }),
          supabase.from('events').select('id', { count: 'exact', head: true })
        ]);
        
        setCounts({
          projects: projectsResult.count || 0,
          testimonials: testimonialsResult.count || 0,
          articles: articlesResult.count || 0,
          events: eventsResult.count || 0,
          inquiries: 5 // Mock data for now
        });
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCounts();
  }, []);

  const cards = [
    {
      title: 'Projects',
      value: counts.projects,
      icon: FolderOpen,
      color: 'bg-blue-600',
      link: '/admin/projects'
    },
    {
      title: 'Testimonials',
      value: counts.testimonials,
      icon: Star,
      color: 'bg-amber-500',
      link: '/admin/testimonials'
    },
    {
      title: 'Articles',
      value: counts.articles,
      icon: FileText,
      color: 'bg-green-600',
      link: '/admin/articles'
    },
    {
      title: 'Events',
      value: counts.events,
      icon: Calendar,
      color: 'bg-purple-600',
      link: '/admin/events'
    },
    {
      title: 'Inquiries',
      value: counts.inquiries,
      icon: MessageSquare,
      color: 'bg-red-600',
      link: '/admin/inquiries'
    }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {cards.map((card) => (
            <Link to={card.link} key={card.title} className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{card.title}</p>
                    <p className="text-3xl font-bold mt-2">
                      {isLoading ? (
                        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                      ) : (
                        card.value
                      )}
                    </p>
                  </div>
                  <div className={`${card.color} text-white p-3 rounded-full`}>
                    <card.icon size={24} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                Inquiry Analytics
              </h2>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Simple bar chart */}
                    <div className="flex items-end justify-around h-40 space-x-2">
                      {[0.6, 0.9, 0.4, 0.7, 0.5, 0.3, 0.8].map((height, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div 
                            className="bg-blue-500 rounded-t w-8" 
                            style={{ height: `${height * 100}%` }}
                          ></div>
                          <div className="text-xs mt-1">{`D${i+1}`}</div>
                        </div>
                      ))}
                    </div>
                    <p>Daily Inquiry Trend</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Recent Activity
              </h2>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'New project added', desc: 'AI Customer Service Portal project was created', time: '2 hours ago' },
                { title: 'Testimonial received', desc: 'New 5-star review from TechCorp', time: '5 hours ago' },
                { title: 'New article published', desc: 'The Future of AI in Healthcare published', time: 'Yesterday' },
                { title: 'Event scheduled', desc: 'AI Workshop scheduled for next month', time: '2 days ago' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.desc}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Button asChild className="h-auto py-6 flex flex-col">
              <Link to="/admin/projects/new">
                <FolderOpen className="h-6 w-6 mb-2" />
                <span>Add Project</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col">
              <Link to="/admin/testimonials/new">
                <Star className="h-6 w-6 mb-2" />
                <span>New Testimonial</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col">
              <Link to="/admin/articles/new">
                <FileText className="h-6 w-6 mb-2" />
                <span>Write Article</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col">
              <Link to="/admin/events/new">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Create Event</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col">
              <Link to="/admin/inquiries">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>View Inquiries</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
