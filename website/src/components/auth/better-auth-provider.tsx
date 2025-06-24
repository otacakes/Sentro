'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  fullName?: string
}

interface BetterAuthContextType {
  user: User | null
  session: any
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const BetterAuthContext = createContext<BetterAuthContextType | undefined>(undefined)

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export function BetterAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          fullName: session.user.user_metadata?.full_name
        })
        setSession(session)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name
          })
          setSession(session)
        } else {
          setUser(null)
          setSession(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: { message: 'Authentication not configured' } }
    }

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
        }
        
        return { error: { message: errorMessage } }
      }

      return { error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: { message: 'Sign in failed. Please try again.' } }
    }
  }

  const handleSignUp = async (email: string, password: string, fullName?: string) => {
    if (!supabase) {
      return { error: { message: 'Authentication not configured' } }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        let errorMessage = error.message
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.'
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long.'
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.'
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
    if (!supabase) return
    
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleResetPassword = async (email: string) => {
    if (!supabase) {
      return { error: { message: 'Authentication not configured' } }
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      
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