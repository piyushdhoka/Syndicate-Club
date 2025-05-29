-- Optimized schema for Supabase Free Tier
-- Free tier limits: 500MB database, 2GB bandwidth, 50MB file uploads

-- Create members table (optimized for free tier)
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL, -- Reduced length for efficiency
  role VARCHAR(100) NOT NULL,
  bio TEXT,
  image TEXT,
  linkedin VARCHAR(255),
  github VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table (optimized for free tier)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(150) NOT NULL, -- Reduced length
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  github VARCHAR(255),
  demo VARCHAR(255),
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id VARCHAR(10) PRIMARY KEY DEFAULT '1',
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance (limited on free tier)
CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Enable Row Level Security (RLS) - Free tier friendly
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Simple policies for free tier (no complex auth)
CREATE POLICY "Allow public read access on members" ON members
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);

-- Allow all operations (since we're not using Supabase auth)
CREATE POLICY "Allow all operations on members" ON members
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on projects" ON projects
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on admin_settings" ON admin_settings
  FOR ALL USING (true);

-- Insert default admin password (admin123 with salt, base64 encoded)
INSERT INTO admin_settings (id, password_hash) 
VALUES ('1', 'YWRtaW4xMjNzeW5kaWNhdGUteC1zYWx0') 
ON CONFLICT (id) DO NOTHING;

-- Insert sample members (optimized for free tier)
INSERT INTO members (name, role, bio, image, linkedin, github) VALUES
('Alex Chen', 'President', 'Full-stack developer passionate about AI and machine learning.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/alexchen', 'https://github.com/alexchen'),
('Sarah Johnson', 'Vice President', 'UI/UX designer with expertise in creating intuitive user experiences.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/sarahjohnson', 'https://github.com/sarahjohnson'),
('Michael Rodriguez', 'Technical Lead', 'Backend engineer specializing in cloud architecture and DevOps.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/michaelrodriguez', 'https://github.com/michaelrodriguez'),
('Emily Davis', 'Events Coordinator', 'Project manager with a passion for organizing tech meetups and workshops.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/emilydavis', 'https://github.com/emilydavis')
ON CONFLICT DO NOTHING;

-- Insert sample projects (optimized for free tier)
INSERT INTO projects (title, description, tech_stack, github, demo, image) VALUES
('AI-Powered Study Assistant', 'An intelligent study companion that helps students organize their learning materials and provides personalized recommendations.', ARRAY['React', 'Node.js', 'OpenAI', 'MongoDB'], 'https://github.com/syndicatex/study-assistant', 'https://study-assistant.syndicatex.org', '/placeholder.svg?height=200&width=400'),
('Campus Event Management System', 'A comprehensive platform for managing university events, from registration to feedback collection.', ARRAY['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'], 'https://github.com/syndicatex/event-management', 'https://events.syndicatex.org', '/placeholder.svg?height=200&width=400'),
('Blockchain Voting Platform', 'A secure and transparent voting system built on blockchain technology for student government elections.', ARRAY['Solidity', 'Web3.js', 'React', 'Ethereum'], 'https://github.com/syndicatex/blockchain-voting', 'https://voting.syndicatex.org', '/placeholder.svg?height=200&width=400')
ON CONFLICT DO NOTHING;

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON admin_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
