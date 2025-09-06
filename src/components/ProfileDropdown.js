import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logOut } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import UserProfile from './UserProfile';
import Settings from './Settings';
import MyOrders from './MyOrders';
import HelpSupport from './HelpSupport';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser } = useAuth();

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.profile?.role || 'user');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [currentUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsOpen(false);
      alert('Logged out successfully!');
    } catch (error) {
      alert('Error logging out. Please try again.');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-pharma-cream transition-colors duration-200 group"
      >
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-pharma-beige group-hover:border-pharma-brown transition-colors duration-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-pharma-brown text-white flex items-center justify-center font-semibold text-sm group-hover:bg-pharma-blue transition-colors duration-200">
            {getInitials(currentUser?.displayName || currentUser?.email)}
          </div>
        )}
        <svg 
          className={`w-4 h-4 text-pharma-dark transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-4 z-50 animate-fadeIn">
          {/* User Info Header */}
          <div className="px-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-pharma-beige"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-pharma-brown text-white flex items-center justify-center font-semibold text-lg">
                  {getInitials(currentUser?.displayName || currentUser?.email)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-pharma-dark truncate">
                  {currentUser?.displayName || 'User'}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {currentUser?.email}
                </p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Pharmacy Dashboard Link - Only for pharmacy users */}
            {userRole === 'pharmacy' && (
              <Link
                to="/pharmacy-dashboard"
                className="w-full px-6 py-3 text-left hover:bg-pharma-cream transition-colors duration-200 flex items-center space-x-3 group"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 text-gray-500 group-hover:text-pharma-brown transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-pharma-dark group-hover:text-pharma-brown transition-colors">Pharmacy Dashboard</span>
              </Link>
            )}

            <button 
              onClick={() => {
                setShowUserProfile(true);
                setIsOpen(false);
              }}
              className="w-full px-6 py-3 text-left hover:bg-pharma-cream transition-colors duration-200 flex items-center space-x-3 group"
            >
              <svg className="w-5 h-5 text-gray-500 group-hover:text-pharma-brown transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-pharma-dark group-hover:text-pharma-brown transition-colors">My Profile</span>
            </button>

            <button 
              onClick={() => {
                setShowMyOrders(true);
                setIsOpen(false);
              }}
              className="w-full px-6 py-3 text-left hover:bg-pharma-cream transition-colors duration-200 flex items-center space-x-3 group"
            >
              <svg className="w-5 h-5 text-gray-500 group-hover:text-pharma-brown transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-pharma-dark group-hover:text-pharma-brown transition-colors">My Orders</span>
            </button>

            <button 
              onClick={() => {
                setShowSettings(true);
                setIsOpen(false);
              }}
              className="w-full px-6 py-3 text-left hover:bg-pharma-cream transition-colors duration-200 flex items-center space-x-3 group"
            >
              <svg className="w-5 h-5 text-gray-500 group-hover:text-pharma-brown transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-pharma-dark group-hover:text-pharma-brown transition-colors">Settings</span>
            </button>

            <button 
              onClick={() => {
                setShowHelpSupport(true);
                setIsOpen(false);
              }}
              className="w-full px-6 py-3 text-left hover:bg-pharma-cream transition-colors duration-200 flex items-center space-x-3 group"
            >
              <svg className="w-5 h-5 text-gray-500 group-hover:text-pharma-brown transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-pharma-dark group-hover:text-pharma-brown transition-colors">Help & Support</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="pt-2 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="w-full px-6 py-3 text-left hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3 group"
            >
              <svg className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-pharma-dark group-hover:text-red-500 transition-colors font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showUserProfile && (
        <UserProfile
          onClose={() => setShowUserProfile(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* My Orders Modal */}
      {showMyOrders && (
        <MyOrders
          onClose={() => setShowMyOrders(false)}
        />
      )}

      {/* Help & Support Modal */}
      {showHelpSupport && (
        <HelpSupport
          onClose={() => setShowHelpSupport(false)}
        />
      )}
    </div>
  );
};

export default ProfileDropdown;
