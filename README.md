# 🚇 The Philippine Commuter's Companion

*A privacy-first, community-driven transport app for Philippine commuters with weather-adaptive UI*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

## 🌟 Project Overview

The Philippine Commuter's Companion is an open-source, privacy-first transport application designed specifically for Filipino commuters. Our mission is to provide reliable, real-time public transport information while maintaining user privacy and fostering community collaboration.

### 🎯 Core Philosophy

- **Privacy-First**: No sign-in required, all data stored locally
- **Community-Driven**: Crowdsourced transport data and reports
- **Calm Commuting**: Minimalistic, serene UI that adapts to weather
- **Zero-Cost**: Completely free to use with no subscriptions
- **Open Source**: Transparent, community-contributed codebase

## ✨ Key Features

### 🚌 Real-Time Transport Data
- Community-driven vehicle location reporting
- Crowd level indicators for trains and buses
- Service disruption alerts
- Coverage: LRT-1, LRT-2, MRT-3, buses, modern jeepneys

### 🗺️ GPS-like Route Mapping
- Multi-modal journey planning (walking + trains + buses)
- Interactive route visualization with polylines
- Google Maps integration for online view
- **Offline maps** using OpenStreetMap (OSM)

### 🌤️ Dynamic Weather-Adaptive UI
- **"Malamig na Umaga"** - Cool, calm palette for cloudy weather
- **"Ambon"** - Soothing blue tones for rainy conditions  
- **"Araw ng Tanghali"** - Bright, warm palette for sunny days
- Manual theme selection for privacy-conscious users

### 📰 News & Alerts
- Transport-related news feed
- Fare change notifications
- Government program updates (e.g., "Libreng Sakay")
- Official DOTr announcements

## 🏗️ Technology Stack

### Web Application
- **Framework**: Next.js 14 with TypeScript
- **UI Library**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Maps**: Google Maps API + Leaflet (offline)
- **Forms**: React Hook Form + Zod validation

### Mobile Application
- **Framework**: React Native (planned)
- **UI**: Custom "Thumb-First Glance" design
- **Navigation**: Gesture-driven bottom sheets
- **Offline Support**: Local storage + offline maps

### Development Tools
- **Testing**: Jest + React Testing Library
- **Storybook**: Component documentation
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/philippine-commuters-companion.git
   cd philippine-commuters-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your API keys:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode

# Storybook
npm run storybook    # Start Storybook
npm run build-storybook # Build Storybook

# Mobile (when implemented)
npm run mobile:dev   # Start mobile development
npm run mobile:build # Build mobile app
```

## 📱 Platform Support

### Phase 1: Web Application ✅
- Responsive desktop website
- Progressive Web App (PWA) features
- Offline functionality

### Phase 2: Android APK 📱
- Direct APK distribution via GitHub Releases
- Built-in update checker
- No Play Store fees initially

### Phase 3: App Store Launch 🏪
- Google Play Store
- Apple App Store
- Official distribution channels

## 🎨 Design System

### Color Palettes

#### Malamig na Umaga (Cloudy)
```css
--primary: #6B7280    /* Cool gray */
--secondary: #9CA3AF  /* Light gray */
--accent: #3B82F6     /* Blue */
--background: #F9FAFB /* Off-white */
```

#### Ambon (Rainy)
```css
--primary: #1E40AF    /* Deep blue */
--secondary: #3B82F6  /* Medium blue */
--accent: #60A5FA     /* Light blue */
--background: #EFF6FF /* Blue-tinted white */
```

#### Araw ng Tanghali (Sunny)
```css
--primary: #F59E0B    /* Warm orange */
--secondary: #FBBF24  /* Light orange */
--accent: #FCD34D     /* Yellow */
--background: #FFFBEB /* Warm white */
```

### UI Components
- **Timeline View**: Chronological travel options (desktop)
- **Thumb-First Glance**: Gesture-driven interface (mobile)
- **Weather Cards**: Dynamic transport information
- **Route Polyline**: Interactive journey visualization

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
1. **Report Bugs**: Create an issue with detailed descriptions
2. **Feature Requests**: Suggest new features or improvements
3. **Code Contributions**: Submit pull requests
4. **Documentation**: Improve docs and add examples
5. **Testing**: Help test features and report issues
6. **Design**: Contribute UI/UX improvements

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages

## 📊 Project Roadmap

### Phase 1: MVP (Current)
- [x] Project setup and documentation
- [ ] Basic web application structure
- [ ] Weather-adaptive UI system
- [ ] Manual route data for 2-3 Metro Manila routes
- [ ] Basic map integration

### Phase 2: Community Features
- [ ] User reporting system for transport data
- [ ] Crowdsourced crowd levels
- [ ] Service disruption alerts
- [ ] News feed integration
- [ ] Offline map support

### Phase 3: Mobile Launch
- [ ] React Native mobile app
- [ ] APK distribution system
- [ ] In-app update checker
- [ ] Enhanced offline functionality

### Phase 4: Advanced Features
- [ ] GTFS data integration
- [ ] Machine learning for route optimization
- [ ] Voice navigation
- [ ] Accessibility improvements

## 🔒 Privacy & Security

### Data Collection
- **No personal data collected**
- **No user accounts required**
- **Location data is ephemeral** (session-only)
- **All data stored locally** on user devices

### Privacy Features
- Anonymous community reporting
- Local storage only
- No tracking or analytics
- Transparent data handling

## 🌐 API Integrations

### Free Tier Services
- **Maps**: Google Maps API (free tier)
- **Weather**: OpenWeatherMap API (free tier)
- **Hosting**: Vercel (free tier)
- **APK Distribution**: GitHub Releases (free)

### Community Data Sources
- **Transport Data**: Community reports
- **News**: RSS feeds from official sources
- **Alerts**: Manual curation + community input

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **DOTr** for transport information
- **OpenStreetMap** for offline map data
- **Shadcn UI** for the component library
- **Vercel** for hosting
- **GitHub** for open source hosting

## 📞 Support & Community

- **Discussions**: [GitHub Discussions](https://github.com/your-username/philippine-commuters-companion/discussions)
- **Issues**: [GitHub Issues](https://github.com/your-username/philippine-commuters-companion/issues)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Code of Conduct**: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/philippine-commuters-companion&type=Date)](https://star-history.com/#your-username/philippine-commuters-companion&Date)

---

**Made with ❤️ for Filipino commuters**

*Help us make commuting in the Philippines better, one journey at a time.* 