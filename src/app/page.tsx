import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🚇</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Commuter's Companion</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="#contribute" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contribute
              </Link>
              <Link 
                href="/app" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try App
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              The Philippine{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Commuter's Companion
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              A privacy-first, community-driven transport app that adapts to your weather 
              and makes commuting in the Philippines better, one journey at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/app"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                🚀 Start Your Journey
              </Link>
              <Link 
                href="https://github.com/your-username/philippine-commuters-companion"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                📖 View on GitHub
              </Link>
            </div>
          </div>
        </div>
        
        {/* Weather-Adaptive Demo */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              ☁️
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Malamig na Umaga</h3>
            <p className="text-gray-600">Cool, calm interface for cloudy weather</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              🌧️
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ambon</h3>
            <p className="text-gray-600">Soothing blue tones for rainy days</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
              ☀️
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Araw ng Tanghali</h3>
            <p className="text-gray-600">Warm, bright palette for sunny weather</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Features That Make Commuting Better
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with Filipino commuters in mind, featuring privacy-first design and community-driven data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-Time Transport Data */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                🚌
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Transport Data</h3>
              <p className="text-gray-600 mb-4">
                Community-driven vehicle locations, crowd levels, and service alerts for LRT-1, LRT-2, MRT-3, buses, and modern jeepneys.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Anonymous crowd reporting</li>
                <li>• Service disruption alerts</li>
                <li>• Real-time vehicle tracking</li>
              </ul>
            </div>

            {/* GPS-like Route Mapping */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                🗺️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">GPS-like Route Mapping</h3>
              <p className="text-gray-600 mb-4">
                Multi-modal journey planning with interactive route visualization and offline map support.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Walking + trains + buses</li>
                <li>• Interactive polylines</li>
                <li>• Offline OpenStreetMap</li>
              </ul>
            </div>

            {/* Weather-Adaptive UI */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                🌤️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Weather-Adaptive UI</h3>
              <p className="text-gray-600 mb-4">
                Dynamic color schemes that change based on local weather conditions for a personalized experience.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Automatic weather detection</li>
                <li>• Manual theme selection</li>
                <li>• Privacy-conscious options</li>
              </ul>
            </div>

            {/* News & Alerts */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                📰
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">News & Alerts</h3>
              <p className="text-gray-600 mb-4">
                Stay updated with transport news, fare changes, and government programs like "Libreng Sakay".
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Official DOTr updates</li>
                <li>• Fare change notifications</li>
                <li>• Government program alerts</li>
              </ul>
            </div>

            {/* Privacy-First */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center mb-6">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy-First Design</h3>
              <p className="text-gray-600 mb-4">
                No sign-in required, all data stored locally, and location data is ephemeral for your privacy.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• No user accounts</li>
                <li>• Local data storage</li>
                <li>• Anonymous reporting</li>
              </ul>
            </div>

            {/* Community-Driven */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                👥
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community-Driven</h3>
              <p className="text-gray-600 mb-4">
                Built by and for the Filipino community with open-source collaboration and crowdsourced data.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Open-source codebase</li>
                <li>• Community contributions</li>
                <li>• Crowdsourced data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              About The Philippine Commuter's Companion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  We're building a transport app that puts Filipino commuters first. Our goal is to make 
                  daily commuting more efficient, informed, and enjoyable while maintaining the highest 
                  standards of privacy and community collaboration.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Core Values</h3>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Privacy-first approach with no data collection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Community-driven development and data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Open-source transparency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Accessibility for all users</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section id="contribute" className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Help us make commuting in the Philippines better. Whether you're a developer, designer, 
            or just passionate about improving public transport, we welcome your contributions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://github.com/your-username/philippine-commuters-companion"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all"
            >
              🚀 Contribute on GitHub
            </Link>
            <Link 
              href="/docs"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              📚 Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🚇</span>
                </div>
                <span className="text-xl font-bold">Commuter's Companion</span>
              </div>
              <p className="text-gray-400">
                Making commuting in the Philippines better, one journey at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Project</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
                <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contributing" className="hover:text-white transition-colors">Contributing</Link></li>
                <li><Link href="/code-of-conduct" className="hover:text-white transition-colors">Code of Conduct</Link></li>
                <li><Link href="/discussions" className="hover:text-white transition-colors">Discussions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/license" className="hover:text-white transition-colors">MIT License</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 The Philippine Commuter's Companion. Made with ❤️ for Filipino commuters.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 