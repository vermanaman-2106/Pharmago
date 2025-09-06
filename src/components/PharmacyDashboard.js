import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MedicinesPage from './pharmacy/MedicinesPage';
import ProfilePage from './pharmacy/ProfilePage';

const PharmacyDashboard = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('medicines');
  const [pharmacyInfo, setPharmacyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkUserRole = () => {
      if (!currentUser) {
        navigate('/');
        return;
      }

      // Check if user role is pharmacy (from AuthContext)
      if (userRole !== 'pharmacy') {
        navigate('/');
        return;
      }

      // Set mock pharmacy info
      setPharmacyInfo({
        pharmacyName: 'My Pharmacy',
        address: '123 Health Street, Medical District, Mumbai',
        contact: '+91 98765 43210'
      });

      setLoading(false);
    };

    checkUserRole();
  }, [currentUser, userRole, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    { id: 'medicines', label: 'Medicines', icon: '💊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-pharma-cream dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-pharma-brown border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-pharma-dark dark:text-white text-lg">Loading Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  // If no current user, show error
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-pharma-cream dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-pharma-dark dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-pharma-dark dark:text-gray-300 mb-6">
            You need to be logged in as a pharmacy owner to access this dashboard.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-pharma-cream dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-lg px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-pharma-dark dark:text-white">
          {pharmacyInfo?.pharmacyName || 'Pharmacy Dashboard'}
        </h1>
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-pharma-blue dark:bg-gray-700 text-pharma-dark dark:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.div
              className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg lg:shadow-none"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-6">
                {/* Logo/Header */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-pharma-dark dark:text-white mb-2">
                    PharmaGo
                  </h2>
                  <p className="text-pharma-brown dark:text-pharma-blue text-sm">
                    Pharmacy Dashboard
                  </p>
                </motion.div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeTab === item.id
                          ? 'bg-pharma-blue dark:bg-gray-700 text-pharma-dark dark:text-white shadow-lg'
                          : 'text-pharma-dark dark:text-gray-300 hover:bg-pharma-cream dark:hover:bg-gray-700'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  className="w-full mt-8 flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl">🚪</span>
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 shadow-lg px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.h1
                className="text-2xl font-bold text-pharma-dark dark:text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Welcome, {pharmacyInfo?.pharmacyName || 'Pharmacy'}
              </motion.h1>
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Logged in as</p>
                  <p className="font-medium text-pharma-dark dark:text-white">
                    {currentUser?.email}
                  </p>
                </div>
                <motion.div
                  className="w-10 h-10 bg-pharma-brown dark:bg-pharma-blue rounded-full flex items-center justify-center text-white font-bold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {currentUser?.email?.charAt(0).toUpperCase()}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'medicines' && <MedicinesPage pharmacyId={currentUser?.uid} />}
                {activeTab === 'profile' && <ProfilePage pharmacyId={currentUser?.uid} setPharmacyInfo={setPharmacyInfo} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
    );
  } catch (error) {
    console.error('Error rendering PharmacyDashboard:', error);
    return (
      <div className="min-h-screen bg-pharma-cream dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-pharma-dark dark:text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-pharma-dark dark:text-gray-300 mb-6">
            There was an error loading the dashboard. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

export default PharmacyDashboard;
