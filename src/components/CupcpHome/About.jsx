// src\components\CupcpHome\About.jsx

import React from 'react';

const About = () => {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center md:text-left text-white">
          About CUPCP
        </h2>

        {/* Description Section */}
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto md:mx-0">
          CUPCP is a unique platform where students of physics and computer science come together to explore
          the fascinating intersection of these two disciplines. Our club fosters innovation, collaboration, and
          learning through various activities, workshops, and projects that bridge the gap between theoretical
          physics and practical programming applications.
        </p>
      </div>
    </div>
  );
};

export default About;
