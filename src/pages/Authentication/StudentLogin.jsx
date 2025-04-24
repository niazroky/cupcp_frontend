// src\pages\Authentication\StudentLogin.jsx

// Import necessary dependencies and components
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";

// API endpoint for student login
const API_STUDENT_LOGIN = "http://localhost:8000/api/students/login/";

/**
 * StudentLogin Component
 *
 * This component provides a login form for students using their varsity ID and password.
 * It handles user authentication by sending login credentials to the backend API.
 */
const StudentLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // State to manage login form data
  const [formData, setFormData] = useState({
    varsity_id: "",
    password: "",
  });

  // State to manage login error messages
  const [error, setError] = useState("");

  /**
   * Handles input changes and updates form state.
   */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Handles form submission and performs login authentication.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_STUDENT_LOGIN, formData);
      if (response.status === 200) {
        alert("Login Successful!");
        
        // Store authentication tokens and user role using context
        login(response.data.access, response.data.refresh, response.data.role);
        
        // Redirect the user to the student success page
        navigate("/academic/success-student");
      }
    } catch (err) {
      setError("Login failed. Please check your varsity ID and password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar for navigation */}
      <Navbar />

      {/* Main login form section */}
      <section className="flex-grow pt-24 pb-16 px-4 sm:px-6 bg-gray-800 text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Student Login</h1>

          {/* Login form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Varsity ID input field */}
            <div className="mb-4">
              <label className="block mb-1">Varsity ID</label>
              <input
                type="text"
                name="varsity_id"
                value={formData.varsity_id}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700"
                placeholder="Enter your 8-digit ID"
              />
            </div>

            {/* Password input field */}
            <div className="mb-6">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700"
                placeholder="********"
              />
            </div>

            {/* Display error message if login fails */}
            {error && <p className="mb-4 text-red-400">{error}</p>}

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded transition"
            >
              Login
            </button>
          </form>
        </div>
      </section>

      {/* Footer for additional navigation and information */}
      <Footer />
    </div>
  );
};

// Export the component for use in the application
export default StudentLogin;
