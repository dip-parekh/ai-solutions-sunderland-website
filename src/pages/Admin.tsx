
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LineChart, BarChart3, User, Mail, Calendar, FileText, ArrowUpRight } from 'lucide-react';

// Mock data for the admin dashboard
const MOCK_INQUIRIES = [
  { 
    id: 1, 
    name: 'John Smith', 
    company: 'Tech Innovations Ltd', 
    email: 'john@techinnovations.com',
    date: '2025-04-07',
    status: 'New',
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    company: 'Global Services Inc', 
    email: 'sarah@globalservices.com', 
    date: '2025-04-06',
    status: 'In Progress',
  },
  { 
    id: 3, 
    name: 'Michael Williams', 
    company: 'Future Finance', 
    email: 'michael@futurefinance.com', 
    date: '2025-04-05',
    status: 'Contacted',
  },
  { 
    id: 4, 
    name: 'Emily Brown', 
    company: 'Healthcare Solutions', 
    email: 'emily@healthcaresolutions.com', 
    date: '2025-04-04',
    status: 'New',
  },
  { 
    id: 5, 
    name: 'David Lee', 
    company: 'Retail Dynamics', 
    email: 'david@retaildynamics.com', 
    date: '2025-04-03',
    status: 'Completed',
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Inquiries</p>
                <h3 className="text-3xl font-bold">127</h3>
                <p className="text-green-500 text-sm flex items-center mt-1">
                  <ArrowUpRight size={14} className="mr-1" /> +12% this month
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">New Leads</p>
                <h3 className="text-3xl font-bold">24</h3>
                <p className="text-green-500 text-sm flex items-center mt-1">
                  <ArrowUpRight size={14} className="mr-1" /> +5% this week
                </p>
              </div>
              <div className="bg-teal-50 p-3 rounded-full">
                <User className="w-7 h-7 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Response Rate</p>
                <h3 className="text-3xl font-bold">92%</h3>
                <p className="text-green-500 text-sm flex items-center mt-1">
                  <ArrowUpRight size={14} className="mr-1" /> +3% improvement
                </p>
              </div>
              <div className="bg-orange-50 p-3 rounded-full">
                <Mail className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg. Response Time</p>
                <h3 className="text-3xl font-bold">1.2d</h3>
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <ArrowUpRight size={14} className="mr-1" /> +0.3d slower
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-full">
                <Calendar className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inquiries" className="mb-8">
        <TabsList>
          <TabsTrigger value="inquiries">Recent Inquiries</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle>Recent Customer Inquiries</CardTitle>
              <CardDescription>
                You have received 12 new inquiries in the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_INQUIRIES.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">{inquiry.id}</TableCell>
                      <TableCell>{inquiry.name}</TableCell>
                      <TableCell>{inquiry.company}</TableCell>
                      <TableCell>{inquiry.email}</TableCell>
                      <TableCell>{new Date(inquiry.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            inquiry.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                            inquiry.status === 'In Progress' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                            inquiry.status === 'Contacted' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                            'bg-green-50 text-green-600 border-green-200'
                          }
                        >
                          {inquiry.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-center">
                <Button variant="outline">View All Inquiries</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Inquiry Analytics</CardTitle>
              <CardDescription>
                Overview of customer inquiry trends and sources
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-4">Inquiries by Service Type</h4>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="flex flex-col items-center text-gray-500">
                    <BarChart3 size={48} className="mb-2" />
                    <span>Chart would display here in a full implementation</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-4">Monthly Inquiry Trend</h4>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="flex flex-col items-center text-gray-500">
                    <LineChart size={48} className="mb-2" />
                    <span>Chart would display here in a full implementation</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AdminLoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a simplified authentication for demo purposes
    // In a real application, this would make an API request to authenticate
    setTimeout(() => {
      // For demo, hardcoded credentials (in a real app, never do this)
      if (credentials.username === 'admin' && credentials.password === 'password') {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        onLogin();
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-xl">AI</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
        <p className="text-gray-500">Enter your credentials to access the dashboard</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="admin"
                required
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Demo credentials: admin / password</p>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {isLoggedIn ? (
            <AdminDashboard />
          ) : (
            <AdminLoginForm onLogin={handleLogin} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
