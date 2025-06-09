-- Verify Database Setup
-- Run this script to check if your database is set up correctly

-- Check if tables exist
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' AND table_name = 'blog_posts'
) as blog_posts_table_exists;

SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' AND table_name = 'resources'
) as resources_table_exists;

SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' AND table_name = 'subscribers'
) as subscribers_table_exists;

SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' AND table_name = 'site_settings'
) as site_settings_table_exists;

-- Check row counts
SELECT 'Blog Posts: ' || COUNT(*) as blog_posts_count FROM blog_posts;
SELECT 'Resources: ' || COUNT(*) as resources_count FROM resources;
SELECT 'Subscribers: ' || COUNT(*) as subscribers_count FROM subscribers;
SELECT 'Site Settings: ' || COUNT(*) as site_settings_count FROM site_settings;

-- Check RLS policies
SELECT 
  table_name,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY table_name
ORDER BY table_name;

-- Show sample data
SELECT 'SAMPLE BLOG POSTS:' as section;
SELECT title, slug, substring(content, 1, 50) || '...' as content_preview
FROM blog_posts
LIMIT 3;

SELECT 'SAMPLE RESOURCES:' as section;
SELECT title, description, file_path
FROM resources
LIMIT 3;

SELECT 'SITE SETTINGS:' as section;
SELECT key, value
FROM site_settings;
