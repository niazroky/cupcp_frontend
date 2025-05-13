// src\pages\Academic\AcademicHome.jsx

import { Link } from "react-router-dom";
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";
import { GraduationCap, User2 } from "lucide-react";

const AcademicHome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />

      <section className="flex-grow pt-24 pb-16 px-4 sm:px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to CUPCP Academic Portal</h1>
          <p className="text-lg mb-12 text-gray-300">Select your role to register or log in to access academic resources</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center">
            {/* Student Card */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 hover:shadow-blue-700/40 transition-shadow duration-300 text-white rounded-2xl p-10 shadow-xl flex flex-col items-center">
              <GraduationCap className="w-12 h-12 mb-4 text-white" />
              <h2 className="text-2xl font-semibold mb-2">Student Access</h2>
              <p className="text-sm text-blue-100 mb-6">Register with your Varsity ID & Session</p>
              <div className="flex flex-col space-y-3 w-full max-w-xs">
                <Link
                  to="/academic/student-register"
                  className="bg-blue-600 hover:bg-blue-500 py-2 rounded-xl transition-all text-white font-medium"
                >
                  Student Register
                </Link>
                <Link
                  to="/academic/student-login"
                  className="text-blue-200 hover:text-white underline text-sm"
                >
                  Already Registered? Login
                </Link>
              </div>
            </div>

            {/* Teacher Card */}
            <div className="bg-gradient-to-br from-green-700 to-green-900 hover:shadow-green-700/40 transition-shadow duration-300 text-white rounded-2xl p-10 shadow-xl flex flex-col items-center">
              <User2 className="w-12 h-12 mb-4 text-white" />
              <h2 className="text-2xl font-semibold mb-2">Teacher Access</h2>
              <p className="text-sm text-green-100 mb-6">Register with your official email address</p>
              <div className="flex flex-col space-y-3 w-full max-w-xs">
                <Link
                  to="/academic/teacher-register"
                  className="bg-green-600 hover:bg-green-500 py-2 rounded-xl transition-all text-white font-medium"
                >
                  Teacher Register
                </Link>
                <Link
                  to="/academic/teacher-login"
                  className="text-green-200 hover:text-white underline text-sm"
                >
                  Already Registered? Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AcademicHome;
