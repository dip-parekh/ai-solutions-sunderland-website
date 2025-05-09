
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from './dashboard/AdminHeader';
import { AdminStatistics } from './dashboard/AdminStatistics';
import { AnalyticsSection } from './dashboard/AnalyticsSection';
import { EventSuggestions } from './dashboard/EventSuggestions';
import { InquiryView } from './dashboard/InquiryView';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { useDashboardData } from '@/hooks/useDashboardData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { counts, inquiries, isLoading } = useDashboardData();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader handleLogout={handleLogout} />

      <div className="container mx-auto p-4">
        <DashboardHeader title="Dashboard Overview" />
        
        <div className="space-y-6 mt-6">
          <AdminStatistics inquiries={inquiries} isLoading={isLoading} />
          
          <InquiryView 
            inquiries={inquiries} 
            isLoading={isLoading} 
            onExportCSV={handleExportCSV} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <AnalyticsSection />
            <EventSuggestions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
