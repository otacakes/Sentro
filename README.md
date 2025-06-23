# The Philippine Commuter's Companion

## Project Overview

The Philippine Commuter's Companion is an open-source, community-driven transport application designed to provide reliable, real-time public transport information for commuters in the Philippines. The project emphasizes user privacy, data transparency, and community collaboration, aiming to improve the daily commuting experience through technology and open data.

## Core Philosophy

- **Privacy-First**: Minimal data collection and user-controlled privacy settings.
- **Community-Driven**: Crowdsourced transport data and user reports.
- **User-Centered Design**: Minimalistic, accessible, and responsive user interface.
- **Open Source**: Transparent codebase and community contributions.
- **Comprehensive Administration**: Robust admin system for content and user management.

## Key Features

### Real-Time Transport Data

- Community-driven vehicle location reporting
- Crowd level indicators for trains and buses
- Service disruption alerts with severity levels
- Coverage for LRT-1, LRT-2, MRT-3, buses, and modern jeepneys
- Interactive route visualization

### Route Mapping and Planning

- Multi-modal journey planning (walking, trains, buses)
- Offline maps using OpenStreetMap and Leaflet
- Real-time location tracking and updates

### News and Alerts

- Real-time news feed with categorized updates
- Service alerts with severity levels
- Fare change notifications and government program updates
- Official announcements and tabbed news interface

### User Management and Authentication

- Supabase-powered authentication with NextAuth integration
- User profiles with customizable preferences
- Favorite locations and search history management
- Role-based access control (user, admin, super_admin)
- Sign-in required for full app functionality

### Administration and Analytics

- Comprehensive admin dashboard with real-time statistics
- User and admin management with analytics
- Content management for news and alerts
- Protected admin routes with authentication guards

### Location Services

- Favorite locations with category management
- Search history with frequency tracking
- Location-based services with GPS integration
- Offline location storage and privacy controls

### Data Analytics

- Interactive charts and data tables
- Sorting, filtering, and pagination
- Real-time statistics and export capabilities

### User Interface and Accessibility

- Shadcn UI components with Radix UI primitives
- Responsive design for all device sizes
- Accessibility features (high contrast, large text, screen reader support)
- Dark and light mode support

## Technology Stack

### Web Application

- **Framework**: Next.js 15 with TypeScript
- **UI Library**: Shadcn UI and Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Zustand and React Context
- **Maps**: Leaflet and OpenStreetMap
- **Forms**: React Hook Form and Zod validation
- **Charts**: Recharts
- **Tables**: TanStack Table
- **Authentication**: NextAuth.js and Supabase Auth
- **Database**: Supabase PostgreSQL
- **Real-time**: Supabase real-time subscriptions

### Development Tools

- **Testing**: Jest and React Testing Library
- **Storybook**: Component documentation
- **Linting**: ESLint and Prettier
- **Type Checking**: TypeScript strict mode
- **API**: RESTful API with Next.js API routes
- **Build Tools**: Next.js 15 with App Router

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git
- Supabase account (for authentication and database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/philippine-commuters-companion.git
   cd philippine-commuters-companion
   ```
2. Install dependencies:
   ```bash
   cd website
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your API keys.
4. Set up the database:
   - Run the Supabase setup scripts provided in `supabase-setup.sql` and `supabase-admin-setup.sql` using the Supabase SQL editor.
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook
- `npm run db:setup` - Set up database tables
- `npm run db:seed` - Seed with sample data

## Platform Support

### Phase 1: Web Application

- Responsive desktop website
- Progressive Web App (PWA) features
- Offline functionality
- Admin dashboard
- User authentication

### Phase 2: Android APK

- Direct APK distribution via GitHub Releases
- Built-in update checker

### Phase 3: App Store Launch

- Google Play Store
- Apple App Store

## Design System

### UI Components

- Timeline View (desktop)
- Gesture-driven interface (mobile)
- Transport Cards
- Route Polyline
- Admin Dashboard
- News Feed

## Authentication and Administration

### User Features

- Sign up/sign in with email and password
- Profile management
- Favorite locations
- Search history
- Offline mode

### Admin Features

- Admin dashboard with real-time statistics
- User management and analytics
- Content management for news and alerts
- System monitoring
- Role-based permissions

### Security Features

- JWT-based authentication
- Protected routes
- Role-based access control
- Input validation
- CSRF protection and security headers

## Data Management

### User Data

- Favorite locations
- Search history
- User preferences
- Privacy settings

### Transport Data

- Station information
- Line data
- Real-time updates
- Service alerts

### Analytics Data

- User engagement metrics
- Transport usage statistics
- System performance monitoring
- Error tracking

## Contributing

Contributions from the community are welcome. Please follow the guidelines below:

### How to Contribute

1. Report bugs by creating an issue with detailed descriptions.
2. Suggest new features or improvements.
3. Submit pull requests for code contributions.
4. Improve documentation and add examples.
5. Assist with testing and reporting issues.
6. Contribute to UI/UX improvements.
7. Help improve the admin dashboard.
8. Contribute transport data and updates.

### Development Workflow

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Make your changes and add tests.
4. Commit your changes: `git commit -m 'feat: add your feature'`.
5. Push to the branch: `git push origin feature/your-feature`.
6. Open a Pull Request.

### Code Standards

- Use TypeScript strict mode and proper types.
- Follow functional component patterns in React.
- Use Tailwind CSS for styling.
- Aim for high test coverage.
- Optimize for performance and accessibility.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Supabase for authentication and database services
- Shadcn UI for the component library
- OpenStreetMap for map data
- The Philippine transport community for feedback and support
- All contributors who help improve this project
