import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log('AuthContext: Loading timeout reached, setting loading to false');
      setLoading(false);
    }, 5000); // 5 second timeout

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AuthContext: Auth state changed:', user ? 'User logged in' : 'User logged out');
      setCurrentUser(user);
      
      if (user) {
        // For demo purposes, check if email contains 'pharmacy' to determine role
        const isPharmacy = user.email && user.email.toLowerCase().includes('pharmacy');
        const role = isPharmacy ? 'pharmacy' : 'user';
        console.log('AuthContext: User role:', role);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      
      clearTimeout(timeout);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    userRole,
    loading
  };

  if (error) {
    return (
      <div className="min-h-screen bg-pharma-cream dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-pharma-dark dark:text-white mb-4">
            Authentication Error
          </h2>
          <p className="text-pharma-dark dark:text-gray-300 mb-6">
            There was an error with authentication. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-pharma-brown text-white rounded-lg hover:bg-pharma-brown/90 transition-colors duration-300"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen bg-pharma-cream dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pharma-brown border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
            <p className="text-pharma-dark dark:text-white text-lg">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
