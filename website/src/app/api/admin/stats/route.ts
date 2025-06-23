import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      )
    }

    // Get total users count
    const { count: totalUsers, error: usersError } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })

    if (usersError) {
      console.error('Error fetching users count:', usersError)
    }

    // Get total locations count
    const { count: totalLocations, error: locationsError } = await supabase
      .from('favorite_locations')
      .select('*', { count: 'exact', head: true })

    if (locationsError) {
      console.error('Error fetching locations count:', locationsError)
    }

    // Get total search history count (as a proxy for active users)
    const { count: totalSearches, error: searchesError } = await supabase
      .from('search_history')
      .select('*', { count: 'exact', head: true })

    if (searchesError) {
      console.error('Error fetching search history count:', searchesError)
    }

    // For now, we'll use mock data for alerts since we don't have an alerts table yet
    const totalAlerts = 5 // Mock data

    const stats = {
      totalUsers: totalUsers || 0,
      activeUsers: totalSearches || 0, // Using search history as proxy for active users
      totalLocations: totalLocations || 0,
      totalAlerts: totalAlerts
    }

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    )
  }
} 