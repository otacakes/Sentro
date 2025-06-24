'use client'

import { useState } from 'react'
import { useBetterAuth } from './better-auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

interface SignInFormProps {
  onSuccess?: () => void
  onSwitchToSignUp?: () => void
}

export function SignInForm({ onSuccess, onSwitchToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useBetterAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Get CSRF token from meta tag or previous response
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
                       localStorage.getItem('csrf-token')

      const { error } = await signIn(email, password, csrfToken)
      
      if (error) {
        setError(error.message || 'Sign in failed')
      } else {
        onSuccess?.()
        setEmail('')
        setPassword('')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>

      {onSwitchToSignUp && (
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-primary hover:underline"
          >
            Sign up
          </button>
        </div>
      )}
    </form>
  )
} 