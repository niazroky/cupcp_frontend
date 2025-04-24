// src\components\ExamSummary\FilterBox.jsx
import React from "react";

const FilterBox = ({ filterText, setFilterText }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Filter by ID, Varsity ID or Full Name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

export default FilterBox;
