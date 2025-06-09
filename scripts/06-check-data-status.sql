-- Check the current status of your database
-- Run this to see what data exists

SELECT 'Blog Posts:' as table_name, COUNT(*) as record_count FROM blog_posts
UNION ALL
SELECT 'Resources:', COUNT(*) FROM resources
UNION ALL
SELECT 'Subscribers:', COUNT(*) FROM subscribers
UNION ALL
SELECT 'Site Settings:', COUNT(*) FROM site_settings;

-- Show existing blog posts
SELECT 'Existing Blog Posts:' as info;
SELECT title, slug, published_at FROM blog_posts ORDER BY created_at DESC;

-- Show existing resources
SELECT 'Existing Resources:' as info;
SELECT title, file_path FROM resources ORDER BY created_at DESC;

-- Show site settings
SELECT 'Site Settings:' as info;
SELECT key, value FROM site_settings;
