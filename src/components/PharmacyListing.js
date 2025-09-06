import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const PharmacyListing = ({ searchQuery, onClose, onGoToCart }) => {
  const { addToCart, getTotalItems } = useCart();
  const navigate = useNavigate();
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
  const [sortBy, setSortBy] = useState('distance'); // distance, price, rating
  const [filterBy, setFilterBy] = useState('all'); // all, inStock, available
  const [addedItems, setAddedItems] = useState(new Set()); // Track added items
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMedicine, setAlertMedicine] = useState(null);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertPhone, setAlertPhone] = useState('');

  useEffect(() => {
    if (searchQuery) {
      searchPharmacies();
    }
  }, [searchQuery]);

  const searchPharmacies = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const mockPharmacies = getMockPharmacies();
      
      // Sort pharmacies
      const sortedPharmacies = mockPharmacies.sort((a, b) => {
        switch (sortBy) {
          case 'distance':
            return a.distance - b.distance;
          case 'price':
            return a.avgPrice - b.avgPrice;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
      
      setPharmacies(sortedPharmacies);
      setLoading(false);
    }, 1000); // 1 second delay to simulate loading
  };

  const getMockPharmacies = () => {
    const medicineVariations = [
      // In Stock Medicines
      { brand: 'Crocin', strength: '500mg', price: 245, stock: 25, available: true },
      { brand: 'Paracetamol', strength: '500mg', price: 230, stock: 30, available: true },
      { brand: 'Calpol', strength: '500mg', price: 260, stock: 20, available: true },
      { brand: 'Dolo', strength: '650mg', price: 220, stock: 35, available: true },
      { brand: 'Metacin', strength: '500mg', price: 240, stock: 15, available: true },
      { brand: 'PCM', strength: '500mg', price: 210, stock: 40, available: true },
      { brand: 'Brufen', strength: '400mg', price: 180, stock: 12, available: true },
      { brand: 'Voveran', strength: '50mg', price: 320, stock: 8, available: true },
      
      // Out of Stock Medicines
      { brand: 'Crocin', strength: '500mg', price: 245, stock: 0, available: false },
      { brand: 'Paracetamol', strength: '500mg', price: 230, stock: 0, available: false },
      { brand: 'Calpol', strength: '500mg', price: 260, stock: 0, available: false },
      { brand: 'Dolo', strength: '650mg', price: 220, stock: 0, available: false },
      { brand: 'Metacin', strength: '500mg', price: 240, stock: 0, available: false },
      { brand: 'PCM', strength: '500mg', price: 210, stock: 0, available: false },
      { brand: 'Brufen', strength: '400mg', price: 180, stock: 0, available: false },
      { brand: 'Voveran', strength: '50mg', price: 320, stock: 0, available: false },
      { brand: 'Aspirin', strength: '75mg', price: 150, stock: 0, available: false },
      { brand: 'Ibuprofen', strength: '400mg', price: 200, stock: 0, available: false }
    ];

    return [
      {
        id: '1',
        pharmacyName: 'Apollo Pharmacy',
        address: '123 Main Street, Downtown, Mumbai',
        contact: '+91 98765 43210',
        medicines: [
          medicineVariations[0], // In stock
          medicineVariations[8], // Out of stock
          medicineVariations[1]  // In stock
        ].map((med, index) => ({
          id: `1-${index + 1}`,
          name: searchQuery,
          brand: med.brand,
          strengthMg: med.strength,
          price: med.price,
          stock: med.stock,
          available: med.available,
          category: 'Pain Relief'
        })),
        avgPrice: 245,
        distance: 0.8,
        rating: 4.2,
        totalMedicines: 3
      },
      {
        id: '2',
        pharmacyName: 'MedPlus',
        address: '456 Health Avenue, Medical District, Mumbai',
        contact: '+91 98765 43211',
        medicines: [
          medicineVariations[2], // In stock
          medicineVariations[9], // Out of stock
          medicineVariations[3]  // In stock
        ].map((med, index) => ({
          id: `2-${index + 1}`,
          name: searchQuery,
          brand: med.brand,
          strengthMg: med.strength,
          price: med.price,
          stock: med.stock,
          available: med.available,
          category: 'Pain Relief'
        })),
        avgPrice: 236.7,
        distance: 1.2,
        rating: 4.0,
        totalMedicines: 3
      },
      {
        id: '3',
        pharmacyName: 'CareWell Pharmacy',
        address: '789 Wellness Road, Suburb, Mumbai',
        contact: '+91 98765 43212',
        medicines: [
          medicineVariations[4], // In stock
          medicineVariations[10], // Out of stock
          medicineVariations[5]  // In stock
        ].map((med, index) => ({
          id: `3-${index + 1}`,
          name: searchQuery,
          brand: med.brand,
          strengthMg: med.strength,
          price: med.price,
          stock: med.stock,
          available: med.available,
          category: 'Pain Relief'
        })),
        avgPrice: 240,
        distance: 2.1,
        rating: 4.5,
        totalMedicines: 3
      },
      {
        id: '4',
        pharmacyName: 'Wellness Plus',
        address: '321 Health Center, Andheri West, Mumbai',
        medicines: [
          medicineVariations[6], // In stock
          medicineVariations[11], // Out of stock
          medicineVariations[7]  // In stock
        ].map((med, index) => ({
          id: `4-${index + 1}`,
          name: searchQuery,
          brand: med.brand,
          strengthMg: med.strength,
          price: med.price,
          stock: med.stock,
          available: med.available,
          category: 'Pain Relief'
        })),
        avgPrice: 223.3,
        distance: 1.8,
        rating: 4.3,
        totalMedicines: 3
      },
      {
        id: '5',
        pharmacyName: 'HealthMart',
        address: '654 Medical Plaza, Bandra East, Mumbai',
        contact: '+91 98765 43214',
        medicines: [
          medicineVariations[12], // Out of stock
          medicineVariations[13]  // Out of stock
        ].map((med, index) => ({
          id: `5-${index + 1}`,
          name: searchQuery,
          brand: med.brand,
          strengthMg: med.strength,
          price: med.price,
          stock: med.stock,
          available: med.available,
          category: 'Pain Relief'
        })),
        avgPrice: 237.5,
        distance: 3.2,
        rating: 3.8,
        totalMedicines: 2
      },
      {
        id: '6',
        pharmacyName: 'City Medical Store',
        address: '987 Business District, Andheri East, Mumbai',
        contact: '+91 98765 43215',
        medicines: [
          medicineVariations[14], // Out of stock
          medicineVariations[15], // Out of stock
          medicineVariations[16]  // Out of stock
        ].map((med, index) => ({
          id: `6-${index + 1}`,
          name: searchQuery,
          brand: med.brand,
          strengthMg: med.strength,
          price: med.price,
          stock: med.stock,
          available: med.available,
          category: 'Pain Relief'
        })),
        avgPrice: 245,
        distance: 2.5,
        rating: 3.5,
        totalMedicines: 3
      },
      {
        id: '7',
        pharmacyName: 'QuickCare Pharmacy',
        address: '456 Market Street, Goregaon West, Mumbai',
        contact: '+91 98765 43216',
        medicines: [
          medicineVariations[17], // Out of stock
          medicineVariations[0],  // In stock
          medicineVariations[1]   // In stock
        ].map((med, index) => ({
          id: `7-${index + 1}`,
          name: searchQuery,
          brand: med.brand,
          strengthMg: med.strength,
          price: med.price,
          stock: med.stock,
          available: med.available,
          category: 'Pain Relief'
        })),
        avgPrice: 236.7,
        distance: 3.8,
        rating: 3.2,
        totalMedicines: 3
      },
      {
        id: '8',
        pharmacyName: 'Family Health Center',
        address: '321 Residential Area, Malad West, Mumbai',
        contact: '+91 98765 43217',
        medicines: [
          medicineVariations[2], // In stock
          medicineVariations[3], // In stock
          medicineVariations[4]  // In stock
        ].map((med, index) => ({
          id: `8-${index + 1}`,
          name: searchQuery,
          brand: med.brand,
          strengthMg: med.strength,
          price: med.price,
          stock: med.stock,
          available: med.available,
          category: 'Pain Relief'
        })),
        avgPrice: 240,
        distance: 4.2,
        rating: 3.0,
        totalMedicines: 3
      }
    ];
  };

  const handlePharmacySelect = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setPharmacyMedicines(pharmacy.medicines);
  };

  const handleAddToCart = (medicine) => {
    const cartItem = {
      id: `${selectedPharmacy.id}-${medicine.id}`,
      name: medicine.name,
      brand: medicine.brand,
      strength: medicine.strengthMg,
      price: medicine.price,
      pharmacy: selectedPharmacy.pharmacyName,
      pharmacyId: selectedPharmacy.id,
      available: medicine.available,
      stock: medicine.stock,
      quantity: 1
    };

    addToCart(cartItem);
    setAddedItems(prev => new Set([...prev, medicine.id]));
    
    // Show success message
    setToastMessage(`${medicine.name} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSetAlert = (medicine) => {
    setAlertMedicine(medicine);
    setShowAlertModal(true);
  };

  const handleAlertSubmit = (e) => {
    e.preventDefault();
    if (!alertEmail && !alertPhone) {
      setToastMessage('Please provide either email or phone number');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // Simulate setting alert
    setToastMessage(`Alert set for ${alertMedicine.brand} - ${alertMedicine.strengthMg}. You'll be notified when it's back in stock!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    setShowAlertModal(false);
    setAlertEmail('');
    setAlertPhone('');
    setAlertMedicine(null);
  };

  const handleGoToCart = () => {
    onClose(); // Close the pharmacy listing modal
    if (onGoToCart) {
      onGoToCart(); // Trigger the cart modal
    }
  };

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    if (filterBy === 'inStock') {
      return pharmacy.medicines.some(med => med.available);
    }
    return true;
  });

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-pharma-brown border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
            <p className="text-pharma-dark dark:text-white">Searching pharmacies...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-pharma-cream dark:bg-gray-700 px-4 sm:px-6 py-3 sm:py-4 border-b border-pharma-beige dark:border-gray-600">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold text-pharma-dark dark:text-white truncate">
                Pharmacies with "{searchQuery}"
              </h2>
              <p className="text-sm sm:text-base text-pharma-dark dark:text-gray-300">
                Found {filteredPharmacies.length} pharmacies
              </p>
            </div>
            <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
              {/* Go to Cart Button */}
              <motion.button
                onClick={handleGoToCart}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-pharma-brown text-white rounded-lg hover:bg-pharma-brown/90 transition-colors duration-200 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span className="hidden sm:inline">Go to Cart</span>
                <span className="sm:hidden">Cart</span>
                {getTotalItems() > 0 && (
                  <span className="bg-white text-pharma-brown rounded-full px-2 py-1 text-xs font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-pharma-dark dark:text-white hover:text-pharma-brown transition-colors duration-200 p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-pharma-beige dark:border-gray-600">
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium text-pharma-dark dark:text-white mb-1">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2 sm:px-3 py-2 text-sm sm:text-base border border-pharma-beige dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
              >
                <option value="distance">Distance</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium text-pharma-dark dark:text-white mb-1">
                Filter:
              </label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full px-2 sm:px-3 py-2 text-sm sm:text-base border border-pharma-beige dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-pharma-dark dark:text-white"
              >
                <option value="all">All</option>
                <option value="inStock">In Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-96 sm:h-[400px] lg:h-96">
          {/* Pharmacy List */}
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-pharma-beige dark:border-gray-600 overflow-y-auto">
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {filteredPharmacies.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-pharma-dark dark:text-gray-300">No pharmacies found</p>
                </div>
              ) : (
                filteredPharmacies.map((pharmacy, index) => (
                  <motion.div
                    key={pharmacy.id}
                    className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedPharmacy?.id === pharmacy.id
                        ? 'border-pharma-brown bg-pharma-cream dark:bg-gray-700'
                        : 'border-pharma-beige dark:border-gray-600 hover:border-pharma-brown/50'
                    }`}
                    onClick={() => handlePharmacySelect(pharmacy)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-pharma-dark dark:text-white truncate pr-2">
                        {pharmacy.pharmacyName}
                      </h3>
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <span className="text-yellow-500 text-sm sm:text-base">★</span>
                        <span className="text-xs sm:text-sm text-pharma-dark dark:text-gray-300">
                          {pharmacy.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-pharma-dark dark:text-gray-300 mb-2 line-clamp-2">
                      {pharmacy.address}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-pharma-dark dark:text-gray-300">
                        {pharmacy.distance.toFixed(1)} km away
                      </span>
                      <span className="text-pharma-brown font-medium">
                        From ₹{Math.min(...pharmacy.medicines.map(m => m.price)).toFixed(0)}
                      </span>
                    </div>
                    
                    <div className="mt-2 text-xs text-pharma-dark dark:text-gray-400">
                      {pharmacy.totalMedicines} medicine{pharmacy.totalMedicines !== 1 ? 's' : ''} available
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Medicine Details */}
          <div className="w-full lg:w-1/2 p-3 sm:p-4 overflow-y-auto">
            {selectedPharmacy ? (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-pharma-dark dark:text-white mb-3 sm:mb-4">
                  Medicines at {selectedPharmacy.pharmacyName}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {pharmacyMedicines.map((medicine, index) => (
                    <motion.div
                      key={medicine.id}
                      className="p-3 sm:p-4 bg-pharma-cream dark:bg-gray-700 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-2 gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-pharma-dark dark:text-white text-sm sm:text-base truncate">
                            {medicine.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-pharma-dark dark:text-gray-300 truncate">
                            {medicine.brand} - {medicine.strengthMg}
                          </p>
                        </div>
                        <span className="text-base sm:text-lg font-bold text-pharma-brown flex-shrink-0">
                          ₹{medicine.price.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            medicine.available 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {medicine.available ? `Stock: ${medicine.stock}` : 'Out of Stock'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {medicine.available ? (
                            <button
                              onClick={() => handleAddToCart(medicine)}
                              disabled={addedItems.has(medicine.id)}
                              className={`px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 text-xs sm:text-sm ${
                                addedItems.has(medicine.id)
                                  ? 'bg-green-500 text-white cursor-not-allowed'
                                  : 'bg-pharma-brown text-white hover:bg-pharma-brown/90'
                              }`}
                            >
                              {addedItems.has(medicine.id) ? '✓ Added' : 'Add to Cart'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSetAlert(medicine)}
                              className="px-3 sm:px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200 text-xs sm:text-sm"
                            >
                              Set Alert
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-pharma-dark dark:text-gray-300 text-sm sm:text-base">
                  Select a pharmacy to view medicines
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <motion.div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={handleGoToCart}
            className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-pharma-brown text-white rounded-full shadow-lg hover:bg-pharma-brown/90 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span className="font-medium text-sm sm:text-base hidden sm:inline">View Cart</span>
            <span className="bg-white text-pharma-brown rounded-full px-2 py-1 text-xs sm:text-sm font-bold">
              {getTotalItems()}
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Modal */}
      <AnimatePresence>
        {showAlertModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-2 sm:mx-4 p-4 sm:p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-pharma-dark dark:text-white">
                  Set Stock Alert
                </h3>
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="text-pharma-dark dark:text-white hover:text-pharma-brown transition-colors duration-200 p-1"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-semibold text-pharma-dark dark:text-white mb-1">
                  {alertMedicine?.name}
                </h4>
                <p className="text-sm text-pharma-dark dark:text-gray-300">
                  {alertMedicine?.brand} - {alertMedicine?.strengthMg}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                  Currently out of stock at {selectedPharmacy?.pharmacyName}
                </p>
              </div>

              <form onSubmit={handleAlertSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-pharma-beige dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-pharma-dark dark:text-white focus:border-pharma-brown dark:focus:border-pharma-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={alertPhone}
                    onChange={(e) => setAlertPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-pharma-beige dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-pharma-dark dark:text-white focus:border-pharma-brown dark:focus:border-pharma-blue focus:outline-none"
                  />
                </div>

                <div className="text-xs text-pharma-dark dark:text-gray-400">
                  We'll notify you when this medicine is back in stock. You can provide either email or phone number.
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAlertModal(false)}
                    className="flex-1 px-4 py-2 border border-pharma-beige dark:border-gray-600 text-pharma-dark dark:text-white rounded-lg hover:bg-pharma-cream dark:hover:bg-gray-700 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Set Alert
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PharmacyListing;
