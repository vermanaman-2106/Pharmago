
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MedicinesPage = ({ pharmacyId }) => {
  const [medicines, setMedicines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    strengthMg: '',
    category: '',
    price: '',
    stock: '',
    available: true
  });
  const [errors, setErrors] = useState({});
  
  // Admin Portal Features
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState(new Set());
  const [bulkAction, setBulkAction] = useState('price');
  const [bulkValue, setBulkValue] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [priceHistory, setPriceHistory] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, [pharmacyId]);

  const fetchMedicines = () => {
    // Enhanced mock data with price history and analytics
    const mockMedicines = [
      {
        id: '1',
        name: 'Paracetamol',
        brand: 'Crocin',
        strengthMg: '500mg',
        category: 'Pain Relief',
        price: 245,
        stock: 25,
        available: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        priceHistory: [
          { date: new Date('2024-01-01'), price: 240 },
          { date: new Date('2024-01-10'), price: 245 }
        ],
        salesCount: 150,
        lastRestocked: new Date('2024-01-10')
      },
      {
        id: '2',
        name: 'Ibuprofen',
        brand: 'Brufen',
        strengthMg: '400mg',
        category: 'Pain Relief',
        price: 180,
        stock: 5, // Low stock for testing
        available: true,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16'),
        priceHistory: [
          { date: new Date('2024-01-01'), price: 175 },
          { date: new Date('2024-01-08'), price: 180 }
        ],
        salesCount: 89,
        lastRestocked: new Date('2024-01-05')
      },
      {
        id: '3',
        name: 'Amoxicillin',
        brand: 'Amoxil',
        strengthMg: '250mg',
        category: 'Antibiotic',
        price: 320,
        stock: 15,
        available: true,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-17'),
        priceHistory: [
          { date: new Date('2024-01-01'), price: 315 },
          { date: new Date('2024-01-12'), price: 320 }
        ],
        salesCount: 45,
        lastRestocked: new Date('2024-01-12')
      },
      {
        id: '4',
        name: 'Metformin',
        brand: 'Glucophage',
        strengthMg: '500mg',
        category: 'Diabetes',
        price: 280,
        stock: 0, // Out of stock
        available: false,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18'),
        priceHistory: [
          { date: new Date('2024-01-01'), price: 275 },
          { date: new Date('2024-01-15'), price: 280 }
        ],
        salesCount: 67,
        lastRestocked: new Date('2024-01-15')
      },
      {
        id: '5',
        name: 'Omeprazole',
        brand: 'Omez',
        strengthMg: '20mg',
        category: 'Digestive',
        price: 195,
        stock: 8, // Low stock
        available: true,
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19'),
        priceHistory: [
          { date: new Date('2024-01-01'), price: 190 },
          { date: new Date('2024-01-14'), price: 195 }
        ],
        salesCount: 34,
        lastRestocked: new Date('2024-01-14')
      }
    ];
    
    setMedicines(mockMedicines);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Medicine name is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.strengthMg.trim()) newErrors.strengthMg = 'Strength is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.price.trim() || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.stock.trim() || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const medicineData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      updatedAt: new Date()
    };

    if (editingMedicine) {
      // Update existing medicine
      setMedicines(prev => prev.map(med => 
        med.id === editingMedicine.id 
          ? { ...med, ...medicineData }
          : med
      ));
    } else {
      // Add new medicine
      const newMedicine = {
        id: Date.now().toString(), // Simple ID generation
        ...medicineData,
        createdAt: new Date()
      };
      setMedicines(prev => [...prev, newMedicine]);
    }

    setFormData({
      name: '',
      brand: '',
      strengthMg: '',
      category: '',
      price: '',
      stock: '',
      available: true
    });
    setEditingMedicine(null);
    setShowForm(false);
    setErrors({});
  };

  const handleEdit = (medicine) => {
    setFormData({
      name: medicine.name,
      brand: medicine.brand,
      strengthMg: medicine.strengthMg,
      category: medicine.category,
      price: medicine.price.toString(),
      stock: medicine.stock.toString(),
      available: medicine.available
    });
    setEditingMedicine(medicine);
    setShowForm(true);
  };

  const handleDelete = (medicineId) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(prev => prev.filter(med => med.id !== medicineId));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      strengthMg: '',
      category: '',
      price: '',
      stock: '',
      available: true
    });
    setEditingMedicine(null);
    setShowForm(false);
    setErrors({});
  };

  // Admin Portal Functions
  const handleBulkUpdate = () => {
    if (selectedMedicines.size === 0) {
      alert('Please select medicines to update');
      return;
    }

    if (!bulkValue || isNaN(bulkValue) || parseFloat(bulkValue) <= 0) {
      alert('Please enter a valid value');
      return;
    }

    const value = parseFloat(bulkValue);
    setMedicines(prev => prev.map(med => {
      if (selectedMedicines.has(med.id)) {
        const updatedMed = { ...med };
        
        if (bulkAction === 'price') {
          // Add to price history
          updatedMed.priceHistory = [
            ...med.priceHistory,
            { date: new Date(), price: value }
          ];
          updatedMed.price = value;
        } else if (bulkAction === 'stock') {
          updatedMed.stock = value;
          updatedMed.lastRestocked = new Date();
        } else if (bulkAction === 'percentage') {
          const newPrice = med.price * (1 + value / 100);
          updatedMed.priceHistory = [
            ...med.priceHistory,
            { date: new Date(), price: newPrice }
          ];
          updatedMed.price = newPrice;
        }
        
        updatedMed.updatedAt = new Date();
        return updatedMed;
      }
      return med;
    }));

    setSelectedMedicines(new Set());
    setBulkValue('');
    setShowBulkUpdate(false);
  };

  const handleSelectAll = () => {
    if (selectedMedicines.size === filteredMedicines.length) {
      setSelectedMedicines(new Set());
    } else {
      setSelectedMedicines(new Set(filteredMedicines.map(med => med.id)));
    }
  };

  const handleSelectMedicine = (medicineId) => {
    const newSelected = new Set(selectedMedicines);
    if (newSelected.has(medicineId)) {
      newSelected.delete(medicineId);
    } else {
      newSelected.add(medicineId);
    }
    setSelectedMedicines(newSelected);
  };

  const getLowStockMedicines = () => {
    return medicines.filter(med => med.stock <= lowStockThreshold && med.stock > 0);
  };

  const getOutOfStockMedicines = () => {
    return medicines.filter(med => med.stock === 0);
  };

  const getTotalInventoryValue = () => {
    return medicines.reduce((total, med) => total + (med.price * med.stock), 0);
  };

  const getTopSellingMedicines = () => {
    return [...medicines]
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, 5);
  };

  // Filter and sort medicines
  const filteredMedicines = medicines
    .filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           med.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === 'lowStock') return med.stock <= lowStockThreshold && med.stock > 0;
      if (filterBy === 'outOfStock') return med.stock === 0;
      if (filterBy === 'available') return med.available;
      if (filterBy === 'unavailable') return !med.available;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price': return a.price - b.price;
        case 'stock': return a.stock - b.stock;
        case 'sales': return b.salesCount - a.salesCount;
        case 'category': return a.category.localeCompare(b.category);
        default: return 0;
      }
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-pharma-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pharma-dark dark:text-white">Loading medicines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin Portal Header */}
      <div className="bg-gradient-to-r from-pharma-blue to-pharma-cream dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-pharma-dark dark:text-white mb-2">
              Admin Portal - Medicine Management
            </h1>
            <p className="text-pharma-dark dark:text-gray-300">
              Manage your pharmacy inventory, update stock and prices
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <motion.button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-pharma-brown text-white rounded-lg hover:bg-pharma-brown/90 transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Medicine
            </motion.button>
            <motion.button
              onClick={() => setShowBulkUpdate(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Bulk Update
            </motion.button>
            <motion.button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Medicines</p>
                <p className="text-2xl font-bold text-pharma-dark dark:text-white">{medicines.length}</p>
              </div>
              <div className="w-12 h-12 bg-pharma-blue rounded-full flex items-center justify-center">
                <span className="text-2xl">💊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                <p className="text-2xl font-bold text-orange-600">{getLowStockMedicines().length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{getOutOfStockMedicines().length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Inventory Value</p>
                <p className="text-2xl font-bold text-green-600">₹{getTotalInventoryValue().toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Search Medicines
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or brand..."
              className="w-full px-3 py-2 border border-pharma-beige dark:border-gray-600 rounded-lg focus:outline-none focus:border-pharma-brown dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Filter By
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="w-full px-3 py-2 border border-pharma-beige dark:border-gray-600 rounded-lg focus:outline-none focus:border-pharma-brown dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Medicines</option>
              <option value="lowStock">Low Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-pharma-beige dark:border-gray-600 rounded-lg focus:outline-none focus:border-pharma-brown dark:bg-gray-700 dark:text-white"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
              <option value="sales">Sales Count</option>
              <option value="category">Category</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
              Low Stock Threshold
            </label>
            <input
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 10)}
              min="1"
              className="w-full px-3 py-2 border border-pharma-beige dark:border-gray-600 rounded-lg focus:outline-none focus:border-pharma-brown dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-pharma-dark dark:text-white mb-4">
              {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                    errors.name ? 'border-red-500' : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown'
                  }`}
                  placeholder="e.g., Paracetamol"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                    errors.brand ? 'border-red-500' : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown'
                  }`}
                  placeholder="e.g., Crocin"
                />
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                  Strength (mg) *
                </label>
                <input
                  type="text"
                  name="strengthMg"
                  value={formData.strengthMg}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                    errors.strengthMg ? 'border-red-500' : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown'
                  }`}
                  placeholder="e.g., 500mg"
                />
                {errors.strengthMg && <p className="text-red-500 text-sm mt-1">{errors.strengthMg}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                    errors.category ? 'border-red-500' : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown'
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Cold & Cough">Cold & Cough</option>
                  <option value="Digestive">Digestive</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                    errors.price ? 'border-red-500' : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                    errors.stock ? 'border-red-500' : 'border-pharma-beige dark:border-gray-600 focus:border-pharma-brown'
                  }`}
                  placeholder="0"
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
              </div>

              <div className="md:col-span-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={formData.available}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-pharma-brown border-gray-300 rounded focus:ring-pharma-brown"
                />
                <label htmlFor="available" className="text-sm font-medium text-pharma-dark dark:text-white">
                  Available for sale
                </label>
              </div>

              <div className="md:col-span-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-pharma-dark dark:text-white border border-pharma-beige dark:border-gray-600 rounded-lg hover:bg-pharma-cream dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-pharma-brown text-white rounded-lg hover:bg-pharma-brown/90 transition-colors duration-300"
                >
                  {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Update Modal */}
      <AnimatePresence>
        {showBulkUpdate && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-pharma-dark dark:text-white mb-4">
                Bulk Update Medicines
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                    Action
                  </label>
                  <select
                    value={bulkAction}
                    onChange={(e) => setBulkAction(e.target.value)}
                    className="w-full px-3 py-2 border border-pharma-beige dark:border-gray-600 rounded-lg focus:outline-none focus:border-pharma-brown dark:bg-gray-700 dark:text-white"
                  >
                    <option value="price">Update Price</option>
                    <option value="stock">Update Stock</option>
                    <option value="percentage">Update Price by Percentage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pharma-dark dark:text-white mb-2">
                    {bulkAction === 'percentage' ? 'Percentage Change (%)' : 
                     bulkAction === 'price' ? 'New Price (₹)' : 'New Stock Quantity'}
                  </label>
                  <input
                    type="number"
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    step={bulkAction === 'percentage' ? '0.1' : '0.01'}
                    className="w-full px-3 py-2 border border-pharma-beige dark:border-gray-600 rounded-lg focus:outline-none focus:border-pharma-brown dark:bg-gray-700 dark:text-white"
                    placeholder={bulkAction === 'percentage' ? '10' : '0'}
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Selected: {selectedMedicines.size} medicines
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowBulkUpdate(false)}
                  className="px-4 py-2 text-pharma-dark dark:text-white border border-pharma-beige dark:border-gray-600 rounded-lg hover:bg-pharma-cream dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkUpdate}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Update Selected
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Medicines Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-pharma-cream dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedMedicines.size === filteredMedicines.length && filteredMedicines.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-pharma-brown border-gray-300 rounded focus:ring-pharma-brown"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  Medicine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  Strength
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pharma-dark dark:text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMedicines.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-12 text-center text-pharma-dark dark:text-gray-400">
                    {searchTerm || filterBy !== 'all' 
                      ? 'No medicines match your search criteria.' 
                      : 'No medicines found. Add your first medicine to get started.'
                    }
                  </td>
                </tr>
              ) : (
                filteredMedicines.map((medicine, index) => (
                  <motion.tr
                    key={medicine.id}
                    className={`hover:bg-pharma-cream dark:hover:bg-gray-700 transition-colors duration-200 ${
                      selectedMedicines.has(medicine.id) ? 'bg-pharma-blue/10 dark:bg-pharma-blue/20' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedMedicines.has(medicine.id)}
                        onChange={() => handleSelectMedicine(medicine.id)}
                        className="w-4 h-4 text-pharma-brown border-gray-300 rounded focus:ring-pharma-brown"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-pharma-dark dark:text-white">
                        {medicine.name}
                      </div>
                      {medicine.priceHistory && medicine.priceHistory.length > 1 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Price changed {medicine.priceHistory.length - 1} times
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-pharma-dark dark:text-gray-300">
                        {medicine.brand}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-pharma-dark dark:text-gray-300">
                        {medicine.strengthMg}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-pharma-blue/10 text-pharma-blue dark:bg-pharma-blue/20">
                        {medicine.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-pharma-dark dark:text-white">
                        ₹{medicine.price.toFixed(2)}
                      </div>
                      {medicine.priceHistory && medicine.priceHistory.length > 1 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Last: ₹{medicine.priceHistory[medicine.priceHistory.length - 2]?.price.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className={`text-sm font-medium ${
                          medicine.stock === 0 
                            ? 'text-red-600 dark:text-red-400' 
                            : medicine.stock <= lowStockThreshold 
                            ? 'text-orange-600 dark:text-orange-400'
                            : 'text-pharma-dark dark:text-gray-300'
                        }`}>
                          {medicine.stock}
                        </div>
                        {medicine.stock <= lowStockThreshold && medicine.stock > 0 && (
                          <span className="text-xs text-orange-600 dark:text-orange-400">⚠️</span>
                        )}
                        {medicine.stock === 0 && (
                          <span className="text-xs text-red-600 dark:text-red-400">❌</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-pharma-dark dark:text-gray-300">
                        {medicine.salesCount || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        medicine.available 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {medicine.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(medicine)}
                          className="text-pharma-brown hover:text-pharma-brown/80 transition-colors duration-200"
                          title="Edit Medicine"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(medicine.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          title="Delete Medicine"
                        >
                          🗑️
                        </button>
                        {medicine.priceHistory && medicine.priceHistory.length > 1 && (
                          <button
                            onClick={() => {
                              // Show price history modal
                              alert(`Price History:\n${medicine.priceHistory.map(h => 
                                `${h.date.toLocaleDateString()}: ₹${h.price.toFixed(2)}`
                              ).join('\n')}`);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            title="View Price History"
                          >
                            📈
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicinesPage;