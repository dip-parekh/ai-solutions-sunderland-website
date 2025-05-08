
import { Button } from "@/components/ui/button";
import { Inquiry } from "@/types/database";

interface InquiriesTableProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  filteredInquiries: Inquiry[];
  handleViewInquiry: (inquiry: Inquiry) => void;
  handleExportCSV: () => void;
}

export const InquiriesTable = ({ 
  selectedCategory, 
  setSelectedCategory, 
  filteredInquiries, 
  handleViewInquiry,
  handleExportCSV
}: InquiriesTableProps) => {
  return (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.company}</td>
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
  );
};
