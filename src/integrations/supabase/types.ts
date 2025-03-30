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
      appointments: {
        Row: {
          created_at: string
          date: string
          email: string
          id: string
          name: string
          time_slot: string
          topic: string | null
        }
        Insert: {
          created_at?: string
          date: string
          email: string
          id?: string
          name: string
          time_slot: string
          topic?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          email?: string
          id?: string
          name?: string
          time_slot?: string
          topic?: string | null
        }
        Relationships: []
      }
      community_groups: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          member_count: number | null
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          member_count?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          member_count?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string
          email: string | null
          id: number
          message: string | null
          name: string | null
          phone: string | null
          status: string | null
          subject: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
          phone?: string | null
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
          phone?: string | null
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      diaper_tracking: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          time: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          time?: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          time?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          category: string
          created_at: string
          description: string
          event_date: string
          id: string
          image_url: string | null
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          event_date: string
          id?: string
          image_url?: string | null
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          event_date?: string
          id?: string
          image_url?: string | null
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      feeding_tracking: {
        Row: {
          amount: string | null
          created_at: string
          duration: number | null
          id: string
          notes: string | null
          time: string
          type: string
          user_id: string
        }
        Insert: {
          amount?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          notes?: string | null
          time?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          notes?: string | null
          time?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      growth_tracking: {
        Row: {
          created_at: string
          date: string
          head_circumference: number | null
          height: number | null
          id: string
          notes: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          created_at?: string
          date?: string
          head_circumference?: number | null
          height?: number | null
          id?: string
          notes?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          head_circumference?: number | null
          height?: number | null
          id?: string
          notes?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      guides: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hydration_tracking: {
        Row: {
          created_at: string
          cups: number
          date: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          cups: number
          date?: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          cups?: number
          date?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      mom_profiles: {
        Row: {
          baby_birth_date: string | null
          baby_name: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          baby_birth_date?: string | null
          baby_name?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          baby_birth_date?: string | null
          baby_name?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      mood_tracking: {
        Row: {
          created_at: string
          date: string
          id: string
          mood: string
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          mood: string
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          mood?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      portfolio_achievements: {
        Row: {
          created_at: string
          description: string[]
          id: string
          link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string[]
          id?: string
          link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string[]
          id?: string
          link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_certifications: {
        Row: {
          created_at: string
          date: string
          id: string
          issuer: string
          name: string
          score: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          issuer: string
          name: string
          score?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          issuer?: string
          name?: string
          score?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_education: {
        Row: {
          created_at: string
          degree: string
          duration: string
          grade: string
          id: string
          institution: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          duration: string
          grade: string
          id?: string
          institution: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          duration?: string
          grade?: string
          id?: string
          institution?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_experiences: {
        Row: {
          company: string
          created_at: string
          description: string[]
          duration: string
          github_url: string | null
          id: string
          job_type: string
          location: string
          role: string
          technologies: string[]
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string[]
          duration: string
          github_url?: string | null
          id?: string
          job_type: string
          location: string
          role: string
          technologies: string[]
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string[]
          duration?: string
          github_url?: string | null
          id?: string
          job_type?: string
          location?: string
          role?: string
          technologies?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          created_at: string
          description: string
          featured: boolean | null
          github_url: string
          id: string
          image_url: string | null
          live_url: string | null
          technologies: string[]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          featured?: boolean | null
          github_url: string
          id?: string
          image_url?: string | null
          live_url?: string | null
          technologies: string[]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          featured?: boolean | null
          github_url?: string
          id?: string
          image_url?: string | null
          live_url?: string | null
          technologies?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_skill_categories: {
        Row: {
          category: string
          created_at: string
          id: string
          skills: string[]
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          skills: string[]
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          skills?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_social_links: {
        Row: {
          created_at: string
          icon: string
          id: string
          platform: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          icon: string
          id?: string
          platform: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          platform?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string
          discount_price: number | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          discount_price?: number | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          discount_price?: number | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          baby_birthday: string | null
          bio: string | null
          created_at: string
          first_name: string | null
          id: string
          interests: string[] | null
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          baby_birthday?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          interests?: string[] | null
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          baby_birthday?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          interests?: string[] | null
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      qa_sessions: {
        Row: {
          created_at: string
          description: string
          duration: number
          expert_name: string
          expert_title: string
          id: string
          image_url: string | null
          join_link: string | null
          max_participants: number | null
          session_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          duration: number
          expert_name: string
          expert_title: string
          id?: string
          image_url?: string | null
          join_link?: string | null
          max_participants?: number | null
          session_date: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          duration?: number
          expert_name?: string
          expert_title?: string
          id?: string
          image_url?: string | null
          join_link?: string | null
          max_participants?: number | null
          session_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sleep_tracking: {
        Row: {
          created_at: string
          date: string
          hours: number
          id: string
          quality: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          hours: number
          id?: string
          quality: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          hours?: number
          id?: string
          quality?: string
          user_id?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
