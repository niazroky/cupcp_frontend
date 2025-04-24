// src\components\ExamSummary\RegistrationTable.jsx

import React from "react";

const RegistrationsTable = ({ registrations }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Registered Students</h2>
      <p className="text-sm text-gray-300 mb-4">
        View the list of students who have registered for upcoming exams.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Varsity ID</th>
              <th className="px-4 py-2">Session</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Payment Slip</th>
              <th className="px-4 py-2">Student Status</th>
              <th className="px-4 py-2">Courses</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td className="border px-4 py-2">{reg.id}</td>
                <td className="border px-4 py-2">{reg.fullName || reg.full_name}</td>
                <td className="border px-4 py-2">{reg.varsityId || reg.varsity_id}</td>
                <td className="border px-4 py-2">{reg.session}</td>
                <td className="border px-4 py-2">{reg.paymentStatus || reg.payment_status}</td>
                <td className="border px-4 py-2">{reg.paymentSlip || reg.payment_slip}</td>
                <td className="border px-4 py-2">{reg.studentStatus || reg.student_status}</td>
                <td className="border px-4 py-2">
                  {Array.isArray(reg.courses)
                    ? reg.courses.join(", ")
                    : reg.courses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationsTable;
