import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ErrorBoundary } from '@/components/error-boundary'
import { ThemeProvider } from '@/components/theme-provider'
import { BetterAuthProvider } from '@/components/auth/better-auth-provider'
import { AppStoreProvider } from '@/store/app-store'
import { SessionProvider } from 'next-auth/react'
import { AuthModalController } from '@/components/auth/auth-modal-controller'
import { Suspense } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Philippine Commuter's Companion",
  description: 'Your smart companion for navigating Philippine public transportation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <SessionProvider>
              <AppStoreProvider>
                <BetterAuthProvider>
                  <Suspense fallback={<div>Loading...</div>}>
                    <AuthModalController />
                  </Suspense>
                  {children}
                </BetterAuthProvider>
              </AppStoreProvider>
            </SessionProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
} 