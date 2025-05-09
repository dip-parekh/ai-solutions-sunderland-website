
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import AdminLayout from '@/components/admin/AdminLayout';
import { InquiryDetailsModal } from '@/components/admin/dashboard/InquiryDetailsModal';
import { Button } from '@/components/ui/button';
import { DownloadIcon, Filter } from 'lucide-react';
import { Inquiry } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions = [
  { label: 'New', value: 'new' },
  { label: 'In Progress', value: 'in progress' },
  { label: 'Completed', value: 'completed' }
];

const Inquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
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
  
  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailsModalOpen(true);
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

  return (
    <AdminLayout title="Inquiries">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Inquiries</h1>
        <div className="flex space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                {statusFilter === 'all' ? 'All Statuses' : `Status: ${statusFilter}`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('new')}>New</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('in progress')}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={exportToCSV} variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredInquiries.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{inquiry.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.company || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {inquiry.date ? format(new Date(inquiry.date), 'MMM d, yyyy') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        defaultValue={inquiry.status || 'new'}
                        onValueChange={(value) => updateInquiryStatus(inquiry.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {inquiry.ai_category || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewInquiry(inquiry)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No inquiries found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter !== 'all' 
              ? `No inquiries with status "${statusFilter}" found. Try changing your filter.` 
              : "No customer inquiries have been received yet."}
          </p>
        </div>
      )}
      
      {isDetailsModalOpen && selectedInquiry && (
        <InquiryDetailsModal
          inquiry={selectedInquiry}
          onClose={() => setIsDetailsModalOpen(false)}
          onStatusChange={updateInquiryStatus}
        />
      )}
    </AdminLayout>
  );
};

export default Inquiries;
