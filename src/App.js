import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import PharmacyDashboard from './components/PharmacyDashboard';
import LandingPage from './components/LandingPage';
import BlogPage from './components/BlogPage';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-pharma-cream dark:bg-gray-900 transition-colors duration-300">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
