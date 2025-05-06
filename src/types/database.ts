
export interface Project {
  id: string;
  title: string;
  description: string;
  industry: string;
  challenge?: string;
  solution?: string;
  results?: string;
  image_url?: string;
  client_name?: string;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  position?: string;
  quote: string;
  rating?: number;
  image_url?: string;
  is_featured?: boolean;
  created_at?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  published_at?: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  image_url?: string;
  registration_url?: string;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryImage {
  id: string;
  event_id: string;
  image_url: string;
  caption?: string;
  alt_text?: string;
  created_at?: string;
}

export interface AITag {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at?: string;
}

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
