// src\components\ExamSummary\CourseSummary.jsx


import React from "react";

const CourseSummary = ({ coursesList, courseSummary }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-2">Course Summary</h2>
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
            {coursesList.map((course) => (
              <tr key={course}>
                <td className="border px-4 py-2">{course}</td>
                <td className="border px-4 py-2">{courseSummary[course]?.regular || 0}</td>
                <td className="border px-4 py-2">{courseSummary[course]?.improvement || 0}</td>
                <td className="border px-4 py-2">{courseSummary[course]?.total || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseSummary;
