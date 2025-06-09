-- Fix duplicate data issue by clearing existing data first
-- Run this if you get duplicate key errors

-- Clear existing data (be careful - this will delete all current data)
DELETE FROM blog_posts;
DELETE FROM resources;
DELETE FROM subscribers WHERE email LIKE '%example%'; -- Only delete example subscribers
DELETE FROM site_settings;

-- Reset sequences to start from 1
-- This ensures clean IDs when we re-insert data

-- Now re-run the seed data
-- Insert sample blog posts
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

-- Insert sample resources
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

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
('teaching_experience_years', '5'),
('students_taught_count', '200');

SELECT 'Data cleanup and re-seeding completed successfully!' as message;
