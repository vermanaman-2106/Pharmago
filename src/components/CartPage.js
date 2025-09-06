import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutPage from './CheckoutPage';

const CartPage = ({ onClose, onLoginClick }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { currentUser } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item);
    } else {
      updateQuantity(item, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      // User is not logged in, redirect to login
      onClose(); // Close cart modal
      onLoginClick(); // Open login modal
      return;
    }
    
    // User is logged in, show checkout page
    setShowCheckout(true);
  };

  const handleBackFromCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="flex justify-between items-center mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pharma-dark dark:text-white">Shopping Cart</h2>
            <motion.button 
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl sm:text-3xl font-bold p-1"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              ×
            </motion.button>
          </motion.div>

        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="w-24 h-24 bg-pharma-blue dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg className="w-12 h-12 text-pharma-brown dark:text-pharma-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-2">Your cart is empty</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Add some medicines to get started!</p>
              <motion.button 
                onClick={onClose}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.pharmacy}-${index}`} className="card bg-pharma-cream dark:bg-gray-700 border-2 border-pharma-beige dark:border-gray-600 transition-colors duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-pharma-dark dark:text-white mb-2">{item.pharmacy}</h4>
                      <p className="text-pharma-brown dark:text-pharma-blue font-bold text-xl mb-2">{item.price}</p>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.isAvailable 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {item.availability}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.distance}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          className="w-8 h-8 bg-pharma-brown dark:bg-pharma-blue text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold text-pharma-dark dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          className="w-8 h-8 bg-pharma-brown dark:bg-pharma-blue text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-pharma-dark dark:text-white">Total Items:</span>
                <span className="text-lg font-bold text-pharma-brown dark:text-pharma-blue">{items.length}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-pharma-dark dark:text-white">Total Price:</span>
                <span className="text-2xl font-bold text-pharma-brown dark:text-pharma-blue">₹{getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 btn-secondary"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 btn-primary"
                >
                  {currentUser ? 'Proceed to Checkout' : 'Login to Checkout'}
                </button>
              </div>
              
              {!currentUser && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.726-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Please login to proceed with checkout
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Checkout Page */}
      {showCheckout && (
        <CheckoutPage
          onClose={() => {
            setShowCheckout(false);
            onClose();
          }}
          onBack={handleBackFromCheckout}
        />
      )}
    </AnimatePresence>
  );
};

export default CartPage;
