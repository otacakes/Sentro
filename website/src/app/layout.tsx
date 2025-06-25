import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ErrorBoundary } from '@/components/error-boundary'
import { ThemeProvider } from '@/components/theme-provider'
import { BetterAuthProvider } from '@/components/auth/better-auth-provider'
import { AppStoreProvider } from '@/store/app-store'
import { AuthModalController } from '@/components/auth/auth-modal-controller'
import { Suspense } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Sentro",
  description: 'Sentro: Take Control of Your Daily Commute. Live vehicle tracking, crowd levels, and instant alerts for trains, buses, and modern jeepneys. Privacy-first, community-driven, open source.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta name="csrf-token" content="" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <AppStoreProvider>
              <BetterAuthProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <AuthModalController />
                </Suspense>
                {children}
              </BetterAuthProvider>
            </AppStoreProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
} 