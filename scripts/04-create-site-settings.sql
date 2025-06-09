-- Create site_settings table for editable content
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default values for teaching highlights
INSERT INTO site_settings (key, value) VALUES
('teaching_experience_years', '5'),
('students_taught_count', '200');

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated admin access
CREATE POLICY "Allow admin full access to site settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policy for public read access
CREATE POLICY "Allow public read access to site settings" ON site_settings
  FOR SELECT USING (true);
