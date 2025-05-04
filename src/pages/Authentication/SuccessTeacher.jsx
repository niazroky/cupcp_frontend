// src/pages/Authentication/SuccessTeacher.jsx

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";

const SuccessTeacher = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/academic/teacher-login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <section className="w-full bg-gray-800 py-16 px-4 sm:px-6 text-center rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Congrats!</h1>
          <p className="text-lg sm:text-xl mb-8">
            You’ve successfully logged in as a Teacher.
          </p>
          <div className="space-x-4">
            <Link
              to="/academic/exam-summary"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              See Student Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessTeacher;
