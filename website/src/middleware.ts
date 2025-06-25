import { NextRequest, NextResponse } from 'next/server'
import { generateCSRFToken, storeCSRFToken } from './lib/csrf'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Generate session ID if not present
  let sessionId = request.cookies.get('session')?.value
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    response.cookies.set('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    })
  }

  // Generate CSRF token for forms (only on specific routes)
  if (request.nextUrl.pathname.startsWith('/login') || 
      request.nextUrl.pathname.startsWith('/signup') ||
      request.nextUrl.pathname.startsWith('/dashboard')) {
    
    const csrfToken = generateCSRFToken()
    storeCSRFToken(sessionId, csrfToken)
    
    // Set CSRF token in response headers
    response.headers.set('x-csrf-token', csrfToken)
  }

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 