import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { signUp, signInWithGoogle } from '../firebase';
import { useAuth } from '../context/AuthContext';

const SignupForm = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();

  // Close form when user is authenticated and redirect based on role
  useEffect(() => {
    if (currentUser) {
      onClose();
      if (userRole === 'pharmacy') {
        navigate('/pharmacy-dashboard');
      }
    }
  }, [currentUser, userRole, onClose, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await signUp(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName,
        formData.phone,
        formData.role
      );
      
      if (result.success) {
        // Form will close automatically via useEffect when currentUser updates
        // Pharmacy users will be redirected to dashboard automatically
      } else {
        // Handle specific Firebase errors with user-friendly messages
        let errorMessage = result.error;
        
        if (result.error.includes('email-already-in-use')) {
          errorMessage = 'This email is already registered. Please try logging in instead or use a different email address.';
        } else if (result.error.includes('weak-password')) {
          errorMessage = 'Password is too weak. Please choose a stronger password.';
        } else if (result.error.includes('invalid-email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (result.error.includes('operation-not-allowed')) {
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
        }
        
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    
    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        // Form will close automatically via useEffect when currentUser updates
        // Pharmacy users will be redirected to dashboard automatically
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'Google sign-up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="flex justify-between items-center mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pharma-dark dark:text-white">Create Account</h2>
            <motion.button 
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl sm:text-3xl font-bold p-1"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              ×
            </motion.button>
          </motion.div>

        <AnimatePresence>
          {errors.general && (
            <motion.div 
              className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium">{errors.general}</p>
                  {errors.general.includes('email-already-in-use') && (
                    <motion.button
                      onClick={onSwitchToLogin}
                      className="mt-2 text-sm text-pharma-brown dark:text-pharma-blue hover:text-pharma-dark dark:hover:text-white underline font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Click here to login instead
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                First Name
              </label>
              <motion.input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white ${
                  errors.firstName 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
                }`}
                placeholder="John"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <AnimatePresence>
                {errors.firstName && (
                  <motion.p 
                    className="text-red-500 dark:text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.firstName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                Last Name
              </label>
              <motion.input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white ${
                  errors.lastName 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
                }`}
                placeholder="Doe"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <AnimatePresence>
                {errors.lastName && (
                  <motion.p 
                    className="text-red-500 dark:text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.lastName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white ${
                errors.phone 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Account Type
            </label>
            <motion.select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white ${
                errors.role 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
              }`}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <option value="user">Customer</option>
              <option value="pharmacy">Pharmacy Owner</option>
            </motion.select>
            {errors.role && (
              <motion.p 
                className="text-red-500 dark:text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {errors.role}
              </motion.p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select "Pharmacy Owner" if you want to manage your pharmacy's medicine inventory
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white ${
                errors.password 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
              }`}
              placeholder="Create a strong password"
            />
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-pharma-dark dark:text-white ${
                errors.confirmPassword 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown dark:focus:border-pharma-blue'
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <label className="flex items-start">
              <input 
                type="checkbox" 
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 rounded border-pharma-beige dark:border-gray-600 text-pharma-brown dark:text-pharma-blue focus:ring-pharma-brown dark:focus:ring-pharma-blue" 
              />
              <span className="ml-2 text-sm text-pharma-dark dark:text-white">
                I agree to the{' '}
                <button type="button" className="text-pharma-brown dark:text-pharma-blue hover:text-pharma-dark dark:hover:text-white underline">
                  Terms of Service
                </button>
                {' '}and{' '}
                <button type="button" className="text-pharma-brown dark:text-pharma-blue hover:text-pharma-dark dark:hover:text-white underline">
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ 
              scale: isLoading ? 1 : 1.02,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <motion.svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </motion.svg>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </motion.form>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <p className="text-pharma-dark dark:text-white">
            Already have an account?{' '}
            <motion.button
              onClick={onSwitchToLogin}
              className="text-pharma-brown dark:text-pharma-blue hover:text-pharma-dark dark:hover:text-white font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in here
            </motion.button>
          </p>
        </motion.div>

        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <motion.button 
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </motion.button>
          </div>
        </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignupForm;
