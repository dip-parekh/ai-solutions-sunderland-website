
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Inquiry } from "@/types/database";

interface RecentActivityProps {
  inquiries?: Inquiry[];
  isLoading?: boolean;
}

export const RecentActivity = ({ inquiries = [], isLoading = false }: RecentActivityProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/inquiries">View All</Link>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : inquiries.length > 0 ? (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-700 p-2 rounded-full mr-3">
                  <MessageSquare size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-sm text-gray-600">{inquiry.company || 'No company provided'}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                      inquiry.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{inquiry.message}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    <span>{formatDate(inquiry.date as string)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="mx-auto h-8 w-8 text-gray-300 mb-2" />
          <p>No recent inquiries</p>
        </div>
      )}
    </div>
  );
};
