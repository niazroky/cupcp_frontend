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
          <div className="space-x-4">
            <Link
              to="/academic/exam-form-fillup"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Go to Exam Registration
            </Link>
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


