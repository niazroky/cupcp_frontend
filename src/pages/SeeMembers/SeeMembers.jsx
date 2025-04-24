// src\pages\SeeMembers\SeeMembers.jsx

import React from "react";

// Import Navbar Components
import Navbar from "../../components/CupcpHome/Navbar";
import Hero from "../../components/CupcpHome/Hero";
import Footer from "../../components/CupcpHome/Footer";

/**
 * SeeMembers Component
 * 
 * This page displays information about the members of the CUPCP club.
 * Currently, it features a placeholder message indicating the section is under development.
 */
const SeeMembers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Ensures the page takes up at least the full viewport height */}
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 bg-gray-900 text-white">
        {/* Section to showcase club members (Under Development) */}
        <section className="w-full bg-gray-800 text-white py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Coming Soon!
            </h1>
            <p className="text-lg sm:text-xl">
              We have two honorable teachers and three dedicated students as
              Founding Members.
            </p>
          </div>
        </section>
      </main>

      {/* Additional sections and footer */}
      <Hero />
      <Footer />
    </div>
  );
};

export default SeeMembers;
