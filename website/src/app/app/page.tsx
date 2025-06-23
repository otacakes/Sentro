'use client'

import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { NewsFeed } from '@/components/news/news-feed'
import { TimelineView } from '@/components/timeline/timeline-view'
import { mockRoute, mockOrigin, mockDestination } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Search } from 'lucide-react'
import { AuthGuard } from '@/components/auth/auth-guard'

function PageContent() {
  // Memoize the dynamically imported map to prevent re-initialization
  const TransportMap = useMemo(() => dynamic(
    () => import('@/components/map/transport-map').then((mod) => mod.TransportMap),
    { 
      ssr: false,
      loading: () => <p>Loading map...</p> 
    }
  ), []);
  
  const searchParams = useSearchParams()
  const view = searchParams.get('view') || 'map'

  const handleBackToSearch = () => console.log("Back to search clicked")
  const handleViewMap = () => console.log("View on map clicked")

  switch (view) {
    case 'map':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          <div className="lg:col-span-3 h-[80vh]">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Live Transport Map
                  </CardTitle>
                  <CardDescription>
                    Real-time location of trains, buses, and jeepneys
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <TransportMap />
              </CardContent>
            </Card>
          </div>
          <div className="hidden lg:flex flex-col gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">Nearby Stations</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Ayala Station</span>
                    </div>
                    <span className="text-xs text-muted-foreground">0.2 km</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Recent Alerts</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-2 rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10">
                    <p className="text-sm font-medium">Minor delay on LRT-1</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    case 'timeline':
      return <TimelineView selectedRoute={mockRoute} origin={mockOrigin} destination={mockDestination} onBackToSearch={handleBackToSearch} onViewMap={handleViewMap} />
    case 'news':
      return <NewsFeed />
    case 'search':
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Plan Your Journey
            </CardTitle>
            <CardDescription>
              Find the best route to your destination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Search form coming soon.</p>
          </CardContent>
        </Card>
      )
    default:
      return <div>Unknown view</div>
  }
}

export default function AppPage() {
  return (
    <AuthGuard requireAuth={true}>
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </AuthGuard>
  )
} 