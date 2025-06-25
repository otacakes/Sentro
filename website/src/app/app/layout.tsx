'use client'

import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { MapPin, Search, Newspaper, Zap } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { BetterAuthProvider } from "@/components/auth/better-auth-provider"
import { AppStoreProvider } from "@/store/app-store"
import { AuthModalController } from "@/components/auth/auth-modal-controller"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentView = searchParams.get('view') || 'map'

  const handleViewChange = (view: string) => {
    router.push(`/app?view=${view}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo className="hidden md:block" />
          <nav className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <Button 
                variant={currentView === 'map' ? 'secondary' : 'ghost'} 
                onClick={() => handleViewChange('map')}
                className="hover:text-accent-foreground transition-colors"
              >
                Map
              </Button>
              <Button 
                variant={currentView === 'timeline' ? 'secondary' : 'ghost'} 
                onClick={() => handleViewChange('timeline')}
                className="hover:text-accent-foreground transition-colors"
              >
                Timeline
              </Button>
              <Button 
                variant={currentView === 'news' ? 'secondary' : 'ghost'} 
                onClick={() => handleViewChange('news')}
                className="hover:text-accent-foreground transition-colors"
              >
                News
              </Button>
              <Button 
                variant={currentView === 'search' ? 'secondary' : 'ghost'} 
                onClick={() => handleViewChange('search')}
                className="hover:text-accent-foreground transition-colors"
              >
                Plan Route
              </Button>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <footer className="md:hidden sticky bottom-0 left-0 right-0 bg-background border-t z-40">
        <nav className="container mx-auto px-4 py-2 flex justify-around items-center">
          <Button 
            variant={currentView === 'map' ? 'secondary' : 'ghost'} 
            size="icon" 
            onClick={() => handleViewChange('map')} 
            aria-label="Map View"
            className="hover:text-accent-foreground transition-colors"
          >
            <MapPin className="w-5 h-5" />
          </Button>
          <Button 
            variant={currentView === 'timeline' ? 'secondary' : 'ghost'} 
            size="icon" 
            onClick={() => handleViewChange('timeline')} 
            aria-label="Timeline View"
            className="hover:text-accent-foreground transition-colors"
          >
            <Zap className="w-5 h-5" />
          </Button>
          <Button 
            variant={currentView === 'news' ? 'secondary' : 'ghost'} 
            size="icon" 
            onClick={() => handleViewChange('news')} 
            aria-label="News View"
            className="hover:text-accent-foreground transition-colors"
          >
            <Newspaper className="w-5 h-5" />
          </Button>
          <Button 
            variant={currentView === 'search' ? 'secondary' : 'ghost'} 
            size="icon" 
            onClick={() => handleViewChange('search')} 
            aria-label="Search View"
            className="hover:text-accent-foreground transition-colors"
          >
            <Search className="w-5 h-5" />
          </Button>
        </nav>
      </footer>
    </div>
  )
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LayoutContent>{children}</LayoutContent>
        </Suspense>
    )
} 