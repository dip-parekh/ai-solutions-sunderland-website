
import { useState } from 'react';
import { InquiryDetailsModal } from './InquiryDetailsModal';
import { Inquiry } from '@/types/database';
import { InquiriesTable } from './InquiriesTable';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface InquiryViewProps {
  inquiries: Inquiry[];
  isLoading: boolean;
  onExportCSV: () => void;
}

export const InquiryView = ({ inquiries, isLoading, onExportCSV }: InquiryViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const filteredInquiries = selectedCategory
    ? inquiries.filter(inquiry => inquiry.ai_category === selectedCategory)
    : inquiries;

  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Show success toast
      toast({
        title: "Status Updated",
        description: `Inquiry status has been changed to ${status}.`,
      });
      
      return Promise.resolve();
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: error.message || "Failed to update status"
      });
      return Promise.reject(error);
    }
  };

  return (
    <>
      <InquiriesTable 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filteredInquiries={filteredInquiries}
        handleViewInquiry={handleViewInquiry}
        handleExportCSV={onExportCSV}
        isLoading={isLoading}
      />
      
      {isDetailsModalOpen && selectedInquiry && (
        <InquiryDetailsModal 
          inquiry={selectedInquiry}
          onClose={() => setIsDetailsModalOpen(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
};
