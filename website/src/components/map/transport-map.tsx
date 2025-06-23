'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import L from 'leaflet'

// Fix for default marker icon issue with webpack
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;


interface TransportMapProps {
  className?: string
}

export function TransportMap({ className }: TransportMapProps) {
  const { userLocation } = useAppStore()

  const position: L.LatLngTuple = userLocation 
    ? [userLocation.lat, userLocation.lng]
    : [14.5995, 120.9842] // Default to Manila

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      scrollWheelZoom={true} 
      className={cn("w-full h-full", className)}
      style={{ minHeight: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>
            You are here.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
} 