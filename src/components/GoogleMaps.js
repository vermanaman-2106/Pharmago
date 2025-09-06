import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GoogleMaps = ({ searchQuery }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyPharmacies, setNearbyPharmacies] = useState([]);

  // Mock pharmacy data with coordinates
  const mockPharmacies = [
    {
      id: 1,
      name: 'Apollo Pharmacy',
      address: '123 Main Street, Downtown, Mumbai',
      lat: 19.0760,
      lng: 72.8777,
      rating: 4.2,
      distance: '0.8 km',
      phone: '+91 98765 43210',
      isOpen: true
    },
    {
      id: 2,
      name: 'MedPlus',
      address: '456 Health Avenue, Medical District, Mumbai',
      lat: 19.0860,
      lng: 72.8877,
      rating: 4.0,
      distance: '1.2 km',
      phone: '+91 98765 43211',
      isOpen: true
    },
    {
      id: 3,
      name: 'CareWell Pharmacy',
      address: '789 Wellness Road, Suburb, Mumbai',
      lat: 19.0660,
      lng: 72.8677,
      rating: 4.5,
      distance: '2.1 km',
      phone: '+91 98765 43212',
      isOpen: false
    },
    {
      id: 4,
      name: 'Wellness Plus',
      address: '321 Health Center, Andheri West, Mumbai',
      lat: 19.0960,
      lng: 72.8977,
      rating: 4.3,
      distance: '1.8 km',
      phone: '+91 98765 43213',
      isOpen: true
    },
    {
      id: 5,
      name: 'HealthMart',
      address: '654 Medical Plaza, Bandra East, Mumbai',
      lat: 19.0560,
      lng: 72.8577,
      rating: 3.8,
      distance: '3.2 km',
      phone: '+91 98765 43214',
      isOpen: true
    }
  ];

  useEffect(() => {
    // Initialize map
    const initMap = () => {
      if (mapRef.current && !map) {
        const mumbaiCenter = { lat: 19.0760, lng: 72.8777 };
        
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          zoom: 13,
          center: mumbaiCenter,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        setMap(mapInstance);
        setNearbyPharmacies(mockPharmacies);
      }
    };

    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3MpRGk9FGjcLfzacqN8S2ndq8DYqH4J8&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Use Mumbai as default
          setUserLocation({ lat: 19.0760, lng: 72.8777 });
        }
      );
    } else {
      setUserLocation({ lat: 19.0760, lng: 72.8777 });
    }
  }, []);

  useEffect(() => {
    if (map && nearbyPharmacies.length > 0) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      const newMarkers = [];

      // Add pharmacy markers
      nearbyPharmacies.forEach(pharmacy => {
        const marker = new window.google.maps.Marker({
          position: { lat: pharmacy.lat, lng: pharmacy.lng },
          map: map,
          title: pharmacy.name,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="${pharmacy.isOpen ? '#10B981' : '#EF4444'}" stroke="white" stroke-width="2"/>
                <path d="M12 16h16v8H12z" fill="white"/>
                <path d="M16 20h8v2h-8z" fill="${pharmacy.isOpen ? '#10B981' : '#EF4444'}"/>
                <circle cx="20" cy="12" r="2" fill="white"/>
              </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 20)
          }
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #1F2937; font-size: 16px; font-weight: 600;">${pharmacy.name}</h3>
              <p style="margin: 0 0 4px 0; color: #6B7280; font-size: 14px;">${pharmacy.address}</p>
              <div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
                <span style="color: ${pharmacy.isOpen ? '#10B981' : '#EF4444'}; font-size: 12px; font-weight: 600;">
                  ${pharmacy.isOpen ? '● Open' : '● Closed'}
                </span>
                <span style="color: #6B7280; font-size: 12px;">${pharmacy.distance}</span>
                <span style="color: #F59E0B; font-size: 12px;">★ ${pharmacy.rating}</span>
              </div>
              <p style="margin: 4px 0 0 0; color: #6B7280; font-size: 12px;">${pharmacy.phone}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        newMarkers.push(marker);
      });

      // Add user location marker
      if (userLocation) {
        const userMarker = new window.google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Your Location',
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="12" fill="#3B82F6" stroke="white" stroke-width="3"/>
                <circle cx="15" cy="15" r="6" fill="white"/>
              </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: new window.google.maps.Point(15, 15)
          }
        });
        newMarkers.push(userMarker);
      }

      setMarkers(newMarkers);

      // Fit map to show all markers
      if (newMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        newMarkers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);
      }
    }
  }, [map, nearbyPharmacies, userLocation]);

  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Map Header */}
        <div className="bg-pharma-cream dark:bg-gray-700 px-4 sm:px-6 py-3 sm:py-4 border-b border-pharma-beige dark:border-gray-600">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-pharma-dark dark:text-white">
                Nearby Pharmacies
              </h3>
              <p className="text-xs sm:text-sm text-pharma-dark dark:text-gray-300">
                {nearbyPharmacies.length} pharmacies found near you
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-end space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs sm:text-sm text-pharma-dark dark:text-white">Open</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs sm:text-sm text-pharma-dark dark:text-white">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div 
            ref={mapRef} 
            className="w-full h-[250px] sm:h-[300px] md:h-[400px]"
            style={{ minHeight: '250px' }}
          />
          
          {/* Map Controls */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col space-y-1 sm:space-y-2">
            <motion.button
              className="bg-white dark:bg-gray-800 p-1.5 sm:p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (userLocation && map) {
                  map.setCenter(userLocation);
                  map.setZoom(15);
                }
              }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pharma-brown dark:text-pharma-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.button>
            
            <motion.button
              className="bg-white dark:bg-gray-800 p-1.5 sm:p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (map) {
                  const bounds = new window.google.maps.LatLngBounds();
                  nearbyPharmacies.forEach(pharmacy => {
                    bounds.extend({ lat: pharmacy.lat, lng: pharmacy.lng });
                  });
                  if (userLocation) {
                    bounds.extend(userLocation);
                  }
                  map.fitBounds(bounds);
                }
              }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pharma-brown dark:text-pharma-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </motion.button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default GoogleMaps;
