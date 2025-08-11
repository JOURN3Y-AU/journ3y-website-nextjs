export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      assessment_responses: {
        Row: {
          ai_assessment_result: string | null
          ai_generation_status: string | null
          ai_prompt_used: string | null
          ai_raw_response: string | null
          company_name: string
          created_at: string
          email: string
          email_sent: boolean | null
          first_name: string
          id: string
          last_name: string
          notification_sent: boolean | null
          phone_number: string | null
          q1_business_challenge: string
          q2_time_waste: string
          q3_revenue: string
          q4_timeline: string
          q5_investment_priority: string
          q6_leadership_readiness: string
          session_id: string
          updated_at: string
        }
        Insert: {
          ai_assessment_result?: string | null
          ai_generation_status?: string | null
          ai_prompt_used?: string | null
          ai_raw_response?: string | null
          company_name: string
          created_at?: string
          email: string
          email_sent?: boolean | null
          first_name: string
          id?: string
          last_name: string
          notification_sent?: boolean | null
          phone_number?: string | null
          q1_business_challenge: string
          q2_time_waste: string
          q3_revenue: string
          q4_timeline: string
          q5_investment_priority: string
          q6_leadership_readiness: string
          session_id: string
          updated_at?: string
        }
        Update: {
          ai_assessment_result?: string | null
          ai_generation_status?: string | null
          ai_prompt_used?: string | null
          ai_raw_response?: string | null
          company_name?: string
          created_at?: string
          email?: string
          email_sent?: boolean | null
          first_name?: string
          id?: string
          last_name?: string
          notification_sent?: boolean | null
          phone_number?: string | null
          q1_business_challenge?: string
          q2_time_waste?: string
          q3_revenue?: string
          q4_timeline?: string
          q5_investment_priority?: string
          q6_leadership_readiness?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_responses_long: {
        Row: {
          ai_dashboard_data: Json | null
          ai_generation_status: string | null
          ai_prompt_used: string | null
          ai_raw_response: string | null
          ai_written_assessment: string | null
          company_name: string
          created_at: string
          email: string
          email_sent: boolean | null
          first_name: string
          id: string
          last_name: string
          notification_sent: boolean | null
          phone_number: string | null
          q1_company_size: string
          q10_change_appetite: string
          q11_success_metrics: string
          q12_information_challenges: string
          q13_knowledge_systems: string
          q14_search_efficiency: string
          q15_expertise_capture: string
          q16_collaboration_tools: string
          q17_data_quality: string
          q18_analytics_maturity: string
          q19_automation_level: string
          q2_industry_sector: string
          q20_technology_stack: string
          q21_ai_experience: string
          q22_implementation_timeline: string
          q23_role_specific: string
          q24_role_specific: string
          q3_annual_revenue: string
          q4_primary_business_model: string
          q5_geographic_footprint: string
          q6_business_priorities: string
          q7_competitive_differentiation: string
          q8_growth_challenges: string
          q9_technology_investment: string
          selected_role: string
          session_id: string
          updated_at: string
        }
        Insert: {
          ai_dashboard_data?: Json | null
          ai_generation_status?: string | null
          ai_prompt_used?: string | null
          ai_raw_response?: string | null
          ai_written_assessment?: string | null
          company_name: string
          created_at?: string
          email: string
          email_sent?: boolean | null
          first_name: string
          id?: string
          last_name: string
          notification_sent?: boolean | null
          phone_number?: string | null
          q1_company_size: string
          q10_change_appetite: string
          q11_success_metrics: string
          q12_information_challenges: string
          q13_knowledge_systems: string
          q14_search_efficiency: string
          q15_expertise_capture: string
          q16_collaboration_tools: string
          q17_data_quality: string
          q18_analytics_maturity: string
          q19_automation_level: string
          q2_industry_sector: string
          q20_technology_stack: string
          q21_ai_experience: string
          q22_implementation_timeline: string
          q23_role_specific: string
          q24_role_specific: string
          q3_annual_revenue: string
          q4_primary_business_model: string
          q5_geographic_footprint: string
          q6_business_priorities: string
          q7_competitive_differentiation: string
          q8_growth_challenges: string
          q9_technology_investment: string
          selected_role: string
          session_id: string
          updated_at?: string
        }
        Update: {
          ai_dashboard_data?: Json | null
          ai_generation_status?: string | null
          ai_prompt_used?: string | null
          ai_raw_response?: string | null
          ai_written_assessment?: string | null
          company_name?: string
          created_at?: string
          email?: string
          email_sent?: boolean | null
          first_name?: string
          id?: string
          last_name?: string
          notification_sent?: boolean | null
          phone_number?: string | null
          q1_company_size?: string
          q10_change_appetite?: string
          q11_success_metrics?: string
          q12_information_challenges?: string
          q13_knowledge_systems?: string
          q14_search_efficiency?: string
          q15_expertise_capture?: string
          q16_collaboration_tools?: string
          q17_data_quality?: string
          q18_analytics_maturity?: string
          q19_automation_level?: string
          q2_industry_sector?: string
          q20_technology_stack?: string
          q21_ai_experience?: string
          q22_implementation_timeline?: string
          q23_role_specific?: string
          q24_role_specific?: string
          q3_annual_revenue?: string
          q4_primary_business_model?: string
          q5_geographic_footprint?: string
          q6_business_priorities?: string
          q7_competitive_differentiation?: string
          q8_growth_challenges?: string
          q9_technology_investment?: string
          selected_role?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      assessment_responses_v2: {
        Row: {
          ai_dashboard_data: Json | null
          ai_generation_status: string | null
          ai_prompt_used: string | null
          ai_raw_response: string | null
          ai_written_assessment: string | null
          company_name: string
          company_size: string
          created_at: string
          email: string
          email_sent: boolean | null
          first_name: string
          id: string
          industry: string
          interested_in_conversation: boolean | null
          last_name: string
          notification_sent: boolean | null
          phone_number: string | null
          responses: Json
          selected_role: string
          session_id: string
          updated_at: string
        }
        Insert: {
          ai_dashboard_data?: Json | null
          ai_generation_status?: string | null
          ai_prompt_used?: string | null
          ai_raw_response?: string | null
          ai_written_assessment?: string | null
          company_name: string
          company_size: string
          created_at?: string
          email: string
          email_sent?: boolean | null
          first_name: string
          id?: string
          industry: string
          interested_in_conversation?: boolean | null
          last_name: string
          notification_sent?: boolean | null
          phone_number?: string | null
          responses?: Json
          selected_role: string
          session_id: string
          updated_at?: string
        }
        Update: {
          ai_dashboard_data?: Json | null
          ai_generation_status?: string | null
          ai_prompt_used?: string | null
          ai_raw_response?: string | null
          ai_written_assessment?: string | null
          company_name?: string
          company_size?: string
          created_at?: string
          email?: string
          email_sent?: boolean | null
          first_name?: string
          id?: string
          industry?: string
          interested_in_conversation?: boolean | null
          last_name?: string
          notification_sent?: boolean | null
          phone_number?: string | null
          responses?: Json
          selected_role?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      assessment_sessions: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          ip_address: unknown | null
          session_token: string
          started_at: string
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          session_token?: string
          started_at?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          session_token?: string
          started_at?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          category_id: string
          content: string
          created_at: string
          excerpt: string
          featured_on_homepage: boolean | null
          hashtags: string[] | null
          id: string
          image_url: string
          published_at: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category_id: string
          content: string
          created_at?: string
          excerpt: string
          featured_on_homepage?: boolean | null
          hashtags?: string[] | null
          id?: string
          image_url: string
          published_at?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          content?: string
          created_at?: string
          excerpt?: string
          featured_on_homepage?: boolean | null
          hashtags?: string[] | null
          id?: string
          image_url?: string
          published_at?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_leads: {
        Row: {
          additional_data: Json | null
          campaign_source: string
          company: string | null
          confirmation_sent: boolean | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          notification_sent: boolean | null
          phone: string | null
          service_type: string
          status: string | null
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_params: Json | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          additional_data?: Json | null
          campaign_source: string
          company?: string | null
          confirmation_sent?: boolean | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          notification_sent?: boolean | null
          phone?: string | null
          service_type: string
          status?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_params?: Json | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          additional_data?: Json | null
          campaign_source?: string
          company?: string | null
          confirmation_sent?: boolean | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          notification_sent?: boolean | null
          phone?: string | null
          service_type?: string
          status?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_params?: Json | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          description: string | null
          file_path: string
          file_size: number | null
          filename: string
          id: string
          mime_type: string | null
          original_filename: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          id?: string
          mime_type?: string | null
          original_filename: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          id?: string
          mime_type?: string | null
          original_filename?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          change_frequency: string
          created_at: string
          id: string
          is_published: boolean
          meta_description: string | null
          path: string
          priority: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          change_frequency?: string
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          path: string
          priority?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          change_frequency?: string
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          path?: string
          priority?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          created_at: string | null
          id: string
          image_url: string
          name: string
          order: number
          position: string
        }
        Insert: {
          bio: string
          created_at?: string | null
          id?: string
          image_url: string
          name: string
          order: number
          position: string
        }
        Update: {
          bio?: string
          created_at?: string | null
          id?: string
          image_url?: string
          name?: string
          order?: number
          position?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_campaign_lead_from_assessment: {
        Args: { assessment_response_id: string }
        Returns: string
      }
      create_campaign_lead_from_assessment_v2: {
        Args: { assessment_response_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
