
import React from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Inquiry } from '@/types/database';
import { X } from 'lucide-react';

export interface InquiryDetailsModalProps {
  inquiry: Inquiry;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => Promise<void>;
}

export const InquiryDetailsModal = ({ inquiry, onClose, onStatusChange }: InquiryDetailsModalProps) => {
  const statusOptions = [
    { label: 'New', value: 'new' },
    { label: 'In Progress', value: 'in progress' },
    { label: 'Completed', value: 'completed' }
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not specified';
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="relative">
          <DialogTitle className="mb-4">Inquiry Details</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="absolute right-0 top-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{inquiry.name}</h3>
              <p className="text-sm text-gray-500">{inquiry.email}</p>
              {inquiry.company && <p className="text-sm text-gray-500">{inquiry.company}</p>}
            </div>
            <div className="flex-shrink-0">
              <Select
                value={inquiry.status || 'new'}
                onValueChange={(value) => onStatusChange(inquiry.id, value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Set status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm py-4 border-t border-b">
            <div>
              <p className="text-gray-500">Date Submitted</p>
              <p>{formatDate(inquiry.date)}</p>
            </div>
            <div>
              <p className="text-gray-500">AI Category</p>
              <p>{inquiry.ai_category || 'Not categorized'}</p>
            </div>
            <div>
              <p className="text-gray-500">AI Sentiment</p>
              <p>{inquiry.ai_sentiment || 'Not analyzed'}</p>
            </div>
            <div>
              <p className="text-gray-500">Job Title</p>
              <p>{inquiry.job_title || 'Not specified'}</p>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Message:</p>
            <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
              {inquiry.message}
            </div>
          </div>

          {inquiry.ai_suggestion && (
            <div>
              <p className="font-medium mb-2">AI Suggestion:</p>
              <div className="bg-blue-50 p-4 rounded-md">
                {inquiry.ai_suggestion}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
