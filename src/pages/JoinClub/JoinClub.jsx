// src\pages\JoinClub\JoinClub.jsx

import React from "react";

// Import Navbar Components
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";

/**
 * JoinClubPage Component
 * 
 * This page will provide users with the ability to join the CUPCP club.
 * Currently, it features a placeholder message indicating that development is in progress.
 */
const JoinClubPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Ensures the page occupies at least the full viewport height */}
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 bg-gray-900 text-white">
        {/* Placeholder section for the Join Club feature (Under Development) */}
        <section className="w-full bg-gray-800 text-white py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Coming Soon!
            </h1>
            <p className="text-lg sm:text-xl">
              Our team is actively developing the Join Club feature. Please stay
              tuned for updates and more details.
            </p>
          </div>
        </section>
      </main>

      {/* Additional sections and footer */}
      <Footer />
    </div>
  );
};

export default JoinClubPage;
