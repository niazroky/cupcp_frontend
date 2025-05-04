
// ---------- components/ExamRegSummaryHelper/DownloadButtons.jsx ----------

import React from 'react';

export default function DownloadButtons({ onDownloadStudents, onDownloadSummary }) {
  return (
    <div className="flex gap-4 mb-4">
      <button onClick={onDownloadStudents} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Download Students CSV
      </button>
      <button onClick={onDownloadSummary} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
        Download Course Summary CSV
      </button>
    </div>
  );
}

