
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
  id: number;
  name: string;
  email: string;
  companyName?: string;
  company?: string;
  message: string;
  date: string;
  status: 'new' | 'in progress' | 'completed';
  jobTitle?: string;
  aiCategory?: string;
  aiSentiment?: 'positive' | 'negative' | 'neutral';
  aiSuggestion?: string;
}
