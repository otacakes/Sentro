import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Only log in development environment
  if (process.env.NODE_ENV === 'development') {
    console.warn('Supabase credentials not found. Authentication features will be disabled.')
    console.warn('To enable authentication, create a .env.local file with:')
    console.warn('NEXT_PUBLIC_SUPABASE_URL=your_project_url')
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key')
  }
}

// Create Supabase client with fallback for missing credentials
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      favorite_locations: {
        Row: {
          id: string
          user_id: string
          name: string
          address: string | null
          lat: number
          lng: number
          category: 'home' | 'work' | 'school' | 'other'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          address?: string | null
          lat: number
          lng: number
          category?: 'home' | 'work' | 'school' | 'other'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          address?: string | null
          lat?: number
          lng?: number
          category?: 'home' | 'work' | 'school' | 'other'
          created_at?: string
        }
      }
      search_history: {
        Row: {
          id: string
          user_id: string
          name: string
          address: string | null
          lat: number
          lng: number
          search_count: number
          last_searched: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          address?: string | null
          lat: number
          lng: number
          search_count?: number
          last_searched?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          address?: string | null
          lat?: number
          lng?: number
          search_count?: number
          last_searched?: string
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          username: string
          role: 'admin' | 'super_admin'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          role?: 'admin' | 'super_admin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          role?: 'admin' | 'super_admin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 