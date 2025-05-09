
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from './dashboard/AdminHeader';
import { AdminStatistics } from './dashboard/AdminStatistics';
import { InquiriesTable } from './dashboard/InquiriesTable';
import { AnalyticsSection } from './dashboard/AnalyticsSection';
import { EventSuggestions } from './dashboard/EventSuggestions';
import { InquiryDetailsModal } from './dashboard/InquiryDetailsModal';
import { Inquiry } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    // Fetch inquiries from Supabase
    fetchInquiries();
    
    // Setup real-time listener for inquiries
    const channel = supabase.channel('dashboard-inquiries')
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
  }, [navigate]);

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
      console.error('Error fetching inquiries:', error);
      toast({
        variant: "destructive",
        title: "Error loading inquiries",
        description: error.message || "Failed to load inquiries"
      });
      
      // Fallback to mock data if database connection fails
      const { mockInquiries } = await import('./dashboard/mockData');
      setInquiries(mockInquiries);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin');
  };
  
  const handleExportCSV = () => {
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
        inquiry.date || new Date().toISOString(),
        inquiry.status || 'new',
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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setInquiries(prevInquiries => 
        prevInquiries.map(inquiry => 
          inquiry.id === id ? { ...inquiry, status } : inquiry
        )
      );
      
      // Show success toast
      toast({
        title: "Status Updated",
        description: `Inquiry status has been changed to ${status}.`,
      });
      
      return Promise.resolve();
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: error.message || "Failed to update status"
      });
      return Promise.reject(error);
    }
  };

  const filteredInquiries = selectedCategory
    ? inquiries.filter(inquiry => inquiry.ai_category === selectedCategory)
    : inquiries;

  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader handleLogout={handleLogout} />

      <div className="container mx-auto p-4">
        <AdminStatistics inquiries={inquiries} isLoading={isLoading} />
        
        <InquiriesTable 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredInquiries={filteredInquiries}
          handleViewInquiry={handleViewInquiry}
          handleExportCSV={handleExportCSV}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <AnalyticsSection />
          <EventSuggestions />
        </div>
      </div>
      
      {isDetailsModalOpen && selectedInquiry && (
        <InquiryDetailsModal 
          inquiry={selectedInquiry}
          onClose={() => setIsDetailsModalOpen(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Dashboard;
