import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HelpSupport = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const faqData = [
    {
      category: 'General',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'To place an order, search for your medicine, select a pharmacy, add items to cart, and proceed to checkout. Fill in your delivery details and confirm your order.'
        },
        {
          question: 'How long does delivery take?',
          answer: 'Delivery typically takes 30-60 minutes for local orders and 1-2 days for out-of-city orders. You can track your order in real-time.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery (COD) for most orders.'
        },
        {
          question: 'Can I cancel my order?',
          answer: 'Yes, you can cancel your order within 30 minutes of placing it. After that, cancellation depends on the order status and pharmacy policy.'
        }
      ]
    },
    {
      category: 'Account',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button in the header, fill in your details, and verify your email address to create your account.'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click on "Forgot Password" on the login page, enter your email, and follow the instructions sent to your email to reset your password.'
        },
        {
          question: 'How do I update my profile?',
          answer: 'Click on your profile icon in the header, select "My Profile", and click "Edit Profile" to update your information.'
        }
      ]
    },
    {
      category: 'Medicines',
      questions: [
        {
          question: 'Do you have all medicines available?',
          answer: 'We have a wide range of medicines from multiple pharmacies. If a specific medicine is not available, we can help you find alternatives.'
        },
        {
          question: 'Are the medicines genuine?',
          answer: 'Yes, all medicines are sourced from licensed pharmacies and are 100% genuine with proper quality assurance.'
        },
        {
          question: 'Do I need a prescription for prescription medicines?',
          answer: 'Yes, for prescription medicines, you need to upload a valid prescription from a registered doctor before placing the order.'
        }
      ]
    },
    {
      category: 'Delivery',
      questions: [
        {
          question: 'What are your delivery charges?',
          answer: 'Delivery charges vary by location and order value. Free delivery is available for orders above ₹500 in most areas.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes, you can track your order in real-time through the "My Orders" section or by using the tracking number provided.'
        },
        {
          question: 'What if I am not available during delivery?',
          answer: 'Our delivery partner will attempt delivery twice. If you are not available, the order will be returned and you can reschedule delivery.'
        }
      ]
    }
  ];

  const contactCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'order', label: 'Order Related' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing Issue' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'feedback', label: 'Feedback' }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage('Thank you for contacting us! We will get back to you within 24 hours.');
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
      
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('Error sending message. Please try again.');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300"
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
            <h2 className="text-3xl font-bold text-pharma-dark dark:text-white">Help & Support</h2>
            <motion.button 
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              ×
            </motion.button>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {[
              { key: 'faq', label: 'FAQ' },
              { key: 'contact', label: 'Contact Us' },
              { key: 'livechat', label: 'Live Chat' }
            ].map(({ key, label }) => (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === key
                    ? 'bg-white dark:bg-gray-600 text-pharma-brown dark:text-pharma-blue shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-pharma-brown dark:hover:text-pharma-blue'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>

          {/* Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                className={`mb-4 p-4 rounded-lg ${
                  message.includes('Thank you') 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Search */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pharma-brown focus:border-transparent bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                  />
                </div>

                {/* FAQ Categories */}
                <div className="space-y-6">
                  {filteredFAQs.map((category, categoryIndex) => (
                    <motion.div
                      key={category.category}
                      className="bg-pharma-cream dark:bg-gray-700 rounded-xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                    >
                      <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-4">
                        {category.category}
                      </h3>
                      <div className="space-y-4">
                        {category.questions.map((faq, faqIndex) => (
                          <motion.div
                            key={faqIndex}
                            className="border-b border-pharma-beige dark:border-gray-600 pb-4 last:border-b-0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: faqIndex * 0.05 }}
                          >
                            <h4 className="font-medium text-pharma-dark dark:text-white mb-2">
                              {faq.question}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <div>
                    <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-4">
                      Send us a message
                    </h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pharma-brown focus:border-transparent bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pharma-brown focus:border-transparent bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={contactForm.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pharma-brown focus:border-transparent bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                        >
                          {contactCategories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={contactForm.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pharma-brown focus:border-transparent bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                          placeholder="Brief subject of your message"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={contactForm.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pharma-brown focus:border-transparent bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                          placeholder="Describe your issue or question in detail"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-6 py-3 bg-pharma-brown dark:bg-pharma-blue text-white rounded-lg hover:bg-pharma-brown/90 dark:hover:bg-pharma-blue/90 transition-colors duration-200 font-semibold disabled:opacity-50"
                        whileHover={{ scale: submitting ? 1 : 1.02 }}
                        whileTap={{ scale: submitting ? 1 : 0.98 }}
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </form>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-4">
                      Get in touch
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-pharma-cream dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-pharma-dark dark:text-white mb-2">Phone Support</h4>
                        <p className="text-pharma-brown dark:text-pharma-blue font-semibold">+91 98765 43210</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-6PM</p>
                      </div>

                      <div className="bg-pharma-cream dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-pharma-dark dark:text-white mb-2">Email Support</h4>
                        <p className="text-pharma-brown dark:text-pharma-blue font-semibold">support@pharmago.com</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">We respond within 24 hours</p>
                      </div>

                      <div className="bg-pharma-cream dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-pharma-dark dark:text-white mb-2">Live Chat</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Available 24/7 for urgent queries</p>
                        <motion.button
                          onClick={() => setActiveTab('livechat')}
                          className="px-4 py-2 bg-pharma-brown dark:bg-pharma-blue text-white rounded-lg hover:bg-pharma-brown/90 dark:hover:bg-pharma-blue/90 transition-colors duration-200 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Start Chat
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'livechat' && (
              <motion.div
                key="livechat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-pharma-cream dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-pharma-brown dark:text-pharma-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-2">Live Chat</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Our support team is currently offline. Please use the contact form or call us for immediate assistance.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      onClick={() => setActiveTab('contact')}
                      className="px-6 py-3 bg-pharma-brown dark:bg-pharma-blue text-white rounded-lg hover:bg-pharma-brown/90 dark:hover:bg-pharma-blue/90 transition-colors duration-200 font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Us
                    </motion.button>
                    <motion.button
                      className="px-6 py-3 border border-pharma-brown dark:border-pharma-blue text-pharma-brown dark:text-pharma-blue rounded-lg hover:bg-pharma-brown hover:text-white dark:hover:bg-pharma-blue dark:hover:text-white transition-colors duration-200 font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Call Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HelpSupport;
