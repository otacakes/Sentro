'use client'

import { useEffect, useState } from 'react'
import { useBetterAuth } from './better-auth-provider'
import { AuthModal } from './auth-modal'

/**
 * A client component that controls the visibility of the AuthModal
 * based on URL search parameters.
 */
export function AuthModalController() {
  const { user, loading } = useBetterAuth()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Show modal if user is not authenticated and not loading
    if (!loading && !user) {
      setShowModal(true)
    } else if (user) {
      setShowModal(false)
    }
  }, [user, loading])

  if (loading) {
    return null
  }

  if (!user) {
    return <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
  }

  return null
} 