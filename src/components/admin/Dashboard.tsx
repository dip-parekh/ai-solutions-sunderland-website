
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users, MessageSquare, BarChart2, Calendar, 
  Star, FileText, LogOut, Settings, Info 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  companyName?: string;
  company?: string;
  date: string;
  status: 'new' | 'in progress' | 'completed';
  message?: string;
  aiCategory?: string;
  aiSentiment?: 'positive' | 'negative' | 'neutral';
  aiSuggestion?: string;
}

// Mock data for demo purposes
const mockInquiries: Inquiry[] = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john@techcorp.com', 
    company: 'Tech Corporation', 
    date: '2025-05-04', 
    status: 'new',
    message: 'We need a custom AI solution for our customer service department.',
    aiCategory: 'Sales',
    aiSentiment: 'positive',
    aiSuggestion: 'Recommend our Customer Service AI package with custom training.'
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah@healthcare.org', 
    company: 'Healthcare Systems', 
    date: '2025-05-03', 
    status: 'in progress',
    message: 'Looking to improve our patient intake process with AI analytics.',
    aiCategory: 'Support',
    aiSentiment: 'neutral',
    aiSuggestion: 'Schedule a demo of our Healthcare Analytics Platform.'
  },
  { 
    id: 3, 
    name: 'Michael Chang', 
    email: 'michael@financegroup.com', 
    company: 'Finance Group', 
    date: '2025-05-02', 
    status: 'completed',
    message: 'Your AI solutions have been excellent, we want to discuss expanding our contract.',
    aiCategory: 'Partnerships',
    aiSentiment: 'positive',
    aiSuggestion: 'Assign to account manager for partnership expansion discussion.'
  },
  { 
    id: 4, 
    name: 'Emily Wilson', 
    email: 'emily@retailco.com', 
    company: 'Retail Co', 
    date: '2025-05-01', 
    status: 'new',
    message: 'We need help with our inventory management system urgently.',
    aiCategory: 'Support',
    aiSentiment: 'negative',
    aiSuggestion: 'High priority - assign to technical support team immediately.'
  },
  { 
    id: 5, 
    name: 'Robert Lee', 
    email: 'robert@edutech.edu', 
    company: 'EduTech', 
    date: '2025-04-30', 
    status: 'in progress',
    message: 'Interested in your AI tutoring platform for our online courses.',
    aiCategory: 'Sales',
    aiSentiment: 'positive',
    aiSuggestion: 'Schedule product demo with education specialist.'
  }
];

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
            aiSentiment: aiSentiments[Math.floor(Math.random() * aiSentiments.length)],
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
        inquiry.company || inquiry.companyName || '',
        inquiry.date,
        inquiry.status,
        inquiry.message || '',
        inquiry.aiCategory || '',
        inquiry.aiSentiment || '',
        inquiry.aiSuggestion || ''
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
    ? inquiries.filter(inquiry => inquiry.aiCategory === selectedCategory)
    : inquiries;

  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailsModalOpen(true);
  };

  const stats = [
    { 
      label: 'Total Inquiries', 
      value: inquiries.length.toString(), 
      icon: MessageSquare, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      label: 'Active Projects', 
      value: '8', 
      icon: FileText, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      label: 'Upcoming Events', 
      value: '3', 
      icon: Calendar, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      label: 'Average Rating', 
      value: '4.9', 
      icon: Star, 
      color: 'bg-amber-100 text-amber-600' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">AI-Solutions Admin</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center">
            <LogOut size={16} className="mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-lg font-semibold">Inquiry Management</h2>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory(null)}
                  className={!selectedCategory ? 'bg-blue-50 text-blue-600' : ''}
                >
                  All
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory('Sales')}
                  className={selectedCategory === 'Sales' ? 'bg-blue-50 text-blue-600' : ''}
                >
                  Sales
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory('Support')}
                  className={selectedCategory === 'Support' ? 'bg-blue-50 text-blue-600' : ''}
                >
                  Support
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory('Partnerships')}
                  className={selectedCategory === 'Partnerships' ? 'bg-blue-50 text-blue-600' : ''}
                >
                  Partnerships
                </Button>
                <Button onClick={handleExportCSV}>Export CSV</Button>
              </div>
            </div>
          </div>
          
          {/* Inquiries Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.company || inquiry.companyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                          inquiry.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {inquiry.status === 'new' ? 'New' : 
                         inquiry.status === 'in progress' ? 'In Progress' : 
                         'Completed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {inquiry.aiCategory || 'Not Categorized'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {inquiry.aiSentiment && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${inquiry.aiSentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                            inquiry.aiSentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {inquiry.aiSentiment.charAt(0).toUpperCase() + inquiry.aiSentiment.slice(1)}
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
                
                {filteredInquiries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No inquiries found for the selected category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Analytics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              <div className="flex items-center">
                <BarChart2 size={20} className="mr-2 text-blue-600" />
                AI-Powered Analytics
              </div>
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Inquiry Distribution by Category</h3>
                <div className="h-36 flex items-center justify-center">
                  <div className="w-full flex items-end justify-around space-x-2">
                    {[
                      { category: 'Sales', percentage: 45, color: 'bg-blue-500' },
                      { category: 'Support', percentage: 30, color: 'bg-green-500' },
                      { category: 'Partnership', percentage: 25, color: 'bg-purple-500' }
                    ].map(item => (
                      <div key={item.category} className="flex flex-col items-center">
                        <div 
                          className={`${item.color} w-12 md:w-16 rounded-t`} 
                          style={{ height: `${item.percentage}%` }}
                        ></div>
                        <div className="text-xs mt-1">{item.category}</div>
                        <div className="text-xs font-medium">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Sentiment Analysis</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Positive</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2 mt-4">
                    <span className="text-sm">Neutral</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2 mt-4">
                    <span className="text-sm">Negative</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Users size={20} className="mr-2 text-blue-600" />
              Recent Team Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Sarah assigned 3 new inquiries to team members</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageSquare size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">James responded to Tech Corporation inquiry</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <FileText size={16} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Emma created a proposal for Healthcare Systems</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Calendar size={16} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Michael scheduled a demo with Finance Group</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded transition-colors">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <Settings size={16} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">System update completed successfully</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full">View All Activity</Button>
            </div>
          </div>
        </div>
        
        {/* Event Recommendation */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar size={20} className="mr-2 text-blue-600" />
            AI-Suggested Events
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Tech Industry Webinar</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Suggested</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Based on recent inquiries from tech sector companies, organizing an industry-specific webinar could generate new leads.</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1" />
                Optimal timing: Next month
              </div>
            </div>
            
            <div className="flex-1 border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Healthcare AI Workshop</h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">High Potential</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Healthcare clients show strong interest in AI integration. A focused workshop could convert recent inquiries into projects.</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1" />
                Optimal timing: Within 2 weeks
              </div>
            </div>
            
            <div className="flex-1 border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Customer Success Stories</h3>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">Follow-up</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Showcase recent successful implementations with testimonials to re-engage contacts who haven't converted.</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1" />
                Optimal timing: End of quarter
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Inquiry Details Modal */}
      {isDetailsModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">Inquiry Details</h3>
                <button 
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
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
                      <p className="font-medium">{selectedInquiry.company || selectedInquiry.companyName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Job Title</p>
                      <p className="font-medium">{selectedInquiry.jobTitle || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Inquiry Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Date Submitted</p>
                      <p className="font-medium">{selectedInquiry.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${selectedInquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                          selectedInquiry.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {selectedInquiry.status === 'new' ? 'New' : 
                         selectedInquiry.status === 'in progress' ? 'In Progress' : 
                         'Completed'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">AI Category</p>
                      <p className="font-medium">{selectedInquiry.aiCategory || 'Not Categorized'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sentiment</p>
                      {selectedInquiry.aiSentiment && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${selectedInquiry.aiSentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                            selectedInquiry.aiSentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {selectedInquiry.aiSentiment.charAt(0).toUpperCase() + selectedInquiry.aiSentiment.slice(1)}
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
              
              {selectedInquiry.aiSuggestion && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <Info size={16} className="mr-1 text-blue-600" />
                    AI-Generated Suggestion
                  </h4>
                  <div className="bg-blue-50 p-4 rounded border border-blue-100 text-blue-800">
                    <p>{selectedInquiry.aiSuggestion}</p>
                  </div>
                </div>
              )}
              
              <div className="border-t pt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}>Close</Button>
                <Button>Update Status</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
