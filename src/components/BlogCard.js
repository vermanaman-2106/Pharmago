import React from 'react';
import { motion } from 'framer-motion';

const BlogCard = ({ blog, onClick, isSmall = false }) => {
  const cardClasses = isSmall 
    ? "bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    : "bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden";

  const imageClasses = isSmall
    ? "w-full h-32 object-cover"
    : "w-full h-48 object-cover";

  const contentClasses = isSmall
    ? "p-4"
    : "p-6";

  const titleClasses = isSmall
    ? "text-lg font-semibold text-pharma-dark dark:text-white mb-2 line-clamp-2"
    : "text-xl font-bold text-pharma-dark dark:text-white mb-3 line-clamp-2";

  const excerptClasses = isSmall
    ? "text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2"
    : "text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3";

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -5
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Blog Image */}
      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className={imageClasses}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            blog.category === 'Price Trends' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : blog.category === 'Popular Medications'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
          }`}>
            {blog.category}
          </span>
        </div>
        {blog.isNew && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
              New
            </span>
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className={contentClasses}>
        <h3 className={titleClasses}>
          {blog.title}
        </h3>
        
        <p className={excerptClasses}>
          {blog.excerpt}
        </p>

        {/* Blog Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{blog.date}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{blog.views}</span>
          </div>
        </div>

        {/* Read More Button for small cards */}
        {isSmall && (
          <motion.button
            className="mt-3 text-pharma-brown hover:text-pharma-blue transition-colors duration-200 text-sm font-medium"
            whileHover={{ x: 5 }}
          >
            Read More →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default BlogCard;
