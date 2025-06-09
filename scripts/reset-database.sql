-- WARNING: This script will delete ALL data from your database
-- Only run this if you want to completely reset your database

-- Drop all tables
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS subscribers CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- Confirmation message
SELECT 'Database has been completely reset. Run 00-complete-setup.sql to recreate the database.' as message;
