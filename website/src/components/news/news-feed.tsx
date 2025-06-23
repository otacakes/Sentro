'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Clock, ExternalLink, TrendingUp, AlertTriangle, Info } from 'lucide-react'
import { useAppStore } from '@/store/app-store'
import { newsAPI } from '@/lib/api'
import type { NewsItem, ServiceAlert } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface NewsFeedProps {
  className?: string
  showAlerts?: boolean
  showNews?: boolean
  maxItems?: number
}

export function NewsFeed({ 
  className, 
  showAlerts = true, 
  showNews = true,
  maxItems = 10 
}: NewsFeedProps) {
  const { newsItems, serviceAlerts, setNewsItems, setServiceAlerts } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'news' | 'alerts'>('news')

  // Fetch news and alerts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        if (showNews) {
          const news = await newsAPI.getNews()
          setNewsItems(news)
        }
        if (showAlerts) {
          const alerts = await newsAPI.getServiceAlerts()
          setServiceAlerts(alerts)
        }
      } catch (error) {
        console.error('Error fetching news and alerts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [showNews, showAlerts, setNewsItems, setServiceAlerts])

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'low':
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
      case 'fare_change':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
      case 'service_update':
        return 'bg-green-500/10 text-green-600 dark:text-green-400'
      case 'government_program':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'bg-red-500/10 text-red-600 dark:text-red-400'
      case 'moderate':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
      case 'minor':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const renderNewsItem = (item: NewsItem) => (
    <div key={item.id} className="border-b border-border last:border-b-0 py-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {getPriorityIcon(item.priority)}
            <Badge className={getCategoryColor(item.category)}>
              {item.category.replace('_', ' ')}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(item.publishedAt, { addSuffix: true })}
            </span>
          </div>
          <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Source: {item.source}</span>
            {item.url && (
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <ExternalLink className="w-3 h-3 mr-1" />
                Read More
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderAlertItem = (alert: ServiceAlert) => (
    <div key={alert.id} className="border-b border-border last:border-b-0 py-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Badge className={getSeverityColor(alert.severity)}>
              {alert.severity}
            </Badge>
            <Badge variant="outline">
              {alert.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(alert.startTime, { addSuffix: true })}
            </span>
          </div>
          <h3 className="font-medium text-foreground mb-1">{alert.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {alert.affectedLines.map((line) => (
              <Badge key={line} variant="secondary" className="text-xs">
                {line.toUpperCase()}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {alert.affectedStations.length} stations affected
            </span>
            {alert.endTime && (
              <span>
                Until {alert.endTime.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">News & Alerts</CardTitle>
          <div className="flex items-center space-x-1">
            {showNews && showAlerts && (
              <>
                <Button
                  variant={activeTab === 'news' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('news')}
                >
                  News
                </Button>
                <Button
                  variant={activeTab === 'alerts' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('alerts')}
                >
                  Alerts
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Loading updates...</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {activeTab === 'news' && showNews && (
              <div>
                {newsItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Info className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No news updates available</p>
                  </div>
                ) : (
                  newsItems.slice(0, maxItems).map(renderNewsItem)
                )}
              </div>
            )}
            
            {activeTab === 'alerts' && showAlerts && (
              <div>
                {serviceAlerts.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No service alerts</p>
                  </div>
                ) : (
                  serviceAlerts.slice(0, maxItems).map(renderAlertItem)
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-4 pt-4 bg-muted/50 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground hidden sm:inline">Priority Key:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 