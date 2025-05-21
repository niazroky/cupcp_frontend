// src/pages/Authentication/TeacherLogin.jsx

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import apiRoutes from "../../api/apiRoute";


const TeacherLogin = () => {

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((v) => !v);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await axios.post(apiRoutes.teacherLogin, formData);
      if (response.status === 200) {
        setMessage("Login successful! Redirecting...");
        login(response.data.access, response.data.refresh, response.data.role);
        setTimeout(() => navigate("/academic/success-teacher"), 1200);
      }
    } catch (err) {
      console.error("Teacher login error:", err);
      if (err.response) {
        setError(
          `Login failed: Check your email and password please!`
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
          <h1 className="text-3xl font-bold mb-8 text-center">Teacher Login</h1>
          <form onSubmit={handleSubmit} noValidate>


            {/* Email */}
            <div className="mb-8">
              <label className="block mb-3 font-medium">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700"
                placeholder=""
              />
            </div>


            {/* Password */}
            <div className="mb-8 relative">
              <label className="block mb-3 font-medium">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 pr-10"
                placeholder=""
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-12 right-3"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Flash messages */}
            {error && <p className="mb-4 text-red-400">{error}</p>}
            {message && <p className="mb-4 text-green-300">{message}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
            >
              Login
            </button>

            {/* Registration link */}
            <div className="mt-6">
              <p className="text-sm text-center">
                Not registered?{' '}
                <Link
                  to="/academic/teacher-register"
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

export default TeacherLogin;
