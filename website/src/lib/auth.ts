import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { createClient } from "@supabase/supabase-js"
import CredentialsProvider from "next-auth/providers/credentials"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const nextAuthSecret = process.env.NEXTAUTH_SECRET

// Only create Supabase client if environment variables are available
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export const authOptions = {
  secret: nextAuthSecret,
  adapter: supabaseUrl && supabaseServiceKey ? SupabaseAdapter({
    url: supabaseUrl,
    secret: supabaseServiceKey,
  }) : undefined,
  providers: [
    CredentialsProvider({
      id: "supabase",
      name: "Supabase",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password')
        }
        if (!supabase) {
          throw new Error('Authentication service not configured. Please check environment variables.')
        }
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })
        if (error) {
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
      }
    })
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
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt" as const,
  },
  debug: process.env.NODE_ENV === 'development',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions) 