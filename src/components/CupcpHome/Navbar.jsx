// src\components\CupcpHome\Navbar.jsx

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  // State to track mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Navigation bar with fixed position and dark background
    <nav className="bg-gray-900 py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* CUPCP Home Button */}
        <Link to="/" className="text-2xl font-bold text-blue-500 drop-shadow-lg">
          CUPCP
        </Link>

        {/* Mobile menu button (hamburger icon) */}
        <button
          className="md:hidden text-gray-300 hover:text-indigo-400"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {/* Show close icon when menu is open, else show menu icon */}
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Desktop menu - Visible only on medium (md) screens and larger */}
        <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <Link to="/join-club" className="text-gray-300 hover:text-indigo-400 transition-colors">
            Join Club
          </Link>
          <Link to="/members" className="text-gray-300 hover:text-indigo-400 transition-colors">
            See Members
          </Link>
          <Link to="/academic" className="text-gray-300 hover:text-indigo-400 transition-colors">
            Academics
          </Link>
        </div>

        {/* Mobile menu - Visible when `isOpen` is true */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-800 md:hidden p-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/join-club" className="text-gray-300 hover:text-indigo-400 transition-colors" onClick={() => setIsOpen(false)}>
              Join Club
            </Link>
            <Link to="/members" className="text-gray-300 hover:text-indigo-400 transition-colors" onClick={() => setIsOpen(false)}>
              See Members
            </Link>
            <Link to="/academic" className="text-gray-300 hover:text-indigo-400 transition-colors" onClick={() => setIsOpen(false)}>
              Academic
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
