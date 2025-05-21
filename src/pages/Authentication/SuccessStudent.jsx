// src/pages/Authentication/SuccessStudent.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";


const SuccessStudent = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // just invoke context’s logout (which includes the API call)
    logout();
    navigate("/academic/student-login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 bg-gray-900 text-white">
        <section className="w-full bg-gray-800 py-16 px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Congrats!</h1>
          <p className="text-lg sm:text-xl mb-8">
            You’ve successfully logged in as a Student.
          </p>

          {/* Alert message */}
          <div className="text-red-500 text-sm sm:text-base px-4 py-3 mb-6 text-center leading-relaxed max-w-2xl mx-auto whitespace-pre-wrap">
            Kindly refrain from registering if you are{`\n`}
            not appearing for the 1stYear examination.{`\n`}
            Registration for all other academic years.{`\n`}
            will commence shortly. We appreciate your{`\n`}
            patience and your kind understanding.
          </div>


          {/* Exam Reg Form and Logout Link */}
          <div className="space-x-4">
            {/* Link to exam form fillup page */}
            <Link
              to="/academic/exam-form-fillup"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              1st Year Exam Registration
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Logout
            </button>
          </div>

        </section>
      </main>
    </div>
  );
};

export default SuccessStudent;


