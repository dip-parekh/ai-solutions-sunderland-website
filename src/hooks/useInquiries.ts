
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { Inquiry } from '@/types/database';

export const useInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
    
    // Set up real-time listener
    const channel = supabase.channel('inquiries-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'inquiries'
      }, () => {
        fetchInquiries();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  useEffect(() => {
    filterInquiries();
  }, [inquiries, statusFilter]);
  
  const fetchInquiries = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setInquiries(data as Inquiry[]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching inquiries",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const filterInquiries = () => {
    if (statusFilter === 'all') {
      setFilteredInquiries(inquiries);
    } else {
      setFilteredInquiries(inquiries.filter(inq => inq.status === statusFilter));
    }
  };
  
  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setInquiries(prev => 
        prev.map(inq => inq.id === id ? { ...inq, status } : inq)
      );
      
      toast({
        title: "Status updated",
        description: `Inquiry status has been updated to ${status}.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: error.message,
      });
    }
  };
  
  const exportToCSV = () => {
    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Company', 'Date', 'Status', 'Message', 'AI Category', 'AI Sentiment', 'AI Suggestion'];
    const csvRows = [headers];
    
    // Add data rows
    inquiries.forEach(inquiry => {
      csvRows.push([
        inquiry.id.toString(),
        inquiry.name,
        inquiry.email,
        inquiry.company || '',
        inquiry.date ? new Date(inquiry.date).toISOString().split('T')[0] : '',
        inquiry.status || '',
        inquiry.message || '',
        inquiry.ai_category || '',
        inquiry.ai_sentiment || '',
        inquiry.ai_suggestion || ''
      ]);
    });
    
    // Convert to CSV string
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-solutions-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Inquiries have been exported to CSV.",
    });
  };

  return {
    inquiries: filteredInquiries,
    isLoading,
    statusFilter,
    setStatusFilter,
    updateInquiryStatus,
    exportToCSV,
    refetch: fetchInquiries
  };
};
