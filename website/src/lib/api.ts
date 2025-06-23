import axios from 'axios'
import type { Location, Route, CrowdReport, NewsItem, ServiceAlert } from '@/types'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

// Create axios instances
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Transport API
export const transportAPI = {
  async getStations(): Promise<any[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/stations`)
      return response.data
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching stations:', error)
      }
      throw new Error('Failed to fetch stations')
    }
  },

  async getLines(): Promise<any[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/lines`)
      return response.data
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching lines:', error)
      }
      throw new Error('Failed to fetch transport lines')
    }
  },

  async getRoutes(origin: Location, destination: Location): Promise<Route[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/routes`)
      return response.data
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching routes:', error)
      }
      throw new Error('Failed to fetch routes')
    }
  },

  async submitCrowdReport(report: Omit<CrowdReport, 'id' | 'timestamp'>): Promise<boolean> {
    try {
      const response = await axios.post(`${API_BASE_URL}/crowd-reports`, report)
      if (process.env.NODE_ENV === 'development') {
        console.log('Crowd report submitted:', report)
      }
      return true
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error submitting crowd report:', error)
      }
      throw new Error('Failed to submit crowd report')
    }
  },
}

// News API
export const newsAPI = {
  async getNews(): Promise<NewsItem[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/news`)
      return response.data
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching news:', error)
      }
      throw new Error('Failed to fetch news')
    }
  },

  async getServiceAlerts(): Promise<ServiceAlert[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/alerts`)
      return response.data
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching service alerts:', error)
      }
      throw new Error('Failed to fetch service alerts')
    }
  },
}

// Mock data for MVP
const mockStations = [
  {
    id: 'lrt1-baclaran',
    name: 'Baclaran',
    location: { lat: 14.5314, lng: 120.9972, name: 'Baclaran' },
    lines: ['lrt1'],
    facilities: ['elevator', 'escalator', 'parking'],
    accessibility: true,
  },
  {
    id: 'lrt1-edsa',
    name: 'EDSA',
    location: { lat: 14.5547, lng: 121.0244, name: 'EDSA' },
    lines: ['lrt1'],
    facilities: ['elevator', 'escalator'],
    accessibility: true,
  },
  {
    id: 'mrt3-ayala',
    name: 'Ayala',
    location: { lat: 14.5547, lng: 121.0244, name: 'Ayala' },
    lines: ['mrt3'],
    facilities: ['elevator', 'escalator', 'parking'],
    accessibility: true,
  },
]

const mockLines = [
  {
    id: 'lrt1',
    name: 'LRT Line 1',
    mode: 'lrt1',
    stations: mockStations.filter(s => s.lines.includes('lrt1')),
    color: '#FF6B35',
    operatingHours: { start: '04:30', end: '22:30' },
    frequency: 5,
    fare: { base: 20, perKm: 2 },
  },
  {
    id: 'mrt3',
    name: 'MRT Line 3',
    mode: 'mrt3',
    stations: mockStations.filter(s => s.lines.includes('mrt3')),
    color: '#45B7D1',
    operatingHours: { start: '05:00', end: '23:00' },
    frequency: 3,
    fare: { base: 15, perKm: 1.5 },
  },
]

const mockRoutes = (origin: Location, destination: Location): Route[] => {
  const now = new Date()
  const departureTime = new Date(now.getTime() + 10 * 60 * 1000) // 10 minutes from now
  const arrivalTime = new Date(departureTime.getTime() + 45 * 60 * 1000) // 45 minutes later

  return [
    {
      id: 'route-1',
      segments: [
        {
          id: 'segment-1',
          mode: 'walking',
          from: origin,
          to: { lat: 14.5547, lng: 121.0244, name: 'EDSA Station' },
          duration: 8,
          distance: 0.5,
          fare: 0,
          instructions: ['Walk 500m to EDSA Station'],
          polyline: [
            [origin.lat, origin.lng],
            [14.5547, 121.0244],
          ],
        },
        {
          id: 'segment-2',
          mode: 'lrt1',
          from: { lat: 14.5547, lng: 121.0244, name: 'EDSA Station' },
          to: { lat: 14.5314, lng: 120.9972, name: 'Baclaran Station' },
          duration: 25,
          distance: 8.5,
          fare: 25,
          instructions: ['Take LRT-1 southbound', 'Get off at Baclaran'],
          polyline: [
            [14.5547, 121.0244],
            [14.5314, 120.9972],
          ],
        },
        {
          id: 'segment-3',
          mode: 'walking',
          from: { lat: 14.5314, lng: 120.9972, name: 'Baclaran Station' },
          to: destination,
          duration: 12,
          distance: 0.8,
          fare: 0,
          instructions: ['Walk 800m to destination'],
          polyline: [
            [14.5314, 120.9972],
            [destination.lat, destination.lng],
          ],
        },
      ],
      totalDuration: 45,
      totalDistance: 9.8,
      totalFare: 25,
      departureTime,
      arrivalTime,
      alternatives: [],
    },
  ]
}

const mockNewsItems: NewsItem[] = [
  {
    id: 'news-1',
    title: 'LRT-1 Extension Project Update',
    content: 'The LRT-1 extension to Cavite is progressing well with 80% completion.',
    source: 'DOTr',
    category: 'announcement',
    priority: 'medium',
    publishedAt: new Date('2024-01-15'),
  },
  {
    id: 'news-2',
    title: 'Free Ride Program Extended',
    content: 'The Libreng Sakay program has been extended until March 2024.',
    source: 'DOTr',
    category: 'government_program',
    priority: 'high',
    publishedAt: new Date('2024-01-10'),
  },
]

const mockServiceAlerts: ServiceAlert[] = [
  {
    id: 'alert-1',
    title: 'LRT-1 Maintenance Work',
    description: 'Scheduled maintenance on LRT-1 from 10 PM to 4 AM.',
    affectedLines: ['lrt1'],
    affectedStations: ['lrt1-baclaran', 'lrt1-edsa'],
    severity: 'minor',
    startTime: new Date('2024-01-20T22:00:00'),
    endTime: new Date('2024-01-21T04:00:00'),
    status: 'scheduled',
  },
] 