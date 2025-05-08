
import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { StatsCards } from '@/components/admin/dashboard/StatsCards';
import { ActivityChart } from '@/components/admin/dashboard/ActivityChart';
import { RecentActivity } from '@/components/admin/dashboard/RecentActivity';
import { QuickActions } from '@/components/admin/dashboard/QuickActions';
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

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="flex space-x-2">
            <button className="text-sm border px-3 py-1.5 rounded flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <line x1="16" x2="16" y1="2" y2="6"></line>
                <line x1="8" x2="8" y1="2" y2="6"></line>
                <line x1="3" x2="21" y1="10" y2="10"></line>
              </svg>
              Last 30 Days
            </button>
          </div>
        </div>

        <StatsCards counts={counts} isLoading={isLoading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityChart isLoading={isLoading} />
          <RecentActivity />
        </div>
        
        <QuickActions />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
