
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Calendar, Download, Filter, MessageSquare, Search, X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  company: string;
  date: string;
  status: string;
  message: string;
  tags?: { name: string; color: string }[];
  sentiment?: string;
}

const Inquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
    
    // Set up real-time listener for inquiries
    const inquiriesChannel = supabase.channel('realtime-inquiries')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'inquiry_tags'
      }, (payload) => {
        fetchInquiries();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(inquiriesChannel);
    };
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    
    try {
      // Normally we'd fetch from the database here, but for now let's use mock data
      const mockInquiries: Inquiry[] = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john@techcorp.com',
          company: 'Tech Corporation',
          date: '2025-05-04',
          status: 'new',
          message: 'We need a custom AI solution for our customer service department.',
          tags: [{ name: 'sales', color: 'green-100' }, { name: 'positive', color: 'green-100' }],
          sentiment: 'positive'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah@healthcare.org',
          company: 'Healthcare Systems',
          date: '2025-05-03',
          status: 'in progress',
          message: 'Looking to improve our patient intake process with AI analytics.',
          tags: [{ name: 'support', color: 'blue-100' }],
          sentiment: 'neutral'
        },
        {
          id: 3,
          name: 'Michael Chang',
          email: 'michael@financegroup.com',
          company: 'Finance Group',
          date: '2025-05-02',
          status: 'completed',
          message: 'Your AI solutions have been excellent, we want to discuss expanding our contract.',
          tags: [{ name: 'partnership', color: 'purple-100' }, { name: 'positive', color: 'green-100' }],
          sentiment: 'positive'
        },
        {
          id: 4,
          name: 'Emily Wilson',
          email: 'emily@retailco.com',
          company: 'Retail Co',
          date: '2025-05-01',
          status: 'new',
          message: 'We need help with our inventory management system urgently.',
          tags: [{ name: 'support', color: 'blue-100' }, { name: 'urgent', color: 'red-100' }],
          sentiment: 'negative'
        },
        {
          id: 5,
          name: 'Robert Lee',
          email: 'robert@edutech.edu',
          company: 'EduTech',
          date: '2025-04-30',
          status: 'in progress',
          message: 'Interested in your AI tutoring platform for our online courses.',
          tags: [{ name: 'sales', color: 'green-100' }],
          sentiment: 'positive'
        }
      ];
      
      setInquiries(mockInquiries);
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

  const exportCSV = () => {
    try {
      // Create CSV content
      const headers = ['ID', 'Name', 'Email', 'Company', 'Date', 'Status', 'Message', 'Tags', 'Sentiment'];
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
          inquiry.tags?.map(tag => tag.name).join(', ') || '',
          inquiry.sentiment || ''
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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: error.message,
      });
    }
  };

  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedInquiry(null);
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (!selectedInquiry) return;
    
    // Update the inquiry status
    setInquiries(prevInquiries => 
      prevInquiries.map(inquiry => 
        inquiry.id === selectedInquiry.id ? { ...inquiry, status: newStatus } : inquiry
      )
    );
    
    setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
    
    toast({
      title: "Status updated",
      description: `Inquiry status changed to ${newStatus}`,
    });
  };

  // Filter inquiries based on search term and filters
  const filteredInquiries = inquiries.filter(inquiry => {
    // Text search
    const matchesSearch = searchTerm === '' || 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Status filter
    const matchesStatus = selectedStatus === null || inquiry.status === selectedStatus;
    
    // Tag filter
    const matchesTag = selectedTag === null || 
      inquiry.tags?.some(tag => tag.name === selectedTag);
      
    return matchesSearch && matchesStatus && matchesTag;
  });

  // Extract all unique tags from inquiries
  const allTags = Array.from(new Set(
    inquiries.flatMap(inquiry => inquiry.tags?.map(tag => tag.name) || [])
  ));

  return (
    <AdminLayout title="Inquiries">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Inquiries</h1>
          <Button onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search inquiries..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedStatus === null ? 'default' : 'outline'}
                onClick={() => setSelectedStatus(null)}
              >
                All
              </Button>
              <Button 
                variant={selectedStatus === 'new' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('new')}
                className={selectedStatus === 'new' ? '' : 'border-blue-200 text-blue-700'}
              >
                New
              </Button>
              <Button 
                variant={selectedStatus === 'in progress' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('in progress')}
                className={selectedStatus === 'in progress' ? '' : 'border-yellow-200 text-yellow-700'}
              >
                In Progress
              </Button>
              <Button 
                variant={selectedStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('completed')}
                className={selectedStatus === 'completed' ? '' : 'border-green-200 text-green-700'}
              >
                Completed
              </Button>
            </div>
          </div>
          
          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex items-center mr-2">
                <Filter className="h-4 w-4 mr-1 text-gray-400" />
                <span className="text-sm text-gray-500">Tags:</span>
              </div>
              {allTags.map(tag => (
                <Button 
                  key={tag}
                  variant="outline"
                  size="sm"
                  className={`${selectedTag === tag ? 'bg-blue-50 border-blue-200' : ''}`}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                  {selectedTag === tag && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Inquiries List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredInquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">
                            {inquiry.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inquiry.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inquiry.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                          inquiry.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {inquiry.status === 'new' ? 'New' : 
                           inquiry.status === 'in progress' ? 'In Progress' : 
                           'Completed'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {inquiry.tags?.map((tag, idx) => (
                            <span 
                              key={idx}
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${tag.color} text-gray-800`}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inquiry.sentiment && (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            inquiry.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                            inquiry.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {inquiry.sentiment.charAt(0).toUpperCase() + inquiry.sentiment.slice(1)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 hover:text-blue-800"
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
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No inquiries found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedStatus || selectedTag ? 
                  'Try adjusting your search or filters' : 
                  'Inquiries from your contact form will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Details Modal */}
      {isDetailsModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">Inquiry Details</h3>
              <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedInquiry.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedInquiry.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{selectedInquiry.company || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Inquiry Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Date Submitted</p>
                      <p className="font-medium">{new Date(selectedInquiry.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedInquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                          selectedInquiry.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {selectedInquiry.status === 'new' ? 'New' : 
                          selectedInquiry.status === 'in progress' ? 'In Progress' : 
                          'Completed'}
                        </span>
                        
                        <div className="flex space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className={`text-xs py-1 h-6 ${selectedInquiry.status === 'new' ? 'bg-blue-50' : ''}`}
                            onClick={() => handleUpdateStatus('new')}
                          >
                            New
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className={`text-xs py-1 h-6 ${selectedInquiry.status === 'in progress' ? 'bg-yellow-50' : ''}`}
                            onClick={() => handleUpdateStatus('in progress')}
                          >
                            In Progress
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className={`text-xs py-1 h-6 ${selectedInquiry.status === 'completed' ? 'bg-green-50' : ''}`}
                            onClick={() => handleUpdateStatus('completed')}
                          >
                            Completed
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tags</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedInquiry.tags?.map((tag, idx) => (
                          <span 
                            key={idx}
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${tag.color} text-gray-800`}
                          >
                            {tag.name}
                          </span>
                        )) || 'No tags'}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sentiment</p>
                      {selectedInquiry.sentiment && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedInquiry.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                          selectedInquiry.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedInquiry.sentiment.charAt(0).toUpperCase() + selectedInquiry.sentiment.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Message</h4>
                <div className="bg-gray-50 p-4 rounded border">
                  <p>{selectedInquiry.message || 'No message provided.'}</p>
                </div>
              </div>
              
              {/* AI Analysis Section */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                  AI-Generated Suggestion
                </h4>
                <div className="bg-blue-50 p-4 rounded border border-blue-100 text-blue-800">
                  {selectedInquiry.sentiment === 'positive' ? (
                    <p>This inquiry shows positive sentiment and appears to be a good sales opportunity. Recommended action: Assign to sales team for follow-up within 24 hours.</p>
                  ) : selectedInquiry.sentiment === 'negative' ? (
                    <p>This inquiry shows signs of urgency and customer dissatisfaction. Recommended action: Prioritize this inquiry and assign to senior support staff immediately.</p>
                  ) : (
                    <p>This is a standard inquiry that should be processed according to normal procedures. Recommended action: Review details and assign to appropriate department.</p>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-between">
                <Button variant="outline" onClick={handleCloseModal}>Close</Button>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                  <Button>
                    Respond to Inquiry
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Inquiries;
