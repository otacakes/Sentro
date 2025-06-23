# Environment Setup Guide

## Critical Issue: Missing Environment Variables

Your app is currently failing because it's missing required environment variables for Supabase authentication. This is causing the "Unexpected token '<'" error you're seeing.

## Step 1: Create .env.local File

Create a file named `.env.local` in the `website` directory with the following content:

```env
# Supabase Configuration (REQUIRED for authentication)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_nextauth_secret_here

# API Keys
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_NAME="The Philippine Commuter's Companion"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_APP_URL="http://localhost:3001"

# Environment
NODE_ENV=development

# Feature Flags
NEXT_PUBLIC_ENABLE_OFFLINE_MAPS=true
NEXT_PUBLIC_ENABLE_WEATHER_ADAPTIVE_UI=true
NEXT_PUBLIC_ENABLE_COMMUNITY_REPORTING=true

# Development Settings
NEXT_PUBLIC_ENABLE_DEBUG_MODE=false
NEXT_PUBLIC_ENABLE_MOCK_DATA=false

# API Endpoints
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001/api"

# Map Configuration
NEXT_PUBLIC_DEFAULT_MAP_CENTER_LAT=14.5995
NEXT_PUBLIC_DEFAULT_MAP_CENTER_LNG=120.9842
NEXT_PUBLIC_DEFAULT_MAP_ZOOM=12

# Weather Configuration
NEXT_PUBLIC_WEATHER_UPDATE_INTERVAL=300000
NEXT_PUBLIC_DEFAULT_CITY="Manila"
NEXT_PUBLIC_DEFAULT_COUNTRY="PH"

# Transport Data
NEXT_PUBLIC_ENABLE_LRT1=true
NEXT_PUBLIC_ENABLE_LRT2=true
NEXT_PUBLIC_ENABLE_MRT3=true
NEXT_PUBLIC_ENABLE_BUSES=true
NEXT_PUBLIC_ENABLE_JEEPNEYS=true

# Community Features
NEXT_PUBLIC_ENABLE_USER_REPORTS=true
NEXT_PUBLIC_ENABLE_CROWD_LEVELS=true
NEXT_PUBLIC_ENABLE_SERVICE_ALERTS=true

# Privacy Settings
NEXT_PUBLIC_ENABLE_LOCATION_TRACKING=false
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_CRASH_REPORTING=false

# Performance
NEXT_PUBLIC_ENABLE_SERVICE_WORKER=true
NEXT_PUBLIC_ENABLE_CACHE=true
NEXT_PUBLIC_CACHE_DURATION=3600000
```

## Step 2: Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`
   - **Anon Public Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Generate NextAuth Secret

Generate a secure random string for `NEXTAUTH_SECRET`:

```bash
# On Windows PowerShell:
openssl rand -base64 32

# Or use this online generator: https://generate-secret.vercel.app/32
```

## Step 4: Update .env.local

Replace the placeholder values in your `.env.local` file with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXTAUTH_SECRET=your_generated_secret_here
```

## Step 5: Restart the Development Server

After creating the `.env.local` file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 6: Verify Setup

1. The authentication errors should be resolved
2. You should be able to access the app without the "Unexpected token '<'" error
3. The login page should work properly

## Troubleshooting

### If you still get errors:

1. **Check file location**: Make sure `.env.local` is in the `website` directory
2. **Check file format**: No spaces around the `=` sign
3. **Restart server**: Always restart after changing environment variables
4. **Check Supabase**: Ensure your Supabase project is active and the keys are correct

### Common Issues:

- **"Cannot read properties of undefined"**: Missing `SUPABASE_SERVICE_ROLE_KEY`
- **"Unexpected token '<'"**: Missing `NEXT_PUBLIC_SUPABASE_URL`
- **Authentication fails**: Incorrect or expired Supabase keys

## Next Steps

Once the environment is set up:

1. Run the database setup script: `database-setup.sql`
2. Test the authentication flow
3. Verify admin functionality works

## Security Notes

- Never commit `.env.local` to version control
- Keep your service role key secure
- Use different keys for development and production
