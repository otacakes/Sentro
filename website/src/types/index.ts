// Location types
export interface Location {
  lat: number
  lng: number
  name: string
  address?: string
}

// Transport types
export type TransportMode = 'lrt1' | 'lrt2' | 'mrt3' | 'bus' | 'jeepney' | 'walking'

export interface TransportStation {
  id: string
  name: string
  location: Location
  lines: TransportMode[]
  facilities: string[]
  accessibility: boolean
}

export interface TransportLine {
  id: string
  name: string
  mode: TransportMode
  stations: TransportStation[]
  color: string
  operatingHours: {
    start: string
    end: string
  }
  frequency: number // minutes
  fare: {
    base: number
    perKm?: number
  }
}

export interface TransportVehicle {
  id: string
  lineId: string
  location: Location
  direction: 'northbound' | 'southbound' | 'eastbound' | 'westbound'
  crowdLevel: 'low' | 'medium' | 'high'
  status: 'on_time' | 'delayed' | 'cancelled'
  lastUpdated: Date
}

// Route types
export interface RouteSegment {
  id: string
  mode: TransportMode
  from: Location
  to: Location
  duration: number // minutes
  distance: number // kilometers
  fare: number
  instructions: string[]
  polyline: [number, number][] // lat, lng coordinates
}

export interface Route {
  id: string
  segments: RouteSegment[]
  totalDuration: number
  totalDistance: number
  totalFare: number
  departureTime: Date
  arrivalTime: Date
  alternatives: Route[]
}

// Crowd level types
export interface CrowdReport {
  id: string
  stationId: string
  lineId: string
  level: 'low' | 'medium' | 'high'
  timestamp: Date
  anonymous: boolean
}

// News and alerts types
export interface NewsItem {
  id: string
  title: string
  content: string
  source: string
  url?: string
  category: 'announcement' | 'fare_change' | 'service_update' | 'government_program'
  priority: 'low' | 'medium' | 'high'
  publishedAt: Date
  expiresAt?: Date
}

export interface ServiceAlert {
  id: string
  title: string
  description: string
  affectedLines: TransportMode[]
  affectedStations: string[]
  severity: 'minor' | 'moderate' | 'severe'
  startTime: Date
  endTime?: Date
  status: 'active' | 'resolved' | 'scheduled'
}

// User preferences types
export interface UserPreferences {
  theme: 'auto' | 'sunny' | 'cloudy' | 'rainy'
  language: 'en' | 'tl' | 'ceb'
  notifications: {
    crowdAlerts: boolean
    serviceDisruptions: boolean
    fareChanges: boolean
    newsUpdates: boolean
  }
  accessibility: {
    highContrast: boolean
    largeText: boolean
    screenReader: boolean
  }
  privacy: {
    locationSharing: boolean
    analytics: boolean
    crashReporting: boolean
  }
}

// App state types
export interface AppState {
  userLocation: Location | null
  selectedRoute: Route | null
  searchHistory: Location[]
  favorites: Location[]
  preferences: UserPreferences
  isOnline: boolean
  lastSync: Date | null
}

// API response types
export interface RouteResponse {
  routes: Route[]
  success: boolean
  error?: string
}

export interface CrowdResponse {
  reports: CrowdReport[]
  success: boolean
  error?: string
}

export interface NewsResponse {
  items: NewsItem[]
  success: boolean
  error?: string
}

// Form types
export interface RouteSearchForm {
  origin: Location | null
  destination: Location | null
  departureTime: Date
  preferences: {
    maxWalkingDistance: number
    avoidCrowds: boolean
    preferAccessible: boolean
    maxTransfers: number
  }
}

export interface CrowdReportForm {
  stationId: string
  lineId: string
  level: 'low' | 'medium' | 'high'
  anonymous: boolean
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

// Offline data types
export interface OfflineData {
  stations: TransportStation[]
  lines: TransportLine[]
  routes: Route[]
  lastUpdated: Date
}

// PWA types
export interface PWAConfig {
  name: string
  shortName: string
  description: string
  themeColor: string
  backgroundColor: string
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'
  orientation: 'portrait' | 'landscape' | 'any'
  icons: {
    src: string
    sizes: string
    type: string
  }[]
} 