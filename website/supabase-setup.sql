-- =====================================================
-- Philippine Commuter's Companion Database Setup
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USER PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- FAVORITE LOCATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS favorite_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  category TEXT CHECK (category IN ('home', 'work', 'school', 'other')) DEFAULT 'other',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lat, lng)
);

-- =====================================================
-- SEARCH HISTORY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  search_count INTEGER DEFAULT 1,
  last_searched TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ADMIN USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TRANSPORT STATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS transport_stations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  line_id TEXT,
  station_type TEXT CHECK (station_type IN ('lrt', 'mrt', 'p2p', 'bus', 'jeepney')) DEFAULT 'lrt',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TRANSPORT LINES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS transport_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  color TEXT,
  line_type TEXT CHECK (line_type IN ('lrt', 'mrt', 'p2p', 'bus', 'jeepney')) DEFAULT 'lrt',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CROWD REPORTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS crowd_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  station_id UUID REFERENCES transport_stations(id) ON DELETE CASCADE,
  line_id UUID REFERENCES transport_lines(id) ON DELETE CASCADE,
  crowd_level INTEGER CHECK (crowd_level BETWEEN 1 AND 5),
  description TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NEWS ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS news_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SERVICE ALERTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS service_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  alert_type TEXT CHECK (alert_type IN ('delay', 'disruption', 'maintenance', 'info')) DEFAULT 'info',
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  affected_lines TEXT[],
  affected_stations TEXT[],
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- User profiles indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- Favorite locations indexes
CREATE INDEX IF NOT EXISTS idx_favorite_locations_user_id ON favorite_locations(user_id);
CREATE INDEX IF NOT EXISTS idx_favorite_locations_category ON favorite_locations(category);

-- Search history indexes
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_last_searched ON search_history(last_searched);

-- Admin users indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);

-- Transport stations indexes
CREATE INDEX IF NOT EXISTS idx_transport_stations_location ON transport_stations(lat, lng);
CREATE INDEX IF NOT EXISTS idx_transport_stations_line ON transport_stations(line_id);
CREATE INDEX IF NOT EXISTS idx_transport_stations_active ON transport_stations(is_active);

-- Transport lines indexes
CREATE INDEX IF NOT EXISTS idx_transport_lines_code ON transport_lines(code);
CREATE INDEX IF NOT EXISTS idx_transport_lines_active ON transport_lines(is_active);

-- Crowd reports indexes
CREATE INDEX IF NOT EXISTS idx_crowd_reports_station ON crowd_reports(station_id);
CREATE INDEX IF NOT EXISTS idx_crowd_reports_line ON crowd_reports(line_id);
CREATE INDEX IF NOT EXISTS idx_crowd_reports_timestamp ON crowd_reports(timestamp);

-- News items indexes
CREATE INDEX IF NOT EXISTS idx_news_items_published ON news_items(published_at);
CREATE INDEX IF NOT EXISTS idx_news_items_active ON news_items(is_active);

-- Service alerts indexes
CREATE INDEX IF NOT EXISTS idx_service_alerts_active ON service_alerts(is_active);
CREATE INDEX IF NOT EXISTS idx_service_alerts_time ON service_alerts(start_time, end_time);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for tables with updated_at
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE crowd_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_alerts ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (id = auth.uid());

-- Favorite locations policies
CREATE POLICY "Users can manage their own favorite locations" ON favorite_locations
  FOR ALL USING (user_id = auth.uid());

-- Search history policies
CREATE POLICY "Users can manage their own search history" ON search_history
  FOR ALL USING (user_id = auth.uid());

-- Admin users policies
CREATE POLICY "Admin users can manage admin_users" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() 
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Users can read their own admin status" ON admin_users
  FOR SELECT USING (id = auth.uid());

-- Public read access for transport data
CREATE POLICY "Public read access to transport stations" ON transport_stations
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access to transport lines" ON transport_lines
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access to crowd reports" ON crowd_reports
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create crowd reports" ON crowd_reports
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Public read access for news and alerts
CREATE POLICY "Public read access to news items" ON news_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access to service alerts" ON service_alerts
  FOR SELECT USING (is_active = true);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert default admin user (CHANGE THESE CREDENTIALS!)
INSERT INTO admin_users (email, username, role, is_active) 
VALUES ('admin@example.com', 'admin', 'super_admin', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample transport lines
INSERT INTO transport_lines (name, code, color, line_type) VALUES
('LRT Line 1', 'LRT1', '#FF6B35', 'lrt'),
('LRT Line 2', 'LRT2', '#004E89', 'lrt'),
('MRT Line 3', 'MRT3', '#FFD23F', 'mrt')
ON CONFLICT (code) DO NOTHING;

-- Insert sample transport stations
INSERT INTO transport_stations (name, code, lat, lng, line_id, station_type) VALUES
('Baclaran', 'LRT1_BAC', 14.5314, 120.9974, 'LRT1', 'lrt'),
('EDSA', 'LRT1_EDS', 14.5547, 120.9844, 'LRT1', 'lrt'),
('Central Terminal', 'LRT1_CEN', 14.5995, 120.9842, 'LRT1', 'lrt'),
('Recto', 'LRT1_REC', 14.6042, 120.9822, 'LRT1', 'lrt'),
('Cubao', 'LRT2_CUB', 14.6189, 121.0568, 'LRT2', 'lrt'),
('Ayala', 'MRT3_AYA', 14.5547, 121.0244, 'MRT3', 'mrt')
ON CONFLICT (code) DO NOTHING;

-- Insert sample news items
INSERT INTO news_items (title, content, source, url) VALUES
('LRT-1 Extension Project Update', 'The LRT-1 extension project is progressing well with 80% completion.', 'DOTr', 'https://dotr.gov.ph'),
('New P2P Bus Routes Announced', 'Additional P2P bus routes will be available starting next month.', 'LTFRB', 'https://ltfrb.gov.ph'),
('Fare Adjustment Notice', 'Transportation fares will remain unchanged for the next quarter.', 'DOTr', 'https://dotr.gov.ph')
ON CONFLICT DO NOTHING;

-- Insert sample service alerts
INSERT INTO service_alerts (title, message, alert_type, severity, affected_lines, affected_stations) VALUES
('Minor Delay on LRT-1', 'LRT-1 is experiencing minor delays due to signal maintenance.', 'delay', 'low', ARRAY['LRT1'], ARRAY['Baclaran', 'EDSA']),
('Scheduled Maintenance', 'LRT-2 will have scheduled maintenance this weekend.', 'maintenance', 'medium', ARRAY['LRT2'], ARRAY['Cubao']),
('Service Resumed', 'MRT-3 service has resumed normal operations.', 'info', 'low', ARRAY['MRT3'], ARRAY['Ayala'])
ON CONFLICT DO NOTHING;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- This will show in the SQL editor when the script completes
SELECT 'Database setup completed successfully!' as status; 