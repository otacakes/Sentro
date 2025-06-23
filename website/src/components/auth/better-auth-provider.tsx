'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session } from 'next-auth'
import { useSession, signIn, signOut } from 'next-auth/react'

interface BetterAuthContextType {
  user: any
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const BetterAuthContext = createContext<BetterAuthContextType | undefined>(undefined)

export function BetterAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(status === 'loading')
  }, [status])

  const handleSignIn = async (email: string, password: string) => {
    try {
      const result = await signIn('supabase', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        // Handle specific NextAuth error types
        let errorMessage = result.error
        
        if (result.error === 'Configuration') {
          errorMessage = 'Authentication configuration error. Please check the server logs and ensure all required environment variables (like NEXTAUTH_SECRET, SUPABASE_URL, etc.) are set correctly in your .env.local file.'
        } else if (result.error === 'CredentialsSignin') {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.'
        } else if (result.error.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.'
        } else if (result.error.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address before signing in.'
        } else if (result.error.includes('Too many requests')) {
          errorMessage = 'Too many login attempts. Please wait a moment before trying again.'
        } else if (result.error.includes('User not found')) {
          errorMessage = 'No account found with this email address. Please sign up to create an account.'
        } else if (result.error.includes('Please provide both email and password')) {
          errorMessage = 'Please provide both email and password.'
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
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: { message: data.error || 'Sign up failed' } }
      }

      // If sign-up is successful, automatically sign in the user
      const signInResult = await signIn('supabase', {
        email,
        password,
        redirect: false,
      })

      if (signInResult?.error) {
        // Sign-up succeeded but sign-in failed - user should try signing in manually
        return { 
          error: { 
            message: 'Account created successfully! Please sign in with your new credentials.' 
          } 
        }
      }

      return { error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: { message: 'Sign up failed. Please try again.' } }
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const handleResetPassword = async (email: string) => {
    try {
      // This would need to be implemented with a custom endpoint
      return { error: { message: 'Password reset not implemented yet' } }
    } catch (error) {
      return { error: { message: 'Password reset failed' } }
    }
  }

  const value = {
    user: session?.user || null,
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