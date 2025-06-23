<p align="center">
  <img src="website/public/sentro.png" alt="Sentro Logo" width="96" />
</p>

# Sentro 🚇

A privacy-first, community-driven transport app for Philippine commuters. Built with Next.js, TypeScript, and Supabase.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/otacakes/Sentro&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=Environment%20variables%20for%20Sentro&envLink=https://github.com/otacakes/Sentro/blob/main/DEPLOYMENT.md)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## ✨ Features

- 🗺️ **Interactive Transport Maps**: Real-time location tracking and route planning
- 🔐 **Secure Authentication**: NextAuth.js with Supabase integration
- 📱 **Responsive Design**: Optimized for mobile and desktop
- 🌙 **Dark Mode**: Automatic theme switching based on system preferences
- 📊 **Real-time Data**: Live transport updates and crowd reports
- 🎯 **Community-Driven**: User-generated content and feedback
- 🔒 **Privacy-First**: No unnecessary data collection
- ⚡ **Performance**: Optimized for fast loading and smooth interactions

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Zustand** - State management
- **React Hook Form** - Form handling

### Backend

- **Next.js API Routes** - Serverless functions
- **Supabase** - Database and authentication
- **NextAuth.js** - Authentication framework

### Infrastructure

- **Vercel** - Deployment and hosting
- **GitHub Actions** - CI/CD pipeline
- **Jest** - Testing framework

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Supabase account
- Google Maps API key (optional)
- OpenWeather API key (optional)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/otacakes/Sentro.git
   cd Sentro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp website/vercel.env.example website/.env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)

1. **One-Click Deploy**

   - Click the "Deploy with Vercel" button above
   - Connect your GitHub repository
   - Add environment variables
   - Deploy!

2. **Manual Deployment**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
   - Configure Supabase settings
   - Set up environment variables
   - Deploy to Vercel

### Environment Variables

Required environment variables for deployment:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.vercel.app

# Optional
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test`
5. Submit a pull request

## 🔒 Security

We take security seriously. Please see our [Security Policy](./SECURITY.md) for details.

- **Vulnerability Reports**: security@sentro.app
- **Security Features**: HTTPS, CSP, secure headers
- **Privacy**: GDPR compliant, minimal data collection

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Philippine commuter community
- Open source contributors
- Transport data providers
- Next.js and Vercel teams

## 📞 Support

- **Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues**: [GitHub Issues](https://github.com/otacakes/Sentro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/otacakes/Sentro/discussions)

---

**Made with ❤️ for Philippine commuters**
