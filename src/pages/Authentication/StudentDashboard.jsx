import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";
import axios from "axios";
import apiRoutes from "../../api/apiRoute";

const StudentDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Add error display in the UI where needed
  // Add error state and display it in the UI
  const [error, setError] = useState(null);
  {error && (
    <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
      {error}
    </div>
  )}

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(apiRoutes.myExamRegistration, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudentData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load student data");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/academic/student-login", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentData && (
                <>
                  <div>
                    <p className="text-gray-400">Name:</p>
                    <p className="font-semibold">{studentData.user?.full_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Varsity ID:</p>
                    <p className="font-semibold">{studentData.user?.varsity_id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Session:</p>
                    <p className="font-semibold">{studentData.user?.session}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone:</p>
                    <p className="font-semibold">{studentData.user?.phone_number}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Registration Status */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Exam Registration Status</h2>
            {studentData?.registered ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-green-400">Registration Complete</p>
                </div>
                <p>Status: {studentData.registration?.student_status}</p>
                <p>Payment: {studentData.registration?.payment_status}</p>
                {studentData.registration?.courses && (
                  <div>
                    <p className="mb-2">Registered Courses:</p>
                    <ul className="list-disc list-inside">
                      {studentData.registration.courses.map((course, index) => (
                        <li key={index} className="text-blue-300">{course}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <p className="text-yellow-400">Registration Pending</p>
                </div>
                <div className="text-red-400 text-sm px-4 py-3 rounded-lg bg-red-900/30">
                  Note: Registration is currently open for 1st Year students only.
                  Other academic years will be notified soon.
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/academic/exam-form-fillup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {studentData?.registered ? "View/Edit Registration" : "Register for Exam"}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;