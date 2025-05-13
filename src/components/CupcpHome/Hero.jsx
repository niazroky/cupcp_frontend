// src\components\CupcpHome\Hero.jsx

import React, { useState } from "react";
import logo from "../../assets/logo.svg"; // Import the logo

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-gray-800 text-white py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
        {/* Text Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight pt-12 pb-4 text-gray-300">
            CHITTAGONG UNIVERSITY PROGRAMMING
            <br />
             & COMPUTATIONAL PHYSICS CLUB
          </h1>
          <p className="text-sm sm:text-base text-blue-400 font-medium">
            A Club Where Physics Meets Code
          </p>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="CUPCP Logo"
            className={`w-20 h-20 sm:w-24 sm:h-24 object-cover transition-all duration-300 border-0 bg-transparent transform ${
              isHovered ? "shadow-blue-500 shadow-2xl scale-110" : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
