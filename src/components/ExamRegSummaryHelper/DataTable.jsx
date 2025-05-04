
// ---------- components/ExamRegSummaryHelper/DataTable.jsx ----------

import React from 'react';

export default function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr>{columns.map(col => <th key={col} className="px-4 py-2">{col}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j} className="border px-4 py-2">{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}