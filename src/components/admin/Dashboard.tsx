
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users, MessageSquare, BarChart2, Calendar, 
  Star, FileText, LogOut, Settings 
} from 'lucide-react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  companyName?: string;
  company?: string;
  date: string;
  status: 'new' | 'in progress' | 'completed';
}

// Mock data for demo purposes
const mockInquiries: Inquiry[] = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john@techcorp.com', 
    company: 'Tech Corporation', 
    date: '2025-04-07', 
    status: 'new' 
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah@healthcare.org', 
    company: 'Healthcare Systems', 
    date: '2025-04-06', 
    status: 'in progress' 
  },
  { 
    id: 3, 
    name: 'Michael Chang', 
    email: 'michael@financegroup.com', 
    company: 'Finance Group', 
    date: '2025-04-05', 
    status: 'completed' 
  },
  { 
    id: 4, 
    name: 'Emily Wilson', 
    email: 'emily@retailco.com', 
    company: 'Retail Co', 
    date: '2025-04-04', 
    status: 'new' 
  },
  { 
    id: 5, 
    name: 'Robert Lee', 
    email: 'robert@edutech.edu', 
    company: 'EduTech', 
    date: '2025-04-03', 
    status: 'in progress' 
  }
];

const Dashboard = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const navigate = useNavigate();

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
      const parsedInquiries = JSON.parse(storedInquiries);
      
      // Format the inquiries to match our expected structure
      const formattedInquiries = parsedInquiries.map((inquiry: any) => ({
        ...inquiry,
        company: inquiry.companyName || inquiry.company, // Handle both field names
      }));
      
      setInquiries([...formattedInquiries, ...mockInquiries]);
    } else {
      // If no stored inquiries, just use mock data
      setInquiries(mockInquiries);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin');
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} className="flex items-center">
          <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      </div>

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

      {/* Recent Inquiries */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Inquiries</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.email}</td>
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Inquiry Sources</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="flex items-center justify-center space-x-4">
              <BarChart2 size={120} className="text-gray-300" />
              <div className="text-gray-500 text-sm">
                <p>Website: 65%</p>
                <p>Referral: 20%</p>
                <p>Social Media: 10%</p>
                <p>Other: 5%</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Team Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Users size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Sarah assigned 3 new inquiries to team members</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <MessageSquare size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">James responded to Tech Corporation inquiry</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Settings size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">System update scheduled for tomorrow</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
