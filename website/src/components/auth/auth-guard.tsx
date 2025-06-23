'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useBetterAuth } from './better-auth-provider'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Shield, Loader2 } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  fallback?: React.ReactNode
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireAdmin = false,
  fallback,
}: AuthGuardProps) {
  const { user, loading } = useBetterAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingAdmin, setCheckingAdmin] = useState(false)

  useEffect(() => {
    if (!loading && !user && requireAuth) {
      if (searchParams.has('login')) return

      const newParams = new URLSearchParams(searchParams.toString())
      const redirectUrl =
        pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')

      newParams.set('login', 'true')
      newParams.set('redirect', redirectUrl)

      router.push(`${pathname}?${newParams.toString()}`)
      return
    }

    const checkAdminStatus = async () => {
      if (!user || !requireAdmin) return

      setCheckingAdmin(true)
      try {
        // Check if user is admin by querying the admin_users table
        const { data, error } = await fetch('/api/auth/check-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        }).then((res) => res.json())

        if (error) {
          console.error('Error checking admin status:', error)
          setIsAdmin(false)
        } else {
          setIsAdmin(data?.isAdmin || false)
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
      } finally {
        setCheckingAdmin(false)
      }
    }

    checkAdminStatus()
  }, [user, loading, requireAuth, requireAdmin, pathname, router, searchParams])

  // While the session is loading, always show a loading indicator.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If auth is required but there is no user, the redirect effect is running.
  // Show a loader to prevent the protected content from flashing.
  if (requireAuth && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Authentication required</p>
        </div>
      </div>
    )
  }

  // If authentication is not required, render children immediately.
  if (!requireAuth) {
    return <>{children}</>
  }

  // If admin access is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <Shield className="h-6 w-6 text-red-500" />
            </div>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this area
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/')}
            >
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // All checks passed. User is authenticated (and admin if required).
  return <>{children}</>
}