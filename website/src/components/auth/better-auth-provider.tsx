'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { signIn, signOut } from 'next-auth/react'

interface BetterAuthContextType {
  user: any
  session: any
  loading: boolean
  signIn: (email: string, password: string, csrfToken?: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName?: string, csrfToken?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const BetterAuthContext = createContext<BetterAuthContextType | undefined>(undefined)

export function BetterAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch session on client side
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        
        if (!response.ok) {
          console.error('Session response not ok:', response.status, response.statusText)
          setSession(null)
          return
        }
        
        const text = await response.text()
        
        if (!text || text.trim() === '') {
          console.log('Empty session response')
          setSession(null)
          return
        }
        
        try {
          const sessionData = JSON.parse(text)
          setSession(sessionData)
        } catch (parseError) {
          console.error('Failed to parse session JSON:', parseError, 'Response text:', text)
          setSession(null)
        }
      } catch (error) {
        console.error('Failed to fetch session:', error)
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  const handleSignIn = async (email: string, password: string, csrfToken?: string) => {
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

      // Refresh session after successful sign in
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const text = await response.text()
          if (text && text.trim() !== '') {
            try {
              const sessionData = JSON.parse(text)
              setSession(sessionData)
            } catch (parseError) {
              console.error('Failed to parse session JSON after sign in:', parseError)
            }
          }
        }
      } catch (sessionError) {
        console.error('Failed to refresh session after sign in:', sessionError)
      }

      return { error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: { message: 'Sign in failed. Please try again.' } }
    }
  }

  const handleSignUp = async (email: string, password: string, fullName?: string, csrfToken?: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'x-csrf-token': csrfToken })
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

      // Refresh session after successful sign up and sign in
      try {
        const sessionResponse = await fetch('/api/auth/session')
        if (sessionResponse.ok) {
          const text = await sessionResponse.text()
          if (text && text.trim() !== '') {
            try {
              const sessionData = JSON.parse(text)
              setSession(sessionData)
            } catch (parseError) {
              console.error('Failed to parse session JSON after sign up:', parseError)
            }
          }
        }
      } catch (sessionError) {
        console.error('Failed to refresh session after sign up:', sessionError)
      }

      return { error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: { message: 'Sign up failed. Please try again.' } }
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setSession(null)
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