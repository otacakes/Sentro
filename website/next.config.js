/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  images: {
    domains: [
      'openweathermap.org',
      'maps.googleapis.com',
      'via.placeholder.com',
      'localhost',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/weather/:path*',
        destination: 'https://api.openweathermap.org/data/2.5/:path*',
      },
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  async generateBuildId() {
    return 'philippine-commuters-companion-v1';
  },
  compress: true,
  poweredByHeader: false,
  trailingSlash: true,
};

module.exports = nextConfig; 