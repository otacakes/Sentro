# Authentication & Admin Setup Guide

This guide will help you set up the authentication system and admin functionality for the Philippine Commuter's Companion app.

## Prerequisites

1. A Supabase project with authentication enabled
2. Environment variables configured

## Environment Variables

Create a `.env.local` file in the website directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## Database Setup

1. **Run the SQL script** in your Supabase SQL editor:

   ```sql
   -- Copy and paste the contents of supabase-admin-setup.sql
   ```

2. **Update admin credentials** in the SQL script:
   - Replace `'admin@example.com'` with your desired admin email
   - Replace `'admin'` with your desired admin username

## Features Implemented

### Authentication

- ✅ Better-auth integration with Supabase
- ✅ JWT-based sessions
- ✅ Protected routes with AuthGuard
- ✅ Sign in/up modal
- ✅ User profile management

### Admin System

- ✅ Admin user management
- ✅ Role-based access control (admin/super_admin)
- ✅ Admin dashboard with shadcn/ui components
- ✅ Statistics and user management
- ✅ API endpoints for admin operations

### Protected Features

- ✅ App features require authentication
- ✅ Admin dashboard requires admin privileges
- ✅ User-specific data (favorites, search history)

## Usage

### For Users

1. Visit the homepage
2. Click "Sign In" to access app features
3. Use the map, timeline, and news features
4. Save favorite locations (requires authentication)

### For Admins

1. Sign in with admin credentials
2. Visit `/admin` to access the admin dashboard
3. View statistics and manage users
4. Monitor app usage and user activity

## API Endpoints

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `POST /api/auth/check-admin` - Check admin status

### Admin

- `GET /api/admin/stats` - Get admin statistics
- `GET /api/admin/users` - Get admin users
- `POST /api/admin/users` - Create admin user

## Security Features

- Row Level Security (RLS) enabled on admin_users table
- JWT-based authentication
- Role-based access control
- Protected API endpoints
- Secure session management

## Troubleshooting

### Common Issues

1. **Authentication not working**

   - Check environment variables
   - Verify Supabase configuration
   - Ensure database tables exist

2. **Admin access denied**

   - Verify admin user exists in database
   - Check admin user is active
   - Ensure correct user ID mapping

3. **API errors**
   - Check Supabase service role key
   - Verify RLS policies
   - Check network connectivity

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure database setup is complete
4. Check Supabase logs for database errors

## Next Steps

- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Create user management interface
- [ ] Add audit logging
- [ ] Implement rate limiting
- [ ] Add two-factor authentication
