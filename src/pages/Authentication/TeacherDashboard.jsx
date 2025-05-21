import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/ProtectedRoute/AuthContext";
import { Clipboard, Users, BookOpen, LogOut } from "lucide-react";
import axios from "axios";
import apiRoutes from "../../api/apiRoute";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(apiRoutes.userProfile, {
          headers: { Authorization: `Bearer ${auth.accessToken}` }
        });
        setTeacherData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch teacher data:", err);
        setError("Failed to load teacher data");
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [auth.accessToken]);

  const handleLogout = () => {
    logout();
    navigate("/academic/teacher-login", { replace: true });
  };

  const dashboardCards = [
    {
      title: "Exam Registration Summary",
      description: "View student exam registrations",
      icon: <Clipboard className="w-8 h-8 text-blue-400" />,
      link: "/academic/exam-summary",
      color: "bg-blue-600",
    },
    {
      title: "Student Management",
      description: "Manage student profiles and records",
      icon: <Users className="w-8 h-8 text-green-400" />,
      link: "#",
      color: "bg-green-600",
    },
    {
      title: "Course Materials",
      description: "Upload and manage course materials",
      icon: <BookOpen className="w-8 h-8 text-purple-400" />,
      link: "#",
      color: "bg-purple-600",
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">Teacher Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          {/* Teacher Profile Section */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome back, {teacherData?.full_name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400">Department</p>
                <p className="font-semibold">Department of Physics</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-semibold">{teacherData?.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Phone</p>
                <p className="font-semibold">{teacherData?.phone_number}</p>
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card, index) => (
              <Link
                key={index}
                to={card.link}
                className={`block p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-all transform hover:-translate-y-1`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                </div>
                <p className="text-gray-400">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;