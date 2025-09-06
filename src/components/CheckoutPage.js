import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = ({ onClose, onBack }) => {
  const { items, getTotalPrice, clearCart, addOrder } = useCart();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: ''
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});

  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD${timestamp}${random}`;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Generate order ID
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    
    // Create order object
    const order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      total: getTotalPrice(),
      items: items.map(item => ({
        name: item.name,
        brand: item.brand,
        strength: item.strength,
        quantity: item.quantity,
        price: item.price,
        pharmacy: item.pharmacy,
        pharmacyId: item.pharmacyId
      })),
      pharmacy: items[0]?.pharmacy || 'Multiple Pharmacies',
      pharmacyId: items[0]?.pharmacyId || 'multiple',
      deliveryAddress: formData.address,
      customerName: formData.fullName,
      customerPhone: formData.phoneNumber,
      customerEmail: currentUser?.email || '',
      trackingNumber: `TRK${newOrderId.slice(-6)}`,
      createdAt: new Date().toISOString()
    };
    
    // Add order to context
    addOrder(order);
    
    // Show confirmation
    setOrderConfirmed(true);
    
    // Clear cart after a delay
    setTimeout(() => {
      clearCart();
    }, 3000);
  };

  const handleClose = () => {
    if (orderConfirmed) {
      // Reset form and confirmation state
      setFormData({
        fullName: '',
        address: '',
        phoneNumber: ''
      });
      setOrderConfirmed(false);
      setOrderId('');
      setErrors({});
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Header */}
          <motion.div 
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-pharma-dark dark:text-white">
              {orderConfirmed ? 'Order Confirmed!' : 'Enter Delivery Details'}
            </h2>
            <motion.button 
              onClick={handleClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              ×
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            {orderConfirmed ? (
              // Order Confirmation Screen
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div 
                  className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  ✅ Order Confirmed!
                </motion.h3>
                
                <motion.div 
                  className="bg-pharma-cream dark:bg-gray-700 rounded-lg p-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <p className="text-lg text-pharma-dark dark:text-white mb-2">Order ID:</p>
                  <p className="text-2xl font-bold text-pharma-brown dark:text-pharma-blue font-mono">
                    {orderId}
                  </p>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Thank you for your order! Your medicines will be delivered to:
                </motion.p>
                
                <motion.div 
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <p className="font-semibold text-pharma-dark dark:text-white">{formData.fullName}</p>
                  <p className="text-gray-600 dark:text-gray-400">{formData.address}</p>
                  <p className="text-gray-600 dark:text-gray-400">{formData.phoneNumber}</p>
                </motion.div>
                
                <motion.p 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  You will receive a confirmation SMS shortly.
                </motion.p>
              </motion.div>
            ) : (
              // Delivery Details Form
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Order Summary */}
                <div className="bg-pharma-cream dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-pharma-dark dark:text-white mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <div key={`${item.id}-${item.pharmacy}-${index}`} className="flex justify-between text-sm">
                        <span className="text-pharma-dark dark:text-white">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-pharma-brown dark:text-pharma-blue font-semibold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-pharma-beige dark:border-gray-600 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-pharma-dark dark:text-white">Total:</span>
                        <span className="text-pharma-brown dark:text-pharma-blue">₹{getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Form */}
                <form onSubmit={handleConfirmOrder} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pharma-brown focus:border-transparent transition-colors duration-200 ${
                        errors.fullName 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-pharma-dark dark:text-white`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pharma-brown focus:border-transparent transition-colors duration-200 ${
                        errors.address 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-pharma-dark dark:text-white`}
                      placeholder="Enter your complete address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pharma-brown focus:border-transparent transition-colors duration-200 ${
                        errors.phoneNumber 
                          ? 'border-red-500 dark:border-red-400' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 text-pharma-dark dark:text-white`}
                      placeholder="Enter your 10-digit phone number"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.phoneNumber}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <motion.button
                      type="button"
                      onClick={onBack}
                      className="flex-1 px-6 py-3 border border-pharma-brown dark:border-pharma-blue text-pharma-brown dark:text-pharma-blue rounded-lg hover:bg-pharma-brown hover:text-white dark:hover:bg-pharma-blue dark:hover:text-white transition-colors duration-200 font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to Cart
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-pharma-brown dark:bg-pharma-blue text-white rounded-lg hover:bg-pharma-brown/90 dark:hover:bg-pharma-blue/90 transition-colors duration-200 font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Confirm Order
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutPage;
