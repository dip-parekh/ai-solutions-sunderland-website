
import { Button } from "@/components/ui/button";
import { Inquiry } from "@/types/database";
import { useState } from "react";
import { Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InquiriesTableProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  filteredInquiries: Inquiry[];
  handleViewInquiry: (inquiry: Inquiry) => void;
  handleExportCSV: () => void;
  isLoading?: boolean;
}

export const InquiriesTable = ({ 
  selectedCategory, 
  setSelectedCategory, 
  filteredInquiries, 
  handleViewInquiry,
  handleExportCSV,
  isLoading = false
}: InquiriesTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter inquiries further by search term
  const searchFilteredInquiries = filteredInquiries.filter(inquiry =>
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inquiry.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inquiry.message || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Inquiry Management</h2>
          <Button onClick={handleExportCSV} className="flex items-center">
            <Download size={16} className="mr-2" /> Export CSV
          </Button>
        </div>
        
        {/* Search and Filter */}
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
              variant={!selectedCategory ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            <Button 
              variant={selectedCategory === 'Sales' ? "default" : "outline"}
              onClick={() => setSelectedCategory('Sales')}
            >
              Sales
            </Button>
            <Button 
              variant={selectedCategory === 'Support' ? "default" : "outline"}
              onClick={() => setSelectedCategory('Support')}
            >
              Support
            </Button>
            <Button 
              variant={selectedCategory === 'Partnerships' ? "default" : "outline"}
              onClick={() => setSelectedCategory('Partnerships')}
            >
              Partnerships
            </Button>
          </div>
        </div>
      </div>
      
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
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </td>
              </tr>
            ) : searchFilteredInquiries.length > 0 ? (
              searchFilteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {typeof inquiry.date === 'string' 
                      ? new Date(inquiry.date).toLocaleDateString() 
                      : new Date(inquiry.date).toLocaleDateString()}
                  </td>
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
                    {inquiry.ai_category || 'Not Categorized'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {inquiry.ai_sentiment && (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${inquiry.ai_sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                          inquiry.ai_sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {inquiry.ai_sentiment.charAt(0).toUpperCase() + inquiry.ai_sentiment.slice(1)}
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
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  {searchTerm || selectedCategory 
                    ? 'No inquiries match your search criteria.' 
                    : 'No inquiries found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
