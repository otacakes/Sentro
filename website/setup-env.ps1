# PowerShell script to help set up environment variables
# Run this script in the website directory

Write-Host "Setting up environment variables for Philippine Commuter's Companion" -ForegroundColor Green
Write-Host ""

# Check if .env.local already exists
if (Test-Path ".env.local") {
    Write-Host "Warning: .env.local already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "Setup cancelled." -ForegroundColor Red
        exit
    }
}

Write-Host "Please provide the following information:" -ForegroundColor Cyan
Write-Host ""

# Get Supabase URL
$supabaseUrl = Read-Host "Enter your Supabase Project URL (e.g., https://your-project.supabase.co)"
if (-not $supabaseUrl) {
    Write-Host "Error: Supabase URL is required!" -ForegroundColor Red
    exit
}

# Get Service Role Key
$serviceRoleKey = Read-Host "Enter your Supabase Service Role Key"
if (-not $serviceRoleKey) {
    Write-Host "Error: Service Role Key is required!" -ForegroundColor Red
    exit
}

# Get Anon Key
$anonKey = Read-Host "Enter your Supabase Anon Key"
if (-not $anonKey) {
    Write-Host "Error: Anon Key is required!" -ForegroundColor Red
    exit
}

# Generate NextAuth Secret
Write-Host "Generating NextAuth secret..." -ForegroundColor Yellow
$nextAuthSecret = -join ((33..126) | Get-Random -Count 32 | ForEach-Object { [char]$_ })

# Create .env.local content
$envContent = @"
# Supabase Configuration (REQUIRED for authentication)
NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl
SUPABASE_SERVICE_ROLE_KEY=$serviceRoleKey
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anonKey

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=$nextAuthSecret

# API Keys
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_NAME="The Philippine Commuter's Companion"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_APP_URL="http://localhost:3001"

# Environment
NODE_ENV=development

# Feature Flags
NEXT_PUBLIC_ENABLE_OFFLINE_MAPS=true
NEXT_PUBLIC_ENABLE_WEATHER_ADAPTIVE_UI=true
NEXT_PUBLIC_ENABLE_COMMUNITY_REPORTING=true

# Development Settings
NEXT_PUBLIC_ENABLE_DEBUG_MODE=false
NEXT_PUBLIC_ENABLE_MOCK_DATA=false

# API Endpoints
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001/api"

# Map Configuration
NEXT_PUBLIC_DEFAULT_MAP_CENTER_LAT=14.5995
NEXT_PUBLIC_DEFAULT_MAP_CENTER_LNG=120.9842
NEXT_PUBLIC_DEFAULT_MAP_ZOOM=12

# Weather Configuration
NEXT_PUBLIC_WEATHER_UPDATE_INTERVAL=300000
NEXT_PUBLIC_DEFAULT_CITY="Manila"
NEXT_PUBLIC_DEFAULT_COUNTRY="PH"

# Transport Data
NEXT_PUBLIC_ENABLE_LRT1=true
NEXT_PUBLIC_ENABLE_LRT2=true
NEXT_PUBLIC_ENABLE_MRT3=true
NEXT_PUBLIC_ENABLE_BUSES=true
NEXT_PUBLIC_ENABLE_JEEPNEYS=true

# Community Features
NEXT_PUBLIC_ENABLE_USER_REPORTS=true
NEXT_PUBLIC_ENABLE_CROWD_LEVELS=true
NEXT_PUBLIC_ENABLE_SERVICE_ALERTS=true

# Privacy Settings
NEXT_PUBLIC_ENABLE_LOCATION_TRACKING=false
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_CRASH_REPORTING=false

# Performance
NEXT_PUBLIC_ENABLE_SERVICE_WORKER=true
NEXT_PUBLIC_ENABLE_CACHE=true
NEXT_PUBLIC_CACHE_DURATION=3600000
"@

# Write to .env.local
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host ""
Write-Host "✅ .env.local file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Restart your development server (Ctrl+C, then npm run dev)" -ForegroundColor White
Write-Host "2. The authentication errors should be resolved" -ForegroundColor White
Write-Host "3. You can now test the login functionality" -ForegroundColor White
Write-Host ""
Write-Host "Optional: Add your Google Maps and OpenWeather API keys to .env.local for full functionality" -ForegroundColor Yellow
Write-Host "" 