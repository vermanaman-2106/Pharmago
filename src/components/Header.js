import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import ThemeToggle from './ThemeToggle';
import cartLogo from '../photos/cartlogo.png';

const Header = ({ onCartClick, onLoginClick, onSignupClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { currentUser } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-pharma-blue">
              PharmaGo
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#home" 
              className="relative text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pharma-cream dark:hover:bg-gray-800 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pharma-brown dark:bg-pharma-blue transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link 
              to="/blog"
              className="relative text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pharma-cream dark:hover:bg-gray-800 group"
            >
              Reports
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pharma-brown dark:bg-pharma-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <a 
              href="#about" 
              className="relative text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pharma-cream dark:hover:bg-gray-800 group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pharma-brown dark:bg-pharma-blue transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#faq" 
              className="relative text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pharma-cream dark:hover:bg-gray-800 group"
            >
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pharma-brown dark:bg-pharma-blue transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#contact" 
              className="relative text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pharma-cream dark:hover:bg-gray-800 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pharma-brown dark:bg-pharma-blue transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <ThemeToggle />
            {currentUser ? (
              <ProfileDropdown />
            ) : (
              <>
                <button 
                  onClick={onLoginClick}
                  className="btn-secondary text-xs lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2"
                >
                  Login
                </button>
                <button 
                  onClick={onSignupClick}
                  className="btn-primary text-xs lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2"
                >
                  Sign Up
                </button>
              </>
            )}
            <button 
              onClick={onCartClick}
              className="relative p-1.5 lg:p-2 text-pharma-dark hover:text-pharma-brown transition-colors duration-300 group"
            >
              <img 
                src={cartLogo} 
                alt="Cart" 
                className="w-7 h-7 lg:w-9 lg:h-9 group-hover:scale-110 transition-transform duration-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <svg 
                className="w-8 h-8 lg:w-10 lg:h-10 group-hover:scale-110 transition-transform duration-200 hidden" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pharma-brown text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center font-bold animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onCartClick}
              className="relative p-1 text-pharma-dark hover:text-pharma-brown transition-colors duration-300 group"
            >
              <img 
                src={cartLogo} 
                alt="Cart" 
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <svg 
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-200 hidden" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pharma-brown text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-pharma-dark hover:text-pharma-brown transition-colors duration-300 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-3 pt-3 pb-4 space-y-2 bg-pharma-cream dark:bg-gray-800 rounded-lg mt-2">
              <a 
                href="#home" 
                className="block px-3 py-2 text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue hover:bg-pharma-beige dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg"
              >
                Home
              </a>
              <Link 
                to="/blog"
                className="block px-3 py-2 text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue hover:bg-pharma-beige dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Reports
              </Link>
              <a 
                href="#about" 
                className="block px-3 py-2 text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue hover:bg-pharma-beige dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg"
              >
                About
              </a>
              <a 
                href="#faq" 
                className="block px-3 py-2 text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue hover:bg-pharma-beige dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg"
              >
                FAQ
              </a>
              <a 
                href="#contact" 
                className="block px-3 py-2 text-pharma-dark dark:text-gray-300 hover:text-pharma-brown dark:hover:text-pharma-blue hover:bg-pharma-beige dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg"
              >
                Contact
              </a>
              <div className="pt-3 space-y-3">
                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
                {currentUser ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 p-2 bg-pharma-cream dark:bg-gray-800 rounded-lg">
                      {currentUser.photoURL ? (
                        <img 
                          src={currentUser.photoURL} 
                          alt="Profile" 
                          className="w-7 h-7 rounded-full"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-pharma-brown text-white flex items-center justify-center font-semibold text-xs">
                          {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="text-center text-pharma-dark dark:text-pharma-cream font-medium text-sm truncate">
                        {currentUser.displayName || currentUser.email}
                      </div>
                    </div>
                    <ProfileDropdown />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button 
                      onClick={onLoginClick}
                      className="w-full btn-secondary text-sm py-2"
                    >
                      Login
                    </button>
                    <button 
                      onClick={onSignupClick}
                      className="w-full btn-primary text-sm py-2"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
