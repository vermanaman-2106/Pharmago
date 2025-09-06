import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = ({ pharmacyId, setPharmacyInfo }) => {
  const [profileData, setProfileData] = useState({
    pharmacyName: '',
    address: '',
    contact: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [pharmacyId]);

  const fetchProfile = () => {
    // Mock profile data
    const mockProfile = {
      pharmacyName: 'My Pharmacy',
      address: '123 Health Street, Medical District, Mumbai',
      contact: '+91 98765 43210'
    };
    
    setProfileData(mockProfile);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.pharmacyName.trim()) {
      newErrors.pharmacyName = 'Pharmacy name is required';
    }
    if (!profileData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!profileData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    }
    return newErrors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Update parent component
      if (setPharmacyInfo) {
        setPharmacyInfo(profileData);
      }

      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
      setSaving(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-pharma-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pharma-dark dark:text-white">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-pharma-dark dark:text-white mb-6">
          Pharmacy Profile
        </h1>

        <AnimatePresence>
          {message && (
            <motion.div
              className={`mb-4 p-3 rounded-lg ${
                message.includes('successfully') 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="pharmacyName" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Pharmacy Name *
            </label>
            <input
              type="text"
              id="pharmacyName"
              name="pharmacyName"
              value={profileData.pharmacyName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white ${
                errors.pharmacyName 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
              }`}
              placeholder="Enter your pharmacy name"
            />
            {errors.pharmacyName && (
              <motion.p
                className="text-red-500 dark:text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {errors.pharmacyName}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white resize-none ${
                errors.address 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
              }`}
              placeholder="Enter your pharmacy address"
            />
            {errors.address && (
              <motion.p
                className="text-red-500 dark:text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {errors.address}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Contact Information *
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={profileData.contact}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white ${
                errors.contact 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
              }`}
              placeholder="Phone number, email, or other contact info"
            />
            {errors.contact && (
              <motion.p
                className="text-red-500 dark:text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {errors.contact}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={saving}
            className="w-full px-6 py-3 bg-pharma-brown text-white rounded-lg hover:bg-pharma-brown/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-medium"
            whileHover={{ scale: saving ? 1 : 1.02 }}
            whileTap={{ scale: saving ? 1 : 0.98 }}
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfilePage;