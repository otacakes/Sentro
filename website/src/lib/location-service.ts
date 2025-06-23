import { supabase } from './supabase'
import type { Location } from '@/types'

export interface FavoriteLocation {
  id: string
  user_id: string
  name: string
  address: string | null
  lat: number
  lng: number
  category: 'home' | 'work' | 'school' | 'other'
  created_at: string
}

export interface SearchHistoryItem {
  id: string
  user_id: string
  name: string
  address: string | null
  lat: number
  lng: number
  search_count: number
  last_searched: string
  created_at: string
}

export class LocationService {
  // Favorite Locations
  static async getFavoriteLocations(userId: string): Promise<FavoriteLocation[]> {
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase not available. Returning empty favorite locations.')
      }
      return []
    }

    const { data, error } = await supabase
      .from('favorite_locations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching favorite locations:', error)
      }
      throw error
    }

    return data || []
  }

  static async addFavoriteLocation(
    userId: string,
    location: Omit<Location, 'address'> & { address?: string },
    category: 'home' | 'work' | 'school' | 'other' = 'other'
  ): Promise<FavoriteLocation> {
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase not available. Cannot add favorite location.')
      }
      throw new Error('Database not available')
    }

    const { data, error } = await supabase
      .from('favorite_locations')
      .insert({
        user_id: userId,
        name: location.name,
        address: location.address || null,
        lat: location.lat,
        lng: location.lng,
        category,
      })
      .select()
      .single()

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error adding favorite location:', error)
      }
      throw error
    }

    return data
  }

  static async removeFavoriteLocation(userId: string, locationId: string): Promise<void> {
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase not available. Cannot remove favorite location.')
      }
      return
    }

    const { error } = await supabase
      .from('favorite_locations')
      .delete()
      .eq('id', locationId)
      .eq('user_id', userId)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error removing favorite location:', error)
      }
      throw error
    }
  }

  static async updateFavoriteLocation(
    userId: string,
    locationId: string,
    updates: Partial<Pick<FavoriteLocation, 'name' | 'address' | 'category'>>
  ): Promise<FavoriteLocation> {
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase not available. Cannot update favorite location.')
      }
      throw new Error('Database not available')
    }

    const { data, error } = await supabase
      .from('favorite_locations')
      .update(updates)
      .eq('id', locationId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error updating favorite location:', error)
      }
      throw error
    }

    return data
  }

  // Search History
  static async getSearchHistory(userId: string): Promise<SearchHistoryItem[]> {
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase not available. Returning empty search history.')
      }
      return []
    }

    const { data, error } = await supabase
      .from('search_history')
      .select('*')
      .eq('user_id', userId)
      .order('last_searched', { ascending: false })
      .limit(20)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching search history:', error)
      }
      throw error
    }

    return data || []
  }

  static async addToSearchHistory(
    userId: string,
    location: Omit<Location, 'address'> & { address?: string }
  ): Promise<SearchHistoryItem> {
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase not available. Cannot add to search history.')
      }
      throw new Error('Database not available')
    }

    // Check if location already exists in search history
    const { data: existing } = await supabase
      .from('search_history')
      .select('*')
      .eq('user_id', userId)
      .eq('lat', location.lat)
      .eq('lng', location.lng)
      .single()

    if (existing) {
      // Update existing record
      const { data, error } = await supabase
        .from('search_history')
        .update({
          search_count: existing.search_count + 1,
          last_searched: new Date().toISOString(),
          name: location.name,
          address: location.address || null,
        })
        .eq('id', existing.id)
        .select()
        .single()

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error updating search history:', error)
        }
        throw error
      }

      return data
    } else {
      // Create new record
      const { data, error } = await supabase
        .from('search_history')
        .insert({
          user_id: userId,
          name: location.name,
          address: location.address || null,
          lat: location.lat,
          lng: location.lng,
          search_count: 1,
          last_searched: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error adding to search history:', error)
        }
        throw error
      }

      return data
    }
  }

  static async clearSearchHistory(userId: string): Promise<void> {
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase not available. Cannot clear search history.')
      }
      return
    }

    const { error } = await supabase
      .from('search_history')
      .delete()
      .eq('user_id', userId)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error clearing search history:', error)
      }
      throw error
    }
  }

  static async removeFromSearchHistory(userId: string, historyId: string): Promise<void> {
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase not available. Cannot remove from search history.')
      }
      return
    }

    const { error } = await supabase
      .from('search_history')
      .delete()
      .eq('id', historyId)
      .eq('user_id', userId)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error removing from search history:', error)
      }
      throw error
    }
  }
} 