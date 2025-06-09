# Teaching Blog CMS

A modern blog and CMS built with Next.js and Supabase for English teaching content.

## 🚀 Quick Setup

### 1. Environment Variables

Create a `.env.local` file in your project root and add:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### 2. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Database Setup

Run these SQL scripts in your Supabase SQL editor:

1. `scripts/01-create-tables.sql` - Creates the database schema
2. `scripts/02-seed-data.sql` - Adds sample content
3. `scripts/03-create-admin-user.sql` - Admin setup instructions
4. `scripts/04-create-site-settings.sql` - Site settings table

### 4. Admin User Setup

Create an admin user in your Supabase dashboard:

1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Use these credentials:
   - **Email:** `admin@teachwithpriscilla.com`
   - **Password:** `TeachAdmin2024!`
   - **Email Confirm:** ✅ (check this box)

### 5. Start Development

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see your site!

## 🔐 Admin Access

- **URL:** `/login/admin`
- **Email:** `admin@teachwithpriscilla.com`
- **Password:** `TeachAdmin2024!`

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── blog/              # Blog pages
│   └── api/               # API routes
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # UI components
├── lib/                  # Utilities and configurations
└── scripts/              # Database setup scripts
\`\`\`

## 🌟 Features

- 📝 **Blog Management** - Create, edit, delete posts
- 📁 **Resource Management** - Upload downloadable files
- 📧 **Newsletter System** - Collect and manage subscribers
- 🔐 **Admin Dashboard** - Secure content management
- 📱 **Responsive Design** - Works on all devices
- 🚀 **SEO Optimized** - Built for search engines

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add all the variables from your `.env.local`
4. Deploy!

### Environment Variables for Production

Make sure to add these in your Vercel dashboard:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
\`\`\`

## 🛠️ Troubleshooting

### "supabaseUrl is required" Error

This means your environment variables aren't set up correctly:

1. Check that `.env.local` exists in your project root
2. Verify all required variables are present
3. Restart your development server
4. Make sure there are no typos in variable names

### Admin Login Issues

1. Verify the admin user was created in Supabase Auth
2. Check that the email and password match exactly
3. Ensure the user's email is confirmed in Supabase

### Database Errors

1. Make sure all SQL scripts have been run
2. Check that Row Level Security policies are set up
3. Verify your service role key has the correct permissions

## 📞 Support

If you need help:
1. Check this README first
2. Look at the error messages in your browser console
3. Verify your Supabase setup
4. Make sure all environment variables are correct

## 🔒 Security Notes

⚠️ **Important:** Change the default admin password after first login!

- Never commit `.env.local` to version control
- Use strong passwords for production
- Regularly update your Supabase keys if needed
