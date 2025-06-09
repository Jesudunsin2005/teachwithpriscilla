-- Complete Database Setup Script
-- This script will:
-- 1. Drop existing tables (if they exist)
-- 2. Create all necessary tables
-- 3. Set up Row Level Security
-- 4. Insert sample data
-- 5. Create site settings

-- Step 1: Drop existing tables if they exist
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS subscribers CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- Step 2: Create all necessary tables
-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscribers table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT FALSE
);

-- Create site_settings table
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create indexes for better performance
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_subscribers_email ON subscribers(email);

-- Step 4: Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Step 5: Create policies for public read access
CREATE POLICY "Allow public read access to published blog posts" ON blog_posts
  FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

CREATE POLICY "Allow public read access to resources" ON resources
  FOR SELECT USING (true);

-- Step 6: Create policies for authenticated admin access
CREATE POLICY "Allow admin full access to blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin full access to resources" ON resources
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin read access to subscribers" ON subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Step 7: Allow public insert for subscribers (for newsletter signup)
CREATE POLICY "Allow public insert to subscribers" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Step 8: Create policies for site settings
CREATE POLICY "Allow admin full access to site settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to site settings" ON site_settings
  FOR SELECT USING (true);

-- Step 9: Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, published_at) VALUES
(
  'Why I Teach: My Journey with Young English Learners',
  'why-i-teach-my-journey',
  'Discover what drives my passion for teaching English to non-native kids and beginners, and how every small breakthrough makes it all worthwhile.',
  '# Why I Teach: My Journey with Young English Learners

Teaching English to non-native children has been one of the most rewarding experiences of my life. Every day brings new challenges, but also incredible moments of joy when I see a child''s face light up as they finally grasp a concept they''ve been struggling with.

## The Magic of First Words

There''s something truly magical about being present when a child speaks their first complete English sentence. The pride in their eyes, the excitement in their voice – these moments remind me why I chose this path.

## Building Confidence, One Lesson at a Time

My approach focuses on creating a safe, encouraging environment where mistakes are celebrated as learning opportunities. I believe that confidence is just as important as grammar when it comes to language learning.

## Looking Forward

Every student teaches me something new about patience, creativity, and the power of human connection. This blog will document our journey together – the challenges, the breakthroughs, and everything in between.',
  NOW()
),
(
  'Fun Ways to Practice English at Home',
  'fun-ways-practice-english-home',
  'Simple, engaging activities parents can do with their children to reinforce English learning outside the classroom.',
  '# Fun Ways to Practice English at Home

Learning doesn''t stop when the lesson ends! Here are some creative ways to keep English practice fun and engaging at home.

## 1. Story Time Adventures

Read English picture books together. Don''t worry about perfect pronunciation – focus on enjoying the story and discussing what happens.

## 2. Cooking Together

Follow simple English recipes. This combines practical life skills with vocabulary building. Words like "mix," "pour," and "bake" become much more memorable when you''re actually doing them!

## 3. English Music and Songs

Play English songs during car rides or while doing chores. Singing helps with pronunciation and rhythm of the language.

## 4. Label Everything

Put English labels on household items. This creates a immersive environment where learning happens naturally.

Remember, the goal is to make English feel like a natural part of daily life, not an additional chore!',
  NOW() - INTERVAL '1 week'
);

-- Step 10: Insert sample resources
INSERT INTO resources (title, description, file_path) VALUES
(
  'Beginner Vocabulary Flashcards',
  'A set of 50 colorful flashcards featuring common English words for beginners. Perfect for daily practice!',
  'resources/beginner-vocabulary-flashcards.pdf'
),
(
  'English Pronunciation Guide',
  'A comprehensive guide to English pronunciation with phonetic symbols and practice exercises.',
  'resources/pronunciation-guide.pdf'
),
(
  'Fun Grammar Worksheets',
  'Interactive worksheets that make grammar practice enjoyable for young learners.',
  'resources/grammar-worksheets.pdf'
);

-- Step 11: Insert default site settings
INSERT INTO site_settings (key, value) VALUES
('teaching_experience_years', '5'),
('students_taught_count', '200');

-- Step 12: Display admin user setup instructions
SELECT '
==============================================
ADMIN USER SETUP INSTRUCTIONS
==============================================

To create your admin user:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Click "Add user" and use these credentials:
   - Email: admin@teachwithpriscilla.com
   - Password: TeachAdmin2024!
   - Email Confirm: true (check this box)

4. Once created, you can sign in at /login/admin

==============================================
' as admin_setup;

-- Step 13: Verify setup
SELECT 'Database setup completed successfully!' as status;
SELECT 'Blog Posts: ' || COUNT(*) as blog_posts_count FROM blog_posts;
SELECT 'Resources: ' || COUNT(*) as resources_count FROM resources;
SELECT 'Site Settings: ' || COUNT(*) as settings_count FROM site_settings;
