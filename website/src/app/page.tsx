"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MapPin, Users, Newspaper, Github, Menu, Check, Star, LogIn } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserProfile } from "@/components/auth/user-profile"
import { AuthSync } from "@/components/auth/auth-sync"
import { useBetterAuth } from "@/components/auth/better-auth-provider"
import { Roadmap } from "@/components/roadmap"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const navLinks = [
  { href: "/app?view=timeline", label: "Timeline" },
  { href: "/app?view=map", label: "Map" },
  { href: "/app?view=news", label: "News & Alerts" },
  { href: "https://github.com/your-username/sentro", label: "Contribute", external: true },
]

function MainNav() {
  const { user } = useBetterAuth()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Link href="/app?view=map">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 px-4 py-2 hover:text-accent-foreground transition-colors">
              Map
            </button>
          </Link>
          <Link href="/app?view=timeline">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 px-4 py-2 hover:text-accent-foreground transition-colors">
              Timeline
            </button>
          </Link>
          <Link href="/app?view=news">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 px-4 py-2 hover:text-accent-foreground transition-colors">
              News & Alerts
            </button>
          </Link>
          <a href="https://github.com/your-username/sentro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 px-4 py-2 hover:text-accent-foreground transition-colors">
            Contribute
          </a>
        </div>
        <ThemeToggle />
        <div className="w-px h-6 bg-border mx-2"></div>
        {user ? (
          <UserProfile />
        ) : (
          <Link href="/?login=true">
            <Button variant="ghost">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
        )}
      </nav>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Main Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Logo />
            </div>
            <div className="flex-grow p-4 space-y-2">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link href={link.href} className="block">
                    <Button variant="ghost" className="w-full justify-start">{link.label}</Button>
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="p-4 border-t">
              {user ? (
                <UserProfile />
              ) : (
                <SheetClose asChild>
                  <Link href="/?login=true">
                    <Button className="w-full justify-start">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                </SheetClose>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="text-sm text-muted-foreground">
          <span>Made with <span className="text-red-500">♥</span> for Filipino commuters.</span>
          <br className="md:hidden" />
          <span className="ml-0 md:ml-2">Sign in for full experience</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="https://github.com/your-username/sentro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground"><Github className="w-4 h-4" /> GitHub</a>
          <Link href="/about" className="hover:text-foreground">About</Link>
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  const roadmapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (roadmapRef.current) {
      observer.observe(roadmapRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AuthSync />
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <MainNav />
        </div>
      </header>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center gap-12 md:gap-16 py-24 md:py-32 pb-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-primary">
              Sentro: Take Control of Your Daily Commute.
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              No more guesswork. Access live vehicle tracking, crowd levels, and instant alerts for trains, buses, and modern jeepneys. Your privacy-first, community-driven solution for smarter travel, completely <span className="font-bold text-foreground">open source and free to use</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/app?view=map">Plan My Route</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/app?view=map">View Map</Link>
              </Button>
            </div>
          </div>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-secondary p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Community-Driven</h3>
                <p className="text-muted-foreground text-sm">
                  Real-time updates from fellow commuters
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-secondary p-4 rounded-full">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Live Tracking</h3>
                <p className="text-muted-foreground text-sm">
                  See exactly where your ride is
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-secondary p-4 rounded-full">
                  <Newspaper className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Instant Alerts</h3>
                <p className="text-muted-foreground text-sm">
                  Get notified of delays and changes
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-secondary p-4 rounded-full">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Privacy-First</h3>
                <p className="text-muted-foreground text-sm">
                  Your data stays on your device
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Sentro?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Built by commuters, for commuters. No ads, no tracking, just the information you need to get where you're going.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Real-Time Data
                  </CardTitle>
                  <CardDescription>
                    Live vehicle locations and crowd levels updated every minute
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Never wonder if your ride is coming again. See real-time updates from the community and official sources.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Privacy-First
                  </CardTitle>
                  <CardDescription>
                    Your location and data never leave your device
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Unlike other apps, we don't track your movements or sell your data. Your privacy is our priority.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Community-Driven
                  </CardTitle>
                  <CardDescription>
                    Updates from real commuters, not just algorithms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Join thousands of Filipino commuters sharing real-time information to help each other get around.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Open Source
                  </CardTitle>
                  <CardDescription>
                    Transparent, auditable, and free forever
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The code is open for everyone to see, contribute to, and improve. No hidden agendas, just better commuting.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Multi-Modal
                  </CardTitle>
                  <CardDescription>
                    Trains, buses, jeepneys, and more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    From MRT to modern jeepneys, we cover all the transport options you use every day.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Offline Ready
                  </CardTitle>
                  <CardDescription>
                    Works even without internet connection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Download maps and schedules for offline use. Perfect for areas with poor connectivity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section ref={roadmapRef} className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Coming Next?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our roadmap is shaped by community feedback. Here's what we're building next.
              </p>
            </div>
            {/* <Roadmap /> */}
            <div className="text-center text-muted-foreground">
              <p>Roadmap temporarily disabled for debugging</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Commute?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of Filipino commuters who've already made the switch to smarter travel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/app?view=map">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/your-username/sentro" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Contribute
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 