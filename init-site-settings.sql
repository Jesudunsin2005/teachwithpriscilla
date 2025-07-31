-- Initialize site settings with default values
-- This script will insert all the default content for the About page

-- Teaching Statistics
INSERT INTO site_settings (key, value) VALUES 
('teaching_experience_years', '5')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('students_taught_count', '200')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Hero Section
INSERT INTO site_settings (key, value) VALUES 
('about_hero_title', 'Hi, I''m Priscilla!')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_hero_description', 'A passionate English teacher dedicated to helping non-native kids and beginners (teens/adults) discover the joy of language learning through patience, creativity, and care.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Teaching Journey Section
INSERT INTO site_settings (key, value) VALUES 
('about_journey_title', 'My Teaching Journey')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_journey_paragraph_1', 'My journey into teaching English began with a simple realization: language learning should be an adventure, not a chore. After years of working with children from diverse backgrounds, I''ve discovered that every student has a unique way of connecting with English.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_journey_paragraph_2', 'What drives me most is witnessing those magical "aha!" moments when a concept finally clicks. Whether it''s a shy 6-year-old saying their first complete sentence or a teenager finally understanding a grammar rule they''ve been struggling with, these breakthroughs remind me why I love what I do.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_journey_paragraph_3', 'I believe that learning English should build confidence, not tear it down. That''s why I focus on creating a safe, encouraging environment where mistakes are celebrated as stepping stones to success.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Philosophy Cards
INSERT INTO site_settings (key, value) VALUES 
('about_philosophy_title', 'My Teaching Philosophy')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_philosophy_content', 'Every child deserves to feel confident and excited about learning. I create personalized lessons that meet each student where they are and help them grow at their own pace.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_approach_title', 'My Approach')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_approach_content', 'I use interactive games, storytelling, and real-world conversations to make learning engaging and memorable. Grammar and vocabulary become natural parts of fun activities.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_work_with_title', 'Who I Work With')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_work_with_content', 'I specialize in teaching non-native English speakers, from young children taking their first steps in English to teenagers and adults preparing for exams or building conversational skills.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Mission Section
INSERT INTO site_settings (key, value) VALUES 
('about_mission_title', 'My Mission')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_mission_quote', 'To create a world where every child feels confident and excited about learning English. Through patience, creativity, and genuine care, I help young learners build not just language skills, but also the confidence to express themselves and connect with others.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- CTA Section
INSERT INTO site_settings (key, value) VALUES 
('about_cta_title', 'Ready to Start Learning?')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_cta_description', 'I''d love to help your child discover the joy of English learning. Let''s schedule a lesson and begin this exciting journey together!')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value) VALUES 
('about_cta_button_text', 'Book a Lesson with Me')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value; 