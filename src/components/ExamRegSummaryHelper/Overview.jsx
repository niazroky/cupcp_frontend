
// ---------- components/ExamRegSummaryHelper/Overview.jsx ----------

import React from 'react';

export default function Overview({ totalCourses, totalStudents, regular, improvement }) {
  const cards = [
    { label: "Total Courses", value: totalCourses },
    { label: "Total Students", value: totalStudents },
    { label: "Regular Students", value: regular },
    { label: "Improvement Students", value: improvement },
  ];
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {cards.map(c => (
          <div key={c.label}>
            <p className="text-sm text-gray-400">{c.label}</p>
            <p className="text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
