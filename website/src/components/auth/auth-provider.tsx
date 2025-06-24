'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string, csrfToken?: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName?: string, csrfToken?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If Supabase is not available, skip authentication
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      if (!supabase) return
      
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )

      return () => subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string, csrfToken?: string) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'x-csrf-token': csrfToken })
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      // Store CSRF token from response headers
      const responseCsrfToken = response.headers.get('x-csrf-token')
      if (responseCsrfToken) {
        localStorage.setItem('csrf-token', responseCsrfToken)
      }

      if (!response.ok) {
        return { error: data.error || 'Failed to sign in' }
      }

      // Update user state
      setUser(data.user)
      return { error: null }
    } catch (error) {
      return { error: 'Network error. Please try again.' }
    }
  }

  const signUp = async (email: string, password: string, fullName?: string, csrfToken?: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'x-csrf-token': csrfToken })
        },
        body: JSON.stringify({ email, password, fullName })
      })

      const data = await response.json()

      // Store CSRF token from response headers
      const responseCsrfToken = response.headers.get('x-csrf-token')
      if (responseCsrfToken) {
        localStorage.setItem('csrf-token', responseCsrfToken)
      }

      if (!response.ok) {
        return { error: data.error || 'Failed to create account' }
      }

      return { error: null }
    } catch (error) {
      return { error: 'Network error. Please try again.' }
    }
  }

  const signOut = async () => {
    if (!supabase) {
      return
    }
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    if (!supabase) {
      return { error: { message: 'Authentication is not available. Please set up Supabase credentials.' } }
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    return { error }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 