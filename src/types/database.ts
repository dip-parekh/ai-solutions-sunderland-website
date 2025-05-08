
// These types are for our internal use and will be compatible with what comes from Supabase
import { Database } from '@/integrations/supabase/types';

// Type aliases that match the structure from Supabase but with our preferred field naming
export type Project = Database['public']['Tables']['projects']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type Article = Database['public']['Tables']['articles']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type GalleryImage = Database['public']['Tables']['gallery_images']['Row'];
export type AITag = Database['public']['Tables']['ai_tags']['Row'];

// Updated Inquiry type to be compatible with both our database schema and UI needs
export interface Inquiry {
  id: string; 
  name: string;
  email: string;
  company?: string; 
  message: string;
  date: string | null;
  // Updated to accept any string but with preferred values defined
  status: string;
  job_title?: string; 
  ai_category?: string; 
  ai_sentiment?: string;
  ai_suggestion?: string;
  
  // Add created_at to match database schema
  created_at?: string;
}
