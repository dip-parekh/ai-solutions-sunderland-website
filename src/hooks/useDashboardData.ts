
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Inquiry } from '@/types/database';

interface DashboardCounts {
  projects: number;
  testimonials: number;
  articles: number;
  events: number;
  inquiries: number;
}

export function useDashboardData() {
  const [counts, setCounts] = useState<DashboardCounts>({
    projects: 0,
    testimonials: 0,
    articles: 0,
    events: 0,
    inquiries: 0
  });
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    
    try {
      // Fetch counts from each table
      const [
        projectsResult, 
        testimonialsResult, 
        articlesResult, 
        eventsResult,
        inquiriesResult,
        recentInquiriesResult
      ] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5)
      ]);
      
      setCounts({
        projects: projectsResult.count || 0,
        testimonials: testimonialsResult.count || 0,
        articles: articlesResult.count || 0,
        events: eventsResult.count || 0,
        inquiries: inquiriesResult.count || 0
      });

      // Use type assertion to ensure compatibility
      setInquiries(recentInquiriesResult.data as unknown as Inquiry[]);
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        variant: "destructive",
        title: "Error loading dashboard",
        description: error.message || "Failed to load dashboard data"
      });
      
      // Set empty data on error
      setInquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up real-time listeners
    const inquiriesChannel = supabase.channel('dashboard-inquiries')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'inquiries'
      }, () => fetchData())
      .subscribe();
      
    return () => {
      supabase.removeChannel(inquiriesChannel);
    };
  }, [toast]);

  return {
    counts,
    inquiries,
    isLoading,
    refetch: fetchData
  };
}
