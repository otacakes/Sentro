'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/store/app-store'
import { LocationService, type FavoriteLocation } from '@/lib/location-service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MapPin, Home, Briefcase, GraduationCap, Map, Trash2, Plus } from 'lucide-react'
import type { Location } from '@/types'

interface FavoritesPanelProps {
  onLocationSelect?: (location: Location) => void
  onAddFavorite?: () => void
}

const categoryIcons = {
  home: Home,
  work: Briefcase,
  school: GraduationCap,
  other: Map
}

const categoryColors = {
  home: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  work: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  school: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

export function FavoritesPanel({ onLocationSelect, onAddFavorite }: FavoritesPanelProps) {
  const user = useUser()
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadFavorites()
    } else {
      setFavorites([])
      setLoading(false)
    }
  }, [user])

  const loadFavorites = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError(null)
      const data = await LocationService.getFavoriteLocations(user.id)
      setFavorites(data)
    } catch (err) {
      setError('Failed to load favorite locations')
      console.error('Error loading favorites:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (locationId: string) => {
    if (!user) return
    
    try {
      await LocationService.removeFavoriteLocation(user.id, locationId)
      setFavorites(favorites.filter(fav => fav.id !== locationId))
    } catch (err) {
      setError('Failed to remove favorite location')
      console.error('Error removing favorite:', err)
    }
  }

  const handleLocationSelect = (favorite: FavoriteLocation) => {
    const location: Location = {
      lat: favorite.lat,
      lng: favorite.lng,
      name: favorite.name,
      address: favorite.address || undefined
    }
    onLocationSelect?.(location)
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Favorite Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Sign in to save and manage your favorite locations.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Favorite Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading favorites...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Favorite Locations
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddFavorite}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No favorite locations yet</p>
            <Button variant="outline" onClick={onAddFavorite}>
              Add Your First Favorite
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => handleLocationSelect(favorite)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {(() => {
                      const IconComponent = categoryIcons[favorite.category];
                      return <IconComponent className="w-4 h-4" />;
                    })()}
                    <span className="font-medium">{favorite.name}</span>
                    <Badge 
                      variant="secondary" 
                      className={categoryColors[favorite.category]}
                    >
                      {favorite.category}
                    </Badge>
                  </div>
                  {favorite.address && (
                    <p className="text-sm text-muted-foreground">
                      {favorite.address}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 