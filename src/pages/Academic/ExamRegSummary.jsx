// src/pages/AcademicPages/ExamRegSummary.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Navbar from "../../components/CupcpHome/Navbar";
import Footer from "../../components/CupcpHome/Footer";

const COURSES = [
  "PHYS-101","PHYS-102","PHYS-103","PHYS-104",
  "PHYS-105","PHYS-106","PHYS-107","PHYS-108"
];

export default function ExamRegSummary() {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError]           = useState(null);
  const [filterText, setFilterText] = useState("");

  // Fetch summary on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Not authenticated.");
      return;
    }
    axios.get(
      "https://cupcp.com/api/student-manager/exam-registration-summary/",
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(({ data }) => setRegistrations(data))
    .catch(err => {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to load summary.");
    });
  }, []);

  // Overview numbers
  const totalStudents     = registrations.length;
  const regularCount      = useMemo(
    () => registrations.filter(r => r.student_status === "regular").length,
    [registrations]
  );
  const improvementCount  = useMemo(
    () => registrations.filter(r => r.student_status === "improvement").length,
    [registrations]
  );

  // Table filter
  const filtered = useMemo(() => {
    if (!filterText) return registrations;
    const t = filterText.toLowerCase();
    return registrations.filter(r =>
      r.id.toString().includes(t) ||
      (r.full_name || "").toLowerCase().includes(t) ||
      (r.varsity_id || "").toLowerCase().includes(t)
    );
  }, [filterText, registrations]);

  // Course‑by‑course tallies
  const summary = useMemo(() => {
    const agg = COURSES.reduce((acc, c) => {
      acc[c] = { regular: 0, improvement: 0, total: 0 };
      return acc;
    }, {});
    registrations.forEach(r => {
      const status = r.student_status;
      const list = Array.isArray(r.courses) && r.courses.length > 0
        ? r.courses
        : status === "regular"
          ? COURSES
          : [];
      list.forEach(c => {
        if (!agg[c]) return;
        agg[c][status] += 1;
        agg[c].total += 1;
      });
    });
    return agg;
  }, [registrations]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            Exam Registration Summary
          </h1>

          {error && (
            <div className="bg-red-600 p-4 rounded mb-6">
              {error}
            </div>
          )}

          {/* --- Top‑Level Overview --- */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-400">Total Courses</p>
                <p className="text-2xl font-bold">{COURSES.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Regular Students</p>
                <p className="text-2xl font-bold">{regularCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Improvement Students</p>
                <p className="text-2xl font-bold">{improvementCount}</p>
              </div>
            </div>
          </div>

          {/* --- Filter Box --- */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Filter by ID, Varsity ID or Name..."
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* --- Registered Students Table --- */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Registered Students</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Varsity ID</th>
                    <th className="px-4 py-2">Session</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Slip #</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Courses</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r.id}>
                      <td className="border px-4 py-2">{r.id}</td>
                      <td className="border px-4 py-2">{r.full_name}</td>
                      <td className="border px-4 py-2">{r.varsity_id}</td>
                      <td className="border px-4 py-2">{r.session}</td>
                      <td className="border px-4 py-2">{r.payment_status}</td>
                      <td className="border px-4 py-2">
                        {r.payment_slip || "-"}
                      </td>
                      <td className="border px-4 py-2">{r.student_status}</td>
                      <td className="border px-4 py-2">
                        {Array.isArray(r.courses)
                          ? r.courses.join(", ")
                          : r.courses}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Course Summary Table (now at bottom) --- */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Course Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Course</th>
                    <th className="px-4 py-2">Regular</th>
                    <th className="px-4 py-2">Improvement</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {COURSES.map(course => (
                    <tr key={course}>
                      <td className="border px-4 py-2">{course}</td>
                      <td className="border px-4 py-2">{summary[course].regular}</td>
                      <td className="border px-4 py-2">{summary[course].improvement}</td>
                      <td className="border px-4 py-2">{summary[course].total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
