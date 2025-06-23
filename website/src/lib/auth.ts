import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const nextAuthSecret = process.env.NEXTAUTH_SECRET

// Check if required environment variables are available
if (!supabaseUrl || !supabaseServiceKey || !nextAuthSecret) {
  console.error('🔴 CRITICAL: Missing required environment variables for authentication!')
  if (!supabaseUrl) console.error('- NEXT_PUBLIC_SUPABASE_URL is missing.')
  if (!supabaseServiceKey) console.error('- SUPABASE_SERVICE_ROLE_KEY is missing.')
  if (!nextAuthSecret) console.error('- NEXTAUTH_SECRET is missing.')
  console.error('➡️ Please create a .env.local file with these variables.')
  console.error('➡️ See ENVIRONMENT_SETUP.md for detailed instructions.')
  console.error('➡️ The application will not work correctly without them.')
}

// Only create Supabase client if environment variables are available
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: nextAuthSecret,
  adapter: supabaseUrl && supabaseServiceKey ? SupabaseAdapter({
    url: supabaseUrl,
    secret: supabaseServiceKey,
  }) : undefined,
  providers: [
    {
      id: "supabase",
      name: "Supabase",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password')
        }

        if (!supabase) {
          console.error('Supabase client not available - check environment variables')
          throw new Error('Authentication service not configured. Please check environment variables.')
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) {
            console.error('Authentication error:', error)
            
            // Handle specific Supabase auth errors
            if (error.message.includes('Invalid login credentials')) {
              throw new Error('Invalid email or password. Please check your credentials and try again.')
            } else if (error.message.includes('Email not confirmed')) {
              throw new Error('Please verify your email address before signing in.')
            } else if (error.message.includes('Too many requests')) {
              throw new Error('Too many login attempts. Please wait a moment before trying again.')
            } else if (error.message.includes('User not found')) {
              throw new Error('No account found with this email address. Please sign up to create an account.')
            } else {
              throw new Error('Sign in failed. Please try again.')
            }
          }

          if (!data.user) {
            throw new Error('User not found. Please check your credentials.')
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name,
            image: data.user.user_metadata?.avatar_url,
          }
        } catch (error) {
          console.error("Auth error:", error)
          // Re-throw the error with the specific message
          throw error
        }
      }
    }
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === 'development',
}) 