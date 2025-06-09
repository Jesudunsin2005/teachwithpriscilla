-- Create admin user with default credentials
-- Email: admin@teachwithpriscilla.com
-- Password: TeachAdmin2024!

-- First, we need to create the user in Supabase Auth
-- This will be done through the Supabase dashboard or API

-- For now, let's create a note about the admin credentials
-- You'll need to create this user manually in Supabase Auth dashboard

-- Go to Authentication > Users in your Supabase dashboard
-- Click "Add user" and use these credentials:
-- Email: admin@teachwithpriscilla.com
-- Password: TeachAdmin2024!
-- Email Confirm: true (check this box)

-- Alternative: Use Supabase CLI or API to create the user
-- But for simplicity, manual creation through dashboard is recommended

-- Once the user is created, you can sign in at /admin/login with:
-- Email: admin@teachwithpriscilla.com
-- Password: TeachAdmin2024!

SELECT 'Admin user setup instructions:' as message,
       'Email: admin@teachwithpriscilla.com' as email,
       'Password: TeachAdmin2024!' as password,
       'Create this user in Supabase Auth dashboard' as instructions;
