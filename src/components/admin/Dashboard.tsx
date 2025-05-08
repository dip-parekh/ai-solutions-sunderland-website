
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
import { mockInquiries } from './dashboard/mockData';

const Dashboard = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    // Try to load inquiries from localStorage
    const storedInquiries = localStorage.getItem('inquiries');
    
    if (storedInquiries) {
      try {
        const parsedInquiries = JSON.parse(storedInquiries);
        
        // Format the inquiries and add AI-generated fields for demo purposes
        const formattedInquiries = parsedInquiries.map((inquiry: any) => {
          const aiCategories = ['Sales', 'Support', 'Partnerships'];
          const aiSentiments = ['positive', 'negative', 'neutral'];
          const aiSuggestions = [
            'Schedule a follow-up call to discuss requirements.',
            'Send product documentation and pricing information.',
            'Assign to specialized team for technical assessment.',
            'Add to CRM for sales pipeline tracking.'
          ];
          
          return {
            ...inquiry,
            company: inquiry.companyName || inquiry.company,
            aiCategory: aiCategories[Math.floor(Math.random() * aiCategories.length)],
            aiSentiment: aiSentiments[Math.floor(Math.random() * aiSentiments.length)] as 'positive' | 'negative' | 'neutral',
            aiSuggestion: aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]
          };
        });
        
        setInquiries([...formattedInquiries, ...mockInquiries]);
      } catch (error) {
        console.error('Error parsing stored inquiries:', error);
        setInquiries(mockInquiries);
      }
    } else {
      // If no stored inquiries, just use mock data
      setInquiries(mockInquiries);
    }
  }, [navigate]);

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
        inquiry.date,
        inquiry.status,
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
        <AdminStatistics inquiries={inquiries} />
        
        <InquiriesTable 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredInquiries={filteredInquiries}
          handleViewInquiry={handleViewInquiry}
          handleExportCSV={handleExportCSV}
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
        />
      )}
    </div>
  );
};

export default Dashboard;
