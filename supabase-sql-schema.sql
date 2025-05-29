-- Standard SQL Schema for Supabase (compatible with existing accounts)
-- This uses standard SQL syntax instead of PostgreSQL-specific features

-- Create members table
CREATE TABLE members (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image TEXT,
  linkedin TEXT,
  github TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Create projects table
CREATE TABLE projects (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT NOT NULL, -- Store as JSON string
  github TEXT,
  demo TEXT,
  image TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Create admin_settings table
CREATE TABLE admin_settings (
  id TEXT PRIMARY KEY DEFAULT '1',
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Insert default admin password (admin123 with salt, base64 encoded)
INSERT OR IGNORE INTO admin_settings (id, password_hash) 
VALUES ('1', 'YWRtaW4xMjNzeW5kaWNhdGUteC1zYWx0');

-- Insert sample members
INSERT OR IGNORE INTO members (id, name, role, bio, image, linkedin, github) VALUES
('member-1', 'Alex Chen', 'President', 'Full-stack developer passionate about AI and machine learning.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/alexchen', 'https://github.com/alexchen'),
('member-2', 'Sarah Johnson', 'Vice President', 'UI/UX designer with expertise in creating intuitive user experiences.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/sarahjohnson', 'https://github.com/sarahjohnson'),
('member-3', 'Michael Rodriguez', 'Technical Lead', 'Backend engineer specializing in cloud architecture and DevOps.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/michaelrodriguez', 'https://github.com/michaelrodriguez'),
('member-4', 'Emily Davis', 'Events Coordinator', 'Project manager with a passion for organizing tech meetups and workshops.', '/placeholder.svg?height=300&width=300', 'https://linkedin.com/in/emilydavis', 'https://github.com/emilydavis');

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_projects_updated_at
AFTER UPDATE ON projects
BEGIN
  UPDATE projects SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- Create indexes for better performance
CREATE INDEX idx_projects_created_at ON projects(created_at);
CREATE INDEX idx_projects_updated_at ON projects(updated_at);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);

-- Create policies for admin operations
CREATE POLICY "Allow all operations on projects" ON projects
  FOR ALL USING (true);

-- Insert sample projects
INSERT OR IGNORE INTO projects (id, title, description, tech_stack, github, demo, image) VALUES
('project-1', 'AI-Powered Study Assistant', 'An intelligent study companion that helps students organize their learning materials and provides personalized recommendations.', '["React", "Node.js", "OpenAI", "MongoDB"]', 'https://github.com/syndicatex/study-assistant', 'https://study-assistant.syndicatex.org', '/placeholder.svg?height=200&width=400'),
('project-2', 'Campus Event Management System', 'A comprehensive platform for managing university events, from registration to feedback collection.', '["Next.js", "PostgreSQL", "Prisma", "Tailwind"]', 'https://github.com/syndicatex/event-management', 'https://events.syndicatex.org', '/placeholder.svg?height=200&width=400'),
('project-3', 'Blockchain Voting Platform', 'A secure and transparent voting system built on blockchain technology for student government elections.', '["Solidity", "Web3.js", "React", "Ethereum"]', 'https://github.com/syndicatex/blockchain-voting', 'https://voting.syndicatex.org', '/placeholder.svg?height=200&width=400');
