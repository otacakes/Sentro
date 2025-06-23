'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Timeline } from '@/components/ui/timeline'
import { 
  Clock, 
  DollarSign, 
  Navigation, 
  MapPin, 
  RefreshCw, 
  Share2, 
  Bookmark,
  AlertCircle,
  Users,
  TrendingUp,
  Zap
} from 'lucide-react'
import type { Route, Location } from '@/types'
import { cn } from '@/lib/utils'

interface TimelineViewProps {
  selectedRoute: Route
  origin: Location
  destination: Location
  onBackToSearch: () => void
  onViewMap: () => void
  className?: string
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  selectedRoute,
  origin,
  destination,
  onBackToSearch,
  onViewMap,
  className
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatTimeRange = (start: Date, end: Date) => {
    return `${start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} - ${end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`
  }

  const statItems = [
    { icon: Clock, label: "Duration", value: formatTime(selectedRoute.totalDuration) },
    { icon: Navigation, label: "Distance", value: `${selectedRoute.totalDistance.toFixed(1)} km` },
    { icon: DollarSign, label: "Total Fare", value: `₱${selectedRoute.totalFare}` },
    { icon: Users, label: "Crowd Level", value: "Medium" }
  ]

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <Navigation className="w-5 h-5 md:w-6 md:h-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Your Journey</h1>
                <p className="text-sm text-muted-foreground leading-tight">
                  {origin.name} → {destination.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-start">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                <span className="hidden sm:inline ml-2">Refresh</span>
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
                 <span className="hidden sm:inline ml-2">Share</span>
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {statItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{item.label}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-3 bg-secondary rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-secondary-foreground" />
                <span className="text-sm font-semibold text-secondary-foreground">Departure Time</span>
              </div>
              <div className="font-semibold text-secondary-foreground">
                {formatTimeRange(selectedRoute.departureTime, selectedRoute.arrivalTime)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Journey Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline segments={selectedRoute.segments} />
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onViewMap} className="flex-1" variant="outline">
          <MapPin className="w-4 h-4 mr-2" /> View on Map
        </Button>
        <Button onClick={onBackToSearch} className="flex-1">
          Plan New Route
        </Button>
        <Button className="flex-1" variant="secondary">
          <Bookmark className="w-4 h-4 mr-2" /> Save Route
        </Button>
      </div>
    </div>
  )
} 