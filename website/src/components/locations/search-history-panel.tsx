'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/store/app-store'
import { LocationService, type SearchHistoryItem } from '@/lib/location-service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MapPin, Clock, Trash2, Search, Calendar } from 'lucide-react'
import type { Location } from '@/types'

interface SearchHistoryPanelProps {
  onLocationSelect?: (location: Location) => void
}

export function SearchHistoryPanel({ onLocationSelect }: SearchHistoryPanelProps) {
  const user = useUser()
  const [history, setHistory] = useState<SearchHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadSearchHistory()
    } else {
      setHistory([])
      setLoading(false)
    }
  }, [user])

  const loadSearchHistory = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError(null)
      const data = await LocationService.getSearchHistory(user.id)
      setHistory(data)
    } catch (err) {
      setError('Failed to load search history')
      console.error('Error loading search history:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromHistory = async (historyId: string) => {
    if (!user) return
    
    try {
      await LocationService.removeFromSearchHistory(user.id, historyId)
      setHistory(history.filter(item => item.id !== historyId))
    } catch (err) {
      setError('Failed to remove from search history')
      console.error('Error removing from history:', err)
    }
  }

  const handleClearHistory = async () => {
    if (!user) return
    
    try {
      await LocationService.clearSearchHistory(user.id)
      setHistory([])
    } catch (err) {
      setError('Failed to clear search history')
      console.error('Error clearing history:', err)
    }
  }

  const handleLocationSelect = (item: SearchHistoryItem) => {
    const location: Location = {
      lat: item.lat,
      lng: item.lng,
      name: item.name,
      address: item.address || undefined
    }
    onLocationSelect?.(location)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Search History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Sign in to view your search history.
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
            <Clock className="w-5 h-5" />
            Search History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading history...</p>
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
            <Clock className="w-5 h-5" />
            Search History
          </div>
          {history.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearHistory}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {history.length === 0 ? (
          <div className="text-center py-8">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No search history yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your recent searches will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => handleLocationSelect(item)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{item.name}</span>
                    {item.search_count > 1 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {item.search_count} searches
                      </span>
                    )}
                  </div>
                  {item.address && (
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.address}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(item.last_searched)}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFromHistory(item.id)}
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