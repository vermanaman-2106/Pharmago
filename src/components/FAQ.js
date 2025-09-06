import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does PharmaGo work?",
      answer: "PharmaGo connects you with multiple pharmacies in your area. Simply search for your medicine, compare prices and availability across different pharmacies, and choose the best option. You can then visit the pharmacy or contact them directly to complete your purchase."
    },
    {
      question: "Is the data real-time?",
      answer: "Yes! We work directly with pharmacy partners to provide real-time availability and pricing data. This ensures you get the most accurate information about medicine availability and current prices before making your decision."
    },
    {
      question: "Can I order online through PharmaGo?",
      answer: "Currently, PharmaGo helps you find and compare medicines across pharmacies. While we don't handle direct online ordering yet, we're working on integrating online ordering capabilities. For now, you can contact the pharmacy directly or visit them in person."
    },
    {
      question: "Is PharmaGo free to use?",
      answer: "Yes, PharmaGo is completely free for users! We believe in making healthcare accessible to everyone. Our service is supported by our pharmacy partners who benefit from increased visibility and customer reach."
    },
    {
      question: "What's next for PharmaGo?",
      answer: "We're constantly working to improve PharmaGo. Upcoming features include online ordering, prescription management, medication reminders, insurance integration, and expanded pharmacy partnerships across more cities and regions."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-pharma-blue dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
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
            Frequently Asked <motion.span 
              className="text-pharma-brown dark:text-pharma-blue"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Questions
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-pharma-dark dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Got questions? We've got answers. Here are some common questions about PharmaGo.
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="card bg-white dark:bg-gray-700 group transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center p-6 focus:outline-none"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold text-pharma-dark dark:text-white group-hover:text-pharma-brown dark:group-hover:text-pharma-blue transition-colors duration-300">
                  {faq.question}
                </h3>
                <motion.div 
                  className="transform transition-transform duration-300"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 text-pharma-brown dark:text-pharma-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="px-6 pb-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <p className="text-pharma-dark dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg transition-colors duration-300"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-pharma-dark dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Still have questions?
            </motion.h3>
            <motion.p 
              className="text-pharma-dark dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Our support team is here to help you with any questions or concerns.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="btn-primary"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
              <motion.button 
                className="btn-secondary"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Documentation
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
