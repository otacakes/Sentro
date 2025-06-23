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
import { getWeatherTheme } from "@/utils/weather";

describe("getWeatherTheme", () => {
  it("should return cloudy theme for cloudy weather", () => {
    const result = getWeatherTheme("cloudy");
    expect(result).toBe("weather-cloudy");
  });
});
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

### Customization

The app can be customized through:

- **Environment Variables**: API keys and configuration
- **Database**: Custom transport data and user preferences
- **Styling**: Tailwind CSS classes and custom components
- **Components**: Shadcn UI component library

### Development Workflow

1. **Feature Development**:

   ```bash
   git checkout -b feature/your-feature-name
   # Make your changes
   npm run test
   npm run lint
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

2. **Testing**:

   ```bash
   npm run test          # Unit tests
   npm run test:watch    # Watch mode
   npm run type-check    # TypeScript check
   npm run lint          # Code linting
   ```

3. **Building**:
   ```bash
   npm run build         # Production build
   npm run start         # Start production server
   ```

### Troubleshooting

#### Common Issues

1. **Authentication Errors**:

   - Check Supabase environment variables
   - Verify database setup
   - Check NextAuth configuration

2. **Map Loading Issues**:

   - Verify Leaflet CSS is loaded
   - Check OpenStreetMap tile server
   - Ensure proper coordinates

3. **Build Errors**:
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Check TypeScript errors: `npm run type-check`

#### Performance Optimization

- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Use code splitting for large components

#### Security Best Practices

- Never commit API keys
- Use environment variables
- Validate user input
- Implement proper authentication
- Regular dependency updates

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:

   - Link your GitHub repository to Vercel
   - Configure environment variables
   - Set build settings

2. **Environment Variables**:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

3. **Deploy**:
   - Push to main branch
   - Vercel automatically deploys
   - Monitor deployment logs

### Other Platforms

#### Netlify

- Similar to Vercel setup
- Use `npm run build` as build command
- Set `out` as publish directory

#### Railway

- Connect GitHub repository
- Set environment variables
- Automatic deployments

#### Self-Hosted

- Build the application: `npm run build`
- Start production server: `npm run start`
- Use reverse proxy (nginx, Apache)
- Set up SSL certificates

## 📊 Monitoring

### Performance Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Error Tracking**: Sentry or similar service

### Health Checks

- **Database**: Monitor Supabase usage
- **API**: Check response times
- **Uptime**: Monitor application availability

## 🔧 Maintenance

### Regular Tasks

1. **Dependency Updates**:

   ```bash
   npm audit
   npm update
   npm audit fix
   ```

2. **Database Maintenance**:

   - Monitor Supabase usage
   - Clean up old data
   - Optimize queries

3. **Security Updates**:
   - Update dependencies
   - Review security advisories
   - Rotate API keys

### Backup Strategy

- **Database**: Supabase automatic backups
- **Code**: GitHub repository
- **Environment**: Document configuration

## 🎯 Next Steps

After setup, consider:

1. **Customization**: Adapt to your specific needs
2. **Data Integration**: Connect real transport APIs
3. **Mobile App**: Develop React Native version
4. **Community**: Engage with users and contributors
5. **Analytics**: Implement usage tracking
6. **Localization**: Add Filipino language support

---

**Happy coding!** 🚇✨

_For more help, check our [documentation](https://github.com/your-username/philippine-commuters-companion/docs) or [join our community](https://github.com/your-username/philippine-commuters-companion/discussions)._
