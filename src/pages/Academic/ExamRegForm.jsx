import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";

const COURSES = [
  "PHYS-101", "PHYS-102", "PHYS-103", "PHYS-104",
  "PHYS-105", "PHYS-106", "PHYS-107", "PHYS-108"
];

export default function ExamRegistrationPage() {
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [regData, setRegData] = useState(null);
  const [userInfo, setUserInfo] = useState({ full_name: "", varsity_id: "", session: "" });
  const [editing, setEditing] = useState(false);

  // Form state
  const [paymentStatus, setPaymentStatus] = useState("No");
  const [paymentSlip, setPaymentSlip] = useState("");
  const [studentStatus, setStudentStatus] = useState("regular");
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Fetch registration + user info
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("https://cupcp.com/api/student-manager/exam-registration/my/", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(({ data }) => {
        setRegistered(data.registered);
        if (data.registered) {
          const d = data.registration;
          setRegData(d);
          setUserInfo({ full_name: d.full_name, varsity_id: d.varsity_id, session: d.session });
          setPaymentStatus(d.payment_status);
          setPaymentSlip(d.payment_slip || "");
          setStudentStatus(d.student_status);
          setSelectedCourses(d.courses);
        } else {
          setUserInfo({ full_name: data.user.full_name, varsity_id: data.user.varsity_id, session: data.user.session });
        }
      })
      .catch(err => {
        console.error("Error fetching registration:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Auto-select courses for new “regular” students
  useEffect(() => {
    if (!loading && !registered) {
      setSelectedCourses(studentStatus === "regular" ? COURSES : []);
    }
  }, [loading, registered, studentStatus]);

  const handleStudentStatusChange = (e) => {
    const status = e.target.value;
    setStudentStatus(status);
    if (!registered || editing) {
      setSelectedCourses(status === "regular" ? COURSES : []);
    }
  };

  const toggleCourse = (course) => {
    if (registered && !editing) return;
    setSelectedCourses(prev =>
      prev.includes(course)
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (studentStatus === "improvement" && selectedCourses.length === 0) {
      alert("Please select at least one course for Improvement status.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    const payload = {
      payment_status: paymentStatus,
      payment_slip: paymentStatus === "Yes" ? paymentSlip : null,
      student_status: studentStatus,
      courses: selectedCourses,
    };

    try {
      let res;
      if (registered) {
        res = await axios.put(
          "https://cupcp.com/api/student-manager/exam-registration/my/",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        res = await axios.post(
          "https://cupcp.com/api/student-manager/exam-registration/my/",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      const d = res.data.registration ?? res.data;
      setRegistered(true);
      setRegData(d);
      setEditing(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error submitting form. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Loading…</p>
      </div>
    );
  }

  const { full_name, varsity_id, session } = userInfo;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Exam Registration
          </h1>

          {/* Summary view */}
          {registered && !editing ? (
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mx-auto">
              <p className="mb-4">
                Hello <span className="font-semibold text-blue-400">{full_name}</span>,<br />
                your Varsity ID is <span className="font-semibold text-blue-400">{varsity_id}</span><br />
                and Session is <span className="font-semibold text-blue-400">{session}</span>.
              </p>
              <p className="text-green-400 mb-6">You have already submitted your registration.</p>
              <button
                onClick={() => setEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-xl transition"
              >
                Edit Registration
              </button>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mx-auto">
              <p className="mb-6">
                Hello <span className="font-semibold text-blue-400">{full_name}</span>, your Varsity ID is{" "}
                <span className="font-semibold text-blue-400">{varsity_id}</span> and Session is{" "}
                <span className="font-semibold text-blue-400">{session}</span>.<br />
                Please complete the rest of the form below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Payment Status */}
                <div>
                  <label className="block mb-2">Payment Status</label>
                  <select
                    value={paymentStatus}
                    onChange={e => setPaymentStatus(e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg focus:ring focus:border-blue-400"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {paymentStatus === "Yes" && (
                  <div>
                    <label className="block mb-2">Payment Slip Number</label>
                    <input
                      type="text"
                      value={paymentSlip}
                      onChange={e => setPaymentSlip(e.target.value)}
                      required
                      className="w-full p-3 bg-gray-700 rounded-lg focus:ring focus:border-blue-400"
                    />
                  </div>
                )}

                {/* Student Status */}
                <div>
                  <label className="block mb-2">Student Status</label>
                  <select
                    value={studentStatus}
                    onChange={handleStudentStatusChange}
                    disabled={registered && !editing}
                    className="w-full p-3 bg-gray-700 rounded-lg focus:ring focus:border-blue-400 disabled:opacity-60"
                  >
                    <option value="regular">Regular</option>
                    <option value="improvement">Improvement</option>
                  </select>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block mb-2">Selected Courses</label>

                  {studentStatus === "regular" ? (
                    <div className="p-3 bg-gray-700 rounded-lg text-gray-300">
                      All 1st year courses are auto-selected for regular students.
                      <ul className="mt-2 list-disc list-inside text-blue-400">
                        {selectedCourses.map(course => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {COURSES.map(course => (
                        <button
                          key={course}
                          type="button"
                          onClick={() => toggleCourse(course)}
                          disabled={registered && !editing}
                          className={`p-3 rounded-lg transition ${
                            selectedCourses.includes(course)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-gray-300"
                          } ${registered && !editing ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {course}
                        </button>
                      ))}
                    </div>
                  )}

                  {studentStatus === "improvement" && selectedCourses.length === 0 && (
                    <p className="text-red-400 text-sm mt-2">
                      Please choose at least one course.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
                >
                  {registered ? "Update Registration" : "Submit Registration"}
                </button>
              </form>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
