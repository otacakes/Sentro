'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  defaultMode?: 'signin' | 'signup'
}

export function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  defaultMode = 'signin' 
}: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode)

  useEffect(() => {
    setMode(defaultMode)
  }, [defaultMode])

  const handleSuccess = () => {
    onSuccess?.()
    onClose()
  }

  const handleSwitchToSignUp = () => setMode('signup')
  const handleSwitchToSignIn = () => setMode('signin')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="text-center">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </DialogTitle>
          </DialogHeader>
          
          {mode === 'signin' ? (
            <SignInForm 
              onSuccess={handleSuccess}
              onSwitchToSignUp={handleSwitchToSignUp}
            />
          ) : (
            <SignUpForm 
              onSuccess={handleSuccess}
              onSwitchToSignIn={handleSwitchToSignIn}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 