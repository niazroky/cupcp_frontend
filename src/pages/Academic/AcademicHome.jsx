

import { Link } from "react-router-dom";
import { GraduationCap, User2 } from "lucide-react";

const AcademicHome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <section className="flex-grow pt-25 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Heading with borders */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center border-t-2 border-b-2 border-gray-700 py-3">
            Welcome to CU Physics Academic Portal
          </h1>

          {/* Quick Links Card */}
          <div className="bg-gray-800 rounded-lg p-6 space-y-4 text-center sm:text-left">
            <p className="text-lg font-semibold">🔗 Quick Links:</p>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <Link
                to="/academic/physics-curriculum"
                className="flex items-center px-5 py-2 border border-blue-400 rounded-2xl text-blue-300 hover:bg-blue-400 hover:text-white transition"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Physics Curriculum
              </Link>
              <Link
                to="#"
                className="px-5 py-2 border border-purple-400 rounded-2xl text-purple-300 hover:bg-purple-400 hover:text-white transition"
              >
                Study Materials
              </Link>
              <Link
                to="#"
                className="px-5 py-2 border border-yellow-400 rounded-2xl text-yellow-300 hover:bg-yellow-400 hover:text-white transition"
              >
                Teachers &amp; Staff
              </Link>
              <Link
                to="#"
                className="px-5 py-2 border border-green-400 rounded-2xl text-green-300 hover:bg-green-400 hover:text-white transition"
              >
                Academic Research
              </Link>
            </div>
          </div>

          {/* 1st Year Exam Form */}
          <div className="bg-gray-800 rounded-lg p-6 space-y-3 text-center sm:text-left">
            <p className="text-lg">📄 1st Year Exam Form Fill‑up!</p>
            <p className="text-sm text-gray-400">
              Note: You must register or log in before filling the form.
            </p>
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
              <Link
                to="/academic/student-register"
                className="max-w-xs w-full sm:w-auto text-center px-6 py-2 border border-blue-400 rounded hover:bg-blue-400 hover:text-white transition"
              >
                Student Register
              </Link>
              <Link
                to="/academic/student-login"
                className="max-w-xs w-full sm:w-auto text-center text-green-200 px-6 py-2 hover:text-white underline text-sm"
              >
                Already Registered? Login
              </Link>
            </div>
          </div>

          {/* Teacher Access */}
          <div className="bg-gray-800 rounded-lg p-6 space-y-3 text-center sm:text-left">
            <p className="text-lg flex items-center justify-center sm:justify-start">
              <User2 className="w-5 h-5 mr-2 text-green-400" />
              Teacher Access
            </p>
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
              <Link
                to="/academic/teacher-register"
                className="max-w-xs w-full sm:w-auto text-center px-6 py-2 border border-green-400 rounded hover:bg-green-400 hover:text-white transition"
              >
                Teacher Register
              </Link>
              <Link
                to="/academic/teacher-login"
                className="max-w-xs w-full sm:w-auto text-center text-green-200 px-6 py-2 hover:text-white underline text-sm"
              >
                Already Registered? Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicHome;
