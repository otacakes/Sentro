'use client'

import { useState, useEffect } from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  MapPin, 
  AlertTriangle, 
  Settings, 
  BarChart3, 
  Shield,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalLocations: number
  totalAlerts: number
}

interface AdminUser {
  id: string
  email: string
  username: string
  role: 'admin' | 'super_admin'
  is_active: boolean
  created_at: string
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalLocations: 0,
    totalAlerts: 0
  })
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      // Fetch admin statistics
      const statsResponse = await fetch('/api/admin/stats')
      const statsData = await statsResponse.json()
      
      if (statsData.success) {
        setStats(statsData.data)
      }

      // Fetch admin users
      const usersResponse = await fetch('/api/admin/users')
      const usersData = await usersResponse.json()
      
      if (usersData.success) {
        setAdminUsers(usersData.data)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Custom Admin Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.activeUsers} active
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saved Locations</CardTitle>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalLocations}</div>
                    <p className="text-xs text-muted-foreground">
                      User favorites
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalAlerts}</div>
                    <p className="text-xs text-muted-foreground">
                      Service updates
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminUsers.length}</div>
                    <p className="text-xs text-muted-foreground">
                      System administrators
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Admin Management Tabs */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="users" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="users">User Management</TabsTrigger>
                    <TabsTrigger value="admins">Admin Users</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="users" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>
                          View and manage user accounts
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          User management features coming soon...
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="admins" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Admin Users</CardTitle>
                            <CardDescription>
                              Manage system administrators
                            </CardDescription>
                          </div>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Admin
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {adminUsers.map((admin) => (
                            <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <Shield className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{admin.username}</p>
                                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={admin.role === 'super_admin' ? 'default' : 'secondary'}>
                                  {admin.role}
                                </Badge>
                                <Badge variant={admin.is_active ? 'default' : 'destructive'}>
                                  {admin.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Analytics</CardTitle>
                        <CardDescription>
                          View app usage statistics and insights
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ChartAreaInteractive />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>System Settings</CardTitle>
                        <CardDescription>
                          Configure app settings and preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center h-64 text-muted-foreground">
                          <div className="text-center">
                            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Settings panel coming soon...</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 