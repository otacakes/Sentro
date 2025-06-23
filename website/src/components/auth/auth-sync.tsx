'use client'

import { useEffect } from 'react'
import { useBetterAuth } from './better-auth-provider'
import { useAppStore } from '@/store/app-store'

export function AuthSync() {
  const { user, loading } = useBetterAuth()
  const { setUser } = useAppStore()

  useEffect(() => {
    if (!loading) {
      setUser(user)
    }
  }, [user, loading, setUser])

  // This component doesn't render anything, it just syncs auth state
  return null
} 