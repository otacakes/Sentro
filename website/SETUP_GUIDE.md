# 🚀 Setup Guide for Philippine Commuter's Companion

## Step 1: Create Environment Variables

Create a `.env.local` file in the `website` directory with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ycmvxiqyxuspselgvpck.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbXZ4aXF5eHVzcHNlbGd2cGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTk4ODksImV4cCI6MjA2NjE5NTg4OX0.ShJtVgnAVoqB7-MOIUdF0PfK1B3Qs4w83URSQV4z81k

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-nextauth-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3001
```

## Step 2: Get Your Supabase Service Role Key

1. Go to your Supabase project: https://supabase.com/dashboard/project/ycmvxiqyxuspselgvpck
2. Navigate to **Settings** → **API**
3. Copy the **service_role** key (not the anon key)
4. Add it to your `.env.local` file:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 3: Set Up Database Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the entire content of `database-setup.sql` file
4. Paste it into the SQL editor
5. Click **Run** to execute the script

This will create:

- ✅ User profiles table
- ✅ Favorite locations table
- ✅ Search history table
- ✅ Admin users table
- ✅ Transport stations table
- ✅ Transport lines table
- ✅ Crowd reports table
- ✅ News items table
- ✅ Service alerts table
- ✅ All necessary indexes and security policies
- ✅ Sample data

## Step 4: Update Admin Credentials

After running the SQL script, update the admin user:

1. Go to **Table Editor** → **admin_users**
2. Find the default admin user
3. Update the email and username to your preferred credentials
4. Or run this SQL to update it:

```sql
UPDATE admin_users
SET email = 'your-email@example.com', username = 'your-username'
WHERE email = 'admin@example.com';
```

## Step 5: Test the Application

1. Restart your development server:

   ```bash
   npm run dev
   ```

2. Visit http://localhost:3001

3. Test the authentication:
   - Click "Sign In"
   - Try to access the app features
   - Visit `/admin` with admin credentials

## Step 6: Create Your First User

Since we're using Supabase Auth, you'll need to:

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User**
4. Create a test user with email and password
5. Use these credentials to sign in to the app

## Troubleshooting

### Common Issues:

1. **"supabaseKey is required" error**

   - Make sure you have the `SUPABASE_SERVICE_ROLE_KEY` in your `.env.local`
   - Restart the development server after adding environment variables

2. **"Tables don't exist" error**

   - Make sure you ran the complete `database-setup.sql` script
   - Check the **Table Editor** in Supabase to verify tables were created

3. **Authentication not working**

   - Verify your environment variables are correct
   - Check that you have users in Supabase Authentication
   - Ensure RLS policies are properly set up

4. **Admin access denied**
   - Verify the admin user exists in the `admin_users` table
   - Check that the user ID matches between auth and admin tables

### Getting Help:

1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are set
4. Ensure database setup is complete

## Next Steps

Once everything is working:

1. **Customize the admin credentials** in the database
2. **Add more transport data** through the admin dashboard
3. **Test all features** (map, timeline, news, favorites)
4. **Deploy to production** when ready

## Security Notes

- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ Admin access is properly restricted
- ✅ User data is isolated by user ID
- ✅ Public data (stations, news) is read-only for everyone

Your transport app is now ready to use! 🎉
