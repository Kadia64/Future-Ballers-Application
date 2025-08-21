-- Supabase Schema for Future Ballers Association
-- Tournament Registration System

-- Create tournaments table to store tournament information
CREATE TABLE tournaments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id VARCHAR(50) UNIQUE NOT NULL, -- matches your dummyData event IDs (e.g., 'e1', 'e2')
    name VARCHAR(255) NOT NULL,
    date VARCHAR(100),
    location VARCHAR(255),
    entry_fee VARCHAR(100),
    image_url VARCHAR(500),
    payment_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table to store team registrations
CREATE TABLE registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
    tournament_event_id VARCHAR(50), -- for easy reference to event_id
    tournament_name VARCHAR(255), -- denormalized for easy access
    
    -- Team Information
    team_name VARCHAR(255) NOT NULL,
    grade VARCHAR(50) NOT NULL, -- '2nd Grade', '3rd Grade', etc.
    team_type VARCHAR(20) NOT NULL, -- 'boys' or 'girls'
    division INTEGER NOT NULL, -- 1 or 2
    
    -- Additional Information
    additional_notes TEXT,
    
    -- Registration Metadata
    registration_status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled
    payment_status VARCHAR(50) DEFAULT 'unpaid', -- unpaid, paid, refunded
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_registrations_tournament_id ON registrations(tournament_id);
CREATE INDEX idx_registrations_team_name ON registrations(team_name);
CREATE INDEX idx_registrations_grade ON registrations(grade);
CREATE INDEX idx_registrations_division ON registrations(division);
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);

-- Create a view for easy registration queries with tournament details
CREATE VIEW registration_details AS
SELECT 
    r.*,
    t.name as tournament_full_name,
    t.date as tournament_date,
    t.location as tournament_location,
    t.entry_fee as tournament_entry_fee,
    t.payment_url as tournament_payment_url
FROM registrations r
LEFT JOIN tournaments t ON r.tournament_id = t.id;

-- Row Level Security (RLS) Policies
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to tournaments
CREATE POLICY "Tournaments are viewable by everyone" 
    ON tournaments FOR SELECT 
    USING (true);

-- Allow public to insert registrations (for form submissions)
CREATE POLICY "Anyone can create registrations" 
    ON registrations FOR INSERT 
    WITH CHECK (true);

-- Allow public to view their own registrations (you might want to add authentication later)
CREATE POLICY "Registrations are viewable by everyone" 
    ON registrations FOR SELECT 
    USING (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_tournaments_updated_at 
    BEFORE UPDATE ON tournaments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at 
    BEFORE UPDATE ON registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample tournament data (optional - you can remove this if you want to add manually)
INSERT INTO tournaments (event_id, name, date, location, entry_fee, image_url, payment_url) VALUES
('e1', '1 Day Slam', 'April 25-26 2026', '--', '--', '/tournaments/1-day-slam.png', 'https://google.com'),
('e2', 'Autism Awareness Tournament', 'April 11-12, 2026', '--', '--', '/tournaments/autism-awareness.png', 'https://uat.sssl.io/O0PLzO'),
('e3', 'Dome Debut Classic', 'March 28-29, 2026', '--', '--', '/tournaments/dome-debut-classic.png', 'https://uat.sssl.io/4Q3PZR'),
('e4', 'Top 100 Classic', 'August 8-9, 2026', '--', '--', '/tournaments/top-100-classic.png', 'https://uat.sssl.io/46kvlO'),
('e5', 'Nationals', 'July 26-27, 2026', '--', '--', '/tournaments/nationals.png', 'https://uat.sssl.io/Xw7yoX'),
('e6', 'Queens Classic', 'May 9th, 2026', '--', '--', '/tournaments/queens-classic.png', 'https://google.com'),
('e7', 'Summer Tipoff Classic', 'May 23rd-24th, 2026', '--', '--', '/tournaments/summer-tipoff-classic.png', 'https://google.com'),
('e8', 'Summer Slam Part 1', 'July 6th, 2026', '--', '--', '/tournaments/summer-slam-part-1.png', 'https://google.com'),
('e9', 'Summer Slam Part 2', 'July 7th, 2026', '--', '--', '/tournaments/summer-slam-part-2.png', 'https://google.com')
ON CONFLICT (event_id) DO NOTHING;