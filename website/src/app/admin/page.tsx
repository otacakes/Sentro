'use client'

import { Suspense } from 'react'
import { AuthGuard } from '@/components/auth/auth-guard'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

function AdminDashboardWrapper() {
  return (
    <AuthGuard requireAuth={true} requireAdmin={true}>
      <AdminDashboard />
    </AuthGuard>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    }>
      <AdminDashboardWrapper />
    </Suspense>
  )
} 