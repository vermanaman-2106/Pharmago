import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-pharma-dark dark:bg-gray-900 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-pharma-blue dark:text-pharma-blue mb-4">
              PharmaGo
            </h3>
            <p className="text-gray-300 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              Your trusted healthcare companion that helps you find, compare, and get medicines faster. 
              Making healthcare accessible to everyone, everywhere.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-pharma-brown dark:bg-pharma-blue rounded-full flex items-center justify-center hover:bg-pharma-blue dark:hover:bg-pharma-brown transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-pharma-brown dark:bg-pharma-blue rounded-full flex items-center justify-center hover:bg-pharma-blue dark:hover:bg-pharma-brown transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-pharma-brown dark:bg-pharma-blue rounded-full flex items-center justify-center hover:bg-pharma-blue dark:hover:bg-pharma-brown transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 dark:text-gray-400 hover:text-pharma-blue dark:hover:text-pharma-blue transition-colors duration-300">Home</a></li>
              <li><a href="#about" className="text-gray-300 dark:text-gray-400 hover:text-pharma-blue dark:hover:text-pharma-blue transition-colors duration-300">About</a></li>
              <li><a href="#faq" className="text-gray-300 dark:text-gray-400 hover:text-pharma-blue dark:hover:text-pharma-blue transition-colors duration-300">FAQ</a></li>
              <li><a href="#contact" className="text-gray-300 dark:text-gray-400 hover:text-pharma-blue dark:hover:text-pharma-blue transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white dark:text-white">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-pharma-blue dark:hover:text-pharma-blue transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-pharma-blue dark:hover:text-pharma-blue transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-pharma-blue dark:hover:text-pharma-blue transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-pharma-blue dark:hover:text-pharma-blue transition-colors duration-300">GitHub Repo</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 dark:border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              © 2025 PharmaGo. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-300 dark:text-gray-400 text-sm">Made with</span>
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 dark:text-gray-400 text-sm">for healthcare</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
