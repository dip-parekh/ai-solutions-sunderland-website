
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { Article, Event, Project, Testimonial, GalleryImage } from '@/types/database';

type ContentType = 'projects' | 'testimonials' | 'articles' | 'events' | 'gallery_images';
type ContentItem = Project | Testimonial | Article | Event | GalleryImage;

export function useAdminContent<T extends ContentItem>(contentType: ContentType) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from(contentType)
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setItems(data as T[]);
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: `Error fetching ${contentType}`,
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const createItem = async (item: Partial<T>) => {
    try {
      const { data, error } = await supabase
        .from(contentType)
        .insert([item as any])
        .select()
        .single();
      
      if (error) throw error;
      
      setItems(prev => [data as T, ...prev]);
      
      toast({
        title: "Item created",
        description: `New ${contentType.slice(0, -1)} has been successfully created.`,
      });
      
      return data as T;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: `Error creating ${contentType.slice(0, -1)}`,
        description: err.message,
      });
      throw err;
    }
  };
  
  const updateItem = async (id: string, updates: Partial<T>) => {
    try {
      const { data, error } = await supabase
        .from(contentType)
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      setItems(prev => prev.map(item => item.id === id ? (data as T) : item));
      
      toast({
        title: "Item updated",
        description: `${contentType.slice(0, -1).charAt(0).toUpperCase() + contentType.slice(0, -1).slice(1)} has been successfully updated.`,
      });
      
      return data as T;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: `Error updating ${contentType.slice(0, -1)}`,
        description: err.message,
      });
      throw err;
    }
  };
  
  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from(contentType)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Item deleted",
        description: `${contentType.slice(0, -1).charAt(0).toUpperCase() + contentType.slice(0, -1).slice(1)} has been successfully deleted.`,
      });
      
      return true;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: `Error deleting ${contentType.slice(0, -1)}`,
        description: err.message,
      });
      throw err;
    }
  };
  
  const toggleFeatured = async (id: string, isFeatured: boolean): Promise<void> => {
    await updateItem(id, { is_featured: isFeatured } as unknown as Partial<T>);
  };

  // Set up real-time listener for data changes
  useEffect(() => {
    fetchItems();
    
    // Set up real-time listener
    const channel = supabase.channel(`${contentType}-changes`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: contentType
      }, () => {
        fetchItems();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [contentType]);

  return {
    items,
    isLoading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    toggleFeatured,
    refetch: fetchItems
  };
}
