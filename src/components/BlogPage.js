import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Price Trends', 'Popular Medications', 'Pharmacy Rates'];

  const allBlogs = [
    {
      id: 1,
      title: "Price Trends: Paracetamol Costs Drop 15% This Month",
      excerpt: "Analysis of medication pricing shows significant savings on common pain relief medications across major pharmacy chains. We've tracked price changes over the past 30 days.",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=300&fit=crop",
      category: "Price Trends",
      date: "Dec 15, 2024",
      views: "2.3k",
      isNew: true,
      content: "Detailed analysis of paracetamol pricing trends across major pharmacy chains shows a 15% average reduction in costs. This trend is expected to continue through the holiday season.",
      tags: ["Paracetamol", "Price Analysis", "Pharmacy Chains"]
    },
    {
      id: 2,
      title: "Most Popular Medications: December 2024 Report",
      excerpt: "Discover which medicines are in highest demand this month and find the best deals on essential medications. Our comprehensive analysis covers 500+ medications.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
      category: "Popular Medications",
      date: "Dec 12, 2024",
      views: "1.8k",
      isNew: false,
      content: "Our monthly analysis reveals the top 20 most searched and purchased medications. Cold and flu medications lead the list due to seasonal demand.",
      tags: ["Popular Medications", "Seasonal Trends", "Demand Analysis"]
    },
    {
      id: 3,
      title: "Best Pharmacy Rates: Top 10 Stores for Savings",
      excerpt: "Compare pharmacy pricing and find the most cost-effective options for your medication needs in your area. We've analyzed 50+ pharmacies across major cities.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop",
      category: "Pharmacy Rates",
      date: "Dec 10, 2024",
      views: "3.1k",
      isNew: false,
      content: "Comprehensive comparison of pharmacy pricing shows significant variations in medication costs. Independent pharmacies often offer better deals than chain stores.",
      tags: ["Pharmacy Comparison", "Cost Savings", "Location Analysis"]
    },
    {
      id: 4,
      title: "Antibiotic Price Surge: What You Need to Know",
      excerpt: "Recent analysis shows a 25% increase in antibiotic prices. Learn which alternatives offer better value and how to save on essential medications.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=300&fit=crop",
      category: "Price Trends",
      date: "Dec 8, 2024",
      views: "1.5k",
      isNew: false,
      content: "Antibiotic prices have seen a significant increase due to supply chain disruptions. We provide alternatives and cost-saving strategies.",
      tags: ["Antibiotics", "Price Increase", "Alternatives"]
    },
    {
      id: 5,
      title: "Diabetes Medication: Cost Comparison Guide",
      excerpt: "Essential guide to finding affordable diabetes medications. Compare prices across different brands and generic alternatives to save money.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=300&fit=crop",
      category: "Popular Medications",
      date: "Dec 5, 2024",
      views: "2.7k",
      isNew: false,
      content: "Diabetes medication costs can vary significantly. Our guide helps you find the most cost-effective options while maintaining quality care.",
      tags: ["Diabetes", "Generic Alternatives", "Cost Guide"]
    },
    {
      id: 6,
      title: "Online vs Offline Pharmacy: Price Analysis",
      excerpt: "Comprehensive comparison of online and offline pharmacy pricing. Discover where you can save the most on your medication purchases.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba0ef8d?w=600&h=300&fit=crop",
      category: "Pharmacy Rates",
      date: "Dec 3, 2024",
      views: "2.1k",
      isNew: false,
      content: "Online pharmacies often offer better prices, but offline pharmacies provide immediate availability. We break down the pros and cons.",
      tags: ["Online Pharmacy", "Price Comparison", "Convenience"]
    }
  ];

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-pharma-dark dark:text-white mb-4">
              Healthcare Reports & Insights
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              Stay informed with comprehensive reports on medication pricing trends, popular medications, and pharmacy rate comparisons to make smarter healthcare decisions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reports..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-pharma-dark dark:text-white focus:border-pharma-brown dark:focus:border-pharma-blue focus:outline-none"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-pharma-brown text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredBlogs.length} report{filteredBlogs.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BlogCard 
                blog={blog} 
                onClick={() => window.location.href = `/blog/${blog.id}`}
                isSmall={false}
              />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-2">No reports found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-2 bg-pharma-brown text-white rounded-lg hover:bg-pharma-brown/90 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Back to Home */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-pharma-brown hover:text-pharma-blue transition-colors duration-200 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
