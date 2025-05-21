// src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/CupcpHome/Hero';
import About from '../../components/CupcpHome/About';
import Cards from '../../components/CupcpHome/Cards';

const Home = () => {
  return (
    <div className="min-h-screen bg-primary">
      <main>
        {/* Hero component */}
        <Hero />

        {/* ───── Featured Initiative: Academic Portal ───── */}
        <section className="mx- sm:mx-8 xl:mx-auto max-w-screen-xl bg-gray-700 rounded-lg p-8 text-white shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-bold text-center">
            CU Physics Academic
          </h2>
          <p className="mt-2 text-center text-gray-300">
            A CUPCP initiative for course materials, 1st‑year exam form fill‑up, 
            and student or teacher registration with a dashboard for teachers.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/academic"
              className="inline-block border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold px-6 py-3 rounded-full transition duration-300"
            >
              Explore the Academic Portal
            </Link>
          </div>
        </section>

        {/* About section */}
        <About />

        {/* Cards section */}
        <Cards />
      </main>
    </div>
  );
};

export default Home;
