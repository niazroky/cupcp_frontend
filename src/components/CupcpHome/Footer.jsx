// src\components\CupcpHome\Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 px-4 sm:px-6"> {/* Reduced padding for smaller size */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* Adjusted gap size */}
        
        {/* Contact Us Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">Contact Us</h3> {/* Reduced margin for a more compact look */}
          <p className="text-sm sm:text-base text-gray-300">Email: info@cupcp.edu</p>
          <p className="text-sm sm:text-base text-gray-300">Location: Department of Physics</p>
          <p className="text-sm sm:text-base text-gray-300">University of Chittagong</p>
        </div>

        {/* Quick Links Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">Quick Links</h3> {/* Reduced margin for consistency */}
          <ul className="space-y-2">
            <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-accent transition-colors">Events</a></li>
            <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-accent transition-colors">Resources</a></li>
            <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-accent transition-colors">Projects</a></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">Follow Us</h3> {/* Reduced margin for a more compact footer */}
          <ul className="space-y-2">
            <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-accent transition-colors">Facebook</a></li>
            <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-accent transition-colors">Twitter</a></li>
            <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-accent transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      
      {/* Footer Bottom Section */}
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-gray-700 text-center"> {/* Adjusted top margin and padding */}
        <p className="text-sm sm:text-base text-gray-400">© 2024 CUPCP. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
