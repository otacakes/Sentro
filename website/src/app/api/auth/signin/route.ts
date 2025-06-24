import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { withCSRF, setCSRFToken } from '@/lib/csrf'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function signinHandler(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Sign in user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Sign in error:', error)
      }

      // Handle specific Supabase errors
      if (error.message.includes('Invalid login credentials')) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      } else if (error.message.includes('Email not confirmed')) {
        return NextResponse.json(
          { error: 'Please confirm your email address before signing in' },
          { status: 401 }
        )
      } else {
        return NextResponse.json(
          { error: 'Failed to sign in. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Set CSRF token in response
    const sessionId = request.cookies.get('session')?.value || 'temp-session'
    const response = NextResponse.json(
      { 
        message: 'Signed in successfully',
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name
        }
      },
      { status: 200 }
    )

    return setCSRFToken(response, sessionId)

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Sign in error:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const POST = withCSRF(signinHandler) 