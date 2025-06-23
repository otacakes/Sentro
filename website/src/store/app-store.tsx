'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import type { 
  AppState, 
  Location, 
  Route, 
  UserPreferences,
  TransportStation,
  TransportLine,
  CrowdReport,
  NewsItem,
  ServiceAlert
} from '@/types'
import { LocationService, type FavoriteLocation, type SearchHistoryItem } from '@/lib/location-service'
import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface AppStore extends AppState {
  // User state
  user: User | null | any
  isAuthenticated: boolean
  
  // Actions
  setUser: (user: User | null | any) => void
  setUserLocation: (location: Location | null) => void
  setSelectedRoute: (route: Route | null) => void
  
  // Database operations for authenticated users
  addToSearchHistory: (location: Location) => Promise<void>
  addToFavorites: (location: Location, category?: 'home' | 'work' | 'school' | 'other') => Promise<void>
  removeFromFavorites: (locationId: string) => Promise<void>
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  setIsOnline: (isOnline: boolean) => void
  setLastSync: (date: Date | null) => void
  
  // Transport data
  stations: TransportStation[]
  lines: TransportLine[]
  vehicles: Map<string, any>
  crowdReports: CrowdReport[]
  newsItems: NewsItem[]
  serviceAlerts: ServiceAlert[]
  
  setStations: (stations: TransportStation[]) => void
  setLines: (lines: TransportLine[]) => void
  setVehicles: (vehicles: Map<string, any>) => void
  addCrowdReport: (report: CrowdReport) => void
  setNewsItems: (items: NewsItem[]) => void
  setServiceAlerts: (alerts: ServiceAlert[]) => void
  
  // UI state
  isLoading: boolean
  error: string | null
  currentView: 'map' | 'timeline' | 'search' | 'news' | 'settings'
  
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setCurrentView: (view: 'map' | 'timeline' | 'search' | 'news' | 'settings') => void

  isSidebarOpen: boolean
  toggleSidebar: () => void
  theme: string
  setTheme: (theme: string) => void
  isAuthModalOpen: boolean
  authRedirectUrl: string | null
  openAuthModal: (redirectUrl?: string) => void
  closeAuthModal: () => void
}

const defaultPreferences: UserPreferences = {
  theme: 'auto',
  language: 'en',
  notifications: {
    crowdAlerts: true,
    serviceDisruptions: true,
    fareChanges: true,
    newsUpdates: false
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    screenReader: false
  },
  privacy: {
    locationSharing: false,
    analytics: false,
    crashReporting: false
  }
}

