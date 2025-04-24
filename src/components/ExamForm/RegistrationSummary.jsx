// src/components/ExamForm/RegistrationSummary.jsx

import React from "react";

export default function RegistrationSummary({ full_name, varsity_id, session, onEdit }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mx-auto">
      <p className="mb-4">
        Hello <span className="font-semibold text-blue-400">{full_name}</span>,<br/>
        your Varsity ID is <span className="font-semibold text-blue-400">{varsity_id}</span><br/>
        and Session is <span className="font-semibold text-blue-400">{session}</span>.
      </p>
      <p className="text-green-400 mb-6">You have already submitted your registration.</p>
      <button
        onClick={onEdit}
        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-xl transition"
      >
        Edit Registration
      </button>
    </div>
  );
}
