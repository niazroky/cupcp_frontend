// src\pages\Authentication\SuccessTeacher.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";

/**
 * SuccessTeacher Component
 *
 * This page confirms a successful teacher login,
 * providing feedback that authentication was successful.
 */
const SuccessTeacher = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/academic/exam-summary");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at the top for navigation */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 bg-gray-900 text-white">
        <section className="w-full bg-gray-800 text-white py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Congrats!</h1>
            <p className="text-lg sm:text-xl mb-6">
              You, as a Teacher, have Registered and Logged in Successfully!
            </p>
            <button
              onClick={handleRedirect}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              See Student Dashboard
            </button>
          </div>
        </section>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default SuccessTeacher;
