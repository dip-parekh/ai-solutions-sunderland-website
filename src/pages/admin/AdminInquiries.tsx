
import React, { useState } from 'react';
import { useAdminData } from '@/hooks/use-admin-data';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Inquiry } from '@/types/database';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const statusColors: Record<string, string> = {
  new: 'bg-blue-500',
  'in-progress': 'bg-yellow-500',
  resolved: 'bg-green-500',
  archived: 'bg-gray-500'
};

const AdminInquiries: React.FC = () => {
  const { data: inquiries, isLoading, refetch } = useAdminData<Inquiry>('inquiries');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const { toast } = useToast();
  
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Status updated",
        description: `Inquiry status changed to ${newStatus}.`
      });
      
      refetch();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to update status"
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Inquiries</h1>
      
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No inquiries found
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">
                      {inquiry.name}
                      <div className="text-sm text-gray-500">{inquiry.email}</div>
                    </TableCell>
                    <TableCell className="max-w-md truncate">{inquiry.message}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[inquiry.status || 'new']}`}>
                        {inquiry.status || 'new'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {inquiry.created_at ? 
                        formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true }) : 
                        'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => handleStatusChange(
                          inquiry.id, 
                          inquiry.status === 'new' ? 'in-progress' : 'resolved'
                        )}
                      >
                        {inquiry.status === 'new' ? 'Mark In Progress' : 
                         inquiry.status === 'in-progress' ? 'Resolve' : 'Archive'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Inquiry Detail Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedInquiry.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{selectedInquiry.email}</p>
                </div>
                {selectedInquiry.company && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Company</h3>
                    <p>{selectedInquiry.company}</p>
                  </div>
                )}
                {selectedInquiry.job_title && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Job Title</h3>
                    <p>{selectedInquiry.job_title}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <Badge className={`mt-1 ${statusColors[selectedInquiry.status || 'new']}`}>
                    {selectedInquiry.status || 'new'}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>
                    {selectedInquiry.created_at ? 
                      new Date(selectedInquiry.created_at).toLocaleString() : 
                      'N/A'}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <p className="mt-1 whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                {selectedInquiry.status !== 'resolved' && (
                  <Button 
                    onClick={() => {
                      handleStatusChange(selectedInquiry.id, 'resolved');
                      setSelectedInquiry(null);
                    }}
                  >
                    Mark as Resolved
                  </Button>
                )}
                {selectedInquiry.status !== 'archived' && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleStatusChange(selectedInquiry.id, 'archived');
                      setSelectedInquiry(null);
                    }}
                  >
                    Archive
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInquiries;
