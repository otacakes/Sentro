"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle, Clock, MapPin, Users, Star } from "lucide-react"
import { useRef, useEffect, useState } from "react"

interface RoadmapItem {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "planned"
  phase: string
  order: number
}

const roadmapItems: RoadmapItem[] = [
  {
    id: "1",
    title: "Next.js 15 Foundation",
    description: "Modern web application with TypeScript and Tailwind CSS",
    status: "completed",
    phase: "Phase 1",
    order: 1,
  },
  {
    id: "2",
    title: "Supabase Authentication",
    description: "Secure user authentication and profile management",
    status: "completed",
    phase: "Phase 1",
    order: 2,
  },
  {
    id: "3",
    title: "Leaflet Maps Integration",
    description: "Interactive maps with OpenStreetMap for route planning",
    status: "completed",
    phase: "Phase 1",
    order: 3,
  },
  {
    id: "4",
    title: "Route Planning Algorithm",
    description: "Multi-modal journey planning with real-time data",
    status: "in-progress",
    phase: "Phase 1",
    order: 4,
  },
  {
    id: "5",
    title: "Admin Dashboard",
    description: "Administrative tools for managing users and content",
    status: "in-progress",
    phase: "Phase 1",
    order: 5,
  },
  {
    id: "6",
    title: "Real-time Subscriptions",
    description: "Live updates for transport data and community reports",
    status: "planned",
    phase: "Phase 2",
    order: 6,
  },
  {
    id: "7",
    title: "Community Crowd Reporting",
    description: "Report and view real-time crowd levels at stations and on vehicles",
    status: "planned",
    phase: "Phase 2",
    order: 7,
  },
  {
    id: "8",
    title: "Real-time Weather Integration",
    description: "Get current weather conditions and adjust your route planning accordingly",
    status: "planned",
    phase: "Phase 2",
    order: 8,
  },
  {
    id: "9",
    title: "Mobile App",
    description: "Native React Native application for iOS and Android",
    status: "planned",
    phase: "Phase 3",
    order: 9,
  },
  {
    id: "10",
    title: "Machine Learning",
    description: "Predictive travel times and smart route recommendations",
    status: "planned",
    phase: "Phase 4",
    order: 10,
  },
]

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle,
    color: "bg-primary",
    textColor: "text-primary",
    bgColor: "bg-secondary/50",
    borderColor: "border-primary/20",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    color: "bg-primary",
    textColor: "text-primary",
    bgColor: "bg-secondary/50",
    borderColor: "border-primary/20",
  },
  planned: {
    label: "Planned",
    icon: Circle,
    color: "bg-muted-foreground",
    textColor: "text-muted-foreground",
    bgColor: "bg-secondary/50",
    borderColor: "border-muted-foreground/20",
  },
}

export function Roadmap({ visible = true }: { visible?: boolean }) {
  const sortedItems = [...roadmapItems].sort((a, b) => a.order - b.order)

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Development Roadmap</h2>
        <p className="text-muted-foreground text-lg">
          Our journey from MVP to a comprehensive transport platform
        </p>
      </div>

      {/* Desktop Roadmap */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute left-1/2 top-0 w-2 h-full -translate-x-1/2">
            <div className="h-full bg-gradient-to-b from-primary via-primary to-muted-foreground">
              <div className="absolute inset-0 flex flex-col items-center">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-6 bg-background my-2 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          <div className="relative space-y-12">
            {sortedItems.map((item, index) => {
              const isLeft = index % 2 === 0
              const config = statusConfig[item.status]
              const Icon = config.icon

              const CardComponent = () => (
                <Card
                  className={`
                    ${config.borderColor} border-2 hover:shadow-lg transition-all duration-700
                    ${config.bgColor} w-80
                  `}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className={`w-4 h-4 ${config.textColor}`} />
                        <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.phase}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm ml-6">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between ml-6">
                      <Badge variant="secondary" className={`text-xs ${config.textColor}`}>
                        {config.label}
                      </Badge>
                      <div className="flex items-center space-x-1 text-primary">
                        <Star className="w-3 h-3" />
                        <span className="text-xs">#{item.order}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );

              return (
                <div key={item.id} className="relative flex items-center justify-center">
                  {/* Left-side card */}
                  <div className={`w-1/2 flex justify-end ${isLeft ? 'pr-8' : ''}`}>
                    {isLeft && <CardComponent />}
                  </div>

                  {/* Central marker */}
                  <div className="absolute left-1/2 top-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 -translate-x-1/2 -translate-y-1/2">
                    <div className={`w-full h-full rounded-full ${config.color} flex items-center justify-center shadow-lg border-4 border-background`}>
                      <Icon className="w-6 h-6 text-background" />
                    </div>
                  </div>

                  {/* Right-side card */}
                  <div className={`w-1/2 flex justify-start ${!isLeft ? 'pl-8' : ''}`}>
                    {!isLeft && <CardComponent />}
                  </div>
                </div>
              );
            })}

            {/* Destination marker */}
            <div className="relative flex items-center justify-center h-16">
              <div className="absolute left-1/2 top-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 -translate-x-1/2 -translate-y-1/2">
                 <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shadow-lg border-4 border-background">
                    <Users className="w-8 h-8 text-background" />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Roadmap */}
      <div className="md:hidden space-y-6">
        {sortedItems.map((item, index) => {
          const config = statusConfig[item.status]
          const Icon = config.icon
          return (
            <Card
              key={item.id}
              className={`
                ${config.borderColor} border-2 ${config.bgColor}
                transition-all duration-700
              `}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                  <Badge variant="outline" className="flex-shrink-0">{item.phase}</Badge>
                </div>
                <CardDescription className="pt-1">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className={`inline-flex items-center gap-1.5 text-xs ${config.textColor}`}>
                    <Icon className="w-3 h-3" />
                    {config.label}
                  </Badge>
                  <div className="flex items-center space-x-1 text-primary">
                    <Star className="w-3 h-3" />
                    <span className="text-xs font-medium">#{item.order}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 