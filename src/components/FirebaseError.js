import React from 'react';

const FirebaseError = ({ error }) => {
  return (
    <div className="min-h-screen bg-pharma-cream dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
        <div className="text-6xl mb-4">🔥</div>
        <h2 className="text-2xl font-bold text-pharma-dark dark:text-white mb-4">
          Firebase Connection Error
        </h2>
        <p className="text-pharma-dark dark:text-gray-300 mb-4">
          There's an issue connecting to Firebase. Please check your configuration.
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded">
          {error?.message || 'Unknown error'}
        </div>
        <div className="space-y-2 text-sm text-pharma-dark dark:text-gray-300">
          <p>Make sure you have:</p>
          <ul className="text-left space-y-1">
            <li>• Enabled Authentication in Firebase Console</li>
            <li>• Created Firestore Database</li>
            <li>• Set up proper security rules</li>
          </ul>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-pharma-brown text-white rounded-lg hover:bg-pharma-brown/90 transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FirebaseError;
