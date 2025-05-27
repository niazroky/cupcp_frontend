import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";
import { UserCircle2, BookOpen, LogOut, AlertCircle, CheckCircle2 } from "lucide-react";
import axios from "axios";
import apiRoutes from "../../api/apiRoute";

const StudentDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="animate-pulse flex items-center gap-2">
          <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
          <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header with Profile */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-white">
                Student Dashboard
              </h1>
              <p className="text-gray-400">Welcome back to your academic portal</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/30 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <UserCircle2 className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{studentData?.user?.full_name}</h2>
                <p className="text-gray-400">Physics Department</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Varsity ID</p>
                <p className="font-medium">{studentData?.user?.varsity_id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Session</p>
                <p className="font-medium">{studentData?.user?.session}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Phone</p>
                <p className="font-medium">{studentData?.user?.phone_number}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Registration Status</p>
                <div className="flex items-center gap-2">
                  {studentData?.registered ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  )}
                  <span className={studentData?.registered ? "text-green-400" : "text-yellow-400"}>
                    {studentData?.registered ? "Registered" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Details */}
          {studentData?.registered && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <BookOpen className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-xl font-semibold">Registration Details</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Student Status</p>
                    <p className="font-medium capitalize">{studentData.registration?.student_status}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Payment Status</p>
                    <p className="font-medium">{studentData.registration?.payment_status}</p>
                  </div>
                </div>
                {studentData.registration?.courses && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Registered Courses</p>
                    <div className="grid grid-cols-2 gap-2">
                      {studentData.registration.courses.map((course, index) => (
                        <div
                          key={index}
                          className="bg-blue-500/10 text-blue-400 px-3 py-2 rounded-lg text-sm"
                        >
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center">
            <Link
              to="/academic/exam-form-fillup"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {studentData?.registered ? "View/Edit Registration" : "Register for Exam"}
            </Link>
          </div>

          {/* Warning Message for Non-registered Students */}
          {!studentData?.registered && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-yellow-400 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">Registration Notice</p>
              </div>
              <p>
                Registration is currently open for 1st Year students only.
                Other academic years will be notified soon.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;