const AppStoreContext = createContext<AppStore | undefined>(undefined)

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null | any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userLocation, setUserLocationState] = useState<Location | null>(null)
  const [selectedRoute, setSelectedRouteState] = useState<Route | null>(null)
  const [searchHistory, setSearchHistory] = useState<Location[]>([])
  const [favorites, setFavorites] = useState<Location[]>([])
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [isOnline, setIsOnlineState] = useState<boolean>(typeof window !== 'undefined' ? navigator.onLine : true)
  const [lastSync, setLastSyncState] = useState<Date | null>(null)
  
  // Transport data
  const [stations, setStationsState] = useState<TransportStation[]>([])
  const [lines, setLinesState] = useState<TransportLine[]>([])
  const [vehicles, setVehiclesState] = useState<Map<string, any>>(new Map())
  const [crowdReports, setCrowdReports] = useState<CrowdReport[]>([])
  const [newsItems, setNewsItemsState] = useState<NewsItem[]>([])
  const [serviceAlerts, setServiceAlertsState] = useState<ServiceAlert[]>([])
  
  // UI state
  const [isLoading, setIsLoadingState] = useState(false)
  const [error, setErrorState] = useState<string | null>(null)
  const [currentView, setCurrentViewState] = useState<'map' | 'timeline' | 'search' | 'news' | 'settings'>('map')

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [theme, setThemeState] = useState('system')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authRedirectUrl, setAuthRedirectUrl] = useState<string | null>(null)

  const setUser = (user: User | null | any) => {
    setUserState(user)
    setIsAuthenticated(!!user)
  }

  const addToSearchHistory = async (location: Location) => {
    if (user) {
      try {
        await LocationService.addToSearchHistory(user.id, location)
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to save to search history:', error)
        }
      }
    } else {
      const filtered = searchHistory.filter(
        (item: Location) => item.lat !== location.lat || item.lng !== location.lng
      )
      setSearchHistory([location, ...filtered.slice(0, 9)])
    }
  }

  const addToFavorites = async (location: Location, category: 'home' | 'work' | 'school' | 'other' = 'other') => {
    if (user) {
      try {
        await LocationService.addFavoriteLocation(user.id, location, category)
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to save favorite location:', error)
        }
        throw error
      }
    } else {
      const exists = favorites.some(
        (item: Location) => item.lat === location.lat && item.lng === location.lng
      )
      if (!exists) {
        setFavorites([...favorites, location])
      }
    }
  }

  const removeFromFavorites = async (locationId: string) => {
    if (user) {
      try {
        await LocationService.removeFavoriteLocation(user.id, locationId)
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to remove favorite location:', error)
        }
        throw error
      }
    } else {
      setFavorites(favorites.filter((item: Location) => 
        `${item.lat}-${item.lng}` !== locationId
      ))
    }
  }

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences({ ...preferences, ...newPreferences })
  }

  const addCrowdReport = (report: CrowdReport) => {
    const filtered = crowdReports.filter(
      (item: CrowdReport) => 
        item.stationId !== report.stationId || 
        item.lineId !== report.lineId ||
        Date.now() - item.timestamp.getTime() > 30 * 60 * 1000
    )
    setCrowdReports([report, ...filtered])
  }

  const store: AppStore = {
    // State
    user,
    isAuthenticated,
    userLocation,
    selectedRoute,
    searchHistory,
    favorites,
    preferences,
    isOnline,
    lastSync,
    stations,
    lines,
    vehicles,
    crowdReports,
    newsItems,
    serviceAlerts,
    isLoading,
    error,
    currentView,
    isSidebarOpen,
    theme,
    isAuthModalOpen,
    authRedirectUrl,
    // Actions
    setUser,
    setUserLocation: setUserLocationState,
    setSelectedRoute: setSelectedRouteState,
    addToSearchHistory,
    addToFavorites,
    removeFromFavorites,
    updatePreferences,
    setIsOnline: setIsOnlineState,
    setLastSync: setLastSyncState,
    setStations: setStationsState,
    setLines: setLinesState,
    setVehicles: setVehiclesState,
    addCrowdReport,
    setNewsItems: setNewsItemsState,
    setServiceAlerts: setServiceAlertsState,
    setIsLoading: setIsLoadingState,
    setError: setErrorState,
    setCurrentView: setCurrentViewState,
    toggleSidebar: () => setIsSidebarOpen(!isSidebarOpen),
    setTheme: setThemeState,
    openAuthModal: (redirectUrl) => {
      setIsAuthModalOpen(true)
      setAuthRedirectUrl(redirectUrl || null)
    },
    closeAuthModal: () => {
      setIsAuthModalOpen(false)
      setAuthRedirectUrl(null)
    },
  }

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  )
}

export function useAppStore() {
  const context = useContext(AppStoreContext)
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppStoreProvider')
  }
  return context
}

// Selectors for better performance
export const useUser = () => useAppStore().user
export const useIsAuthenticated = () => useAppStore().isAuthenticated
export const useUserLocation = () => useAppStore().userLocation
export const useSelectedRoute = () => useAppStore().selectedRoute
export const useSearchHistory = () => useAppStore().searchHistory
export const useFavorites = () => useAppStore().favorites
export const useIsOnline = () => useAppStore().isOnline
export const useStations = () => useAppStore().stations
export const useLines = () => useAppStore().lines
export const useCrowdReports = () => useAppStore().crowdReports
export const useNewsItems = () => useAppStore().newsItems
export const useServiceAlerts = () => useAppStore().serviceAlerts
export const useIsLoading = () => useAppStore().isLoading
export const useError = () => useAppStore().error
export const useCurrentView = () => useAppStore().currentView
export const useIsSidebarOpen = () => useAppStore().isSidebarOpen
export const useTheme = () => useAppStore().theme

// New hooks for auth modal
export const useIsAuthModalOpen = () => useAppStore().isAuthModalOpen
export const useAuthRedirectUrl = () => useAppStore().authRedirectUrl
export const useOpenAuthModal = () => useAppStore().openAuthModal
export const useCloseAuthModal = () => useAppStore().closeAuthModal 