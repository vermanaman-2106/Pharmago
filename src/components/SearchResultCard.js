import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const SearchResultCard = ({ result, onAddToCart }) => {
  const { addToCart, removeFromCart, updateQuantity, items } = useCart();

  // Check if this item is in the cart
  const cartItem = items.find(item => 
    item.id === result.id && item.pharmacy === result.pharmacy
  );

  const handleAddToCart = () => {
    addToCart(result);
    onAddToCart(`${result.pharmacy} added to cart!`);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(result);
    onAddToCart(`${result.pharmacy} removed from cart!`);
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart();
    } else {
      updateQuantity(result, newQuantity);
    }
  };

  return (
    <motion.div 
      className="card bg-white dark:bg-gray-800 border-2 border-pharma-beige dark:border-gray-600 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-pharma-dark dark:text-white">{result.pharmacy}</h4>
          <p className="text-pharma-brown dark:text-pharma-blue font-bold text-xl">{result.price}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{result.distance}</p>
          <motion.span 
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              result.isAvailable
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {result.availability}
          </motion.span>
        </div>
        <div className="text-right">
          {result.isAvailable ? (
            cartItem ? (
              // Show quantity selector when item is in cart
              <motion.div 
                className="flex flex-col items-end space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
                    className="w-8 h-8 bg-pharma-brown dark:bg-pharma-blue text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors text-sm font-bold"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <motion.span 
                    className="w-8 text-center font-semibold text-pharma-dark dark:text-white text-lg"
                    key={cartItem.quantity}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cartItem.quantity}
                  </motion.span>
                  <motion.button
                    onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
                    className="w-8 h-8 bg-pharma-brown dark:bg-pharma-blue text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors text-sm font-bold"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
                <motion.button
                  onClick={handleRemoveFromCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </motion.button>
              </motion.div>
            ) : (
              // Show Add to Cart button when item is not in cart
              <motion.button
                onClick={handleAddToCart}
                className="btn-primary text-sm px-4 py-2"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            )
          ) : (
            <motion.button
              disabled
              className="bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Out of Stock
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResultCard;
