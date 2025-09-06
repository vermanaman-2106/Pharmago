import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import BlogSection from './BlogSection';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Footer from './Footer';
import CartPage from './CartPage';
import SearchResultCard from './SearchResultCard';
import PharmacyListing from './PharmacyListing';
import Toast from './Toast';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LandingPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showPharmacyListing, setShowPharmacyListing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchQuery(query);
      setShowPharmacyListing(true);
      setShowResults(false);
    }
  };

  const handleAddToCart = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <>
      <Header 
        onCartClick={() => setShowCart(true)}
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />
      <Hero onSearch={handleSearch} />
      <Features />
      <BlogSection />
      <Testimonials />
      <FAQ />
      <Footer />
    
      {/* Search Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-pharma-dark dark:text-white">Search Results</h3>
              <button 
                onClick={() => setShowResults(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <SearchResultCard 
                  key={result.id} 
                  result={result} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pharmacy Listing Modal */}
      {showPharmacyListing && (
        <PharmacyListing
          searchQuery={searchQuery}
          onClose={() => setShowPharmacyListing(false)}
          onGoToCart={() => setShowCart(true)}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <CartPage 
          onClose={() => setShowCart(false)} 
          onLoginClick={() => setShowLogin(true)}
        />
      )}

      {/* Login Modal */}
      {showLogin && (
        <LoginForm 
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}

      {/* Signup Modal */}
      {showSignup && (
        <SignupForm 
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}

      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default LandingPage;
