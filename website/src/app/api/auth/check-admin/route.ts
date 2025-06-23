import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      )
    }

    // Query the admin_users table to check if user is admin
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, role, is_active')
      .eq('id', userId)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - user is not admin
        return NextResponse.json({ isAdmin: false })
      }
      throw error
    }

    return NextResponse.json({
      isAdmin: true,
      role: data.role,
      isActive: data.is_active
    })

  } catch (error) {
    console.error('Error checking admin status:', error)
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    )
  }
} 