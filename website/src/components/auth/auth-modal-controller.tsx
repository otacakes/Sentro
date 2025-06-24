'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AuthModal } from './auth-modal'

/**
 * AuthModalController manages the authentication modal state based on URL parameters.
 * It shows the modal when 'login' or 'signup' parameters are present in the URL.
 */
export function AuthModalController() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if the 'login' or 'signup' param is present in the URL
    if (searchParams.has('login') || searchParams.has('signup')) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [searchParams])

  const handleClose = () => {
    const redirectUrl = searchParams.get('redirect')
    if (redirectUrl) {
      router.replace('/')
      return
    }

    // Remove the query params from the URL to hide the modal
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete('login')
    newParams.delete('signup')
    newParams.delete('redirect')
    
    const newUrl = `${window.location.pathname}?${newParams.toString()}`.replace(/\?$/, '')
    router.replace(newUrl)
    setIsOpen(false)
  }

  const handleSuccess = () => {
    const redirectUrl = searchParams.get('redirect')
    handleClose()
    if (redirectUrl) {
      router.push(redirectUrl)
    }
  }

  return (
    <AuthModal
      isOpen={isOpen}
      onClose={handleClose}
      onSuccess={handleSuccess}
      defaultMode={searchParams.has('signup') ? 'signup' : 'signin'}
    />
  )
} 