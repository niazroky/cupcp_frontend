/* src/pages/Authentication/StudentLogin.jsx */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";
import { Eye, EyeOff } from 'lucide-react';
import apiRoutes from "../../api/apiRoute";


const StudentLogin = () => {

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      const response = await axios.post(apiRoutes.studentLogin, formData);
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
      <section className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-center">Student Login</h1>
          <form onSubmit={handleSubmit} noValidate>


            {/* Varsity ID */}
            <div className="mb-8">
              <label className="block mb-3 font-medium">Varsity ID:</label>
              <input
                type="text"
                name="varsity_id"
                value={formData.varsity_id}
                onChange={handleChange}
                maxLength={8}
                className="w-full p-2 rounded bg-gray-700"
                placeholder=""
              />
            </div>


            {/* Password */}
            <div className="mb-4 relative">
              <label className="block mb-3 font-medium">Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 pr-10"
                placeholder=""
              />
              {/* Password visibility toggle button */}
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-12 right-3"
              >
                {showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}                
              </button>
            </div>

            {error && <p className="mb-4 text-red-400">{error}</p>}
            {message && <p className="mb-4 text-green-300">{message}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded transition mt-5"
            >
              Login
            </button>

            <div className="mt-6">
              <p className="text-sm text-center">
                Not registered?{' '}
                <Link
                  to="/academic/student-register"
                  className="underline text-blue-400 hover:text-blue-300"
                >
                  Register here
                </Link>
              </p>
           </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default StudentLogin;
