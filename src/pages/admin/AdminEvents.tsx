
import React, { useState } from 'react';
import { useAdminContent } from '@/hooks/useAdminContent';
import { Event } from '@/types/database';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit, Star, Trash } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import EventForm from '@/components/admin/EventForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';

const AdminEvents: React.FC = () => {
  const { items: events, isLoading, createItem, updateItem, deleteItem, toggleFeatured } = 
    useAdminContent<Event>('events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setIsConfirmDeleteOpen(false);
    setEventToDelete(null);
  };

  const confirmDelete = (id: string) => {
    setEventToDelete(id);
    setIsConfirmDeleteOpen(true);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button onClick={() => setIsCreateDrawerOpen(true)}>
          Create Event
        </Button>
      </div>

      <Card>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No events found
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">
                      {event.title}
                    </TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          {format(new Date(event.start_date), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {event.is_featured ? 
                        <Badge className="bg-yellow-500">Featured</Badge> : 
                        <Badge variant="outline">No</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFeatured(event.id, !event.is_featured)}
                      >
                        <Star className={`h-4 w-4 ${event.is_featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(event.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Create Event Drawer */}
      <Drawer open={isCreateDrawerOpen} onOpenChange={setIsCreateDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create Event</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <EventForm
              onSubmit={async (data) => {
                await createItem(data);
                setIsCreateDrawerOpen(false);
              }}
              onCancel={() => setIsCreateDrawerOpen(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Edit Event Drawer */}
      <Drawer open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Event</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            {selectedEvent && (
              <EventForm
                event={selectedEvent}
                onSubmit={async (data) => {
                  await updateItem(selectedEvent.id, data);
                  setSelectedEvent(null);
                }}
                onCancel={() => setSelectedEvent(null)}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Confirm Delete Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this event? This action cannot be undone.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => eventToDelete && handleDelete(eventToDelete)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
