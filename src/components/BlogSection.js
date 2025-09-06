import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';

const BlogSection = () => {
  const featuredBlogs = [
    {
      id: 1,
      title: "Price Trends: Paracetamol Costs Drop 15% This Month",
      excerpt: "Analysis of medication pricing shows significant savings on common pain relief medications across major pharmacy chains.",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=200&fit=crop",
      category: "Price Trends",
      date: "Dec 15, 2024",
      views: "2.3k",
      isNew: true
    },
    {
      id: 2,
      title: "Most Popular Medications: December 2024 Report",
      excerpt: "Discover which medicines are in highest demand this month and find the best deals on essential medications.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      category: "Popular Medications",
      date: "Dec 12, 2024",
      views: "1.8k",
      isNew: false
    },
    {
      id: 3,
      title: "Best Pharmacy Rates: Top 10 Stores for Savings",
      excerpt: "Compare pharmacy pricing and find the most cost-effective options for your medication needs in your area.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
      category: "Pharmacy Rates",
      date: "Dec 10, 2024",
      views: "3.1k",
      isNew: false
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pharma-dark dark:text-white mb-4">
            Healthcare Insights & Reports
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed with the latest price trends, popular medications, and pharmacy rate comparisons to make smarter healthcare decisions.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <BlogCard 
                blog={blog} 
                onClick={() => window.location.href = `/blog/${blog.id}`}
                isSmall={false}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-3 bg-pharma-brown text-white rounded-lg hover:bg-pharma-brown/90 transition-colors duration-200 font-medium"
          >
            <span>View All Reports</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-pharma-dark dark:text-white mb-2">15%</h3>
            <p className="text-gray-600 dark:text-gray-300">Average Price Reduction</p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-pharma-dark dark:text-white mb-2">500+</h3>
            <p className="text-gray-600 dark:text-gray-300">Medications Tracked</p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-pharma-dark dark:text-white mb-2">50+</h3>
            <p className="text-gray-600 dark:text-gray-300">Pharmacies Monitored</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
