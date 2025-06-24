import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { withCSRF, setCSRFToken } from '@/lib/csrf'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function signupHandler(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error checking existing users:', listError)
      }
      return NextResponse.json(
        { error: 'Failed to check existing users' },
        { status: 500 }
      )
    }

    const userExists = existingUsers.users.some(user => user.email === email)
    if (userExists) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName || email.split('@')[0]
      }
    })

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Sign up error:', error)
      }

      // Handle specific Supabase errors
      if (error.message.includes('Password should be at least')) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long.' },
          { status: 400 }
        )
      } else if (error.message.includes('Invalid email')) {
        return NextResponse.json(
          { error: 'Please provide a valid email address.' },
          { status: 400 }
        )
      } else {
        return NextResponse.json(
          { error: 'Failed to create account. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Set CSRF token in response
    const sessionId = request.cookies.get('session')?.value || 'temp-session'
    const response = NextResponse.json(
      { 
        message: 'Account created successfully',
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name
        }
      },
      { status: 201 }
    )

    return setCSRFToken(response, sessionId)

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Sign up error:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const POST = withCSRF(signupHandler) 