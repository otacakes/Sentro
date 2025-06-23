# Vercel Deployment Guide for Sentro

This guide will help you deploy Sentro to Vercel with proper configuration and environment variables.

## Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [GitHub Account](https://github.com)
- Supabase project set up
- Google Maps API key (optional)
- OpenWeather API key (optional)

## Step 1: Prepare Your Repository

Ensure your repository is ready for deployment:

```bash
# Clone your repository
git clone https://github.com/otacakes/Sentro.git
cd Sentro

# Install dependencies
npm install
```

## Step 2: Set Up Vercel

### Option A: Deploy via Vercel Dashboard

1. **Connect Repository**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository: `otacakes/Sentro`
   - Select the repository

2. **Configure Project Settings**:

   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (root of repository)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `website/.next`
   - **Install Command**: `npm install`

3. **Environment Variables**:
   Add the following environment variables in Vercel:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # NextAuth Configuration
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=https://your-domain.vercel.app

   # Optional: API Keys
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_API_BASE_URL=https://your-domain.vercel.app/api
   ```

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:

   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL
   ```

## Step 3: Configure Supabase

1. **Update Supabase Auth Settings**:

   - Go to your Supabase Dashboard
   - Navigate to Authentication > URL Configuration
   - Add your Vercel domain to:
     - Site URL: `https://your-domain.vercel.app`
     - Redirect URLs: `https://your-domain.vercel.app/auth/callback`

2. **Update CORS Settings**:
   - Go to Settings > API
   - Add your Vercel domain to the allowed origins

## Step 4: Configure Domain (Optional)

1. **Custom Domain**:

   - In Vercel Dashboard, go to your project
   - Click "Settings" > "Domains"
   - Add your custom domain
   - Update DNS records as instructed

2. **Update Environment Variables**:
   - Update `NEXTAUTH_URL` with your custom domain
   - Update `NEXT_PUBLIC_APP_URL` with your custom domain
   - Update Supabase redirect URLs

## Step 5: Verify Deployment

1. **Check Build Logs**:

   - Monitor the build process in Vercel Dashboard
   - Ensure all tests pass
   - Check for any build errors

2. **Test Functionality**:
   - Test authentication flow
   - Test API endpoints
   - Test map functionality (if using Google Maps)
   - Test weather features (if using OpenWeather)

## Environment Variables Reference

### Required Variables

| Variable                        | Description               | Example                                   |
| ------------------------------- | ------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL | `https://xyz.supabase.co`                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key    | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NEXTAUTH_SECRET`               | NextAuth secret key       | `your-super-secret-key`                   |
| `NEXTAUTH_URL`                  | Your app URL              | `https://your-domain.vercel.app`          |

### Optional Variables

| Variable                          | Description         | Example                              |
| --------------------------------- | ------------------- | ------------------------------------ |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | `AIzaSyB...`                         |
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | OpenWeather API key | `1234567890abcdef...`                |
| `NEXT_PUBLIC_APP_URL`             | App base URL        | `https://your-domain.vercel.app`     |
| `NEXT_PUBLIC_API_BASE_URL`        | API base URL        | `https://your-domain.vercel.app/api` |

## Troubleshooting

### Common Issues

1. **Build Failures**:

   - Check Node.js version (requires 18+)
   - Ensure all dependencies are installed
   - Check for TypeScript errors

2. **Authentication Issues**:

   - Verify Supabase environment variables
   - Check redirect URLs in Supabase
   - Ensure NEXTAUTH_URL is correct

3. **API Errors**:

   - Check API routes are properly configured
   - Verify environment variables are set
   - Check CORS settings

4. **Map Loading Issues**:
   - Verify Google Maps API key
   - Check API key restrictions
   - Ensure billing is enabled

### Performance Optimization

1. **Enable Edge Functions**:

   - API routes will automatically use Edge Functions
   - Faster response times globally

2. **Image Optimization**:

   - Next.js Image component is automatically optimized
   - Configure image domains in `next.config.js`

3. **Caching**:
   - Vercel automatically caches static assets
   - API responses can be cached with appropriate headers

## Monitoring and Analytics

1. **Vercel Analytics**:

   - Enable Vercel Analytics in project settings
   - Monitor performance and user behavior

2. **Error Tracking**:
   - Set up error monitoring (e.g., Sentry)
   - Monitor API errors and user feedback

## Security Considerations

1. **Environment Variables**:

   - Never commit sensitive keys to repository
   - Use Vercel's environment variable management
   - Rotate keys regularly

2. **CORS Configuration**:

   - Configure Supabase CORS properly
   - Restrict origins to your domain

3. **API Security**:
   - Implement rate limiting
   - Validate all inputs
   - Use proper authentication

## Support

If you encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
3. Check [Supabase Documentation](https://supabase.com/docs)
4. Open an issue in the [GitHub repository](https://github.com/otacakes/Sentro/issues)

---

**Last Updated**: December 2024
**Version**: 1.0
