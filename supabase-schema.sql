-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT,
  image TEXT,
  linkedin TEXT,
  github TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  github TEXT,
  demo TEXT,
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on members" ON members
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);

-- Create policies for admin operations (you'll need to implement proper auth)
CREATE POLICY "Allow all operations for authenticated users" ON members
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON projects
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON admin_settings
  FOR ALL USING (true);

-- Insert default admin password (admin123 encoded in base64)
INSERT INTO admin_settings (id, password_hash) 
VALUES ('1', 'YWRtaW4xMjM=') 
ON CONFLICT (id) DO NOTHING;

-- Insert sample members
INSERT INTO members (name, role, bio, image, linkedin, github) VALUES
('Alex Chen', 'President', 'Full-stack developer passionate about AI and machine learning.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/alexchen', 'https://github.com/alexchen'),
('Sarah Johnson', 'Vice President', 'UI/UX designer with expertise in creating intuitive user experiences.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/sarahjohnson', 'https://github.com/sarahjohnson'),
('Michael Rodriguez', 'Technical Lead', 'Backend engineer specializing in cloud architecture and DevOps.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/michaelrodriguez', 'https://github.com/michaelrodriguez'),
('Emily Davis', 'Events Coordinator', 'Project manager with a passion for organizing tech meetups and workshops.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/emilydavis', 'https://github.com/emilydavis')
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, tech_stack, github, demo, image) VALUES
('AI-Powered Study Assistant', 'An intelligent study companion that helps students organize their learning materials and provides personalized recommendations.', ARRAY['React', 'Node.js', 'OpenAI', 'MongoDB'], 'https://github.com/syndicatex/study-assistant', 'https://study-assistant.syndicatex.org', '/placeholder.svg?height=200&width=400'),
('Campus Event Management System', 'A comprehensive platform for managing university events, from registration to feedback collection.', ARRAY['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'], 'https://github.com/syndicatex/event-management', 'https://events.syndicatex.org', '/placeholder.svg?height=200&width=400'),
('Blockchain Voting Platform', 'A secure and transparent voting system built on blockchain technology for student government elections.', ARRAY['Solidity', 'Web3.js', 'React', 'Ethereum'], 'https://github.com/syndicatex/blockchain-voting', 'https://voting.syndicatex.org', '/placeholder.svg?height=200&width=400')
ON CONFLICT DO NOTHING;
