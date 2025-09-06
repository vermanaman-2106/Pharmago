import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Settings = ({ onClose }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: false,
      orderUpdates: true,
      promotions: false
    },
    privacy: {
      profileVisibility: 'public',
      dataSharing: false,
      analytics: true
    },
    preferences: {
      language: 'en',
      currency: 'INR',
      timezone: 'Asia/Kolkata'
    }
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving settings. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

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
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300"
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
            <h2 className="text-3xl font-bold text-pharma-dark dark:text-white">Settings</h2>
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

          {/* Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                className={`mb-4 p-4 rounded-lg ${
                  message.includes('success') 
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

          <div className="space-y-8">
            {/* Theme Settings */}
            <motion.div
              className="bg-pharma-cream dark:bg-gray-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-4">Appearance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pharma-dark dark:text-white font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
                </div>
                <motion.button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    isDarkMode ? 'bg-pharma-brown' : 'bg-gray-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    animate={{ x: isDarkMode ? 24 : 4 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              className="bg-pharma-cream dark:bg-gray-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-4">Notifications</h3>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-pharma-dark dark:text-white font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'email' && 'Receive notifications via email'}
                        {key === 'sms' && 'Receive notifications via SMS'}
                        {key === 'push' && 'Receive push notifications'}
                        {key === 'orderUpdates' && 'Get updates about your orders'}
                        {key === 'promotions' && 'Receive promotional offers'}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => handleSettingChange('notifications', key, !value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        value ? 'bg-pharma-brown' : 'bg-gray-300'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                        animate={{ x: value ? 24 : 4 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Privacy Settings */}
            <motion.div
              className="bg-pharma-cream dark:bg-gray-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-4">Privacy</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-pharma-dark dark:text-white font-medium mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                
                {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-pharma-dark dark:text-white font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'dataSharing' && 'Allow sharing data with third parties'}
                        {key === 'analytics' && 'Help improve the app with usage analytics'}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => handleSettingChange('privacy', key, !value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        value ? 'bg-pharma-brown' : 'bg-gray-300'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                        animate={{ x: value ? 24 : 4 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              className="bg-pharma-cream dark:bg-gray-700 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-pharma-dark dark:text-white mb-4">Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-pharma-dark dark:text-white font-medium mb-2">
                    Language
                  </label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-pharma-dark dark:text-white font-medium mb-2">
                    Currency
                  </label>
                  <select
                    value={settings.preferences.currency}
                    onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                  >
                    <option value="INR">₹ INR</option>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-pharma-dark dark:text-white font-medium mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.preferences.timezone}
                    onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                    <option value="Asia/Dubai">Asia/Dubai</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div 
            className="flex justify-end mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-pharma-brown dark:bg-pharma-blue text-white rounded-lg hover:bg-pharma-brown/90 dark:hover:bg-pharma-blue/90 transition-colors duration-200 font-semibold disabled:opacity-50"
              whileHover={{ scale: saving ? 1 : 1.05 }}
              whileTap={{ scale: saving ? 1 : 0.95 }}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Settings;
