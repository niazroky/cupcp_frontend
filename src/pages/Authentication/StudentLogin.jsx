/* src/pages/Authentication/StudentLogin.jsx */
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";
import { Eye, EyeOff } from 'lucide-react';

const API_STUDENT_LOGIN = "https://cupcp.com/api/auth/students/login/";

const StudentLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    varsity_id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(v => !v);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // limit varsity_id to 8 chars
    if (name === 'varsity_id' && value.length > 8) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_STUDENT_LOGIN, formData);
      if (response.status === 200) {
        setMessage("Login successful! Redirecting...");
        login(response.data.access, response.data.refresh, response.data.role);
        setTimeout(() => navigate("/academic/success-student"), 1200);
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Status:", err.response.status);
        setError(
          `Login failed: Check your varsity ID and password please!`
        );
      } else {
        setError("Login failed: Network error or server unreachable.");
      }
    }    
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white">
      <Navbar />
      <section className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Student Login</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Varsity ID</label>
              <input
                type="text"
                name="varsity_id"
                value={formData.varsity_id}
                onChange={handleChange}
                maxLength={8}
                className="w-full p-2 rounded bg-gray-700"
                placeholder="Enter your 8-digit ID"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 pr-10"
                placeholder="********"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-8 right-3"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}                
              </button>
            </div>

            {error && <p className="mb-4 text-red-400">{error}</p>}
            {message && <p className="mb-4 text-green-300">{message}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded transition"
            >
              Login
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default StudentLogin;
