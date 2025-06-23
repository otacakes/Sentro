"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MapPin, Users, Newspaper, Github, Menu, Check, Star, LogIn, User } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthModal } from "@/components/auth/auth-modal"
import { UserProfile } from "@/components/auth/user-profile"
import { AuthSync } from "@/components/auth/auth-sync"
import { useBetterAuth } from "@/components/auth/better-auth-provider"
import { Roadmap } from "@/components/roadmap"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const navLinks = [
  { href: "/app?view=timeline", label: "Timeline" },
  { href: "/app?view=map", label: "Map" },
  { href: "/app?view=news", label: "News & Alerts" },
  { href: "https://github.com/your-username/philippine-commuters-companion", label: "Contribute", external: true },
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
          <a href="https://github.com/your-username/philippine-commuters-companion" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 px-4 py-2 hover:text-accent-foreground transition-colors">
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
          <a href="https://github.com/your-username/philippine-commuters-companion" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground"><Github className="w-4 h-4" /> GitHub</a>
          <Link href="/about" className="hover:text-foreground">About</Link>
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  const roadmapRef = useRef<HTMLDivElement>(null)
  const [roadmapVisible, setRoadmapVisible] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRoadmapVisible(true)
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

  const scrollToRoadmap = () => {
    if (roadmapRef.current) {
      roadmapRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
              The Philippine Commuter's Companion
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              A privacy-first, community-driven transport app. Real-time routes, crowd levels, news, and modern UI.
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
                  Report crowd levels, disruptions, and help fellow commuters in real time.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-secondary p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 2a5 5 0 0 0-5 5v2"/><path d="M12 9h.01"/><path d="M17.2 12.8a1 1 0 0 0 .8-1.8 5.5 5.5 0 0 0-10 0 1 1 0 0 0 .8 1.8h8.4Z"/><path d="m17.5 15.5-.9-.9"/><path d="M21 17a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1Z"/><path d="m6.5 15.5.9-.9"/><path d="M3 17a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Z"/></svg>
                </div>
                <h3 className="text-xl font-semibold">Modern UI Design</h3>
                <p className="text-muted-foreground text-sm">
                  Clean, intuitive interface designed for a calm and safe commute.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-secondary p-4 rounded-full">
                  <Newspaper className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">News & Alerts</h3>
                <p className="text-muted-foreground text-sm">
                  Get official news, fare changes, and government program updates.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-secondary p-4 rounded-full">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">GPS-like Route Mapping</h3>
                <p className="text-muted-foreground text-sm">
                  Multi-modal journey planning with offline and online maps.
                </p>
              </div>
            </div>
          </div>
          {/* Centered Scroll Down Indicator */}
          <div className="flex justify-center mt-8 md:mt-12">
            <button
              onClick={scrollToRoadmap}
              className="animate-bounce bg-background/80 rounded-full p-2 shadow-md border border-border hover:bg-muted transition z-10"
              aria-label="Scroll to Roadmap"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
            >
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Roadmap Section with animation */}
        <div ref={roadmapRef} id="roadmap-section" className="scroll-mt-28">
          <Roadmap visible={roadmapVisible} />
        </div>

        {/* Pricing Section */}
        <section className="py-20 md:py-24 lg:py-28 text-center">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Community
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              Our app is free and open-source. Discover how you can use it and
              get involved.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* Commuters Card */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Commuters</CardTitle>
                  <CardDescription>Free</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>Real-time route planning</span></li>
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>Community crowd reports</span></li>
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>News & service alerts</span></li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild><Link href="/app?view=map">Get Started</Link></Button>
                </CardFooter>
              </Card>

              {/* Daily Commuters Card */}
              <Card className="flex flex-col border-primary border-2 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  The Essential
                </div>
                <CardHeader>
                  <CardTitle>Daily Commuters</CardTitle>
                  <CardDescription>Free with Account</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   <ul className="space-y-4">
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>All Commuter features</span></li>
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>Save favorite locations</span></li>
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>Personalized route alerts</span></li>
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>Access to offline maps</span></li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default" asChild><Link href="/app?view=map">Get Started</Link></Button>
                </CardFooter>
              </Card>

              {/* Enterprise Card */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Contact Us</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>API access for fleet management</span></li>
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>Custom map integrations</span></li>
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>Bulk data analysis</span></li>
                    <li className="flex items-start gap-2"><Check className="w-5 h-5 text-primary mt-1" /><span>Priority support</span></li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild><Link href="/contact">Learn More</Link></Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 