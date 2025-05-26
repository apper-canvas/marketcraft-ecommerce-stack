import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary-50/30 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 shadow-soft">
            <ApperIcon name="AlertTriangle" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-surface-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-surface-600 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 btn-hover"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}