/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'openweathermap.org',
      'maps.googleapis.com',
      'via.placeholder.com',
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/weather/:path*',
        destination: 'https://api.openweathermap.org/data/2.5/:path*',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Handle Leaflet CSS
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    // Handle static assets for offline maps
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  // PWA Configuration
  async generateBuildId() {
    return 'philippine-commuters-companion-v1';
  },
  // Enable static exports for offline functionality
  trailingSlash: true,
  // Optimize for performance
  compress: true,
  poweredByHeader: false,
  // Enable experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig; 