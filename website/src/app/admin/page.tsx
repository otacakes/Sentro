'use client'

import { AuthGuard } from '@/components/auth/auth-guard'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export default function AdminPage() {
  return (
    <AuthGuard requireAuth={true} requireAdmin={true}>
      <AdminDashboard />
    </AuthGuard>
  )
} 