
import { Button } from "@/components/ui/button";
import { Inquiry } from "@/types/database";
import { Info, X } from "lucide-react";

interface InquiryDetailsModalProps {
  inquiry: Inquiry;
  onClose: () => void;
}

export const InquiryDetailsModal = ({ inquiry, onClose }: InquiryDetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">Inquiry Details</h3>
            <button 
              onClick={onClose}
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
                  <p className="font-medium">{inquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{inquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{inquiry.company || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="font-medium">{inquiry.job_title || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Inquiry Details</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Date Submitted</p>
                  <p className="font-medium">{inquiry.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
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
                </div>
                <div>
                  <p className="text-sm text-gray-500">AI Category</p>
                  <p className="font-medium">{inquiry.ai_category || 'Not Categorized'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sentiment</p>
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
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Message</h4>
            <div className="bg-gray-50 p-4 rounded border">
              <p>{inquiry.message || 'No message provided.'}</p>
            </div>
          </div>
          
          {inquiry.ai_suggestion && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <Info size={16} className="mr-1 text-blue-600" />
                AI-Generated Suggestion
              </h4>
              <div className="bg-blue-50 p-4 rounded border border-blue-100 text-blue-800">
                <p>{inquiry.ai_suggestion}</p>
              </div>
            </div>
          )}
          
          <div className="border-t pt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button>Update Status</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
