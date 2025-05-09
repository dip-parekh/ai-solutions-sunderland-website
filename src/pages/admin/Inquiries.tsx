
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { InquiryDetailsModal } from '@/components/admin/dashboard/InquiryDetailsModal';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { Inquiry } from '@/types/database';
import { useInquiries } from '@/hooks/useInquiries';
import { InquiryFilters } from '@/components/admin/inquiries/InquiryFilters';
import { InquiriesTable } from '@/components/admin/inquiries/InquiriesTable';

const Inquiries = () => {
  const { 
    inquiries, 
    isLoading, 
    statusFilter, 
    setStatusFilter, 
    updateInquiryStatus, 
    exportToCSV 
  } = useInquiries();
  
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailsModalOpen(true);
  };

  return (
    <AdminLayout title="Inquiries">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Inquiries</h1>
        <div className="flex space-x-3">
          <InquiryFilters 
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          
          <Button onClick={exportToCSV} variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <InquiriesTable
        inquiries={inquiries}
        isLoading={isLoading}
        statusFilter={statusFilter}
        updateInquiryStatus={updateInquiryStatus}
        handleViewInquiry={handleViewInquiry}
      />
      
      {isDetailsModalOpen && selectedInquiry && (
        <InquiryDetailsModal
          inquiry={selectedInquiry}
          onClose={() => setIsDetailsModalOpen(false)}
          onStatusChange={updateInquiryStatus}
        />
      )}
    </AdminLayout>
  );
};

export default Inquiries;
