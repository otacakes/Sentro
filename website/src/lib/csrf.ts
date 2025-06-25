import { NextRequest, NextResponse } from 'next/server'

// CSRF token storage (in production, use Redis or database)
const csrfTokens = new Map<string, { token: string; expires: number }>()

// Generate a CSRF token using Web Crypto API (Edge Runtime compatible)
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Validate CSRF token
export function validateCSRFToken(token: string, sessionId: string): boolean {
  const stored = csrfTokens.get(sessionId)
  if (!stored) return false
  
  // Check if token is expired (24 hours)
  if (Date.now() > stored.expires) {
    csrfTokens.delete(sessionId)
    return false
  }
  
  return stored.token === token
}

// Store CSRF token
export function storeCSRFToken(sessionId: string, token: string): void {
  csrfTokens.set(sessionId, {
    token,
    expires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  })
}

// Clean up expired tokens
export function cleanupExpiredTokens(): void {
  const now = Date.now()
  csrfTokens.forEach((data, sessionId) => {
    if (now > data.expires) {
      csrfTokens.delete(sessionId)
    }
  })
}

// CSRF middleware for API routes
export function withCSRF(handler: Function) {
  return async (request: NextRequest) => {
    // Skip CSRF check for GET requests
    if (request.method === 'GET') {
      return handler(request)
    }

    const sessionId = request.cookies.get('session')?.value
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session required for CSRF protection' },
        { status: 401 }
      )
    }

    const csrfToken = request.headers.get('x-csrf-token') || 
                     request.nextUrl.searchParams.get('csrf_token')

    if (!csrfToken || !validateCSRFToken(csrfToken, sessionId)) {
      return NextResponse.json(
        { error: 'Invalid or missing CSRF token' },
        { status: 403 }
      )
    }

    return handler(request)
  }
}

// Generate and set CSRF token in response
export function setCSRFToken(response: NextResponse, sessionId: string): NextResponse {
  const token = generateCSRFToken()
  storeCSRFToken(sessionId, token)
  
  // Set CSRF token in response headers
  response.headers.set('x-csrf-token', token)
  
  return response
} 