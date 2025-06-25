import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { withCSRF } from '@/lib/csrf'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function usersHandler(request: NextRequest) {
  try {
    const { data: users, error } = await supabase.auth.admin.listUsers()

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching users:', error)
      }
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      )
    }

    // Filter out sensitive information
    const safeUsers = users.users.map(user => ({
      id: user.id,
      email: user.email,
      fullName: user.user_metadata?.full_name || 'N/A',
      createdAt: user.created_at,
      lastSignIn: user.last_sign_in_at,
      isConfirmed: user.email_confirmed_at !== null
    }))

    return NextResponse.json({ users: safeUsers })

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Users API error:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const GET = withCSRF(usersHandler)

export async function POST(request: NextRequest) {
  try {
    const { email, username, role = 'admin' } = await request.json()

    if (!email || !username) {
      return NextResponse.json(
        { error: 'Email and username are required' },
        { status: 400 }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      )
    }

    // Insert new admin user
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email,
        username,
        role,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating admin user:', error)
      return NextResponse.json(
        { error: 'Failed to create admin user' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
} 