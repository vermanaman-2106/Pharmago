import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GoogleMaps from './GoogleMaps';

const Hero = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section id="home" className="relative min-h-[120vh] sm:min-h-screen flex flex-col justify-center overflow-hidden py-8 sm:py-8">
      {/* Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-pharma-blue via-pharma-blue to-pharma-cream dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 left-5 w-16 h-16 bg-pharma-brown rounded-full"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-20 right-10 w-12 h-12 bg-pharma-beige rounded-full"
          animate={{ 
            y: [0, 10, 0],
            x: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-1/4 w-8 h-8 bg-pharma-brown rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-10 right-1/3 w-10 h-10 bg-pharma-beige rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
      </div>

      {/* Soothing Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gentle Floating Bubbles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${30 + Math.random() * 50}px`,
              height: `${30 + Math.random() * 50}px`,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Soft Glowing Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${60 + Math.random() * 80}px`,
              height: `${60 + Math.random() * 80}px`,
              background: `radial-gradient(circle, rgba(139, 69, 19, 0.08) 0%, rgba(139, 69, 19, 0.03) 40%, transparent 70%)`,
            }}
            animate={{
              scale: [0.9, 1.2, 0.9],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Gentle Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 69, 19, 0.3))`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Soft Wave Animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32"
          style={{
            background: `linear-gradient(0deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Gentle Shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Breathing Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-pharma-blue/5 via-transparent to-pharma-cream/5"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Main Tagline */}
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-pharma-dark dark:text-white mb-3 sm:mb-4 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Find, Compare & Get
              </motion.span>
              <motion.span 
                className="block text-pharma-brown dark:text-pharma-blue"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(139, 69, 19, 0.3)"
                }}
              >
                Medicines Faster
              </motion.span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-pharma-dark dark:text-gray-300 mb-6 sm:mb-6 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Your trusted healthcare companion that helps you find the best prices, 
                check availability, and locate nearby pharmacies instantly.
              </motion.span>
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              className="max-w-xl mb-6 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div 
                    className="flex-1 relative"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)"
                    }}
                  >
                    <motion.input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a medicine..."
                      className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-400 dark:border-gray-500 focus:border-pharma-brown dark:focus:border-pharma-blue focus:outline-none shadow-lg bg-white dark:bg-gray-800 text-pharma-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                      whileFocus={{
                        borderColor: "rgba(139, 69, 19, 0.5)",
                        boxShadow: "0 0 0 3px rgba(139, 69, 19, 0.1)"
                      }}
                    />
                    <motion.div 
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 3, 0],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </motion.div>
                  </motion.div>
                  <motion.button
                    type="submit"
                    className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 whitespace-nowrap w-full sm:w-auto"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(139, 69, 19, 0.3)",
                      backgroundColor: "rgba(139, 69, 19, 0.9)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Find Medicine
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-4 md:gap-6 text-pharma-dark dark:text-gray-300 mt-4 sm:mt-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
            >
              {[
                { icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", text: "100% Secure", color: "text-green-500" },
                { icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z", text: "Real-time Data", color: "text-blue-500" },
                { icon: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", text: "Nearby Pharmacies", color: "text-purple-500" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 + index * 0.2, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <motion.svg 
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.8
                    }}
                  >
                    <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
                  </motion.svg>
                  <motion.span 
                    className="font-medium text-xs sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                  >
                    {item.text}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Google Maps */}
          <motion.div 
            className="w-full mt-8 lg:mt-0"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              initial={{ opacity: 0, rotateY: 15 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            >
              <GoogleMaps searchQuery={searchQuery} />
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
