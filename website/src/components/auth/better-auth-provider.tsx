'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  full_name?: string
  created_at: string
}

interface BetterAuthContextType {
  user: User | null
  session: any
  loading: boolean
  signIn: (email: string, password: string, csrfToken?: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName?: string, csrfToken?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const BetterAuthContext = createContext<BetterAuthContextType | undefined>(undefined)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function BetterAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        full_name: session.user.user_metadata?.full_name,
        created_at: session.user.created_at
      } : null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ? {
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata?.full_name,
          created_at: session.user.created_at
        } : null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignIn = async (email: string, password: string, csrfToken?: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        let errorMessage = error.message
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.'
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address before signing in.'
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many login attempts. Please wait a moment before trying again.'
        } else if (error.message.includes('User not found')) {
          errorMessage = 'No account found with this email address. Please sign up to create an account.'
        }
        
        return { error: { message: errorMessage } }
      }

      return { error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: { message: 'Sign in failed. Please try again.' } }
    }
  }

  const handleSignUp = async (email: string, password: string, fullName?: string, csrfToken?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      })

      if (error) {
        let errorMessage = error.message
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.'
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long.'
        }
        
        return { error: { message: errorMessage } }
      }

      return { error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: { message: 'Sign up failed. Please try again.' } }
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        return { error: { message: error.message } }
      }

      return { error: null }
    } catch (error) {
      return { error: { message: 'Password reset failed' } }
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
  }

  return (
    <BetterAuthContext.Provider value={value}>
      {children}
    </BetterAuthContext.Provider>
  )
}

export function useBetterAuth() {
  const context = useContext(BetterAuthContext)
  if (context === undefined) {
    throw new Error('useBetterAuth must be used within a BetterAuthProvider')
  }
  return context
} 