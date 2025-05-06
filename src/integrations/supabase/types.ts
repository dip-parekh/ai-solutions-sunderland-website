export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_tags: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          author: string
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          description: string
          end_date: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          location: string
          registration_url: string | null
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          end_date: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location: string
          registration_url?: string | null
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          end_date?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string
          registration_url?: string | null
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string | null
          event_id: string | null
          id: string
          image_url: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          image_url: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          ai_category: string | null
          ai_sentiment: string | null
          ai_suggestion: string | null
          company: string | null
          created_at: string | null
          date: string | null
          email: string
          id: string
          job_title: string | null
          message: string
          name: string
          status: string | null
        }
        Insert: {
          ai_category?: string | null
          ai_sentiment?: string | null
          ai_suggestion?: string | null
          company?: string | null
          created_at?: string | null
          date?: string | null
          email: string
          id?: string
          job_title?: string | null
          message: string
          name: string
          status?: string | null
        }
        Update: {
          ai_category?: string | null
          ai_sentiment?: string | null
          ai_suggestion?: string | null
          company?: string | null
          created_at?: string | null
          date?: string | null
          email?: string
          id?: string
          job_title?: string | null
          message?: string
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          challenge: string | null
          client_name: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          industry: string
          is_featured: boolean | null
          results: string | null
          solution: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          challenge?: string | null
          client_name?: string | null
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          industry: string
          is_featured?: boolean | null
          results?: string | null
          solution?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          challenge?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          industry?: string
          is_featured?: boolean | null
          results?: string | null
          solution?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string | null
          created_at: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          name: string
          position: string | null
          quote: string
          rating: number | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name: string
          position?: string | null
          quote: string
          rating?: number | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name?: string
          position?: string | null
          quote?: string
          rating?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
