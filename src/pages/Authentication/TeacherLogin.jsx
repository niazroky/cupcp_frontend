// src\pages\Authentication\TeacherLogin.jsx

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";

// API endpoint for teacher login
const API_TEACHER_LOGIN = "http://localhost:8000/api/teachers/login/";

/**
 * TeacherLogin Component
 *
 * This component handles teacher authentication by allowing them to log in
 * using their email and password. Upon successful login, the authentication
 * token is stored, and the user is redirected to the protected success page.
 */
const TeacherLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // State to manage form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to manage login error messages
  const [error, setError] = useState("");

  /**
   * Handles input field changes and updates the formData state.
   */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Handles form submission for teacher login.
   * Sends a POST request to the backend for authentication.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_TEACHER_LOGIN, formData);
      if (response.status === 200) {
        alert("Login Successful!");
        // Save tokens and user role using AuthContext
        login(response.data.access, response.data.refresh, response.data.role);
        // Redirect to the protected teacher success page
        navigate("/academic/success-teacher");
      }
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar for navigation */}
      <Navbar />

      {/* Main content section */}
      <section className="flex-grow pt-24 pb-16 px-4 sm:px-6 bg-gray-800 text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Teacher Login</h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700"
                placeholder="example@teacher.com"
              />
            </div>

            {/* Password Input */}
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
            >
              Login
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TeacherLogin;
