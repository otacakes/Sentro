import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from './card'
import { Badge } from './badge'
import { Clock, Navigation, DollarSign, Users } from 'lucide-react'
import type { RouteSegment, TransportMode } from '@/types'

interface TimelineProps {
  segments: RouteSegment[]
  className?: string
}

interface TimelineItemProps {
  segment: RouteSegment
  isLast: boolean
  index: number
}

const getTransportIcon = (mode: TransportMode) => {
  switch (mode) {
    case 'lrt1':
      return '🚇'
    case 'lrt2':
      return '🚆'
    case 'mrt3':
      return '🚊'
    case 'bus':
      return '🚌'
    case 'jeepney':
      return '🚐'
    case 'walking':
      return '🚶'
    default:
      return '🚇'
  }
}

const getTransportColor = (mode: TransportMode) => {
  switch (mode) {
    case 'lrt1':
      return 'bg-red-500'
    case 'lrt2':
      return 'bg-purple-500'
    case 'mrt3':
      return 'bg-yellow-500'
    case 'bus':
      return 'bg-blue-500'
    case 'jeepney':
      return 'bg-green-500'
    case 'walking':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}

const getTransportName = (mode: TransportMode) => {
  switch (mode) {
    case 'lrt1':
      return 'LRT-1'
    case 'lrt2':
      return 'LRT-2'
    case 'mrt3':
      return 'MRT-3'
    case 'bus':
      return 'Bus'
    case 'jeepney':
      return 'Jeepney'
    case 'walking':
      return 'Walk'
    default:
      return 'Transport'
  }
}

const TimelineItem: React.FC<TimelineItemProps> = ({ segment, isLast, index }) => {
  return (
    <div className="flex items-start space-x-4">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-4 h-4 rounded-full border-2 border-background flex items-center justify-center text-white text-xs font-bold",
          getTransportColor(segment.mode)
        )}>
          {index + 1}
        </div>
        {!isLast && (
          <div className="w-0.5 h-16 bg-border mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{getTransportIcon(segment.mode)}</span>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {segment.mode === 'walking' ? 'Walk' : `Take ${getTransportName(segment.mode)}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {segment.from.name} → {segment.to.name}
                    </p>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-1 mb-3">
                  {segment.instructions.map((instruction, i) => (
                    <div key={i} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{instruction}</span>
                    </div>
                  ))}
                </div>

                {/* Route details */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{Math.round(segment.duration)} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Navigation className="w-4 h-4 text-muted-foreground" />
                    <span>{segment.distance.toFixed(1)} km</span>
                  </div>
                  {segment.mode !== 'walking' && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>₱{segment.fare}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status badges */}
              <div className="flex flex-col items-end space-y-2">
                <Badge variant="secondary" className="text-xs">
                  {getTransportName(segment.mode)}
                </Badge>
                {segment.mode !== 'walking' && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>Medium</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const Timeline: React.FC<TimelineProps> = ({ segments, className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {segments.map((segment, index) => (
        <TimelineItem
          key={segment.id}
          segment={segment}
          isLast={index === segments.length - 1}
          index={index}
        />
      ))}
    </div>
  )
} 