// src\pages\Authentication\Forbidden.jsx


import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800">
      <h1 className="text-4xl font-bold mb-4">403 - Forbidden</h1>
      <p className="mb-6 text-lg">You don’t have permission to access this page.</p>
      <Link to="/" className="text-blue-600 underline">
        Go back to homepage
      </Link>
    </div>
  );
};

export default Forbidden;