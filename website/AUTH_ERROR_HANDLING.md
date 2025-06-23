# Authentication Error Handling

This document explains how authentication errors are handled in the Philippine Commuter's Companion app.

## Overview

The app uses NextAuth.js with Supabase as the authentication provider. We've implemented comprehensive error handling to provide users with clear, actionable error messages.

## Error Types and Handling

### 1. CredentialsSignin Error

**What it is:** This error occurs when NextAuth.js cannot find a user with the provided credentials.

**How it's handled:**

- **Before:** Generic "CredentialsSignin" error message
- **After:** User-friendly message: "Invalid email or password. Please check your credentials and try again."

### 2. User Not Found

**What it is:** When a user tries to sign in with an email that doesn't exist in the system.

**How it's handled:**

- **Message:** "No account found with this email address. Please sign up to create an account."
- **Action:** The sign-in form suggests creating a new account

### 3. Invalid Login Credentials

**What it is:** When the email exists but the password is incorrect.

**How it's handled:**

- **Message:** "Invalid email or password. Please check your credentials and try again."

### 4. Email Not Confirmed

**What it is:** When a user tries to sign in before verifying their email address.

**How it's handled:**

- **Message:** "Please verify your email address before signing in."

### 5. Too Many Requests

**What it is:** Rate limiting protection against brute force attacks.

**How it's handled:**

- **Message:** "Too many login attempts. Please wait a moment before trying again."

### 6. Missing Credentials

**What it is:** When email or password fields are empty.

**How it's handled:**

- **Message:** "Please provide both email and password."

## Sign-Up Error Handling

### 1. User Already Exists

**What it is:** When a user tries to create an account with an email that already exists.

**How it's handled:**

- **Message:** "An account with this email already exists. Please sign in instead."
- **Action:** User is redirected to sign-in form

### 2. Password Requirements

**What it is:** When the password doesn't meet minimum requirements.

**How it's handled:**

- **Message:** "Password must be at least 6 characters long."

### 3. Invalid Email

**What it is:** When an invalid email format is provided.

**How it's handled:**

- **Message:** "Please enter a valid email address."

## Implementation Details

### Auth Configuration (`src/lib/auth.ts`)

The NextAuth configuration includes specific error handling in the `authorize` function:

```typescript
if (error.message.includes('Invalid login credentials')) {
  throw new Error(
    'Invalid email or password. Please check your credentials and try again.'
  )
} else if (error.message.includes('Email not confirmed')) {
  throw new Error('Please verify your email address before signing in.')
}
// ... more specific error handling
```

### Better Auth Provider (`src/components/auth/better-auth-provider.tsx`)

The auth provider translates NextAuth errors into user-friendly messages:

```typescript
if (result.error === 'CredentialsSignin') {
  errorMessage =
    'Invalid email or password. Please check your credentials and try again.'
}
```

### Sign-Up API (`src/app/api/auth/signup/route.ts`)

The sign-up endpoint provides specific error handling for registration:

```typescript
if (error.message.includes('User already registered')) {
  return NextResponse.json(
    {
      error:
        'An account with this email already exists. Please sign in instead.',
    },
    { status: 409 }
  )
}
```

## User Experience Improvements

1. **Clear Error Messages:** Users now receive specific, actionable error messages instead of generic ones.

2. **Guided Actions:** When a user is not found, the app suggests creating a new account.

3. **Success Feedback:** After successful sign-up, users receive clear confirmation and guidance.

4. **Form State Management:** Error and success states are properly managed to provide immediate feedback.

## Testing Error Scenarios

To test the error handling:

1. **User Not Found:** Try signing in with a non-existent email
2. **Wrong Password:** Try signing in with correct email but wrong password
3. **Duplicate Sign-Up:** Try creating an account with an existing email
4. **Invalid Email:** Try signing up with an invalid email format
5. **Short Password:** Try signing up with a password less than 6 characters

## Environment Variables Required

Make sure these environment variables are set in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3001
```

## Troubleshooting

If you encounter authentication issues:

1. Check that all environment variables are properly set
2. Verify that Supabase is configured correctly
3. Ensure the database tables are created (run `database-setup.sql`)
4. Check the browser console for detailed error messages
5. Verify that the Supabase service role key has admin permissions
