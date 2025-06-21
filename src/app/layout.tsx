import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "The Philippine Commuter's Companion",
  description: 'A privacy-first, community-driven transport app for Philippine commuters with weather-adaptive UI',
  keywords: ['transport', 'philippines', 'commuter', 'public transport', 'weather-adaptive', 'community-driven', 'privacy-first', 'open-source'],
  authors: [{ name: 'Philippine Commuter\'s Companion Team' }],
  creator: 'Philippine Commuter\'s Companion Team',
  publisher: 'Philippine Commuter\'s Companion',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://philippine-commuters-companion.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "The Philippine Commuter's Companion",
    description: 'A privacy-first, community-driven transport app for Philippine commuters with weather-adaptive UI',
    url: 'https://philippine-commuters-companion.vercel.app',
    siteName: "The Philippine Commuter's Companion",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "The Philippine Commuter's Companion",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Philippine Commuter's Companion",
    description: 'A privacy-first, community-driven transport app for Philippine commuters with weather-adaptive UI',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Commuter's Companion" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
} 