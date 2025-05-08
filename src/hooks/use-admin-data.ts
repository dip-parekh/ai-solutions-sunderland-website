
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

type TableName = 'inquiries' | 'projects' | 'testimonials' | 'articles' | 'events' | 'gallery_images';

export function useAdminData<T>(tableName: TableName) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // Use type assertion to ensure type compatibility
      setData(data as unknown as T[]);
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: `Error fetching ${tableName}`,
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up real-time listener
    const channel = supabase.channel(`${tableName}-changes`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: tableName
      }, () => {
        fetchData();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
}
