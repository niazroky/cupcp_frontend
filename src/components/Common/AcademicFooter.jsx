// src\components\CupcpHome\Footer.jsx

import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const AcademicFooter = () => {
  return (
    <footer className="bg-gray-900 py-8 px-4 sm:px-6"> {/* Reduced padding for smaller size */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* Adjusted gap size */}
        
        {/* Quick Links Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">Quick Links</h3> {/* Reduced margin for consistency */}
          <ul className="space-y-2">
            <li><Link to="/academic" className="text-sm sm:text-base text-gray-300 hover:text-accent transition-colors">CU Physics Academic</Link></li>
            <li><Link to="/join-club" className="text-sm sm:text-base text-gray-300 hover:text-accent transition-colors">Join Club</Link></li>
            <li><Link to="/members" className="text-sm sm:text-base text-gray-300 hover:text-accent transition-colors">Members</Link></li>
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

export default AcademicFooter;
