// src/components/CupcpHome/Hero.jsx

import React, { useState } from "react";
import logo from "../../assets/logo.svg";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        {/* Logo with hover effect */}
        <div className="mb-2">
          <img
            src={logo}
            alt="CUPCP Logo"
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-transform duration-300 ${
              isHovered ? "scale-110 shadow-lg shadow-blue-500/50" : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-100 leading-tight tracking-wide">
          Chittagong University Programming
          <br />
          <span className="text-blue-400">& Computational Physics Club</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-xl">
          Where Physics Meets Programming
        </p>

      </div>
    </section>
  );
};

export default Hero;
