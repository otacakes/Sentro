# Getting Started

Welcome to The Philippine Commuter's Companion! This guide will help you set up the development environment and start contributing to the project.

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** 2.0.0 or higher
- **Code Editor** (VS Code recommended)

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
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development Setup

### API Keys Setup

#### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create credentials (API Key)
5. Add the API key to your `.env.local` file

#### OpenWeather API
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Add the API key to your `.env.local` file

### Code Quality Tools

The project uses several tools to maintain code quality:

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Jest**: Testing

Run these commands to ensure code quality:

```bash
# Lint code
npm run lint

# Format code
npx prettier --write .

# Type check
npm run type-check

# Run tests
npm run test
```

## 📁 Project Structure

```
philippine-commuters-companion/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Helper functions
│   ├── styles/            # Additional styles
│   ├── constants/         # App constants
│   ├── store/             # State management
│   └── api/               # API routes
├── public/                # Static assets
├── docs/                  # Documentation
├── tests/                 # Test files
└── mobile/                # Mobile app (future)
```

## 🎨 Design System

### Weather-Adaptive Colors

The app features three weather-adaptive color schemes:

#### Malamig na Umaga (Cloudy)
- Primary: `#6B7280` (Cool gray)
- Secondary: `#9CA3AF` (Light gray)
- Accent: `#3B82F6` (Blue)
- Background: `#F9FAFB` (Off-white)

#### Ambon (Rainy)
- Primary: `#1E40AF` (Deep blue)
- Secondary: `#3B82F6` (Medium blue)
- Accent: `#60A5FA` (Light blue)
- Background: `#EFF6FF` (Blue-tinted white)

#### Araw ng Tanghali (Sunny)
- Primary: `#F59E0B` (Warm orange)
- Secondary: `#FBBF24` (Light orange)
- Accent: `#FCD34D` (Yellow)
- Background: `#FFFBEB` (Warm white)

### Using Weather Themes

```tsx
// Apply weather theme to a component
<div className="weather-cloudy">
  <h1>Content with cloudy theme</h1>
</div>

<div className="weather-rainy">
  <h1>Content with rainy theme</h1>
</div>

<div className="weather-sunny">
  <h1>Content with sunny theme</h1>
</div>
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### Writing Tests

Tests should be written for:
- Utility functions
- React components
- Custom hooks
- API routes

Example test structure:

```tsx
// __tests__/utils/weather.test.ts
import { getWeatherTheme } from '@/utils/weather'

describe('getWeatherTheme', () => {
  it('should return cloudy theme for cloudy weather', () => {
    const result = getWeatherTheme('cloudy')
    expect(result).toBe('weather-cloudy')
  })
})
```

## 📱 Mobile Development

The mobile app will be built using React Native. The mobile directory structure will be:

```
mobile/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── services/
│   └── utils/
├── android/
├── ios/
└── package.json
```

## 🚀 Deployment

### Web Application

The web app can be deployed to:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

### Mobile Application

- **Android**: APK distribution via GitHub Releases
- **iOS**: App Store (future)

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed contribution guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting and tests
6. Submit a pull request

### Commit Messages

Use conventional commit messages:

```bash
feat: add weather-adaptive theme system
fix: resolve map loading issue
docs: update installation instructions
test: add unit tests for route planning
```

## 🐛 Troubleshooting

### Common Issues

#### Port 3000 already in use
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

#### TypeScript errors
```bash
# Clear TypeScript cache
rm -rf .next
npm run type-check
```

#### Build errors
```bash
# Clear build cache
rm -rf .next
npm run build
```

### Getting Help

- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Ask questions and share ideas
- **Documentation**: Check the docs folder for more information

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

---

Happy coding! 🚇🇵🇭 