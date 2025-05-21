import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const AcademicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 py-3 px-5 fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Branding */}
        <div className="flex flex-col">
          <Link to="/academic" className="text-2xl font-extrabold text-white">
            CU Physics Academic
          </Link>
          <Link to="/" className="text-xs text-gray-400 hover:text-blue-300 transition-colors mt-1">
            An initiative by CUPCP Club
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          {['Student Register', 'Student Login', 'Teacher Register', 'Teacher Login'].map((label) => {
            const path = label.toLowerCase().replace(/ /g, '-');
            return (
              <Link
                key={label}
                to={`/academic/${path}`}
                className="text-gray-200 hover:text-white px-3 py-1 rounded-lg transition-colors text-sm font-medium"
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-indigo-400 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 mt-2 rounded-b-lg overflow-hidden">
          {['Student Register', 'Student Login', 'Teacher Register', 'Teacher Login'].map((label) => {
            const path = label.toLowerCase().replace(/ /g, '-');
            return (
              <Link
                key={label}
                to={`/academic/${path}`}
                className="block px-5 py-3 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default AcademicNavbar;