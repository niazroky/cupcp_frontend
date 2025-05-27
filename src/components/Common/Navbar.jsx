// src\components\CupcpHome\Navbar.jsx

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";
import logo from "../../assets/logo.svg"; // Adjust the path as necessary


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = useContext(AuthContext);

  const getDashboardNavLink = () => {
    return auth.role === "student" ? "student-dashboard" : "teacher-dashboard";
  };

  return (
    <nav className="bg-gray-900 py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="CUPCP Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-blue-500 drop-shadow-lg">CUPCP</span>
        </NavLink>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-indigo-400"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/" 
            className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/join-club" 
            className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`}
          >
            Join Club
          </NavLink>
          <NavLink 
            to="/members" 
            className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`}
          >
            See Members
          </NavLink>
          {auth?.role && (
            <NavLink 
              to={getDashboardNavLink()} 
              className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`}
            >
              Dashboard
            </NavLink>
          )}
          <NavLink 
            to="/academic" 
            className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`}
          >
            Academic
          </NavLink>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-800 md:hidden p-4 flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/join-club" 
              className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`} 
              onClick={() => setIsOpen(false)}
            >
              Join Club
            </NavLink>
            <NavLink 
              to="/members" 
              className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`}
              onClick={() => setIsOpen(false)}
            >
              See Members
            </NavLink>
            {auth?.role && (
              <NavLink 
                to={getDashboardNavLink()} 
                className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`} 
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
            <NavLink 
              to="/academic" 
              className={({isActive})=>`hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`} 
              onClick={() => setIsOpen(false)}
            >
              Academic
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;