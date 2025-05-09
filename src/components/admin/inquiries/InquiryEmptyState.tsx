
interface InquiryEmptyStateProps {
  statusFilter: string;
}

export const InquiryEmptyState = ({ statusFilter }: InquiryEmptyStateProps) => {
  return (
    <div className="text-center p-12 bg-gray-50 rounded-lg">
      <h3 className="mt-2 text-sm font-medium text-gray-900">No inquiries found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {statusFilter !== 'all' 
          ? `No inquiries with status "${statusFilter}" found. Try changing your filter.` 
          : "No customer inquiries have been received yet."}
      </p>
    </div>
  );
};
