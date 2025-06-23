import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Transport utilities
export type TransportMode = 'lrt1' | 'lrt2' | 'mrt3' | 'bus' | 'jeepney' | 'walking'

export function getTransportColor(mode: TransportMode): string {
  switch (mode) {
    case 'lrt1':
      return 'bg-transport-lrt1'
    case 'lrt2':
      return 'bg-transport-lrt2'
    case 'mrt3':
      return 'bg-transport-mrt3'
    case 'bus':
      return 'bg-transport-bus'
    case 'jeepney':
      return 'bg-transport-jeepney'
    case 'walking':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}

export function getTransportName(mode: TransportMode): string {
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
      return 'Walking'
    default:
      return 'Unknown'
  }
}

// Location utilities
export interface Location {
  lat: number
  lng: number
  name?: string
}

export function calculateDistance(loc1: Location, loc2: Location): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180
  const dLng = (loc2.lng - loc1.lng) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Time utilities
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours === 0) {
    return `${mins}m`
  }
  return `${hours}h ${mins}m`
}

export function formatTimeRange(start: Date, end: Date): string {
  const startTime = start.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
  const endTime = end.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
  return `${startTime} - ${endTime}`
}
