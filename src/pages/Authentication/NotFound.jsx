// src/pages/Authentication/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
      <h1 className="text-7xl font-extrabold mb-4 text-red-500">404</h1>
      <p className="text-2xl mb-6 text-gray-400">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
