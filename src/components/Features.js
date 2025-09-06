import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12 text-pharma-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Instant Medicine Search",
      description: "Find any medicine instantly with our powerful search engine that covers thousands of medications and their variants."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-pharma-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Check Availability & Prices",
      description: "Compare prices across multiple pharmacies and check real-time availability to get the best deals on your medications."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-pharma-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Locate Nearby Pharmacies",
      description: "Find the closest pharmacies to your location with accurate distance calculations and directions to save time."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-pharma-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Save Time & Money",
      description: "Get the best prices instantly and avoid multiple trips to different pharmacies. Save both time and money on your healthcare needs."
    }
  ];

  return (
    <section id="about" className="section-padding bg-pharma-blue dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-pharma-dark dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Why Choose <motion.span 
              className="text-pharma-brown dark:text-pharma-blue"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              PharmaGo
            </motion.span>?
          </motion.h2>
          <motion.p 
            className="text-xl text-pharma-dark dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            We're revolutionizing healthcare accessibility by making medicine search, 
            comparison, and procurement effortless for everyone.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="card group hover:scale-105 transform transition-all duration-300 bg-white dark:bg-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              <div className="text-center">
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-600 rounded-full mb-6 group-hover:bg-pharma-brown dark:group-hover:bg-pharma-blue group-hover:text-white transition-all duration-300"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-pharma-dark dark:text-white mb-4 group-hover:text-pharma-brown dark:group-hover:text-pharma-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-pharma-dark dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { number: "10K+", label: "Medicines Available" },
            { number: "500+", label: "Partner Pharmacies" },
            { number: "50K+", label: "Happy Customers" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
            >
              <motion.div 
                className="text-4xl font-bold text-pharma-brown dark:text-pharma-blue mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7 + index * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <div className="text-pharma-dark dark:text-white font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
