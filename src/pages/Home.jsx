import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

export default function Home() {
  const [currentView, setCurrentView] = useState('storefront')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const features = [
    {
      icon: 'Store',
      title: 'Multi-Store Management',
      description: 'Create and manage multiple online stores from a single dashboard with advanced analytics.'
    },
    {
      icon: 'Package',
      title: 'Product Catalog',
      description: 'Comprehensive product management with variants, inventory tracking, and bulk operations.'
    },
    {
      icon: 'CreditCard',
      title: 'Payment Processing',
      description: 'Secure payment gateway integration with multiple payment methods and fraud protection.'
    },
    {
      icon: 'TrendingUp',
      title: 'Sales Analytics',
      description: 'Real-time sales insights, performance metrics, and automated reporting tools.'
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-surface-200/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="ShoppingBag" className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gradient">MarketCraft</h1>
            </motion.div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden sm:flex bg-surface-100 dark:bg-surface-800 rounded-full p-1 shadow-inner">
                <button
                  onClick={() => setCurrentView('storefront')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentView === 'storefront'
                      ? 'bg-white dark:bg-surface-700 text-primary shadow-soft'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                  }`}
                >
                  Storefront
                </button>
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentView === 'admin'
                      ? 'bg-white dark:bg-surface-700 text-primary shadow-soft'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                  }`}
                >
                  Admin
                </button>
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2 md:p-3 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors shadow-soft border border-surface-200/50 dark:border-surface-700/50"
              >
                <ApperIcon 
                  name={isDarkMode ? 'Sun' : 'Moon'} 
                  className="w-4 h-4 md:w-5 md:h-5 text-surface-600 dark:text-surface-400" 
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile View Selector */}
      <div className="sm:hidden px-4 py-3 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
        <div className="flex bg-surface-100 dark:bg-surface-800 rounded-full p-1">
          <button
            onClick={() => setCurrentView('storefront')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              currentView === 'storefront'
                ? 'bg-white dark:bg-surface-700 text-primary shadow-soft'
                : 'text-surface-600 dark:text-surface-400'
            }`}
          >
            <ApperIcon name="Store" className="w-4 h-4 inline mr-2" />
            Storefront
          </button>
          <button
            onClick={() => setCurrentView('admin')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              currentView === 'admin'
                ? 'bg-white dark:bg-surface-700 text-primary shadow-soft'
                : 'text-surface-600 dark:text-surface-400'
            }`}
          >
            <ApperIcon name="Settings" className="w-4 h-4 inline mr-2" />
            Admin
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
              Build Your
              <span className="block text-gradient">E-commerce Empire</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-surface-600 dark:text-surface-400 mb-8 md:mb-12 leading-relaxed">
              The complete platform for creating, managing, and scaling your online business. 
              From storefront to analytics, everything you need in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-lg shadow-soft hover:shadow-lg transition-all duration-300"
              >
                Start Building Now
                <ApperIcon name="ArrowRight" className="w-5 h-5 inline ml-2" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 rounded-2xl font-semibold text-lg border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary transition-all duration-300 shadow-soft"
              >
                <ApperIcon name="Play" className="w-5 h-5 inline mr-2" />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-surface-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12 md:mb-16"
          >
            <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              Everything You Need
            </h3>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Powerful features designed to help you build, manage, and grow your e-commerce business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="group p-6 md:p-8 bg-white dark:bg-surface-800 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 border border-surface-200/50 dark:border-surface-700/50 hover:border-primary/30 dark:hover:border-primary/30"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4 md:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-surface-900 dark:text-surface-100">
                  {feature.title}
                </h4>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Feature */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <MainFeature currentView={currentView} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="ShoppingBag" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">MarketCraft</h3>
              </div>
              <p className="text-surface-400 text-lg leading-relaxed mb-6">
                Empowering entrepreneurs to build successful online businesses with cutting-edge e-commerce technology.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-3 bg-surface-800 rounded-xl hover:bg-surface-700 transition-colors">
                  <ApperIcon name="Twitter" className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-surface-800 rounded-xl hover:bg-surface-700 transition-colors">
                  <ApperIcon name="Github" className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-surface-800 rounded-xl hover:bg-surface-700 transition-colors">
                  <ApperIcon name="Linkedin" className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Platform</h4>
              <ul className="space-y-3 text-surface-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-3 text-surface-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-8 md:mt-12 pt-8 text-center">
            <p className="text-surface-400">
              © 2024 MarketCraft. All rights reserved. Built with ❤️ for entrepreneurs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}