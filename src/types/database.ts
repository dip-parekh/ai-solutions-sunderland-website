
// These types are for our internal use and will be compatible with what comes from Supabase
import { Database } from '@/integrations/supabase/types';

// Type aliases that match the structure from Supabase but with our preferred field naming
export type Project = Database['public']['Tables']['projects']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type Article = Database['public']['Tables']['articles']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type GalleryImage = Database['public']['Tables']['gallery_images']['Row'];
export type AITag = Database['public']['Tables']['ai_tags']['Row'];

export interface Inquiry {
  id: string; // Changed from number to string to match UUID format
  name: string;
  email: string;
  company?: string; // Simple company field from database
  message: string;
  date: string;
  status: 'new' | 'in progress' | 'completed';
  job_title?: string; // Changed from camelCase to snake_case to match database
  ai_category?: string; // Changed from camelCase to snake_case to match database
  ai_sentiment?: 'positive' | 'negative' | 'neutral';
  ai_suggestion?: string; // Changed from camelCase to snake_case to match database
}
