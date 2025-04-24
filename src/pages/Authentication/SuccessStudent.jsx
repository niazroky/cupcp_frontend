// src/pages/Authentication/SuccessStudent.jsx

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";

/**
 * SuccessStudent Component
 * 
 * Shows login success, then a button to go to the exam‐registration page.
 */
const SuccessStudent = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />

    <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 bg-gray-900 text-white">
      <section className="w-full bg-gray-800 py-16 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Congrats!</h1>
        <p className="text-lg sm:text-xl mb-8">
          You’ve successfully logged in as a Student.
        </p>
        <Link
          to="/academic/exam-form-fillup"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Go to Exam Registration
        </Link>
      </section>
    </main>

    <Footer />
  </div>
);

export default SuccessStudent;
