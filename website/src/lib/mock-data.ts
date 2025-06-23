import type { Route, Location, RouteSegment } from '@/types'

export const mockOrigin: Location = {
  name: 'Ayala Triangle Gardens, Makati',
  lat: 14.556,
  lng: 121.023,
}

export const mockDestination: Location = {
  name: 'SM Megamall, Mandaluyong',
  lat: 14.585,
  lng: 121.057,
}

const walkToAyala: RouteSegment = {
    id: 'seg-1',
    mode: 'walking',
    from: mockOrigin,
    to: { name: 'Ayala MRT Station', lat: 14.551, lng: 121.028 },
    duration: 10,
    distance: 0.8,
    fare: 0,
    instructions: ['Walk along Ayala Avenue towards the MRT station.'],
    polyline: [[14.556, 121.023], [14.551, 121.028]]
}

const trainToOrtigas: RouteSegment = {
    id: 'seg-2',
    mode: 'mrt3',
    from: { name: 'Ayala MRT Station', lat: 14.551, lng: 121.028 },
    to: { name: 'Ortigas MRT Station', lat: 14.586, lng: 121.055 },
    duration: 20,
    distance: 5.5,
    fare: 20.0,
    instructions: ['Take the MRT-3 Northbound train from Ayala to Ortigas.'],
    polyline: [[14.551, 121.028], [14.586, 121.055]]
}

const walkToMegamall: RouteSegment = {
    id: 'seg-3',
    mode: 'walking',
    from: { name: 'Ortigas MRT Station', lat: 14.586, lng: 121.055 },
    to: mockDestination,
    duration: 15,
    distance: 1.2,
    fare: 0,
    instructions: ['Walk from Ortigas Station to SM Megamall through the walkway.'],
    polyline: [[14.586, 121.055], [14.585, 121.057]]
}

export const mockRoute: Route = {
  id: 'route-1',
  totalDuration: 45,
  totalDistance: 7.5,
  totalFare: 20.0,
  departureTime: new Date(new Date().getTime() + 5 * 60000),
  arrivalTime: new Date(new Date().getTime() + 50 * 60000),
  segments: [walkToAyala, trainToOrtigas, walkToMegamall],
  alternatives: [],
}; 