import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { withCSRF } from '@/lib/csrf'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function statsHandler(request: NextRequest) {
  try {
    // Get user statistics
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
    
    if (usersError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching users for stats:', usersError)
      }
      return NextResponse.json(
        { error: 'Failed to fetch user statistics' },
        { status: 500 }
      )
    }

    const totalUsers = users.users.length
    const confirmedUsers = users.users.filter(user => user.email_confirmed_at !== null).length
    const recentUsers = users.users.filter(user => {
      const createdAt = new Date(user.created_at)
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return createdAt > oneWeekAgo
    }).length

    const stats = {
      totalUsers,
      confirmedUsers,
      pendingUsers: totalUsers - confirmedUsers,
      recentUsers,
      confirmationRate: totalUsers > 0 ? Math.round((confirmedUsers / totalUsers) * 100) : 0
    }

    return NextResponse.json({ stats })

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Stats API error:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const GET = withCSRF(statsHandler) 