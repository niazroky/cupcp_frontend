
// ---------- components/ExamRegSummaryHelper/Filter.jsx ----------

import React from 'react';

export default function Filter({ filterText, onChange }) {
  return (
    <input
      type="text"
      placeholder="Filter by ID, Varsity ID or Name..."
      value={filterText}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:border-blue-500 mb-6"
    />
  );
}
