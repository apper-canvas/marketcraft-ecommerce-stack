import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { format } from 'date-fns'

export default function MainFeature({ currentView }) {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 299.99,
      inventory: 45,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      title: "Organic Cotton T-Shirt",
      price: 29.99,
      inventory: 120,
      category: "Clothing",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      description: "Comfortable organic cotton t-shirt in various colors"
    },
    {
      id: 3,
      title: "Artisan Coffee Beans",
      price: 24.99,
      inventory: 80,
      category: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
      description: "Premium single-origin coffee beans, freshly roasted"
    }
  ])

  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      total: 329.98,
      status: "processing",
      date: new Date(2024, 0, 15),
      items: 2
    },
    {
      id: "ORD-002", 
      customer: "Jane Smith",
      total: 54.98,
      status: "shipped",
      date: new Date(2024, 0, 14),
      items: 1
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson", 
      total: 149.99,
      status: "delivered",
      date: new Date(2024, 0, 13),
      items: 3
    }
  ])

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    inventory: '',
    category: '',
    description: ''
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('title')

  const categories = ['all', 'Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'inventory') return b.inventory - a.inventory
    return a.title.localeCompare(b.title)
  })

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    toast.success(`${product.title} added to cart!`)
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
    toast.success("Item removed from cart")
  }

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const addProduct = (e) => {
    e.preventDefault()
    if (!newProduct.title || !newProduct.price || !newProduct.inventory) {
      toast.error("Please fill in all required fields")
      return
    }
    
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      inventory: parseInt(newProduct.inventory),
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    }
    
    setProducts([...products, product])
    setNewProduct({ title: '', price: '', inventory: '', category: '', description: '' })
    toast.success("Product added successfully!")
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ))
    toast.success(`Order ${orderId} status updated to ${newStatus}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-surface-100 text-surface-800 border-surface-200'
    }
  }

  if (currentView === 'storefront') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-surface-900 rounded-3xl shadow-soft border border-surface-200/50 dark:border-surface-700/50 overflow-hidden"
      >
        {/* Storefront Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 md:p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Demo Store</h3>
              <p className="text-primary-100 text-lg">Experience the customer shopping journey</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-2xl px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium">Cart ({cart.length})</span>
              </div>
              <div className="bg-white/20 rounded-2xl px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <ApperIcon name="Search" className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="title">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="inventory">Sort by Stock</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-surface-50 dark:bg-surface-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-surface-200/50 dark:border-surface-700/50 hover:border-primary/30"
                >
                  <div className="aspect-video bg-surface-200 dark:bg-surface-700 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg text-surface-900 dark:text-surface-100 group-hover:text-primary transition-colors">
                        {product.title}
                      </h4>
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                    </div>
                    <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-3 py-1 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-full">
                        {product.category}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        product.inventory > 20 ? 'bg-green-100 text-green-800' : 
                        product.inventory > 5 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.inventory} in stock
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <ApperIcon name="ShoppingCart" className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Shopping Cart */}
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-surface-50 to-primary-50/30 dark:from-surface-800 dark:to-primary-900/20 rounded-2xl p-6 border border-surface-200/50 dark:border-surface-700/50"
            >
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2 text-primary" />
                Shopping Cart ({cart.length} items)
              </h4>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-surface-900 rounded-xl border border-surface-200/50 dark:border-surface-700/50">
                    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h5 className="font-medium text-surface-900 dark:text-surface-100">{item.title}</h5>
                        <p className="text-surface-600 dark:text-surface-400 text-sm">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 flex items-center justify-center transition-colors"
                        >
                          <ApperIcon name="Minus" className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 flex items-center justify-center transition-colors"
                        >
                          <ApperIcon name="Plus" className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-semibold text-primary min-w-20 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-surface-200 dark:border-surface-700">
                  <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4 sm:mb-0">
                    Total: ${cartTotal.toFixed(2)}
                  </div>
                  <div className="flex space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setCart([])
                        toast.success("Cart cleared")
                      }}
                      className="flex-1 sm:flex-none px-6 py-3 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-semibold hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => {
                        setCart([])
                        toast.success("Order placed successfully!")
                      }}
                      className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white dark:bg-surface-900 rounded-3xl shadow-soft border border-surface-200/50 dark:border-surface-700/50 overflow-hidden"
    >
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-surface-900 to-surface-800 p-6 md:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h3>
            <p className="text-surface-300 text-lg">Manage your store and track performance</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm">
              <div className="text-sm text-surface-300">Total Products</div>
              <div className="text-2xl font-bold">{products.length}</div>
            </div>
            <div className="bg-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm">
              <div className="text-sm text-surface-300">Total Orders</div>
              <div className="text-2xl font-bold">{orders.length}</div>
            </div>
            <div className="bg-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm">
              <div className="text-sm text-surface-300">Revenue</div>
              <div className="text-2xl font-bold">${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Admin Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-surface-100 dark:bg-surface-800 p-1 rounded-2xl">
          {[
            { id: 'products', label: 'Products', icon: 'Package' },
            { id: 'orders', label: 'Orders', icon: 'ShoppingBag' },
            { id: 'add-product', label: 'Add Product', icon: 'Plus' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-surface-700 text-primary shadow-soft'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold mb-6 flex items-center">
                <ApperIcon name="Package" className="w-5 h-5 mr-2 text-primary" />
                Product Management
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 border border-surface-200/50 dark:border-surface-700/50">
                    <div className="aspect-video bg-surface-200 dark:bg-surface-700 rounded-xl mb-4 overflow-hidden">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <h5 className="font-semibold text-lg mb-2 text-surface-900 dark:text-surface-100">{product.title}</h5>
                    <div className="space-y-2 text-sm text-surface-600 dark:text-surface-400 mb-4">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-semibold text-primary">${product.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stock:</span>
                        <span className={`font-semibold ${
                          product.inventory > 20 ? 'text-green-600' : 
                          product.inventory > 5 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {product.inventory}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span>{product.category}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 px-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 py-2 px-3 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold mb-6 flex items-center">
                <ApperIcon name="ShoppingBag" className="w-5 h-5 mr-2 text-primary" />
                Order Management
              </h4>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 border border-surface-200/50 dark:border-surface-700/50">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <h5 className="font-semibold text-lg text-surface-900 dark:text-surface-100">{order.id}</h5>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-surface-600 dark:text-surface-400 space-y-1">
                          <div>Customer: <span className="font-medium text-surface-900 dark:text-surface-100">{order.customer}</span></div>
                          <div>Date: <span className="font-medium">{format(order.date, 'MMM dd, yyyy')}</span></div>
                          <div>Items: <span className="font-medium">{order.items}</span></div>
                          <div>Total: <span className="font-semibold text-primary text-lg">${order.total}</span></div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-2 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'add-product' && (
            <motion.div
              key="add-product"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold mb-6 flex items-center">
                <ApperIcon name="Plus" className="w-5 h-5 mr-2 text-primary" />
                Add New Product
              </h4>
              <form onSubmit={addProduct} className="max-w-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter product title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-surface-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full pl-8 pr-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Inventory *
                    </label>
                    <input
                      type="number"
                      value={newProduct.inventory}
                      onChange={(e) => setNewProduct({...newProduct, inventory: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Stock quantity"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Product description..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Plus" className="w-5 h-5" />
                  <span>Add Product</span>
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}