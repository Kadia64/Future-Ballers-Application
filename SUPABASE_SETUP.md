# Supabase Setup Guide for FBA Registration System

## Overview
This guide will help you set up Supabase to store tournament registration data for the Future Ballers Association website.

## Step 1: Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up/login with GitHub
3. Create a new project:
   - Project name: `future-ballers-app` (or your preference)
   - Database password: Choose a strong password (save this!)
   - Region: Choose the closest to your users
   - Click "Create new project"

## Step 2: Set Up the Database Schema
1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy and paste the entire contents of `supabase-schema.sql` into the editor
4. Click "Run" to execute the SQL and create your tables

## Step 3: Get Your API Keys
1. In your Supabase dashboard, go to **Settings** → **API** (left sidebar)
2. You'll find two important values:
   - **Project URL**: Something like `https://xxxxx.supabase.co`
   - **Anon/Public Key**: A long string starting with `eyJ...`

## Step 4: Configure Your Next.js App
1. Create a `.env.local` file in your project root (copy from `.env.local.example`)
2. Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```
3. Restart your development server: `npm run dev`

## Step 5: Test the Integration
1. Go to any tournament event page
2. Click "Register Now"
3. Fill out the registration form
4. Submit the form
5. Check your Supabase dashboard:
   - Go to **Table Editor** → **registrations**
   - You should see your test registration!

## Database Structure

### Tables Created:
1. **tournaments** - Stores tournament information
   - Links to your existing event data
   - Stores payment URLs

2. **registrations** - Stores team registrations
   - Team information (name, grade, type, division)
   - Links to tournaments
   - Status tracking (registration and payment)

### Security:
- Row Level Security (RLS) is enabled
- Public can read tournaments
- Public can create registrations
- You can modify these policies in the Supabase dashboard under **Authentication** → **Policies**

## Viewing Registrations in Supabase
1. Go to your Supabase dashboard
2. Click **Table Editor** in the left sidebar
3. Select the `registrations` table
4. You'll see all submitted registrations with:
   - Team details
   - Tournament information
   - Submission timestamps
   - Payment/registration status

## Optional: Email Notifications
To get notified when someone registers:
1. In Supabase, go to **Database** → **Webhooks**
2. Create a webhook that triggers on `registrations` INSERT
3. Send to your preferred notification service (Zapier, Make, etc.)

## Troubleshooting

### "Database connection not configured" error
- Make sure you've created the `.env.local` file
- Check that your environment variables are set correctly
- Restart your Next.js development server

### Registration not saving
- Check the browser console for errors
- Verify your Supabase project is active (not paused)
- Check Supabase dashboard logs under **Logs** → **API**

### Can't see tables in Supabase
- Make sure you ran the SQL schema
- Check for any errors when running the SQL
- Refresh the Supabase dashboard

## Next Steps
After basic setup is working:
1. Add email notifications for new registrations
2. Create an admin dashboard to view/manage registrations
3. Add authentication for admin access
4. Integrate payment status updates
5. Add registration confirmation emails

## Support
- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com/